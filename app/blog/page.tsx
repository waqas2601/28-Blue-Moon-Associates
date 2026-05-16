import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import BlogListing from "@/components/blog-listing";
import { getSettings } from "@/lib/settings";

export default async function BlogPage() {
  const settings = await getSettings();

  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  // Create color map
  const categoryColors: Record<string, string> = {};
  categories?.forEach((cat: any) => {
    categoryColors[cat.name] = cat.color || "#C9963A";
  });

  const formattedBlogs = (blogs || []).map((blog: any) => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt || "",
    image:
      blog.thumbnail ||
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    category: blog.category || "General",
    categoryColor: categoryColors[blog.category] || "#C9963A",
    author: {
      name: blog.author || "Blue Moon Associates",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author || "BM")}&background=29ABE2&color=fff`,
    },
    date: new Date(blog.created_at).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    readTime: blog.read_time ? parseInt(blog.read_time) : 5,
    tags: blog.tags || "",
  }));

  const categoryNames = ["All", ...(categories || []).map((c: any) => c.name)];

  return (
    <>
      <Navbar />
      <BlogListing
        blogs={formattedBlogs}
        categories={categoryNames}
        categoryColors={categoryColors}
        whatsapp={settings.whatsapp}
      />
      <Footer />
    </>
  );
}
