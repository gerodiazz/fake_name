/**
 * CIERRE DEL SITIO
 *
 * Franja mínima debajo de la sección 07: la marca, qué hace el estudio y el
 * año. Nada de navegación duplicada ni enlaces a redes vacías.
 */

import { Contenedor } from "@/components/Seccion";
import { SITIO } from "@/lib/sitio";

export default function PieDePagina() {
  return (
    <footer className="hairline hairline-t bg-superficie">
      <Contenedor>
        <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-serif text-[19px]">{SITIO.nombre}</p>
          <p className="text-[13px] text-tinta-2">
            Desarrollo de agentes de IA y automatización de procesos.
          </p>
          <p className="text-[13px] tabular-nums text-tinta-2">
            {new Date().getFullYear()}
          </p>
        </div>
      </Contenedor>
    </footer>
  );
}
