import * as xml from "@libs/xml";
import {
  Identify,
  Metadata,
  PackageManifest,
  XMlVisxManifest,
} from "./vsixmanifest.ts";
import { jsonReader } from "./json_reader.ts";
import { gen_xmlvisxMinifest } from "./vsixmanifest.ts";
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

const reader = await jsonReader(
  new URL("file://" + resolve("./test_pacakge.json")),
);

// deno-lint-ignore no-explicit-any
console.log(xml.stringify(gen_xmlvisxMinifest(reader!) as any));
