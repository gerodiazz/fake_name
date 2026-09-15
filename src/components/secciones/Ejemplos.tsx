/**
 * SECCIÓN 04 — EJEMPLOS POR INDUSTRIA
 *
 * Contesta la pregunta que el visitante se hace después de entender qué es un
 * agente: "¿qué podrían automatizar en una empresa como la mía?".
 *
 * Cada ejemplo cuenta un proceso concreto con las mismas seis etapas de la
 * sección 02. Que el esqueleto se repita es el argumento: no es un producto
 * distinto por rubro, es el mismo recorrido aplicado a otro proceso.
 *
 * Los oficios de cada rubro —"el que atiende", "el que cotiza"— son los mismos
 * que nombra el diagnóstico. Esa continuidad es la que hace que, al llegar a
 * las preguntas, el visitante ya sepa de qué se está hablando.
 *
 * Ningún ejemplo lleva métricas: son ejemplos, no casos. El único número del
 * sitio es la estimación que el propio visitante arma en el diagnóstico.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { EJEMPLOS, ETAPAS, type EjemploIndustria } from "@/lib/ejemplos";

function Ficha({ ejemplo }: { ejemplo: EjemploIndustria }) {
  return (
    <article className="hairline hairline-t py-8">
      <h3 className="font-serif text-[23px] leading-tight sm:text-[26px]">
        {ejemplo.industria}
      </h3>
      <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-tinta">
        {ejemplo.proceso}
      </p>

      {/* El recorrido. El nombre de la etapa va en la misma línea que el
          texto: son seis renglones, no seis bloques. */}
      <ol className="mt-6 max-w-[48ch]">
        {ejemplo.flujo.map((linea, i) => (
          <li key={linea} className="flex gap-3 py-1.5">
            <span
              aria-hidden="true"
              className="w-[7.5rem] shrink-0 text-[11px] uppercase leading-[1.6] tracking-[0.14em] text-tinta-2"
            >
              {ETAPAS[i]}
            </span>
            <span className="text-[14px] leading-relaxed text-tinta-2">
              {linea}
            </span>
          </li>
        ))}
      </ol>

      {/* En qué estado queda el trabajo. En serif: cierra la ficha. */}
      <p className="hairline hairline-t mt-6 max-w-[46ch] pt-5 font-serif text-[17px] leading-snug sm:text-[18px]">
        {ejemplo.queda}
      </p>

      {/* Los oficios del rubro, con el lenguaje del diagnóstico. */}
      <p className="mt-4 text-[13px] text-tinta-2">
        <span className="kicker kicker-tinta">En este rubro · </span>
        {ejemplo.oficios.join(" · ")}
      </p>
    </article>
  );
}

export default function Ejemplos({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion id="ejemplos" numero={numero} kicker={kicker} aire marcasRegistro>
      <div className="pb-24 pt-2 sm:pb-32">
        <TitularRevelado
          como="h2"
          className="titular max-w-[22ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Qué se puede automatizar en una empresa como la tuya
        </TitularRevelado>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Un proceso por rubro, contado con las mismas seis etapas de arriba.
          Son ejemplos de procesos que existen en casi cualquier empresa del
          rubro, no trabajos que hayamos hecho.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-14 lg:grid-cols-2">
          {EJEMPLOS.map((ejemplo) => (
            <Ficha key={ejemplo.rubroId} ejemplo={ejemplo} />
          ))}
        </div>

        <div className="hairline hairline-t mt-10 pt-6">
          <p className="max-w-[52ch] text-[14px] leading-relaxed text-tinta-2">
            Si el rubro no está en la lista o el proceso que más tiempo consume
            no es ninguno de estos, el diagnóstico lo contempla igual: hay un
            rubro para escribirlo.
          </p>
          <a
            href="#diagnostico"
            className="
              mt-5 inline-flex min-h-[52px] items-center bg-klein px-7
              text-[15px] text-superficie transition-opacity duration-100
              hover:opacity-90 active:opacity-75
            "
          >
            Analizar mi proceso
          </a>
        </div>
      </div>
    </Seccion>
  );
}
