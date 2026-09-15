/**
 * EL ENLACE DE LA AGENDA, CON EL CONTEXTO DEL DIAGNÓSTICO
 *
 * Quien termina el diagnóstico y toca "Agendar llamada" no debería tener que
 * volver a contar lo que acaba de contestar. Este módulo arma la URL del
 * calendario llevando el resumen.
 *
 * CADA PLATAFORMA TIENE SU MECANISMO Y SE USA EL DE CADA UNA:
 *
 *   · Cal.com precarga campos por query string, y el de notas se llama
 *     `notes`.
 *   · Calendly precarga las respuestas a sus preguntas personalizadas con
 *     `a1`, `a2`… La primera pregunta del evento es la que recibe el resumen.
 *
 * No se inventan parámetros: si mañana se usa otra plataforma, se agrega su
 * caso acá y no en el componente.
 *
 * SIN AGENDA CONTRATADA (que es el estado de hoy) devuelve el ancla al
 * formulario de contacto, que ya llega precargado con el mismo resumen. El
 * visitante no se topa con un botón muerto ni con un calendario inventado.
 */

import { SITIO } from "@/lib/sitio";

/**
 * Tope del resumen que viaja en la URL. Los navegadores aguantan bastante
 * más, pero un query string kilométrico es frágil y feo en la barra: el
 * resumen del diagnóstico entra cómodo en este tamaño.
 */
const TOPE_RESUMEN = 900;

/** A dónde va el botón de agendar, con el contexto que la plataforma acepte. */
export function enlaceDeAgenda(resumen: string): string {
  const agenda = SITIO.agenda;

  // Sin agenda contratada: al formulario, que ya viene con el diagnóstico.
  if (!agenda) return "#contacto";

  const url = new URL(agenda.url);
  const contexto = resumen.slice(0, TOPE_RESUMEN);

  if (agenda.plataforma === "cal") {
    url.searchParams.set("notes", contexto);
  } else {
    // Calendly: a1 es la respuesta a la primera pregunta del evento.
    url.searchParams.set("a1", contexto);
  }

  return url.toString();
}

/** True cuando el botón abre un calendario de verdad y no el formulario. */
export function hayAgenda(): boolean {
  return SITIO.agenda !== null;
}
