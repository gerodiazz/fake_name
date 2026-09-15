/**
 * SECCIÓN 02 — DEMOSTRACIÓN
 *
 * Va inmediatamente después del hero porque es lo primero que el visitante
 * necesita: ver qué es esto. Antes de esta sección, el sitio explicaba y no
 * mostraba nada.
 *
 * El rótulo de "datos de ejemplo" va ARRIBA de la pieza, antes de que nadie
 * pueda confundirla con la captura de un cliente. No es letra chica al pie.
 *
 * El número de sección llega por prop: el orden de la home lo decide
 * src/lib/secciones.ts, no este archivo.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import TrazaAgente from "@/components/demostracion/TrazaAgente";
import { DEMOSTRACION } from "@/lib/demostracion";

export default function Demostracion({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion id="demostracion" numero={numero} kicker={kicker} superficie>
      <div className="pb-20 pt-2 sm:pb-28">
        <TitularRevelado
          como="h2"
          className="titular mt-5 max-w-[22ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          {DEMOSTRACION.titulo}
        </TitularRevelado>

        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          {DEMOSTRACION.bajada}
        </p>

        {/* El rótulo, antes de la pieza. */}
        <p className="kicker mt-10">{DEMOSTRACION.rotulo}</p>

        <div className="mt-6">
          <TrazaAgente />
        </div>

        {/* El cierre engancha con la sección de control: lo que se ve acá es
            lo mismo que se promete allá. */}
        <p className="hairline hairline-t mt-12 max-w-[56ch] pt-6 text-[14px] leading-relaxed text-tinta-2">
          {DEMOSTRACION.cierre}{" "}
          <a
            href="#control"
            className="text-tinta underline decoration-linea underline-offset-4 transition-colors duration-100 hover:decoration-tinta-2"
          >
            Cómo se controla
          </a>
          .
        </p>
      </div>
    </Seccion>
  );
}
