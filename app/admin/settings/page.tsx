"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Save, Phone, Mail, MapPin, Globe } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const [settings, setSettings] = useState({
    phone: "",
    email: "",
    address: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    youtube: "",
    google_maps: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
    }));

    for (const update of updates) {
      await supabase
        .from("settings")
        .upsert({ key: update.key, value: update.value });
    }

    setIsLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    showToast("Settings saved successfully!");
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
            Update your website contact info and social links
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
          {saved ? "Saved! ✅" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-6 flex items-center gap-2">
            <Phone className="h-5 w-5 text-[#29ABE2]" />
            Contact Information
          </h2>
          <div className="space-y-4">
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Enter without + or spaces e.g. 923369218748
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Google Maps Embed URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="google_maps"
                  value={settings.google_maps}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/embed?..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Go to Google Maps → Share → Embed → Copy src URL
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#4A4A4A] mb-6 flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#29ABE2]" />
            Social Media Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Facebook Page URL
              </label>
              <input
                type="text"
                name="facebook"
                value={settings.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/bluemoonassociates"
                className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Instagram Profile URL
              </label>
              <input
                type="text"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/bluemoonassociates"
                className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                YouTube Channel URL
              </label>
              <input
                type="text"
                name="youtube"
                value={settings.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/@bluemoonassociates"
                className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-[#29ABE2]/10 rounded-lg">
            <p className="text-xs text-[#29ABE2] font-medium">
              💡 After saving, these links will automatically update across your
              entire website including the footer and contact page.
            </p>
          </div>
        </div>
      </div>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
