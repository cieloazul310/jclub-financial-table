import { execFile } from "node:child_process";
import { mkdtemp, readFile, readdir, rm } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join, resolve } from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";
import * as yaml from "yaml";
import { describe, expect, it } from "vitest";
import { converter } from "../scripts/converter/convert";

type CsvRow = Record<string, string>;

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageDir = resolve(__dirname, "..");
const csvPath = resolve(__dirname, "data/convert_test.csv");

async function loadCsvRows(): Promise<CsvRow[]> {
  const csvSource = await readFile(csvPath, "utf8");
  return parse(csvSource, {
    columns: true,
    skipEmptyLines: true,
  }) as CsvRow[];
}

async function readYamlFile(filePath: string) {
  const yamlSource = await readFile(filePath, "utf8");
  return yaml.parse(yamlSource);
}

describe("converter", () => {
  it("creates one directory and one yaml file for each row", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "jclub-converter-"));
    const rows = await loadCsvRows();

    try {
      await converter({ filepath: csvPath, outDir });

      const createdDirs = (await readdir(outDir)).sort();
      const expectedDirs = rows.map(({ id }) => id).sort();

      expect(createdDirs).toEqual(expectedDirs);

      const directoryFiles = await Promise.all(
        createdDirs.map(async (dirName) => {
          const files = await readdir(join(outDir, dirName));
          return [dirName, files] as const;
        }),
      );

      directoryFiles.forEach(([dirName, files]) => {
        const expectedFile = `${rows.find((row) => row.id === dirName)?.年}.yml`;
        expect(files).toEqual([expectedFile]);
      });
    } finally {
      await rm(outDir, { recursive: true, force: true });
    }
  });

  it("writes numeric values that match the CSV data", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "jclub-converter-values-"));

    try {
      await converter({ filepath: csvPath, outDir });

      const antlers = await readYamlFile(join(outDir, "antlers", "2025.yml"));
      expect(antlers.revenue).toBe(7200);
      expect(antlers.sponsor_revenue).toBe(2598);
      expect(antlers.current_assets).toBe(3419);

      const reysol = await readYamlFile(join(outDir, "reysol", "2025.yml"));
      expect(reysol.revenue).toBe(4658);
      expect(reysol.other_revenue).toBe(206);
      expect(reysol.net_assets).toBe(668);
      expect(reysol.all_attendance).toBe(237558);

      const mitohollyhock = await readYamlFile(
        join(outDir, "mitohollyhock", "2025.yml"),
      );
      expect(mitohollyhock.jleague_distribution).toBe(101);
      expect(mitohollyhock.transfer_revenue).toBe(93);
      expect(mitohollyhock.selling_general_admin_expenses).toBe(419);
    } finally {
      await rm(outDir, { recursive: true, force: true });
    }
  });
});

describe("converter CLI", () => {
  it("runs the same conversion when invoked through npm run convert", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "jclub-converter-cli-"));
    const rows = await loadCsvRows();

    try {
      const { stdout, stderr } = await execFileAsync(
        "npm",
        [
          "run",
          "convert",
          "--",
          "./__tests__/data/convert_test.csv",
          "--outDir",
          outDir,
        ],
        {
          cwd: packageDir,
        },
      );

      expect(stdout).toBeTruthy();
      expect(stderr).toBe("");

      const createdDirs = (await readdir(outDir)).sort();
      const expectedDirs = rows.map(({ id }) => id).sort();

      expect(createdDirs).toEqual(expectedDirs);

      const antlers = await readYamlFile(join(outDir, "antlers", "2025.yml"));
      expect(antlers.revenue).toBe(7200);
    } finally {
      await rm(outDir, { recursive: true, force: true });
    }
  });
});
