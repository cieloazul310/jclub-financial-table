import * as fs from "fs/promises";
import * as path from "path";

async function copyDataset(): Promise<void> {
  const src = path.resolve(
    process.cwd(),
    "..",
    "..",
    "packages",
    "data",
    "dist",
    "dataset",
  );
  const dest = path.resolve(process.cwd(), "public", "dataset");
  try {
    const s = await fs.stat(src);
    if (!s.isDirectory()) throw new Error("source is not a directory");
  } catch (err) {
    console.warn(`dataset source not found at ${src}, skipping copy`);
    return;
  }

  try {
    await fs.rm(dest, { recursive: true, force: true });
    await fs.mkdir(path.dirname(dest), { recursive: true });
    // Use fs.cp if available
    const anyFs = fs as any;
    if (typeof anyFs.cp === "function") {
      await anyFs.cp(src, dest, { recursive: true });
    } else {
      // fallback: copy files manually
      const entries = await fs.readdir(src);
      await fs.mkdir(dest, { recursive: true });
      for (const e of entries) {
        await fs.copyFile(path.join(src, e), path.join(dest, e));
      }
    }

    console.log(`copied dataset: ${src} -> ${dest}`);
  } catch (err) {
    console.error("failed to copy dataset:", err);
    throw err;
  }
}

void copyDataset();
