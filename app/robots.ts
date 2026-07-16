import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [] },
    sitemap: "https://bobthepastafactory.vercel.app/sitemap.xml",
  };
}
