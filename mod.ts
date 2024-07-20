export { makeVisxPackage } from "./package.ts";

export type { PackageInfo } from "./package.ts";

export {
  AssertDetails,
  AssertIconDefault,
  AssertLicense,
  AssertManifest,
  AssertTemplate,
  genXmlvsixMinifest,
  Identify,
  PackageManifest,
  PropertyEngine,
  PropertyExtensionDependencies,
  PropertyExtensionKind,
  PropertyExtensionPack,
  PropertyLinksGetStart,
  PropertyLinksGithub,
  PropertyLinksLearn,
  PropertyLinksSource,
  PropertyLinksSupport,
  PropertyLocalizedLanguages,
  XMlVisxManifest,
} from "./vsixmanifest.ts";

export type {
  Assert,
  InstallationTargetDefault,
  PropertyInterface,
} from "./vsixmanifest.ts";

export type {
  DefaultExtensions,
  XMLContentTypesInterface,
} from "./content_types.ts";

export {
  JsExtension,
  JsonExtension,
  MdExtension,
  PngExtension,
  TextExtension,
  TmExtension,
  VisxManifestExtension,
  XMLContentTypes,
  XMLContentTypesDefault,
  YmlExtension,
} from "./content_types.ts";

export type { JsonInfo } from "./json_reader.ts";

export {
  packageJsonReader,
  packageMainData,
  projectDirReader,
} from "./json_reader.ts";
