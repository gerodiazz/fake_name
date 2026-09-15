/**
 * DATOS DEL SITIO
 *
 * "fakename" es un nombre provisorio y aparece como tal en todo el sitio.
 * Cuando se defina el nombre real, se cambia aquí y en los textos de marca.
 *
 * Los datos de contacto están marcados como PLACEHOLDER: hay que completarlos
 * antes de publicar. No se inventan datos de clientes en ningún lado.
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

  /* --- PLACEHOLDER: completar antes de publicar --- */
  email: "hola@fakename.com.ar",
  telefono: "+54 9 11 0000 0000",
  /** Formato E.164 sin signos, para armar enlaces de WhatsApp. */
  telefonoWhatsApp: "5491100000000",
  ciudad: "Buenos Aires, Argentina",
} as const;

/**
 * Los dos socios. Viven aquí, y no dentro de la sección 05, porque los datos
 * estructurados del layout los necesitan para declarar los founders de la
 * organización.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ PLACEHOLDER — COMPLETAR ANTES DE PUBLICAR                            │
 * │ Nombre, trayectoria y foto son de relleno. La trayectoria tiene que   │
 * │ ser verificable: una línea, sin adjetivos.                            │
 * │                                                                       │
 * │ Para la foto: poner el archivo en /public/socios/ y cambiar `foto` a   │
 * │ su ruta. El componente pasa solo a usar next/image.                   │
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

export const SOCIOS: Socio[] = [
  {
    nombre: "PLACEHOLDER · Nombre del primer socio",
    trayectoria:
      "PLACEHOLDER · Una línea de trayectoria verificable: dónde trabajó, cuántos años, en qué. Sin adjetivos.",
    foto: null,
    alt: "Retrato del primer socio de fakename",
  },
  {
    nombre: "PLACEHOLDER · Nombre del segundo socio",
    trayectoria:
      "PLACEHOLDER · Una línea de trayectoria verificable: dónde trabajó, cuántos años, en qué. Sin adjetivos.",
    foto: null,
    alt: "Retrato del segundo socio de fakename",
  },
];
