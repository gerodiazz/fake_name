/**
 * PROGRAMA DE REFERIDOS — configuración y cálculo (sección 04)
 *
 * Toda la mecánica económica vive en UN objeto: REFERIDOS. La UI no tiene
 * ningún monto escrito adentro; lee de acá y dibuja lo que encuentre.
 *
 * Agregar un escalón nuevo es agregar una línea al arreglo:
 *
 *     { clientes: 25, bono: 1200 }
 *
 * y la calculadora, las marcas del slider, la barra de progreso y el texto de
 * tope se reacomodan solos. No hay que tocar ningún componente.
 */

export type Escalon = {
  /** Cantidad de clientes referidos acumulados que desbloquea el bono. */
  clientes: number;
  /** Bono en dólares que se cobra al llegar a ese acumulado. */
  bono: number;
};

export type ConfiguracionReferidos = {
  /** Comisión fija por cada cliente referido que cierra. Sin tope. */
  porCliente: number;
  /** Bonos por volumen acumulado. La escalera queda abierta. */
  escalones: Escalon[];
};

export const REFERIDOS: ConfiguracionReferidos = {
  porCliente: 100,
  escalones: [
    { clientes: 10, bono: 300 },
    { clientes: 15, bono: 600 },
    { clientes: 20, bono: 900 },
  ],
};

/* --------------------------------------------------------------------------
   Derivados. Ninguno asume cuántos escalones hay ni en qué orden vienen.
   -------------------------------------------------------------------------- */

/** Escalones de menor a mayor, sin depender del orden en que se escribieron. */
export function escalonesOrdenados(
  config: ConfiguracionReferidos = REFERIDOS,
): Escalon[] {
  return [...config.escalones].sort((a, b) => a.clientes - b.clientes);
}

/**
 * Tope del slider. Por defecto 25, pero si alguien agrega un escalón más
 * alto el slider se estira para que ese escalón sea alcanzable.
 */
export function maximoClientes(
  config: ConfiguracionReferidos = REFERIDOS,
): number {
  const escalones = escalonesOrdenados(config);
  const ultimo = escalones[escalones.length - 1];
  return Math.max(25, ultimo ? ultimo.clientes : 0);
}

export type Ganancia = {
  /** Clientes referidos considerados. */
  clientes: number;
  /** Suma de las comisiones por cliente. */
  comisiones: number;
  /** Suma de los bonos ya desbloqueados. */
  bonos: number;
  /** Comisiones + bonos. */
  total: number;
  /** Escalones alcanzados con esa cantidad de clientes. */
  alcanzados: Escalon[];
  /** Próximo escalón sin alcanzar, o null si ya se pasaron todos. */
  proximo: Escalon | null;
  /** Cuántos clientes faltan para el próximo escalón. 0 si no hay próximo. */
  faltan: number;
};

/** Calcula todo lo que la sección 04 necesita mostrar para N clientes. */
export function calcularGanancia(
  clientes: number,
  config: ConfiguracionReferidos = REFERIDOS,
): Ganancia {
  const escalones = escalonesOrdenados(config);

  const alcanzados = escalones.filter((e) => clientes >= e.clientes);
  const proximo = escalones.find((e) => clientes < e.clientes) ?? null;

  const comisiones = clientes * config.porCliente;
  const bonos = alcanzados.reduce((total, e) => total + e.bono, 0);

  return {
    clientes,
    comisiones,
    bonos,
    total: comisiones + bonos,
    alcanzados,
    proximo,
    faltan: proximo ? proximo.clientes - clientes : 0,
  };
}

/** Formatea un monto en dólares con separador de miles: USD 1.900. */
export function enDolares(monto: number): string {
  return `USD ${monto.toLocaleString("es")}`;
}
