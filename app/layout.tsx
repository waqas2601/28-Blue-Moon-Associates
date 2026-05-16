import { getSettings } from "@/lib/settings";
import type { Metadata } from "next";
import "./globals.css";
import { unstable_noStore as noStore } from "next/cache";
import WhatsAppFloat from "@/components/whatsapp-float";

export async function generateMetadata(): Promise<Metadata> {
  noStore();
  const settings = await getSettings();
  return {
    metadataBase: new URL("https://bluemoonassociates.com"),
    title: {
      default: settings.seo_title || "Blue Moon Associates — Consultants | Builders | Developers",
      template: "%s | Blue Moon Associates",
    },
    description:
      settings.seo_description ||
      "Blue Moon Associates is a leading real estate company in Rawalpindi offering premium properties in Faisal Hills, B-17, Faisal Town and more.",
    keywords:
      settings.seo_keywords ||
      "real estate rawalpindi, faisal hills, property for sale islamabad",
    openGraph: {
      title: settings.seo_title || "Blue Moon Associates",
      description:
        settings.seo_description || "Leading real estate company in Rawalpindi",
      type: "website",
      images: settings.seo_og_image ? [settings.seo_og_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo_title || "Blue Moon Associates",
      description:
        settings.seo_description || "Leading real estate company in Rawalpindi",
      images: settings.seo_og_image ? [settings.seo_og_image] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();
  const settings = await getSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Blue Moon Associates",
    description:
      settings.seo_description ||
      "Blue Moon Associates is a leading real estate company in Rawalpindi.",
    url: "https://bluemoonassociates.com",
    telephone: settings.phone || "+92 336 921 8748",
    email: settings.email || "info@bluemoonassociates.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address || "Faisal Hills",
      addressLocality: "Rawalpindi",
      addressCountry: "PK",
    },
    sameAs: ["https://www.facebook.com/share/1Du3m7Kgnu/"],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <WhatsAppFloat whatsapp={settings.whatsapp} />
      </body>
    </html>
  );
}
