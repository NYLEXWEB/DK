"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Trash2,
  CheckCircle,
  Eye,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Loader2,
  Filter,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Modal } from "@/components/ui/Modal";
import { Enquiry, EnquiryStatus } from "@/types";
import { formatDate, formatWhatsAppUrl } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { adminFetch } from "@/lib/admin-fetch";

export default function AdminEnquiriesPage() {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/api/enquiries");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
      toast.error("Failed to load enquiries from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: EnquiryStatus) => {
    try {
      const res = await adminFetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status });
        }
        toast.success(`Enquiry marked as "${status.toUpperCase()}"`);
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update status");
      }
    } catch (err: any) {
      console.error("Failed to update status:", err);
      toast.error(err.message || "Failed to update enquiry status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      const res = await adminFetch(`/api/enquiries/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e._id !== deleteTarget._id));
        setDeleteTarget(null);
        if (selectedEnquiry?._id === deleteTarget._id) {
          setSelectedEnquiry(null);
        }
        toast.success("Enquiry deleted successfully.");
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete enquiry");
      }
    } catch (err: any) {
      toast.error(err.message || "Deletion failed");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === "all") return true;
    return e.status === statusFilter;
  });

  return (
    <>
      <AdminHeader
        title="Admission Enquiries"
        subtitle="Review, respond to, and manage prospective student applications"
      />

      <main className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["all", "new", "read", "contacted", "closed"].map((status) => {
            const count =
              status === "all"
                ? enquiries.length
                : enquiries.filter((e) => e.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 ${
                  statusFilter === status
                    ? "bg-white text-black font-normal"
                    : "bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
              >
                <span>{status}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-black/40 text-neutral-300">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Enquiries List */}
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-dk-yellow mb-2" />
            <p className="text-xs font-mono text-neutral-500 uppercase">
              Loading admission leads...
            </p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-neutral-800 bg-neutral-950 p-8">
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-wider mb-2">
              No enquiries in this view.
            </p>
            <p className="text-xs text-neutral-600">
              New submissions from the public website contact and branch forms will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-neutral-950 border border-neutral-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 uppercase bg-black/40">
                    <th className="py-3 px-4 font-medium">Date</th>
                    <th className="py-3 px-4 font-medium">Student / Parent</th>
                    <th className="py-3 px-4 font-medium">Contact</th>
                    <th className="py-3 px-4 font-medium">Branch / Mode</th>
                    <th className="py-3 px-4 font-medium">Style</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {filteredEnquiries.map((enq) => {
                    const waUrl = formatWhatsAppUrl(
                      enq.phone,
                      `Hello ${enq.name}, this is DK Dance Company following up on your admission enquiry.`
                    );

                    return (
                      <tr
                        key={enq._id}
                        className={`hover:bg-neutral-900/40 transition-colors ${
                          enq.status === "new" ? "bg-dk-yellow/5" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                          {formatDate(enq.createdAt)}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enq);
                              if (enq.status === "new" && enq._id) {
                                handleUpdateStatus(enq._id, "read");
                              }
                            }}
                            className="hover:text-dk-yellow text-left underline-offset-2 hover:underline"
                          >
                            {enq.name}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span>{enq.phone}</span>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#25D366] hover:opacity-80"
                              title="Message on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span>{enq.branch}</span>
                          <span className="text-[10px] text-neutral-500 block uppercase">
                            {enq.mode}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-400 whitespace-nowrap">
                          {enq.danceStyle}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={enq.status}
                            onChange={(e) =>
                              enq._id &&
                              handleUpdateStatus(
                                enq._id,
                                e.target.value as EnquiryStatus
                              )
                            }
                            className={`px-2 py-1 text-[10px] uppercase font-normal bg-black border ${
                              enq.status === "new"
                                ? "border-dk-yellow text-dk-yellow"
                                : enq.status === "contacted"
                                ? "border-[#25D366] text-[#25D366]"
                                : "border-neutral-800 text-neutral-400"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enq);
                                if (enq.status === "new" && enq._id) {
                                  handleUpdateStatus(enq._id, "read");
                                }
                              }}
                              className="p-1.5 text-neutral-400 hover:text-white"
                              title="View details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(enq)}
                              className="p-1.5 text-neutral-400 hover:text-dk-red"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={selectedEnquiry !== null}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry: ${selectedEnquiry.name}`}
          maxWidth="md"
        >
          <div className="space-y-6 text-xs font-mono">
            <div className="grid grid-cols-2 gap-4 p-4 bg-black border border-neutral-800">
              <div>
                <span className="text-neutral-500 block uppercase mb-1">
                  Submission Date
                </span>
                <span className="text-white">
                  {formatDate(selectedEnquiry.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block uppercase mb-1">
                  Current Status
                </span>
                <span className="text-dk-yellow uppercase font-normal">
                  {selectedEnquiry.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-neutral-500 uppercase block mb-1">
                  Full Name
                </span>
                <p className="text-sm font-heading font-light text-white uppercase">
                  {selectedEnquiry.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-neutral-500 uppercase block mb-1">
                    Phone / WhatsApp
                  </span>
                  <div className="flex items-center gap-2 text-white">
                    <Phone className="w-3 h-3 text-neutral-500" />
                    <span>{selectedEnquiry.phone}</span>
                  </div>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase block mb-1">
                    Email
                  </span>
                  <div className="flex items-center gap-2 text-white truncate">
                    <Mail className="w-3 h-3 text-neutral-500 shrink-0" />
                    <span className="truncate">{selectedEnquiry.email}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-neutral-500 uppercase block mb-1">
                    Student Age
                  </span>
                  <span className="text-white">
                    {selectedEnquiry.age || "Not specified"}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase block mb-1">
                    Branch Studio
                  </span>
                  <span className="text-white">{selectedEnquiry.branch}</span>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase block mb-1">
                    Training Mode
                  </span>
                  <span className="text-white uppercase">{selectedEnquiry.mode}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 uppercase block mb-1">
                  Preferred Dance Style
                </span>
                <span className="text-dk-yellow font-heading font-light">
                  {selectedEnquiry.danceStyle}
                </span>
              </div>

              {selectedEnquiry.message && (
                <div>
                  <span className="text-neutral-500 uppercase block mb-1">
                    Student Message / Goal
                  </span>
                  <p className="p-3 bg-black border border-neutral-800 text-neutral-300 leading-relaxed font-sans text-xs">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Response */}
            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
              <a
                href={formatWhatsAppUrl(
                  selectedEnquiry.phone,
                  `Hello ${selectedEnquiry.name}, this is Director Dhanesh Krishnan from DK Dance Company responding to your admission enquiry.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-black font-heading font-light text-xs uppercase"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Respond via WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    selectedEnquiry._id &&
                    handleUpdateStatus(selectedEnquiry._id, "contacted")
                  }
                  className="px-3 py-2 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs uppercase"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-3 py-2 text-xs uppercase text-neutral-500 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Enquiry Record?"
        message={`Delete enquiry from ${deleteTarget?.name}? This record will be permanently purged from the database.`}
        confirmText="Delete Record"
        isDestructive={true}
        isLoading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
