import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Blue Moon Associates offers expert property consultation, buying, selling, and construction services across Pakistan's top housing societies.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
