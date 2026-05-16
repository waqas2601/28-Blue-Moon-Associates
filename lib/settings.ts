import { supabase } from "@/lib/supabase";

export async function getSettings() {
  const { data } = await supabase.from("settings").select("*");

  if (!data) return {};

  const settings: Record<string, string> = {};
  data.forEach((item: any) => {
    settings[item.key] = item.value;
  });

  return settings;
}
