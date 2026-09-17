/**
 * SECCIÓN — EJEMPLOS (procesos que se podrían construir, no trabajos hechos)
 *
 * Dos bloques y nada más: la lista de rubros en una línea, para que el
 * visitante se reconozca, y tres ejemplos de tres líneas.
 *
 * La sección tuvo antes seis ejemplos desarrollados y ocupaba tres pantallas.
 * Un cuarto ejemplo no agrega nada que no haya dicho el primero: lo que cambia
 * entre rubros es el vocabulario, no el mecanismo, y el mecanismo ya está
 * contado en la sección de arriba.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import Boton from "@/components/ui/Boton";
import { EJEMPLOS, INDUSTRIAS, type Ejemplo } from "@/lib/ejemplos";

function Ficha({ ejemplo }: { ejemplo: Ejemplo }) {
  return (
    <article className="py-7 sm:px-5">
      <h3 className="font-serif text-[21px] leading-tight sm:text-[23px]">
        {ejemplo.titulo}
      </h3>

      {/* Hoy · el software · lo que queda. Tres líneas, en ese orden. */}
      <p className="mt-3 max-w-[38ch] text-[14px] leading-relaxed text-tinta-2">
        {ejemplo.problema}
      </p>
      <p className="mt-3 max-w-[38ch] text-[14px] leading-relaxed text-tinta">
        {ejemplo.queHace}
      </p>
      <p className="mt-3 max-w-[38ch] font-serif text-[16px] leading-snug">
        {ejemplo.resultado}
      </p>

      <p className="mt-4 text-[13px] text-tinta-2">
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
      <div className="pb-20 pt-2 sm:pb-28">
        <TitularRevelado
          como="h2"
          className="titular max-w-[22ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Procesos que podemos automatizar
        </TitularRevelado>

        {/* La línea que separa esta sección de la de casos. Va acá arriba,
            antes de que nadie pueda leer un ejemplo como si fuera un trabajo
            entregado. Los casos tienen cliente con nombre; estos, no. */}
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Son ejemplos, no casos: procesos que aparecen en casi cualquier
          empresa del rubro y que se pueden pasar a software. Lo que ya
          construimos para clientes está en{" "}
          <a
            href="#casos"
            className="text-tinta underline decoration-linea underline-offset-4 transition-colors duration-100 hover:decoration-tinta-2"
          >
            casos reales
          </a>
          .
        </p>

        {/* Los rubros, en una línea. Para reconocerse alcanza con el nombre. */}
        <p className="kicker kicker-tinta mt-8">
          Trabajamos sobre procesos de
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {INDUSTRIAS.map((industria) => (
            <li key={industria}>
              <span className="chip">{industria}</span>
            </li>
          ))}
        </ul>

        {/* Tres ejemplos. Son procesos, no rubros. */}
        <div className="grilla-expuesta grilla-expuesta-lg mt-12 grid grid-cols-1 hairline hairline-t hairline-b lg:grid-cols-3">
          {EJEMPLOS.map((ejemplo) => (
            <Ficha key={ejemplo.id} ejemplo={ejemplo} />
          ))}
        </div>

        <p className="mt-8 max-w-[52ch] text-[14px] leading-relaxed text-tinta-2">
          Si el proceso que más tiempo consume no es ninguno de estos, el
          diagnóstico lo contempla igual.
        </p>
        <Boton href="#diagnostico" className="mt-6">
          Analizar mi proceso
        </Boton>
      </div>
    </Seccion>
  );
}
