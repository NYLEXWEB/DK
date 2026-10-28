import { createUploadthing, type FileRouter } from "uploadthing/next";
import { cookies, headers } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

const f = createUploadthing();

async function checkAdminAuth() {
  try {
    // 1. Check Authorization Bearer header
    const headerStore = await headers();
    const authHeader = headerStore.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const bearer = authHeader.substring(7).trim();
      const session = await verifySessionToken(bearer);
      if (session?.username && session.role === "admin") {
        return { username: session.username };
      }
    }

    // 2. Check HTTP-only session cookie
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (token) {
      const session = await verifySessionToken(token);
      if (session?.username && session.role === "admin") {
        return { username: session.username };
      }
    }
  } catch (err) {
    console.warn("Auth verification warning in uploadthing:", err);
  }

  // In production, block unauthorized upload attempts strictly
  if (process.env.NODE_ENV === "production") {
    throw new Error("Unauthorized: Admin authentication required to upload media.");
  }
  return { username: "admin" };
}

export const ourFileRouter = {
  // Combined media uploader: handles both photos and video reels
  mediaUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 10,
    },
    video: {
      maxFileSize: "256MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await checkAdminAuth();
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl =
        (file as any).ufsUrl ||
        (file.key ? `https://utfs.io/f/${file.key}` : "");
      return {
        uploadedBy: metadata.uploadedBy,
        url: fileUrl,
        key: file.key,
        name: file.name,
        type: file.type || (file.name.match(/\.(mp4|mov|webm|m4v)$/i) ? "video" : "image"),
      };
    }),

  // Dedicated image uploader
  imageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      const user = await checkAdminAuth();
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl =
        (file as any).ufsUrl ||
        (file.key ? `https://utfs.io/f/${file.key}` : "");
      return {
        uploadedBy: metadata.uploadedBy,
        url: fileUrl,
        key: file.key,
        name: file.name,
        type: "image",
      };
    }),

  // Dedicated video uploader
  videoUploader: f({
    video: {
      maxFileSize: "256MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await checkAdminAuth();
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl =
        (file as any).ufsUrl ||
        (file.key ? `https://utfs.io/f/${file.key}` : "");
      return {
        uploadedBy: metadata.uploadedBy,
        url: fileUrl,
        key: file.key,
        name: file.name,
        type: "video",
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
