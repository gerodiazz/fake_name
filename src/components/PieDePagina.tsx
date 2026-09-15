/**
 * CIERRE DEL SITIO
 *
 * La firma de la marca, una línea de qué hace el estudio, el contacto y el
 * año. Nada de navegación duplicada ni enlaces a redes vacías.
 *
 * El monograma va grande y solo, arriba de todo: es el único lugar del sitio
 * donde la marca se muestra sin tener que compartir el renglón, y es lo último
 * que ve quien llegó hasta abajo.
 *
 * El enlace a referidos está acá a propósito: el programa salió de la home
 * para no competir con el funnel del cliente, así que el pie es donde alguien
 * que no vino a contratar puede encontrarlo.
 */

import Link from "next/link";
import { Contenedor } from "@/components/Seccion";
import { Monograma, Wordmark } from "@/components/marca/Marca";
import { SITIO } from "@/lib/sitio";

export default function PieDePagina() {
  return (
    <footer className="hairline hairline-t bg-superficie">
      <Contenedor>
        <div className="py-12 sm:py-14">
          {/* La firma. */}
          <div className="flex items-center gap-4">
            <Monograma
              className="h-8 w-8 shrink-0 text-tinta"
              trazo={2.2}
              titulo="Telesca Justel"
            />
            <Wordmark className="text-[13px] text-tinta" />
          </div>

          <p className="mt-5 max-w-[34ch] font-serif text-[18px] leading-snug sm:text-[19px]">
            Software para procesos empresariales reales.
          </p>

          {/* Contacto, navegación y año. Tres columnas en desktop, apiladas
              abajo de sm. */}
          <div className="hairline hairline-t mt-10 flex flex-col gap-6 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <a
              href={`mailto:${SITIO.email}`}
              className="text-[13px] text-tinta-2 underline decoration-linea underline-offset-4 transition-colors duration-100 hover:text-tinta hover:decoration-tinta-2"
            >
              {SITIO.email}
            </a>

            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Pie">
              <a
                href="/#diagnostico"
                className="text-[13px] text-tinta-2 transition-colors duration-100 hover:text-tinta"
              >
                Diagnóstico
              </a>
              <a
                href="/#contacto"
                className="text-[13px] text-tinta-2 transition-colors duration-100 hover:text-tinta"
              >
                Agendar
              </a>
              <Link
                href="/referidos"
                className="text-[13px] text-tinta-2 transition-colors duration-100 hover:text-tinta"
              >
                Referidos
              </Link>
            </nav>

            <p className="text-[13px] tabular-nums text-tinta-2">
              © {new Date().getFullYear()} {SITIO.nombre}
            </p>
          </div>
        </div>
      </Contenedor>
    </footer>
  );
}
