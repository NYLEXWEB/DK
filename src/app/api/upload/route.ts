import { NextRequest, NextResponse } from "next/server";
import { UTApi, UTFile } from "uploadthing/server";
import { verifyRequestAuth } from "@/lib/auth";
import dns from "dns";

export const runtime = "nodejs";

// Force IPv4 lookup for UploadThing ingest endpoints on dual-stack / NAT64 Windows environments
const originalLookup = dns.lookup;
if (!(dns as any).__ipv4Hooked) {
  (dns as any).lookup = function (hostname: any, options: any, callback: any) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (typeof options === "number") {
      options = { family: options };
    }
    // Prioritize IPv4 to avoid hanging on unroutable IPv6 NAT64 interfaces
    options = Object.assign({}, options, { family: 4, verbatim: false });
    return (originalLookup as any).call(dns, hostname, options, callback);
  };
  (dns as any).__ipv4Hooked = true;
}

// Maximum upload file sizes: Images 16MB, Videos 256MB
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // 1. Authenticate admin user
  const session = await verifyRequestAuth(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const isVideo =
      file.type.startsWith("video/") ||
      Boolean(file.name.match(/\.(mp4|mov|webm|m4v)$/i));

    // 2. Upload directly to UploadThing Cloud Storage via Server SDK
    // This marks the file as 'Uploaded' directly on the UploadThing Dashboard!
    const token = process.env.UPLOADTHING_TOKEN || process.env.UPLOADTHING_SECRET;
    if (!token) {
      return NextResponse.json(
        { error: "UploadThing configuration token is missing in environment." },
        { status: 500 }
      );
    }

    const utapi = new UTApi({ token });
    const utFile = new UTFile([buffer], file.name, {
      type: file.type || (isVideo ? "video/mp4" : "image/jpeg"),
    });

    const uploadResults = await utapi.uploadFiles([utFile]);
    const result = Array.isArray(uploadResults) ? uploadResults[0] : uploadResults;

    if (!result || !result.data) {
      const errMsg = result?.error?.message || "Failed to upload file to UploadThing Cloud.";
      console.error("UploadThing Cloud upload error:", result?.error);
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    // Permanent UploadThing Cloud CDN URL
    const cloudUrl =
      result.data.ufsUrl ||
      result.data.url ||
      `https://utfs.io/f/${result.data.key}`;

    return NextResponse.json({
      success: true,
      url: cloudUrl,
      key: result.data.key,
      name: file.name,
      size: file.size,
      type: isVideo ? "video" : "image",
      source: "uploadthing-cloud",
    });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file to UploadThing Cloud." },
      { status: 500 }
    );
  }
}
