/**
 * Sitemap. Dos páginas: la home, que es el recorrido del cliente, y el
 * programa de referidos, que es su propio funnel. /d queda fuera a propósito:
 * son resultados de personas, no contenido del sitio.
 */

import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITIO.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // El programa de referidos es su propio funnel y su propia página.
    {
      url: `${SITIO.url}/referidos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
