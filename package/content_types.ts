export interface MimeExtension {
  "@Extension": string;
  "@ContentType": string;
}

export const JsonExtension: MimeExtension = {
  "@Extension": ".json",
  "@ContentType": "application/json",
};

export const VisxManifestExtension: MimeExtension = {
  "@Extension": ".vsixmanifest",
  "@ContentType": "text/xml",
};

export const PngExtension: MimeExtension = {
  "@Extension": ".png",
  "@ContentType": "image/png",
};

export const MdExtension: MimeExtension = {
  "@Extension": ".md",
  "@ContentType": "text/markdown",
};

export const TextExtension: MimeExtension = {
  "@Extension": ".txt",
  "@ContentType": "text/plain",
};

export const TmExtension: MimeExtension = {
  "@Extension": ".tmlanguage",
  "@ContentType": "application/octet-stream",
};

export const JsExtension: MimeExtension = {
  "@Extension": ".js",
  "@ContentType": "application/javascript",
};

export const YmlExtension: MimeExtension = {
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
  YmlExtension,
];

export interface XMLContentTypesInterface {
  readonly "@version": string;
  readonly "@encoding": string;
  "Types": {
    "@xmlns": string;
    Default: MimeExtension[];
  };
}

export class XMLContentTypes implements XMLContentTypesInterface {
  readonly "@version": string = "1.0";
  readonly "@encoding": string = "UTF-8";
  "Types": {
    "@xmlns": string;
    Default: MimeExtension[];
  } = {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/content-types",
    Default: DefaultExtensions,
  };
}

export const XMLContentTypesDefault: XMLContentTypesInterface =
  new XMLContentTypes();
