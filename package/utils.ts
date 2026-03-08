const escapeChars = new Map([
  ["'", "&apos;"],
  ['"', "&quot;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ["&", "&amp;"],
]);

// deno-lint-ignore no-explicit-any
export function escape(value: any): string {
  return String(value).replace(
    /(['"<>&])/g,
    (_, char) => escapeChars.get(char)!,
  );
}
