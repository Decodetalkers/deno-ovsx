import { assertEquals } from "@std/assert";
import * as xml from "@libs/xml";
import {
  defaultMimetypes,
  genXmlvsixMinifest,
  projectDirReader,
  XMLContentTypesDefault,
} from "./mod.ts";
import { extname, resolve } from "@std/path";
import { contentType } from "@std/media-types";
Deno.test(function xmlcontentTest() {
  const data = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension=".json" ContentType="application/json; charset=UTF-8"/>
  <Default Extension=".vsixmanifest" ContentType="text/xml"/>
  <Default Extension=".tmlanguage" ContentType="application/octet-stream"/>
  <Default Extension=".txt" ContentType="text/plain; charset=UTF-8"/>
  <Default Extension=".yml" ContentType="text/yaml; charset=UTF-8"/>
  <Default Extension=".md" ContentType="text/markdown; charset=UTF-8"/>
  <Default Extension=".png" ContentType="image/png"/>
</Types>`;
  const default_types = XMLContentTypesDefault;
  const files = [
    "hello.json",
    "hello.yml",
    "hello.tmlanguage",
    "hello.txt",
    "hello.md",
    "hello.png",
  ];
  const default_mime = defaultMimetypes;
  for (const file of files) {
    const ext = extname(file);
    if (ext == "") {
      continue;
    }
    const mime = contentType(ext);
    if (mime == undefined) {
      continue;
    }
    default_mime.set(ext, mime);
  }
  for (const [ext, content_type] of default_mime) {
    default_types.push_ext({
      "@Extension": ext,
      "@ContentType": content_type,
    });
  }
  // deno-lint-ignore no-explicit-any
  assertEquals(data, xml.stringify(XMLContentTypesDefault as any));
});

Deno.test(async function XmlVsixMinifestTest() {
  const data = `<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
  <Metadata>
    <Identity Language="en-US" Id="my-vscode-test" Version="0.0.7" Publisher="Decodetalkers"/>
    <DisplayName>my-vscode-test</DisplayName>
    <Description xml:space="preserve">vscode extension for neocmakelsp</Description>
    <Tags>debuggers,cmake,CMake,cmake-cache,CMake Cache</Tags>
    <Categories>Programming Languages,Linters,Formatters,Debuggers</Categories>
    <GalleryFlags>Public</GalleryFlags>
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="^1.100.0"/>
      <Property Id="Microsoft.VisualStudio.Code.ExtensionPack" Value=""/>
      <Property Id="Microsoft.VisualStudio.Code.ExtensionKind" Value="workspace"/>
      <Property Id="Microsoft.VisualStudio.Code.LocalizedLanguages" Value=""/>
      <Property Id="Microsoft.VisualStudio.Services.Content.Pricing" Value="Free"/>
      <Property Id="Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown" Value="true"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.Source" Value="https://github.com/neocmakelsp/neocmakelsp-vscode.git"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.Getstarted" Value="https://github.com/neocmakelsp/neocmakelsp-vscode"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.GitHub" Value="https://github.com/neocmakelsp/neocmakelsp-vscode.git"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.Support" Value="https://github.com/neocmakelsp/neocmakelsp-vscode/issues"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.Learn" Value="https://github.com/neocmakelsp/neocmakelsp-vscode#readme"/>
    </Properties>
    <License>extension/LICENSE.txt</License>
    <Icon>extension/icon.png</Icon>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/icon.png" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE.txt" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/readme.md" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Content.Changelog" Path="extension/changelog.md" Addressable="true"/>
  </Assets>
</PackageManifest>`;
  const reader = await projectDirReader(
    new URL("file://" + resolve("./example/")),
  );

  // deno-lint-ignore no-explicit-any
  assertEquals(data, xml.stringify(genXmlvsixMinifest(reader!) as any));
});
