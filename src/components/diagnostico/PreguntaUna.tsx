"use client";

/**
 * UNA PREGUNTA DEL RECORRIDO.
 *
 * Sin botones convencionales: las dos respuestas son texto.
 *   · el sí  → serif 21px, Klein, subrayado de 1.5px. Es el evento.
 *   · el no  → sans 13px, minúscula, tinta secundaria. Es pasar.
 *
 * La asimetría es deliberada. Al no haber caja ni borde, el estado :active
 * tiene que ser evidente: por eso el cambio de opacidad y el desplazamiento
 * de un pixel al presionar.
 */

import type { Pregunta } from "@/lib/diagnostico";

type Props = {
  pregunta: Pregunta;
  /** Posición dentro del recorrido, para el contador de expediente. */
  paso: number;
  /** Cantidad total de pasos del recorrido. */
  total: number;
  /** True mientras corre el tachado, después de contestar que sí. */
  tachada: boolean;
  /** True cuando la pregunta ya fue contestada y está por irse. */
  apagada: boolean;
  onSi: () => void;
  onNo: () => void;
};

export default function PreguntaUna({
  pregunta,
  paso,
  total,
  tachada,
  apagada,
  onSi,
  onNo,
}: Props) {
  return (
    <div className="anim-entrar">
      {/* Contador tipo expediente: en qué punto del recorrido estamos. */}
      <p className="kicker kicker-tinta">
        {String(paso).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      {/* La pregunta. El tachado se pinta sobre el span inline para que la
          línea cruce cada renglón cuando ocupa dos líneas. */}
      <h3
        className={`
          titular mt-4 max-w-[19ch] text-[clamp(1.6rem,7.2vw,2.75rem)]
          transition-colors duration-300
          ${apagada ? "text-tinta-2" : "text-tinta"}
        `}
      >
        <span className="tachado" data-tachado={tachada}>
          {pregunta.texto}
        </span>
      </h3>

      {/* Las respuestas. El sí arriba, solo, con aire. El no, abajo y chico. */}
      <div className="mt-7 flex flex-col items-start">
        <button
          type="button"
          onClick={onSi}
          disabled={apagada}
          className="
            inline-flex min-h-[44px] items-center font-serif text-[21px]
            leading-none text-klein underline decoration-[1.5px]
            underline-offset-[7px]
            transition-[opacity,transform] duration-100
            active:opacity-55
            disabled:opacity-40
          "
        >
          {pregunta.si}
        </button>

        <button
          type="button"
          onClick={onNo}
          disabled={apagada}
          className="
            mt-1 inline-flex min-h-[44px] items-center text-[13px] lowercase
            text-tinta-2
            transition-[opacity,transform] duration-100
            hover:text-tinta
            active:opacity-55
            disabled:opacity-40
          "
        >
          {pregunta.no}
        </button>
      </div>
    </div>
  );
}
