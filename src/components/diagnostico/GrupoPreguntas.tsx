"use client";

/**
 * UN GRUPO DE PREGUNTAS — pasos 02 y 03
 *
 * Las tres preguntas del rubro, o las tres comunes a cualquier empresa. Todas
 * a la vez dentro de su paso, nunca las de otro rubro.
 *
 * Reemplaza a los dos modos que convivían antes —una pregunta por pantalla y
 * una lista con todas— que eran dos implementaciones de la misma cosa con dos
 * comportamientos distintos. Queda una sola.
 *
 * El tachado se conserva: contestar que sí tacha la pregunta con una línea del
 * acento, y la ficha del agente cae en la pila de abajo. Es información, no
 * adorno, y es lo que hace que el recorrido se sienta una herramienta y no un
 * formulario.
 *
 * La asimetría de las dos respuestas también se conserva: el sí es el evento
 * —serif grande, subrayado— y el no es pasar.
 */

import type { Pregunta } from "@/lib/diagnostico";

type Props = {
  preguntas: Pregunta[];
  /** Respuestas ya dadas, por id de pregunta. */
  respuestas: Record<string, boolean>;
  onResponder: (pregunta: Pregunta, siONo: boolean) => void;
  /** Ids de las preguntas que faltan, señaladas al intentar continuar. */
  faltantes: string[];
};

export default function GrupoPreguntas({
  preguntas,
  respuestas,
  onResponder,
  faltantes,
}: Props) {
  return (
    <ul>
      {preguntas.map((pregunta) => {
        const contestada = respuestas[pregunta.id];
        const dijoQueSi = contestada === true;
        const falta = faltantes.includes(pregunta.id);

        return (
          <li
            key={pregunta.id}
            className="hairline hairline-t py-7"
            data-falta={falta}
          >
            <h4
              className={`titular max-w-[26ch] text-[clamp(1.25rem,5vw,1.7rem)] transition-colors duration-300 ${
                contestada !== undefined ? "text-tinta-2" : "text-tinta"
              }`}
            >
              <span className="tachado" data-tachado={dijoQueSi}>
                {pregunta.texto}
              </span>
            </h4>

            <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-1">
              <button
                type="button"
                onClick={() => onResponder(pregunta, true)}
                aria-pressed={dijoQueSi}
                className={`inline-flex min-h-[52px] items-center pr-2 font-serif text-[21px] leading-none text-acento underline decoration-[1.5px] underline-offset-[7px] transition-[opacity,transform] duration-100 active:opacity-55 ${
                  contestada === false ? "opacity-45" : ""
                }`}
              >
                {pregunta.si}
              </button>
              <button
                type="button"
                onClick={() => onResponder(pregunta, false)}
                aria-pressed={contestada === false}
                className={`inline-flex min-h-[52px] items-center pr-2 text-[14px] lowercase text-tinta-2 transition-[opacity,transform] duration-100 hover:text-tinta active:opacity-55 ${
                  dijoQueSi ? "opacity-45" : ""
                }`}
              >
                {pregunta.no}
              </button>

              {/* Al decir que sí, el oficio se nombra acá mismo. La ficha
                  completa igual cae en la pila de abajo. */}
              {dijoQueSi ? (
                <span className="anim-emerger text-[13px] text-tinta-2">
                  {pregunta.agente.nombre}
                </span>
              ) : null}
            </div>

            {falta ? (
              <p className="campo-error mt-2 text-[13px]" aria-live="polite">
                Falta contestar esta pregunta.
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
