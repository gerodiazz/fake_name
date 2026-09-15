"use client";

/**
 * RESULTADO DEL DIAGNÓSTICO.
 *
 * El número gigante en verde es la prueba del sitio: el visitante ve su propia
 * estimación, no la de un cliente inventado. Debajo, la lista de procesos y el
 * plazo, en una línea.
 *
 * El número es una ESTIMACIÓN y el texto lo dice: horas involucradas en esos
 * procesos, calculadas sobre promedios del rubro. No se promete recuperarlas.
 */

import NumeroGigante from "@/components/NumeroGigante";
import { BandaKlein } from "@/components/Decoracion";
import PilaAgentes from "@/components/diagnostico/PilaAgentes";
import EngancheReferidos from "@/components/diagnostico/EngancheReferidos";
import type { Agente } from "@/lib/diagnostico";

type Props = {
  agentes: Agente[];
  horasAnuales: number;
  semanas: number;
  rubroNombre: string;
  rubroId: string;
  codigo: string;
  /** Vuelve al paso 0 y limpia las respuestas. */
  onRehacer: () => void;
};

export default function Resultado({
  agentes,
  horasAnuales,
  semanas,
  rubroNombre,
  rubroId,
  codigo,
  onRehacer,
}: Props) {
  // Nadie marcó nada: no hay número que mostrar, pero sí una salida digna.
  if (agentes.length === 0) {
    return (
      <div className="anim-emerger py-4">
        <p className="kicker kicker-tinta">Resultado</p>
        <h3 className="titular mt-4 max-w-[20ch] text-[clamp(1.6rem,7vw,2.6rem)]">
          No se marcó ningún proceso.
        </h3>
        <p className="mt-4 max-w-[48ch] text-[15px] text-tinta-2">
          Puede ser que lo repetitivo ya esté resuelto, o que el proceso que más
          tiempo consume no esté en la lista. En los dos casos, la reunión de
          diagnóstico no tiene costo.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="#contacto"
            className="
              inline-flex min-h-[52px] items-center bg-klein px-7 text-[15px]
              text-superficie transition-opacity duration-100
              hover:opacity-90 active:opacity-75
            "
          >
            Agenda una reunión
          </a>
          <button
            type="button"
            onClick={onRehacer}
            className="min-h-[44px] text-[13px] lowercase text-tinta-2 transition-opacity duration-100 hover:text-tinta active:opacity-55"
          >
            rehacer el diagnóstico
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="anim-emerger py-4">
      <p className="kicker kicker-tinta">Resultado</p>

      {/* El número, sobre la primera de las dos bandas Klein del sitio: ancho
          de viewport, papel sobre azul y tramado risográfico al costado. Es uno
          de los dos momentos en que el recorrido aprieta. */}
      <BandaKlein className="mt-8">
        <NumeroGigante
          valor={horasAnuales}
          animado
          tono="papel"
          etiqueta={`${horasAnuales.toLocaleString("es")} horas anuales involucradas en estos procesos`}
        />
        <p className="mt-6 max-w-[26ch] font-serif text-[19px] leading-snug text-klein-tinte sm:text-[21px]">
          horas anuales involucradas en estos procesos.
        </p>
      </BandaKlein>

      {/* La lista de procesos queda a la vista: es el alcance del trabajo. */}
      <div className="mt-10">
        <p className="kicker kicker-tinta">
          Procesos · {String(agentes.length).padStart(2, "0")}
        </p>
        {/* La misma pila del recorrido: la última contratada arriba. Acá caen
            todas juntas, escalonadas, porque el bloque se pinta de una vez. */}
        <PilaAgentes
          pila={[...agentes]
            .map((agente, i) => ({ agente, orden: i + 1 }))
            .reverse()}
          caenTodas
        />
      </div>

      {/* El detalle, en una línea: cuántos procesos y en cuánto tiempo. Va
          entre hairlines para que se lea como el dato de cierre del bloque. */}
      <p className="hairline hairline-t hairline-b mt-10 max-w-[46ch] py-5 font-serif text-[19px] leading-snug tabular-nums sm:text-[21px]">
        {agentes.length} {agentes.length === 1 ? "proceso" : "procesos"} ·
        implementación estimada en {semanas} semanas
      </p>

      {/* El botón Klein: agendar la reunión. */}
      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <a
          href="#contacto"
          className="
            inline-flex min-h-[52px] items-center bg-klein px-7 text-[15px]
            text-superficie transition-opacity duration-100
            hover:opacity-90 active:opacity-75
          "
        >
          Agenda una reunión
        </a>
        <button
          type="button"
          onClick={onRehacer}
          className="min-h-[44px] text-[13px] lowercase text-tinta-2 transition-opacity duration-100 hover:text-tinta active:opacity-55"
        >
          rehacer el diagnóstico
        </button>
      </div>

      <p className="mt-4 max-w-[52ch] text-[13px] text-tinta-2">
        Estimación sobre promedios del rubro. En la reunión se ajusta con datos
        reales.
      </p>

      {/* Enganche de referidos, dentro del mismo bloque. */}
      <EngancheReferidos
        horas={horasAnuales}
        rubro={rubroNombre}
        rubroId={rubroId}
        procesos={agentes.length}
        codigo={codigo}
      />
    </div>
  );
}
