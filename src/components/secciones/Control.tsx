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
import { CAPACIDADES, PREMISA, RESPUESTA, SE_DEFINE } from "@/lib/control";

export default function Control({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion id="control" numero={numero} kicker={kicker} aire>
      <div className="pb-20 pt-2 sm:pb-28">
        <TitularRevelado
          como="h2"
          className="titular max-w-[22ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Qué pasa si el software se equivoca
        </TitularRevelado>

        <p className="mt-6 max-w-[46ch] font-serif text-[21px] leading-snug sm:text-[24px]">
          {PREMISA}
        </p>
        <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          {RESPUESTA}
        </p>

        <ul className="grilla-expuesta grilla-expuesta-sm mt-10 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-2 lg:grid-cols-3">
          {CAPACIDADES.map((capacidad) => (
            <li key={capacidad.id} className="py-6 sm:px-5">
              <h3 className="font-serif text-[19px] leading-tight sm:text-[21px]">
                {capacidad.titulo}
              </h3>
              <p className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-tinta-2">
                {capacidad.detalle}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[54ch] text-[14px] leading-relaxed text-tinta-2">
          {SE_DEFINE}
        </p>
      </div>
    </Seccion>
  );
}
