/**
 * SECCIÓN 09 — CONTROL, ERRORES Y DATOS
 *
 * La pregunta que el sitio no contestaba en ningún lado: qué pasa si la IA se
 * equivoca. No se esconde en el FAQ; tiene sección propia y está escrita como
 * título, no como pregunta incómoda.
 *
 * Las seis de abajo son CAPACIDADES, no una lista de cosas que todos nuestros
 * sistemas tienen. Cada una dice en qué casos entra en una implementación.
 * Afirmar que todos nuestros agentes piden aprobación y registran cada acción
 * sería una afirmación sobre sistemas que todavía no se construyeron.
 *
 * Después van las dos cosas que sí se sostienen siempre —qué se decide antes
 * de construir y qué pasa con los datos— y el cierre sobre los 90 días.
 *
 * La idea es transmitir control, no magia.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { CAPACIDADES, POSICION, PREMISA, SI_SE_EQUIVOCA } from "@/lib/control";

export default function Control({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion id="control" numero={numero} kicker={kicker} aire>
      <div className="pb-24 pt-2 sm:pb-32">
        <TitularRevelado
          como="h2"
          className="titular max-w-[22ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Qué pasa si el software se equivoca
        </TitularRevelado>

        <p className="mt-6 max-w-[46ch] font-serif text-[21px] leading-snug sm:text-[24px]">
          {PREMISA}
        </p>
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Según el proceso, el sistema puede hacer estas seis cosas. Cuáles
          entran en cada implementación se decide con la empresa antes de
          escribir código, y queda escrito en la propuesta.
        </p>

        <ul className="grilla-expuesta grilla-expuesta-sm mt-12 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-2 lg:grid-cols-3">
          {CAPACIDADES.map((capacidad) => (
            <li key={capacidad.id} className="py-7 sm:px-5">
              <h3 className="font-serif text-[21px] leading-tight sm:text-[23px]">
                {capacidad.titulo}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-tinta">
                {capacidad.detalle}
              </p>
              <p className="mt-3 max-w-[40ch] text-[13px] leading-relaxed text-tinta-2">
                <span className="kicker kicker-tinta">Cuándo · </span>
                {capacidad.cuando}
              </p>
            </li>
          ))}
        </ul>

        {/* Lo que no depende del proyecto. */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {POSICION.map((punto) => (
            <div key={punto.titulo}>
              <h3 className="font-serif text-[21px] leading-tight sm:text-[23px]">
                {punto.titulo}
              </h3>
              <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-tinta-2">
                {punto.detalle}
              </p>
            </div>
          ))}
        </div>

        {/* El cierre: y si igual se equivoca. */}
        <p className="hairline hairline-t mt-12 max-w-[54ch] pt-6 font-serif text-[18px] leading-snug sm:text-[19px]">
          {SI_SE_EQUIVOCA}
        </p>
      </div>
    </Seccion>
  );
}
