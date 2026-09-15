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
 * Lo que un agente NO es. Va explícito porque son las tres cosas que la
 * palabra sugiere y que nosotros no vendemos.
 */
export const NO_ES = [
  "No es un chatbot que contesta preguntas con un texto armado de antemano.",
  "No decide por su cuenta fuera del proceso para el que fue construido.",
  "No reemplaza al equipo: se lleva la parte repetitiva del trabajo y frena cuando hace falta una persona.",
];

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
 * La comparación. A la izquierda lo que casi todo el mundo ya conoce; a la
 * derecha lo que agrega un agente. La diferencia se ve en la cantidad de
 * pasos: donde una regla tiene dos, el agente tiene seis.
 */
export const COMPARACION: Columna[] = [
  {
    titulo: "Automatización simple",
    resumen: "Una regla fija: cuando pasa A, hacer B.",
    pasos: [
      "Ocurre algo previsto.",
      "Se ejecuta siempre la misma acción.",
    ],
    cuandoConviene:
      "Cuando el caso es siempre igual y no hay nada que interpretar. Es más barata, más rápida de construir y más fácil de mantener: si el proceso entra acá, lo decimos y se hace así.",
  },
  {
    titulo: "Agente",
    resumen: "Un recorrido: recibe un pedido en texto libre y lo resuelve.",
    pasos: [
      "Recibe una solicitud como la escribió una persona.",
      "Interpreta qué se necesita.",
      "Consulta la información que tiene autorizada.",
      "Decide qué acción corresponde entre las que puede hacer.",
      "Ejecuta y deja registro.",
      "Pide intervención humana si no puede resolverlo con seguridad.",
    ],
    cuandoConviene:
      "Cuando el pedido llega en lenguaje de persona, cambia de forma en cada caso y hay que cruzar datos de más de un sistema para resolverlo.",
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
