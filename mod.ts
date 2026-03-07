export { createVSIX } from "./package.ts";

export type { PackageInfo } from "./package.ts";

export {
  AssetDetails as AssertDetails,
  AssetIconDefault as AssertIconDefault,
  AssetLicense as AssertLicense,
  AssetManifest as AssertManifest,
  AssetTemplate as AssertTemplate,
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
} from "./package/vsixmanifest.ts";

export type {
  Asset as Assert,
  InstallationTargetDefault,
  PropertyInterface,
} from "./package/vsixmanifest.ts";

export type {
  DefaultExtensions,
  XMLContentTypesInterface,
} from "./package/content_types.ts";

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
} from "./package/content_types.ts";

export type { JsonInfo } from "./package/json_reader.ts";

export { projectDirReader } from "./package/json_reader.ts";
