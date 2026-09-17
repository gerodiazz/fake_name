"use client";

/**
 * CTA FINAL — el cierre del recorrido
 *
 * YA NO ES UNA SECCIÓN PROPIA. Vive dentro de la sección del diagnóstico,
 * separada por una hairline, y por eso no se envuelve en <Seccion>: eran dos
 * bloques consecutivos que pedían lo mismo —que la persona cuente su proceso—
 * con dos cabeceras, dos números de expediente y dos titulares. El ancla
 * #contacto sigue existiendo acá adentro, así que los enlaces de la barra
 * superior, del pie y del resultado del diagnóstico siguen funcionando.
 *
 * QUÉ SE SACÓ Y POR QUÉ
 *
 * · Los campos bajaron de seis a tres: nombre, email y el caso. La empresa se
 *   cuenta en el caso, el teléfono lo pedimos al responder y el rango de
 *   presupuesto era un placeholder sin precios confirmados detrás. Cada campo
 *   de más es gente que no completa.
 * · Se fue la columna de contacto directo: el email ya está en el pie, a dos
 *   centímetros de acá, y la línea sobre videollamadas no cambia la decisión
 *   de nadie.
 *
 * El formulario llega precargado con el resultado del diagnóstico: rubro,
 * procesos marcados, horas y plazo. Lo contestado arriba no hay que volver a
 * explicarlo. Si alguien edita el campo, deja de sobrescribirse.
 *
 * ENVÍO — PLACEHOLDER: abre el cliente de correo con todo escrito. Cuando haya
 * backend o CRM se reemplaza `enviar()` y el resto queda igual.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ PLACEHOLDER — COMPLETAR ANTES DE PUBLICAR                            │
 * │ El email al que va este formulario sale de src/lib/sitio.ts y hoy es │
 * │ de relleno.                                                           │
 * └──────────────────────────────────────────────────────────────────────┘
 */

import { useEffect, useState } from "react";
import TitularRevelado from "@/components/TitularRevelado";
import { CampoArea, CampoTexto } from "@/components/Campo";
import { useDiagnostico } from "@/lib/estado-diagnostico";
import { RANGO_INVERSION } from "@/lib/condiciones";
import { SITIO } from "@/lib/sitio";

/**
 * Confirmación de envío.
 *
 * Mientras el envío sea un mailto, decir "recibido" sería falso: el correo lo
 * tiene que enviar el visitante desde su cliente de mail.
 */
const CONFIRMACION =
  "Se abrió el correo con el caso escrito. Al enviarlo, respondemos dentro de las 24 horas hábiles. Si no se abrió ningún correo, escribinos a";

export default function Contacto() {
  const { resumenParaContacto, rubro } = useDiagnostico();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
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

    const cuerpo = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      "",
      "— El caso —",
      mensaje || "Sin diagnóstico previo.",
    ].join("\n");

    const enlace = `mailto:${SITIO.email}?subject=${encodeURIComponent(
      `Diagnóstico · ${nombre}`,
    )}&body=${encodeURIComponent(cuerpo)}`;

    window.location.href = enlace;
    setEnviado(true);
  }

  return (
    <div id="contacto" className="hairline hairline-t mt-20 pt-12 sm:mt-24">
      <TitularRevelado
        como="h2"
        className="titular max-w-[22ch] text-[clamp(1.75rem,7.5vw,3rem)]"
      >
        ¿Hay un proceso que todavía depende demasiado de una persona?
      </TitularRevelado>

      <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
        Lo analizamos y te decimos si tiene sentido convertirlo en software. Si
        no conviene, también se dice.
      </p>
      <p className="kicker mt-4">45 minutos · sin costo</p>

      {/* El orden de magnitud, antes del formulario. Solo aparece cuando haya
          un rango real cargado: ver RANGO_INVERSION. */}
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
            href={SITIO.agenda.url}
            target="_blank"
            rel="noopener noreferrer"
            className="boton boton-principal"
          >
            Agendar directo
          </a>
        </div>
      ) : null}

      <form onSubmit={enviar} className="mt-10 max-w-[38rem]">
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
              filas={5}
              marcador="Qué proceso consume más tiempo hoy."
              ayuda={
                rubro
                  ? "Viene cargado con lo marcado en el diagnóstico. Se puede editar."
                  : "El diagnóstico de arriba completa este campo solo."
              }
            />
          </div>
        </div>

        <button type="submit" className="boton boton-principal mt-8">
          Agendar diagnóstico
        </button>

        <p
          className="mt-4 min-h-[1.5rem] max-w-[46ch] text-[13px] text-tinta-2"
          aria-live="polite"
        >
          {enviado ? (
            <>
              {CONFIRMACION}{" "}
              <a
                href={`mailto:${SITIO.email}`}
                className="text-tinta underline decoration-linea underline-offset-4"
              >
                {SITIO.email}
              </a>
              .
            </>
          ) : (
            "Respondemos dentro de las 24 horas hábiles."
          )}
        </p>
      </form>
    </div>
  );
}
