"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CONTENT_SYNC_CHANNEL, CONTENT_SYNC_STORAGE_KEY } from "@/lib/sync-events";

/**
 * AutoRefreshSync Component
 * Automatically refreshes the public website whenever changes are made in the Admin Panel.
 * Supports:
 * 1. Instant cross-tab BroadcastChannel
 * 2. Cross-tab localStorage storage events
 * 3. Instant reload on tab focus / visibilitychange
 * 4. Background lightweight timestamp polling for cross-browser / cross-device updates
 */
export function AutoRefreshSync() {
  const pathname = usePathname();
  const mountTimeRef = useRef<number>(Date.now());
  const isReloadingRef = useRef<boolean>(false);
  const pendingRefreshRef = useRef<boolean>(false);

  useEffect(() => {
    // Only active on public pages; never auto-reload inside /admin
    if (pathname.startsWith("/admin")) {
      return;
    }

    const triggerReload = (reason: string) => {
      if (isReloadingRef.current) return;

      // If document is currently in background, flag it to reload the instant the user returns
      if (typeof document !== "undefined" && document.hidden) {
        pendingRefreshRef.current = true;
        return;
      }

      isReloadingRef.current = true;
      try {
        window.location.reload();
      } catch {
        window.location.href = window.location.href;
      }
    };

    // 1. Instant BroadcastChannel Listener
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      try {
        channel = new BroadcastChannel(CONTENT_SYNC_CHANNEL);
        channel.onmessage = (event) => {
          if (event.data?.type === "DKDC_CONTENT_UPDATED") {
            triggerReload("broadcast-channel");
          }
        };
      } catch {}
    }

    // 2. Cross-Tab localStorage Storage Event Listener
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONTENT_SYNC_STORAGE_KEY && e.newValue) {
        const updateTime = Number(e.newValue);
        if (updateTime > mountTimeRef.current) {
          triggerReload("storage-event");
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Local Custom Event
    const handleCustomEvent = () => {
      triggerReload("custom-event");
    };
    window.addEventListener("dkdc:content-updated", handleCustomEvent);

    // Helper to check for remote server updates
    const checkServerStatus = async () => {
      if (isReloadingRef.current) return;

      // Check localStorage first
      try {
        const localUpdate = localStorage.getItem(CONTENT_SYNC_STORAGE_KEY);
        if (localUpdate && Number(localUpdate) > mountTimeRef.current) {
          triggerReload("local-storage-sync");
          return;
        }
      } catch {}

      // Check server sync endpoint
      try {
        const res = await fetch("/api/sync/status", {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.timestamp && data.timestamp > mountTimeRef.current) {
            triggerReload("server-sync");
          }
        }
      } catch {}
    };

    // 4. Tab Visibility & Window Focus: Instant refresh when user switches from Admin tab to this tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        if (pendingRefreshRef.current) {
          triggerReload("tab-became-visible");
        } else {
          checkServerStatus();
        }
      }
    };

    const handleFocus = () => {
      if (pendingRefreshRef.current) {
        triggerReload("window-focused");
      } else {
        checkServerStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // 5. Gentle background poll every 12 seconds for cross-browser testing
    const pollInterval = setInterval(() => {
      if (!document.hidden) {
        checkServerStatus();
      }
    }, 12000);

    return () => {
      if (channel) {
        try {
          channel.close();
        } catch {}
      }
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("dkdc:content-updated", handleCustomEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      clearInterval(pollInterval);
    };
  }, [pathname]);

  return null;
}
