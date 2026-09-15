/**
 * SECCIÓN 04 — EJEMPLOS POR INDUSTRIA
 *
 * Contesta la pregunta que el visitante se hace después de entender qué es un
 * agente: "¿qué podrían automatizar en una empresa como la mía?".
 *
 * NO ES UNA GRILLA DE CARDS. Era una: seis recuadros iguales en dos columnas,
 * que es la solución por defecto y la que hace que un sitio se parezca a
 * cualquier otro. Cada rubro es una fila editorial de ancho completo, con el
 * proceso a la izquierda, las dos cadenas enfrentadas en el medio y el
 * resultado a la derecha.
 *
 * Las dos cadenas son el argumento entero de la sección: de un lado cinco
 * saltos entre personas y aplicaciones, del otro cuatro pasos seguidos. Se lee
 * en dos segundos y dice más que el párrafo que había antes.
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
import { EJEMPLOS, type EjemploProceso } from "@/lib/ejemplos";

/** Una cadena de piezas encadenadas por flechas. */
function Cadena({
  piezas,
  tono = "papel",
}: {
  piezas: string[];
  tono?: "papel" | "klein";
}) {
  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {piezas.map((pieza, i) => (
        <li key={`${pieza}-${i}`} className="flex items-center gap-1.5">
          <span className={tono === "klein" ? "chip chip-klein" : "chip"}>
            {pieza}
          </span>
          {/* La flecha va DESPUÉS de cada pieza: cuando la cadena envuelve, un
              renglón que empieza con flecha se lee como un error. */}
          {i < piezas.length - 1 ? (
            <span className="flecha" aria-hidden="true">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function Fila({ ejemplo }: { ejemplo: EjemploProceso }) {
  return (
    <article className="hairline hairline-t py-9 sm:py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,15rem)] lg:gap-12">
        {/* ---- el proceso ---- */}
        <div>
          <h3 className="font-serif text-[22px] leading-tight sm:text-[24px]">
            {ejemplo.industria}
          </h3>
          <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-tinta">
            {ejemplo.proceso}
          </p>
        </div>

        {/* ---- las dos cadenas, enfrentadas ---- */}
        <div className="border-t-[0.5px] border-linea pt-6 lg:border-l-[0.5px] lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="kicker kicker-tinta">Qué hace hoy una persona</p>
          <Cadena piezas={ejemplo.hoy} />

          <p className="kicker mt-6">Qué hace el software</p>
          <Cadena piezas={ejemplo.conSoftware} tono="klein" />
        </div>

        {/* ---- lo que queda ---- */}
        <div className="border-t-[0.5px] border-linea pt-6 lg:border-l-[0.5px] lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="kicker kicker-tinta">Lo que queda</p>
          <p className="mt-3 max-w-[34ch] font-serif text-[17px] leading-snug sm:text-[18px]">
            {ejemplo.queda}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-tinta-2">
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
          Un proceso por rubro, con lo que hoy hace una persona a un lado y lo
          que hace el software al otro. Son procesos que existen en casi
          cualquier empresa del rubro, no trabajos que hayamos hecho.
        </p>

        <div className="mt-10">
          {EJEMPLOS.slice(0, 3).map((ejemplo) => (
            <Fila key={ejemplo.rubroId} ejemplo={ejemplo} />
          ))}

          {/* Los otros tres, plegados. Con <details> nativo: el contenido está
              en el HTML desde el servidor —un buscador lo ve igual— y el
              teclado y el lector de pantalla funcionan sin una línea de JS.
              Seis rubros abiertos eran cinco pantallas de scroll en un
              teléfono, y el cuarto ya no agrega nada que no haya dicho el
              primero. */}
          <details className="faq hairline hairline-t">
            <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-6 py-4 transition-opacity duration-100 active:opacity-55">
              <span className="text-[15px] text-tinta-2">
                Ver los otros tres rubros
              </span>
              <span
                aria-hidden="true"
                className="faq-signo shrink-0 text-[20px] leading-none text-tinta-2 transition-transform duration-200"
              >
                +
              </span>
            </summary>
            <div className="anim-emerger">
              {EJEMPLOS.slice(3).map((ejemplo) => (
                <Fila key={ejemplo.rubroId} ejemplo={ejemplo} />
              ))}
            </div>
          </details>
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
