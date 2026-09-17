/**
 * /casos/<slug> — EL DETALLE DE UN CASO
 *
 * POR QUÉ UNA PÁGINA Y NO UN MODAL NI UN ACORDEÓN
 *
 * La home ya es larga, y un caso contado entero son cinco bloques. Metido
 * adentro de una tarjeta que se expande, el visitante pierde el hilo del
 * recorrido; metido en un modal, el caso no tiene URL y no se puede mandar por
 * mensaje, que es exactamente lo que se hace con un caso ("mirá lo que hicimos
 * para Medex"). Con una ruta propia, cada caso se comparte, se indexa y vuelve
 * al lugar del que salió.
 *
 * Tres casos no justifican un CMS: los datos viven en src/lib/casos.ts y esta
 * ruta se prerenderiza entera en build desde ese arreglo. Agregar un caso es
 * agregar un objeto; no hay que tocar este archivo.
 *
 * El orden de los bloques está pensado para que el video de Medex caiga
 * temprano: problema → qué construimos → GRABACIÓN → antes y ahora → resultado.
 * Una grabación real del agente trabajando convence más que las tres secciones
 * que vienen después, así que no se esconde al pie.
 *
 * Numeración propia, como /referidos: es su propio expediente y empieza en 01.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Seccion, { Contenedor } from "@/components/Seccion";
import Marca from "@/components/marca/Marca";
import TitularRevelado from "@/components/TitularRevelado";
import PieDePagina from "@/components/PieDePagina";
import Boton from "@/components/ui/Boton";
import VideoCaso from "@/components/casos/VideoCaso";
import { CASOS, casoPorSlug, type Flujo } from "@/lib/casos";

/** Las tres rutas se prerenderizan en build. No hay caso que no conozcamos. */
export function generateStaticParams() {
  return CASOS.map((caso) => ({ slug: caso.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = casoPorSlug(slug);
  if (!caso) return { title: "Caso no encontrado", robots: { index: false } };

  return {
    title: `${caso.cliente} · caso`,
    description: caso.resumen,
    alternates: { canonical: `/casos/${caso.slug}` },
    openGraph: {
      type: "article",
      title: `${caso.cliente} · caso`,
      description: caso.resumen,
      url: `/casos/${caso.slug}`,
    },
  };
}

/**
 * El flujo, como cadena. Cinco palabras con flechas dicen más que un párrafo,
 * y en un teléfono envuelven sin romper nada: es una lista con separadores,
 * no un diagrama de ancho fijo.
 */
function Cadena({ pasos }: { pasos: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {pasos.map((paso, i) => (
        <li key={paso} className="flex items-center gap-2">
          {i > 0 ? (
            <span aria-hidden="true" className="text-[13px] text-tinta-2">
              →
            </span>
          ) : null}
          <span className="chip chip-superficie">{paso}</span>
        </li>
      ))}
    </ol>
  );
}

/** Un proceso: cómo se hacía y cómo corre. Las dos cosas, una al lado de la otra. */
function AntesYAhora({ flujo }: { flujo: Flujo }) {
  return (
    <div className="hairline hairline-t py-8">
      <h3 className="font-serif text-[19px] leading-tight sm:text-[21px]">
        {flujo.titulo}
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
        <div>
          <p className="kicker kicker-tinta">Antes</p>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-tinta-2">
            {flujo.antes}
          </p>
        </div>

        <div>
          <p className="kicker">Ahora</p>
          <div className="mt-3">
            <Cadena pasos={flujo.pasos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PaginaDeCaso({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caso = casoPorSlug(slug);
  if (!caso) notFound();

  const otros = CASOS.filter((otro) => otro.slug !== caso.slug);

  return (
    <>
      {/* Barra mínima. Esta página no es un recorrido: el único enlace es la
          vuelta a la sección de la que se llegó. */}
      <div className="hairline hairline-b">
        <Contenedor>
          <div className="flex h-12 items-center justify-between gap-6 sm:h-14">
            <div className="flex h-12 items-center sm:h-14">
              <Marca />
            </div>
            <Link
              href="/#casos"
              className="nav-enlace flex h-12 items-center sm:h-14"
            >
              Volver a los casos
            </Link>
          </div>
        </Contenedor>
      </div>

      <main>
        {/* Portada del caso: quién, de qué rubro y qué cambió. */}
        <header className="relative overflow-clip pb-14 pt-14 sm:pb-16 sm:pt-20">
          <Contenedor className="relative z-10">
            <p className="kicker">Caso real · {caso.cliente}</p>

            <h1 className="titular mt-8 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3.25rem)]">
              {caso.resumen}
            </h1>

            <p className="mt-8 max-w-[48ch] text-[16px] leading-relaxed text-tinta-2 sm:text-[17px]">
              {caso.construido}
            </p>

            <ul className="mt-8 flex flex-wrap gap-1.5">
              <li>
                <span className="chip">{caso.industria}</span>
              </li>
              <li>
                <span className="chip">{caso.tipo}</span>
              </li>
            </ul>
          </Contenedor>
        </header>

        {/* 01 · Qué estaba pasando. */}
        <Seccion id="problema" numero="01" kicker="El problema" superficie>
          <div className="pb-16 pt-2 sm:pb-20">
            <TitularRevelado
              como="h2"
              className="titular max-w-[20ch] text-[clamp(1.5rem,6vw,2.4rem)]"
            >
              El problema
            </TitularRevelado>

            <div className="mt-8 max-w-[58ch] space-y-4">
              {caso.problema.map((parrafo) => (
                <p
                  key={parrafo}
                  className="text-[15px] leading-relaxed text-tinta sm:text-[16px]"
                >
                  {parrafo}
                </p>
              ))}
            </div>
          </div>
        </Seccion>

        {/* 02 · La solución, y enseguida la grabación si existe. */}
        <Seccion id="solucion" numero="02" kicker="Qué construimos">
          <div className="pb-16 pt-2 sm:pb-20">
            <TitularRevelado
              como="h2"
              className="titular max-w-[22ch] text-[clamp(1.5rem,6vw,2.4rem)]"
            >
              Qué construimos
            </TitularRevelado>

            <div className="mt-10 hairline hairline-b">
              {caso.etapas.map((etapa, i) => (
                <div key={etapa.titulo} className="hairline hairline-t py-7">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    {caso.etapas.length > 1 ? (
                      <span className="kicker kicker-tinta">
                        Etapa {String(i + 1).padStart(2, "0")}
                      </span>
                    ) : null}
                    <h3 className="font-serif text-[21px] leading-tight sm:text-[23px]">
                      {etapa.titulo}
                    </h3>
                    {/* Lo que está a mitad de camino se dice que está a mitad
                        de camino. */}
                    {etapa.estado === "en curso" ? (
                      <span className="chip">En curso</span>
                    ) : null}
                  </div>

                  <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-tinta">
                    {etapa.detalle}
                  </p>

                  <ul className="mt-5 max-w-[58ch]">
                    {etapa.puntos.map((punto) => (
                      <li
                        key={punto}
                        className="flex gap-3 py-1 text-[14px] leading-relaxed text-tinta-2"
                      >
                        <span aria-hidden="true" className="select-none">
                          ·
                        </span>
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* La grabación, acá arriba y no al pie. Si no hay archivo, no
                dibuja nada. */}
            <VideoCaso media={caso.media} />
          </div>
        </Seccion>

        {/* 03 · El flujo, y la comparación con cómo se hacía. */}
        <Seccion id="flujo" numero="03" kicker="Antes y ahora" superficie>
          <div className="pb-16 pt-2 sm:pb-20">
            <TitularRevelado
              como="h2"
              className="titular max-w-[20ch] text-[clamp(1.5rem,6vw,2.4rem)]"
            >
              Cómo funciona
            </TitularRevelado>

            <div className="mt-10">
              {caso.flujos.map((flujo) => (
                <AntesYAhora key={flujo.titulo} flujo={flujo} />
              ))}
              <div className="hairline hairline-t" aria-hidden="true" />
            </div>
          </div>
        </Seccion>

        {/* 04 · Qué cambió, y la cita del cliente si tenemos el texto exacto. */}
        <Seccion id="resultado" numero="04" kicker="Resultado">
          <div className="pb-16 pt-2 sm:pb-20">
            <TitularRevelado
              como="h2"
              className="titular max-w-[20ch] text-[clamp(1.5rem,6vw,2.4rem)]"
            >
              Resultado
            </TitularRevelado>

            <div className="mt-8 max-w-[56ch] space-y-4">
              {caso.resultado.map((linea) => (
                <p
                  key={linea}
                  className="font-serif text-[18px] leading-snug sm:text-[19px]"
                >
                  {linea}
                </p>
              ))}
            </div>

            {/* El testimonio solo existe si tenemos las palabras exactas.
                Una cita se publica entera o no se publica, así que lo que se
                adapta es el cuerpo: cuatro palabras piden tamaño de bajada y
                cincuenta piden tamaño de lectura. A 26px, la de Sol serían
                siete renglones de display y se leería como un muro. */}
            {caso.testimonio?.cita ? (
              <figure className="hairline hairline-t mt-10 pt-8">
                <blockquote
                  className={
                    caso.testimonio.cita.length > 120
                      ? "max-w-[54ch] font-serif text-[18px] leading-relaxed sm:text-[20px]"
                      : "max-w-[40ch] font-serif text-[22px] leading-snug sm:text-[26px]"
                  }
                >
                  «{caso.testimonio.cita}»
                </blockquote>
                <figcaption className="kicker kicker-tinta mt-4">
                  {caso.testimonio.persona} · {caso.testimonio.rol}
                </figcaption>
              </figure>
            ) : null}

            {/* Sin porcentajes ni horas ahorradas: no se midieron. Decirlo
                cuesta menos que inventar un número que después hay que
                sostener.

                Va al cierre y no antes de la cita: la de Sol empieza diciendo
                lo mismo con sus palabras, y las dos pegadas se leían como un
                tartamudeo. Primero habla el cliente, después aclaramos
                nosotros. */}
            <p className="hairline hairline-t mt-10 max-w-[56ch] pt-6 text-[14px] leading-relaxed text-tinta-2">
              No hay porcentajes de ahorro en esta página porque no se midieron.
              Lo que está escrito acá es lo que el cliente puede confirmar.
            </p>
          </div>
        </Seccion>

        {/* 05 · Con qué está hecho, y la salida. */}
        <Seccion id="integraciones" numero="05" kicker="Integraciones" superficie>
          <div className="pb-16 pt-2 sm:pb-20">
            <TitularRevelado
              como="h2"
              className="titular max-w-[20ch] text-[clamp(1.5rem,6vw,2.4rem)]"
            >
              Con qué está hecho
            </TitularRevelado>

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {caso.herramientas.map((herramienta) => (
                <li key={herramienta}>
                  <span className="chip chip-superficie">{herramienta}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[54ch] text-[15px] leading-relaxed text-tinta-2">
              El software queda en manos del cliente. El detalle de qué se
              entrega y bajo qué condiciones está en{" "}
              <Link
                href="/#condiciones"
                className="text-tinta underline decoration-linea underline-offset-4 transition-colors duration-100 hover:decoration-tinta-2"
              >
                condiciones
              </Link>
              .
            </p>

            <div className="mt-10">
              <Boton href="/#diagnostico">Analizar mi proceso</Boton>
            </div>

            {/* Los otros casos, para el que quiere seguir mirando. */}
            {otros.length > 0 ? (
              <div className="hairline hairline-t mt-14 pt-8">
                <p className="kicker kicker-tinta">Otros casos</p>
                <ul className="mt-5 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                  {otros.map((otro) => (
                    <li key={otro.slug} className="py-3">
                      <Link
                        href={`/casos/${otro.slug}`}
                        className="group flex min-h-[44px] flex-col justify-center"
                      >
                        <span className="font-serif text-[19px] leading-tight transition-opacity duration-100 group-hover:opacity-70">
                          {otro.cliente}
                        </span>
                        <span className="mt-1 max-w-[40ch] text-[14px] leading-relaxed text-tinta-2">
                          {otro.resumen}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Seccion>
      </main>

      <PieDePagina />
    </>
  );
}
