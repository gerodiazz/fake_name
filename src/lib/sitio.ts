/**
 * DATOS DEL SITIO
 *
 * La marca completa es TELESCA JUSTEL y la corta, TJ. El monograma y el
 * wordmark viven en src/components/marca/Marca.tsx; acá están los datos.
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
  /** El nombre completo, para textos corridos y metadatos. */
  nombre: "Telesca Justel",
  /** La marca corta. Es la que se ve en mobile y en los rótulos internos. */
  marcaCorta: "TJ",
  /**
   * Title de la home. Lleva los dos términos por los que se busca este
   * servicio: agentes de IA y automatización de procesos.
   */
  titulo:
    "Telesca Justel — Software para procesos empresariales reales",
  /**
   * Meta description y bajada de Open Graph. 137 caracteres: por debajo del
   * corte de 155 que aplica Google.
   */
  descripcion:
    "Desarrollo de agentes de IA y automatización de procesos para empresas. Diagnóstico sin costo, alcance y plazo cerrados por escrito.",
  /** Dominio de producción. Cambiar cuando exista el definitivo. */
  url: process.env.NEXT_PUBLIC_URL_SITIO ?? "https://telescajustel.com",

  /**
   * PLACEHOLDER — BLOQUEANTE PARA PUBLICAR.
   * Es la dirección a la que va el formulario de contacto: si no es real, el
   * sitio no recibe nada. Es el único dato de relleno que queda visible,
   * porque sin una dirección el formulario no tiene a dónde ir.
   */
  email: "hola@telescajustel.com",

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
   * AGENDA — todavía no hay ninguna contratada.
   *
   * En null, los botones de agendar llevan al formulario de contacto, que ya
   * llega precargado con el diagnóstico. No se inventa una URL de Calendly ni
   * de Cal.com: un botón que lleva a un calendario que no existe es peor que
   * no tener el botón.
   *
   * Al contratar una, se completa acá:
   *
   *     agenda: { url: "https://cal.com/telescajustel/45min", plataforma: "cal" }
   *
   * `plataforma` decide con qué parámetro viaja el resumen del diagnóstico:
   * Cal.com lo recibe en `notes` y Calendly en `a1`, que son los mecanismos
   * oficiales de precarga de cada una. Ver src/lib/agenda.ts.
   */
  agenda: null as { url: string; plataforma: "cal" | "calendly" } | null,
} as const;

/**
 * LOS DOS SOCIOS
 *
 * Viven acá, y no dentro de la sección, porque los datos estructurados del
 * layout los declaran como founders de la organización.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ LO QUE FALTA, Y DÓNDE VA                                             │
 * │                                                                       │
 * │ Los nombres son reales. El rol, la foto y el LinkedIn están en null   │
 * │ porque todavía no los tengo, y no se inventan: un cargo inventado en  │
 * │ la sección que dice "vas a hablar con quien escribe el código" es     │
 * │ exactamente donde más caro sale.                                      │
 * │                                                                       │
 * │ · FOTO — el archivo va en /public/images/ y `foto` apunta ahí:        │
 * │       foto: "/images/matheo-telesca.jpg"                              │
 * │   Formato: JPG o WebP, vertical, al menos 800×1000. Retrato normal,   │
 * │   sin filtros. Mientras falte la de alguno de los dos, la sección no  │
 * │   dibuja ningún recuadro de foto: o están las dos, o no está ninguna. │
 * │   Un marco vacío al lado de una foto rompe la simetría, que es        │
 * │   justamente lo que esta sección tiene que transmitir.                 │
 * │                                                                       │
 * │ · LINKEDIN — la URL completa del perfil:                              │
 * │       linkedin: "https://www.linkedin.com/in/usuario-real/"           │
 * │   Sin URL no se dibuja el ícono. No se adivina el nombre de usuario.  │
 * │                                                                       │
 * │ · ROL — una o dos palabras, en minúscula. Lo que cada uno hace de     │
 * │   verdad en los proyectos.                                            │
 * └──────────────────────────────────────────────────────────────────────┘
 */
export type Socio = {
  /** Nombre y apellido, como se presenta en una reunión. */
  nombre: string;
  /** Qué hace en los proyectos. En null hasta que esté definido. */
  rol: string | null;
  /** Ruta dentro de /public, o null mientras no haya foto. */
  foto: string | null;
  /** URL completa del perfil de LinkedIn, o null. Nunca se adivina. */
  linkedin: string | null;
};

export const SOCIOS: Socio[] = [
  {
    nombre: "Matheo Telesca",
    rol: null,
    foto: null,
    linkedin: null,
  },
  {
    nombre: "Geronimo Justel",
    rol: null,
    foto: null,
    linkedin: null,
  },
];
