/**
 * SECCIÓN — CONDICIONES
 *
 * Los cuatro puntos que bajan el riesgo de contratar, a la vista y sin nada
 * plegado: tratar la mejor parte de la oferta como letra chica es tirarla.
 *
 * Eran siete. Las tres que se fueron estaban dichas en otro lado o no pesan
 * en la decisión; el detalle de cuáles y por qué está en src/lib/condiciones.ts.
 *
 * Cuatro celdas entran en una sola fila en desktop, así que la grilla pasó de
 * tres columnas a cuatro: la sección mide ahora una fila en vez de tres.
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
      <div className="pb-20 pt-2 sm:pb-24">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Qué se contrata
        </TitularRevelado>
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Las mismas que van escritas en la propuesta.
        </p>

        <ul className="grilla-expuesta grilla-expuesta-sm mt-10 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-2 lg:grid-cols-4">
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

      </div>
    </Seccion>
  );
}
