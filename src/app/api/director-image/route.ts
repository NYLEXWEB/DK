import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const src = "C:\\Users\\hnith\\.gemini\\antigravity-ide\\brain\\48ce4e69-afe3-4353-a538-1c9d0475c84a\\.user_uploaded\\media_1792481944579.png";
    const dest = path.join(process.cwd(), "public", "images", "dhanesh-krishnan.png");

    if (fs.existsSync(src)) {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
      return NextResponse.json({ success: true, copied: true, dest });
    }

    return NextResponse.json({ success: false, error: "Source not found" }, { status: 404 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
