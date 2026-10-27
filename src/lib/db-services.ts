import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getDb, resetDbClient } from "./mongodb";
import {
  Branch,
  MediaItem,
  Enquiry,
  SiteSettings,
  DanceStyle,
  CurriculumModule,
  ReviewItem,
} from "@/types";
import { deleteUploadThingFile, deleteUploadThingFiles } from "./uploadthing-server";
import {
  INITIAL_BRANCHES,
  INITIAL_GALLERY_ITEMS,
  INITIAL_VIDEOS,
  INITIAL_SITE_SETTINGS,
  DANCE_STYLES,
  SPECIAL_TRAINING_MODULES,
  INITIAL_REVIEWS,
} from "./constants";

// In-memory runtime fallbacks when MongoDB is not connected in local dev
let memoryBranches: Branch[] = [...INITIAL_BRANCHES];
let memoryMedia: MediaItem[] = [...INITIAL_GALLERY_ITEMS, ...INITIAL_VIDEOS];
let memoryEnquiries: Enquiry[] = [];
let memorySettings: SiteSettings = { ...INITIAL_SITE_SETTINGS };
let memoryDanceStyles: DanceStyle[] = DANCE_STYLES.map((s, i) => ({
  ...s,
  _id: s.slug,
  displayOrder: i + 1,
  isActive: true,
}));
let memoryCurriculum: CurriculumModule[] = SPECIAL_TRAINING_MODULES.map((m, i) => ({
  ...m,
  _id: `mod-${i + 1}`,
  badge: "CONDITIONING",
  displayOrder: i + 1,
  isActive: true,
}));
let memoryReviews: ReviewItem[] = INITIAL_REVIEWS.map((r, i) => ({
  ...r,
  _id: `rev-${i + 1}`,
}));

// ==========================================
// BRANCHES
// ==========================================
export async function getBranches(): Promise<Branch[]> {
  const db = await getDb();
  if (!db) {
    return [...memoryBranches].sort(
      (a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1)
    );
  }

  try {
    const branches = await db
      .collection<Branch>("branches")
      .find({})
      .toArray();

    if (branches.length === 0) {
      return [...memoryBranches].sort(
        (a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1)
      );
    }

    return branches
      .map((b) => ({
        ...b,
        displayOrder: Number(b.displayOrder) || 1,
        _id: b._id?.toString(),
      }))
      .sort(
        (a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1)
      );
  } catch (err) {
    console.error("Error fetching branches:", err);
    resetDbClient();
    return [...memoryBranches].sort(
      (a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1)
    );
  }
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  const db = await getDb();
  if (!db) {
    return memoryBranches.find((b) => b.slug === slug || b._id === slug) || null;
  }

  try {
    const query: any = ObjectId.isValid(slug)
      ? { $or: [{ slug }, { _id: new ObjectId(slug) }, { _id: slug }] }
      : { $or: [{ slug }, { _id: slug }] };
    const branch = await db.collection<Branch>("branches").findOne(query);
    if (!branch) {
      return memoryBranches.find((b) => b.slug === slug || b._id === slug) || null;
    }
    return {
      ...branch,
      _id: branch._id?.toString(),
    };
  } catch (err) {
    console.error("Error fetching branch by slug:", err);
    return memoryBranches.find((b) => b.slug === slug || b._id === slug) || null;
  }
}

export async function createBranch(data: Omit<Branch, "_id">): Promise<Branch> {
  const db = await getDb();
  const now = new Date().toISOString();

  let finalSlug = data.slug;
  if (db) {
    let count = 1;
    let existing = await db.collection("branches").findOne({ slug: finalSlug });
    while (existing) {
      finalSlug = `${data.slug}-${++count}`;
      existing = await db.collection("branches").findOne({ slug: finalSlug });
    }
  }

  const item: Branch = {
    ...data,
    slug: finalSlug,
    displayOrder: Number(data.displayOrder) || 1,
    createdAt: now,
    updatedAt: now,
  };

  if (!db) {
    const newBranch: Branch = {
      ...item,
      _id: "mem_" + Date.now(),
    };
    memoryBranches.push(newBranch);
    return newBranch;
  }

  const result = await db.collection("branches").insertOne(item as any);
  return {
    ...item,
    _id: result.insertedId.toString(),
  };
}

