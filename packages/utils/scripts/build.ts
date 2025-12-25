import { mkdir } from "fs/promises";
import { resolve } from "path";

import { buildClubs } from "./build-clubs";
import { buildDictonary } from "./build-dictionary";
import { buildYears } from "./build-years";

const __dirname = import.meta.dirname;
const outDir = resolve(__dirname, "../src/data");

try {
  await mkdir(outDir, { recursive: true });
  await buildDictonary();
  console.log("Build dictionary");
  await buildClubs();
  console.log("Build clubs");
  await buildYears();
  console.log("Build years");
} catch (e) {
  console.error(e);
}
