import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getMedia, createMedia } from "@/lib/db-services";
import { verifyRequestAuth } from "@/lib/auth";
import { MediaCategory, MediaType } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const type = searchParams.get("type") || undefined;
    const includeUnpublished = searchParams.get("all") === "true";

    let items = await getMedia(category);
    if (type) {
      items = items.filter((m) => m.type === type);
    }
    const filtered = includeUnpublished ? items : items.filter((m) => m.published);

    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    console.error("Error in GET /api/media:", error);
    return NextResponse.json(
      { error: "Failed to retrieve media items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await verifyRequestAuth(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      type = "image",
      url,
      key,
      name,
      title,
      description,
      category = "Classes",
      thumbnailUrl,
      thumbnailKey,
      duration,
      featuredOnHome = type === "video",
      published = true,
      displayOrder = 0,
    } = body;

    if (!url || !title) {
      return NextResponse.json(
        { error: "Media URL and title are required" },
        { status: 400 }
      );
    }

    const newItem = await createMedia({
      type: type as MediaType,
      url,
      key,
      name,
      title: title.trim(),
      description,
      category: category as MediaCategory,
      thumbnailUrl,
      thumbnailKey,
      duration,
      featuredOnHome: Boolean(featuredOnHome),
      published: Boolean(published),
      displayOrder: Number(displayOrder) || 0,
    });

    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/videos");

    return NextResponse.json(
      { success: true, data: newItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/media:", error);
    return NextResponse.json(
      { error: "Failed to save media metadata" },
      { status: 500 }
    );
  }
}
