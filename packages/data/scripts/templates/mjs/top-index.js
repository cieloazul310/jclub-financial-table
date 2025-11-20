import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
const __filename = typeof globalThis.__filename !== "undefined"
    ? globalThis.__filename
    : fileURLToPath(import.meta.url);
const __dirname = typeof globalThis.__dirname !== "undefined"
    ? globalThis.__dirname
    : path.dirname(__filename);
const base = path.resolve(__dirname);
async function loadJsonSync(file) {
    try {
        return JSON.parse(await fs.readFile(file, "utf8"));
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
export const clubs = ["club-name-collection"];
export async function getDataByClub(club) {
    const dir = path.join(base, club);
    try {
        const files = (await fs.readdir(dir)).filter((filename) => filename.endsWith(".json"));
        const data = files.map(async (filename) => await loadJsonSync(path.join(dir, filename)));
        return (await Promise.all(data)).filter((json) => Boolean(json));
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export async function getDataByYear(year) {
    const output = [];
    for (const club of ["club-name-collection"]) {
        const pathname = path.join(base, club, String(year) + ".json");
        const item = await loadJsonSync(pathname);
        if (item)
            output.push(item);
    }
    return output;
}
export async function getDatum(club, year) {
    const pathname = path.join(base, club, String(year) + ".json");
    return await loadJsonSync(pathname);
}
