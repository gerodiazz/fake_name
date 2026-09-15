"use client";

/**
 * NÚMERO GIGANTE — componente único, reutilizado dos veces en el sitio:
 *   · sección 02, horas recuperadas por año
 *   · sección 04, dólares ganados por referidos
 *
 * La simetría entre esos dos bloques es deliberada y depende de que sea
 * literalmente el mismo componente. No duplicar.
 *
 * El movimiento de los dígitos vive en <Odometro>, que también usa la barra
 * inferior del diagnóstico. Acá solo se define el cuerpo, el color y el salto
 * del cruce de escalón.
 */

import { useEffect, useState } from "react";
import Odometro from "@/components/Odometro";
import { prefiereMenosMovimiento } from "@/lib/movimiento";

type Props = {
  /** Valor final a mostrar. */
  valor: number;
  /** Si es true, los dígitos entran escalonados la primera vez. */
  animado?: boolean;
  /** Texto pegado adelante del número, por ejemplo "USD ". */
  prefijo?: string;
  /** Texto pegado atrás del número. */
  sufijo?: string;
  /**
   * Cambiar este número dispara el salto del número (sube y vuelve).
   * Se usa al cruzar un escalón de bonos en la sección 04.
   */
  impulso?: number;
  /** Etiqueta leída por lectores de pantalla en lugar del número animado. */
  etiqueta: string;
  /**
   * Color del número. En papel cuando el número vive sobre una banda acento a
   * sangre completa; en verde cuando va sobre el papel del sitio.
   */
  tono?: "verde" | "papel";
};

/**
 * Alto de la ventana de cada dígito, en em.
 *
 * El titular usa un interlineado de 0.82, pero una ventana de ese alto
 * recortaría los dígitos: la caja del glifo es más alta que la caja de línea.
 * 1em contiene las cifras de Instrument Serif sin cortarlas, y el alto visual
 * se recupera con el margen negativo de abajo.
 */
const ALTO_DIGITO = "1em";

export default function NumeroGigante({
  valor,
  animado = false,
  prefijo,
  sufijo,
  impulso,
  etiqueta,
  tono = "verde",
}: Props) {
  const [saltando, setSaltando] = useState(false);

  // El salto: se enciende al cambiar el impulso y se apaga solo.
  useEffect(() => {
    if (impulso === undefined || impulso === 0) return;
    if (prefiereMenosMovimiento()) return;
    setSaltando(true);
    const id = window.setTimeout(() => setSaltando(false), 520);
    return () => window.clearTimeout(id);
  }, [impulso]);

  const texto = `${prefijo ?? ""}${valor.toLocaleString("es")}${sufijo ?? ""}`;

  return (
    <span className="block">
      {/* El valor real, para lectores de pantalla: la columna de dígitos es
          ruido si se lee carácter por carácter. */}
      <span className="sr-only">{etiqueta}</span>

      <span
        aria-hidden="true"
        className={`numero-gigante block ${
          tono === "papel" ? "numero-papel" : "text-acento"
        } ${saltando ? "anim-saltar" : ""}`}
        style={{
          ["--odo-alto" as string]: ALTO_DIGITO,
          // Se compensa el alto extra de las ventanas para que el bloque
          // conserve el peso visual del interlineado de 0.82.
          marginBottom: "-0.18em",
        }}
      >
        <Odometro texto={texto} animado={animado} />
      </span>
    </span>
  );
}
