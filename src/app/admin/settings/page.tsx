"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  RotateCcw,
  Shield,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  User,
  Sliders,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SiteSettings } from "@/types";
import { INITIAL_SITE_SETTINGS } from "@/lib/constants";
import { useToast } from "@/context/ToastContext";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"cms" | "security">("cms");

  // CMS Settings State
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Credentials & Security State
  const [currentUsername, setCurrentUsername] = useState("admin");
  const [credForm, setCredForm] = useState({
    username: "admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [savingCreds, setSavingCreds] = useState(false);
  const [credError, setCredError] = useState("");
  const [credSuccess, setCredSuccess] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [settingsRes, credsRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/auth/credentials"),
        ]);

        const settingsData = await settingsRes.json();
        if (settingsData.success && settingsData.data) {
          setSettings(settingsData.data);
        }

        const credsData = await credsRes.json();
        if (credsData.success && credsData.username) {
          setCurrentUsername(credsData.username);
          setCredForm((prev) => ({ ...prev, username: credsData.username }));
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        toast.error("Failed to load configurations from database.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [toast]);

  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update settings");
      }

      setSuccessMessage("Site settings successfully updated and live.");
      toast.success("Site settings successfully updated and live.");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError("");
    setCredSuccess("");

    if (!credForm.currentPassword) {
      const msg = "Please enter your current password to authorize this change.";
      setCredError(msg);
      toast.warning(msg);
      return;
    }

    if (!credForm.username.trim() || credForm.username.trim().length < 3) {
      const msg = "Username must be at least 3 characters long.";
      setCredError(msg);
      toast.warning(msg);
      return;
    }

    if (credForm.newPassword) {
      if (credForm.newPassword.length < 6) {
        const msg = "New password must be at least 6 characters long.";
        setCredError(msg);
        toast.warning(msg);
        return;
      }

      if (credForm.newPassword !== credForm.confirmPassword) {
        const msg = "New password and confirm password do not match.";
        setCredError(msg);
        toast.error(msg);
        return;
      }
    }

    setSavingCreds(true);

    try {
      const res = await fetch("/api/auth/credentials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: credForm.currentPassword,
          newUsername: credForm.username.trim(),
          newPassword: credForm.newPassword ? credForm.newPassword.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update admin credentials.");
      }

      setCurrentUsername(data.username);
      setCredForm({
        username: data.username,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      const successMsg = data.message || "Admin credentials updated successfully.";
      setCredSuccess(successMsg);
      toast.success(successMsg, "Security Updated");
      setTimeout(() => setCredSuccess(""), 5000);
    } catch (err: any) {
      const errMsg = err.message || "Failed to update admin credentials.";
      setCredError(errMsg);
      toast.error(errMsg, "Credential Update Failed");
    } finally {
      setSavingCreds(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset dynamic settings to official initial defaults?")) {
      setSettings(INITIAL_SITE_SETTINGS);
      toast.info("Dynamic settings reset to defaults. Remember to click Publish to save changes.");
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-dk-yellow mb-2" />
        <p className="text-xs font-mono text-neutral-500 uppercase">
          Loading configuration & security profile...
        </p>
      </div>
    );
  }

  return (
    <>
      <AdminHeader
        title="Settings & Security"
        subtitle="Manage dynamic website copy, tuition rates, and administrative login credentials"
      >
        {activeTab === "cms" ? (
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-dk-yellow">
            <Shield className="w-3.5 h-3.5" />
            <span>Active Admin: {currentUsername}</span>
          </div>
        )}
      </AdminHeader>

      <main className="p-6 sm:p-8 space-y-8 flex-1 max-w-5xl">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-neutral-900 pb-3">
          <button
            onClick={() => setActiveTab("cms")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "cms"
                ? "bg-white text-black font-semibold shadow-lg"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Website Copy & Fees</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "security"
                ? "bg-white text-black font-semibold shadow-lg"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Username & Password</span>
          </button>
        </div>

        {/* TAB 1: ADMIN LOGIN & SECURITY CREDENTIALS */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Security Notice Card */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-none space-y-3">
              <div className="flex items-center gap-2.5 text-dk-yellow">
                <Shield className="w-5 h-5 text-dk-yellow" />
                <h2 className="text-sm font-heading font-light uppercase tracking-wider text-white">
                  Administrative Account Credentials
                </h2>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Update your administrative login username and password stored securely in your MongoDB Atlas database with bcrypt encryption. Once saved, changes apply across all devices immediately.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                <span className="text-neutral-500 uppercase">Current Username:</span>
                <span className="px-2.5 py-0.5 bg-neutral-900 border border-neutral-800 text-dk-yellow font-normal">
                  {currentUsername}
                </span>
                <span className="text-[10px] text-[#25D366] flex items-center gap-1 font-mono uppercase">
                  <Check className="w-3 h-3" />
                  <span>Verified Admin</span>
                </span>
              </div>
            </div>

            {/* Error Message */}
            {credError && (
              <div
                role="alert"
                className="flex items-center gap-2.5 p-4 bg-dk-red/10 border border-dk-red/30 text-white text-xs font-mono"
              >
                <AlertCircle className="w-4 h-4 text-dk-red shrink-0" />
                <span>{credError}</span>
              </div>
            )}

            {/* Success Message */}
            {credSuccess && (
              <div className="flex items-center gap-2.5 p-4 bg-[#25D366]/10 border border-[#25D366]/30 text-white text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{credSuccess}</span>
              </div>
            )}

            {/* Credentials Form */}
            <form onSubmit={handleUpdateCredentials} className="p-6 bg-neutral-950 border border-neutral-800 space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-dk-yellow" />
                  <span>New Admin Username</span>
                  <span className="text-dk-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={credForm.username}
                  onChange={(e) => setCredForm({ ...credForm, username: e.target.value })}
                  placeholder="e.g. admin or dhanesh"
                  className="w-full max-w-md bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono"
                />
                <p className="text-[11px] text-neutral-500 mt-1 font-light">
                  This username is used to log in at <code className="text-neutral-400">/admin/login</code>.
                </p>
              </div>

              {/* Current Password Field */}
              <div className="pt-4 border-t border-neutral-900">
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5 flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5 text-dk-red" />
                  <span>Current Password (Required for Verification)</span>
                  <span className="text-dk-red">*</span>
                </label>
                <div className="relative max-w-md">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    value={credForm.currentPassword}
                    onChange={(e) => setCredForm({ ...credForm, currentPassword: e.target.value })}
                    placeholder="Enter existing password"
                    className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 font-light">
                  Authenticate your current identity before modifying login security.
                </p>
              </div>

              {/* New Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-900">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-dk-yellow" />
                    <span>New Secret Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={credForm.newPassword}
                      onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                      placeholder="Leave blank to keep current password"
                      className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-dk-yellow font-mono pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                      aria-label="Toggle password visibility"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 font-light">
                    Minimum 6 characters. Leave blank if only changing username.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-dk-yellow" />
                    <span>Confirm New Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={credForm.confirmPassword}
                      onChange={(e) => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                      placeholder="Re-type new password"
                      className={`w-full bg-black border px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono pr-10 ${
                        credForm.newPassword && credForm.confirmPassword
                          ? credForm.newPassword === credForm.confirmPassword
                            ? "border-[#25D366] focus:border-[#25D366]"
                            : "border-dk-red focus:border-dk-red"
                          : "border-neutral-800 focus:border-dk-yellow"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                      aria-label="Toggle password visibility"
                    >
                      {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {credForm.newPassword && credForm.confirmPassword && (
                    <p
                      className={`text-[11px] mt-1 font-mono uppercase flex items-center gap-1 ${
                        credForm.newPassword === credForm.confirmPassword
                          ? "text-[#25D366]"
                          : "text-dk-red"
                      }`}
                    >
                      {credForm.newPassword === credForm.confirmPassword ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3" />
                          <span>Passwords do not match</span>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-neutral-900">
                <button
                  type="submit"
                  disabled={savingCreds}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest transition-colors disabled:opacity-50 active:scale-95"
                >
                  {savingCreds ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Save New Credentials</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: WEBSITE CMS SETTINGS */}
        {activeTab === "cms" && (
          <>
            {successMessage && (
              <div className="flex items-center gap-3 p-4 bg-dk-yellow/10 border border-dk-yellow text-dk-yellow text-xs font-mono uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveCMS} className="space-y-8">
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
          </>
        )}
      </main>
    </>
  );
}
