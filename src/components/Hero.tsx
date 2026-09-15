/**
 * SECCIÓN 01 — HERO
 *
 * Es el único H1 del sitio.
 *
 * COMPOSICIÓN — dos columnas de 1024px para arriba: a la izquierda la
 * jerarquía completa (etiqueta, titular, explicación, dos acciones), a la
 * derecha un fragmento de la interfaz. Apiladas más abajo, y en ese orden: el
 * visual entra después de los botones, para que en un teléfono la primera
 * pantalla siga siendo titular + acción.
 *
 * El cuarto de círculo que entraba por el borde derecho se fue: ese era
 * el lugar del fragmento de producto. Cambiar un adorno por un pedazo de la
 * cosa que vendemos es exactamente el criterio del sitio, y además el hero
 * pasa a anticipar la sección 02 en vez de solo anunciarla.
 *
 * EL HERO CONTESTA CUATRO COSAS y ninguna ocupa más de una línea: qué hacemos
 * (el titular), para quién (la etiqueta), qué recibe el cliente (la bajada) y
 * qué hay que hacer para avanzar (los dos botones).
 *
 * APOYO 1 DEL SISTEMA DE MOVIMIENTO — la palabra variable del titular rota en
 * loop dentro de una máscara. El hero nunca está quieto, pero tampoco grita:
 * es una sola palabra moviéndose cada 2,2 segundos.
 */

import { Contenedor } from "@/components/Seccion";
import PalabraCinetica from "@/components/PalabraCinetica";
import { MarcaAgua } from "@/components/Decoracion";
import FragmentoProducto from "@/components/demostracion/FragmentoProducto";
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
      className="relative overflow-clip pb-16 pt-14 sm:pb-24 sm:pt-24"
    >
      <MarcaAgua numero={numero} />

      <Contenedor className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start lg:gap-16">
          {/* ---- la columna de texto ---- */}
          <div>
            {/* Para quién es esto, en el primer renglón de la página. */}
            <p className="kicker [text-wrap:balance]">
              Desarrollo de software · automatización de procesos para empresas
            </p>

            {/* La coma va pegada a la palabra que rota, dentro del mismo
                nowrap: la máscara es inline-block y de ancho variable, así que
                sin esto la coma se cae sola al renglón siguiente cuando entra
                una palabra larga. */}
            <h1 className="titular mt-7 max-w-[16ch] text-[clamp(2.25rem,9.5vw,4.5rem)]">
              Procesos que hoy hace{" "}
              <span className="whitespace-nowrap">
                <PalabraCinetica palabras={QUIEN_LO_HACE} />,
              </span>{" "}
              hechos por software.
            </h1>

            <p className="mt-8 max-w-[46ch] text-[16px] leading-relaxed text-tinta-2 sm:text-[17px]">
              Analizamos procesos que hoy dependen de personas, mensajes,
              planillas o sistemas separados, y construimos el software que se
              encarga de ese trabajo.
            </p>

            {/* Las dos salidas del hero. La tinta es para la principal. */}
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Boton href="#diagnostico">Analizar mi proceso</Boton>
              <Boton href="#como-funciona" tono="lineal">
                Ver cómo funciona
              </Boton>
            </div>

            {/* Qué pasa si toca el botón principal. Va pegado a los botones:
                es lo que baja la fricción de tocarlo. */}
            <p className="mt-5 max-w-[44ch] text-[13px] leading-relaxed text-tinta-2">
              Seis preguntas. No se piden datos de contacto para ver el
              resultado.
            </p>
          </div>

          {/* ---- el fragmento de producto ---- */}
          <div className="lg:pt-2">
            <FragmentoProducto />
          </div>
        </div>

        {/* Las tres condiciones que más pesan, dichas en una línea; las seis
            completas están en la sección de condiciones. */}
        <p className="hairline hairline-t mt-12 max-w-[56ch] pt-5 text-[13px] leading-relaxed text-tinta-2 lg:mt-14">
          Diagnóstico sin costo · pago único, sin suscripción · el código queda
          a nombre de la empresa
        </p>
      </Contenedor>
    </header>
  );
}
