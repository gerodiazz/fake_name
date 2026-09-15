/**
 * SECCIÓN 07 — CONDICIONES
 *
 * Tres de estos seis puntos vivían adentro del acordeón de preguntas
 * frecuentes: había que abrir un <details> para enterarse de que el pago es
 * único y de que el código queda a nombre de la empresa. Eso es tratar la
 * mejor parte de la oferta como letra chica.
 *
 * Acá están los seis a la vista, sin acordeón y sin nada plegado. La sección
 * usa la grilla expuesta del sitio: cada condición es una celda con su
 * hairline, como las etapas de "Cómo trabajamos".
 *
 * Cada punto dice el compromiso y, debajo, qué significa para el cliente. Esa
 * segunda línea es la que baja el riesgo de contratar.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { CONDICIONES } from "@/lib/condiciones";

export default function Condiciones({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion id="condiciones" numero={numero} kicker={kicker} superficie>
      <div className="pb-24 pt-2 sm:pb-32">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Qué se contrata
        </TitularRevelado>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Las mismas que van escritas en la propuesta, acá arriba y no en la
          letra chica del final.
        </p>

        <ul className="grilla-expuesta grilla-expuesta-sm mt-12 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-2 lg:grid-cols-3">
          {CONDICIONES.map((condicion) => (
            <li key={condicion.id} className="py-7 sm:px-5">
              <h3 className="font-serif text-[21px] leading-tight sm:text-[23px]">
                {condicion.titulo}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-tinta-2">
                {condicion.detalle}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[52ch] text-[14px] leading-relaxed text-tinta-2">
          Lo que no está acá tampoco está en la propuesta.
        </p>
      </div>
    </Seccion>
  );
}
