"use client";

/**
 * SECCIÓN 11 — AGENDAR (cierre del sitio)
 *
 * El formulario llega precargado con el resultado del diagnóstico: rubro,
 * procesos marcados, horas y plazo. Lo contestado arriba no hay que volver a
 * explicarlo. Si alguien edita el campo, deja de sobrescribirse: a partir de
 * ahí el texto es suyo.
 *
 * QUÉ SE CORRIGIÓ ACÁ
 *
 * · El select de presupuesto tenía dos opciones que decían lo mismo: "Sin
 *   definir" (la vacía) y "Todavía no está definido". Quedó una sola.
 * · El teléfono ya era opcional, pero ocupaba el mismo lugar que un campo
 *   obligatorio. Ahora el formulario visible tiene cuatro campos —nombre,
 *   empresa, email y el caso— y el teléfono y el presupuesto viven detrás de
 *   un desplegable. Cada campo de más es gente que no completa.
 * · Cuando exista un enlace de agendamiento (SITIO.agenda), aparece como
 *   alternativa al formulario. El contacto no tiene que ser una barrera: quien
 *   quiere reservar un horario y listo, lo hace sin escribir nada.
 *
 * ENVÍO — PLACEHOLDER: abre el cliente de correo con todo escrito. Cuando haya
 * backend o CRM se reemplaza `enviar()` y el resto queda igual.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ PLACEHOLDER — COMPLETAR ANTES DE PUBLICAR                            │
 * │ El email al que va este formulario sale de src/lib/sitio.ts y hoy es │
 * │ de relleno. Los rangos de presupuesto de abajo también hay que        │
 * │ confirmarlos contra el precio real del trabajo.                       │
 * └──────────────────────────────────────────────────────────────────────┘
 */

import { useEffect, useState } from "react";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { CampoArea, CampoSelect, CampoTexto } from "@/components/Campo";
import { useDiagnostico } from "@/lib/estado-diagnostico";
import { RANGO_INVERSION } from "@/lib/condiciones";
import { SITIO } from "@/lib/sitio";

/** PLACEHOLDER: confirmar los tramos contra el precio real del trabajo. */
const RANGOS = [
  // La opción vacía ES la de "todavía no está definido": antes había dos
  // opciones distintas que decían exactamente lo mismo.
  { valor: "", texto: "Todavía no está definido" },
  { valor: "menos-2000", texto: "Menos de USD 2.000" },
  { valor: "2000-5000", texto: "USD 2.000 a 5.000" },
  { valor: "5000-10000", texto: "USD 5.000 a 10.000" },
  { valor: "mas-10000", texto: "Más de USD 10.000" },
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

export default function Contacto({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
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
    <Seccion id="contacto" numero={numero} kicker={kicker} superficie>
      <div className="pb-20 pt-2">
        <TitularRevelado como="h2" className="titular max-w-[18ch] text-[clamp(1.75rem,7.5vw,3rem)]">
          Cuéntanos qué proceso depende hoy de una persona.
        </TitularRevelado>
        <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Lo analizamos y te decimos si tiene sentido convertirlo en software.
          La reunión dura unos cuarenta y cinco minutos y no tiene costo. Si no
          hay nada que convenga automatizar, también se dice.
        </p>

        {/* El orden de magnitud, antes del formulario. Solo aparece cuando
            haya un rango real cargado: ver RANGO_INVERSION. */}
        {RANGO_INVERSION ? (
          <p className="hairline hairline-t hairline-b mt-8 max-w-[46ch] py-5 font-serif text-[19px] leading-snug sm:text-[21px]">
            {RANGO_INVERSION}
          </p>
        ) : null}

        {/* Agendamiento directo, para quien no quiere escribir nada. Aparece
            solo si existe el enlace. */}
        {SITIO.agenda ? (
          <div className="mt-8">
            <a
              href={SITIO.agenda}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex min-h-[52px] items-center bg-klein px-7 text-[15px]
                text-superficie transition-opacity duration-100
                hover:opacity-90 active:opacity-75
              "
            >
              Agendar directo
            </a>
            <p className="mt-3 max-w-[44ch] text-[13px] text-tinta-2">
              Eliges el horario y listo. Si prefieres contarlo por escrito, está
              el formulario.
            </p>
          </div>
        ) : null}

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

            {/* Lo opcional, plegado. Con <details> nativo: sin JavaScript, con
                teclado y con lector de pantalla, igual que la FAQ. */}
            <details className="faq hairline hairline-t mt-8">
              <summary className="flex min-h-[52px] cursor-pointer items-center justify-between gap-6 py-3 text-[14px] text-tinta-2 transition-opacity duration-100 active:opacity-55">
                Agregar teléfono o presupuesto
                <span
                  aria-hidden="true"
                  className="faq-signo shrink-0 text-[18px] leading-none transition-transform duration-200"
                >
                  +
                </span>
              </summary>
              <div className="grid grid-cols-1 gap-7 pb-6 pt-2 sm:grid-cols-2">
                <CampoTexto
                  id="con-telefono"
                  etiqueta="Teléfono"
                  tipo="tel"
                  valor={telefono}
                  onCambio={setTelefono}
                  autoCompletar="tel"
                  marcador="11 0000 0000"
                />
                <CampoSelect
                  id="con-presupuesto"
                  etiqueta="Rango de presupuesto"
                  valor={presupuesto}
                  onCambio={setPresupuesto}
                  opciones={RANGOS}
                  ayuda="Sirve para saber si el alcance entra. No es un compromiso."
                  // El select arranca en "Todavía no está definido", que es
                  // una opción válida: no lleva mensaje de obligatorio.
                />
              </div>
            </details>

            {/* El CTA principal del sitio, en Klein. Cuando hay agendamiento
                directo arriba, este baja a tinta para no competir con él. */}
            <button
              type="submit"
              className={`
                mt-9 inline-flex min-h-[52px] items-center px-7
                text-[15px] text-superficie transition-opacity duration-100
                hover:opacity-90 active:opacity-75
                ${SITIO.agenda ? "bg-tinta" : "bg-klein"}
              `}
            >
              Agendar diagnóstico
            </button>

            <p
              className="mt-4 min-h-[1.5rem] max-w-[46ch] text-[13px] text-tinta-2"
              aria-live="polite"
            >
              {enviado
                ? CONFIRMACION
                : "Respondemos dentro de las 24 horas hábiles."}
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
              {/* Teléfono y ciudad aparecen cuando existen de verdad: ver el
                  criterio de datos faltantes en src/lib/sitio.ts. */}
              {SITIO.telefono && SITIO.telefonoWhatsApp ? (
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
              ) : null}
              {SITIO.ciudad ? (
                <li className="text-tinta-2">{SITIO.ciudad}</li>
              ) : null}
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
