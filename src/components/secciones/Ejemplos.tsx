/**
 * SECCIÓN 04 — EJEMPLOS POR INDUSTRIA
 *
 * Contesta la pregunta que el visitante se hace después de entender qué es un
 * agente: "¿qué podrían automatizar en una empresa como la mía?".
 *
 * NO ES UNA GRILLA DE CARDS. Era una: seis recuadros iguales en dos columnas,
 * que es la solución por defecto y la que hace que un sitio se parezca a
 * cualquier otro. Ahora cada rubro es una fila editorial de ancho completo,
 * con tres tiempos leídos de izquierda a derecha:
 *
 *   EL PROCESO HOY  →  QUÉ HACE EL SOFTWARE  →  LO QUE QUEDA
 *
 * La primera columna dibuja la cadena manual como piezas encadenadas —
 * WhatsApp, vendedor, planilla, vendedor— y esa acumulación es el argumento:
 * se ve el problema antes de leerlo. La del medio son las seis etapas del
 * recorrido, las mismas de la sección 02.
 *
 * Los oficios —"el que atiende", "el que cotiza"— son los mismos que nombra el
 * diagnóstico. Esa continuidad hace que, al llegar a las preguntas, el
 * visitante ya sepa de qué se está hablando.
 *
 * Ningún ejemplo lleva métricas: son ejemplos, no casos.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import Boton from "@/components/ui/Boton";
import { EJEMPLOS, ETAPAS, type EjemploIndustria } from "@/lib/ejemplos";

function Fila({ ejemplo }: { ejemplo: EjemploIndustria }) {
  return (
    <article className="hairline hairline-t py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)] lg:gap-12">
        {/* ---- tiempo 1: el proceso hoy ---- */}
        <div>
          <h3 className="font-serif text-[23px] leading-tight sm:text-[26px]">
            {ejemplo.industria}
          </h3>
          <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-tinta">
            {ejemplo.proceso}
          </p>

          <p className="kicker kicker-tinta mt-6">El proceso hoy</p>
          {/* La cadena manual. Las piezas van separadas por flechas: el salto
              entre una y otra es exactamente lo que cuesta tiempo. */}
          <ul className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
            {ejemplo.hoy.map((pieza, i) => (
              <li key={`${pieza}-${i}`} className="flex items-center gap-1.5">
                <span className="chip">{pieza}</span>
                {i < ejemplo.hoy.length - 1 ? (
                  <span className="flecha" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- tiempo 2: qué hace el software ---- */}
        <div className="border-t-[0.5px] border-linea pt-6 lg:border-l-[0.5px] lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="kicker">Qué hace el software</p>
          <ol className="mt-3">
            {ejemplo.flujo.map((linea, i) => (
              <li key={linea} className="flex gap-4 py-1.5">
                <span
                  aria-hidden="true"
                  className="w-[6.5rem] shrink-0 text-[11px] uppercase leading-[1.7] tracking-[0.12em] text-tinta-2"
                >
                  {ETAPAS[i]}
                </span>
                <span className="text-[14px] leading-relaxed text-tinta-2">
                  {linea}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* ---- tiempo 3: lo que queda ---- */}
        <div className="border-t-[0.5px] border-linea pt-6 lg:border-l-[0.5px] lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="kicker kicker-tinta">Lo que queda</p>
          <p className="mt-3 max-w-[34ch] font-serif text-[17px] leading-snug sm:text-[18px]">
            {ejemplo.queda}
          </p>
          <p className="mt-5 text-[13px] leading-relaxed text-tinta-2">
            {ejemplo.oficios.join(" · ")}
          </p>
        </div>
      </div>
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
          Son procesos que existen en casi cualquier empresa del rubro, no
          trabajos que hayamos hecho.
        </p>

        <div className="mt-10">
          {EJEMPLOS.map((ejemplo) => (
            <Fila key={ejemplo.rubroId} ejemplo={ejemplo} />
          ))}
        </div>

        <div className="hairline hairline-t pt-8">
          <p className="max-w-[52ch] text-[14px] leading-relaxed text-tinta-2">
            Si el rubro no está en la lista o el proceso que más tiempo consume
            no es ninguno de estos, el diagnóstico lo contempla igual: hay un
            rubro para escribirlo.
          </p>
          <Boton href="#diagnostico" className="mt-6">
            Analizar mi proceso
          </Boton>
        </div>
      </div>
    </Seccion>
  );
}
