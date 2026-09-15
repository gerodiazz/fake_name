"use client";

/**
 * ALTA AL PROGRAMA DE REFERIDOS (sección 04)
 *
 * Tres campos y nada más: quien refiere no está comprando nada, así que pedir
 * datos de más es perder gente.
 *
 * ENVÍO — PLACEHOLDER: hoy abre el cliente de correo con el mensaje ya escrito.
 * Es el único modo honesto de que funcione sin backend. Cuando haya servicio de
 * mail o CRM, se reemplaza `enviar()` por la llamada real; el resto del
 * componente no cambia.
 */

import { useState } from "react";
import { CampoTexto } from "@/components/Campo";
import { useDiagnostico } from "@/lib/estado-diagnostico";
import { REFERIDOS, enDolares } from "@/lib/referidos";
import { SITIO } from "@/lib/sitio";

export default function FormularioReferidos() {
  const { codigoReferido } = useDiagnostico();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comoNosConociste, setComoNosConociste] = useState("");
  const [enviado, setEnviado] = useState(false);

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const cuerpo = [
      "Alta al programa de referidos.",
      "",
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Cómo llegó a ${SITIO.nombre}: ${comoNosConociste || "—"}`,
      `Código: ${codigoReferido || "—"}`,
    ].join("\n");

    const enlace = `mailto:${SITIO.email}?subject=${encodeURIComponent(
      `Programa de referidos · ${nombre}`,
    )}&body=${encodeURIComponent(cuerpo)}`;

    window.location.href = enlace;
    setEnviado(true);
  }

  return (
    <form onSubmit={enviar} className="max-w-[34rem]">
      <div className="grid grid-cols-1 gap-7">
        <CampoTexto
          id="ref-nombre"
          etiqueta="Nombre"
          requerido
          valor={nombre}
          onCambio={setNombre}
          autoCompletar="name"
          marcador="Nombre y apellido"
        />
        <CampoTexto
          id="ref-email"
          etiqueta="Email"
          tipo="email"
          requerido
          valor={email}
          onCambio={setEmail}
          autoCompletar="email"
          marcador="nombre@empresa.com"
        />
        <CampoTexto
          id="ref-como"
          etiqueta={`Cómo llegaste a ${SITIO.nombre}`}
          valor={comoNosConociste}
          onCambio={setComoNosConociste}
          marcador="Un conocido, LinkedIn, una búsqueda"
        />
      </div>

      {/* Botón en tinta, no en Klein: el Klein está reservado para agendar el
          diagnóstico, que es el CTA principal del sitio. */}
      <button type="submit" className="boton boton-tinta mt-9">
        Quiero referir
      </button>

      {/* aria-live: quien usa lector de pantalla se entera del cambio. */}
      <p className="mt-4 min-h-[1.5rem] text-[13px] text-tinta-2" aria-live="polite">
        {enviado
          ? `Se abrió el correo con el mensaje escrito. Si no se abrió, la dirección es ${SITIO.email}.`
          : `El alta incluye un código de referido. Se pagan ${enDolares(
              REFERIDOS.porCliente,
            )} por cada cliente que firma.`}
      </p>
    </form>
  );
}