export async function updateBranch(
  id: string,
  data: Partial<Branch>
): Promise<boolean> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    const index = memoryBranches.findIndex((b) => b._id === id || b.slug === id);
    if (index !== -1) {
      memoryBranches[index] = {
        ...memoryBranches[index],
        ...data,
        updatedAt: now,
      };
      return true;
    }
    return false;
  }

  try {
    const query: any = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { _id: id }, { slug: id }] }
      : { $or: [{ _id: id }, { slug: id }] };
    const { _id, ...updateData } = data as any;
    if (updateData.displayOrder !== undefined) {
      updateData.displayOrder = Number(updateData.displayOrder) || 1;
    }
    const result = await db.collection("branches").updateOne(query, {
      $set: {
        ...updateData,
        updatedAt: now,
      },
    });
    return result.matchedCount > 0;
  } catch (err) {
    console.error("Error updating branch:", err);
    return false;
  }
}

export async function deleteBranch(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    const target = memoryBranches.find((b) => b._id === id || b.slug === id);
    if (target) {
      deleteUploadThingFiles([target.imageKey, target.imageUrl]).catch(() => {});
    }
    const initialLen = memoryBranches.length;
    memoryBranches = memoryBranches.filter((b) => b._id !== id && b.slug !== id);
    return memoryBranches.length < initialLen;
  }

  try {
    const query: any = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { _id: id }, { slug: id }] }
      : { $or: [{ _id: id }, { slug: id }] };

    const branch = await db.collection<Branch>("branches").findOne(query);
    if (branch) {
      await deleteUploadThingFiles([branch.imageKey, branch.imageUrl]);
    }

    const result = await db.collection("branches").deleteOne(query);
    return result.deletedCount > 0;
  } catch (err) {
    console.error("Error deleting branch:", err);
    return false;
  }
}

