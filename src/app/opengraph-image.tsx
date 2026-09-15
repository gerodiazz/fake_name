/**
 * IMAGEN DE OPEN GRAPH DEL SITIO
 *
 * La tarjeta genérica, la que se ve cuando alguien comparte la home. Sin
 * número: el número es de cada visitante y vive en /d.
 */

import { ImageResponse } from "next/og";
import { TarjetaOG, TAMANIO_OG, TIPO_OG, cargarFuentes } from "@/lib/imagen-og";
import { SITIO } from "@/lib/sitio";

export const alt =
  "Telesca Justel · Procesos que hoy hace una persona, hechos por software";
export const size = TAMANIO_OG;
export const contentType = TIPO_OG;

export default async function Imagen() {
  return new ImageResponse(
    (
      <TarjetaOG
        kicker={`${SITIO.nombre} · agentes de IA y automatización de procesos`}
        titular="Procesos que hoy hace una persona, hechos por software."
        epigrafe="El sistema queda instalado y es de la empresa."
        pie={SITIO.nombre}
      />
    ),
    { ...size, fonts: await cargarFuentes() },
  );
}
