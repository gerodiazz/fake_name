/**
 * SECCIÓN 01 — HERO
 *
 * Es el único H1 del sitio.
 *
 * SOBRE LOS DOS BOTONES — antes el hero no tenía ninguno, con el argumento de
 * que la primera acción del sitio era la pregunta de rubro del diagnóstico,
 * que venía justo abajo. Ese argumento dejó de valer cuando el diagnóstico
 * pasó a ser la sección 03: entre el titular y la primera pregunta ahora hay
 * una demostración entera, así que el visitante que ya sabe lo que quiere
 * necesita poder saltar.
 *
 *   · "Analizar mi proceso" baja al diagnóstico. Es la acción principal y la
 *     única en Klein de esta sección.
 *   · "Ver cómo funciona" baja a la demostración, para el que todavía no
 *     entiende qué es esto.
 *
 * APOYO 1 DEL SISTEMA DE MOVIMIENTO — la palabra variable del titular rota en
 * loop dentro de una máscara. El hero nunca está quieto, pero tampoco grita:
 * es una sola palabra moviéndose cada 2,2 segundos.
 */

import { Contenedor } from "@/components/Seccion";
import PalabraCinetica from "@/components/PalabraCinetica";
import { FormaKlein, MarcaAgua } from "@/components/Decoracion";
import { SITIO } from "@/lib/sitio";

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

export default function Hero({ numero }: { numero: string }) {
  return (
    <header
      id="contenido"
      // Sección que respira: es la primera de las cuatro que quedan vacías a
      // propósito, para que las dos bandas Klein aprieten de verdad.
      className="relative overflow-clip pb-14 pt-16 sm:pb-20 sm:pt-28"
    >
      {/* Capa gráfica: el número del expediente y el cuarto de círculo que
          entra por el borde derecho, lejos de la caja del titular. */}
      <MarcaAgua numero={numero} />
      <FormaKlein variante="hero" />

      <Contenedor className="relative z-10">
        {/* balance reparte las dos líneas en que cae a 375px; sin esto queda
            "empresas" sola en el segundo renglón. */}
        <p className="kicker [text-wrap:balance]">
          {SITIO.nombre} · desarrollo de agentes y automatización
        </p>

        <h1 className="titular mt-8 max-w-[16ch] text-[clamp(2.25rem,10.5vw,4.75rem)]">
          Procesos que hoy hace <PalabraCinetica palabras={QUIEN_LO_HACE} />,
          hechos por software.
        </h1>

        <p className="mt-10 max-w-[44ch] text-[16px] leading-relaxed text-tinta-2 sm:text-[17px]">
          Trabajamos sobre procesos que ya existen en la empresa y los pasamos a
          software. El alcance se define antes de empezar.
        </p>

        {/* Las dos salidas del hero. El Klein es para la principal. */}
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#diagnostico"
            className="
              inline-flex min-h-[52px] items-center bg-klein px-7 text-[15px]
              text-superficie transition-opacity duration-100
              hover:opacity-90 active:opacity-75
            "
          >
            Analizar mi proceso
          </a>
          <a
            href="#demostracion"
            className="
              inline-flex min-h-[52px] items-center text-[15px] text-tinta
              underline decoration-linea underline-offset-[6px]
              transition-colors duration-100
              hover:decoration-tinta-2 active:opacity-55
            "
          >
            Ver cómo funciona
          </a>
        </div>

        {/* Lo que el visitante necesita saber antes de decidir si sigue
            leyendo. Son las tres condiciones que más pesan, dichas en una
            línea; las seis completas están en la sección de condiciones. */}
        <p className="mt-8 max-w-[52ch] text-[13px] leading-relaxed text-tinta-2">
          Diagnóstico sin costo · pago único, sin suscripción · el código queda
          a nombre de la empresa
        </p>
      </Contenedor>
    </header>
  );
}
