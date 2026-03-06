import * as path from "@std/path";

import { exists } from "@std/fs";
import { warn } from "@std/log";

const PACKAGE_JSON_NAME = "vscode_package.json";
const READMES = ["README.md", "readme.md"];
const LICENSES = ["LICENSE", "LICENSE.txt"];

interface Languages {
  id: string;
  extensions?: string[];
  filenames?: string[];
  alias?: string[];
}

export interface JsonInfo {
  name: string;
  description: string;
  author: string;
  license: string;
  version: string;
  publisher: string;
  icon: string | undefined;
  changelog: string;
  categories: string[] | undefined;
  url: {
    "type": string;
    url: string;
  } | undefined;
  engine: string;
  main: string;
  tags: string[];
  contains_readme: boolean;
  contains_license: boolean;
}

export async function projectDirReader(
  dir_path: URL,
): Promise<JsonInfo | undefined> {
  const json_path = path.join(dir_path.pathname, PACKAGE_JSON_NAME);
  const info = await packageJsonReader(
    dir_path,
    new URL("file://" + json_path),
  );
  if (!info) {
    return info;
  }
  for (const readme of READMES) {
    const readme_path = new URL(
      "file://" + path.join(dir_path.pathname, readme),
    );
    if (await exists(readme_path)) {
      info.contains_readme = true;
    }
  }
  for (const license of LICENSES) {
    const license_path = new URL(
      "file://" +
        path.join(dir_path.pathname, license),
    );
    if (await exists(license_path)) {
      info.contains_license = true;
    }
  }
  return info;
}

async function packageJsonReader(
  dir_path: URL,
  json_path: URL,
): Promise<JsonInfo | undefined> {
  let changelog: ChangeLog;
  if (await exists(path.join(dir_path, "CHANGELOG.md"))) {
    changelog = "extension/CHANGELOG.md";
  } else if (await exists(path.join(dir_path, "changelog.md"))) {
    changelog = "extension/changelog.md";
  } else {
    warn("We need a changelog");
    return;
  }
  const response = await fetch(json_path);
  if (!response.ok) {
    return undefined;
  }
  const data = await response.json();
  return packageMainData(data, changelog);
}

type ChangeLog = "extension/CHANGELOG.md" | "extension/changelog.md";

function packageMainData(
  // deno-lint-ignore no-explicit-any
  data: any,
  changelog: ChangeLog,
): JsonInfo | undefined {
  const name = data["name"] as string;
  const description = data["description"] as string;
  const author = data["author"] as string;
  const license = data["license"] as string;
  const version = data["version"] as string;
  const publisher = data["publisher"] as string;
  const icon = data["icon"] as (string | undefined);
  const categories = data["categories"] as (string[] | undefined);
  const url =
    data["repository"] as ({ "type": string; "url": string } | undefined);
  const engine = data["engines"]["vscode"] as string;
  const main = data["main"] as string;

  let tags: string[] = [];
  if (
    data["contributes"] !== undefined &&
    data["contributes"]["languages"] !== undefined
  ) {
    const lg = data["contributes"]["languages"] as Languages[];
    tags = Array.from(lg, (l) => l.id);
  }
  return {
    name,
    description,
    author,
    license,
    version,
    publisher,
    icon,
    changelog,
    categories,
    url,
    engine,
    main,
    tags,
    contains_readme: false,
    contains_license: false,
  };
}
