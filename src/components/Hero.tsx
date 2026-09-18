/**
 * SECCIÓN — HERO
 *
 * Es el único H1 del sitio y contesta una sola cosa: qué hacemos.
 *
 * QUÉ SALIÓ DE ACÁ. El hero tenía a la derecha un fragmento de interfaz —una
 * conversación de WhatsApp inventada, con su rótulo aclarando que lo era— que
 * anticipaba la sección de "cómo funciona". Esa sección ya no existe y los
 * casos reales hacen ese trabajo con clientes de verdad, así que el fragmento
 * quedó siendo un ejemplo conceptual arriba de todo. Se fue, y con él la
 * segunda columna: el hero volvió a una sola columna y al cuarto de círculo
 * que entra por el borde derecho.
 *
 * También se fue la línea de "seis preguntas, no se piden datos": la sección
 * 02 está inmediatamente abajo y lo dice ahí, que es donde importa.
 *
 * QUEDAN CUATRO COSAS y ninguna ocupa más de dos renglones: para quién es (la
 * etiqueta), qué hacemos (el titular), cómo (la bajada) y qué hay que hacer
 * para avanzar (los dos botones).
 *
 * APOYO 1 DEL SISTEMA DE MOVIMIENTO — la palabra variable del titular rota en
 * loop dentro de una máscara. El hero nunca está quieto, pero tampoco grita:
 * es una sola palabra moviéndose cada 2,2 segundos.
 */

import { Contenedor } from "@/components/Seccion";
import PalabraCinetica from "@/components/PalabraCinetica";
import { Forma, MarcaAgua } from "@/components/Decoracion";
import Boton from "@/components/ui/Boton";

/**
 * Las tres figuras que hoy hacen el trabajo. Van de lo genérico a lo concreto,
 * y la vuelta cierra volviendo a "una persona", que es la del titular fijo.
 */
const QUIEN_LO_HACE = ["una persona", "una secretaria", "un empleado"];

export default function Hero({ numero }: { numero: string }) {
  return (
    <header
      id="contenido"
      className="relative overflow-clip pb-16 pt-14 sm:pb-24 sm:pt-28"
    >
      <MarcaAgua numero={numero} />
      <Forma variante="hero" />

      <Contenedor className="relative z-10">
        {/* Para quién es esto, en el primer renglón de la página. */}
        <p className="kicker [text-wrap:balance]">
          Desarrollo de software · automatización de procesos para empresas
        </p>

        {/* La coma va pegada a la palabra que rota, dentro del mismo nowrap:
            la máscara es inline-block y de ancho variable, así que sin esto la
            coma se cae sola al renglón siguiente cuando entra una palabra
            larga. */}
        <h1 className="titular mt-7 max-w-[16ch] text-[clamp(2.25rem,9.5vw,4.5rem)]">
          Procesos que hoy hace{" "}
          <span className="whitespace-nowrap">
            <PalabraCinetica palabras={QUIEN_LO_HACE} />,
          </span>{" "}
          hechos por software.
        </h1>

        <p className="mt-8 max-w-[44ch] text-[16px] leading-relaxed text-tinta-2 sm:text-[17px]">
          Analizamos los procesos repetitivos de una empresa y construimos el
          software que los ejecuta.
        </p>

        {/* Las dos salidas del hero. La tinta es para la principal. */}
        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Boton href="#diagnostico">Analizar mi proceso</Boton>
          <Boton href="#casos" tono="lineal">
            Ver casos
          </Boton>
        </div>
      </Contenedor>
    </header>
  );
}
