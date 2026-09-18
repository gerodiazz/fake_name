/**
 * MARCO DE SECCIÓN — estética de expediente.
 *
 * Toda sección del sitio se abre con una hairline superior y un kicker en
 * tinta con su número. Es el único elemento que se repite de punta
 * a punta y el que da la lectura de documento numerado.
 *
 * La capa gráfica se engancha acá: el número de expediente aparece además como
 * marca de agua arriba a la derecha, recortado por el borde de la sección, y
 * las marcas de imprenta se piden por prop porque van en dos o tres secciones,
 * nunca en todas.
 */

import type { ReactNode } from "react";
import {
  Forma,
  MarcaAgua,
  MarcasRegistro,
  TextoVertical,
} from "@/components/Decoracion";

type Props = {
  /** Ancla para la navegación interna. */
  id: string;
  /** Número de expediente. Lo asigna src/lib/secciones.ts. */
  numero: string;
  /** Nombre corto de la sección, en sentence case. */
  kicker: string;
  children: ReactNode;
  /** Baja el kicker a tinta secundaria cuando la sección no necesita peso. */
  kickerApagado?: boolean;
  /** Fondo de superficie en vez de papel, para separar bloques largos. */
  superficie?: boolean;
  /**
   * Secciones que respiran: más aire arriba del kicker. El ritmo del sitio
   * alterna secciones vacías con los dos bloques que aprietan.
   */
  aire?: boolean;
  /** Escuadras de registro en las esquinas superiores. */
  marcasRegistro?: boolean;
  /** Texto girado al margen izquierdo, tipo canto de pliego impreso. */
  textoVertical?: string;
  /**
   * Forma que sangra por un borde. Una por sección como máximo y solo en
   * tres secciones del sitio: el hero la monta por su cuenta.
   */
  forma?: "socios" | "servicios";
};

/** Ancho de lectura común a todo el sitio. */
export function Contenedor({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default function Seccion({
  id,
  numero,
  kicker,
  children,
  kickerApagado = false,
  superficie = false,
  aire = false,
  marcasRegistro = false,
  textoVertical,
  forma,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-kicker`}
      // linea-dibujada reemplaza al borde superior: la línea se traza de
      // izquierda a derecha al entrar en viewport, con scroll-driven
      // animations nativas. Donde no haya soporte, ya está dibujada.
      //
      // relative + overflow-clip son el marco de la capa gráfica: recortan la
      // marca de agua y las formas que sangran por los bordes. `clip` y no
      // `hidden` para no crear un contenedor de scroll dentro de la página.
      className={`linea-dibujada relative overflow-clip ${superficie ? "bg-superficie" : ""}`}
    >
      {/* Ornamento. Todo con aria-hidden desde cada componente. */}
      <MarcaAgua numero={numero} />
      {forma ? <Forma variante={forma} /> : null}
      {marcasRegistro ? <MarcasRegistro /> : null}
      {textoVertical ? <TextoVertical>{textoVertical}</TextoVertical> : null}

      {/* El contenido siempre por encima de la capa gráfica. */}
      <Contenedor className="relative z-10">
        {/* Cabecera del expediente: número · nombre de sección. */}
        <p
          id={`${id}-kicker`}
          className={`kicker ${kickerApagado ? "kicker-tinta" : ""} ${
            aire ? "pt-20 sm:pt-32" : "pt-10 sm:pt-14"
          }`}
        >
          {numero} · {kicker}
        </p>
        {children}
      </Contenedor>
    </section>
  );
}
