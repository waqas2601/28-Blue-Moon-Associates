import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://bluemoonassociates.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/properties`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  const [{ data: blogs }, { data: properties }] = await Promise.all([
    supabase.from("blogs").select("slug, created_at").eq("published", true),
    supabase.from("properties").select("slug, created_at"),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = (blogs || [])
    .filter((b: any) => b.slug)
    .map((blog: any) => ({
      url: `${base}/blog/${blog.slug}`,
      lastModified: new Date(blog.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const propertyRoutes: MetadataRoute.Sitemap = (properties || [])
    .filter((p: any) => p.slug)
    .map((property: any) => ({
      url: `${base}/properties/${property.slug}`,
      lastModified: new Date(property.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...blogRoutes, ...propertyRoutes];
}
