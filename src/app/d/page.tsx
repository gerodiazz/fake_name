/**
 * /d — DIAGNÓSTICO COMPARTIDO
 *
 * La página que se abre cuando alguien recibe un diagnóstico por WhatsApp.
 * No es una copia de la home: muestra el número que le mandaron, explica de
 * dónde sale y ofrece hacer el propio.
 *
 * Los parámetros vienen de un enlace que cualquiera puede editar, así que se
 * validan: las horas se acotan, el rubro se busca en la lista y el código de
 * referido se limpia antes de mostrarse.
 *
 * No se indexa: son resultados de personas, no contenido del sitio.
 */

import type { Metadata } from "next";
import NumeroGigante from "@/components/NumeroGigante";
import { Contenedor } from "@/components/Seccion";
import PieDePagina from "@/components/PieDePagina";
import { buscarRubro } from "@/lib/diagnostico";
import { SITIO } from "@/lib/sitio";

type Parametros = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Toma el primer valor si el parámetro vino repetido en la URL. */
function primero(valor: string | string[] | undefined): string | null {
  if (Array.isArray(valor)) return valor[0] ?? null;
  return valor ?? null;
}

/** Saneamiento común a la metadata y al render. */
async function leerParametros(searchParams: Parametros["searchParams"]) {
  const params = await searchParams;

  const horas = Math.max(
    0,
    Math.min(999_999, Number(primero(params.h)) || 0),
  );
  const procesos = Math.max(0, Math.min(99, Number(primero(params.p)) || 0));
  const rubro = buscarRubro(primero(params.r));
  // El código se muestra en pantalla: solo letras, números y guión.
  const codigo = (primero(params.c) ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 12);

  return { horas, procesos, rubro, codigo };
}

export async function generateMetadata({
  searchParams,
}: Parametros): Promise<Metadata> {
  const { horas, procesos, rubro } = await leerParametros(searchParams);

  const titulo = horas
    ? `${horas.toLocaleString("es")} horas anuales en procesos manuales`
    : "Diagnóstico de procesos";

  // La imagen se genera al vuelo con los mismos parámetros.
  const imagen = `/api/og?h=${horas}&p=${procesos}&r=${rubro?.id ?? ""}`;

  return {
    title: titulo,
    description: rubro
      ? `Diagnóstico para ${rubro.nombre.toLowerCase()}. ${SITIO.descripcion}`
      : SITIO.descripcion,
    // Resultados de una persona: no van al índice de búsqueda.
    robots: { index: false, follow: false },
    openGraph: {
      title: titulo,
      description: SITIO.descripcion,
      images: [{ url: imagen, width: 1200, height: 630, alt: titulo }],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      images: [imagen],
    },
  };
}

export default async function DiagnosticoCompartido({
  searchParams,
}: Parametros) {
  const { horas, procesos, rubro, codigo } = await leerParametros(searchParams);

  return (
    <>
      <main className="pb-20 pt-10 sm:pt-16">
        <Contenedor>
          <p className="kicker">{SITIO.nombre} · diagnóstico compartido</p>

          {horas > 0 ? (
            <div className="mt-8">
              <NumeroGigante
                valor={horas}
                animado
                etiqueta={`${horas.toLocaleString("es")} horas anuales involucradas en estos procesos`}
              />
              <p className="mt-5 max-w-[26ch] font-serif text-[21px] leading-snug sm:text-[24px]">
                horas anuales involucradas en estos procesos.
              </p>
            </div>
          ) : (
            <h1 className="titular mt-8 max-w-[16ch] text-[clamp(2rem,9vw,3.5rem)]">
              Procesos que hoy hace una persona, hechos por software.
            </h1>
          )}

          {/* Los datos del diagnóstico que llegó, si vinieron en el enlace. */}
          {rubro || procesos > 0 ? (
            <dl className="grilla-expuesta grilla-expuesta-sm mt-10 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-3">
              {rubro ? (
                <div className="py-5 sm:px-5">
                  <dt className="kicker kicker-tinta">Rubro</dt>
                  <dd className="mt-2 font-serif text-[21px] leading-tight">
                    {rubro.nombre}
                  </dd>
                </div>
              ) : null}
              {procesos > 0 ? (
                <div className="py-5 sm:px-5">
                  <dt className="kicker kicker-tinta">Procesos</dt>
                  <dd className="mt-2 font-serif text-[21px] leading-tight tabular-nums">
                    {procesos}
                  </dd>
                </div>
              ) : null}
              <div className="py-5 sm:px-5">
                <dt className="kicker kicker-tinta">Alcance</dt>
                <dd className="mt-2 font-serif text-[21px] leading-tight">
                  Cerrado por escrito
                </dd>
              </div>
            </dl>
          ) : null}

          <p className="mt-10 max-w-[48ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
            El número sale de seis preguntas sobre cómo se trabaja hoy y es una
            estimación sobre promedios del rubro. Trabajamos sobre procesos que
            ya existen en la empresa y los pasamos a software. El sistema queda
            instalado y es de la empresa.
          </p>

          {/* El visitante que llega acá todavía no hizo el suyo: ese es el
              único llamado a la acción de esta página. */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="/#diagnostico"
              className="
                inline-flex min-h-[52px] items-center bg-klein px-7 text-[15px]
                text-superficie transition-opacity duration-100
                hover:opacity-90 active:opacity-75
              "
            >
              Hacer el diagnóstico
            </a>
            <a
              href="/referidos"
              className="min-h-[44px] inline-flex items-center text-[13px] lowercase text-tinta-2 transition-opacity duration-100 hover:text-tinta active:opacity-55"
            >
              cómo funciona el programa de referidos
            </a>
          </div>

          {codigo ? (
            <p className="hairline hairline-t mt-10 pt-6 text-[13px] text-tinta-2">
              Este diagnóstico llegó con el código{" "}
              <span className="tabular-nums text-tinta">{codigo}</span>. Si la
              empresa firma, quien lo compartió cobra su comisión.
            </p>
          ) : null}
        </Contenedor>
      </main>

      <PieDePagina />
    </>
  );
}
