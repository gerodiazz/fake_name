/**
 * LA TRANSFORMACIÓN — dos renglones y una flecha.
 *
 * Antes eran tres columnas con texto explicativo en cada una. Ahora son dos
 * cadenas de eslabones, una arriba de la otra: el recorrido de hoy y el que
 * queda. Se entiende de un vistazo, que es exactamente para lo que está.
 *
 * La cadena de arriba es más larga a propósito: esos seis saltos entre
 * personas y aplicaciones son el problema, y se ven antes de leerse. La de
 * abajo va en acento porque es lo que se construye.
 *
 * Los eslabones envuelven solos en un teléfono —son chips en una lista con
 * separadores, no un diagrama de ancho fijo—, así que no hay una versión
 * distinta para mobile ni scroll horizontal.
 */

import { TRANSFORMACION, type Fila } from "@/lib/agente";

function Cadena({ fila, destacada = false }: { fila: Fila; destacada?: boolean }) {
  return (
    <div>
      <p className={`kicker ${destacada ? "" : "kicker-tinta"}`}>
        {fila.titulo}
      </p>
      <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
        {fila.piezas.map((pieza, i) => (
          <li key={pieza + i} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="text-[13px] text-tinta-2">
                →
              </span>
            ) : null}
            <span className={destacada ? "chip chip-acento" : "chip"}>
              {pieza}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Transformacion() {
  return (
    <div>
      <Cadena fila={TRANSFORMACION.antes} />

      <div className="flex py-5" aria-hidden="true">
        <span className="flecha rotate-90">→</span>
      </div>

      <Cadena fila={TRANSFORMACION.ahora} destacada />
    </div>
  );
}
