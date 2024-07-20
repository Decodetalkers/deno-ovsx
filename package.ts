import {
  BlobWriter,
  TextReader,
  Uint8ArrayReader,
  ZipWriter,
} from "@zip-js/zip-js";
import * as path from "@std/path";

import { walk } from "@std/fs";
import * as xml from "@libs/xml";
import { XMLContentTypesDefault } from "./content_types.ts";
import { dirReader } from "./json_reader.ts";
import { genXmlvisxMinifest } from "./vsixmanifest.ts";
const excludeDirs = [/\/src$/, /\/node_modules$/];

const CONTENT_TYPES_FILE = "[Content_Types].xml";

const VISX_MANIFEST = "extension.visxmanifest";

export async function makeVisxPackage(dir_entry: string, target_file: string) {
  const zipFileWriter: BlobWriter = new BlobWriter();

  const zipWriter = new ZipWriter(zipFileWriter);

  // deno-lint-ignore no-explicit-any
  const contentTypeData = xml.stringify(XMLContentTypesDefault as any);

  const contentTypeReader = new TextReader(contentTypeData);

  zipWriter.add(CONTENT_TYPES_FILE, contentTypeReader);

  const xmlreader = await dirReader(
    new URL("file://" + path.resolve(dir_entry)),
  );

  // deno-lint-ignore no-explicit-any
  const xmlVisxData = xml.stringify(genXmlvisxMinifest(xmlreader!) as any);
  const xmlVisxReader = new TextReader(xmlVisxData);

  zipWriter.add(VISX_MANIFEST, xmlVisxReader);

  await walkFileFilited(dir_entry, zipWriter);

  zipWriter.close();

  const zipFileBlob: Blob = await zipFileWriter.getData();

  await Deno.writeFile(target_file, zipFileBlob.stream());
}

async function walkFileFilited(dir: string, zipWriter: ZipWriter) {
  for await (
    const entry of walk(dir, { includeDirs: true, skip: excludeDirs })
  ) {
    if (entry.isFile) {
      const filepath = path.relative(dir, entry.path);
      const data = await Deno.readFile(entry.path);
      const fileReader = new Uint8ArrayReader(data);

      console.log(entry.name);
      if (entry.name == "vscode_package.json") {
        await zipWriter.add(`extension/package.json`, fileReader);
      } else {
        await zipWriter.add(`extension/${filepath}`, fileReader);
      }
    }
  }
}

await makeVisxPackage("./test", "hello.visx");

//walkFileFilited("./test");
