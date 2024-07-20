import * as xml from "@libs/xml";
import {
  Identify,
  Metadata,
  PackageManifest,
  XMlVisxManifest,
} from "./vsixmanifest.ts";
import { dirReader } from "./json_reader.ts";
import { genXmlvisxMinifest } from "./vsixmanifest.ts";
import { resolve } from "@std/path";

export function add(a: number, b: number): number {
  return a + b;
}

const identifier = new Identify(
  "abcd",
  "0.1.0",
  "helloworld",
);

const metadata = new Metadata(
  identifier,
  "helloworld",
  "abc",
  "MIT",
);

const manifest = new PackageManifest(metadata);

const xmltop = new XMlVisxManifest(manifest);

// deno-lint-ignore no-explicit-any
console.log(xml.stringify(xmltop as any));

const reader = await dirReader(
  new URL("file://" + resolve("./test/")),
);

// deno-lint-ignore no-explicit-any
console.log(xml.stringify(genXmlvisxMinifest(reader!) as any));
