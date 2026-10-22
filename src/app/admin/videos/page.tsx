"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Video,
  Film,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Star,
  Loader2,
  Check,
  AlertCircle,
  FileCheck2,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { MediaItem, MediaCategory, MediaType } from "@/types";
import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/context/ToastContext";

const CATEGORIES: MediaCategory[] = [
  "Performances",
  "Classes",
  "Stage Shows",
  "Competitions",
  "Workshops",
  "Special Training",
  "Branch Activities",
  "Bournemouth",
  "Cultural Events",
  "School Programs",
];

export default function AdminVideosPage() {
  const toast = useToast();
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "featured" | "published" | "draft">("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Performances" as MediaCategory,
    type: "video" as MediaType,
    url: "",
    key: "",
    thumbnailUrl: "",
    duration: "0:45",
    featuredOnHome: true,
    published: true,
    displayOrder: 1,
  });

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media?type=video&all=true");
      const data = await res.json();
      if (data.success) {
        setVideos(data.data);
      }
    } catch (err) {
      console.error("Failed to load videos:", err);
      toast.error("Failed to load videos repository from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenAdd = () => {
    setUploadError("");
    setUploadSuccess("");
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      category: "Performances",
      type: "video",
      url: "",
      key: "",
      thumbnailUrl: "",
      duration: "0:45",
      featuredOnHome: true,
      published: true,
      displayOrder: videos.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MediaItem) => {
    setUploadError("");
    setUploadSuccess("");
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      type: "video",
      url: item.url,
      key: item.key || "",
      thumbnailUrl: item.thumbnailUrl || "",
      duration: item.duration || "0:45",
      featuredOnHome: item.featuredOnHome !== false,
      published: item.published,
      displayOrder: item.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim() || !formData.title.trim()) {
      setUploadError("Please upload a video file and enter a title.");
      return;
    }

    setActionLoading(true);
    setUploadError("");

    try {
      if (editingItem && editingItem._id) {
        const res = await fetch(`/api/media/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Update failed");
        }
        toast.success(`Video "${formData.title}" updated successfully.`);
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
        toast.success(`New video routine "${formData.title}" added to showcase.`);
      }

      setIsModalOpen(false);
      setEditingItem(null);
      await fetchVideos();
    } catch (err: any) {
      const msg = err.message || "Failed to save video.";
      setUploadError(msg);
      toast.error(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleFeatured = async (item: MediaItem) => {
    if (!item._id) return;
    const nextState = !item.featuredOnHome;
    try {
      const res = await fetch(`/api/media/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featuredOnHome: nextState }),
      });
      if (res.ok) {
        setVideos((prev) =>
          prev.map((v) => (v._id === item._id ? { ...v, featuredOnHome: nextState } : v))
        );
        toast.success(
          nextState
            ? `"${item.title}" will now display on the homepage video showcase.`
            : `"${item.title}" removed from homepage video showcase.`
        );
      } else {
        toast.error("Failed to update homepage status.");
      }
    } catch (err) {
      console.error("Failed to toggle featured:", err);
      toast.error("Network error while updating video status.");
    }
  };

  const handleTogglePublish = async (item: MediaItem) => {
    if (!item._id) return;
    const nextState = !item.published;
    try {
      const res = await fetch(`/api/media/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: nextState }),
      });
      if (res.ok) {
        setVideos((prev) =>
          prev.map((v) => (v._id === item._id ? { ...v, published: nextState } : v))
        );
        toast.info(
          nextState ? `"${item.title}" is now published and live.` : `"${item.title}" moved to draft.`
        );
      } else {
        toast.error("Failed to change publish status.");
      }
    } catch (err) {
      console.error("Failed to toggle publish:", err);
      toast.error("Network error while updating publish status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || !deleteTarget._id) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/media/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v._id !== deleteTarget._id));
        toast.success(`Video "${deleteTarget.title}" deleted successfully from database and storage.`);
        setDeleteTarget(null);
      } else {
        throw new Error("Failed to delete video");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete video");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredVideos = videos.filter((v) => {
    if (activeFilter === "featured") return v.featuredOnHome !== false && v.published;
    if (activeFilter === "published") return v.published;
    if (activeFilter === "draft") return !v.published;
    return true;
  });

  return (
    <>
      <AdminHeader
        title="Video Showcase & Performance Reels"
        subtitle="Upload, feature, and manage video routines featured on the DKDC homepage showcase"
      >
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest transition-colors shadow-lg active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Video</span>
        </button>
      </AdminHeader>

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Filter & Metric Tabs */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-neutral-900">
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: "All Videos", count: videos.length },
              {
                id: "featured",
                label: "Homepage Showcase",
                count: videos.filter((v) => v.featuredOnHome !== false && v.published).length,
              },
              {
                id: "published",
                label: "Published",
                count: videos.filter((v) => v.published).length,
              },
              {
                id: "draft",
                label: "Drafts",
                count: videos.filter((v) => !v.published).length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  activeFilter === tab.id
                    ? "bg-white text-black font-normal"
                    : "bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-black/40 text-neutral-300">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-neutral-500 uppercase">
            Homepage section updates immediately upon upload
          </span>
        </div>

        {/* Video Cards Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-dk-yellow mb-2" />
            <p className="text-xs font-mono text-neutral-500 uppercase">
              Loading video showcases...
            </p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-neutral-800 bg-neutral-950 p-8 space-y-4">
            <Film className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-wider">
              No videos found in this view.
            </p>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Upload MP4 choreography videos, rehearsals, or stage performance reels to feature them on the homepage.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-white text-black text-xs font-heading font-light uppercase tracking-widest hover:bg-dk-yellow transition-colors"
            >
              Upload First Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((item) => (
              <div
                key={item._id || item.url}
                className="bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-colors"
              >
                {/* Video Player or Thumbnail */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video
                    src={item.url}
                    poster={item.thumbnailUrl}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                  {/* Badges on Top */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                    <span className="p-1 bg-black/80 backdrop-blur-md text-dk-red flex items-center gap-1 text-[10px] font-mono uppercase px-2">
                      <Film className="w-3 h-3" />
                      <span>Video Reel</span>
                    </span>
                    {item.featuredOnHome !== false && (
                      <span className="p-1 bg-dk-yellow text-black flex items-center gap-1 text-[10px] font-mono uppercase font-bold px-2">
                        <Star className="w-3 h-3 fill-black" />
                        <span>Homepage</span>
                      </span>
                    )}
                  </div>

                  {/* Top Right Controls */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublish(item)}
                      title={item.published ? "Live on site" : "Draft (Hidden)"}
                      className={`p-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-1 ${
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

                {/* Video Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase text-dk-yellow">
                        {item.category}
                      </span>
                      {item.duration && (
                        <span className="text-[10px] font-mono text-neutral-400">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-heading font-light uppercase text-white truncate">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-xs text-neutral-400 line-clamp-2 font-sans font-light">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleFeatured(item)}
                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase px-2.5 py-1 transition-colors border ${
                        item.featuredOnHome !== false
                          ? "border-dk-yellow/50 bg-dk-yellow/10 text-dk-yellow hover:bg-dk-yellow/20"
                          : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Star
                        className={`w-3 h-3 ${
                          item.featuredOnHome !== false ? "fill-dk-yellow" : ""
                        }`}
                      />
                      <span>
                        {item.featuredOnHome !== false ? "Featured on Home" : "Add to Home"}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        aria-label="Edit video details"
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        aria-label="Delete video"
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

      {/* Add / Edit Video Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Video Routine" : "Upload Video to Showcase"}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveVideo} className="space-y-5">
          {uploadError && (
            <div
              role="alert"
              className="flex items-center gap-2.5 p-3.5 bg-dk-red/10 border border-dk-red/30 text-white text-xs font-mono"
            >
              <AlertCircle className="w-4 h-4 text-dk-red shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center gap-2.5 p-3.5 bg-[#25D366]/10 border border-[#25D366]/30 text-white text-xs font-mono">
              <FileCheck2 className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {/* Video File Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase text-neutral-400">
                Performance Video File (MP4, MOV, WebM)
              </label>
              {formData.url && (
                <span className="text-[10px] font-mono uppercase text-[#25D366] flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Video Attached & Ready</span>
                </span>
              )}
            </div>

            {formData.url ? (
              <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="relative aspect-video max-h-56 w-full bg-black border border-neutral-800 overflow-hidden">
                  <video
                    src={formData.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 truncate text-xs text-neutral-300 font-mono">
                    <Film className="w-4 h-4 text-dk-red shrink-0" />
                    <span className="truncate">{formData.title || "Uploaded Video"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, url: "", key: "" }))}
                    className="px-3 py-1.5 bg-dk-red text-white text-xs font-mono uppercase tracking-wider hover:bg-red-700 transition-colors"
                  >
                    Remove / Change Video
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-black border border-dashed border-neutral-800 hover:border-dk-yellow transition-colors flex flex-col items-center justify-center gap-3 text-center">
                <UploadButton
                  endpoint="videoUploader"
                  appearance={{
                    button:
                      "bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest px-6 py-3 rounded-none transition-colors ut-uploading:bg-neutral-800",
                    allowedContent: "text-neutral-500 font-mono text-[11px]",
                  }}
                  content={{
                    button({ ready }) {
                      return ready ? "Select & Upload Video File" : "Preparing...";
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      const uploaded = res[0];
                      const cleanTitle = uploaded.name.replace(/\.[^/.]+$/, "");
                      setFormData((prev) => ({
                        ...prev,
                        url: uploaded.url,
                        key: uploaded.key,
                        title: prev.title.trim() ? prev.title : cleanTitle,
                      }));
                      setUploadSuccess(`Video uploaded successfully: ${uploaded.name}`);
                      setUploadError("");
                      toast.success("Video file uploaded successfully!");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                    setUploadError(`Upload error: ${error.message || "Failed to upload video."}`);
                    toast.error(error.message || "Upload failed");
                  }}
                />
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  Supports MP4, MOV, WebM, M4V (up to 256MB)
                </p>
              </div>
            )}
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Routine Title <span className="text-dk-red">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Stage Choreography Mega Routine"
                className="w-full bg-black border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow font-heading font-light"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as MediaCategory })
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

          {/* Duration & Thumbnail URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Approx Duration (e.g. 0:45 or 1:30)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="0:45"
                className="w-full bg-black border border-neutral-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
              />
            </div>

            {/* Video Poster / Thumbnail Upload */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono uppercase text-neutral-400">
                  Video Poster / Thumbnail Photo
                </label>
                {formData.thumbnailUrl && (
                  <span className="text-[10px] font-mono uppercase text-[#25D366] flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Photo Attached</span>
                  </span>
                )}
              </div>

              {formData.thumbnailUrl ? (
                <div className="relative aspect-video rounded-none overflow-hidden bg-black border border-neutral-800 group h-28">
                  <Image
                    src={formData.thumbnailUrl}
                    alt="Thumbnail preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnailUrl: "" })}
                      className="px-3 py-1 bg-dk-red text-white text-[11px] font-mono uppercase tracking-wider"
                    >
                      Remove Poster
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-black border border-dashed border-neutral-800 hover:border-dk-yellow transition-colors flex items-center justify-center">
                  <UploadButton
                    endpoint="imageUploader"
                    appearance={{
                      button:
                        "bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest px-4 py-2 rounded-none transition-colors ut-uploading:bg-neutral-800",
                      allowedContent: "text-neutral-500 font-mono text-[10px]",
                    }}
                    content={{
                      button({ ready }) {
                        return ready ? "Upload Poster Photo" : "Loading...";
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setFormData((prev) => ({
                          ...prev,
                          thumbnailUrl: res[0].url,
                        }));
                        toast.success("Video poster uploaded!");
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(error.message || "Failed to upload poster");
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
              Description / Choreographer Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell viewers about this choreography, dancers involved, or performance event..."
              className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-dk-yellow font-light"
            />
          </div>

          {/* Toggles: Featured on Home & Published */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-950 border border-neutral-800">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featuredOnHome}
                onChange={(e) => setFormData({ ...formData, featuredOnHome: e.target.checked })}
                className="w-4 h-4 rounded-none accent-dk-yellow cursor-pointer"
              />
              <div>
                <span className="text-xs font-mono uppercase text-white block">
                  Show on Homepage Showcase
                </span>
                <span className="text-[10px] text-neutral-400 block font-light">
                  Directly renders in the homepage video theater
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded-none accent-[#25D366] cursor-pointer"
              />
              <div>
                <span className="text-xs font-mono uppercase text-white block">
                  Live & Published
                </span>
                <span className="text-[10px] text-neutral-400 block font-light">
                  Uncheck to keep as draft
                </span>
              </div>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
              className="px-4 py-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Video...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingItem ? "Update Video" : "Save & Feature Video"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Video Routine?"
        message={`Delete "${deleteTarget?.title}"? If uploaded to UploadThing, the video file will also be permanently deleted from cloud storage.`}
        confirmText="Delete Video"
        isDestructive={true}
        isLoading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
