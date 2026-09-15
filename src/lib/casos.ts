/**
 * CASOS — trabajos hechos, con datos verificables
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ ESTE ARREGLO ESTÁ VACÍO A PROPÓSITO                                  │
 * │                                                                       │
 * │ Mientras no haya un caso real, la sección no se renderiza: no hay     │
 * │ sección "casos en preparación", no hay logos, no hay testimonios y    │
 * │ no hay métricas de terceros. La falta de casos no se resuelve         │
 * │ inventando prueba social.                                             │
 * │                                                                       │
 * │ Al agregar el primer objeto acá, la sección aparece en la home con    │
 * │ su número de expediente y el resto de las secciones se corren solas   │
 * │ (ver src/lib/secciones.ts). No hay que tocar ningún componente.       │
 * │                                                                       │
 * │ Regla para cargar un caso: todo dato numérico tiene que poder         │
 * │ sostenerse frente al cliente que lo protagonizó. Si no se puede       │
 * │ decir el nombre de la empresa, se describe el rubro y el tamaño, y    │
 * │ `empresa` queda en null. Lo que no se puede medir no se escribe.      │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type Caso = {
  id: string;
  /** Título corto: el proceso que se pasó a software. */
  titulo: string;
  /** Nombre de la empresa, o null si el trabajo fue bajo reserva. */
  empresa: string | null;
  /** Rubro y tamaño, para ubicar al lector cuando no hay nombre. */
  contexto: string;
  /** Qué problema había. Sin adjetivos. */
  problema: string;
  /** Cómo se hacía antes, paso por paso. */
  procesoAnterior: string[];
  /** Qué se construyó. Descriptivo, no comercial. */
  solucion: string;
  /**
   * Qué cambió, con números que la empresa pueda confirmar. Si no hay número
   * confirmable, se describe el cambio sin inventar uno.
   */
  resultado: string;
  /** Cuánto llevó la implementación. */
  tiempo: string;
  /** Herramientas y sistemas involucrados. Nombres reales. */
  herramientas: string[];
};

export const CASOS: Caso[] = [];

/**
 * DEMOS PROPIAS — sistemas construidos por el estudio, sin cliente detrás.
 *
 * Sirven para mostrar cómo se ve el software cuando todavía no hay casos que
 * se puedan publicar. No son casos y la sección las muestra separadas: una
 * demo propia no es prueba de que alguien nos haya contratado.
 *
 * También vacío hasta que exista la primera.
 */
export type Demo = {
  id: string;
  titulo: string;
  /** Qué hace, en una línea. */
  descripcion: string;
  /** Enlace a la demo si es navegable, o null si solo se muestra en video. */
  enlace: string | null;
  /** Ruta dentro de /public de la captura o el video. */
  media: string | null;
};

export const DEMOS: Demo[] = [];
