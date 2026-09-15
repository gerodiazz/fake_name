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

import { useState, type FormEvent, type ReactNode } from "react";

/** Cualquiera de los tres controles que usa el sitio. */
type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** Microcopy propio, en el idioma del sitio y no en el del sistema operativo. */
const FALTA_COMPLETAR = "Falta completar este campo.";
const EMAIL_INVALIDO = "Revisá el email: falta el @ o el dominio.";
const REVISAR = "Revisá este campo.";

/**
 * Al suprimir el globo del navegador se pierde algo que el navegador hacía
 * gratis: llevar el foco al primer campo inválido cuando se intenta enviar.
 * Sin eso, quien manda un formulario vacío desde un teléfono ve tres avisos
 * arriba y se queda parado abajo, al lado del botón.
 *
 * Los eventos `invalid` de un mismo envío se disparan todos juntos y en orden
 * de documento, así que alcanza con atender al primero y soltar la marca en el
 * siguiente turno del bucle de eventos.
 */
let yaSeEnfoco = false;

function enfocarSiEsElPrimero(campo: Control) {
  if (yaSeEnfoco) return;
  yaSeEnfoco = true;
  campo.focus();
  campo.scrollIntoView({ block: "center", behavior: "smooth" });
  window.setTimeout(() => {
    yaSeEnfoco = false;
  }, 0);
}

/**
 * ESTADO DE VALIDACIÓN DE UN CAMPO
 *
 * El navegador trae su propio globo de validación, con su redacción y en el
 * idioma del sistema operativo: un formulario en castellano que avisa
 * "Please fill out this field". Además el globo se va solo a los pocos
 * segundos y no deja rastro de qué campo falta.
 *
 * Acá el globo se suprime —preventDefault sobre el evento invalid— y el aviso
 * se escribe debajo del campo, en la línea que ya existía para la ayuda. El
 * navegador sigue encargándose de lo suyo: enfocar el primer campo inválido al
 * intentar enviar, y decidir qué es válido.
 *
 * El mensaje se borra apenas el campo pasa a ser válido, no al primer tecleo:
 * un aviso que desaparece antes de que el problema se resuelva no sirve.
 */
function useValidacion() {
  const [error, setError] = useState<string | null>(null);

  function alSerInvalido(evento: FormEvent<Control>) {
    evento.preventDefault();
    const campo = evento.currentTarget;
    if (campo.validity.valueMissing) setError(FALTA_COMPLETAR);
    else if (campo.validity.typeMismatch) setError(EMAIL_INVALIDO);
    else setError(REVISAR);
    enfocarSiEsElPrimero(campo);
  }

  function alEscribir(campo: Control) {
    if (error && campo.checkValidity()) setError(null);
  }

  /** Revalida al salir del campo: avisa antes de llegar al botón. */
  function alSalir(campo: Control) {
    if (campo.value && !campo.checkValidity()) {
      setError(campo.validity.typeMismatch ? EMAIL_INVALIDO : REVISAR);
    }
  }

  return { error, alSerInvalido, alEscribir, alSalir };
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
  error,
  children,
}: BaseProps & { error?: string | null; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="kicker kicker-tinta block">
        {etiqueta}
        {requerido ? <span aria-hidden="true"> ·</span> : null}
      </label>
      {children}
      {/* El error reemplaza a la ayuda: dos renglones debajo del mismo campo,
          uno diciendo qué poner y otro diciendo qué está mal, es ruido.
          aria-live para que el lector de pantalla lo anuncie al aparecer. */}
      {error ? (
        <p id={`${id}-error`} className="campo-error mt-1.5 text-[13px]" aria-live="polite">
          {error}
        </p>
      ) : ayuda ? (
        <p className="mt-1.5 text-[13px] text-tinta-2">{ayuda}</p>
      ) : null}
    </div>
  );
}

/** Clases compartidas por todos los controles: línea abajo y nada más. */
const CONTROL =
  "campo hairline hairline-b mt-2 w-full bg-transparent pb-2 text-[16px] text-tinta placeholder:text-tinta-2/60";

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
  const { error, alSerInvalido, alEscribir, alSalir } = useValidacion();

  return (
    <Envoltorio
      id={id}
      etiqueta={etiqueta}
      requerido={requerido}
      ayuda={ayuda}
      error={error}
    >
      <input
        id={id}
        name={id}
        type={tipo}
        required={requerido}
        value={valor}
        onChange={(e) => {
          alEscribir(e.currentTarget);
          onCambio(e.target.value);
        }}
        onBlur={(e) => alSalir(e.currentTarget)}
        onInvalid={alSerInvalido}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        data-estado={error ? "error" : undefined}
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
  const { error, alSerInvalido, alEscribir } = useValidacion();

  return (
    <Envoltorio
      id={id}
      etiqueta={etiqueta}
      requerido={requerido}
      ayuda={ayuda}
      error={error}
    >
      <textarea
        id={id}
        name={id}
        required={requerido}
        rows={filas}
        value={valor}
        onChange={(e) => {
          alEscribir(e.currentTarget);
          onCambio(e.target.value);
        }}
        onInvalid={alSerInvalido}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        data-estado={error ? "error" : undefined}
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
  const { error, alSerInvalido, alEscribir } = useValidacion();

  return (
    <Envoltorio
      id={id}
      etiqueta={etiqueta}
      requerido={requerido}
      ayuda={ayuda}
      error={error}
    >
      <select
        id={id}
        name={id}
        required={requerido}
        value={valor}
        onChange={(e) => {
          alEscribir(e.currentTarget);
          onCambio(e.target.value);
        }}
        onInvalid={alSerInvalido}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        data-estado={error ? "error" : undefined}
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
