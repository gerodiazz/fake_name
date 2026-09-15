/**
 * DATOS DEL DIAGNÓSTICO (sección 02)
 *
 * Todo el contenido del diagnóstico vive aquí: rubros, preguntas y los agentes
 * asociados. Los componentes no tienen texto de negocio adentro, solo leen de
 * estas estructuras. Agregar un rubro o una pregunta es editar este archivo.
 *
 * Regla de nombres: los agentes se llaman por el OFICIO que absorben, nunca
 * por la tecnología que usan. "El que cotiza", no "Motor de cotizaciones IA".
 *
 * Registro: las preguntas son el único lugar del sitio que interpela de forma
 * directa. El resto de los textos es impersonal.
 */

/** Un agente es un proceso que deja de hacerse a mano. */
export type Agente = {
  /** Identificador estable, usado como key y en el mensaje de contacto. */
  id: string;
  /** Nombre de oficio. */
  nombre: string;
  /** Qué hace, en una línea. Descriptivo: sin promesas de resultado. */
  descripcion: string;
  /** Horas semanales que hoy consume ese proceso hecho a mano. */
  horasSemanales: number;
};

/** Una pregunta del recorrido, con su agente y las variantes de respuesta. */
export type Pregunta = {
  id: string;
  /** Interpela de forma directa. Máximo dos líneas. */
  texto: string;
  /** Texto del sí. Alterna entre dos variantes para no sonar a formulario. */
  si: string;
  /** Texto del no. Siempre discreto y siempre el mismo. */
  no: string;
  /** El agente que se contrata si la respuesta es sí. */
  agente: Agente;
};

export type Rubro = {
  id: string;
  /** Nombre visible en la grilla del paso 0. */
  nombre: string;
  /** Las tres preguntas propias del rubro. */
  preguntas: Pregunta[];
  /** Solo "Otro rubro" pide que el visitante escriba su proceso. */
  pideTextoLibre?: boolean;
};

/** Las dos variantes del sí. Se alternan a lo largo de cada recorrido. */
const SI_A = "Sí, todo el tiempo";
const SI_B = "Sí, constantemente";
/** El no es siempre el mismo: es pasar, no elegir. */
const NO = "no, eso no ocurre aquí";

/* --------------------------------------------------------------------------
   Preguntas universales: se suman a las de cualquier rubro.
   -------------------------------------------------------------------------- */

export const PREGUNTAS_UNIVERSALES: Pregunta[] = [
  {
    id: "u-migracion",
    texto: "¿Se copian datos de un sistema a otro a mano?",
    si: SI_B,
    no: NO,
    agente: {
      id: "el-que-traduce",
      nombre: "El que traduce",
      descripcion:
        "Traslada los datos entre sistemas que no se hablan entre sí, sin copiar y pegar.",
      horasSemanales: 6,
    },
  },
  {
    id: "u-reportes",
    texto: "¿El reporte mensual lo arma una persona?",
    si: SI_A,
    no: NO,
    agente: {
      id: "el-que-reporta",
      nombre: "El que reporta",
      descripcion:
        "Arma el reporte con los números de cierre y lo envía el día que corresponde.",
      horasSemanales: 4,
    },
  },
  {
    id: "u-leads",
    texto:
      "¿Los contactos se enfrían porque nadie alcanza a darles seguimiento?",
    si: SI_B,
    no: NO,
    agente: {
      id: "el-que-da-seguimiento",
      nombre: "El que da seguimiento",
      descripcion:
        "Responde al contacto nuevo, sostiene el seguimiento y avisa cuando hay respuesta.",
      horasSemanales: 7,
    },
  },
];

/* --------------------------------------------------------------------------
   Rubros. Tres preguntas propias cada uno.
   -------------------------------------------------------------------------- */