// ==========================================
// MEDIA
// ==========================================
export async function getMedia(
  category?: string,
  mediaType: "image" | "video" | "all" = "all"
): Promise<MediaItem[]> {
  const db = await getDb();
  if (!db) {
    let items = memoryMedia;
    if (mediaType !== "all") {
      items = items.filter((m) => m.type === mediaType);
    }
    if (category && category !== "All") {
      items = items.filter((m) => m.category === category);
    }
    return items.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  try {
    const query: any = {};
    if (mediaType !== "all") {
      query.type = mediaType;
    }
    if (category && category !== "All") {
      query.category = category;
    }

    const media = await db
      .collection<MediaItem>("media")
      .find(query)
      .toArray();

    if (media.length === 0 && !category) {
      return [...memoryMedia]
        .filter((m) => mediaType === "all" || m.type === mediaType)
        .sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
    }

    return media
      .map((m) => ({
        ...m,
        displayOrder: Number(m.displayOrder) || 1,
        _id: m._id?.toString(),
      }))
      .sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  } catch (err) {
    console.error("Error fetching media:", err);
    resetDbClient();
    return [...memoryMedia]
      .filter((m) => mediaType === "all" || m.type === mediaType)
      .sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  }
}

export async function getVideos(options?: {
  onlyPublished?: boolean;
  onlyFeatured?: boolean;
}): Promise<MediaItem[]> {
  const db = await getDb();
  const query: any = { type: "video" };
  if (options?.onlyPublished !== false) {
    query.published = true;
  }
  if (options?.onlyFeatured) {
    query.featuredOnHome = true;
  }

  const initialSeedVideos = INITIAL_VIDEOS;

  if (!db) {
    let items = memoryMedia.filter((m) => m.type === "video");
    if (items.length === 0) items = initialSeedVideos;
    if (options?.onlyPublished !== false) {
      items = items.filter((m) => m.published);
    }
    if (options?.onlyFeatured) {
      const feat = items.filter((m) => m.featuredOnHome);
      if (feat.length > 0) items = feat;
    }
    return items.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  try {
    let videos = await db
      .collection<MediaItem>("media")
      .find(query)
      .toArray();

    // If query has onlyFeatured and returned 0, fallback to all published videos
    if (videos.length === 0 && options?.onlyFeatured) {
      videos = await db
        .collection<MediaItem>("media")
        .find({ type: "video", published: true })
        .toArray();
    }

    // If still 0 videos in MongoDB (e.g. before admin uploads or seeds videos), fallback to initial seed videos
    if (videos.length === 0) {
      return [...initialSeedVideos].sort(
        (a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1)
      );
    }

    return videos
      .map((m) => ({
        ...m,
        displayOrder: Number(m.displayOrder) || 1,
        _id: m._id?.toString(),
      }))
      .sort(
        (a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1)
      );
  } catch (err) {
    console.error("Error fetching videos:", err);
    resetDbClient();
    return [...initialSeedVideos].sort(
      (a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1)
    );
  }
}

export async function createMedia(data: Omit<MediaItem, "_id">): Promise<MediaItem> {
  const db = await getDb();
  const now = new Date().toISOString();
  const item: MediaItem = {
    ...data,
    displayOrder: Number(data.displayOrder) || 1,
    createdAt: now,
    updatedAt: now,
  };

  if (!db) {
    const newItem: MediaItem = {
      ...item,
      _id: "mem_media_" + Date.now(),
    };
    memoryMedia.unshift(newItem);
    return newItem;
  }

  const result = await db.collection("media").insertOne(item as any);
  return {
    ...item,
    _id: result.insertedId.toString(),
  };
}

export async function updateMedia(
  id: string,
  data: Partial<MediaItem>
): Promise<boolean> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    const index = memoryMedia.findIndex((m) => m._id === id);
    if (index !== -1) {
      memoryMedia[index] = {
        ...memoryMedia[index],
        ...data,
        displayOrder:
          data.displayOrder !== undefined
            ? Number(data.displayOrder) || 1
            : memoryMedia[index].displayOrder,
        updatedAt: now,
      };
      return true;
    }
    return false;
  }

  try {
    if (!ObjectId.isValid(id)) return false;
    const { _id, ...updateData } = data as any;
    if (updateData.displayOrder !== undefined) {
      updateData.displayOrder = Number(updateData.displayOrder) || 1;
    }
    const result = await db.collection("media").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: now,
        },
      }
    );
    return result.matchedCount > 0;
  } catch (err) {
    console.error("Error updating media:", err);
    return false;
  }
}

export async function deleteMedia(id: string): Promise<MediaItem | null> {
  const db = await getDb();
  if (!db) {
    const item = memoryMedia.find((m) => m._id === id);
    if (item) {
      deleteUploadThingFiles([
        item.key,
        item.url,
        item.thumbnailKey,
        item.thumbnailUrl,
      ]).catch(() => {});
      memoryMedia = memoryMedia.filter((m) => m._id !== id);
      return item;
    }
    return null;
  }

  try {
    if (!ObjectId.isValid(id)) return null;
    const item = (await db
      .collection("media")
      .findOne({ _id: new ObjectId(id) })) as any;
    if (!item) return null;

    // Delete associated files from UploadThing Cloud Storage
    await deleteUploadThingFiles([
      item.key,
      item.url,
      item.thumbnailKey,
      item.thumbnailUrl,
    ]);

    await db.collection("media").deleteOne({ _id: new ObjectId(id) });
    return {
      ...item,
      _id: item._id?.toString(),
    };
  } catch (err) {
    console.error("Error deleting media:", err);
    return null;
  }
}

