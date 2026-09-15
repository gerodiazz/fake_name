/**
 * DEMOSTRACIÓN (sección 02)
 *
 * Un pedido que entra por WhatsApp y termina cargado en el sistema, con cada
 * paso a la vista. Es lo que el sitio no mostraba: se explicaba muy bien qué
 * hacemos y no se veía nunca cómo se ve.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ ESTO ES UNA DEMOSTRACIÓN Y LA PÁGINA LO DICE                         │
 * │                                                                       │
 * │ El diálogo y los datos son de ejemplo. No es una captura de un        │
 * │ cliente, no es una conversación real y no se presenta como tal: la    │
 * │ sección lleva el rótulo "datos de ejemplo" arriba de la pieza, no     │
 * │ abajo en letra chica.                                                 │
 * │                                                                       │
 * │ Cuando exista una demo propia navegable o un caso real publicable,    │
 * │ esta pieza se reemplaza (ver src/lib/casos.ts).                       │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * El último paso de la traza no es automático: espera aprobación. Está puesto
 * a propósito, y es el enganche con la sección de control: lo que se muestra
 * acá es lo mismo que se promete allá.
 */

export type Mensaje = {
  /** Quién habla: el cliente de la empresa, o el software. */
  de: "cliente" | "sistema";
  texto: string;
  /** Hora de ejemplo, para que se lea como una conversación y no como un log. */
  hora: string;
};

export type PasoTraza = {
  id: string;
  /** Qué hace el sistema, en dos o tres palabras. */
  accion: string;
  /** El dato concreto con el que trabaja. De ejemplo, como todo el bloque. */
  detalle: string;
  /**
   * · automatico  el sistema lo resuelve solo
   * · control     el sistema verifica y puede frenar
   * · aprobacion  no avanza hasta que una persona lo confirma
   */
  tipo: "automatico" | "control" | "aprobacion";
};

export const DEMOSTRACION = {
  /** Rótulo obligatorio: aparece antes de la pieza, no después. */
  rotulo: "Demostración · datos de ejemplo",
  titulo: "Un pedido que entra por mensaje y termina cargado en el sistema",
  bajada:
    "El mismo recorrido que hoy hace una persona a mano: leer el mensaje, buscar el producto, chequear el stock, cargar el pedido. A la derecha, lo que ejecuta el software en cada paso.",

  /** Canal de entrada. El pedido llega como lo escribiría cualquiera. */
  canal: "WhatsApp · Pedidos",

  conversacion: [
    {
      de: "cliente",
      texto:
        "Hola, necesito 20 unidades del filtro 45 mm para entregar el jueves. Facturamos a Distribuidora del Sur.",
      hora: "21:04",
    },
    {
      de: "sistema",
      texto:
        "Tengo 20 unidades del filtro 45 mm disponibles. Para el jueves, la entrega entra sin problema. Te confirmo el pedido a nombre de Distribuidora del Sur.",
      hora: "21:04",
    },
    {
      de: "cliente",
      texto: "Perfecto, dale.",
      hora: "21:05",
    },
  ] satisfies Mensaje[],

  traza: [
    {
      id: "interpreta",
      accion: "Interpreta el mensaje",
      detalle: "producto · cantidad 20 · entrega jueves · cliente identificado",
      tipo: "automatico",
    },
    {
      id: "consulta",
      accion: "Consulta el sistema",
      detalle: "busca el producto en el catálogo de la empresa",
      tipo: "automatico",
    },
    {
      id: "verifica",
      accion: "Verifica disponibilidad",
      detalle: "stock suficiente para la fecha pedida",
      tipo: "control",
    },
    {
      id: "responde",
      accion: "Responde con el dato real",
      detalle: "confirma sobre el stock del sistema, no sobre una respuesta fija",
      tipo: "automatico",
    },
    {
      id: "carga",
      accion: "Carga el pedido",
      detalle: "queda cargado y listo para facturar",
      tipo: "aprobacion",
    },
    {
      id: "registra",
      accion: "Deja el registro",
      detalle: "qué hizo, cuándo y con qué datos",
      tipo: "automatico",
    },
  ] satisfies PasoTraza[],

  /** Lo que hay que entender al terminar de mirar la pieza. */
  cierre:
    "El paso que carga el pedido espera confirmación. Cuáles quedan automáticos y cuáles esperan a una persona se decide antes de construir.",
} as const;

/** Etiqueta visible de cada tipo de paso. */
export const ETIQUETA_TIPO: Record<PasoTraza["tipo"], string> = {
  automatico: "automático",
  control: "verifica",
  aprobacion: "espera aprobación",
};
