import file from "./deno.json" with { type: "json" };
import { createVSIX } from "./mod.ts";
import { clapCli, type Command } from "@nobody/deno-clap";
import { publishOVSX, publishVscode } from "./publish.ts";
import * as bgColor from "@std/fmt/colors";
const version = file.version;

enum LogMessageType {
  DONE,
  INFO,
  WARNING,
  ERROR,
}
const LogPrefix = {
  [LogMessageType.DONE]: bgColor.bgBrightGreen(" DONE "),
  [LogMessageType.INFO]: bgColor.bgBrightBlue(" INFO "),
  [LogMessageType.WARNING]: bgColor.bgYellow(" WARNING "),
  [LogMessageType.ERROR]: bgColor.bgRed(" ERROR "),
};

// deno-lint-ignore no-explicit-any
function _log(type: LogMessageType, msg: any, ...args: any[]): void {
  args = [LogPrefix[type], msg, ...args];

  if (type === LogMessageType.WARNING) {
    console.warn(...args);
  } else if (type === LogMessageType.ERROR) {
    console.error(...args);
  } else {
    console.log(...args);
  }
}

export interface LogFn {
  // deno-lint-ignore no-explicit-any
  (msg: any, ...args: any[]): void;
}

export const log = {
  done: _log.bind(null, LogMessageType.DONE) as LogFn,
  info: _log.bind(null, LogMessageType.INFO) as LogFn,
  warn: _log.bind(null, LogMessageType.WARNING) as LogFn,
  error: _log.bind(null, LogMessageType.ERROR) as LogFn,
};

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
  debug: {
    description: "start with debug",
    default: false,
    type: "boolean",
  },
} as const;

const cmd: Command = {
  exeName: "deno-ovsx",
  description: "vscode plugin deno version",
  author: "Decodetalkers",

  version,
};

const results = clapCli(OVSX, cmd);

export function handleError(
  debug?: boolean,
  additionalMessage?: string,
  exit: boolean = true,
  // deno-lint-ignore no-explicit-any
): (reason: any) => void {
  return (reason) => {
    if (reason instanceof Error && !debug) {
      log.error(`\u274c  ${reason.message}`);
      if (additionalMessage) {
        log.error(additionalMessage);
      }
    } else if (typeof reason === "string") {
      log.error(`\u274c  ${reason}`);
    } else if (reason !== undefined) {
      log.error(reason);
    } else {
      log.error("An unknown error occurred.");
    }

    if (exit) {
      Deno.exit(1);
    }
  };
}
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
  try {
    await publishVscode({
      packagePath: [path],
      pat: token,
    });
  } catch (e) {
    // deno-lint-ignore no-explicit-any
    const message = (e as any).message as string;
    const errorHandler = handleError(results.debug, message, false);
    errorHandler(new Error("rejected"));
    Deno.exit(1);
  }
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
  const publish_results = await publishOVSX({
    packagePath: [path],
    pat: token,
  });
  const reasons = publish_results.filter((result) =>
    result.status === "rejected"
  )
    .map((rejectedResult) => rejectedResult.reason);

  if (reasons.length > 0) {
    const message = "See the documentation for more information:\n" +
      "https://github.com/eclipse/openvsx/wiki/Publishing-Extensions";
    const errorHandler = handleError(results.debug, message, false);
    for (const reason of reasons) {
      errorHandler(reason);
    }

    Deno.exit(1);
  }
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

  console.log();

  log.done(`${packageInfo.fileName} build complete`);
}
