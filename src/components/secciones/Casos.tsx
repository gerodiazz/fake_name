/**
 * SECCIÓN — CASOS REALES
 *
 * Va inmediatamente después del diagnóstico. El orden no es casual: el
 * visitante acaba de ver su propia estimación y la pregunta que sigue es
 * siempre la misma —"¿esto ya lo hicieron en una empresa de verdad?"—. La
 * sección contesta que sí antes de pedirle nada y antes de explicarle nada.
 *
 * ESTA SECCIÓN REEMPLAZA A LAS EXPLICACIONES. El sitio tenía además el
 * mecanismo dibujado, un ejemplo inventado con su conversación y su recorrido,
 * y tres procesos conceptuales rotulados "esto se podría automatizar". Con
 * tres clientes reales cargados, todo eso era la versión débil de esto: un
 * caso con nombre convence más que un ejemplo bien escrito.
 *
 * TRES FRASES POR CASO: problema, solución, resultado. Salen de `caso.tarjeta`
 * y no de los campos largos, que existen para la página del caso. La tarjeta
 * ya no lista las integraciones —eran tres nombres de software en una sección
 * que vende resultados— ni el resumen, que decía lo mismo que el problema.
 *
 * El detalle largo vive en /casos/<slug>, detrás de "Ver caso": ahí entra
 * quien ya decidió que le interesa, y ahí sí puede leer las etapas, los
 * flujos, el testimonio y el video.
 *
 * La sección sigue apagándose sola si algún día CASOS queda vacío: el arreglo
 * manda, acá no hay nada escrito a mano (ver src/lib/secciones.ts).
 */

import Link from "next/link";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { CASOS, DEMOS, type Caso } from "@/lib/casos";

/** Rótulo y frase de cada uno de los tres renglones de la tarjeta. */
function Renglon({ rotulo, children }: { rotulo: string; children: string }) {
  return (
    <div className="mt-4">
      <p className="kicker kicker-tinta">{rotulo}</p>
      <p className="mt-1.5 max-w-[38ch] text-[15px] leading-relaxed text-tinta">
        {children}
      </p>
    </div>
  );
}

function Tarjeta({ caso }: { caso: Caso }) {
  return (
    <Link
      href={`/casos/${caso.slug}`}
      aria-label={`Ver el caso de ${caso.cliente}`}
      // `group` para que la flecha del pie reaccione al hover de toda la
      // tarjeta. La tarjeta entera es el enlace: no hay nada interactivo
      // adentro con lo que pueda competir.
      className="group flex h-full flex-col py-7 sm:px-5"
    >
      <h3 className="font-serif text-[21px] leading-tight transition-opacity duration-100 group-hover:opacity-70 sm:text-[23px]">
        {caso.cliente}
      </h3>
      <p className="kicker kicker-tinta mt-2">{caso.industria}</p>

      <Renglon rotulo="Problema">{caso.tarjeta.problema}</Renglon>
      <Renglon rotulo="Solución">{caso.tarjeta.solucion}</Renglon>
      <Renglon rotulo="Resultado">{caso.tarjeta.resultado}</Renglon>

      <p className="mt-auto flex items-center gap-2 pt-7 text-[14px] text-acento transition-opacity duration-100 group-hover:opacity-80">
        <span className="underline decoration-[1.5px] underline-offset-[7px]">
          Ver caso
        </span>
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </Link>
  );
}

export default function Casos({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  if (CASOS.length === 0 && DEMOS.length === 0) return null;

  return (
    <Seccion id="casos" numero={numero} kicker={kicker} aire superficie>
      <div className="pb-16 pt-2 sm:pb-20">
        <TitularRevelado
          como="h2"
          className="titular mt-5 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Casos reales
        </TitularRevelado>

        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Tres clientes, con nombre.
        </p>

        {CASOS.length > 0 ? (
          <ul className="grilla-expuesta grilla-expuesta-lg mt-10 grid grid-cols-1 hairline hairline-t hairline-b lg:grid-cols-3">
            {CASOS.map((caso) => (
              <li key={caso.slug} className="flex">
                <Tarjeta caso={caso} />
              </li>
            ))}
          </ul>
        ) : null}

        {/* Demos propias. Separadas de los casos y rotuladas como lo que son. */}
        {DEMOS.length > 0 ? (
          <div className={CASOS.length > 0 ? "mt-14" : "mt-12"}>
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
                      className="mt-3 inline-flex min-h-[44px] items-center text-[14px] text-acento underline decoration-[1.5px] underline-offset-[7px] transition-opacity duration-100 hover:opacity-80 active:opacity-55"
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
