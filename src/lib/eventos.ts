/**
 * EVENTOS DE CONVERSIÓN
 *
 * El sitio no tiene plataforma de analytics, y esta tarea no es excusa para
 * agregar una. Lo que sí hace falta es que los eventos existan el día que se
 * conecte alguna, para no tener que volver a pasar por todos los componentes.
 *
 * Cómo funciona: si en la página hay un dataLayer o un gtag, se les avisa. Si
 * no hay ninguno —que es el caso hoy—, no pasa nada: ni error, ni pedido de
 * red, ni cookie. Además se emite un evento del DOM, que es la forma más
 * simple de que cualquier script se entere sin acoplarse a este archivo.
 *
 * El embudo que hay que poder medir es:
 *   diagnósticos completados → reportes pedidos → llamadas iniciadas
 */

export type Evento =
  | "diagnostic_completed"
  | "diagnostic_email_report_clicked"
  | "diagnostic_email_submitted"
  | "diagnostic_call_clicked";

type Datos = Record<string, string | number | boolean>;

type VentanaConAnalytics = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * Registra un evento. Nunca falla: si algo del entorno no está, no hace nada.
 *
 * Los datos que se pasan son de forma, no de contenido: el rubro y cuántos
 * procesos se marcaron. Nunca el email ni el texto que escribió la persona.
 */
export function registrar(evento: Evento, datos: Datos = {}): void {
  if (typeof window === "undefined") return;

  const ventana = window as VentanaConAnalytics;

  try {
    if (Array.isArray(ventana.dataLayer)) {
      ventana.dataLayer.push({ event: evento, ...datos });
    } else if (typeof ventana.gtag === "function") {
      ventana.gtag("event", evento, datos);
    }

    document.dispatchEvent(
      new CustomEvent("tj:evento", { detail: { evento, ...datos } }),
    );
  } catch {
    // Medir nunca puede romper la página.
  }
}
