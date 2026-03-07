import { assertEquals } from "@std/assert";
import * as xml from "@libs/xml";
import {
  genXmlvsixMinifest,
  projectDirReader,
  XMLContentTypesDefault,
} from "./mod.ts";
import { resolve } from "@std/path";

Deno.test(function xmlcontentTest() {
  const data = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension=".json" ContentType="application/json"/>
  <Default Extension=".visxmanifest" ContentType="text/json"/>
  <Default Extension=".png" ContentType="image/png"/>
  <Default Extension=".md" ContentType="text/markdown"/>
  <Default Extension=".txt" ContentType="text/plain"/>
  <Default Extension=".tmlanguage" ContentType="application/octet-stream"/>
  <Default Extension=".yml" ContentType="text/yaml"/>
</Types>`;
  // deno-lint-ignore no-explicit-any
  assertEquals(data, xml.stringify(XMLContentTypesDefault as any));
});

Deno.test(async function XmlVsixMinifestTest() {
  const data = `<?xml version="1.0" encoding="UTF-8"?>
<PackageManifest version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
  <Metadata>
    <Identity Language="en-US" Id="my-vscode-test" Version="0.0.1" Publisher="Decodetalkers"/>
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
      <Property Id="Microsoft.VisualStudio.Services.Links.Source" Value="https://github.com/neocmakelsp/neocmakelsp-vscode.git"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.GetStart" Value="https://github.com/neocmakelsp/neocmakelsp-vscode.git"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.Github" Value="https://github.com/neocmakelsp/neocmakelsp-vscode.git"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.Support" Value="https://github.com/neocmakelsp/neocmakelsp-vscode.git"/>
      <Property Id="Microsoft.VisualStudio.Services.Links.Learn" Value="https://github.com/neocmakelsp/neocmakelsp-vscode"/>
    </Properties>
    <License>extension/LICENSE.txt</License>
    <Icon>extension/icon.png</Icon>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Asserts>
    <Assert Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true"/>
    <Assert Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/icon.png" Addressable="true"/>
    <Assert Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE.txt" Addressable="true"/>
    <Assert Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/readme.md" Addressable="true"/>
    <Assert Type="Microsoft.VisualStudio.Services.Content.Changelog" Path="extension/changelog.md" Addressable="true"/>
  </Asserts>
</PackageManifest>`;
  const reader = await projectDirReader(
    new URL("file://" + resolve("./example/")),
  );

  // deno-lint-ignore no-explicit-any
  assertEquals(data, xml.stringify(genXmlvsixMinifest(reader!) as any));
});
