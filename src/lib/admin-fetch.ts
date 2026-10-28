import { notifyAdminContentUpdate } from "./sync-events";

/**
 * Admin fetch wrapper that includes both cookies (credentials: include)
 * and the Bearer token from localStorage for resilience against cookie dropping.
 * Automatically broadcasts content updates to public browser windows on successful mutations.
 */
export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers || {});

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("dkdc_token");
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: init.credentials || "include",
  });

  // Automatically broadcast content update to public tabs on successful mutation
  const method = (init.method || "GET").toUpperCase();
  if (response.ok && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const urlStr = typeof input === "string" ? input : input.toString();
    if (
      urlStr.includes("/api/branches") ||
      urlStr.includes("/api/curriculum") ||
      urlStr.includes("/api/dance-styles") ||
      urlStr.includes("/api/media") ||
      urlStr.includes("/api/reviews") ||
      urlStr.includes("/api/settings") ||
      urlStr.includes("/api/upload")
    ) {
      notifyAdminContentUpdate(urlStr);
    }
  }

  if (response.status === 401 && typeof window !== "undefined") {
    const isLoginPage = window.location.pathname === "/admin/login";
    if (!isLoginPage) {
      console.warn("Admin session unauthorized or expired. Redirecting to login...");
      try {
        localStorage.removeItem("dkdc_token");
      } catch {}
      window.location.href = `/admin/login?from=${encodeURIComponent(window.location.pathname)}`;
    }
  }

  return response;
}
