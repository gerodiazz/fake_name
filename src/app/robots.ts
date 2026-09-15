/** robots.txt. /d queda fuera del índice: son resultados de personas. */

import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/sitio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/d", "/api/"],
    },
    sitemap: `${SITIO.url}/sitemap.xml`,
  };
}
