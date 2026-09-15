"use client";

/**
 * RESULTADO DEL DIAGNÓSTICO.
 *
 * El número gigante en verde es la prueba del sitio: el visitante ve su propia
 * estimación, no la de un cliente inventado. Debajo, la lista de procesos y el
 * plazo, en una línea.
 *
 * El número es una ESTIMACIÓN y el texto lo dice, dos veces y en dos lugares
 * distintos: debajo del número, donde se explica qué mide y qué no, y al pie
 * del bloque. Son las horas que hoy se van en hacer esos procesos a mano,
 * calculadas sobre promedios del rubro. No se promete recuperarlas: prometer
 * un ahorro sobre una estimación de seis preguntas sería inventar una métrica.
 *
 * Debajo del CTA está lo que el visitante se lleva si agenda. Antes el
 * recorrido terminaba en un botón sin decir qué había del otro lado.
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
        <p className="mt-4 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2">
          Puede ser que lo repetitivo ya esté resuelto, o que el proceso que más
          tiempo consume no esté en la lista. En los dos casos la reunión no
          tiene costo, y si no hay nada que convenga automatizar, te lo decimos
          ahí.
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
            Agendar diagnóstico
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

      {/* Qué es esto que se está mirando. Sin esta línea, el número grande
          parece un cálculo sobre la empresa del visitante, y no lo es: es lo
          que contestó, ordenado. */}
      <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-tinta">
        Con lo que marcaste identificamos qué procesos son candidatos a pasar a
        software y qué información hace falta para evaluarlos. No es una
        cotización ni un análisis de tu empresa: es el punto de partida de la
        reunión.
      </p>

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

      {/* Qué mide el número, dicho acá y no al pie: es donde se lo mira. */}
      <p className="mt-6 max-w-[52ch] text-[14px] leading-relaxed text-tinta-2">
        Es el tiempo que suele consumir hacer estos procesos a mano, sumado a lo
        largo de un año. No es un ahorro prometido ni un precio: es el tamaño
        aproximado del problema, para saber si vale la pena resolverlo.
      </p>

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

      {/* De dónde sale el número, dicho sin adornos. No hay un motor de
          evaluación detrás y el sitio no simula que lo haya: son los rangos
          que usamos como punto de partida para cada tipo de proceso. */}
      <p className="mt-4 max-w-[54ch] text-[13px] leading-relaxed text-tinta-2">
        Las horas salen de los rangos que usamos como punto de partida para cada
        tipo de proceso, no de datos de tu empresa. En la reunión se reemplazan
        por los que midan ustedes.
      </p>

      {/* Qué hay del otro lado del botón. Son las tres cosas que salen de la
          reunión, y las tres se sostienen sin haber hablado con nadie. */}
      <div className="hairline hairline-t mt-10 pt-6">
        <p className="kicker kicker-tinta">Qué sale de la reunión</p>
        <ul className="mt-4 max-w-[52ch]">
          {[
            "Esta misma lista revisada sobre el proceso real, no sobre promedios.",
            "Alcance, plazo y precio cerrados por escrito, o la respuesta de que no hay nada que automatizar.",
            "Una estimación del costo mensual de las APIs según el volumen de uso.",
          ].map((linea) => (
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
        <p className="mt-3 text-[13px] text-tinta-2">
          45 minutos, sin costo y sin compromiso.
        </p>
      </div>

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
