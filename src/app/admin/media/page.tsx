"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Video,
  Image as ImageIcon,
  Plus,
  Loader2,
  Check,
  AlertCircle,
  Film,
  FileCheck2,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { MediaItem, MediaCategory, MediaType } from "@/types";
import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/context/ToastContext";

const CATEGORIES: MediaCategory[] = [
  "Classes",
  "Performances",
  "Stage Shows",
  "Competitions",
  "School Programs",
  "Cultural Events",
  "Workshops",
  "Special Training",
  "Branch Activities",
  "Bournemouth",
];

export default function AdminMediaPage() {
  const toast = useToast();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Add / Edit Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Classes" as MediaCategory,
    type: "image" as MediaType,
    url: "",
    key: "",
    thumbnailUrl: "",
    published: true,
    displayOrder: 0,
  });

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media?all=true");
      const data = await res.json();
      if (data.success) {
        setMediaItems(data.data);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleOpenAdd = () => {
    setUploadError("");
    setUploadSuccess("");
    setFormData({
      title: "",
      description: "",
      category: "Classes",
      type: "image",
      url: "",
      key: "",
      thumbnailUrl: "",
      published: true,
      displayOrder: mediaItems.length + 1,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: MediaItem) => {
    setUploadError("");
    setUploadSuccess("");
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      type: item.type,
      url: item.url,
      key: item.key || "",
      thumbnailUrl: item.thumbnailUrl || "",
      published: item.published,
      displayOrder: item.displayOrder,
    });
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim() || !formData.title.trim()) {
      setUploadError("Please upload or enter a media URL and give it a title.");
      return;
    }

    setActionLoading(true);
    setUploadError("");

    try {
      if (editingItem) {
        const res = await fetch(`/api/media/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Creation failed");
        }
      }

      setIsAddModalOpen(false);
      setEditingItem(null);
      await fetchMedia();
      toast.success(
        editingItem ? "Media item updated successfully." : "New media item added to archive.",
        "Media Saved"
      );
    } catch (err: any) {
      const msg = err.message || "Failed to save media item.";
      setUploadError(msg);
      toast.error(msg, "Save Failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleTogglePublish = async (item: MediaItem) => {
    try {
      const nextState = !item.published;
      const res = await fetch(`/api/media/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: nextState }),
      });
      if (res.ok) {
        setMediaItems((prev) =>
          prev.map((m) =>
            m._id === item._id ? { ...m, published: nextState } : m
          )
        );
        toast.info(
          nextState ? `"${item.title}" is now published on live gallery.` : `"${item.title}" moved to draft status.`,
          "Status Updated"
        );
      } else {
        toast.error("Failed to change publish status.");
      }
    } catch (err) {
      console.error("Toggle publish failed:", err);
      toast.error("Network error while updating publish status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/media/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMediaItems((prev) => prev.filter((m) => m._id !== deleteTarget._id));
        toast.success(`"${deleteTarget.title}" deleted from media library and storage.`, "Item Removed");
        setDeleteTarget(null);
      } else {
        throw new Error("Failed to delete media item");
      }
    } catch (err: any) {
      toast.error(err.message || "Deletion failed", "Error");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredMedia = mediaItems.filter((item) => {
    if (filterCategory === "All") return true;
    if (filterCategory === "Videos") return item.type === "video";
    if (filterCategory === "Photos") return item.type === "image";
    return item.category === filterCategory;
  });

  return (
    <>
      <AdminHeader
        title="Media Management"
        subtitle="Upload, categorize, and organize photos & video performance reels"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/admin/videos"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-dk-yellow font-heading font-light text-xs uppercase tracking-widest transition-colors"
          >
            <Film className="w-3.5 h-3.5 text-dk-red" />
            <span>Video Showcase</span>
          </Link>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-dk-yellow font-heading font-bold text-xs uppercase tracking-widest transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Media</span>
          </button>
        </div>
      </AdminHeader>

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["All", "Videos", "Photos", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors shrink-0 ${
                filterCategory === cat
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-dk-yellow mb-2" />
            <p className="text-xs font-mono text-neutral-500 uppercase">
              Loading media repository...
            </p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-neutral-800 bg-neutral-950 p-8">
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-wider mb-4">
              No media items found.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase text-dk-yellow hover:border-dk-yellow"
            >
              Upload First Media
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item._id}
                className="bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Preview */}
                <div className="relative aspect-[4/3] bg-neutral-900">
                  {item.type === "video" ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      {item.thumbnailUrl ? (
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="300px"
                        />
                      ) : (
                        <Video className="w-8 h-8 text-neutral-600" />
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="p-1.5 bg-black/80 text-dk-red flex items-center gap-1 text-[10px] font-mono uppercase">
                          <Video className="w-3 h-3" />
                          <span>Video</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="p-1.5 bg-black/80 text-white flex items-center gap-1 text-[10px] font-mono uppercase">
                          <ImageIcon className="w-3 h-3" />
                          <span>Photo</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Publish Badge */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleTogglePublish(item)}
                      title={item.published ? "Click to unpublish" : "Click to publish"}
                      className={`p-1.5 rounded-none text-xs font-mono uppercase tracking-wider flex items-center gap-1 ${
                        item.published
                          ? "bg-black/90 text-dk-yellow"
                          : "bg-black/90 text-neutral-500"
                      }`}
                    >
                      {item.published ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-[9px]">Live</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span className="text-[9px]">Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-dk-yellow block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-heading font-bold uppercase text-white truncate mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 mt-3 border-t border-neutral-900 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-600">
                      Order: {item.displayOrder}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        aria-label="Edit media"
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        aria-label="Delete media"
                        className="p-1.5 text-neutral-400 hover:text-dk-red transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || editingItem !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Media Item" : "Add Media Item"}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveMedia} className="space-y-5">
          {/* Error Message */}
          {uploadError && (
            <div
              role="alert"
              className="flex items-center gap-2.5 p-3.5 bg-dk-red/10 border border-dk-red/30 text-white text-xs font-mono"
            >
              <AlertCircle className="w-4 h-4 text-dk-red shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Success Notification */}
          {uploadSuccess && (
            <div className="flex items-center gap-2.5 p-3.5 bg-[#25D366]/10 border border-[#25D366]/30 text-white text-xs font-mono">
              <FileCheck2 className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {/* UploadThing UploadDropzone Section */}
          <div className="p-5 bg-black border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-white">
                Upload Media via UploadThing
              </span>
              <span className="text-[10px] font-mono text-dk-yellow uppercase">
                Direct Cloud Storage
              </span>
            </div>

            {/* Formats Supported Badges */}
            <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase">
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                Photos: JPG, PNG, WEBP, GIF, SVG (up to 16MB)
              </span>
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                Videos: MP4, MOV, WEBM, M4V (up to 256MB)
              </span>
            </div>

            {/* Dropzone Component */}
            <div className="pt-2">
              <UploadDropzone
                endpoint="mediaUploader"
                appearance={{
                  container:
                    "border border-dashed border-neutral-700 bg-neutral-950 hover:border-dk-yellow transition-colors py-8 px-4 cursor-pointer",
                  button:
                    "bg-white text-black hover:bg-dk-yellow font-heading font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-none transition-colors ut-uploading:bg-neutral-800",
                  label: "text-neutral-300 font-heading text-sm uppercase tracking-wide hover:text-white",
                  allowedContent: "text-neutral-500 font-mono text-[11px]",
                }}
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    const uploaded = res[0];
                    const isVideo = Boolean(
                      uploaded.name.match(/\.(mp4|mov|webm|m4v)$/i)
                    );
                    const cleanTitle = uploaded.name.replace(/\.[^/.]+$/, "");

                    setFormData((prev) => ({
                      ...prev,
                      url: uploaded.url,
                      key: uploaded.key,
                      type: isVideo ? "video" : "image",
                      title: prev.title.trim() ? prev.title : cleanTitle,
                    }));

                    setUploadSuccess(
                      `File uploaded successfully: ${uploaded.name} (${isVideo ? "Video" : "Photo"})`
                    );
                    setUploadError("");
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("UploadThing upload error:", error);
                  setUploadError(
                    `Upload error: ${error.message || "Failed to upload file. Please check file format and network."}`
                  );
                }}
              />
            </div>

            {/* Live Upload Preview Box */}
            {formData.url && (
              <div className="p-3 bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 truncate">
                  {formData.type === "video" ? (
                    <Film className="w-4 h-4 text-dk-red shrink-0" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-dk-yellow shrink-0" />
                  )}
                  <span className="font-mono text-white truncate">{formData.url}</span>
                </div>
                <span className="text-[10px] font-mono text-[#25D366] uppercase font-bold shrink-0">
                  Ready
                </span>
              </div>
            )}
          </div>

          {/* Direct URL input fallback */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Direct Media URL (Auto-filled on upload or paste manually)
            </label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => {
                const url = e.target.value;
                const isVideo = Boolean(url.match(/\.(mp4|mov|webm|m4v)/i));
                setFormData({
                  ...formData,
                  url,
                  type: isVideo ? "video" : formData.type,
                });
              }}
              placeholder="https://utfs.io/f/... or https://..."
              className="w-full bg-black border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Media Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as MediaType })
                }
                className="w-full bg-black border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow"
              >
                <option value="image">Photo / Image</option>
                <option value="video">Video Reel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as MediaCategory,
                  })
                }
                className="w-full bg-black border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Title / Caption *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Kozhikode Stage Show Choreography"
              className="w-full bg-black border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief performance or class description..."
              className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow resize-none"
            />
          </div>

          {formData.type === "video" && (
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Video Thumbnail Image URL (Optional poster image)
              </label>
              <input
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnailUrl: e.target.value })
                }
                placeholder="https://..."
                className="w-full bg-black border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    displayOrder: Number(e.target.value),
                  })
                }
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                id="published"
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4 rounded-none accent-dk-yellow"
              />
              <label
                htmlFor="published"
                className="text-xs font-mono uppercase text-neutral-300"
              >
                Publish to Live Gallery
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-900 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingItem(null);
              }}
              className="px-4 py-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-6 py-2.5 bg-white text-black hover:bg-dk-yellow font-heading font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {actionLoading ? "Saving..." : "Save Media Item"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Media Item?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This will remove the record from MongoDB and delete the asset from UploadThing.`}
        confirmText="Delete Asset"
        isDestructive={true}
        isLoading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
