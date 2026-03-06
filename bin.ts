import file from "./deno.json" with { type: "json" };
import { createVSIX } from "./mod.ts";
import { clapCli, type Command } from "@nobody/deno-clap";
import { publishOVSX, publishVscode } from "./publish.ts";

const version = file.version;

const OVSX = {
  publishVscode: {
    description: "publish to vscode",
    children: {
      pat: {
        description: "with token",
        type: "string",
      },
      target: {
        description: "with target",
        type: "string",
      },
    },
  },
  publishOvsx: {
    description: "publish to ovsx",
    children: {
      pat: {
        description: "with token",
        type: "string",
      },
      target: {
        description: "with target",
        type: "string",
      },
    },
  },
  build: {
    description: "build the target",
    children: {
      path: {
        description: "the path of directory",
        type: "string",
      },
    },
  },
} as const;

const cmd: Command = {
  exeName: "deno-ovsx",
  description: "vscode plugin deno version",
  author: "Decodetalkers",

  version,
};

const results = clapCli(OVSX, cmd);

if (results?.publishVscode) {
  let path = results.publishVscode.target;
  if (!path) {
    const build_path = results.build?.path || "./";
    const packageInfo = await createVSIX(build_path);
    if (!packageInfo) {
      Deno.exit(0);
    }

    console.log(packageInfo.fileName);
    for (const entry of packageInfo.entries) {
      console.log(`   ${entry.filename}`);
    }
    path = packageInfo.fileName;
  }
  const token = results.publishVscode.pat;
  await publishVscode({
    packagePath: [path],
    pat: token,
  });
  Deno.exit(0);
}

if (results?.publishOvsx) {
  let path = results.publishOvsx.target;
  if (!path) {
    const build_path = results.build?.path || "./";
    const packageInfo = await createVSIX(build_path);
    if (!packageInfo) {
      Deno.exit(0);
    }

    console.log(packageInfo.fileName);
    for (const entry of packageInfo.entries) {
      console.log(`   ${entry.filename}`);
    }
    path = packageInfo.fileName;
  }
  const token = results.publishOvsx.pat;
  await publishOVSX({
    packagePath: [path],
    pat: token,
  });
  Deno.exit(0);
}

if (results?.build) {
  const path = results.build.path || "./";
  const packageInfo = await createVSIX(path);
  if (!packageInfo) {
    Deno.exit(0);
  }

  console.log(packageInfo.fileName);
  for (const entry of packageInfo.entries) {
    console.log(`   ${entry.filename}`);
  }
}
