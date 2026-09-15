/**
 * QUÉ ES UN AGENTE — primer bloque de la sección 02.
 *
 * El sitio usaba la palabra "agente" en el hero, en el diagnóstico y en el
 * pie, y no la definía en ningún lado. Quien no trabaja en software se queda
 * con una idea vaga, y una idea vaga no se compra.
 *
 * Las tres columnas son el corazón del bloque, de menos a más: responder,
 * ejecutar reglas, resolver. La diferencia se ve en la cantidad de eslabones
 * —uno, dos, seis— sin que haya que explicarla, y el recorrido completo se
 * cuenta una sola vez, en el ejemplo de abajo.
 *
 * Las dos primeras columnas NO están para quedar mal. Que digamos cuándo
 * conviene una regla fija es parte del argumento: no vendemos agentes para
 * todo.
 */

import { CIERRE_COMPARACION, COMPARACION, DEFINICION } from "@/lib/agente";

export default function QueEsUnAgente() {
  return (
    <div>
      <h3 className="titular max-w-[20ch] text-[clamp(1.5rem,6vw,2.4rem)]">
        Qué es un agente, sin vueltas
      </h3>

      {/* La definición, sola y en serif: es la frase que hay que entender. */}
      <p className="mt-6 max-w-[54ch] font-serif text-[19px] leading-snug sm:text-[21px]">
        {DEFINICION}
      </p>

      {/* Las tres categorías, de menos a más. La diferencia está en la
          cantidad de eslabones y no hace falta explicarla. */}
      <div className="grilla-expuesta grilla-expuesta-sm mt-10 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-3">
        {COMPARACION.map((columna, i) => {
          // La tercera es la que estamos explicando: lleva el Klein.
          const esAgente = i === COMPARACION.length - 1;

          return (
            <div key={columna.titulo} className="py-6 sm:px-5">
              <h4
                className={`font-serif text-[21px] leading-tight ${esAgente ? "text-klein" : ""}`}
              >
                {columna.titulo}
              </h4>
              <p className="mt-1 max-w-[30ch] text-[14px] leading-relaxed text-tinta">
                {columna.resumen}
              </p>

              <ul className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                {columna.cadena.map((eslabon, j) => (
                  <li key={eslabon} className="flex items-center gap-1.5">
                    <span
                      className={esAgente ? "chip chip-klein" : "chip chip-superficie"}
                    >
                      {eslabon}
                    </span>
                    {j < columna.cadena.length - 1 ? (
                      <span className="flecha" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-6 max-w-[58ch] text-[14px] leading-relaxed text-tinta-2">
        {CIERRE_COMPARACION}
      </p>
    </div>
  );
}
