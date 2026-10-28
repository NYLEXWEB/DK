/**
 * Real-time Cross-Tab & Cross-Window Content Synchronization
 * Broadcasts updates whenever admin mutations occur so public tabs auto-refresh.
 */

export const CONTENT_SYNC_CHANNEL = "dkdc_content_sync";
export const CONTENT_SYNC_STORAGE_KEY = "dkdc_last_content_update";

// In-memory server-side timestamp for fast cross-device polling
let serverLastUpdated = Date.now();

export function getServerLastUpdated(): number {
  return serverLastUpdated;
}

export function setServerContentUpdated(): number {
  serverLastUpdated = Date.now();
  return serverLastUpdated;
}

export function notifyAdminContentUpdate(source?: string): void {
  if (typeof window === "undefined") return;

  const timestamp = Date.now().toString();

  // 1. Storage event: triggers across all other tabs/windows of the same browser
  try {
    localStorage.setItem(CONTENT_SYNC_STORAGE_KEY, timestamp);
  } catch {}

  // 2. BroadcastChannel: instant zero-latency message across tabs
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(CONTENT_SYNC_CHANNEL);
      channel.postMessage({
        type: "DKDC_CONTENT_UPDATED",
        timestamp: Number(timestamp),
        source: source || "admin",
      });
      channel.close();
    }
  } catch {}

  // 3. Dispatch local CustomEvent within current window
  try {
    window.dispatchEvent(
      new CustomEvent("dkdc:content-updated", {
        detail: { timestamp: Number(timestamp), source },
      })
    );
  } catch {}
}
