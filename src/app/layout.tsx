/**
 * LAYOUT RAÍZ
 *
 * Carga las dos únicas tipografías del sitio con next/font (self-hosted, sin
 * pedido a Google en runtime), arma la metadata y los datos estructurados, y
 * envuelve todo con el proveedor del diagnóstico para que el resultado llegue
 * al formulario del footer.
 */

import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ProveedorDiagnostico } from "@/lib/estado-diagnostico";
import { ProveedorBarrido } from "@/components/BarridoKlein";
import Grain from "@/components/Grain";
import { SITIO, SOCIOS } from "@/lib/sitio";

/** Sans neutra para cuerpo e interfaz. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--fuente-sans",
  display: "swap",
});

/** Serif editorial para titulares y números grandes. Solo peso regular. */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--fuente-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: SITIO.titulo,
    template: `%s · ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  keywords: [
    "automatización de procesos",
    "agentes de IA para empresas",
    "automatización para PyMEs",
    "integración con sistemas existentes",
  ],
  authors: [{ name: SITIO.nombre }],
  // Open Graph lleva el mismo title y la misma description que la página.
  openGraph: {
    type: "website",
    locale: "es",
    url: SITIO.url,
    siteName: SITIO.nombre,
    title: SITIO.titulo,
    description: SITIO.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: SITIO.titulo,
    description: SITIO.descripcion,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  // El color de la barra del navegador acompaña al papel del sitio.
  themeColor: "#F2F0EB",
};

/**
 * Datos estructurados de organización, para búsqueda. Sin métricas inventadas.
 *
 * Los founders salen de SOCIOS, que hoy está vacío: mientras no haya nombres
 * reales la clave no se declara, porque un founders vacío es peor que ninguno.
 * Al cargarlos en src/lib/sitio.ts, esto queda correcto sin tocar nada más.
 *
 * El FAQPage no va aquí: lo declara la sección de preguntas, donde viven.
 */
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITIO.nombre,
  url: SITIO.url,
  description: SITIO.descripcion,
  email: SITIO.email,
  knowsLanguage: "es",
  ...(SOCIOS.length > 0
    ? {
        founders: SOCIOS.map((socio) => ({
          "@type": "Person",
          name: socio.nombre,
          description: socio.trayectoria,
        })),
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-dvh bg-papel text-tinta antialiased">
        {/* Salto directo al contenido, para navegación por teclado. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-klein focus:px-4 focus:py-3 focus:text-superficie"
        >
          Ir al contenido
        </a>

        {/* El barrido Klein envuelve todo: la cortina tiene que poder tapar
            la pantalla entera, no solo una sección. */}
        <ProveedorBarrido>
          <ProveedorDiagnostico>{children}</ProveedorDiagnostico>
        </ProveedorBarrido>

        {/* El grano va último y por encima de todo, cortina incluida. */}
        <Grain />

        <script
          type="application/ld+json"
          // Contenido propio y estático: no hay entrada de usuario acá.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(datosEstructurados),
          }}
        />
      </body>
    </html>
  );
}
