import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

const allowedFiles = new Set(["config.json", "home.json", "sbv.json", "hospedagem.json"]);

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;

  if (!allowedFiles.has(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = join(process.cwd(), "data", file);
  const json = await readFile(filePath, "utf8");

  return new NextResponse(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}
