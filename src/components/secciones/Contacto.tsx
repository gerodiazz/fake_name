"use client";

/**
 * SECCIÓN 07 — CONTACTO (footer)
 *
 * El formulario llega precargado con el resultado del diagnóstico: rubro,
 * procesos marcados, horas y plazo. Lo contestado arriba no hay que volver a
 * explicarlo. Si alguien edita el campo, deja de sobrescribirse: a partir de
 * ahí el texto es suyo.
 *
 * ENVÍO — PLACEHOLDER: abre el cliente de correo con todo escrito. Cuando haya
 * backend o CRM se reemplaza `enviar()` y el resto queda igual.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ PLACEHOLDER — COMPLETAR ANTES DE PUBLICAR                            │
 * │ Email, teléfono y ciudad salen de src/lib/sitio.ts y hoy son de       │
 * │ relleno. Los rangos de presupuesto de abajo también hay que           │
 * │ confirmarlos contra el precio real del trabajo.                       │
 * └──────────────────────────────────────────────────────────────────────┘
 */

import { useEffect, useState } from "react";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { CampoArea, CampoSelect, CampoTexto } from "@/components/Campo";
import { useDiagnostico } from "@/lib/estado-diagnostico";
import { SITIO } from "@/lib/sitio";

/** PLACEHOLDER: confirmar los tramos contra el precio real del trabajo. */
const RANGOS = [
  { valor: "", texto: "Sin definir" },
  { valor: "menos-2000", texto: "Menos de USD 2.000" },
  { valor: "2000-5000", texto: "USD 2.000 a 5.000" },
  { valor: "5000-10000", texto: "USD 5.000 a 10.000" },
  { valor: "mas-10000", texto: "Más de USD 10.000" },
  { valor: "no-se", texto: "Todavía no está definido" },
];

/**
 * Confirmación de envío.
 *
 * El texto definitivo es "Recibido. Respondemos dentro de las 24 horas
 * hábiles.", y es el que corresponde cuando el formulario llegue a un backend.
 * Mientras el envío sea un mailto, decir "recibido" sería falso: el correo lo
 * tiene que enviar el visitante desde su cliente de mail. Al reemplazar
 * `enviar()` por la llamada real, esta constante pasa a ser la frase corta.
 */
const CONFIRMACION =
  "Se abrió el correo con el caso escrito. Al enviarlo, respondemos dentro de las 24 horas hábiles.";

