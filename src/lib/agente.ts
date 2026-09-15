/**
 * QUÉ ES UN AGENTE — explicación para alguien que no es técnico (sección 02)
 *
 * Es la pieza que faltaba: el sitio usaba la palabra "agente" en todos lados y
 * no la definía en ningún lado. Quien no trabaja en software se queda con una
 * idea vaga, y una idea vaga no se compra.
 *
 * REGLAS DE REDACCIÓN DE ESTE ARCHIVO
 *
 * · Nada de "piensa", "entiende como una persona", "razona" ni "aprende solo".
 *   El software interpreta un pedido y ejecuta acciones dentro de un proceso
 *   definido. Exagerar la autonomía se paga caro en la primera reunión.
 *
 * · Nada de reemplazo de personas. Lo que se automatiza es trabajo repetitivo,
 *   y en el sitio se dice así. Vender "reemplazá empleados" es otro negocio y
 *   además es mentira: el recorrido tiene una etapa que se llama escalamiento.
 *
 * · La comparación con la automatización simple no es para despreciarla. Una
 *   regla "si pasa A, hacer B" es la solución correcta muchas veces, y decirlo
 *   da más credibilidad que presentar al agente como la respuesta a todo.
 */

/** La definición, en una sola oración. Es lo primero que se lee. */
export const DEFINICION =
  "Un agente es software que recibe una tarea, interpreta qué hay que hacer, consulta la información que tiene autorizada, ejecuta acciones con las herramientas que le dimos y deja registro de lo que hizo.";

/**
 * A veces la respuesta correcta no es un agente. Decirlo vale más que la
 * venta: una regla fija es más barata, más rápida de construir y más fácil de
 * mantener, y cuando el proceso entra ahí, se hace así.
 */
export const A_VECES_ALCANZA_UNA_REGLA =
  "Cuando el caso es siempre igual y no hay nada que interpretar, no hace falta un agente: alcanza con una regla fija —si pasa esto, hacer aquello—, que es más barata y más fácil de mantener. Si el proceso entra ahí, lo decimos y se hace así.";

export type Columna = {
  titulo: string;
  /** Cómo se lo describe en una línea. */
  resumen: string;
  /** El recorrido, paso por paso. Es la comparación que importa. */
  pasos: string[];
  /** Cuándo conviene. Que la automatización simple tenga su lugar es el punto. */
  cuandoConviene: string;
};

/**
 * La comparación. A la izquierda lo que casi cualquiera ya conoce y con lo que
 * nos van a confundir; a la derecha lo que hacemos. La diferencia se ve en la
 * cantidad de pasos, sin que haya que explicarla: donde un chatbot tiene dos,
 * un agente tiene cinco, y tres de esos cinco tocan los sistemas de la empresa.
 */
export const COMPARACION: Columna[] = [
  {
    titulo: "Chatbot",
    resumen: "Contesta. No toca ningún sistema.",
    pasos: ["Recibe una pregunta.", "Devuelve una respuesta."],
    cuandoConviene:
      "Cuando alcanza con informar: horarios, dirección, preguntas frecuentes.",
  },
  {
    titulo: "Agente",
    resumen: "Hace el trabajo. Deja el proceso avanzado.",
    pasos: [
      "Recibe una solicitud como la escribió una persona.",
      "Interpreta qué se necesita.",
      "Consulta la información que tiene autorizada.",
      "Ejecuta la acción que corresponde y deja registro.",
      "Pide intervención humana si no puede resolverlo con seguridad.",
    ],
    cuandoConviene:
      "Cuando el pedido llega en lenguaje de persona, cambia de forma en cada caso y hay que tocar los sistemas de la empresa para resolverlo.",
  },
];

/**
 * LA TRANSFORMACIÓN — el diagrama de la sección 02.
 *
 * Tres bloques: cómo se hace hoy, qué lo reemplaza, con qué queda la empresa.
 * Es la explicación más corta posible de lo que vendemos, y la única del sitio
 * que se entiende sin leer una sola oración completa.
 *
 * El bloque de la izquierda tiene a propósito más piezas que los otros dos:
 * esa acumulación —seis saltos entre personas, aplicaciones y planillas— es el
 * problema, y se ve antes de leerse.
 */
export const TRANSFORMACION = {
  hoy: {
    titulo: "El proceso hoy",
    detalle: "Seis saltos entre personas, aplicaciones y planillas.",
    piezas: ["persona", "WhatsApp", "planilla", "email", "sistema", "persona"],
  },
  software: {
    titulo: "Lo que se construye",
    detalle: "Un solo recorrido, con lo que necesita para resolverlo.",
    piezas: ["agente", "herramientas", "datos autorizados", "reglas"],
  },
  resultado: {
    titulo: "Lo que queda",
    detalle: "El trabajo hecho, y la prueba de cómo se hizo.",
    piezas: ["proceso ejecutado", "registro", "intervención cuando corresponde"],
  },
} as const;
