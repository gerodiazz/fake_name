/**
 * LA TRANSFORMACIÓN — el antes y el después del proceso, en dos renglones.
 *
 * Es la única explicación conceptual que queda en el sitio, y está escrita
 * para entenderse en diez segundos sin leer una oración completa.
 *
 * QUÉ SALIÓ DE ACÁ Y POR QUÉ
 *
 * Este archivo tenía además la definición de "qué es un agente", la
 * comparación entre chatbot, automatización y agente, y su cierre. Eran tres
 * bloques de texto para enseñarle vocabulario técnico a alguien que vino a
 * resolver un problema de su empresa. El sitio no está para explicar qué es
 * un agente: está para mostrar qué proceso deja de depender de una persona.
 * Los casos reales hacen ese trabajo mejor que cualquier definición.
 *
 * La fila de "antes" tiene más piezas que la de "ahora" a propósito: esa
 * acumulación ES el problema, y se ve antes de leerse.
 */

export type Fila = {
  /** Rótulo del renglón. */
  titulo: string;
  /** Los eslabones del recorrido, en orden. */
  piezas: readonly string[];
};

export const TRANSFORMACION: { antes: Fila; ahora: Fila } = {
  antes: {
    titulo: "Antes",
    piezas: ["persona", "WhatsApp", "planilla", "email", "sistema", "persona"],
  },
  ahora: {
    titulo: "Ahora",
    piezas: ["solicitud", "software", "sistemas", "resultado"],
  },
};
