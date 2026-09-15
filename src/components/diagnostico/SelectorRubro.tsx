"use client";

/**
 * PASO 01 — "¿A qué se dedica tu empresa?"
 *
 * La primera pantalla del diagnóstico. Elegir un rubro ya no dispara el
 * recorrido: lo MARCA. Avanzar es una decisión aparte, con el botón de
 * continuar, y eso permite cambiar de opinión antes de arrancar y —sobre
 * todo— volver desde el paso 2 y encontrar la elección donde estaba.
 *
 * Grilla de dos columnas con hairlines expuestas. "Otro rubro" ocupa el ancho
 * completo porque cierra la lista impar de siete.
 *
 * El rubro elegido se marca con el tinte del acento y una regla de 2px a la
 * izquierda. Sin checkbox ni tilde: el estado se lee por el peso de la celda,
 * que es como se lee todo lo demás en este sitio. Para quien no distingue el
 * tinte, está `aria-pressed`.
 */

import { RUBROS } from "@/lib/diagnostico";

type Props = {
  /** Id del rubro marcado, o null si todavía no se eligió ninguno. */
  elegido: string | null;
  onElegir: (id: string) => void;
};

export default function SelectorRubro({ elegido, onElegir }: Props) {
  return (
    <div>
      <h3 className="titular text-[clamp(1.4rem,6vw,2.2rem)]">
        ¿A qué se dedica tu empresa?
      </h3>
      <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-tinta-2">
        El rubro define las tres primeras preguntas. Las otras tres son comunes
        a cualquier empresa.
      </p>

      <ul className="grilla-dos mt-8 grid grid-cols-2 hairline hairline-t hairline-b">
        {RUBROS.map((rubro) => {
          const marcado = elegido === rubro.id;

          return (
            <li
              key={rubro.id}
              // "Otro rubro" cierra la grilla impar ocupando las dos columnas.
              className={rubro.pideTextoLibre ? "col-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => onElegir(rubro.id)}
                aria-pressed={marcado}
                data-marcado={marcado}
                className="rubro group flex min-h-[76px] w-full items-center justify-between gap-3 px-4 py-4 text-left text-[15px] leading-snug sm:min-h-[92px] sm:px-6 sm:text-[17px]"
              >
                {rubro.nombre}
                {/* La punta de flecha aparece al apuntar y se queda en el
                    elegido: es la única señal que se mueve. */}
                <span
                  aria-hidden="true"
                  className={`text-acento transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                    marcado ? "opacity-100" : "opacity-0"
                  }`}
                >
                  →
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
