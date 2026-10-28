import { NextResponse } from "next/server";
import { getServerLastUpdated } from "@/lib/sync-events";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      timestamp: getServerLastUpdated(),
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
