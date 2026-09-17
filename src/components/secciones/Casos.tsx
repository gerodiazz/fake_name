/**
 * SECCIÓN — CASOS REALES
 *
 * Va inmediatamente después de "cómo funciona", que es donde termina la
 * demostración conceptual. El orden no es casual: el visitante acaba de ver un
 * ejemplo inventado corriendo, y la pregunta que sigue es siempre la misma
 * —"¿esto ya lo hicieron en una empresa de verdad?"—. La sección contesta que
 * sí antes de pedirle nada.
 *
 * REEMPLAZÓ A LOS EJEMPLOS. El sitio tenía además una sección con tres
 * procesos conceptuales —"esto se podría automatizar"— y los rubros en una
 * línea de chips. Con tres clientes reales cargados, esa sección pasó a ser
 * la versión débil de esta: un caso con nombre convence más que un ejemplo
 * bien escrito. Los rubros ya los lista el selector del diagnóstico.
 *
 * TRES TARJETAS CORTAS, NO TRES MUROS DE TEXTO. Cada
 * tarjeta contesta cliente, rubro, problema, qué se construyó y con qué, y el
 * que quiere más entra al caso: /casos/<slug>. El detalle largo vive ahí.
 *
 * La sección sigue apagándose sola si algún día CASOS queda vacío: el arreglo
 * manda, acá no hay nada escrito a mano (ver src/lib/secciones.ts).
 */

import Link from "next/link";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { CASOS, DEMOS, type Caso } from "@/lib/casos";

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

      {/* El antes y el después, en una oración. */}
      <p className="mt-4 max-w-[38ch] font-serif text-[16px] leading-snug">
        {caso.resumen}
      </p>

      {/* Qué se construyó, y de qué clase de software estamos hablando. */}
      <p className="mt-3 max-w-[38ch] text-[14px] leading-relaxed text-tinta-2">
        {caso.construido}
      </p>

      <p className="mt-auto pt-6 text-[13px] text-tinta-2">
        {caso.integraciones.join(" · ")}
      </p>

      <p className="mt-4 flex items-center gap-2 text-[14px] text-acento transition-opacity duration-100 group-hover:opacity-80">
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
    <Seccion id="casos" numero={numero} kicker={kicker} aire>
      <div className="pb-16 pt-2 sm:pb-20">
        <TitularRevelado
          como="h2"
          className="titular mt-5 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Casos reales
        </TitularRevelado>

        <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Problemas concretos y el software que construimos para resolverlos.
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
