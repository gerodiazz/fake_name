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
 * ERAN OCHO Y QUEDARON CINCO, Y EL ORDEN CAMBIÓ.
 *
 * El diagnóstico estaba último, detrás de siete secciones de explicación:
 * era la herramienta de conversión del sitio escondida al final de una clase
 * sobre automatización. Ahora es la 02, pegada al hero: primero qué hacemos,
 * inmediatamente después probalo.
 *
 * Se fueron cuatro secciones enteras: "cómo funciona" (el mecanismo explicado
 * con un diagrama, que los casos reales demuestran mejor), "cómo trabajamos"
 * (cuatro etapas con sus plazos), "condiciones" (cuatro compromisos, hoy una
 * línea bajo el CTA final) y las preguntas frecuentes. Ninguna ayudaba a
 * entender qué hacemos, a demostrar que sabemos hacerlo ni a llegar al
 * diagnóstico. Entró "qué hacemos", que son tres bloques de una línea.
 *
 * "Contacto" no es sección propia: es el cierre de la de socios, y conserva
 * su ancla #contacto.
 */

import { CASOS } from "@/lib/casos";

export type IdSeccion =
  | "contenido"
  | "diagnostico"
  | "casos"
  | "que-hacemos"
  | "socios";

type DefinicionSeccion = {
  id: IdSeccion;
  /** Nombre que aparece en la cabecera de la sección, en sentence case. */
  kicker: string;
  /**
   * Nombre en el índice de la barra superior. Más corto que el kicker: a 11px
   * y en mayúsculas, los nombres largos no entran en un renglón.
   */
  corto: string;
  /**
   * Si aparece en el índice de la barra superior. El hero no aparece —la marca
   * de la izquierda ya vuelve ahí—; el resto sí, que ahora son cuatro.
   */
  enIndice: boolean;
  /** Secciones que dependen de datos que todavía no existen. */
  visible?: boolean;
};

/**
 * El recorrido de la home, en orden. Cuatro preguntas y una sección para cada
 * una: qué hacen, me sirve, ya lo hicieron, cómo empiezo.
 */
const DEFINICIONES: DefinicionSeccion[] = [
  { id: "contenido", kicker: "Portada", corto: "Portada", enIndice: false },
  // La herramienta de conversión, apenas dicho qué hacemos. El visitante
  // puede probar el producto antes de leer un solo argumento.
  { id: "diagnostico", kicker: "Diagnóstico", corto: "Diagnóstico", enIndice: true },
  // La prueba. Se enciende sola cuando hay casos cargados; sin casos no hay
  // sección ni número.
  { id: "casos", kicker: "Casos reales", corto: "Casos", enIndice: true, visible: CASOS.length > 0 },
  { id: "que-hacemos", kicker: "Qué hacemos", corto: "Qué hacemos", enIndice: true },
  // Quiénes somos y la salida. El ancla #contacto vive adentro, así que los
  // enlaces de la barra, del pie y del resultado del diagnóstico siguen
  // funcionando.
  { id: "socios", kicker: "Quiénes estamos detrás", corto: "Nosotros", enIndice: true },
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
