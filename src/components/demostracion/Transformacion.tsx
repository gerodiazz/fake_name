/**
 * LA TRANSFORMACIÓN — tres bloques y dos flechas.
 *
 * Es lo primero que se ve de la sección 02 y la explicación más corta del
 * sitio: el proceso de hoy, lo que se construye y lo que queda. Se entiende
 * sin leer una oración completa, que es exactamente para lo que está.
 *
 * El bloque de la izquierda tiene más piezas que los otros dos a propósito:
 * esa acumulación es el problema, y se ve antes de leerse.
 *
 * En desktop son tres columnas con flechas horizontales; abajo de lg se apila
 * y las flechas giran. El giro lo hace una clase de rotación, no un segundo
 * juego de marcado: la misma flecha, orientada según el eje del flujo.
 */

import { TRANSFORMACION } from "@/lib/agente";

type Bloque = {
  titulo: string;
  detalle: string;
  piezas: readonly string[];
};

function Columna({
  bloque,
  destacado = false,
}: {
  bloque: Bloque;
  destacado?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className={`kicker ${destacado ? "" : "kicker-tinta"}`}>
        {bloque.titulo}
      </p>
      <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-tinta">
        {bloque.detalle}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {bloque.piezas.map((pieza) => (
          <li key={pieza}>
            <span className={destacado ? "chip chip-acento" : "chip"}>
              {pieza}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** La flecha entre bloques. Apunta hacia abajo apilado, a la derecha en lg. */
function Flecha() {
  return (
    <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden="true">
      <span className="flecha rotate-90 lg:rotate-0">→</span>
    </div>
  );
}

export default function Transformacion() {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
      <Columna bloque={TRANSFORMACION.hoy} />
      <Flecha />
      <Columna bloque={TRANSFORMACION.software} destacado />
      <Flecha />
      <Columna bloque={TRANSFORMACION.resultado} />
    </div>
  );
}