export const RUBROS: Rubro[] = [
  {
    id: "comercio",
    nombre: "Comercio y retail",
    preguntas: [
      {
        id: "comercio-whatsapp",
        texto: "¿Respondes precios y disponibilidad por mensaje todo el día?",
        si: SI_A,
        no: NO,
        agente: {
          id: "comercio-atiende",
          nombre: "El que atiende",
          descripcion:
            "Responde precio, disponibilidad y envío por mensaje, con los datos del sistema de la empresa.",
          horasSemanales: 12,
        },
      },
      {
        id: "comercio-catalogo",
        texto: "¿Actualizas el catálogo a mano en cada canal de venta?",
        si: SI_B,
        no: NO,
        agente: {
          id: "comercio-publica",
          nombre: "El que publica",
          descripcion:
            "Sincroniza precios, fotos y disponibilidad entre el sistema, la tienda y los marketplaces.",
          horasSemanales: 6,
        },
      },
      {
        id: "comercio-pedidos",
        texto: "¿Alguien carga al sistema los pedidos que llegan por mensaje?",
        si: SI_A,
        no: NO,
        agente: {
          id: "comercio-carga",
          nombre: "El que carga",
          descripcion:
            "Lee el pedido que llega por mensaje y lo deja cargado en el sistema, listo para facturar.",
          horasSemanales: 8,
        },
      },
    ],
  },
  {
    id: "servicios",
    nombre: "Servicios profesionales",
    preguntas: [
      {
        id: "servicios-cotizaciones",
        texto: "¿Las cotizaciones se arman a mano todas las semanas?",
        si: SI_A,
        no: NO,
        agente: {
          id: "servicios-cotiza",
          nombre: "El que cotiza",
          descripcion:
            "Arma la cotización con los precios y las condiciones de la empresa, lista para enviar.",
          horasSemanales: 7,
        },
      },
      {
        id: "servicios-firmas",
        texto: "¿Hay que perseguir firmas y documentación de los clientes?",
        si: SI_B,
        no: NO,
        agente: {
          id: "servicios-tramita",
          nombre: "El que tramita",
          descripcion:
            "Pide la documentación, controla que esté completa e insiste hasta que llega.",
          horasSemanales: 5,
        },
      },
      {
        id: "servicios-reuniones",
        texto: "¿Alguien resume las reuniones y reparte las tareas?",
        si: SI_A,
        no: NO,
        agente: {
          id: "servicios-resume",
          nombre: "El que resume",
          descripcion:
            "Deja la minuta escrita y las tareas repartidas al terminar la reunión.",
          horasSemanales: 4,
        },
      },
    ],
  },
  {
    id: "salud",
    nombre: "Salud y consultorios",
    preguntas: [
      {
        id: "salud-citas",
        texto: "¿La recepción dedica el día a dar y mover citas?",
        si: SI_A,
        no: NO,
        agente: {
          id: "salud-agenda",
          nombre: "El que agenda",
          descripcion:
            "Da, mueve y cancela citas según la agenda real de cada profesional.",
          horasSemanales: 14,
        },
      },
      {
        id: "salud-ausencias",
        texto: "¿Se pierden pacientes por ausencias sin aviso?",
        si: SI_B,
        no: NO,
        agente: {
          id: "salud-recuerda",
          nombre: "El que recuerda",
          descripcion:
            "Confirma la cita el día anterior y ofrece el lugar libre a la lista de espera.",
          horasSemanales: 5,
        },
      },
      {
        id: "salud-cobertura",
        texto: "¿Las autorizaciones de cobertura médica se cargan a mano?",
        si: SI_A,
        no: NO,
        agente: {
          id: "salud-tramita",
          nombre: "El que tramita",
          descripcion:
            "Carga afiliados, pide las autorizaciones de cobertura médica y avisa cuando una vuelve rechazada.",
          horasSemanales: 9,
        },
      },
    ],
  },
  {
    id: "inmobiliaria",
    nombre: "Inmobiliaria",
    preguntas: [
      {
        id: "inmo-visitas",
        texto: "¿Las visitas se coordinan por mensaje, una por una?",
        si: SI_A,
        no: NO,
        agente: {
          id: "inmo-agenda",
          nombre: "El que agenda",
          descripcion:
            "Coordina cada visita con el interesado y con quien tiene la llave, y la confirma.",
          horasSemanales: 8,
        },
      },
      {
        id: "inmo-portales",
        texto: "¿La misma propiedad se publica en cinco portales distintos?",
        si: SI_B,
        no: NO,
        agente: {
          id: "inmo-publica",
          nombre: "El que publica",
          descripcion:
            "Publica y actualiza cada propiedad en todos los portales desde una sola carga.",
          horasSemanales: 6,
        },
      },
      {
        id: "inmo-consultas",
        texto: "¿Alguien filtra las consultas que nunca van a comprar?",
        si: SI_A,
        no: NO,
        agente: {
          id: "inmo-filtra",
          nombre: "El que filtra",
          descripcion:
            "Hace las preguntas de siempre y deriva solo las consultas con intención de compra.",
          horasSemanales: 7,
        },
      },
    ],
  },
  {
    id: "industria",
    nombre: "Industria y logística",
    preguntas: [
      {
        id: "industria-entregas",
        texto: "¿Las entregas se siguen por teléfono?",
        si: SI_A,
        no: NO,
        agente: {
          id: "industria-sigue",
          nombre: "El que sigue",
          descripcion:
            "Sigue cada entrega, avisa los desvíos y deja el comprobante de entrega conformado en el sistema.",
          horasSemanales: 10,
        },
      },
      {
        id: "industria-ordenes",
        texto: "¿Las órdenes de compra se cargan a mano?",
        si: SI_B,
        no: NO,
        agente: {
          id: "industria-carga",
          nombre: "El que carga",
          descripcion:
            "Lee la orden de compra que llega por correo y la carga con sus ítems y precios.",
          horasSemanales: 8,
        },
      },
      {
        id: "industria-stock",
        texto: "¿El control de stock se hace revisando hojas de cálculo?",
        si: SI_A,
        no: NO,
        agente: {
          id: "industria-controla",
          nombre: "El que controla",
          descripcion:
            "Cruza las hojas de cálculo con el sistema todos los días y avisa los faltantes.",
          horasSemanales: 6,
        },
      },
    ],
  },
  {
    id: "gastronomia",
    nombre: "Gastronomía y turismo",
    preguntas: [
      {
        id: "gastro-reservas",
        texto: "¿Las reservas entran por teléfono y por mensaje a la vez?",
        si: SI_A,
        no: NO,
        agente: {
          id: "gastro-reserva",
          nombre: "El que reserva",
          descripcion:
            "Toma las reservas de los dos canales sobre una sola disponibilidad, sin superponer.",
          horasSemanales: 9,
        },
      },
      {
        id: "gastro-preguntas",
        texto:
          "¿Se responden las mismas preguntas de horarios y menú todos los días?",
        si: SI_B,
        no: NO,
        agente: {
          id: "gastro-atiende",
          nombre: "El que atiende",
          descripcion:
            "Responde horarios, menú, precios y cómo llegar, a cualquier hora.",
          horasSemanales: 6,
        },
      },
      {
        id: "gastro-resenas",
        texto: "¿Las reseñas quedan sin responder?",
        si: SI_A,
        no: NO,
        agente: {
          id: "gastro-responde",
          nombre: "El que responde",
          descripcion:
            "Redacta la respuesta a cada reseña con el tono de la empresa y la deja lista para publicar.",
          horasSemanales: 3,
        },
      },
    ],
  },
  {
    id: "otro",
    nombre: "Otro rubro",
    // Sin preguntas propias: solo las universales más el campo de texto libre.
    preguntas: [],
    pideTextoLibre: true,
  },
];

