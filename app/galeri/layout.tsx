import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "BOB The Pasta Factory galerisi: el yapımı makarnalar, parmesan tekerinde sunum, lazanya, ravioli ve atölye kareleri.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    title: "Galeri | BOB The Pasta Factory",
    description: "El yapımı makarnalarımızdan parmesan tekerinde son dokunuşa — lezzet anları.",
    images: [{ url: "/images/gallery-1.jpg", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
