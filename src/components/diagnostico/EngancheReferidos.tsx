"use client";

/**
 * ENGANCHE DE REFERIDOS — vive dentro de la sección 02, debajo del resultado.
 *
 * Aquí no se explica el programa completo (eso es /referidos, que tiene su
 * propia página): se ofrece el atajo y el monto.
 *
 * El botón de compartir arma un mensaje de WhatsApp con el resultado y el
 * código de referido. El enlace incluido apunta a /d, una página que genera
 * su propia imagen de preview con el número grande, el rubro y la marca.
 */

import { useState } from "react";
import Link from "next/link";
import { REFERIDOS, enDolares } from "@/lib/referidos";

type Props = {
  /** Horas recuperadas por año que salieron del diagnóstico. */
  horas: number;
  /** Nombre visible del rubro elegido. */
  rubro: string;
  /** Id del rubro, para reconstruir la vista compartida. */
  rubroId: string;
  /** Cantidad de procesos marcados. */
  procesos: number;
  /** Código de referido de esta visita. */
  codigo: string;
};

/** Arma el enlace compartible con el resultado embebido. */
function armarEnlace({
  horas,
  rubroId,
  procesos,
  codigo,
}: Omit<Props, "rubro">): string {
  // En el servidor no hay origin; el botón solo existe en el cliente.
  const base = typeof window === "undefined" ? "" : window.location.origin;
  const parametros = new URLSearchParams({
    h: String(horas),
    r: rubroId,
    p: String(procesos),
    c: codigo,
  });
  return `${base}/d?${parametros.toString()}`;
}

export default function EngancheReferidos({
  horas,
  rubro,
  rubroId,
  procesos,
  codigo,
}: Props) {
  const [copiado, setCopiado] = useState(false);

  /** Mensaje listo para pegar en WhatsApp. */
  function armarMensaje(): string {
    const enlace = armarEnlace({ horas, rubroId, procesos, codigo });
    return [
      `Diagnóstico para ${rubro.toLowerCase()}: ${horas.toLocaleString("es")} horas anuales involucradas en ${procesos} ${
        procesos === 1 ? "proceso" : "procesos"
      } que hoy se hacen a mano.`,
      "Es una estimación sobre promedios del rubro.",
      `El detalle está aquí: ${enlace}`,
      `Código de referido: ${codigo}`,
    ].join("\n\n");
  }

  function compartirPorWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(armarMensaje())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function copiarEnlace() {
    try {
      await navigator.clipboard.writeText(armarMensaje());
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2400);
    } catch {
      // Sin permiso de portapapeles no hacemos nada: queda WhatsApp.
    }
  }

  return (
    <div className="hairline hairline-t mt-12 pt-8">
      <p className="max-w-[46ch] font-serif text-[19px] leading-snug text-tinta sm:text-[21px]">
        Si el caso no es propio pero sí el de alguien conocido: el programa paga{" "}
        {enDolares(REFERIDOS.porCliente)} por cada cliente que cierre.
      </p>

      <div className="mt-5 flex flex-col items-start gap-1">
        <button
          type="button"
          onClick={compartirPorWhatsApp}
          className="
            inline-flex min-h-[44px] items-center font-serif text-[19px]
            leading-none text-tinta underline decoration-linea
            decoration-[1.5px] underline-offset-[7px]
            transition-[opacity,transform] duration-100
            hover:decoration-tinta-2 active:opacity-55
          "
        >
          Comparte este diagnóstico
        </button>

        <button
          type="button"
          onClick={copiarEnlace}
          className="
            inline-flex min-h-[44px] items-center text-[13px] lowercase
            text-tinta-2 transition-[opacity,transform] duration-100
            hover:text-tinta active:opacity-55
          "
        >
          {copiado ? "copiado" : "copiar el mensaje"}
        </button>
      </div>

      <p className="mt-4 text-[13px] text-tinta-2">
        Código de esta visita:{" "}
        <span className="tabular-nums text-tinta">{codigo || "—"}</span>
      </p>

      {/* A la página del programa, donde está toda la mecánica. */}
      <Link
        href="/referidos"
        className="
          mt-5 inline-flex min-h-[44px] items-center gap-2 text-[13px]
          text-tinta-2 transition-[opacity,transform] duration-100
          hover:text-tinta active:opacity-55
        "
      >
        <span aria-hidden="true">→</span>
        Cómo funciona el programa de referidos
      </Link>
    </div>
  );
}
