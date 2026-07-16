import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "BOB The Pasta Factory'nin hikayesi: Çanakkale Kemalpaşa Mahallesi'nde gerçek İtalyan usulü, günlük taze el yapımı makarna ve imza parmesan tekeri sunumu.",
  alternates: { canonical: "/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | BOB The Pasta Factory",
    description:
      "Çanakkale'de gerçek İtalyan usulü, günlük taze el yapımı makarna ve dev parmesan tekerinde hazırlanan imza lezzetler.",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
