"use client";

/**
 * BARRA INFERIOR DEL DIAGNÓSTICO
 *
 * Aparece apenas se marca el primer proceso y acompaña el resto del recorrido:
 * mientras se contesta, abajo se ven las horas anuales que suman los procesos
 * marcados. Entra deslizando hacia arriba y el número de adentro rueda con el
 * mismo efecto odómetro del número gigante, cada vez que cambia.
 *
 * Se va sola cuando el diagnóstico termina: a partir de ahí el número vive en
 * el resultado, mucho más grande, y dos números compitiendo sería ruido.
 *
 * No es un chatbot flotante ni una barra de cookies: es el marcador del
 * proceso que el visitante está haciendo, y desaparece cuando ese proceso
 * termina.
 */

import Odometro from "@/components/Odometro";
import { SEMANAS_POR_ANIO, type Agente } from "@/lib/diagnostico";

type Props = {
  agentes: Agente[];
};

export default function BarraInferior({ agentes }: Props) {
  if (agentes.length === 0) return null;

  const horasSemanales = agentes.reduce((t, a) => t + a.horasSemanales, 0);
  const horasAnuales = horasSemanales * SEMANAS_POR_ANIO;

  return (
    <div className="barra-inferior fixed inset-x-0 bottom-0 z-40 hairline hairline-t bg-superficie">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <p className="flex items-baseline gap-2">
          {/* Para lectores de pantalla, el número dicho de una vez. */}
          <span className="sr-only">
            {horasAnuales.toLocaleString("es")} horas al año en estos procesos
          </span>
          {/* El mismo odómetro del número gigante, en cuerpo chico: cada vez
              que se marca un proceso, ruedan solo los dígitos que cambian. */}
          <span
            aria-hidden="true"
            className="font-serif text-[21px] leading-none text-acento"
            style={{ ["--odo-alto" as string]: "1em" }}
          >
            <Odometro texto={horasAnuales.toLocaleString("es")} />
          </span>
          <span aria-hidden="true" className="text-[13px] text-tinta-2">
            h/año en estos procesos
          </span>
        </p>

        {/* La salida a la sección 07, siempre a mano mientras se contesta. */}
        <a
          href="#contacto"
          className="shrink-0 inline-flex min-h-[44px] items-center text-[13px] text-acento transition-opacity duration-100 hover:opacity-80 active:opacity-55"
        >
          Agenda
        </a>
      </div>
    </div>
  );
}
