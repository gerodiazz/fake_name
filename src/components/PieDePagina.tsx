/**
 * CIERRE DEL SITIO
 *
 * Franja mínima: la marca, qué hace el estudio y el año. Nada de navegación
 * duplicada ni enlaces a redes vacías.
 *
 * El único enlace es el del programa de referidos, y está acá a propósito: el
 * programa salió de la home para no competir con el funnel del cliente, así
 * que el pie es el lugar donde alguien que no vino a contratar puede
 * encontrarlo.
 */

import Link from "next/link";
import { Contenedor } from "@/components/Seccion";
import { SITIO } from "@/lib/sitio";

export default function PieDePagina() {
  return (
    <footer className="hairline hairline-t bg-superficie">
      <Contenedor>
        <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-serif text-[19px]">{SITIO.nombre}</p>
          <p className="text-[13px] text-tinta-2">
            Desarrollo de agentes de IA y automatización de procesos.
          </p>
          <Link
            href="/referidos"
            className="inline-flex min-h-[44px] items-center text-[13px] text-tinta-2 underline decoration-linea underline-offset-4 transition-colors duration-100 hover:text-tinta hover:decoration-tinta-2"
          >
            Programa de referidos
          </Link>
          <p className="text-[13px] tabular-nums text-tinta-2">
            {new Date().getFullYear()}
          </p>
        </div>
      </Contenedor>
    </footer>
  );
}
