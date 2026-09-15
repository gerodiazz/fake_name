/**
 * IMAGEN DE PREVIEW DEL DIAGNÓSTICO COMPARTIDO
 *
 * Es la que arma el enganche de referidos: cuando alguien manda su resultado
 * por WhatsApp, esto es lo que se ve en la burbuja del mensaje. Lleva el
 * número grande, el rubro y el nombre de fakename.
 *
 * Parámetros: ?h=horas&r=idDeRubro&p=procesos
 */

import { ImageResponse } from "next/og";
import { TarjetaOG, TAMANIO_OG, cargarFuentes } from "@/lib/imagen-og";
import { buscarRubro } from "@/lib/diagnostico";
import { SITIO } from "@/lib/sitio";

// Necesita Node: las fuentes se leen del sistema de archivos.
export const runtime = "nodejs";

export async function GET(peticion: Request) {
  const { searchParams } = new URL(peticion.url);

  // Los parámetros vienen de una URL compartida, así que se saneam todos:
  // se acotan a números razonables y el rubro se valida contra la lista.
  const horas = Math.max(
    0,
    Math.min(999_999, Number(searchParams.get("h")) || 0),
  );
  const procesos = Math.max(
    0,
    Math.min(99, Number(searchParams.get("p")) || 0),
  );
  const rubro = buscarRubro(searchParams.get("r"));

  const epigrafe = procesos
    ? `horas anuales involucradas en ${procesos} ${procesos === 1 ? "proceso" : "procesos"} hechos a mano.`
    : "horas anuales involucradas en procesos manuales.";

  return new ImageResponse(
    (
      <TarjetaOG
        kicker={`${SITIO.nombre} · diagnóstico`}
        numero={horas.toLocaleString("es")}
        epigrafe={epigrafe}
        pie={rubro ? rubro.nombre : "Diagnóstico de procesos"}
      />
    ),
    { ...TAMANIO_OG, fonts: await cargarFuentes() },
  );
}
