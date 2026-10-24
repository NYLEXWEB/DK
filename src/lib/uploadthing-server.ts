import { UTApi } from "uploadthing/server";
import dns from "dns";

// Ensure IPv4 lookup for UploadThing API on dual-stack / NAT64 Windows environments
const originalLookup = dns.lookup;
if (!(dns as any).__ipv4HookedServer) {
  (dns as any).lookup = function (hostname: any, options: any, callback: any) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (typeof options === "number") {
      options = { family: options };
    }
    options = Object.assign({}, options, { family: 4, verbatim: false });
    return (originalLookup as any).call(dns, hostname, options, callback);
  };
  (dns as any).__ipv4HookedServer = true;
}

/**
 * Extracts UploadThing file key from either a raw key string or a full CDN URL
 * Examples:
 * - "P0pLE4vyUn8HaHYKw54VsXtEDibqTNURJwL62mhQr3vnaHjo" -> returns as-is
 * - "https://utfs.io/f/P0pLE4vyUn8HaHYKw54VsXtEDibqTNURJwL62mhQr3vnaHjo" -> "P0pLE4vyUn8HaHYKw54VsXtEDibqTNURJwL62mhQr3vnaHjo"
 * - "https://igfozd2k6k.ufs.sh/f/P0pLE4vyUn8HaHYKw54VsXtEDibqTNURJwL62mhQr3vnaHjo" -> "P0pLE4vyUn8HaHYKw54VsXtEDibqTNURJwL62mhQr3vnaHjo"
 */
export function extractUploadThingKey(keyOrUrl?: string | null): string | null {
  if (!keyOrUrl) return null;
  const str = keyOrUrl.trim();
  if (!str) return null;

  // Don't process non-UploadThing local paths
  if (str.startsWith("/images/") || str.startsWith("/videos/")) {
    return null;
  }

  // If it's a URL containing /f/
  if (str.includes("/f/")) {
    const key = str.split("/f/").pop()?.split("?")[0]?.trim();
    return key || null;
  }

  // If it's already a plain file key (no protocols or hostnames)
  if (!str.startsWith("http://") && !str.startsWith("https://") && !str.includes("/")) {
    return str;
  }

  return null;
}

/**
 * Deletes multiple files from UploadThing Cloud Storage in a single call.
 * Accepts keys or URLs.
 */
export async function deleteUploadThingFiles(
  keysOrUrls: (string | undefined | null)[]
): Promise<boolean> {
  const keys = Array.from(
    new Set(
      keysOrUrls
        .map(extractUploadThingKey)
        .filter((k): k is string => Boolean(k))
    )
  );

  if (keys.length === 0) {
    return true;
  }

  try {
    const token = process.env.UPLOADTHING_TOKEN || process.env.UPLOADTHING_SECRET;
    if (!token) {
      console.warn(
        "[UploadThing] Token not configured; skipping remote cloud deletion for keys:",
        keys
      );
      return true;
    }

    const utapi = new UTApi({ token });
    console.log(`[UploadThing] Deleting ${keys.length} cloud file(s):`, keys);
    const res = await utapi.deleteFiles(keys);
    console.log("[UploadThing] Cloud deletion result:", res);
    return res.success;
  } catch (err) {
    console.error("[UploadThing] Error deleting cloud file(s):", err);
    return false;
  }
}

/**
 * Deletes a single file from UploadThing Cloud Storage.
 * Accepts a key or full URL.
 */
export async function deleteUploadThingFile(keyOrUrl?: string | null): Promise<boolean> {
  return deleteUploadThingFiles([keyOrUrl]);
}
