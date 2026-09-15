/**
 * SECCIÓN 04 — EJEMPLOS DE PROCESOS
 *
 * Los oficios que nombra el diagnóstico —"el que atiende", "el que cotiza"—
 * abiertos en los tres tiempos que un visitante necesita para reconocerse:
 *
 *   HOY (a mano) → QUÉ HACE EL SISTEMA → CON QUÉ QUEDA LA EMPRESA
 *
 * Antes esta idea existía solo adentro del diagnóstico, donde hay que
 * contestar seis preguntas para verla. Acá está a la vista sin hacer nada.
 *
 * Ningún ejemplo lleva métricas: el único número del sitio es la estimación
 * que el propio visitante arma en la sección del diagnóstico.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { EJEMPLOS, type Ejemplo } from "@/lib/ejemplos";

function Ficha({ ejemplo }: { ejemplo: Ejemplo }) {
  return (
    <article className="hairline hairline-t py-8">
      <h3 className="font-serif text-[23px] leading-tight sm:text-[26px]">
        {ejemplo.nombre}
      </h3>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-tinta-2">
        {ejemplo.dondeAparece}
      </p>

      {/* Tiempo 1 — el problema, tal como se vive hoy. */}
      <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-tinta">
        {ejemplo.problema}
      </p>

      {/* Tiempo 2 — lo que ejecuta el sistema. */}
      <p className="kicker kicker-tinta mt-6">Qué hace el sistema</p>
      <ol className="mt-3 max-w-[46ch]">
        {ejemplo.pasos.map((paso, i) => (
          <li
            key={paso}
            className="flex gap-3 py-1.5 text-[14px] leading-relaxed text-tinta-2"
          >
            <span
              aria-hidden="true"
              className="shrink-0 text-[11px] tabular-nums tracking-[0.14em] text-tinta-2"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{paso}</span>
          </li>
        ))}
      </ol>

      {/* Tiempo 3 — el resultado. En serif: es la frase que cierra la ficha. */}
      <p className="hairline hairline-t mt-6 max-w-[46ch] pt-5 font-serif text-[17px] leading-snug sm:text-[18px]">
        {ejemplo.resultado}
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
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Procesos que se pasan a software
        </TitularRevelado>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Cada uno es un puesto de trabajo que hoy existe en alguna empresa. No
          son productos que vendemos hechos: son los procesos que más veces nos
          tocó construir.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-14 lg:grid-cols-2">
          {EJEMPLOS.map((ejemplo) => (
            <Ficha key={ejemplo.id} ejemplo={ejemplo} />
          ))}
        </div>

        <p className="hairline hairline-t mt-10 max-w-[50ch] pt-6 text-[14px] leading-relaxed text-tinta-2">
          Si el proceso que consume más tiempo no está en esta lista, el
          diagnóstico igual lo contempla:{" "}
          <a
            href="#diagnostico"
            className="text-tinta underline decoration-linea underline-offset-4 transition-colors duration-100 hover:decoration-tinta-2"
          >
            hay un rubro para escribirlo
          </a>
          .
        </p>
      </div>
    </Seccion>
  );
}
