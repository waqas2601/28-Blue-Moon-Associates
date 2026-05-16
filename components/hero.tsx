import { supabase } from "@/lib/supabase";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import StatsCounter from "./stats-counter";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

async function getHeroSettings() {
  noStore();
  const { data } = await supabase
    .from("settings")
    .select("*")
    .in("key", [
      "hero_heading1",
      "hero_heading2",
      "hero_subtext",
      "hero_video_url",
      "stat_years",
      "stat_projects",
      "stat_clients",
    ]);

  if (!data) return {};
  const s: Record<string, string> = {};
  data.forEach((item: any) => {
    s[item.key] = item.value;
  });
  return s;
}

export default async function Hero() {
  const settings = await getHeroSettings();

  const VIDEO_URL = settings.hero_video_url || "";


  const stats = [
    { number: settings.stat_years || "20+", label: "Years of Experience" },
    { number: settings.stat_projects || "500+", label: "Projects Marketed" },
    { number: settings.stat_clients || "10,000+", label: "Satisfied Clients" },
  ];
  return (
    <section className="relative min-h-screen">
      {/* Background — Video or Image */}
      <div className="absolute inset-0">
        {VIDEO_URL ? (
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src={VIDEO_URL} type="video/mp4" />
            <img src={HERO_IMAGE} alt="Blue Moon Associates" className="h-full w-full object-cover" />
          </video>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <Image src={HERO_IMAGE} alt="Modern city buildings" fill className="object-cover" priority />
          </div>
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-32 text-center">
        {/* Badge */}
        <span className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#C9963A]">
          Welcome to Blue Moon Associates
        </span>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">{settings.hero_heading1 || "Building Dreams."}</span>
          <span className="block">{settings.hero_heading2 || "Delivering Legacy."}</span>
        </h1>

        <p className="mb-10 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl">
          {settings.hero_subtext || "Your trusted partner in real estate — Consultants | Builders | Developers"}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <a
            href="/properties"
            className="rounded-full bg-[#29ABE2] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#29ABE2]/90 sm:text-base"
          >
            View Properties
          </a>

          <a
            href="/contact"
            className="rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#4A4A4A] sm:text-base"
          >
            Contact Us
          </a>
        </div>
      </div>

      <StatsCounter stats={stats} />
    </section>
  );
}
