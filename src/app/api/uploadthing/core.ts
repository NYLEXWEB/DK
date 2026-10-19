import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

const f = createUploadthing();

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) throw new UploadThingError("Unauthorized: Admin login required");
  const session = await verifySessionToken(token);
  if (!session) throw new UploadThingError("Unauthorized: Invalid session");
  return { username: session.username };
}

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 4,
    },
  })
    .middleware(async () => {
      const user = await checkAdminAuth();
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        uploadedBy: metadata.uploadedBy,
        url: file.url,
        key: file.key,
        name: file.name,
      };
    }),

  videoUploader: f({
    video: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await checkAdminAuth();
      return { uploadedBy: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        uploadedBy: metadata.uploadedBy,
        url: file.url,
        key: file.key,
        name: file.name,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
