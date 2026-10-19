"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { MediaItem, MediaCategory, MediaType } from "@/types";
import { UploadButton } from "@/lib/uploadthing";

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
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

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
    if (!formData.url || !formData.title.trim()) {
      alert("Please provide both a media URL and a title.");
      return;
    }

    setActionLoading(true);
    try {
      if (editingItem) {
        // Update
        const res = await fetch(`/api/media/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        // Create
        const res = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Creation failed");
      }

      setIsAddModalOpen(false);
      setEditingItem(null);
      await fetchMedia();
    } catch (err: any) {
      alert(err.message || "Failed to save media item.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleTogglePublish = async (item: MediaItem) => {
    try {
      const res = await fetch(`/api/media/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      if (res.ok) {
        setMediaItems((prev) =>
          prev.map((m) =>
            m._id === item._id ? { ...m, published: !m.published } : m
          )
        );
      }
    } catch (err) {
      console.error("Toggle publish failed:", err);
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
        setDeleteTarget(null);
      } else {
        throw new Error("Failed to delete media item");
      }
    } catch (err: any) {
      alert(err.message || "Deletion failed");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredMedia = mediaItems.filter((item) => {
    if (filterCategory === "All") return true;
    return item.category === filterCategory;
  });

  return (
    <>
      <AdminHeader
        title="Media Management"
        subtitle="Upload, categorize, and organize photos & video performance reels"
      >
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media</span>
        </button>
      </AdminHeader>

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors shrink-0 ${
                filterCategory === cat
                  ? "bg-white text-black font-normal"
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
                    <h3 className="text-sm font-heading font-light uppercase text-white truncate mb-1">
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
        maxWidth="md"
      >
        <form onSubmit={handleSaveMedia} className="space-y-4">
          {/* UploadThing Upload Section */}
          <div className="p-4 bg-black border border-neutral-800 text-center">
            <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">
              Upload New Asset via UploadThing
            </span>
            <div className="flex justify-center my-2">
              <UploadButton
                endpoint={formData.type === "video" ? "videoUploader" : "imageUploader"}
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setFormData({
                      ...formData,
                      url: res[0].url,
                      key: res[0].key,
                      title: formData.title || res[0].name.replace(/\.[^/.]+$/, ""),
                    });
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`Upload error: ${error.message}`);
                }}
              />
            </div>
            {formData.url && (
              <div className="text-[11px] font-mono text-dk-yellow mt-2 truncate">
                Asset Ready: {formData.url}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Direct Media URL (or CDN link)
            </label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder="https://..."
              className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Media Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as MediaType })
                }
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
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
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
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
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Kozhikode Stage Show Choreography"
              className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
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
              placeholder="Brief editorial caption..."
              className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow resize-none"
            />
          </div>

          {formData.type === "video" && (
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Video Thumbnail Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnailUrl: e.target.value })
                }
                placeholder="https://..."
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
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
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
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
                Publish on Live Site
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
              className="px-4 py-2 text-xs font-mono uppercase text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-6 py-2 bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {actionLoading ? "Saving..." : "Save Media"}
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
