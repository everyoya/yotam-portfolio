import type { MetadataRoute } from "next";

import { siteConfig, shouldAllowIndexing } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!shouldAllowIndexing()) {
    return [];
  }

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
