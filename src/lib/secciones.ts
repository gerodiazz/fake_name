/**
 * ORDEN Y NUMERACIÓN DE LAS SECCIONES DE LA HOME
 *
 * El sitio se lee como un expediente: cada sección abre con "NN · Nombre". Ese
 * número estaba escrito a mano en dos lugares —el componente de la sección y
 * la barra superior— así que reordenar significaba editar los dos y confiar en
 * no equivocarse.
 *
 * Acá vive el orden, y el número sale de la posición. Reordenar la home es
 * mover una línea de este arreglo.
 *
 * Una sección puede estar oculta (`visible: false`). Cuando lo está, no ocupa
 * número: si todavía no hay casos reales, la 09 no queda vacía ni deja un
 * agujero en la numeración. Las que siguen se corren solas.
 */

import { CASOS } from "@/lib/casos";

export type IdSeccion =
  | "contenido"
  | "como-funciona"
  | "diagnostico"
  | "ejemplos"
  | "socios"
  | "como-trabajamos"
  | "condiciones"
  | "control"
  | "casos"
  | "faq"
  | "contacto";

type DefinicionSeccion = {
  id: IdSeccion;
  /** Nombre que aparece en la cabecera de la sección, en sentence case. */
  kicker: string;
  /**
   * Nombre en el índice de la barra superior. Más corto que el kicker: a 11px
   * y en mayúsculas, once nombres largos no entran en un renglón.
   */
  corto: string;
  /**
   * Si aparece en el índice de la barra superior. El hero no aparece: la marca
   * de la izquierda ya vuelve ahí. Las secciones de apoyo tampoco, para que el
   * índice de desktop siga entrando en una línea; el panel de mobile las lista
   * todas.
   */
  enIndice: boolean;
  /** Secciones que dependen de datos que todavía no existen. */
  visible?: boolean;
};

/**
 * El recorrido de la home, en orden. Sigue el funnel: entender, reconocer el
 * problema, ver la solución, confiar, entender el modelo, bajar el riesgo,
 * contactar.
 */
const DEFINICIONES: DefinicionSeccion[] = [
  { id: "contenido", kicker: "Portada", corto: "Portada", enIndice: false },
  // "Cómo funciona" es una sola sección con dos bloques: qué es un agente,
  // en castellano, y el ejemplo conceptual del recorrido. Se llama igual que
  // el botón secundario del hero: el visitante toca "Ver cómo funciona" y
  // llega a una sección que se llama así.
  { id: "como-funciona", kicker: "Cómo funciona", corto: "Cómo funciona", enIndice: true },
  { id: "diagnostico", kicker: "Diagnóstico", corto: "Diagnóstico", enIndice: true },
  { id: "ejemplos", kicker: "Ejemplos por industria", corto: "Ejemplos", enIndice: true },
  { id: "socios", kicker: "Quiénes estamos detrás", corto: "Quiénes somos", enIndice: false },
  { id: "como-trabajamos", kicker: "Cómo trabajamos", corto: "Proceso", enIndice: true },
  { id: "condiciones", kicker: "Condiciones claras", corto: "Condiciones", enIndice: true },
  { id: "control", kicker: "Control, errores y datos", corto: "Control", enIndice: false },
  // Se enciende sola cuando haya un caso real cargado. Sin casos no hay
  // sección: el sitio no rellena el hueco con prueba social inventada.
  { id: "casos", kicker: "Casos", corto: "Casos", enIndice: true, visible: CASOS.length > 0 },
  { id: "faq", kicker: "Preguntas", corto: "Preguntas", enIndice: false },
  { id: "contacto", kicker: "Agendar diagnóstico", corto: "Agendar", enIndice: true },
];

export type Seccion = DefinicionSeccion & {
  /** Número de expediente, de "01" en adelante. Sale de la posición. */
  numero: string;
};

/** Las secciones que se renderizan, ya numeradas. */
export const SECCIONES: Seccion[] = DEFINICIONES.filter(
  (seccion) => seccion.visible !== false,
).map((seccion, i) => ({
  ...seccion,
  numero: String(i + 1).padStart(2, "0"),
}));

/** Las que además aparecen en el índice de la barra superior. */
export const SECCIONES_DEL_INDICE = SECCIONES.filter((s) => s.enIndice);

/**
 * Número de una sección. Si la sección está oculta devuelve cadena vacía, que
 * es lo correcto: el componente tampoco se está renderizando.
 */
export function numeroDe(id: IdSeccion): string {
  return SECCIONES.find((seccion) => seccion.id === id)?.numero ?? "";
}

/** Kicker de una sección, para no repetir el texto en el componente. */
export function kickerDe(id: IdSeccion): string {
  return SECCIONES.find((seccion) => seccion.id === id)?.kicker ?? "";
}
