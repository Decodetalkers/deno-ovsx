import { assertEquals } from "jsr:@std/assert";
import * as xml from "@libs/xml";
import { XMLContentTypesDefault } from "./content_types.ts";

Deno.test(function addTest() {
  const data = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension=".json" ContentType="application/json"/>
  <Default Extension=".visxmanifest" ContentType="text/json"/>
  <Default Extension=".png" ContentType="image/png"/>
  <Default Extension=".md" ContentType="text/markdown"/>
  <Default Extension=".txt" ContentType="text/plain"/>
  <Default Extension=".tmlanguage" ContentType="application/octet-stream"/>
  <Default Extension=".json" ContentType="application/json"/>
  <Default Extension=".yml" ContentType="text/yaml"/>
</Types>`;
  // deno-lint-ignore no-explicit-any
  assertEquals(data, xml.stringify(XMLContentTypesDefault as any));
});
