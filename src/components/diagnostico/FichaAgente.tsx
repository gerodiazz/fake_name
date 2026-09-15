"use client";

/**
 * FICHA DEL AGENTE.
 *
 * Emerge cuando el visitante contesta que sí. Las fichas se apilan: la última
 * contratada queda arriba y las anteriores ceden lugar hacia abajo, de a una.
 *
 * APOYO 3 DEL SISTEMA DE MOVIMIENTO — caen sobre la mesa.
 * Overshoot corto, una rotación mínima y propia de cada ficha, y una sombra
 * que se asienta en 200 ms. Es la única sombra del sitio: existe para que la
 * ficha se lea como un objeto y no como un div.
 *
 * La rotación sale de un hash del id del agente, no de Math.random. Con random
 * cambiaría en cada render y no coincidiría entre servidor y cliente.
 *
 * Las horas de acá son el COSTO actual del proceso hecho a mano, no horas
 * recuperadas, así que van en tinta. El verde queda reservado para el número
 * gigante del resultado.
 */

import type { Agente } from "@/lib/diagnostico";

type Props = {
  agente: Agente;
  /** Orden de contratación, para numerar la ficha. */
  orden: number;
  /** True para la ficha que acaba de caer. Al resto lo mueve la pila. */
  recienCaida: boolean;
  /** Retrasa la caída de a 40 ms, cuando caen varias juntas. */
  escalon?: number;
  /** La pila necesita el nodo para correr las fichas que ya estaban. */
  refNodo?: (nodo: HTMLLIElement | null) => void;
};

/**
 * Rotación estable a partir del id: un hash chico llevado al rango ±0.6°.
 * Determinista, así que el servidor y el cliente dibujan lo mismo.
 *
 * La exporta también la pila, que necesita la misma rotación para que la ficha
 * no se enderece mientras cede lugar.
 */
export function rotacionDe(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1201;
  }
  // 0..1200 → -0.6..0.6
  return Math.round((hash / 1000 - 0.6) * 100) / 100;
}

export default function FichaAgente({
  agente,
  orden,
  recienCaida,
  escalon = 0,
  refNodo,
}: Props) {
  const rotacion = rotacionDe(agente.id);

  return (
    <li
      ref={refNodo}
      // La que acaba de caer trae su animación por CSS. Las que ya estaban las
      // mueve la pila con la Web Animations API, porque hay que poder repetir
      // el movimiento cada vez que cambian de posición y una animación CSS ya
      // consumida no se vuelve a disparar sola.
      className={`ficha ${recienCaida ? "ficha-agente" : ""} hairline hairline-t bg-superficie px-4 py-4`}
      style={{
        ["--ficha-rot" as string]: `${rotacion}deg`,
        ["--ficha-i" as string]: String(escalon),
        // Sin la animación de caída, la ficha igual conserva su inclinación.
        transform: recienCaida ? undefined : `rotate(${rotacion}deg)`,
      }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          {/* Número de ficha, alineado como en un listado de expediente. */}
          <span className="kicker kicker-tinta tabular-nums">
            {String(orden).padStart(2, "0")}
          </span>
          <h4 className="font-serif text-[19px] leading-tight text-tinta sm:text-[21px]">
            {agente.nombre}
          </h4>
        </div>
        {/* El costo semanal del proceso, en tabular para que las cifras
            queden alineadas entre fichas. */}
        <span className="shrink-0 text-[13px] tabular-nums text-tinta-2">
          {agente.horasSemanales} h/semana
        </span>
      </div>
      <p className="mt-1.5 max-w-[56ch] text-[14px] leading-relaxed text-tinta-2 sm:pl-[calc(2ch+0.75rem)]">
        {agente.descripcion}
      </p>
    </li>
  );
}
