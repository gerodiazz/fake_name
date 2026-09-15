/**
 * /referidos — PROGRAMA DE REFERIDOS
 *
 * POR QUÉ ES UNA PÁGINA Y NO UNA SECCIÓN DE LA HOME
 *
 * Son dos funnels distintos. La home le habla a la empresa que tiene el
 * proceso hecho a mano; esta página le habla a quien puede presentarla y no
 * va a contratar nada. Cuando el programa vivía en el medio de la home, la
 * página tenía que vender las dos cosas a la vez y el visitante que venía a
 * automatizar su empresa se encontraba, entre "cómo trabajamos" y "quiénes
 * somos", con una oferta que no era para él.
 *
 * El enganche sigue existiendo donde corresponde: al terminar el diagnóstico,
 * a quien el caso no le sirve para su propia empresa pero sí conoce a alguien.
 * Ese bloque ahora enlaza acá.
 *
 * Numeración propia: es su propio expediente, empieza en 01.
 *
 * Ningún monto está escrito en este archivo: todo sale de REFERIDOS.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Seccion, { Contenedor } from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import PieDePagina from "@/components/PieDePagina";
import Calculadora from "@/components/referidos/Calculadora";
import FormularioReferidos from "@/components/referidos/FormularioReferidos";
import { REFERIDOS, enDolares } from "@/lib/referidos";
import { SITIO } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Programa de referidos",
  description: `Se pagan ${enDolares(
    REFERIDOS.porCliente,
  )} por cada empresa referida que firma. Abierto a cualquiera, sea cliente o no.`,
  alternates: { canonical: "/referidos" },
};

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

export default function ProgramaDeReferidos() {
  return (
    <>
      {/* Barra mínima: esta página no tiene índice porque no es un recorrido.
          El único enlace es la vuelta al sitio. */}
      <div className="hairline hairline-b">
        <Contenedor>
          <div className="flex h-12 items-center justify-between gap-6 sm:h-14">
            {/* El alto completo de la barra, no el de la línea de texto: es
                un blanco de 48px para el pulgar, no de 19. */}
            <Link
              href="/"
              className="flex h-12 items-center font-serif text-[19px] leading-none sm:h-14"
            >
              {SITIO.nombre}
            </Link>
            <Link
              href="/"
              className="nav-enlace flex h-12 items-center sm:h-14"
            >
              Volver al sitio
            </Link>
          </div>
        </Contenedor>
      </div>

      <main>
        {/* 01 · Qué es */}
        <header className="relative overflow-clip pb-16 pt-14 sm:pb-20 sm:pt-20">
          <Contenedor className="relative z-10">
            <p className="kicker">01 · Programa de referidos</p>
            <h1 className="titular mt-8 max-w-[17ch] text-[clamp(2rem,9vw,4rem)]">
              {enDolares(REFERIDOS.porCliente)} por cada empresa que firma.
            </h1>
            <p className="mt-8 max-w-[46ch] text-[16px] leading-relaxed text-tinta-2 sm:text-[17px]">
              Abierto a cualquiera, sea cliente o no. Se paga por cliente que
              firma, no por contacto presentado. Quien refiere no vende nada:
              el diagnóstico y la propuesta los hacemos nosotros.
            </p>
            <div className="mt-10">
              <a
                href="#alta"
                className="boton boton-klein"
              >
                Quiero referir
              </a>
            </div>
          </Contenedor>
        </header>

        {/* 02 · Cómo funciona */}
        <Seccion id="mecanica" numero="02" kicker="Cómo funciona" superficie>
          <div className="pb-16 pt-2 sm:pb-24">
            <TitularRevelado
              como="h2"
              className="titular max-w-[18ch] text-[clamp(1.75rem,7.5vw,3rem)]"
            >
              Cómo funciona
            </TitularRevelado>

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
          </div>
        </Seccion>

        {/* 03 · La calculadora */}
        <Seccion id="calculo" numero="03" kicker="Cálculo" aire>
          <div className="pb-16 pt-2 sm:pb-24">
            <TitularRevelado
              como="h2"
              className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
            >
              Cuánto se cobra
            </TitularRevelado>
            <div className="mt-10">
              <Calculadora />
            </div>
          </div>
        </Seccion>

        {/* 04 · Alta */}
        <Seccion id="alta" numero="04" kicker="Alta al programa" superficie>
          <div className="pb-16 pt-2 sm:pb-24">
            <TitularRevelado
              como="h2"
              className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
            >
              Alta al programa
            </TitularRevelado>
            <div className="mt-10">
              <FormularioReferidos />
            </div>

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
      </main>

      <PieDePagina />
    </>
  );
}
