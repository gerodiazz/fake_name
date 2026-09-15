/**
 * 404
 *
 * Una línea y la salida. El sitio tiene una sola página real: acá no hay nada
 * que buscar ni un mapa que ofrecer.
 */

import type { Metadata } from "next";
import { Contenedor } from "@/components/Seccion";
import PieDePagina from "@/components/PieDePagina";
import { SITIO } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NoEncontrada() {
  return (
    <>
      <main className="pb-20 pt-10 sm:pt-16">
        <Contenedor>
          <p className="kicker">{SITIO.nombre} · 404</p>

          <h1 className="titular mt-8 max-w-[18ch] text-[clamp(1.75rem,7.5vw,3rem)]">
            Esta página no existe.
          </h1>

          <a href="/" className="boton boton-principal mt-8">
            Ir al inicio
          </a>
        </Contenedor>
      </main>

      <PieDePagina />
    </>
  );
}
