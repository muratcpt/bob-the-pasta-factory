import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import AboutPreview from "@/components/home/AboutPreview";
import SignatureMenu from "@/components/home/SignatureMenu";
import CTASection from "@/components/home/CTASection";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";
import { RESTAURANT } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BOB The Pasta Factory | Çanakkale — Parmesan Tekerinde El Yapımı Makarna",
  description:
    "Çanakkale Kemalpaşa'da parmesan tekerinde el yapımı makarna, lazanya ve ravioli. Günlük taze, gerçek İtalyan usulü. 4.3★ Google puanı, 12B+ Instagram takipçisi.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  image: "https://bob-ashy-two.vercel.app/images/hero-bg.jpg",
  url: "https://bob-ashy-two.vercel.app",
  description: RESTAURANT.description,
  telephone: RESTAURANT.phoneRaw,
  priceRange: RESTAURANT.priceRange,
  servesCuisine: "Italian",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eski Mahkeme Sokak, Sekure Apartmanı No:21/2, Kemalpaşa Mahallesi",
    addressLocality: "Çanakkale Merkez",
    addressRegion: "Çanakkale",
    postalCode: "17100",
    addressCountry: "TR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "12:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "14:00",
      closes: "23:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(RESTAURANT.rating),
    reviewCount: String(RESTAURANT.reviewCount),
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [RESTAURANT.instagram],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StatsBar />
      <AboutPreview />
      <SignatureMenu />
      <CTASection />
      <GalleryPreview />
      <Testimonials />
      <ContactSection />
    </>
  );
}