export default function Contacto() {
  const { resumenParaContacto, rubro } = useDiagnostico();

  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [mensaje, setMensaje] = useState("");
  /** Se enciende apenas el visitante escribe: a partir de ahí el texto es suyo. */
  const [mensajeEditado, setMensajeEditado] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const resumen = resumenParaContacto();

  // El resultado del diagnóstico baja al mensaje mientras nadie lo haya tocado.
  useEffect(() => {
    if (!mensajeEditado) setMensaje(resumen);
  }, [resumen, mensajeEditado]);

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const rangoElegido =
      RANGOS.find((r) => r.valor === presupuesto)?.texto ?? "Sin indicar";

    const cuerpo = [
      `Nombre: ${nombre}`,
      `Empresa: ${empresa}`,
      `Email: ${email}`,
      `Teléfono: ${telefono || "—"}`,
      `Rango de presupuesto: ${rangoElegido}`,
      "",
      "— Diagnóstico —",
      mensaje || "Sin diagnóstico previo.",
    ].join("\n");

    const enlace = `mailto:${SITIO.email}?subject=${encodeURIComponent(
      `Diagnóstico · ${empresa || nombre}`,
    )}&body=${encodeURIComponent(cuerpo)}`;

    window.location.href = enlace;
    setEnviado(true);
  }

  return (
    <Seccion id="contacto" numero="07" kicker="Agendar reunión" superficie>
      <div className="pb-20 pt-2">
        <TitularRevelado como="h2" className="titular max-w-[18ch] text-[clamp(1.75rem,7.5vw,3rem)]">
          Déjanos el caso y coordinamos una reunión.
        </TitularRevelado>
        <p className="mt-5 max-w-[48ch] text-[15px] text-tinta-2 sm:text-[16px]">
          La reunión dura alrededor de cuarenta y cinco minutos y no tiene costo.
          De ahí sale la lista de procesos que se pueden pasar a software y una
          estimación de horas. Si no hay nada para automatizar, se dice en la
          reunión.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          {/* ---- formulario ---- */}
          <form onSubmit={enviar}>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <CampoTexto
                id="con-nombre"
                etiqueta="Nombre"
                requerido
                valor={nombre}
                onCambio={setNombre}
                autoCompletar="name"
                marcador="Nombre y apellido"
              />
              <CampoTexto
                id="con-empresa"
                etiqueta="Empresa"
                requerido
                valor={empresa}
                onCambio={setEmpresa}
                autoCompletar="organization"
                marcador="Razón social o nombre de fantasía"
              />
              <CampoTexto
                id="con-email"
                etiqueta="Email"
                tipo="email"
                requerido
                valor={email}
                onCambio={setEmail}
                autoCompletar="email"
                marcador="nombre@empresa.com"
              />
              <CampoTexto
                id="con-telefono"
                etiqueta="Teléfono"
                tipo="tel"
                valor={telefono}
                onCambio={setTelefono}
                autoCompletar="tel"
                marcador="11 0000 0000"
              />
              <div className="sm:col-span-2">
                <CampoSelect
                  id="con-presupuesto"
                  etiqueta="Rango de presupuesto"
                  valor={presupuesto}
                  onCambio={setPresupuesto}
                  opciones={RANGOS}
                  ayuda="Sirve para saber si el alcance entra. No es un compromiso."
                  // El select arranca en "Sin definir", que es una opción
                  // válida: no lleva mensaje de campo obligatorio.
                />
              </div>
              <div className="sm:col-span-2">
                <CampoArea
                  id="con-mensaje"
                  etiqueta="El caso"
                  valor={mensaje}
                  onCambio={(valor) => {
                    setMensajeEditado(true);
                    setMensaje(valor);
                  }}
                  filas={6}
                  marcador="Qué proceso consume más tiempo hoy."
                  ayuda={
                    rubro
                      ? "Viene cargado con lo marcado en el diagnóstico. Se puede editar."
                      : "El diagnóstico de arriba completa este campo solo."
                  }
                />
              </div>
            </div>

            {/* El CTA principal del sitio, en Klein. */}
            <button
              type="submit"
              className="
                mt-9 inline-flex min-h-[52px] items-center bg-klein px-7
                text-[15px] text-superficie transition-opacity duration-100
                hover:opacity-90 active:opacity-75
              "
            >
              Agenda una reunión
            </button>

            <p
              className="mt-4 min-h-[1.5rem] max-w-[46ch] text-[13px] text-tinta-2"
              aria-live="polite"
            >
              {enviado ? CONFIRMACION : "Respondemos dentro de las 24 horas hábiles."}
            </p>
          </form>

          {/* ---- datos de contacto ---- */}
          <div className="lg:pt-1">
            <p className="kicker kicker-tinta">Contacto directo</p>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${SITIO.email}`}
                  className="inline-flex min-h-[44px] items-center underline decoration-linea underline-offset-4 transition-opacity duration-100 hover:decoration-tinta-2 active:opacity-55"
                >
                  {SITIO.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITIO.telefonoWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center underline decoration-linea underline-offset-4 transition-opacity duration-100 hover:decoration-tinta-2 active:opacity-55"
                >
                  {SITIO.telefono}
                </a>
              </li>
              <li className="text-tinta-2">{SITIO.ciudad}</li>
            </ul>

            <p className="hairline hairline-t mt-8 max-w-[34ch] pt-6 text-[13px] leading-relaxed text-tinta-2">
              Las reuniones de diagnóstico se hacen por videollamada, o en las
              oficinas de la empresa si conviene más.
            </p>
          </div>
        </div>
      </div>
    </Seccion>
  );
}
