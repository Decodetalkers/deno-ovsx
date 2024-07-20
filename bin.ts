import { parseArgs } from "@std/cli";

import file from "./deno.json" with { type: "json" };
import { makeVisxPackage } from "./package.ts";

const version = file.version;

interface ArgsParses {
  help?: boolean;
  build?: boolean;
  path?: string;
  token?: string;
  version?: string;
}

const input_args = parseArgs(Deno.args) as ArgsParses;

if (input_args.version) {
  console.log(`version: ${version}`);
  Deno.exit(0);
}

if (input_args.help) {
  console.log("welcome to deno_ovsx");
  Deno.exit(0);
}

if (input_args.build) {
  const path = input_args.path || "./";
  await makeVisxPackage(path);
}
