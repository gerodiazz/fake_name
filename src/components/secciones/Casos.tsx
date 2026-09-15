/**
 * SECCIÓN 09 — CASOS
 *
 * NO SE RENDERIZA MIENTRAS NO HAYA CASOS REALES.
 *
 * El componente devuelve null si CASOS y DEMOS están vacíos, y la sección
 * tampoco ocupa número de expediente (src/lib/secciones.ts la marca como no
 * visible). No hay sección "casos en preparación", ni recuadros grises, ni
 * logos de ejemplo: la falta de casos no se resuelve inventando prueba social.
 *
 * Cuando se cargue el primer caso en src/lib/casos.ts, la sección aparece sola
 * con su número y las siguientes se corren.
 *
 * Casos y demos propias se muestran separados a propósito: una demo construida
 * por el estudio no es prueba de que alguien nos haya contratado, y mezclarlas
 * sería exactamente la clase de prueba social que el sitio evita.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { CASOS, DEMOS } from "@/lib/casos";

export default function Casos({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  if (CASOS.length === 0 && DEMOS.length === 0) return null;

  return (
    <Seccion id="casos" numero={numero} kicker={kicker} aire>
      <div className="pb-24 pt-2 sm:pb-32">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Trabajos hechos
        </TitularRevelado>

        {CASOS.length > 0 ? (
          <ul className="mt-12">
            {CASOS.map((caso) => (
              <li key={caso.id} className="hairline hairline-t py-8">
                <h3 className="font-serif text-[23px] leading-tight sm:text-[26px]">
                  {caso.titulo}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-tinta-2">
                  {caso.empresa ?? caso.contexto}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
                  <div>
                    <p className="kicker kicker-tinta">El problema</p>
                    <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-tinta">
                      {caso.problema}
                    </p>

                    <p className="kicker kicker-tinta mt-6">Cómo se hacía</p>
                    <ol className="mt-2 max-w-[46ch]">
                      {caso.procesoAnterior.map((paso, i) => (
                        <li
                          key={paso}
                          className="flex gap-3 py-1 text-[14px] leading-relaxed text-tinta-2"
                        >
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[11px] tabular-nums tracking-[0.14em]"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{paso}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <p className="kicker kicker-tinta">Qué se construyó</p>
                    <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-tinta">
                      {caso.solucion}
                    </p>

                    <p className="kicker kicker-tinta mt-6">Resultado</p>
                    <p className="mt-2 max-w-[46ch] font-serif text-[18px] leading-snug">
                      {caso.resultado}
                    </p>

                    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[13px]">
                      <div>
                        <dt className="kicker kicker-tinta">Tiempo</dt>
                        <dd className="mt-1 tabular-nums">{caso.tiempo}</dd>
                      </div>
                      <div>
                        <dt className="kicker kicker-tinta">Herramientas</dt>
                        <dd className="mt-1 max-w-[34ch] text-tinta-2">
                          {caso.herramientas.join(" · ")}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </li>
            ))}
            <li className="hairline hairline-t" aria-hidden="true" />
          </ul>
        ) : null}

        {/* Demos propias. Separadas de los casos y rotuladas como lo que son. */}
        {DEMOS.length > 0 ? (
          <div className={CASOS.length > 0 ? "mt-16" : "mt-12"}>
            <p className="kicker kicker-tinta">
              Demos propias · construidas por el estudio, sin cliente detrás
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {DEMOS.map((demo) => (
                <li key={demo.id} className="hairline hairline-t py-6">
                  <h3 className="font-serif text-[21px] leading-tight">
                    {demo.titulo}
                  </h3>
                  <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-tinta-2">
                    {demo.descripcion}
                  </p>
                  {demo.enlace ? (
                    <a
                      href={demo.enlace}
                      className="mt-3 inline-flex min-h-[44px] items-center text-[14px] text-klein underline decoration-[1.5px] underline-offset-[7px] transition-opacity duration-100 hover:opacity-80 active:opacity-55"
                    >
                      Abrir la demo
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Seccion>
  );
}
