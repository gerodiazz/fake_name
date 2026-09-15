/**
 * SECCIÓN 02 — CÓMO FUNCIONA
 *
 * Va inmediatamente después del hero porque es lo primero que el visitante
 * necesita: entender qué es esto. Antes, el sitio explicaba y no mostraba
 * nada, y encima usaba la palabra "agente" sin definirla nunca.
 *
 * Tiene tres bloques, en este orden:
 *
 *   1. LA TRANSFORMACIÓN — tres columnas y dos flechas: el proceso de hoy, lo
 *      que se construye, lo que queda. Se entiende sin leer una oración
 *      completa, y por eso va primero.
 *   2. QUÉ ES UN AGENTE — la definición en castellano y la comparación con la
 *      automatización simple.
 *   3. EJEMPLO CONCEPTUAL — el recorrido completo sobre un caso, con el marco
 *      de permisos y reglas dentro del que trabaja.
 *
 * El ritmo de la sección alterna a propósito: diagrama, texto, producto. Tres
 * bloques de texto seguidos serían la misma información y nadie los leería.
 *
 * Se llama igual que el botón secundario del hero: el visitante toca "Ver cómo
 * funciona" y llega a una sección que se llama así.
 *
 * El rótulo de "ejemplo conceptual" va ARRIBA de la pieza, antes de que nadie
 * pueda confundirla con el caso de un cliente. No es letra chica al pie.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import QueEsUnAgente from "@/components/demostracion/QueEsUnAgente";
import Transformacion from "@/components/demostracion/Transformacion";
import TrazaAgente from "@/components/demostracion/TrazaAgente";
import { DEMOSTRACION } from "@/lib/demostracion";

export default function ComoFunciona({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion id="como-funciona" numero={numero} kicker={kicker} superficie>
      <div className="pb-20 pt-2 sm:pb-28">
        <TitularRevelado
          como="h2"
          className="titular mt-5 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          De un proceso a mano a un proceso que corre solo
        </TitularRevelado>

        {/* 1 · La transformación, antes que cualquier explicación. */}
        <div className="hairline hairline-t hairline-b mt-10 py-10">
          <Transformacion />
        </div>

        {/* 2 · Qué es un agente. */}
        <div className="mt-14">
          <QueEsUnAgente />
        </div>

        {/* 3 · El ejemplo, corriendo. */}
        <div className="hairline hairline-t mt-20 pt-12">
          <p className="kicker">{DEMOSTRACION.rotulo}</p>

          <h3 className="titular mt-5 max-w-[22ch] text-[clamp(1.5rem,6vw,2.4rem)]">
            {DEMOSTRACION.titulo}
          </h3>
          <div className="mt-10">
            <TrazaAgente />
          </div>

          {/* El cierre engancha con la sección de control: lo que se ve acá es
              lo mismo que se explica allá. */}
          <p className="hairline hairline-t mt-10 max-w-[58ch] pt-6 text-[14px] leading-relaxed text-tinta-2">
            Qué etapas quedan automáticas y cuáles esperan a una persona se
            define con la empresa.{" "}
            <a
              href="#control"
              className="text-tinta underline decoration-linea underline-offset-4 transition-colors duration-100 hover:decoration-tinta-2"
            >
              Qué pasa si se equivoca
            </a>
            .
          </p>
        </div>
      </div>
    </Seccion>
  );
}
