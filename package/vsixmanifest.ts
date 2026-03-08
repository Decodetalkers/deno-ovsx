import type { JsonInfo } from "./json_reader.ts";
import { escape } from "./utils.ts";
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
    changelog,
    pricing,
    githubMarkdown,
  }: JsonInfo,
): XMlVisxManifest {
  const identifier = new Identify(name, version, publisher);
  const metadata = new Metadata(
    identifier,
    name,
    description,
    "extension/LICENSE.txt",
    `extension/${icon}` || "",
  );
  metadata.set_tags(tags);
  const properties = [
    new PropertyEngine(engine),
    new PropertyExtensionPack(),
    new PropertyExtensionKind("workspace"),
    new PropertyLocalizedLanguages(),
    new PropertyExtensionPricing(pricing),
    new PropertyExtensionMarkdown(escape(githubMarkdown)),
  ];

  if (url) {
    let remote_url = "";
    let link = "";
    if (typeof url == "string") {
      link = url;
      remote_url = url;
    } else if (url.url) {
      link = url.url;
      remote_url = url.url;
      if (url.type == "git") {
        link = link + ".git";
      }
    }

    if (remote_url != "") {
      properties.push(new PropertyLinksSource(link));
      properties.push(new PropertyLinksGetstarted(remote_url));
      properties.push(new PropertyLinksGithub(link));
      properties.push(new PropertyLinksSupport(remote_url));
      properties.push(new PropertyLinksLearn(remote_url));
    }
  }

  metadata.set_properties(properties);
  metadata.set_categrates(categories || []);
  const asserts = [new AssetManifest("extension/package.json", true)];
  if (icon) {
    asserts.push(new AssetIconDefault(`extension/${icon}`, true));
  }
  if (contains_license) {
    asserts.push(new AssetLicense("extension/LICENSE.txt", true));
  }
  if (contains_readme) {
    asserts.push(new AssetDetails("extension/readme.md", true));
  }
  asserts.push(new AssetChangelog(changelog, true));
  const minifest = new PackageManifest(metadata);
  minifest.set_asserts(asserts);
  return new XMlVisxManifest(minifest);
}

export class XMlVisxManifest {
  readonly "@version": string = "1.0";
  readonly "@encoding": string = "utf-8";
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
export class PropertyExtensionPricing implements PropertyInterface {
  readonly "@Id": string = "Microsoft.VisualStudio.Services.Content.Pricing";
  "@Value": string = "";
  constructor(value: string) {
    this["@Value"] = value;
  }
}

export class PropertyExtensionMarkdown implements PropertyInterface {
  readonly "@Id": string =
    "Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown";
  "@Value": string = "";
  constructor(value: string) {
    this["@Value"] = value;
  }
}
function PropertyTemplate(id: string): typeof PropertyExtensionPack {
  return class extends PropertyExtensionPack {
    override "@Id" = id;
  };
}

export const PropertyEngine: typeof PropertyExtensionPack = PropertyTemplate(
  "Microsoft.VisualStudio.Code.Engine",
);

export const PropertyExtensionDependencies: typeof PropertyExtensionPack =
  PropertyTemplate(
    " Microsoft.VisualStudio.Code.ExtensionDependencies",
  );

export const PropertyExtensionKind: typeof PropertyExtensionPack =
  PropertyTemplate(
    "Microsoft.VisualStudio.Code.ExtensionKind",
  );

export const PropertyLocalizedLanguages: typeof PropertyExtensionPack =
  PropertyTemplate(
    "Microsoft.VisualStudio.Code.LocalizedLanguages",
  );

export const PropertyLinksSource: typeof PropertyExtensionPack =
  PropertyTemplate(
    "Microsoft.VisualStudio.Services.Links.Source",
  );

export const PropertyLinksGetstarted: typeof PropertyExtensionPack =
  PropertyTemplate(
    "Microsoft.VisualStudio.Services.Links.Getstarted",
  );

export const PropertyLinksGithub: typeof PropertyExtensionPack =
  PropertyTemplate(
    "Microsoft.VisualStudio.Services.Links.GitHub",
  );

export const PropertyLinksSupport: typeof PropertyExtensionPack =
  PropertyTemplate(
    "Microsoft.VisualStudio.Services.Links.Support",
  );

export const PropertyLinksLearn: typeof PropertyExtensionPack =
  PropertyTemplate(
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
  "@Id": string;
}

export const InstallationTargetDefault: InstallationTarget = {
  "@Id": "Microsoft.VisualStudio.Code",
};

export interface Asset {
  "@Type": string;
  "@Path": string;
  "@Addressable": boolean;
}

export class AssetManifest implements Asset {
  readonly "@Type": string = "Microsoft.VisualStudio.Code.Manifest";
  "@Path": string;
  "@Addressable": boolean;

  constructor(path: string, addressable: boolean) {
    this["@Path"] = path;
    this["@Addressable"] = addressable;
  }
}

export class AssetChangelog implements Asset {
  readonly "@Type": string =
    "Microsoft.VisualStudio.Services.Content.Changelog";
  "@Path": string;
  "@Addressable": boolean;

  constructor(path: string, addressable: boolean) {
    this["@Path"] = path;
    this["@Addressable"] = addressable;
  }
}

export function AssetTemplate(tp: string): typeof AssetManifest {
  return class extends AssetManifest {
    override readonly "@Type": string = tp;
  };
}

export const AssetDetails: typeof AssetManifest = AssetTemplate(
  "Microsoft.VisualStudio.Services.Content.Details",
);

export const AssetLicense: typeof AssetManifest = AssetTemplate(
  "Microsoft.VisualStudio.Services.Content.License",
);

export const AssetIconDefault: typeof AssetManifest = AssetTemplate(
  "Microsoft.VisualStudio.Services.Icons.Default",
);

export class PackageManifest {
  readonly "@Version": string = "2.0.0";
  readonly "@xmlns": string =
    "http://schemas.microsoft.com/developer/vsx-schema/2011";
  readonly "@xmlns:d": string =
    "http://schemas.microsoft.com/developer/vsx-schema-design/2011";

  "Metadata": Metadata;
  Installation: { InstallationTarget: InstallationTarget[] } = {
    InstallationTarget: [
      InstallationTargetDefault,
    ],
  };
  Assets: {
    Asset: Asset[];
  } = { Asset: [] };
  constructor(metaData: Metadata) {
    this["Metadata"] = metaData;
  }
  set_asserts(asserts: Asset[]) {
    this.Assets.Asset = asserts;
  }
}
