/**
 * Sitemap. La home, que es el recorrido del cliente; el programa de referidos,
 * que es su propio funnel; y una página por caso real. /d queda fuera a
 * propósito: son resultados de personas, no contenido del sitio.
 *
 * Los casos salen del arreglo, no de una lista escrita a mano: cargar un caso
 * nuevo en src/lib/casos.ts lo agrega también acá.
 */

import type { MetadataRoute } from "next";
import { CASOS } from "@/lib/casos";
import { SITIO } from "@/lib/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITIO.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Un caso real es la prueba del sitio: pesa más que el resto de las
    // páginas de apoyo.
    ...CASOS.map((caso) => ({
      url: `${SITIO.url}/casos/${caso.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // El programa de referidos es su propio funnel y su propia página.
    {
      url: `${SITIO.url}/referidos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
