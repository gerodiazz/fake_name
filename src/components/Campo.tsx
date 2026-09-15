"use client";

/**
 * CAMPOS DE FORMULARIO
 *
 * Mismo criterio que las respuestas del diagnóstico: sin cajas. Un campo es
 * una etiqueta chica arriba y una línea abajo. El foco lo marca el anillo Klein
 * global, así que ningún campo apaga el outline.
 *
 * El texto de los inputs es de 16px porque abajo de eso iOS hace zoom al
 * enfocar y rompe el layout mobile.
 */

import type { FormEvent, ReactNode } from "react";

/** Cualquiera de los tres controles que usa el sitio. */
type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** Microcopy del navegador cuando falta un campo obligatorio. */
const FALTA_COMPLETAR = "Falta completar este campo.";

/**
 * El navegador trae su propio mensaje de validación, con su redacción y en el
 * idioma del sistema. Estos dos manejadores lo reemplazan por el del sitio
 * cuando el campo está vacío, y lo limpian apenas se escribe para que el aviso
 * no quede pegado. El resto de las validaciones (un email mal escrito, por
 * ejemplo) las sigue explicando el navegador.
 */
function alSerInvalido(evento: FormEvent<Control>) {
  const campo = evento.currentTarget;
  if (campo.validity.valueMissing) campo.setCustomValidity(FALTA_COMPLETAR);
}

function limpiarValidacion(campo: Control) {
  campo.setCustomValidity("");
}

type BaseProps = {
  id: string;
  etiqueta: string;
  requerido?: boolean;
  /** Aclaración corta bajo el campo. */
  ayuda?: string;
};

function Envoltorio({
  id,
  etiqueta,
  requerido,
  ayuda,
  children,
}: BaseProps & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="kicker kicker-tinta block">
        {etiqueta}
        {requerido ? <span aria-hidden="true"> ·</span> : null}
      </label>
      {children}
      {ayuda ? <p className="mt-1.5 text-[13px] text-tinta-2">{ayuda}</p> : null}
    </div>
  );
}

/** Clases compartidas por todos los controles: línea abajo y nada más. */
const CONTROL =
  "hairline hairline-b mt-2 w-full bg-transparent pb-2 text-[16px] text-tinta placeholder:text-tinta-2/60";

export function CampoTexto({
  id,
  etiqueta,
  requerido,
  ayuda,
  tipo = "text",
  valor,
  onCambio,
  marcador,
  autoCompletar,
}: BaseProps & {
  tipo?: "text" | "email" | "tel";
  valor: string;
  onCambio: (valor: string) => void;
  marcador?: string;
  autoCompletar?: string;
}) {
  return (
    <Envoltorio id={id} etiqueta={etiqueta} requerido={requerido} ayuda={ayuda}>
      <input
        id={id}
        name={id}
        type={tipo}
        required={requerido}
        value={valor}
        onChange={(e) => {
          limpiarValidacion(e.currentTarget);
          onCambio(e.target.value);
        }}
        onInvalid={alSerInvalido}
        placeholder={marcador}
        autoComplete={autoCompletar}
        className={CONTROL}
      />
    </Envoltorio>
  );
}

export function CampoArea({
  id,
  etiqueta,
  requerido,
  ayuda,
  valor,
  onCambio,
  marcador,
  filas = 4,
}: BaseProps & {
  valor: string;
  onCambio: (valor: string) => void;
  marcador?: string;
  filas?: number;
}) {
  return (
    <Envoltorio id={id} etiqueta={etiqueta} requerido={requerido} ayuda={ayuda}>
      <textarea
        id={id}
        name={id}
        required={requerido}
        rows={filas}
        value={valor}
        onChange={(e) => {
          limpiarValidacion(e.currentTarget);
          onCambio(e.target.value);
        }}
        onInvalid={alSerInvalido}
        placeholder={marcador}
        className={`${CONTROL} resize-none leading-relaxed`}
      />
    </Envoltorio>
  );
}

export function CampoSelect({
  id,
  etiqueta,
  requerido,
  ayuda,
  valor,
  onCambio,
  opciones,
}: BaseProps & {
  valor: string;
  onCambio: (valor: string) => void;
  opciones: { valor: string; texto: string }[];
}) {
  return (
    <Envoltorio id={id} etiqueta={etiqueta} requerido={requerido} ayuda={ayuda}>
      <select
        id={id}
        name={id}
        required={requerido}
        value={valor}
        onChange={(e) => {
          limpiarValidacion(e.currentTarget);
          onCambio(e.target.value);
        }}
        onInvalid={alSerInvalido}
        // appearance-none saca el estilo de sistema; la flecha se dibuja con
        // un background SVG inline para no depender de ningún ícono externo.
        className={`${CONTROL} appearance-none bg-[length:10px] bg-[right_2px_center] bg-no-repeat pr-6`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%2356544E' stroke-width='1'/%3E%3C/svg%3E\")",
        }}
      >
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
    </Envoltorio>
  );
}
