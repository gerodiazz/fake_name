/**
 * SECCIÓN 08 — CONTROL, ERRORES Y DATOS
 *
 * La sección que no existía. El sitio explicaba qué se automatiza y no decía
 * nunca quién manda cuando el software se equivoca, qué queda registrado ni
 * dónde terminan los datos.
 *
 * La idea comercial es una sola: no se construye una caja negra que decide
 * sola. La forma de sostenerla sin inventar arquitectura es separar en cada
 * punto lo que se afirma —la posición de trabajo, que vale para cualquier
 * proyecto— de lo que se define con la empresa en la propuesta.
 *
 * Ese segundo renglón, "se define en la propuesta", no es una evasiva: es la
 * respuesta honesta cuando la decisión depende del proceso de cada empresa, y
 * además muestra que la decisión existe y que la toma el cliente.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { PUNTOS_DE_CONTROL } from "@/lib/control";

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
          Qué pasa cuando el software se equivoca
        </TitularRevelado>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Un sistema que ejecuta trabajo real necesita saber cuándo frenar. No
          construimos una caja negra que decide sola: qué queda automático y
          qué espera a una persona se decide antes de escribir código.
        </p>

        <ul className="mt-12">
          {PUNTOS_DE_CONTROL.map((punto) => (
            <li key={punto.id} className="hairline hairline-t py-7">
              <div className="grid grid-cols-1 gap-x-12 gap-y-3 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
                <h3 className="font-serif text-[19px] leading-snug sm:text-[21px]">
                  {punto.pregunta}
                </h3>
                <div>
                  <p className="max-w-[56ch] text-[15px] leading-relaxed text-tinta">
                    {punto.respuesta}
                  </p>
                  {punto.seDefine ? (
                    <p className="mt-3 max-w-[56ch] text-[13px] leading-relaxed text-tinta-2">
                      <span className="kicker kicker-tinta">
                        Se define en la propuesta ·{" "}
                      </span>
                      {punto.seDefine}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
          <li className="hairline hairline-t" aria-hidden="true" />
        </ul>
      </div>
    </Seccion>
  );
}
