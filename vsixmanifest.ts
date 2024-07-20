export class XMlVisxManifest {
  readonly "@version": "1.0";
  readonly "@encoding": "UTF-8";
  PackageManifest: PackageManifest;
  constructor(manifest: PackageManifest) {
    this.PackageManifest = manifest;
  }
}

export interface PropertyInterface {
  "@Id": string;
  "@Value": string;
}

export class PropertyExtensionPack implements PropertyInterface {
  readonly "@Id": string = "Microsoft.VisualStudio.Code.ExtensionPack";
  "@Value": string = "";
  constructor(value: string = "") {
    this["@Value"] = value;
  }
}

function PropertyExtensionTemplate(id: string) {
  return class extends PropertyExtensionPack {
    "@Id" = id;
  };
}

export const PropertyEngine = PropertyExtensionTemplate(
  "Microsoft.VisualStudio.Code.Engine",
);

export const PropertyExtensionDepdencies = PropertyExtensionTemplate(
  " Microsoft.VisualStudio.Code.ExtensionDependencies",
);

export const PropertyExtensionKind = PropertyExtensionTemplate(
  "Microsoft.VisualStudio.Code.ExtensionKind",
);

export const PropertyLocalizedLanguages = PropertyExtensionTemplate(
  "Microsoft.VisualStudio.Code.LocalizedLanguages",
);

export class Metadata {
  Identity: Identify;
  DisplayName: string;
  Description: {
    "@xml:space": string;
    "#text": string;
  };
  Tags: string = "";
  Categories: string = "";
  GalleryFlags: string = "Public";
  Properties: PropertyInterface[] = [];
  License: string;
  Icon: string = "";

  constructor(
    identify: Identify,
    displayName: string,
    description: string,
    license: string,
    icon: string = "",
  ) {
    this.Identity = identify;
    this.DisplayName = displayName;
    this.Description = {
      "@xml:space": "preserve",
      "#text": description,
    };
    this.License = license;
    this.Icon = icon;
  }
  set_tags(tags: string[]) {
    this.Tags = tags.join(",");
  }
  set_categrates(categrates: string[]) {
    this.Categories = categrates.join(",");
  }
  set_properties(property: PropertyInterface[]) {
    this.Properties = property;
  }
}

export class Identify {
  "@Language": string = "en-US";
  "@Id": string;
  "@Version": string;
  "@Publisher": string;
  constructor(
    id: string,
    version: string,
    publisher: string,
    language: string = "en-US",
  ) {
    this["@Id"] = id;
    this["@Version"] = version;
    this["@Language"] = language;
    this["@Publisher"] = publisher;
  }
}

export interface InstallationTarget {
  Id: string;
}

export const InstallationTargetDefault: InstallationTarget = {
  Id: "Microsoft.VisualStudio.Code",
};

export interface Assert {
  "Type": string;
  Path: string;
  Addressable: boolean;
}

export class AssertManifest implements Assert {
  readonly "Type": string = "Microsoft.VisualStudio.Code.Manifest";
  Path: string;
  Addressable: boolean;

  constructor(path: string, addressable: boolean) {
    this.Path = path;
    this.Addressable = addressable;
  }
}

export function AssertTemplate(tp: string) {
  return class extends AssertManifest {
    readonly "Type": string = tp;
  };
}

export const AssertDetails = AssertTemplate(
  "Microsoft.VisualStudio.Services.Content.Details",
);

export const AssertLicense = AssertTemplate(
  "Microsoft.VisualStudio.Services.Content.License",
);

export const AssertIconDefault = AssertTemplate(
  "Microsoft.VisualStudio.Services.Icons.Default",
);

export class PackageManifest {
  readonly "@version": string = "2.0.0";
  readonly "@xmlns": string =
    "http://schemas.microsoft.com/developer/vsx-schema/2011";
  readonly "@xmlns:d": string =
    "http://schemas.microsoft.com/developer/vsx-schema-design/2011";

  "Metadata": Metadata;
  Installation: InstallationTarget[] = [InstallationTargetDefault];
  Assert: Assert[] = [];
  constructor(metaData: Metadata) {
    this["Metadata"] = metaData;
  }
}
