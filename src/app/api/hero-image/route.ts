import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const localDest = path.join(process.cwd(), "public", "images", "hero-bg.png");
  if (fs.existsSync(localDest)) {
    const fileBuffer = fs.readFileSync(localDest);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const uploadedPath =
    "C:\\Users\\hnith\\.gemini\\antigravity-ide\\brain\\f6bb96f3-168c-4b61-a6fc-86c9a6f21823\\.user_uploaded\\media_1792439943269.png";

  if (fs.existsSync(uploadedPath)) {
    try {
      const dir = path.dirname(localDest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(uploadedPath, localDest);
    } catch {
      // fallback to streaming from source
    }

    const fileBuffer = fs.readFileSync(uploadedPath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new NextResponse("Hero background not found", { status: 404 });
}
