import {
  BlobReader,
  BlobWriter,
  TextReader,
  Uint8ArrayReader,
  ZipReader,
  ZipWriter,
} from "@zip-js/zip-js";

import type { Entry } from "@zip-js/zip-js";
import * as path from "@std/path";

import { walk } from "@std/fs";
import * as xml from "@libs/xml";
import { XMLContentTypesDefault } from "./package/content_types.ts";
import { type JsonInfo, projectDirReader } from "./package/json_reader.ts";
import { genXmlvsixMinifest } from "./package/vsixmanifest.ts";
import { build_extension } from "./package/esbuild.ts";

import { warn } from "@std/log";
const excludeDirs = [
  /\/src$/,
  /\/node_modules$/,
  /src$/,
  /node_modules$/,
  /deno.json/,
  /deno.lock/,
  /.*\.vsix/,
  /.git/,
];

const CONTENT_TYPES_FILE = "[Content_Types].xml";

const VISX_MANIFEST = "extension.visxmanifest";

export interface PackageInfo {
  fileName: string;
  entries: Entry[];
}

export async function createVSIX(
  dir_entry: string,
): Promise<PackageInfo | undefined> {
  const info = await projectDirReader(
    new URL("file://" + path.resolve(dir_entry)),
  );
  if (!info) {
    warn("no vscode_package.json found");
    return;
  }
  await build_extension(dir_entry, info);
  return await packageVSIX(dir_entry, info);
}

async function packageVSIX(
  dir_entry: string,
  dir_info: JsonInfo,
): Promise<PackageInfo> {
  const zipFileWriter: BlobWriter = new BlobWriter();

  const zipWriter = new ZipWriter(zipFileWriter);

  // deno-lint-ignore no-explicit-any
  const contentTypeData = xml.stringify(XMLContentTypesDefault as any);

  const contentTypeReader = new TextReader(contentTypeData);

  zipWriter.add(CONTENT_TYPES_FILE, contentTypeReader);

  const fileName = `${dir_info.name}-${dir_info.version}.vsix`;

  // deno-lint-ignore no-explicit-any
  const xmlVisxData = xml.stringify(genXmlvsixMinifest(dir_info) as any);
  const xmlVisxReader = new TextReader(xmlVisxData);

  zipWriter.add(VISX_MANIFEST, xmlVisxReader);

  await walkFileFilited(dir_entry, zipWriter);

  zipWriter.close();

  const zipFileBlob: Blob = await zipFileWriter.getData();

  const zipFileReader = new BlobReader(zipFileBlob);
  const zipReader = new ZipReader(zipFileReader);
  const entries = await zipReader.getEntries();
  await zipReader.close();

  await Deno.writeFile(fileName, zipFileBlob.stream());

  return { fileName, entries };
}

async function walkFileFilited(dir: string, zipWriter: ZipWriter<Blob>) {
  for await (
    const entry of walk(dir, { includeDirs: true, skip: excludeDirs })
  ) {
    if (entry.isFile) {
      const filepath = path.relative(dir, entry.path);
      const data = await Deno.readFile(entry.path);
      const fileReader = new Uint8ArrayReader(data);

      if (entry.name == "vscode_package.json") {
        await zipWriter.add(`extension/package.json`, fileReader);
      } else {
        await zipWriter.add(`extension/${filepath}`, fileReader);
      }
    }
  }
}
