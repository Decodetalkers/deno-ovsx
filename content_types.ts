export interface DefaultExtension {
  "@Extension": string;
  "@ContentType": string;
}

export const JsonExtension: DefaultExtension = {
  "@Extension": ".json",
  "@ContentType": "application/json",
};

export const VisxManifestExtension: DefaultExtension = {
  "@Extension": ".visxmanifest",
  "@ContentType": "text/json",
};

export const PngExtension: DefaultExtension = {
  "@Extension": ".png",
  "@ContentType": "image/png",
};

export const MdExtension: DefaultExtension = {
  "@Extension": ".md",
  "@ContentType": "text/markdown",
};

export const TextExtension: DefaultExtension = {
  "@Extension": ".txt",
  "@ContentType": "text/plain",
};

export const TmExtension: DefaultExtension = {
  "@Extension": ".tmlanguage",
  "@ContentType": "application/octet-stream",
};

export const JsExtension: DefaultExtension = {
  "@Extension": ".js",
  "@ContentType": "application/javascript",
};

export const YmlExtension: DefaultExtension = {
  "@Extension": ".yml",
  "@ContentType": "text/yaml",
};

export const DefaultExtensions = [
  JsonExtension,
  VisxManifestExtension,
  PngExtension,
  MdExtension,
  TextExtension,
  TmExtension,
  JsonExtension,
  YmlExtension,
];

export interface XMLContentTypesInterface {
  readonly "@version": string;
  readonly "@encoding": string;
  "Types": {
    "@xmlns": string;
    Default: DefaultExtension[];
  };
}

export class XMLContentTypes implements XMLContentTypesInterface {
  readonly "@version": string = "1.0";
  readonly "@encoding": string = "UTF-8";
  "Types": {
    "@xmlns": string;
    Default: DefaultExtension[];
  } = {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/content-types",
    Default: DefaultExtensions,
  };
}

export const XMLContentTypesDefault = new XMLContentTypes();
