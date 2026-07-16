import type { MetadataRoute } from "next";

const BASE = "https://bobthepastafactory.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${BASE}/menu`, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${BASE}/hakkimizda`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${BASE}/galeri`, changeFrequency: "weekly", priority: 0.7, lastModified: now },
    { url: `${BASE}/iletisim`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
  ];
}
