"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, RotateCcw } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SiteSettings } from "@/types";
import { INITIAL_SITE_SETTINGS } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.data) {
          setSettings(data.data);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to update settings");

      setSuccessMessage("Site settings successfully updated and live.");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      alert(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset dynamic settings to official initial defaults?")) {
      setSettings(INITIAL_SITE_SETTINGS);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-dk-yellow mb-2" />
        <p className="text-xs font-mono text-neutral-500 uppercase">
          Loading site configuration...
        </p>
      </div>
    );
  }

  return (
    <>
      <AdminHeader
        title="Site Settings & CMS"
        subtitle="Configure dynamic homepage copy, mission, tuition fees, and social media channels"
      >
        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase text-neutral-400 hover:text-white"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </AdminHeader>

      <main className="p-6 sm:p-8 space-y-8 flex-1 max-w-5xl">
        {successMessage && (
          <div className="flex items-center gap-3 p-4 bg-dk-yellow/10 border border-dk-yellow text-dk-yellow text-xs font-mono uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Brand & Direction */}
          <div className="p-6 bg-neutral-950 border border-neutral-800 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-dk-yellow border-b border-neutral-900 pb-2">
              1. Brand Identity & Copy
            </h2>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Homepage Introduction Copy
              </label>
              <textarea
                rows={3}
                value={settings.intro}
                onChange={(e) =>
                  setSettings({ ...settings, intro: e.target.value })
                }
                className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-dk-yellow"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={settings.mission}
                  onChange={(e) =>
                    setSettings({ ...settings, mission: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-dk-yellow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={3}
                  value={settings.vision}
                  onChange={(e) =>
                    setSettings({ ...settings, vision: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-dk-yellow"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Tuition & Fees */}
          <div className="p-6 bg-neutral-950 border border-neutral-800 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-dk-yellow border-b border-neutral-900 pb-2">
              2. Tuition & Admission Fees
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  One-time Admission Fee
                </label>
                <input
                  type="text"
                  value={settings.fees.admissionFee}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      fees: { ...settings.fees, admissionFee: e.target.value },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  1 Class / Week Fee
                </label>
                <input
                  type="text"
                  value={settings.fees.weeklyOneClassFee}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      fees: {
                        ...settings.fees,
                        weeklyOneClassFee: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  2 Classes / Week Fee
                </label>
                <input
                  type="text"
                  value={settings.fees.weeklyTwoClassesFee}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      fees: {
                        ...settings.fees,
                        weeklyTwoClassesFee: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Fee Disclaimer & Branch Variance Note
              </label>
              <textarea
                rows={2}
                value={settings.fees.disclaimer}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    fees: { ...settings.fees, disclaimer: e.target.value },
                  })
                }
                className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-dk-yellow"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Payment Deadline Note (e.g. 10th of every month)
              </label>
              <input
                type="text"
                value={settings.fees.paymentNote}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    fees: { ...settings.fees, paymentNote: e.target.value },
                  })
                }
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
              />
            </div>
          </div>

          {/* Section 3: Online Classes */}
          <div className="p-6 bg-neutral-950 border border-neutral-800 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-dk-yellow border-b border-neutral-900 pb-2">
              3. Online Digital Classes
            </h2>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={settings.onlineClasses.headline}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    onlineClasses: {
                      ...settings.onlineClasses,
                      headline: e.target.value,
                    },
                  })
                }
                className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={settings.onlineClasses.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    onlineClasses: {
                      ...settings.onlineClasses,
                      description: e.target.value,
                    },
                  })
                }
                className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-dk-yellow"
              />
            </div>
          </div>

          {/* Section 4: Contact & Social */}
          <div className="p-6 bg-neutral-950 border border-neutral-800 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-dk-yellow border-b border-neutral-900 pb-2">
              4. Contact & Social Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Head Office Phone
                </label>
                <input
                  type="text"
                  value={settings.contact.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone: e.target.value },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  WhatsApp Number (Clean Digits)
                </label>
                <input
                  type="text"
                  value={settings.contact.whatsapp}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: {
                        ...settings.contact,
                        whatsapp: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, email: e.target.value },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.instagram || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: {
                        ...settings.socialLinks,
                        instagram: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.facebook || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: {
                        ...settings.socialLinks,
                        facebook: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.youtube || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: {
                        ...settings.socialLinks,
                        youtube: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Publish Updated Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
