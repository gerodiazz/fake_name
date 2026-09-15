/**
 * IMÁGENES DE OPEN GRAPH
 *
 * Se dibujan con next/og (Satori), no con una imagen estática, porque la del
 * diagnóstico compartido tiene que llevar el número, el rubro y el nombre de
 * fakename de cada visitante.
 *
 * Satori no entiende clases de Tailwind ni woff2: por eso todo va con estilos
 * inline y las dos tipografías se leen en TTF desde src/fuentes.
 *
 * Regla de Satori a tener presente: todo elemento con más de un hijo necesita
 * display flex explícito.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Misma paleta del sitio, repetida acá porque Satori no lee el CSS. */
const PALETA = {
  papel: "#F2F0EB",
  tinta: "#1A1A18",
  tinta2: "#56544E",
  linea: "#DCD9D1",
  klein: "#002FA7",
  verde: "#1D5C4A",
};

export const TAMANIO_OG = { width: 1200, height: 630 };
export const TIPO_OG = "image/png";

/**
 * Lee las dos tipografías del repositorio.
 *
 * Formatos: Satori acepta TTF, OTF y WOFF, pero NO woff2 ni fuentes
 * variables. La variable de Inter hace explotar el renderizador, así que acá
 * va la estática en WOFF. Si algún día se cambia la tipografía, hay que
 * respetar esa restricción o la imagen deja de generarse.
 */
export async function cargarFuentes() {
  const carpeta = join(process.cwd(), "src", "fuentes");
  const [serif, sans] = await Promise.all([
    readFile(join(carpeta, "InstrumentSerif-Regular.ttf")),
    readFile(join(carpeta, "Inter-Regular.woff")),
  ]);

  return [
    {
      name: "Instrument Serif",
      data: serif,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: "Inter",
      data: sans,
      style: "normal" as const,
      weight: 400 as const,
    },
  ];
}

type Props = {
  /** Línea chica de arriba, en Klein. */
  kicker: string;
  /** El número grande, ya formateado. Vacío para la tarjeta genérica. */
  numero?: string;
  /** Qué es ese número. */
  epigrafe: string;
  /** Titular serif cuando no hay número. */
  titular?: string;
  /** Línea de pie, a la izquierda. */
  pie: string;
};

/**
 * La tarjeta. Misma gramática que el sitio: papel, hairlines, serif editorial
 * y el verde reservado para el número.
 */
export function TarjetaOG({ kicker, numero, epigrafe, titular, pie }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: PALETA.papel,
        padding: "64px 72px",
        fontFamily: "Inter",
      }}
    >
      {/* Kicker, con la misma caja alta y el mismo tracking del sitio. */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: PALETA.klein,
          }}
        >
          {kicker}
        </div>
      </div>

      {/* Cuerpo: o el número gigante, o un titular serif. */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {numero ? (
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 210,
              lineHeight: 0.85,
              letterSpacing: "-0.035em",
              color: PALETA.verde,
            }}
          >
            {numero}
          </div>
        ) : (
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: PALETA.tinta,
              maxWidth: 900,
            }}
          >
            {titular}
          </div>
        )}

        <div
          style={{
            marginTop: 28,
            fontFamily: "Instrument Serif",
            fontSize: 38,
            color: PALETA.tinta,
          }}
        >
          {epigrafe}
        </div>
      </div>

      {/* Pie, separado por un hairline. */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${PALETA.linea}`,
          paddingTop: 24,
        }}
      >
        <div style={{ fontSize: 24, color: PALETA.tinta2 }}>{pie}</div>
        <div style={{ fontSize: 24, color: PALETA.tinta2 }}>
          Alcance y plazo por escrito
        </div>
      </div>
    </div>
  );
}
