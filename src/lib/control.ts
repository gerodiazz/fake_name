/**
 * CONTROL Y ERRORES (sección 08)
 *
 * Contesta la pregunta que todo el mundo se hace y que el sitio no contestaba
 * en ningún lado: ¿qué pasa si la IA se equivoca?
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ CÓMO ESTÁ ESCRITA                                                     │
 * │                                                                       │
 * │ Las seis de abajo son CAPACIDADES que pueden formar parte de una      │
 * │ implementación según el proceso, no cosas que todos nuestros sistemas │
 * │ tienen. Decir lo segundo sería afirmar algo sobre sistemas que        │
 * │ todavía no se construyeron.                                           │
 * │                                                                       │
 * │ Una línea cada una. Antes tenían un párrafo de detalle y otro de      │
 * │ "cuándo entra": doce párrafos para decir seis cosas, en una sección   │
 * │ que se lee para resolver una duda puntual.                            │
 * │                                                                       │
 * │ Qué pasa con los datos ya no está acá: es una condición comercial y   │
 * │ vive en la sección de condiciones, una sola vez.                      │
 * └──────────────────────────────────────────────────────────────────────┘
 */

/** La idea que ordena la sección. */
export const PREMISA = "No todo tiene que resolverse automáticamente.";

/** La respuesta corta a la pregunta del título. */
export const RESPUESTA =
  "Ante una situación inesperada, el sistema se detiene y pide intervención humana en vez de ejecutar una acción incorrecta. Según el proceso, además puede:";

export type Capacidad = {
  id: string;
  /** Qué puede hacer. En infinitivo: es una capacidad, no una promesa. */
  titulo: string;
  /** En qué consiste. Una línea corta. */
  detalle: string;
};

export const CAPACIDADES: Capacidad[] = [
  {
    id: "aprobacion",
    titulo: "Pedir aprobación",
    detalle: "Deja la acción preparada; no queda firme hasta que alguien la confirma.",
  },
  {
    id: "derivar",
    titulo: "Derivar a una persona",
    detalle: "Pasa el caso al equipo con todo el contexto de lo que hizo.",
  },
  {
    id: "registrar",
    titulo: "Registrar cada acción",
    detalle: "Qué hizo, cuándo y con qué datos. El registro es de la empresa.",
  },
  {
    id: "reglas",
    titulo: "Aplicar reglas",
    detalle: "Condiciones que no puede saltear: montos, horarios, excepciones.",
  },
  {
    id: "permisos",
    titulo: "Limitar permisos",
    detalle: "Credenciales propias con lo mínimo que el proceso necesita.",
  },
  {
    id: "detenerse",
    titulo: "Detenerse",
    detalle: "Si el dato no aparece o el otro sistema no responde, no improvisa.",
  },
];

/** Qué se define con la empresa. Cierra la sección en una línea. */
export const SE_DEFINE =
  "Cuáles de estas entran en cada implementación se decide con la empresa antes de escribir código, y queda escrito en la propuesta.";
