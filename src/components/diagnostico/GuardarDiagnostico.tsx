"use client";

/**
 * GUARDAR EL DIAGNÓSTICO — el bloque de conversión, después del resultado
 *
 * NO ES UN MURO. El resultado completo ya se vio, entero y gratis, arriba de
 * este bloque: acá no se bloquea nada ni se pide nada para seguir leyendo. La
 * promesa del sitio —"no se piden datos de contacto para ver el resultado"—
 * sigue siendo cierta, y este bloque existe abajo justamente para que lo siga
 * siendo.
 *
 * DOS SALIDAS, UNA SOLA IMPORTANTE. Agendar la llamada es la principal y
 * lleva el resumen del diagnóstico a la agenda. Pedir el reporte por email es
 * la de quien todavía no quiere hablar con nadie, y pide un solo campo: la
 * persona ya contestó seis preguntas, pedirle nombre y empresa otra vez sería
 * cobrarle dos veces el mismo peaje.
 *
 * EL FORMULARIO NO REEMPLAZA AL RESULTADO: aparece debajo del botón y el
 * resultado sigue donde estaba. Nadie pierde lo que acaba de ver por haber
 * tocado un botón.
 *
 * QUÉ SE MANDA AL SERVIDOR: el rubro y las respuestas, no el texto del
 * reporte. El cuerpo del correo se arma del lado del servidor.
 */

import { useState } from "react";
import Boton from "@/components/ui/Boton";
import { useDiagnostico } from "@/lib/estado-diagnostico";
import { enlaceDeAgenda, hayAgenda } from "@/lib/agenda";
import { registrar } from "@/lib/eventos";

type Estado =
  | { tipo: "reposo" }
  | { tipo: "enviando" }
  | { tipo: "enviado" }
  /** El servicio de correo todavía no está configurado. Se dice. */
  | { tipo: "sin-servicio"; reporte: string }
  | { tipo: "error"; mensaje: string };

export default function GuardarDiagnostico() {
  const { rubroId, respuestas, textoLibre, rubro, agentes, resumenParaContacto } =
    useDiagnostico();

  const [abierto, setAbierto] = useState(false);
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<Estado>({ tipo: "reposo" });
  const [copiado, setCopiado] = useState(false);

  /** Lo que se mide es la forma, nunca el contenido ni el email. */
  const contexto = {
    rubro: rubro?.id ?? "",
    procesos: agentes.length,
  };

  function abrirFormulario() {
    setAbierto(true);
    registrar("diagnostic_email_report_clicked", contexto);
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado.tipo === "enviando") return;

    setEstado({ tipo: "enviando" });
    registrar("diagnostic_email_submitted", contexto);

    try {
      const respuesta = await fetch("/api/reporte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rubroId, respuestas, textoLibre }),
      });

      const datos = await respuesta.json().catch(() => ({}));

      if (respuesta.ok) {
        setEstado({ tipo: "enviado" });
        return;
      }

      // El servicio de correo no está configurado todavía. En vez de mentir,
      // se ofrece el reporte para copiarlo: el visitante igual se lo lleva.
      if (respuesta.status === 503 && typeof datos.reporte === "string") {
        setEstado({ tipo: "sin-servicio", reporte: datos.reporte });
        return;
      }

      setEstado({
        tipo: "error",
        mensaje:
          datos.error === "email-invalido"
            ? "Revisá el email: falta el @ o el dominio."
            : "No se pudo enviar. Probá de nuevo en un momento.",
      });
    } catch {
      setEstado({
        tipo: "error",
        mensaje: "No se pudo enviar. Revisá la conexión y probá de nuevo.",
      });
    }
  }

  async function copiarReporte(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2400);
    } catch {
      // Sin permiso de portapapeles no se hace nada: el texto está a la vista.
    }
  }

  return (
    <div className="hairline hairline-t mt-12 pt-8">
      <h4 className="font-serif text-[21px] leading-snug sm:text-[24px]">
        ¿Querés guardar este diagnóstico?
      </h4>
      <p className="mt-3 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2">
        Podés recibirlo por email o revisarlo con nosotros en una llamada de 45
        minutos, sin costo.
      </p>

      {/* Las dos salidas. En mobile se apilan a ancho completo. */}
      <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Boton
          href={enlaceDeAgenda(resumenParaContacto())}
          externo={hayAgenda()}
          onClick={() => registrar("diagnostic_call_clicked", contexto)}
        >
          Agendar llamada para revisar este diagnóstico
        </Boton>

        {!abierto && estado.tipo === "reposo" ? (
          <Boton tono="lineal" onClick={abrirFormulario}>
            Enviarme este reporte por email
          </Boton>
        ) : null}
      </div>

      {/* El formulario: un solo campo. Aparece debajo, sin tapar nada. */}
      {abierto ? (
        <form onSubmit={enviar} className="mt-8 max-w-[26rem]">
          <label htmlFor="reporte-email" className="kicker kicker-tinta block">
            Email
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end">
            <input
              id="reporte-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (estado.tipo === "error") setEstado({ tipo: "reposo" });
              }}
              placeholder="nombre@empresa.com"
              disabled={estado.tipo === "enviando" || estado.tipo === "enviado"}
              className="campo hairline hairline-b w-full bg-transparent pb-2 text-[16px] text-tinta placeholder:text-tinta-2/60 disabled:opacity-50"
            />
            <Boton
              tono="lineal"
              chico
              type="submit"
              disabled={estado.tipo === "enviando" || estado.tipo === "enviado"}
              className="shrink-0"
            >
              {estado.tipo === "enviando" ? "enviando…" : "Enviar"}
            </Boton>
          </div>

          <p
            className="mt-3 max-w-[44ch] text-[13px] leading-relaxed text-tinta-2"
            aria-live="polite"
          >
            {estado.tipo === "enviado"
              ? "Listo. Te enviamos el diagnóstico a tu email."
              : estado.tipo === "error"
                ? null
                : "Solo el email. No guardamos las respuestas del diagnóstico."}
          </p>

          {estado.tipo === "error" ? (
            <p className="campo-error mt-3 text-[13px]" aria-live="polite">
              {estado.mensaje}
            </p>
          ) : null}

          {/* El servicio de correo todavía no existe. Se dice, y el reporte se
              ofrece para copiar: el visitante igual se lo lleva. */}
          {estado.tipo === "sin-servicio" ? (
            <div className="hairline hairline-t mt-5 pt-4">
              <p className="max-w-[46ch] text-[13px] leading-relaxed text-tinta-2">
                El envío por email todavía no está disponible. Mientras tanto,
                podés copiar el diagnóstico y guardarlo.
              </p>
              <Boton
                tono="texto"
                chico
                onClick={() => copiarReporte(estado.reporte)}
                className="mt-2"
              >
                {copiado ? "copiado" : "copiar el diagnóstico"}
              </Boton>
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}