// ==========================================
// ENQUIRIES
// ==========================================
export async function getEnquiries(): Promise<Enquiry[]> {
  const db = await getDb();
  if (!db) {
    return [...memoryEnquiries].sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  try {
    const enquiries = await db
      .collection<Enquiry>("enquiries")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return enquiries.map((e) => ({
      ...e,
      _id: e._id?.toString(),
    }));
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    resetDbClient();
    return memoryEnquiries;
  }
}

export async function createEnquiry(
  data: Omit<Enquiry, "_id" | "status" | "createdAt">
): Promise<Enquiry> {
  const db = await getDb();
  const now = new Date().toISOString();
  const item: Enquiry = {
    ...data,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  if (!db) {
    const newEnquiry: Enquiry = {
      ...item,
      _id: "mem_enq_" + Date.now(),
    };
    memoryEnquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  const result = await db.collection("enquiries").insertOne(item as any);
  return {
    ...item,
    _id: result.insertedId.toString(),
  };
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"]
): Promise<boolean> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    const index = memoryEnquiries.findIndex((e) => e._id === id);
    if (index !== -1) {
      memoryEnquiries[index].status = status;
      memoryEnquiries[index].updatedAt = now;
      return true;
    }
    return false;
  }

  try {
    if (!ObjectId.isValid(id)) return false;
    const result = await db
      .collection("enquiries")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: now } }
      );
    return result.matchedCount > 0;
  } catch (err) {
    console.error("Error updating enquiry:", err);
    return false;
  }
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    const len = memoryEnquiries.length;
    memoryEnquiries = memoryEnquiries.filter((e) => e._id !== id);
    return memoryEnquiries.length < len;
  }

  try {
    if (!ObjectId.isValid(id)) return false;
    const result = await db
      .collection("enquiries")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (err) {
    console.error("Error deleting enquiry:", err);
    return false;
  }
}

// ==========================================
// SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await getDb();
  if (!db) {
    return memorySettings;
  }

  try {
    const settings = await db
      .collection<SiteSettings>("siteSettings")
      .findOne({});

    if (!settings) {
      return {
        ...memorySettings,
        stats: memorySettings.stats || INITIAL_SITE_SETTINGS.stats,
      };
    }

    return {
      ...settings,
      stats: settings.stats && Array.isArray(settings.stats) && settings.stats.length === 6
        ? settings.stats
        : INITIAL_SITE_SETTINGS.stats,
      _id: settings._id?.toString(),
    };
  } catch (err) {
    console.error("Error fetching site settings:", err);
    return {
      ...memorySettings,
      stats: memorySettings.stats || INITIAL_SITE_SETTINGS.stats,
    };
  }
}

export async function updateSiteSettings(
  data: Partial<SiteSettings>
): Promise<boolean> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    memorySettings = {
      ...memorySettings,
      ...data,
      updatedAt: now,
    };
    return true;
  }

  try {
    const { _id, ...updateData } = data as any;
    await db.collection("siteSettings").updateOne(
      {},
      {
        $set: {
          ...updateData,
          updatedAt: now,
        },
      },
      { upsert: true }
    );
    return true;
  } catch (err) {
    console.error("Error updating site settings:", err);
    return false;
  }
}

