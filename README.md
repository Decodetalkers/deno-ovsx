# Ovsx tool for deno

[![JSR](https://jsr.io/badges/@nobody/deno-ovsx)](https://jsr.io/@nobody/deno-ovsx)

use `vscode_package.json` to replace `package.json`, use deno to develop your
plugin

usage

```bash
deno run jsr:@nobody/deno-ovsx/bin --build
```

## Document

### replace package.json to vscode_package.json

for example

![vscode_package.json](./example/vscode_package.json)

```json
{
  "name": "my-vscode-test",
  "description": "vscode extension for neocmakelsp",
  "author": "Decodetalkers",
  "license": "MIT",
  "version": "0.0.7",
  "publisher": "Decodetalkers",
  "icon": "icon.png",
  "categories": [
    "Programming Languages",
    "Linters",
    "Formatters",
    "Debuggers"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/neocmakelsp/neocmakelsp-vscode"
  },
  "engines": {
    "vscode": "^1.100.0"
  },
  "contributes": {
    "configuration": {
      "type": "object",
      "title": "neocmakelsp",
      "properties": {
        "neocmakelsp.tcp": {
          "type": "boolean",
          "default": false,
          "description": "use tcp to start neocmakelsp"
        },
        "neocmakelsp.localtarget": {
          "type": "boolean",
          "default": false,
          "description": "use neocmakelsp from local path"
        },
        "neocmakelsp.path": {
          "type": "string",
          "default": "neocmakelsp",
          "description": "path of neocmakelsp"
        },
        "neocmakelsp.debug": {
          "type": "boolean",
          "default": false,
          "description": "enable the debug feature"
        },
        "neocmakelsp.lsp_snippets": {
          "type": "boolean",
          "default": false,
          "description": "enable the lsp snippets"
        }
      }
    },
    "languages": [
      {
        "id": "cmake",
        "extensions": [
          ".cmake"
        ],
        "filenames": [
          "CMakelists.txt"
        ],
        "aliases": [
          "CMake"
        ]
      },
      {
        "id": "cmake-cache",
        "filenames": [
          "CMakeCache.txt"
        ],
        "aliases": [
          "CMake Cache"
        ]
      }
    ],
    "breakpoints": [
      {
        "language": "cmake"
      }
    ],
    "debuggers": [
      {
        "type": "cmake",
        "label": "CMake",
        "languages": [
          "cmake"
        ],
        "configurationAttributes": {
          "launch": {
            "properties": {
              "pipeName": {
                "type": "string",
                "description": "Name of the named piped that the debugger will communicate with CMake over"
              },
              "scriptPath": {
                "type": "string",
                "description": "the started script",
                "default": "script.cmake"
              },
              "cmakeDebugType": {
                "type": "string",
                "enum": [
                  "configure",
                  "script"
                ],
                "description": "cmake debug type",
                "default": "configure"
              }
            }
          }
        },
        "initialConfigurations": [
          {
            "type": "cmake",
            "request": "launch",
            "name": "configure",
            "cmakeDebugType": "configure"
          }
        ],
        "configurationSnippets": [
          {
            "label": "cmake project launch",
            "description": "debug when configure the project",
            "body": {
              "type": "cmake",
              "request": "launch",
              "name": "project debug",
              "cmakeDebugType": "configure"
            }
          },
          {
            "label": "cmake script debug launch",
            "description": "debug a single cmake file",
            "body": {
              "type": "cmake",
              "request": "launch",
              "name": "script debug",
              "cmakeDebugType": "script",
              "scriptPath": "script.cmake"
            }
          }
        ]
      }
    ],
    "menus": {
      "commandPalette": [
        {
          "command": "neocmakelsp.outline.runScriptDebugger",
          "when": "neocmakelsp.debug == true"
        },
        {
          "command": "neocmakelsp.outline.runConfigureDebugger",
          "when": "neocmakelsp.debug == true"
        }
      ]
    },
    "commands": [
      {
        "command": "neocmakelsp.runScriptDebugger",
        "title": "debug current cmake script",
        "categories": "CMake",
        "when": "neocmakelsp.debug == true"
      },
      {
        "command": "neocmakelsp.outline.runScriptDebugger",
        "title": "debug current cmake script",
        "categories": "CMake",
        "when": "neocmakelsp.debug == true"
      },
      {
        "command": "neocmakelsp.runConfigureDebugger",
        "title": "debug current cmake workspace",
        "categories": "CMake",
        "when": "neocmakelsp.debug == true"
      },
      {
        "command": "neocmakelsp.outline.runConfigureDebugger",
        "title": "debug current cmake workspace",
        "categories": "CMake",
        "when": "neocmakelsp.debug == true"
      }
    ],
    "grammars": [
      {
        "language": "cmake",
        "scopeName": "source.cmake",
        "path": "./syntaxes/CMake.tmLanguage"
      },
      {
        "language": "cmake-cache",
        "scopeName": "source.cmakecache",
        "path": "./syntaxes/CMakeCache.tmLanguage"
      }
    ]
  },
  "activationEvents": [
    "onLanguage:cmake"
  ],
  "main": "./out/extension.js"
}
```

### Config your deno.json

for example

```json
{
  "tasks": {
    "dev": "deno run --watch main.ts",
    "unit_test": "deno test -A"
  },
  "exports": "./src/extension.ts",
  "imports": {
    "@aws-sdk/client-s3": "npm:@aws-sdk/client-s3@^3.1002.0",
    "@deno/esbuild-plugin": "jsr:@deno/esbuild-plugin@^1.2.1",
    "@std/assert": "jsr:@std/assert@^1.0.19",
    "@types/vscode": "npm:@types/vscode@^1.96.0",
    "@types/unzipper": "npm:@types/unzipper@^0.10.11",
    "esbuild": "npm:esbuild@^0.27.3",
    "@npm:uuid": "npm:uuid@^13.0.0",
    "@npm:tar": "npm:tar@^7.5.10",
    "unzipper": "npm:unzipper@^0.12.3",
    "vscode-languageclient": "npm:vscode-languageclient@^9.0.1",
    "@npm:which": "npm:which@^6.0.1"
  }
}
```

You need a exports field, and it should be a string.

### Build your plugin

run

```bash
deno run jsr:@nobody/deno-ovsx/bin --build
```

if it is in another folder, for example, in this repo

```bash
deno run jsr:@nobody/deno-ovsx/bin --build --path=./example
```

Finally! You get a vsix that built with deno! Congraduation!
