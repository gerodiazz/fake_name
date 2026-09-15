/**
 * SECCIÓN 01 — HERO
 *
 * Sin botón de contacto, a propósito. La primera acción del sitio es la
 * pregunta de rubro del diagnóstico, que va inmediatamente abajo. Un CTA aquí
 * competiría con eso y no aporta: todavía no hay nada que agendar.
 *
 * Es el único H1 del sitio.
 *
 * APOYO 1 DEL SISTEMA DE MOVIMIENTO — la palabra variable del titular rota en
 * loop dentro de una máscara. El hero nunca está quieto, pero tampoco grita:
 * es una sola palabra moviéndose cada 2,2 segundos.
 */

import { Contenedor } from "@/components/Seccion";
import PalabraCinetica from "@/components/PalabraCinetica";
import { FormaKlein, MarcaAgua } from "@/components/Decoracion";

/**
 * Las cuatro figuras que hoy hacen el trabajo. Van de lo genérico a lo
 * concreto: la última es la que incomoda, y por eso cierra la vuelta.
 */
const QUIEN_LO_HACE = [
  "una persona",
  "una secretaria",
  "un empleado",
  "alguien a las nueve de la noche",
];

export default function Hero() {
  return (
    <header
      id="contenido"
      // Sección que respira: es la primera de las cuatro que quedan vacías a
      // propósito, para que las dos bandas Klein aprieten de verdad.
      className="relative overflow-clip pb-14 pt-16 sm:pb-24 sm:pt-28"
    >
      {/* Capa gráfica: el 01 del expediente y el cuarto de círculo que entra
          por el borde derecho, lejos de la caja del titular. */}
      <MarcaAgua numero="01" />
      <FormaKlein variante="hero" />

      <Contenedor className="relative z-10">
        {/* balance reparte las dos líneas en que cae a 375px; sin esto queda
            "empresas" sola en el segundo renglón. */}
        <p className="kicker [text-wrap:balance]">
          fakename · desarrollo de agentes y automatización
        </p>

        <h1 className="titular mt-8 max-w-[16ch] text-[clamp(2.25rem,10.5vw,4.75rem)]">
          Procesos que hoy hace <PalabraCinetica palabras={QUIEN_LO_HACE} />,
          hechos por software.
        </h1>

        <p className="mt-10 max-w-[44ch] text-[16px] leading-relaxed text-tinta-2 sm:text-[17px]">
          Trabajamos sobre procesos que ya existen en la empresa y los pasamos a
          software. El alcance se define antes de empezar.
        </p>
      </Contenedor>
    </header>
  );
}
