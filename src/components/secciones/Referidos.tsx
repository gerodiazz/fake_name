/**
 * SECCIÓN 04 — PROGRAMA DE REFERIDOS
 *
 * Tratado como un producto, no como una nota al pie. Tiene su propia
 * explicación, su calculadora, su formulario y sus condiciones.
 *
 * El número gigante de la calculadora es el mismo componente que el de las
 * horas en la sección 02: esa simetría es el argumento visual de la página.
 * Allá el número son horas, aquí son dólares.
 *
 * Ningún monto está escrito en este archivo: todo sale de REFERIDOS.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import Calculadora from "@/components/referidos/Calculadora";
import FormularioReferidos from "@/components/referidos/FormularioReferidos";
import { REFERIDOS, enDolares } from "@/lib/referidos";
import { SITIO } from "@/lib/sitio";

/** La mecánica en tres movimientos. */
const PASOS = [
  {
    numero: "01",
    titulo: "Se refiere",
    detalle:
      "Llega el contacto de una empresa con procesos hechos a mano. Alcanza el nombre y un teléfono.",
  },
  {
    numero: "02",
    titulo: "Se cierra",
    detalle:
      "El diagnóstico y la propuesta corren por nuestra cuenta. Quien refiere no vende nada ni participa de la reunión.",
  },
  {
    numero: "03",
    titulo: "Se cobra",
    detalle: `Cuando la empresa firma, se pagan ${enDolares(
      REFERIDOS.porCliente,
    )}. Sin tope de referidos y sin fecha de vencimiento.`,
  },
];

/** Condiciones breves. Cortas a propósito: si hay letra chica, no sirve. */
const CONDICIONES = [
  "El pago se libera cuando el cliente firma.",
  `El referido debe ser una empresa que no esté en conversaciones previas con ${SITIO.nombre}.`,
  "No hay tope de referidos. Los bonos por volumen se acumulan y no vencen.",
];

export default function Referidos() {
  return (
    <Seccion id="referidos" numero="04" kicker="Programa de referidos" superficie>
      <div className="pb-16 pt-2 sm:pb-24">
        <TitularRevelado
          como="h2"
          className="titular max-w-[17ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Programa de referidos
        </TitularRevelado>
        <p className="mt-5 max-w-[48ch] text-[15px] text-tinta-2 sm:text-[16px]">
          Abierto a cualquiera, sea cliente o no. Se paga por cliente que firma,
          no por contacto presentado.
        </p>

        {/* Los tres pasos. Misma grilla expuesta que la sección 03. */}
        <ol className="grilla-expuesta grilla-expuesta-sm mt-10 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-3">
          {PASOS.map((paso) => (
            <li key={paso.numero} className="py-6 sm:px-5">
              <p className="kicker kicker-tinta">{paso.numero}</p>
              <h3 className="mt-3 font-serif text-[21px] leading-tight">
                {paso.titulo}
              </h3>
              <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-tinta-2">
                {paso.detalle}
              </p>
            </li>
          ))}
        </ol>

        {/* La calculadora. Mismo gesto que el diagnóstico: se mueve el slider,
            el número responde, se desbloquea un estado. */}
        <div className="mt-16 sm:mt-20">
          <p className="kicker kicker-tinta">Cálculo</p>
          <div className="mt-6">
            <Calculadora />
          </div>
        </div>

        {/* Alta al programa. */}
        <div className="hairline hairline-t mt-16 pt-10 sm:mt-20">
          <TitularRevelado como="h3" className="titular max-w-[20ch] text-[clamp(1.4rem,6vw,2rem)]">
          Alta al programa
        </TitularRevelado>
          <div className="mt-8">
            <FormularioReferidos />
          </div>
        </div>

        {/* Condiciones. */}
        <div className="hairline hairline-t mt-14 pt-8">
          <h3 className="kicker kicker-tinta">Condiciones</h3>
          <ul className="mt-4 max-w-[56ch] space-y-2">
            {CONDICIONES.map((condicion) => (
              <li
                key={condicion}
                className="flex gap-3 text-[14px] leading-relaxed text-tinta-2"
              >
                <span aria-hidden="true" className="select-none">
                  ·
                </span>
                <span>{condicion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}
