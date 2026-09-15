/**
 * IMÁGENES DE OPEN GRAPH
 *
 * Se dibujan con next/og (Satori), no con una imagen estática, porque la del
 * diagnóstico compartido tiene que llevar el número y el rubro de cada
 * visitante, más la marca.
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
  papel: "#F3F2EF",
  tinta: "#121213",
  tinta2: "#59595A",
  linea: "#DCDBD6",
  acento: "#6F5930",
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
    readFile(join(carpeta, "Newsreader-Regular.ttf")),
    readFile(join(carpeta, "Inter-Regular.woff")),
  ]);

  return [
    {
      name: "Newsreader",
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
  /** Línea chica de arriba, en acento. */
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
 * y el acento reservado para el número.
 *
 * Arriba a la derecha va el monograma TJ, dibujado con divs porque Satori no
 * renderiza SVG con paths: la barra y el asta son dos rectángulos, y el gancho
 * de la J es un borde con radio en una sola esquina. Es la misma geometría del
 * monograma de la web.
 */
function MonogramaOG() {
  return (
    <div style={{ display: "flex", position: "relative", width: 56, height: 56 }}>
      {/* La barra compartida. */}
      <div
        style={{
          position: "absolute",
          left: 4,
          top: 12,
          width: 48,
          height: 5,
          backgroundColor: PALETA.tinta,
        }}
      />
      {/* El asta de la T. */}
      <div
        style={{
          position: "absolute",
          left: 15,
          top: 12,
          width: 5,
          height: 32,
          backgroundColor: PALETA.tinta,
        }}
      />
      {/* El asta de la J y su gancho.
          La curva es la esquina donde se encuentran el borde derecho —el
          asta— y el borde inferior —el gancho—, o sea la de abajo a la
          derecha. Redondear la de abajo a la izquierda, que fue el primer
          intento, dibuja una L al revés y el monograma se lee "TT". */}
      <div
        style={{
          position: "absolute",
          left: 22,
          top: 12,
          width: 20,
          height: 30,
          borderRight: `5px solid ${PALETA.tinta}`,
          borderBottom: `5px solid ${PALETA.tinta}`,
          borderBottomRightRadius: 15,
        }}
      />
    </div>
  );
}
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
      {/* Kicker a la izquierda, monograma a la derecha. */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: PALETA.tinta,
          }}
        >
          {kicker}
        </div>
        <MonogramaOG />
      </div>

      {/* Cuerpo: o el número gigante, o un titular serif. */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {numero ? (
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 210,
              lineHeight: 0.85,
              letterSpacing: "-0.035em",
              color: PALETA.acento,
            }}
          >
            {numero}
          </div>
        ) : (
          <div
            style={{
              fontFamily: "Newsreader",
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
            fontFamily: "Newsreader",
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
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: PALETA.tinta2,
          }}
        >
          Telesca Justel
        </div>
      </div>
    </div>
  );
}
