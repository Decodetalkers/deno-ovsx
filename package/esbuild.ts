import * as esbuild from "esbuild";
import { denoPlugin } from "@deno/esbuild-plugin";
import { exists } from "@std/fs";
import * as path from "@std/path";
const DECODE = new TextDecoder("utf-8");
async function get_main(
  project_path: string,
): Promise<string | undefined> {
  const json_path = path.join(project_path, "vscode_package.json");
  if (!await exists(json_path)) {
    return;
  }
  const data = await Deno.readFile(json_path);
  const config = JSON.parse(DECODE.decode(data));
  const exports = config["main"];
  if (typeof exports != "string") {
    return;
  }
  return exports;
}
async function read_deno_config(
  project_path: string,
): Promise<string | undefined> {
  const json_path = path.join(project_path, "deno.json");
  if (!await exists(json_path)) {
    return;
  }
  const data = await Deno.readFile(json_path);
  const config = JSON.parse(DECODE.decode(data));
  const exports = config["exports"];
  if (typeof exports != "string") {
    return;
  }
  return exports;
}

export async function build_extension(project_path: string) {
  let outfile = await get_main(project_path);
  if (!outfile) {
    return;
  }
  outfile = path.join(project_path, outfile);
  let entry_point = await read_deno_config(project_path);
  if (!entry_point) {
    return;
  }

  entry_point = path.join(project_path, entry_point);
  const configPath = path.join(project_path, "./deno.json");
  const entryPoints = [entry_point];
  await esbuild.build({
    entryPoints,
    bundle: true,
    outfile,
    format: "cjs",
    external: ["vscode"],
    plugins: [denoPlugin({ configPath })],
  });
}
