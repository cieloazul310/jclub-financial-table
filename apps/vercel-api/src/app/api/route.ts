import { NextResponse } from "next/server";
/*
import fs from "fs/promises";
import path from "path";

async function findDatasetDir(): Promise<string | null> {
  // Prefer static public dataset (copied at build time). Fallback to package dist for local dev.
  const candidates = [
    path.resolve(process.cwd(), "public", "dataset"),
    path.resolve(process.cwd(), "packages", "data", "dist", "dataset"),
    path.resolve(process.cwd(), "packages", "statistics", "dist", "dataset"),
  ];
  for (const c of candidates) {
    try {
      const s = await fs.stat(c);
      if (s.isDirectory()) return c;
    } catch (err) {
      // ignore
    }
  }
  return null;
}

export const runtime = "nodejs";
*/

export async function GET(req: Request) {
  const url = new URL(req.url);
  const year = url.searchParams.get("year");
  const category = url.searchParams.get("category");
  const club = url.searchParams.get("club");

  return NextResponse.json({ year, category, club }, { status: 200 });
  /*

  if (!year || !category) {
    return NextResponse.json({ error: "missing year or category" }, { status: 400 });
  }

  const dir = await findDatasetDir();
  if (!dir) return NextResponse.json({ error: "dataset not available" }, { status: 500 });

  const filename = `${year}-${category}.json`;
  try {
    const raw = await fs.readFile(path.join(dir, filename), "utf8");
    const json = JSON.parse(raw);
    // optional club filter
    const cacheHeaders = { "Cache-Control": "public, max-age=60, s-maxage=86400, stale-while-revalidate=3600" };
    if (club) {
      const entry = (json.stats ? json : json).stats; // tolerate different shapes
      // find club in values for each field is consumer's responsibility; here return whole file
      // but indicate requested club in meta
      return NextResponse.json({ meta: { year, category, club }, data: json }, { status: 200, headers: cacheHeaders });
    }
    return NextResponse.json(json, { status: 200, headers: cacheHeaders });
  } catch (err) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  */
}
