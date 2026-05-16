import { supabase } from "@/lib/supabase";

export async function uploadImage(
  file: File,
  folder: "properties" | "blogs" | "societies",
): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `images/${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("blue-moon")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data } = supabase.storage.from("blue-moon").getPublicUrl(filePath);

  return data.publicUrl;
}
