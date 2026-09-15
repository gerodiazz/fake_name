"use client";

/**
 * PASO 0 DEL DIAGNÓSTICO — "¿A qué se dedica la empresa?"
 *
 * Es la primera acción del sitio: va inmediatamente debajo del hero y ocupa el
 * lugar que en otros sitios tendría un botón de contacto.
 *
 * La pregunta es un h3: el h2 de la sección es el titular del diagnóstico, y
 * este paso desaparece al elegir el rubro.
 *
 * Grilla de dos columnas con hairlines expuestas. "Otro rubro" ocupa el ancho
 * completo porque cierra la lista impar de siete.
 */

import { RUBROS } from "@/lib/diagnostico";
import { SITIO } from "@/lib/sitio";

type Props = {
  /** Se dispara con el id del rubro elegido. */
  onElegir: (id: string) => void;
};

export default function SelectorRubro({ onElegir }: Props) {
  return (
    <div>
      {/* El rótulo de la herramienta. El diagnóstico es un producto de la
          casa, no un formulario prestado, y dice de quién es. */}
      <p className="kicker kicker-tinta">
        {SITIO.marcaCorta} · Diagnóstico de procesos
      </p>
      <h3 className="titular mt-5 text-[clamp(1.4rem,6vw,2.2rem)]">
        ¿A qué se dedica la empresa?
      </h3>
      <p className="mt-3 max-w-[48ch] text-[15px] text-tinta-2">
        El rubro define las tres primeras preguntas. Las otras tres son comunes
        a cualquier empresa. No se piden datos de contacto.
      </p>

      {/* Grilla expuesta. Las líneas interiores son bordes de 0.5px puestos
          por .grilla-dos, que se encarga de que ninguna celda duplique el
          hairline de su vecina. */}
      <ul className="grilla-dos mt-8 grid grid-cols-2 hairline hairline-t hairline-b">
        {RUBROS.map((rubro) => (
          <li
            key={rubro.id}
            className={`${
              // "Otro rubro" cierra la grilla impar ocupando las dos columnas.
              rubro.pideTextoLibre ? "col-span-2" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => onElegir(rubro.id)}
              className="
                group flex min-h-[76px] w-full items-center justify-between
                gap-3 px-4 py-4 text-left text-[15px] leading-snug text-tinta
                transition-colors duration-150
                hover:bg-acento-tinte active:bg-acento-tinte
                sm:min-h-[88px] sm:px-6 sm:text-[17px]
              "
            >
              {rubro.nombre}
              {/* Punta de flecha discreta: aparece al enfocar o apuntar. */}
              <span
                aria-hidden="true"
                className="text-acento opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
