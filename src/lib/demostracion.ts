/**
 * EJEMPLO CONCEPTUAL (sección 02)
 *
 * Un pedido que entra por mensaje y termina cargado en el sistema, con las
 * seis etapas a la vista. Es lo que el sitio no mostraba: se explicaba qué
 * hacemos y no se veía nunca cómo se ve.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ NO ES UN CASO. ES UN EJEMPLO, Y LA PÁGINA LO DICE ARRIBA.            │
 * │                                                                       │
 * │ El diálogo y los datos son inventados para explicar el recorrido. No  │
 * │ hay cliente detrás, no se presenta como captura de nada y el rótulo   │
 * │ va antes de la pieza, no al pie en letra chica.                       │
 * │                                                                       │
 * │ Tampoco hay resultados: ni porcentajes, ni horas ahorradas, ni "de X  │
 * │ minutos a Y segundos". Un ejemplo sirve para entender el mecanismo,   │
 * │ no para probar nada.                                                  │
 * │                                                                       │
 * │ Cuando exista un caso publicable, se reemplaza (ver src/lib/casos.ts).│
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * LAS SEIS ETAPAS son el esqueleto de cualquier proceso que construimos, y se
 * repiten en la sección de ejemplos por industria: solicitud, interpretación,
 * consulta, acción, registro y escalamiento. Que sean siempre las mismas es
 * el argumento: no es un chatbot distinto para cada empresa, es el mismo
 * recorrido aplicado a procesos distintos.
 */

export type Mensaje = {
  /** Quién habla: el cliente de la empresa, o el software. */
  de: "cliente" | "sistema";
  texto: string;
  /** Hora de ejemplo, para que se lea como conversación y no como un log. */
  hora: string;
};

export type Etapa = {
  id: string;
  /** El nombre de la etapa. Se repite en toda la sección de ejemplos. */
  nombre: string;
  /** Qué pasa en esta etapa, en una línea. */
  que: string;
  /** El dato concreto de este ejemplo. Inventado, como todo el bloque. */
  detalle: string;
  /** Marca las etapas que no son automáticas. */
  intervencion?: "aprobacion" | "persona";
  /**
   * Lo que muestra el estado mientras esa etapa está corriendo, y lo que
   * queda cuando termina. Es lo que diferencia "el sistema está ejecutando un
   * proceso" de "se está generando un texto": un proceso tiene estados.
   */
  corriendo: string;
  estado: string;
  /** Tono del estado terminado: verde si resolvió, tinta si espera a alguien. */
  tono: "listo" | "atencion";
};

export const DEMOSTRACION = {
  /** Rótulo obligatorio: aparece antes de la pieza, no después. */
  rotulo: "Ejemplo conceptual · así podría funcionar",
  titulo: "Un pedido que entra por mensaje y termina cargado en el sistema",
  bajada:
    "El mismo recorrido que hoy hace una persona a mano: leer el mensaje, buscar el producto, chequear el stock, cargar el pedido. A la derecha, qué hace el software en cada etapa.",

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
        "Tengo 20 unidades del filtro 45 mm disponibles y el jueves entra sin problema. Dejo el pedido preparado a nombre de Distribuidora del Sur para que lo confirme el equipo.",
      hora: "21:04",
    },
    {
      de: "cliente",
      texto: "Perfecto, dale.",
      hora: "21:05",
    },
  ] satisfies Mensaje[],

  etapas: [
    {
      id: "solicitud",
      nombre: "Solicitud",
      que: "Entra un pedido por el canal que la empresa ya usa.",
      detalle: "Un mensaje de WhatsApp, a las nueve de la noche.",
      corriendo: "recibiendo",
      estado: "recibido",
      tono: "listo",
    },
    {
      id: "interpretacion",
      nombre: "Interpretación",
      que: "El software identifica qué se está pidiendo.",
      detalle: "Producto, cantidad 20, entrega el jueves, cliente identificado.",
      corriendo: "procesando",
      estado: "procesado",
      tono: "listo",
    },
    {
      id: "consulta",
      nombre: "Consulta",
      que: "Busca en las fuentes que tiene autorizadas.",
      detalle: "Catálogo y stock de la empresa. No responde de memoria.",
      corriendo: "consultando",
      estado: "consultado",
      tono: "listo",
    },
    {
      id: "accion",
      nombre: "Acción",
      que: "Ejecuta lo que corresponde dentro de sus permisos.",
      detalle: "Deja el pedido preparado, a la espera de confirmación.",
      intervencion: "aprobacion",
      corriendo: "ejecutando",
      estado: "espera confirmación",
      tono: "atencion",
    },
    {
      id: "registro",
      nombre: "Registro",
      que: "Deja escrito qué hizo y con qué datos.",
      detalle: "Mensaje original, consulta al stock y pedido generado.",
      corriendo: "registrando",
      estado: "registrado",
      tono: "listo",
    },
    {
      id: "escalamiento",
      nombre: "Escalamiento",
      que: "Si no puede resolverlo con seguridad, lo pasa a una persona.",
      detalle:
        "Si el filtro no estuviera o el cliente no figurara, frena y avisa.",
      intervencion: "persona",
      corriendo: "evaluando",
      estado: "requiere intervención",
      tono: "atencion",
    },
  ] satisfies Etapa[],

  /**
   * El marco: lo que delimita al software. Es la diferencia entre esto y un
   * chatbot conectado a una empresa sin reglas. Cada punto de acá es una
   * decisión que se toma con el cliente antes de construir.
   */
  marco: [
    {
      titulo: "Información autorizada",
      detalle: "El catálogo y el stock de la empresa. No inventa datos.",
    },
    {
      titulo: "Herramientas",
      detalle: "Consultar stock y preparar un pedido. Nada más que eso.",
    },
    {
      titulo: "Permisos",
      detalle: "Puede preparar el pedido; no puede facturarlo ni tocar precios.",
    },
    {
      titulo: "Reglas",
      detalle: "Si el cliente no figura en el sistema, no avanza.",
    },
    {
      titulo: "Registro",
      detalle: "Cada paso queda escrito y la empresa puede revisarlo.",
    },
    {
      titulo: "Intervención humana",
      detalle: "El pedido lo confirma una persona antes de que sea firme.",
    },
  ],

  /** Lo que hay que entender al terminar de mirar la pieza. */
  cierre:
    "Cuáles de estas etapas quedan automáticas y cuáles esperan a una persona no lo decide el software: se define con la empresa antes de escribir código.",
} as const;

/**
 * La etapa de escalamiento es CONDICIONAL: en este ejemplo no se dispara, y el
 * recorrido termina sin ella. Se muestra igual, marcada como lo que es —una
 * salida prevista— porque es la parte que baja el riesgo percibido. El sitio
 * no dice que todos los sistemas la tengan: lo dice la sección de control, que
 * la presenta como una capacidad que se define por proceso.
 */
export const ETAPA_CONDICIONAL = "escalamiento";

/** Etiqueta visible de las etapas que no son automáticas. */
export const ETIQUETA_INTERVENCION = {
  aprobacion: "espera confirmación",
  persona: "pasa a una persona",
} as const;
