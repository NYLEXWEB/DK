import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UTApi } from "uploadthing/server";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const utapi = new UTApi();

export async function deleteUploadThingFile(key?: string): Promise<boolean> {
  if (!key) return true;
  try {
    const token = process.env.UPLOADTHING_TOKEN || process.env.UPLOADTHING_SECRET;
    if (!token) {
      console.warn("UploadThing token not configured; skipping remote file deletion for key:", key);
      return true;
    }
    const res = await utapi.deleteFiles([key]);
    return res.success;
  } catch (err) {
    console.error("Failed to delete file from UploadThing:", err);
    return false;
  }
}
