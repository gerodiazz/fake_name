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
 * número: si algún día no hubiera casos reales cargados, la sección no queda
 * vacía ni deja un agujero en la numeración. Las que siguen se corren solas.
 *
 * ERAN ONCE Y QUEDARON OCHO. Se fueron "ejemplos" —tres procesos conceptuales
 * que los casos reales dejaron sin trabajo— y "control", que era una sección
 * entera para explicar que el software pide permisos y avisa cuando no sabe:
 * eso hoy es un renglón de "cómo funciona". "Contacto" dejó de ser sección
 * propia y pasó a ser el cierre de la del diagnóstico.
 */

import { CASOS } from "@/lib/casos";

export type IdSeccion =
  | "contenido"
  | "como-funciona"
  | "casos"
  | "socios"
  | "como-trabajamos"
  | "condiciones"
  | "faq"
  | "diagnostico";

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
   * Si aparece en el índice de la barra superior. Son cuatro: cómo funciona,
   * casos, nosotros y diagnóstico. El hero no aparece —la marca de la
   * izquierda ya vuelve ahí— y las secciones de apoyo tampoco: a 11px y en
   * mayúsculas, una barra cargada es una barra que nadie mira. El panel de
   * mobile las lista todas.
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
  // Se llama igual que el botón secundario del hero: el visitante toca "Ver
  // cómo funciona" y llega a una sección que se llama así.
  { id: "como-funciona", kicker: "Cómo funciona", corto: "Cómo funciona", enIndice: true },
  // La prueba, apenas contado el mecanismo. Se enciende sola cuando hay casos
  // cargados; sin casos no hay sección ni número.
  { id: "casos", kicker: "Casos reales", corto: "Casos", enIndice: true, visible: CASOS.length > 0 },
  { id: "socios", kicker: "Quiénes estamos detrás", corto: "Nosotros", enIndice: true },
  { id: "como-trabajamos", kicker: "Cómo trabajamos", corto: "Proceso", enIndice: false },
  { id: "condiciones", kicker: "Condiciones", corto: "Condiciones", enIndice: false },
  { id: "faq", kicker: "Preguntas", corto: "Preguntas", enIndice: false },
  // El diagnóstico y la salida son una sola sección: los dos piden lo mismo
  // —que la persona cuente su proceso— y tenerlos separados significaba dos
  // cabeceras y dos titulares para una sola intención. El ancla #contacto
  // vive adentro, así que los enlaces de la barra y del pie siguen andando.
  { id: "diagnostico", kicker: "Diagnóstico", corto: "Diagnóstico", enIndice: true },
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
