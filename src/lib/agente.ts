/**
 * QUÉ ES UN AGENTE (sección 02)
 *
 * El sitio usaba la palabra "agente" en todos lados sin definirla. Esto la
 * define, y lo hace en la menor cantidad de palabras posible: una oración y
 * tres cadenas.
 *
 * POR QUÉ TRES COLUMNAS Y NO DOS
 *
 * Antes eran dos —chatbot y agente— más un párrafo aparte explicando que a
 * veces alcanza con una regla fija. Ese párrafo era, en realidad, la tercera
 * columna: la automatización de toda la vida. Puesta al lado de las otras dos
 * dice lo mismo en cinco palabras, y además ordena la escala completa de menos
 * a más: responder, ejecutar reglas, resolver.
 *
 * REGLAS DE REDACCIÓN
 *
 * · Nada de "piensa", "entiende como una persona" ni "aprende solo".
 * · Nada de reemplazo de personas: se automatiza trabajo repetitivo.
 * · La automatización simple no se desprecia. Muchas veces es la respuesta
 *   correcta, y decirlo da más credibilidad que vender agentes para todo.
 */

/** La definición, en una sola oración. Es lo primero que se lee. */
export const DEFINICION =
  "Un agente es software que recibe una tarea, interpreta qué hay que hacer, consulta la información que tiene autorizada, ejecuta la acción con las herramientas que le dimos y deja registro.";

export type Columna = {
  titulo: string;
  /** Qué hace, en dos o tres palabras. */
  resumen: string;
  /**
   * El recorrido, como cadena de eslabones. La diferencia tiene que VERSE
   * —uno, dos o seis eslabones— y eso no necesita oraciones. El recorrido
   * completo se cuenta una sola vez, en el ejemplo de abajo.
   */
  cadena: string[];
};

export const COMPARACION: Columna[] = [
  {
    titulo: "Chatbot",
    resumen: "Responde.",
    cadena: ["pregunta", "respuesta"],
  },
  {
    titulo: "Automatización",
    resumen: "Ejecuta reglas.",
    cadena: ["si pasa esto", "hace aquello"],
  },
  {
    titulo: "Agente",
    resumen: "Interpreta, decide dentro de límites y ejecuta.",
    cadena: [
      "solicitud",
      "interpreta",
      "consulta",
      "ejecuta",
      "registra",
      "deriva si hace falta",
    ],
  },
];

/**
 * El cierre de la comparación. Es la única frase que se permite después de las
 * tres columnas, y está para que quede claro que no vendemos agentes para
 * todo: si el proceso entra en una regla fija, se hace con una regla fija.
 */
export const CIERRE_COMPARACION =
  "Cuando el caso es siempre igual, una regla fija es más barata y más fácil de mantener. Lo decimos cuando corresponde.";

/**
 * LA TRANSFORMACIÓN — el diagrama de la sección 02.
 *
 * Tres bloques: cómo se hace hoy, qué lo reemplaza, con qué queda la empresa.
 * Es la explicación más corta del sitio y la única que se entiende sin leer
 * una sola oración completa.
 *
 * El bloque de la izquierda tiene a propósito más piezas que los otros dos:
 * esa acumulación —seis saltos entre personas y aplicaciones— es el problema,
 * y se ve antes de leerse.
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