// ==========================================
// SEED DATABASE (IDEMPOTENT)
// ==========================================
export async function seedDatabase(): Promise<{
  branchesSeeded: number;
  settingsSeeded: boolean;
  mediaSeeded: number;
}> {
  const db = await getDb();
  if (!db) {
    return {
      branchesSeeded: memoryBranches.length,
      settingsSeeded: true,
      mediaSeeded: memoryMedia.length,
    };
  }

  let branchesCount = 0;
  let mediaCount = 0;
  let settingsSeeded = false;

  // 1. Seed Branches if empty
  const existingBranches = await db.collection("branches").countDocuments();
  if (existingBranches === 0) {
    const branchesWithDates = INITIAL_BRANCHES.map((b) => ({
      ...b,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    const res = await db.collection("branches").insertMany(branchesWithDates as any);
    branchesCount = res.insertedCount;
  }

  // 2. Seed Settings if empty
  const existingSettings = await db.collection("siteSettings").countDocuments();
  if (existingSettings === 0) {
    await db.collection("siteSettings").insertOne({
      ...INITIAL_SITE_SETTINGS,
      updatedAt: new Date().toISOString(),
    } as any);
    settingsSeeded = true;
  }

  // 3. Seed Media if empty
  const existingMedia = await db.collection("media").countDocuments();
  if (existingMedia === 0) {
    const mediaWithDates = INITIAL_GALLERY_ITEMS.map((m) => ({
      ...m,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    const res = await db.collection("media").insertMany(mediaWithDates as any);
    mediaCount = res.insertedCount;
  }

  return {
    branchesSeeded: branchesCount,
    settingsSeeded,
    mediaSeeded: mediaCount,
  };
}

// ==========================================
// ADMIN USER & CREDENTIALS
// ==========================================
export interface AdminUserRecord {
  _id?: string;
  username: string;
  passwordHash: string;
  updatedAt?: string;
}

let memoryAdminUser: AdminUserRecord | null = null;

export async function getAdminUser(): Promise<AdminUserRecord> {
  const defaultUsername = process.env.ADMIN_USERNAME || "admin";
  const defaultPassword = process.env.ADMIN_PASSWORD || "dkdc@admin2025";
  const db = await getDb();

  if (!db) {
    if (!memoryAdminUser) {
      memoryAdminUser = {
        username: defaultUsername,
        passwordHash: bcrypt.hashSync(defaultPassword, 10),
        updatedAt: new Date().toISOString(),
      };
    }
    return memoryAdminUser;
  }

  try {
    const user = await db.collection<AdminUserRecord>("admin_users").findOne({});
    if (user) {
      return {
        ...user,
        _id: user._id?.toString(),
      };
    }

    // Initialize default admin user in DB
    const initialUser: AdminUserRecord = {
      username: defaultUsername,
      passwordHash: bcrypt.hashSync(defaultPassword, 10),
      updatedAt: new Date().toISOString(),
    };
    const res = await db.collection("admin_users").insertOne(initialUser as any);
    return {
      ...initialUser,
      _id: res.insertedId.toString(),
    };
  } catch (err) {
    console.error("Error retrieving admin user:", err);
    return {
      username: defaultUsername,
      passwordHash: bcrypt.hashSync(defaultPassword, 10),
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function updateAdminUser(
  currentPassword: string,
  newUsername: string,
  newPassword?: string
): Promise<{ success: boolean; error?: string; username?: string }> {
  const admin = await getAdminUser();

  // Validate current password
  let isValid = false;
  try {
    isValid = bcrypt.compareSync(currentPassword, admin.passwordHash);
  } catch {
    isValid = false;
  }

  // Fallback check against plaintext or env password in edge cases
  if (!isValid && currentPassword === (process.env.ADMIN_PASSWORD || "dkdc@admin2025")) {
    isValid = true;
  }

  if (!isValid) {
    return { success: false, error: "Current password does not match. Please verify and try again." };
  }

  const cleanUsername = newUsername.trim();
  if (!cleanUsername || cleanUsername.length < 3) {
    return { success: false, error: "Username must be at least 3 characters long." };
  }

  let newPasswordHash = admin.passwordHash;
  if (newPassword && newPassword.trim()) {
    if (newPassword.trim().length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }
    newPasswordHash = bcrypt.hashSync(newPassword.trim(), 10);
  }

  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    memoryAdminUser = {
      username: cleanUsername,
      passwordHash: newPasswordHash,
      updatedAt: now,
    };
    return { success: true, username: cleanUsername };
  }

  try {
    await db.collection("admin_users").updateOne(
      {},
      {
        $set: {
          username: cleanUsername,
          passwordHash: newPasswordHash,
          updatedAt: now,
        },
      },
      { upsert: true }
    );
    memoryAdminUser = {
      username: cleanUsername,
      passwordHash: newPasswordHash,
      updatedAt: now,
    };
    return { success: true, username: cleanUsername };
  } catch (err) {
    console.error("Error updating admin user in MongoDB:", err);
    return { success: false, error: "Database error while updating credentials." };
  }
}

// ==========================================
// DANCE STYLES
// ==========================================
export async function getDanceStyles(onlyActive = false): Promise<DanceStyle[]> {
  const db = await getDb();
  if (!db) {
    let items = memoryDanceStyles;
    if (onlyActive) items = items.filter((s) => s.isActive !== false);
    return [...items].sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  }

  try {
    const count = await db.collection("dance_styles").countDocuments();
    if (count === 0) {
      const seeded = DANCE_STYLES.map((s, i) => ({
        ...s,
        displayOrder: i + 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      await db.collection("dance_styles").insertMany(seeded as any);
    }

    const query: any = {};
    if (onlyActive) {
      query.isActive = { $ne: false };
    }

    const styles = await db
      .collection<DanceStyle>("dance_styles")
      .find(query)
      .toArray();

    return styles
      .map((s) => ({
        ...s,
        displayOrder: Number(s.displayOrder) || 1,
        _id: s._id?.toString(),
      }))
      .sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  } catch (err) {
    console.error("Error fetching dance styles:", err);
    resetDbClient();
    let items = memoryDanceStyles;
    if (onlyActive) items = items.filter((s) => s.isActive !== false);
    return [...items].sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  }
}

export async function getDanceStyleBySlug(slug: string): Promise<DanceStyle | null> {
  const db = await getDb();
  if (!db) {
    return memoryDanceStyles.find((s) => s.slug === slug || s._id === slug) || null;
  }

  try {
    const query: any = ObjectId.isValid(slug)
      ? { $or: [{ slug }, { _id: new ObjectId(slug) }, { _id: slug }] }
      : { $or: [{ slug }, { _id: slug }] };
    const style = await db.collection<DanceStyle>("dance_styles").findOne(query);
    if (!style) return null;
    return {
      ...style,
      _id: style._id?.toString(),
    };
  } catch (err) {
    console.error("Error fetching dance style by slug:", err);
    return null;
  }
}

export async function createDanceStyle(data: Omit<DanceStyle, "_id">): Promise<DanceStyle> {
  const db = await getDb();
  const now = new Date().toISOString();
  let baseSlug = (data.slug || data.name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!db) {
    const newStyle: DanceStyle = {
      ...data,
      slug: baseSlug,
      _id: `style-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    memoryDanceStyles.push(newStyle);
    return newStyle;
  }

  let finalSlug = baseSlug;
  let counter = 2;
  while (await db.collection("dance_styles").findOne({ slug: finalSlug })) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const styleToInsert = {
    ...data,
    slug: finalSlug,
    displayOrder: Number(data.displayOrder) || 1,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("dance_styles").insertOne(styleToInsert as any);
  return {
    ...styleToInsert,
    _id: result.insertedId.toString(),
  };
}

export async function updateDanceStyle(id: string, data: Partial<DanceStyle>): Promise<boolean> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    const index = memoryDanceStyles.findIndex((s) => s._id === id || s.slug === id);
    if (index !== -1) {
      memoryDanceStyles[index] = {
        ...memoryDanceStyles[index],
        ...data,
        updatedAt: now,
      };
      return true;
    }
    return false;
  }

  try {
    const query: any = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { _id: id }, { slug: id }] }
      : { $or: [{ _id: id }, { slug: id }] };
    const { _id, ...updateData } = data as any;
    if (updateData.displayOrder !== undefined) {
      updateData.displayOrder = Number(updateData.displayOrder) || 1;
    }
    const result = await db.collection("dance_styles").updateOne(query, {
      $set: {
        ...updateData,
        updatedAt: now,
      },
    });
    return result.matchedCount > 0;
  } catch (err) {
    console.error("Error updating dance style:", err);
    return false;
  }
}

export async function deleteDanceStyle(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    const target = memoryDanceStyles.find((s) => s._id === id || s.slug === id);
    if (target) {
      deleteUploadThingFiles([target.imageKey, target.image]).catch(() => {});
    }
    const initialLen = memoryDanceStyles.length;
    memoryDanceStyles = memoryDanceStyles.filter((s) => s._id !== id && s.slug !== id);
    return memoryDanceStyles.length < initialLen;
  }

  try {
    const query: any = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { _id: id }, { slug: id }] }
      : { $or: [{ _id: id }, { slug: id }] };

    const style = await db.collection<DanceStyle>("dance_styles").findOne(query);
    if (style) {
      await deleteUploadThingFiles([style.imageKey, style.image]);
    }

    const result = await db.collection("dance_styles").deleteOne(query);
    return result.deletedCount > 0;
  } catch (err) {
    console.error("Error deleting dance style:", err);
    return false;
  }
}

// ==========================================
// CURRICULUM MODULES
// ==========================================
export async function getCurriculumModules(onlyActive = false): Promise<CurriculumModule[]> {
  const db = await getDb();
  if (!db) {
    let items = memoryCurriculum;
    if (onlyActive) items = items.filter((m) => m.isActive !== false);
    return [...items].sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  }

  try {
    const count = await db.collection("curriculum").countDocuments();
    if (count === 0) {
      const seeded = SPECIAL_TRAINING_MODULES.map((m, i) => ({
        ...m,
        badge: "CONDITIONING",
        displayOrder: i + 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      await db.collection("curriculum").insertMany(seeded as any);
    }

    const query: any = {};
    if (onlyActive) {
      query.isActive = { $ne: false };
    }

    const modules = await db
      .collection<CurriculumModule>("curriculum")
      .find(query)
      .toArray();

    return modules
      .map((m) => ({
        ...m,
        displayOrder: Number(m.displayOrder) || 1,
        _id: m._id?.toString(),
      }))
      .sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  } catch (err) {
    console.error("Error fetching curriculum modules:", err);
    resetDbClient();
    let items = memoryCurriculum;
    if (onlyActive) items = items.filter((m) => m.isActive !== false);
    return [...items].sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  }
}

export async function createCurriculumModule(data: Omit<CurriculumModule, "_id">): Promise<CurriculumModule> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    const newModule: CurriculumModule = {
      ...data,
      displayOrder: Number(data.displayOrder) || 1,
      _id: `mod-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    memoryCurriculum.push(newModule);
    return newModule;
  }

  const moduleToInsert = {
    ...data,
    displayOrder: Number(data.displayOrder) || 1,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("curriculum").insertOne(moduleToInsert as any);
  return {
    ...moduleToInsert,
    _id: result.insertedId.toString(),
  };
}

export async function updateCurriculumModule(id: string, data: Partial<CurriculumModule>): Promise<boolean> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    const index = memoryCurriculum.findIndex((m) => m._id === id);
    if (index !== -1) {
      memoryCurriculum[index] = {
        ...memoryCurriculum[index],
        ...data,
        updatedAt: now,
      };
      return true;
    }
    return false;
  }

  try {
    if (!ObjectId.isValid(id)) return false;
    const { _id, ...updateData } = data as any;
    if (updateData.displayOrder !== undefined) {
      updateData.displayOrder = Number(updateData.displayOrder) || 1;
    }
    const result = await db.collection("curriculum").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: now,
        },
      }
    );
    return result.matchedCount > 0;
  } catch (err) {
    console.error("Error updating curriculum module:", err);
    return false;
  }
}

export async function deleteCurriculumModule(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    const initialLen = memoryCurriculum.length;
    memoryCurriculum = memoryCurriculum.filter((m) => m._id !== id);
    return memoryCurriculum.length < initialLen;
  }

  try {
    if (!ObjectId.isValid(id)) return false;
    const result = await db.collection("curriculum").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (err) {
    console.error("Error deleting curriculum module:", err);
    return false;
  }
}

// ==========================================
// GOOGLE REVIEWS
// ==========================================
const GOOGLE_AVATAR_COLORS = [
  "bg-[#EA4335]", // Google Red
  "bg-[#4285F4]", // Google Blue
  "bg-[#34A853]", // Google Green
  "bg-[#FBBC05] text-neutral-900 font-medium", // Google Yellow
  "bg-[#9C27B0]", // Google Purple
  "bg-[#009688]", // Google Teal
];

export async function getReviews(onlyPublished: boolean = false): Promise<ReviewItem[]> {
  const db = await getDb();
  if (!db) {
    const list = onlyPublished ? memoryReviews.filter((r) => r.published !== false) : memoryReviews;
    return [...list].sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  }

  try {
    const collection = db.collection<ReviewItem>("reviews");
    const count = await collection.countDocuments({});
    if (count === 0) {
      // Auto-seed with INITIAL_REVIEWS
      const now = new Date().toISOString();
      const seedData = INITIAL_REVIEWS.map((r, idx) => ({
        ...r,
        avatarLetter: r.avatarLetter || (r.author ? r.author[0].toUpperCase() : "G"),
        avatarBg: r.avatarBg || GOOGLE_AVATAR_COLORS[idx % GOOGLE_AVATAR_COLORS.length],
        badge: r.badge || "Verified Google Reviewer",
        rating: r.rating || 5,
        timeAgo: r.timeAgo || "Recently",
        published: true,
        displayOrder: idx + 1,
        createdAt: now,
        updatedAt: now,
      }));
      await collection.insertMany(seedData as any);
    }

    const query = onlyPublished ? { published: { $ne: false } } : {};
    const reviews = await collection
      .find(query)
      .toArray();

    return reviews
      .map((r) => ({
        ...r,
        displayOrder: Number(r.displayOrder) || 1,
        _id: r._id?.toString(),
      }))
      .sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  } catch (err) {
    console.error("Error fetching reviews:", err);
    resetDbClient();
    const list = onlyPublished ? memoryReviews.filter((r) => r.published !== false) : memoryReviews;
    return [...list].sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));
  }
}

export async function getReviewById(id: string): Promise<ReviewItem | null> {
  const db = await getDb();
  if (!db) {
    return memoryReviews.find((r) => r._id === id) || null;
  }

  try {
    if (!ObjectId.isValid(id)) return null;
    const review = await db.collection<any>("reviews").findOne({ _id: new ObjectId(id) });
    if (!review) return null;
    return {
      ...review,
      _id: review._id?.toString(),
    };
  } catch (err) {
    console.error("Error fetching review by id:", err);
    return null;
  }
}

export async function createReview(data: Omit<ReviewItem, "_id">): Promise<ReviewItem> {
  const db = await getDb();
  const now = new Date().toISOString();
  const letter = data.avatarLetter || (data.author ? data.author.trim()[0].toUpperCase() : "G");
  const bg = data.avatarBg || GOOGLE_AVATAR_COLORS[Math.floor(Math.random() * GOOGLE_AVATAR_COLORS.length)];

  const reviewDoc: Omit<ReviewItem, "_id"> = {
    author: data.author.trim(),
    avatarLetter: letter,
    avatarBg: bg,
    badge: data.badge ? data.badge.trim() : "Verified Student",
    rating: Math.max(1, Math.min(5, Number(data.rating) || 5)),
    timeAgo: data.timeAgo ? data.timeAgo.trim() : "Recently",
    text: data.text.trim(),
    published: data.published !== false,
    displayOrder: Number(data.displayOrder) || 1,
    createdAt: now,
    updatedAt: now,
  };

  if (!db) {
    const newReview = { ...reviewDoc, _id: `rev-${Date.now()}` };
    memoryReviews.push(newReview);
    return newReview;
  }

  try {
    const result = await db.collection("reviews").insertOne(reviewDoc as any);
    return {
      ...reviewDoc,
      _id: result.insertedId.toString(),
    };
  } catch (err) {
    console.error("Error creating review:", err);
    throw err;
  }
}

export async function updateReview(id: string, data: Partial<ReviewItem>): Promise<boolean> {
  const db = await getDb();
  const now = new Date().toISOString();

  if (!db) {
    const idx = memoryReviews.findIndex((r) => r._id === id);
    if (idx !== -1) {
      memoryReviews[idx] = { ...memoryReviews[idx], ...data, updatedAt: now };
      return true;
    }
    return false;
  }

  try {
    if (!ObjectId.isValid(id)) return false;
    const { _id, ...updateData } = data as any;
    if (updateData.displayOrder !== undefined) {
      updateData.displayOrder = Number(updateData.displayOrder) || 1;
    }
    if (updateData.author && !updateData.avatarLetter) {
      updateData.avatarLetter = updateData.author.trim()[0].toUpperCase();
    }
    const result = await db.collection("reviews").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: now,
        },
      }
    );
    return result.matchedCount > 0;
  } catch (err) {
    console.error("Error updating review:", err);
    return false;
  }
}

export async function deleteReview(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    const initialLen = memoryReviews.length;
    memoryReviews = memoryReviews.filter((r) => r._id !== id);
    return memoryReviews.length < initialLen;
  }

  try {
    if (!ObjectId.isValid(id)) return false;
    const result = await db.collection("reviews").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (err) {
    console.error("Error deleting review:", err);
    return false;
  }
}


