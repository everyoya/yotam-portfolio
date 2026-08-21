import type { MetadataRoute } from "next";

import { siteConfig, shouldAllowIndexing } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = shouldAllowIndexing();

  return allowIndexing
    ? {
        rules: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/private/"],
          },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
      }
    : {
        rules: [
          {
            userAgent: "*",
            disallow: "/",
          },
        ],
      };
}
