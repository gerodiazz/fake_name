"use client";

/**
 * MODO LISTA — "ver todas las preguntas".
 *
 * Alternativa para quien no quiere el recorrido de a una. Mismas preguntas,
 * mismas respuestas tipográficas, todas a la vez. El tachado sigue marcando
 * lo contestado: es información, no adorno.
 */

import type { Pregunta } from "@/lib/diagnostico";

type Props = {
  preguntas: Pregunta[];
  /** Respuestas ya dadas, por id de pregunta. */
  respuestas: Record<string, boolean>;
  onResponder: (pregunta: Pregunta, siONo: boolean) => void;
  /** Cierra la lista y muestra el resultado. */
  onTerminar: () => void;
  /** Vuelve al recorrido de a una. */
  onVolverAlRecorrido: () => void;
};

export default function ListaPreguntas({
  preguntas,
  respuestas,
  onResponder,
  onTerminar,
  onVolverAlRecorrido,
}: Props) {
  // Cuántas quedan sin contestar: decide el texto del cierre.
  const sinContestar = preguntas.filter(
    (p) => respuestas[p.id] === undefined,
  ).length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="kicker kicker-tinta">Todas las preguntas</p>
        <button
          type="button"
          onClick={onVolverAlRecorrido}
          className="boton boton-texto"
        >
          volver al recorrido
        </button>
      </div>

      <ul className="mt-2">
        {preguntas.map((pregunta) => {
          const contestada = respuestas[pregunta.id];
          const dijoQueSi = contestada === true;

          return (
            <li key={pregunta.id} className="hairline hairline-t py-6">
              <h3
                className={`
                  titular max-w-[24ch] text-[clamp(1.25rem,5vw,1.6rem)]
                  transition-colors duration-300
                  ${contestada !== undefined ? "text-tinta-2" : "text-tinta"}
                `}
              >
                <span className="tachado" data-tachado={dijoQueSi}>
                  {pregunta.texto}
                </span>
              </h3>

              {/* En modo lista las dos respuestas conviven en una línea, pero
                  conservan la misma jerarquía asimétrica del recorrido. */}
              <div className="mt-2 flex flex-wrap items-center gap-x-6">
                <button
                  type="button"
                  onClick={() => onResponder(pregunta, true)}
                  aria-pressed={dijoQueSi}
                  className={`
                    inline-flex min-h-[44px] items-center font-serif text-[21px]
                    leading-none text-klein underline decoration-[1.5px]
                    underline-offset-[7px]
                    transition-[opacity,transform] duration-100
                    active:opacity-55
                    ${contestada === false ? "opacity-45" : ""}
                  `}
                >
                  {pregunta.si}
                </button>
                <button
                  type="button"
                  onClick={() => onResponder(pregunta, false)}
                  aria-pressed={contestada === false}
                  className={`
                    inline-flex min-h-[44px] items-center text-[13px] lowercase
                    text-tinta-2
                    transition-[opacity,transform] duration-100
                    hover:text-tinta active:opacity-55
                    ${dijoQueSi ? "opacity-45" : ""}
                  `}
                >
                  {pregunta.no}
                </button>

                {/* Al decir que sí, el agente se nombra acá mismo: la ficha
                    completa igual se acumula abajo. */}
                {dijoQueSi ? (
                  <span className="anim-emerger text-[13px] text-tinta-2">
                    {pregunta.agente.nombre}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hairline hairline-t pt-6">
        <button
          type="button"
          onClick={onTerminar}
          className="
            inline-flex min-h-[44px] items-center font-serif text-[21px]
            leading-none text-klein underline decoration-[1.5px]
            underline-offset-[7px]
            transition-[opacity,transform] duration-100
            active:opacity-55
          "
        >
          Ver el resultado
        </button>
        {sinContestar > 0 ? (
          <p className="mt-1 text-[13px] text-tinta-2">
            {sinContestar === 1
              ? "Queda 1 pregunta sin contestar. Cuenta como un no."
              : `Quedan ${sinContestar} preguntas sin contestar. Cuentan como un no.`}
          </p>
        ) : null}
      </div>
    </div>
  );
}
