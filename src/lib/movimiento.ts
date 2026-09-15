/**
 * Lectura del ajuste de accesibilidad del sistema operativo.
 *
 * El diagnóstico usa temporizadores para encadenar tachado, ficha del agente y
 * siguiente pregunta. Cuando el sistema pide menos movimiento, esos tiempos se
 * colapsan: el recorrido sigue funcionando igual, pero sin la coreografía.
 */

export function prefiereMenosMovimiento(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Devuelve el retardo pedido, o uno casi nulo si se pidió menos movimiento. */
export function retardo(ms: number): number {
  return prefiereMenosMovimiento() ? 20 : ms;
}
