/**
 * QUÉ ES UN AGENTE — primer bloque de la sección 02.
 *
 * El sitio usaba la palabra "agente" en el hero, en el diagnóstico y en el
 * pie, y no la definía en ningún lado. Quien no trabaja en software se queda
 * con una idea vaga, y una idea vaga no se compra.
 *
 * La comparación de dos columnas es el corazón del bloque: a la izquierda la
 * automatización simple, que casi cualquier empresa ya conoce; a la derecha el
 * recorrido completo. La diferencia se ve en la cantidad de pasos, sin que
 * haya que explicarla.
 *
 * La columna de la izquierda NO está para quedar mal. Que digamos cuándo
 * conviene una regla fija —más barata, más rápida, más fácil de mantener— es
 * parte del argumento: no vendemos agentes para todo.
 */

import { COMPARACION, DEFINICION, NO_ES } from "@/lib/agente";

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

      {/* Las dos columnas. En mobile se apilan y la de la derecha queda
          segunda, que es el orden en que se explica. */}
      <div className="grilla-expuesta grilla-expuesta-sm mt-12 grid grid-cols-1 hairline hairline-t hairline-b lg:grid-cols-2">
        {COMPARACION.map((columna, i) => {
          // La segunda columna es la que estamos explicando: lleva el Klein.
          const esAgente = i === 1;

          return (
            <div key={columna.titulo} className="py-8 lg:px-6">
              <p className={`kicker ${esAgente ? "" : "kicker-tinta"}`}>
                {esAgente ? "Lo que construimos" : "Lo que ya se conoce"}
              </p>
              <h3 className="mt-3 font-serif text-[23px] leading-tight sm:text-[26px]">
                {columna.titulo}
              </h3>
              <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-tinta">
                {columna.resumen}
              </p>

              <ol className="mt-6 max-w-[44ch]">
                {columna.pasos.map((paso, j) => (
                  <li
                    key={paso}
                    className="flex gap-3 py-1.5 text-[14px] leading-relaxed text-tinta-2"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[11px] tabular-nums tracking-[0.14em]"
                    >
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{paso}</span>
                  </li>
                ))}
              </ol>

              <p className="hairline hairline-t mt-6 max-w-[44ch] pt-4 text-[13px] leading-relaxed text-tinta-2">
                <span className="kicker kicker-tinta">Cuándo conviene · </span>
                {columna.cuandoConviene}
              </p>
            </div>
          );
        })}
      </div>

      {/* Lo que un agente no es. Va explícito porque son las tres cosas que la
          palabra sugiere y que no vendemos. */}
      <div className="mt-10">
        <p className="kicker kicker-tinta">Lo que no es</p>
        <ul className="mt-4 max-w-[56ch]">
          {NO_ES.map((linea) => (
            <li
              key={linea}
              className="flex gap-3 py-1.5 text-[14px] leading-relaxed text-tinta-2"
            >
              <span aria-hidden="true" className="select-none">
                ·
              </span>
              <span>{linea}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
