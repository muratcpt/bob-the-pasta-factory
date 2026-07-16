import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menü",
  description:
    "BOB The Pasta Factory'nin tam menüsü: parmesan tekerinde makarnalar, lazanya, ravioli, focaccia sandviçler, fix menüler, tiramisu, kahveler ve içecekler.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menü | BOB The Pasta Factory",
    description: "El yapımı makarna, lazanya ve ravioli — parmesan tekerinde hazırlanan imza lezzetler.",
    images: [{ url: "/images/hero-bg.jpg", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