/* --------------------------------------------------------------------------
   Derivados
   -------------------------------------------------------------------------- */

/** Busca un rubro por id. Devuelve undefined si el id no existe. */
export function buscarRubro(id: string | null): Rubro | undefined {
  if (!id) return undefined;
  return RUBROS.find((r) => r.id === id);
}

/**
 * Arma el recorrido de preguntas de un rubro: primero las tres propias,
 * después las tres universales.
 */
export function preguntasDeRubro(rubro: Rubro): Pregunta[] {
  return [...rubro.preguntas, ...PREGUNTAS_UNIVERSALES];
}

/** Todas las preguntas del sitio, por si hay que buscar una por id. */
export function buscarPregunta(id: string): Pregunta | undefined {
  for (const rubro of RUBROS) {
    const encontrada = rubro.preguntas.find((p) => p.id === id);
    if (encontrada) return encontrada;
  }
  return PREGUNTAS_UNIVERSALES.find((p) => p.id === id);
}

/** Semanas de trabajo al año que se usan para anualizar las horas. */
export const SEMANAS_POR_ANIO = 48;

/** Semanas base de implementación, antes de sumar una por agente. */
export const SEMANAS_BASE = 2;

/** Tope de semanas de implementación, sin importar cuántos agentes entren. */
export const SEMANAS_TOPE = 8;

/**
 * Horas anuales involucradas en los procesos marcados: suma de horas
 * semanales × 48. Es una estimación y el sitio lo dice donde la muestra.
 */
export function horasPorAnio(agentes: Agente[]): number {
  const semanales = agentes.reduce((total, a) => total + a.horasSemanales, 0);
  return semanales * SEMANAS_POR_ANIO;
}

/** Plazo de implementación: 2 semanas + 1 por agente, con tope de 8. */
export function semanasDeImplementacion(cantidadAgentes: number): number {
  return Math.min(SEMANAS_BASE + cantidadAgentes, SEMANAS_TOPE);
}
