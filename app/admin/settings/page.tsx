"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Loader2,
  Save,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Search,
  Home,
  BarChart3,
} from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [settings, setSettings] = useState({
    // Contact Info
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    // Business Hours
    hours_weekday: "",
    hours_friday: "",
    // SEO
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_og_image: "",
    // Homepage Hero
    hero_heading1: "",
    hero_heading2: "",
    hero_subtext: "",
    hero_video_url: "",
    // Stats
    stat_years: "",
    stat_projects: "",
    stat_clients: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("settings").select("*");
      if (data && data.length > 0) {
        const settingsObj: any = {};
        data.forEach((item: any) => {
          settingsObj[item.key] = item.value;
        });
        setSettings((prev) => ({ ...prev, ...settingsObj }));
      }
      setIsFetching(false);
    };
    fetchSettings();
  }, []);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingVideo(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `videos/hero/${fileName}`;

    const { error } = await supabase.storage
      .from("blue-moon")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Video upload error:", error);
      setIsUploadingVideo(false);
      return;
    }

    const { data } = supabase.storage.from("blue-moon").getPublicUrl(filePath);

    setSettings((prev) => ({ ...prev, hero_video_url: data.publicUrl }));
    setIsUploadingVideo(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveError(null);

    const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase
      .from("settings")
      .upsert(rows, { onConflict: "key" });

    setIsLoading(false);

    if (error) {
      setSaveError("Failed to save settings. Please try again.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };
  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#29ABE2] mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Settings</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your website settings
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#29ABE2] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#29ABE2]/90 transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saved ? "Saved! ✅" : "Save All Changes"}
        </button>
      </div>

      {saveError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {saveError}
        </div>
      )}

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-6 flex items-center gap-2">
            <Phone className="h-5 w-5 text-[#29ABE2]" />
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  placeholder="+92 336 921 8748"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="whatsapp"
                  value={settings.whatsapp}
                  onChange={handleChange}
                  placeholder="923369218748"
                  className="w-full pl-10 pr-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Without + or spaces e.g. 923369218748
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="info@bluemoonassociates.com"
                  className="w-full pl-10 pr-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Office Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  placeholder="Rawalpindi, Pakistan"
                  className="w-full pl-10 pr-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#29ABE2]" />
            Business Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Saturday - Thursday
              </label>
              <input
                type="text"
                name="hours_weekday"
                value={settings.hours_weekday}
                onChange={handleChange}
                placeholder="9:00 AM - 6:00 PM"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Friday
              </label>
              <input
                type="text"
                name="hours_friday"
                value={settings.hours_friday}
                onChange={handleChange}
                placeholder="Closed or 2:00 PM - 6:00 PM"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
          </div>
        </div>

        {/* Homepage Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-6 flex items-center gap-2">
            <Home className="h-5 w-5 text-[#29ABE2]" />
            Homepage Settings
          </h2>

          {/* Hero Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Hero Heading Line 1
              </label>
              <input
                type="text"
                name="hero_heading1"
                value={settings.hero_heading1}
                onChange={handleChange}
                placeholder="Building Dreams."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Hero Heading Line 2
              </label>
              <input
                type="text"
                name="hero_heading2"
                value={settings.hero_heading2}
                onChange={handleChange}
                placeholder="Delivering Legacy."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Hero Subtext
              </label>
              <input
                type="text"
                name="hero_subtext"
                value={settings.hero_subtext}
                onChange={handleChange}
                placeholder="Your trusted partner in real estate — Consultants | Builders | Developers"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
          </div>

          {/* Hero Video */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
              Hero Background Video
              <span className="text-gray-400 text-xs ml-2">
                (Shows on homepage background)
              </span>
            </label>

            {/* Upload Button */}
            <label
              className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors mb-3 ${
                isUploadingVideo
                  ? "border-[#29ABE2] bg-[#29ABE2]/5"
                  : "border-gray-300 hover:border-[#29ABE2] hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {isUploadingVideo ? (
                  <>
                    <Loader2 className="h-6 w-6 text-[#29ABE2] animate-spin" />
                    <p className="text-sm text-[#29ABE2] font-medium">
                      Uploading video...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-[#29ABE2]/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#29ABE2]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-[#29ABE2]">
                          Click to upload video
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        MP4, MOV up to 500MB
                      </p>
                    </div>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={isUploadingVideo}
                className="hidden"
              />
            </label>

            {/* Video Preview */}
            {settings.hero_video_url && (
              <div className="mb-3 relative group">
                <video
                  src={settings.hero_video_url}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                  <p className="text-white text-xs font-medium">
                    Video uploaded ✅
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, hero_video_url: "" }))
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs items-center justify-center hidden group-hover:flex"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Manual URL */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Or paste video URL:</p>
              <input
                type="text"
                name="hero_video_url"
                value={settings.hero_video_url}
                onChange={handleChange}
                placeholder="https://your-supabase-url/.../hero.mp4"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Leave empty to show background image
              </p>
            </div>
          </div>
        </div>

        {/* Homepage Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#29ABE2]" />
            Homepage Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Years of Experience
              </label>
              <input
                type="text"
                name="stat_years"
                value={settings.stat_years}
                onChange={handleChange}
                placeholder="20+"
                className="w-full px-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Projects Marketed
              </label>
              <input
                type="text"
                name="stat_projects"
                value={settings.stat_projects}
                onChange={handleChange}
                placeholder="500+"
                className="w-full px-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Satisfied Clients
              </label>
              <input
                type="text"
                name="stat_clients"
                value={settings.stat_clients}
                onChange={handleChange}
                placeholder="10,000+"
                className="w-full px-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-6 flex items-center gap-2">
            <Search className="h-5 w-5 text-[#29ABE2]" />
            SEO Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Site Title
              </label>
              <input
                type="text"
                name="seo_title"
                value={settings.seo_title}
                onChange={handleChange}
                placeholder="Blue Moon Associates — Consultants | Builders | Developers"
                className="w-full px-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Meta Description
                <span className="text-gray-400 text-xs ml-2">
                  (Shown in Google search results)
                </span>
              </label>
              <textarea
                name="seo_description"
                value={settings.seo_description}
                onChange={handleChange}
                placeholder="Blue Moon Associates is a leading real estate company in Rawalpindi offering premium properties in Faisal Hills, B-17, Faisal Town and more."
                rows={3}
                className="w-full px-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Recommended: 150-160 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Keywords
                <span className="text-gray-400 text-xs ml-2">
                  (Comma separated)
                </span>
              </label>
              <input
                type="text"
                name="seo_keywords"
                value={settings.seo_keywords}
                onChange={handleChange}
                placeholder="real estate rawalpindi, faisal hills, property for sale islamabad"
                className="w-full px-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                OG Image URL
                <span className="text-gray-400 text-xs ml-2">
                  (Social media share image)
                </span>
              </label>
              <input
                type="text"
                name="seo_og_image"
                value={settings.seo_og_image}
                onChange={handleChange}
                placeholder="https://yourdomain.com/og-image.jpg"
                className="w-full px-4 py-2.5 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
          </div>
        </div>

        {/* Save Button Bottom */}
        <div className="flex justify-end pb-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 bg-[#29ABE2] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#29ABE2]/90 transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saved ? "Saved! ✅" : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
