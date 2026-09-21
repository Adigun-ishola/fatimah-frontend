"use client";

import { useState, useEffect } from "react";
import { adminApi, publicApi } from "@/lib/api";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    hero_title: "Jimoh-Sulaiman Fatima Adesewa",
    hero_subtitle: "Law Student & Aspiring Legal Practitioner",
    about_text: "",
    email: "contact@fatimaadesewa.com",
    phone: "",
    linkedin_url: "",
    twitter_url: "",
    instagram_url: "",
    resume_url: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await publicApi.getSettings();
        if (res.data.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data.data,
          }));
        }
      } catch (err) {
        console.error("Could not load settings", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      await adminApi.updateSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner size="lg" />;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a365d] font-['Playfair_Display']">
          Site Settings & Profile
        </h1>
        <p className="text-sm text-gray-500">
          Update your headline, contact details, social links, and bio information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4" /> Settings updated successfully!
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-b pb-2">
            Hero & Branding
          </h2>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Full Name / Headline Title *
            </label>
            <input
              type="text"
              required
              value={formData.hero_title}
              onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Professional Subtitle *
            </label>
            <input
              type="text"
              required
              value={formData.hero_subtitle}
              onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-b pb-2">
            Contact & Socials
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone (Optional)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                placeholder="https://x.com/..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                placeholder="https://instagram.com/..."
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" variant="primary" isLoading={isSaving}>
            Save All Changes
          </Button>
        </div>
      </form>
    </div>
  );
}