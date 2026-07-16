import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "BOB The Pasta Factory'e ulaşın: adres, telefon, WhatsApp rezervasyon ve Çanakkale Kemalpaşa'daki konumumuz.",
  alternates: { canonical: "/iletisim" },
  openGraph: {
    title: "İletişim | BOB The Pasta Factory",
    description: "Rezervasyon, sipariş ve sorularınız için bize ulaşın.",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
