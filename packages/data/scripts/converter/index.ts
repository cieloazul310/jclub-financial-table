import { fileURLToPath } from "url";
import { resolve } from "path";
import { converter } from "./convert";

async function main() {
  const filepath = resolve(process.argv[2]);
  const outDir = (() => {
    if (process.argv[3] === "--outDir" && process.argv[4]) {
      return resolve(process.argv[4]);
    }
    return undefined;
  })();

  await converter({ filepath, outDir });
}

// ESM-safe check: run main when the script is executed directly
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  (async () => {
    await main();
  })();
}
