export { createVSIX } from "./package.ts";

export type { PackageInfo } from "./package.ts";

export {
  AssetDetails,
  AssetIconDefault,
  AssetLicense,
  AssetManifest,
  AssetTemplate,
  genXmlvsixMinifest,
  Identify,
  PackageManifest,
  PropertyEngine,
  PropertyExtensionDependencies,
  PropertyExtensionKind,
  PropertyExtensionMarkdown,
  PropertyExtensionPack,
  PropertyExtensionPricing,
  PropertyLinksGetstarted,
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

export type { XMLContentTypesInterface } from "./package/content_types.ts";

export {
  defaultMimetypes,
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
