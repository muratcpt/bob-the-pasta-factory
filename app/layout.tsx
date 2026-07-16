import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorFollower from "@/components/ui/CursorFollower";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const BASE_URL = "https://bob-ashy-two.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BOB The Pasta Factory | Çanakkale",
    template: "%s | BOB The Pasta Factory",
  },
  description:
    "Çanakkale'de parmesan tekerinde el yapımı makarna, lazanya ve ravioli. Günlük taze, gerçek İtalyan usulü. Kemalpaşa Mahallesi, Çanakkale Merkez.",
  keywords: [
    "Çanakkale makarna",
    "Çanakkale İtalyan restoran",
    "parmesan tekerinde makarna",
    "Çanakkale lazanya",
    "Çanakkale ravioli",
    "bob the pasta factory",
    "Çanakkale pasta",
  ],
  authors: [{ name: "BOB The Pasta Factory" }],
  creator: "BOB The Pasta Factory",
  publisher: "BOB The Pasta Factory",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "BOB The Pasta Factory",
    title: "BOB The Pasta Factory | Çanakkale",
    description:
      "Parmesan tekerinde el yapımı makarna, lazanya ve ravioli. Çanakkale'nin en keyifli makarna deneyimi.",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "BOB The Pasta Factory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOB The Pasta Factory | Çanakkale",
    description: "Parmesan tekerinde el yapımı makarna, lazanya ve ravioli.",
    images: ["/images/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${dmSans.variable} ${greatVibes.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <ScrollProgress />
        <CursorFollower />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
