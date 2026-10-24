import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  MapPin,
  Image as ImageIcon,
  Video,
  Inbox,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAuthSession } from "@/lib/auth";
import { getBranches, getMedia, getEnquiries } from "@/lib/db-services";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [branches, mediaItems, enquiries] = await Promise.all([
    getBranches(),
    getMedia(),
    getEnquiries(),
  ]);

  const publishedImages = mediaItems.filter(
    (m) => m.type === "image" && m.published
  ).length;

  const publishedVideos = mediaItems.filter(
    (m) => m.type === "video" && m.published
  ).length;

  const newEnquiriesCount = enquiries.filter(
    (e) => e.status === "new"
  ).length;

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <>
      <AdminHeader
        title="Admin Overview"
        subtitle={`Signed in as ${session.username} • Role: ${session.role}`}
      >
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
        >
          <span>Open Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </AdminHeader>

      <main className="p-6 sm:p-8 space-y-8 flex-1">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">
                Active Branches
              </span>
              <MapPin className="w-4 h-4 text-dk-yellow" />
            </div>
            <div>
              <span className="text-4xl font-heading font-extralight text-white block">
                {branches.length}
              </span>
              <Link
                href="/admin/branches"
                className="text-[11px] font-mono uppercase text-neutral-500 hover:text-dk-yellow mt-3 inline-block"
              >
                Manage branches →
              </Link>
            </div>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">
                Photo Library
              </span>
              <ImageIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-4xl font-heading font-extralight text-white block">
                {publishedImages}
              </span>
              <Link
                href="/admin/media"
                className="text-[11px] font-mono uppercase text-neutral-500 hover:text-white mt-3 inline-block"
              >
                Manage photo library →
              </Link>
            </div>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">
                Published Videos
              </span>
              <Video className="w-4 h-4 text-dk-red" />
            </div>
            <div>
              <span className="text-4xl font-heading font-extralight text-white block">
                {publishedVideos}
              </span>
              <Link
                href="/admin/videos"
                className="text-[11px] font-mono uppercase text-neutral-500 hover:text-dk-red mt-3 inline-block"
              >
                Manage video showcase →
              </Link>
            </div>
          </div>

          <div className="p-6 bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">
                New Enquiries
              </span>
              <Inbox className="w-4 h-4 text-dk-yellow" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-heading font-extralight text-white">
                  {newEnquiriesCount}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  / {enquiries.length} total
                </span>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-[11px] font-mono uppercase text-neutral-500 hover:text-dk-yellow mt-3 inline-block"
              >
                View unread leads →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Enquiries Section */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-heading font-light uppercase tracking-tight text-white">
                Recent Admission Enquiries
              </h2>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Latest student inquiries submitted across all branches and online tracks
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono uppercase tracking-widest text-dk-yellow hover:underline flex items-center gap-1"
            >
              <span>All Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-neutral-800 text-neutral-500 text-xs font-mono uppercase tracking-wider">
              No inquiries submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 uppercase">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Student / Parent</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium">Branch</th>
                    <th className="pb-3 font-medium">Style</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-neutral-900/40">
                      <td className="py-3 text-neutral-500">
                        {formatDate(enq.createdAt)}
                      </td>
                      <td className="py-3 font-medium text-white">{enq.name}</td>
                      <td className="py-3">{enq.phone}</td>
                      <td className="py-3">{enq.branch}</td>
                      <td className="py-3 text-neutral-400">{enq.danceStyle}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase font-normal ${
                            enq.status === "new"
                              ? "bg-dk-yellow text-black"
                              : enq.status === "contacted"
                              ? "bg-neutral-800 text-white"
                              : "bg-neutral-900 text-neutral-400"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
