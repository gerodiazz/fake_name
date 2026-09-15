/**
 * DATOS DEL SITIO
 *
 * "fakename" es un nombre provisorio y aparece como tal en todo el sitio.
 * Cuando se defina el nombre real, se cambia aquí y en los textos de marca.
 *
 * CRITERIO PARA LOS DATOS QUE FALTAN
 *
 * Un dato que todavía no es real no se rellena con uno inventado: se deja en
 * null y la parte del sitio que lo muestra desaparece hasta que exista. Un
 * teléfono falso o un nombre "PLACEHOLDER" a la vista cuesta más que no
 * mostrar nada.
 *
 * El inventario completo de lo que falta está en DATOS-PENDIENTES.md.
 */

export const SITIO = {
  nombre: "fakename",
  /**
   * Title de la home. Lleva los dos términos por los que se busca este
   * servicio: agentes de IA y automatización de procesos.
   */
  titulo:
    "fakename — Agentes de IA y automatización de procesos para empresas",
  /**
   * Meta description y bajada de Open Graph. 137 caracteres: por debajo del
   * corte de 155 que aplica Google.
   */
  descripcion:
    "Desarrollo de agentes de IA y automatización de procesos para empresas. Diagnóstico sin costo, alcance y plazo cerrados por escrito.",
  /** Dominio de producción. Cambiar cuando exista el definitivo. */
  url: process.env.NEXT_PUBLIC_URL_SITIO ?? "https://fakename.com.ar",

  /**
   * PLACEHOLDER — BLOQUEANTE PARA PUBLICAR.
   * Es la dirección a la que va el formulario de contacto: si no es real, el
   * sitio no recibe nada. Es el único dato de relleno que queda visible,
   * porque sin una dirección el formulario no tiene a dónde ir.
   */
  email: "hola@fakename.com.ar",

  /**
   * Teléfono de contacto. En null mientras no sea real: el bloque de contacto
   * directo simplemente no lo muestra.
   */
  telefono: null as string | null,
  /** Formato E.164 sin signos, para armar enlaces de WhatsApp. */
  telefonoWhatsApp: null as string | null,
  /** Ciudad, cuando se quiera mostrar dónde está el estudio. */
  ciudad: null as string | null,

  /**
   * Enlace de agendamiento directo (Cal.com, Calendly o el que se use). En
   * null, el sitio ofrece solo el formulario; apenas exista la URL, aparece el
   * botón de "Agendar directo" al lado del formulario, sin tocar código.
   */
  agenda: null as string | null,
} as const;

/**
 * Los dos socios.
 *
 * Viven aquí, y no dentro de la sección, porque los datos estructurados del
 * layout los necesitan para declarar los founders de la organización.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ ARREGLO VACÍO A PROPÓSITO — COMPLETAR ANTES DE PUBLICAR              │
 * │                                                                       │
 * │ Antes había dos objetos con "PLACEHOLDER · Nombre del primer socio" y │
 * │ un recuadro que decía "Foto pendiente". Eso se veía en producción.    │
 * │                                                                       │
 * │ Mientras el arreglo esté vacío, la sección 05 muestra solo lo que sí  │
 * │ es cierto: que son dos y que el desarrollo no se terceriza. Al cargar │
 * │ los dos objetos aparecen las fichas, y los founders de los datos      │
 * │ estructurados se completan solos.                                     │
 * │                                                                       │
 * │ La trayectoria tiene que ser verificable: una línea, sin adjetivos.   │
 * │ Para la foto: el archivo va en /public/socios/ y `foto` apunta ahí.   │
 * └──────────────────────────────────────────────────────────────────────┘
 */
export type Socio = {
  nombre: string;
  /** Una línea de trayectoria real. Sin adjetivos. */
  trayectoria: string;
  /** Ruta dentro de /public, o null mientras no haya foto. */
  foto: string | null;
  /** Texto alternativo de la foto. */
  alt: string;
};

export const SOCIOS: Socio[] = [];
