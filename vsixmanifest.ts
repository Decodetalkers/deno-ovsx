import type { JsonInfo } from "./json_reader.ts";

export function genXmlvsixMinifest(
  {
    name,
    description,
    version,
    publisher,
    icon,
    categories,
    url,
    engine,
    tags,
    contains_readme,
    contains_license,
  }: JsonInfo,
): XMlVisxManifest {
  const identifier = new Identify(name, version, publisher);
  const metadata = new Metadata(
    identifier,
    name,
    description,
    "extension/LICENSE",
    `extension/${icon}` || "",
  );
  metadata.set_tags(tags);
  const propertys = [
    new PropertyEngine(engine),
    new PropertyExtensionPack(),
    new PropertyExtensionKind("workspace"),
    new PropertyLocalizedLanguages(),
  ];
  if (url && url.type == "git") {
    const link = url.url + ".git";
    propertys.push(new PropertyLinksSource(link));
    propertys.push(new PropertyLinksGetStart(link));
    propertys.push(new PropertyLinksGithub(link));
    propertys.push(new PropertyLinksSupport(link));
    propertys.push(new PropertyLinksLearn(link));
  }
  metadata.set_properties(propertys);
  metadata.set_categrates(categories || []);
  const asserts = [new AssertManifest("extension/package.json", true)];
  if (icon) {
    asserts.push(new AssertIconDefault(`extension/${icon}`, true));
  }
  if (contains_license) {
    asserts.push(new AssertLicense("extension/LICENSE", true));
  }
  if (contains_readme) {
    asserts.push(new AssertDetails("extension/README.txt", true));
  }
  const minifest = new PackageManifest(metadata);
  minifest.set_asserts(asserts);
  return new XMlVisxManifest(minifest);
}

export class XMlVisxManifest {
  readonly "@version": string = "1.0";
  readonly "@encoding": string = "UTF-8";
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

function PropertyTemplate(id: string) {
  return class extends PropertyExtensionPack {
    "@Id" = id;
  };
}

export const PropertyEngine = PropertyTemplate(
  "Microsoft.VisualStudio.Code.Engine",
);

export const PropertyExtensionDepdencies = PropertyTemplate(
  " Microsoft.VisualStudio.Code.ExtensionDependencies",
);

export const PropertyExtensionKind = PropertyTemplate(
  "Microsoft.VisualStudio.Code.ExtensionKind",
);

export const PropertyLocalizedLanguages = PropertyTemplate(
  "Microsoft.VisualStudio.Code.LocalizedLanguages",
);

export const PropertyLinksSource = PropertyTemplate(
  "Microsoft.VisualStudio.Services.Links.Source",
);

export const PropertyLinksGetStart = PropertyTemplate(
  "Microsoft.VisualStudio.Services.Links.GetStart",
);

export const PropertyLinksGithub = PropertyTemplate(
  "Microsoft.VisualStudio.Services.Links.Github",
);

export const PropertyLinksSupport = PropertyTemplate(
  "Microsoft.VisualStudio.Services.Links.Support",
);

export const PropertyLinksLearn = PropertyTemplate(
  "Microsoft.VisualStudio.Services.Links.Learn",
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
  Properties: {
    Property: PropertyInterface[];
  } = { Property: [] };
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
    this.Properties.Property = property;
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
  "@Type": string;
  "@Path": string;
  "@Addressable": boolean;
}

export class AssertManifest implements Assert {
  readonly "@Type": string = "Microsoft.VisualStudio.Code.Manifest";
  "@Path": string;
  "@Addressable": boolean;

  constructor(path: string, addressable: boolean) {
    this["@Path"] = path;
    this["@Addressable"] = addressable;
  }
}

export function AssertTemplate(tp: string) {
  return class extends AssertManifest {
    readonly "@Type": string = tp;
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
  Asserts: {
    Assert: Assert[];
  } = { Assert: [] };
  constructor(metaData: Metadata) {
    this["Metadata"] = metaData;
  }
  set_asserts(asserts: Assert[]) {
    this.Asserts.Assert = asserts;
  }
}
