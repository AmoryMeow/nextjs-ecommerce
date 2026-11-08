import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/cart", "/checkout", "/api"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
