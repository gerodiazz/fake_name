/**
 * CASOS REALES — trabajos entregados, con el cliente detrás
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ REGLA DE CARGA, SIN EXCEPCIONES                                       │
 * │                                                                       │
 * │ Todo lo que se escribe acá tiene que poder sostenerse frente al       │
 * │ cliente que lo protagonizó. No hay porcentajes, no hay horas          │
 * │ ahorradas, no hay dinero recuperado y no hay conversión: si el        │
 * │ número no se midió, no se escribe. Lo mismo con las citas: un         │
 * │ testimonio sin texto exacto queda en `null` y la sección no lo        │
 * │ dibuja, en vez de rellenarse con una frase que nadie dijo.            │
 * │                                                                       │
 * │ Un caso deja de ser caso en el momento en que algo de esto se         │
 * │ inventa: el valor de la sección es justamente que todo es             │
 * │ verificable.                                                          │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * CASOS ≠ EJEMPLOS. Lo de acá está construido y entregado. Los de
 * src/lib/ejemplos.ts son procesos que se podrían construir, y están
 * rotulados así en su propia sección. Las dos cosas nunca se mezclan.
 */

/**
 * Testimonio de un cliente.
 *
 * `cita` es TEXTO EXACTO o `null`. No hay tercera opción: si tenemos la idea
 * pero no las palabras, queda en null y el bloque no se renderiza. Parafrasear
 * a alguien entre comillas es inventarle una cita.
 */
export type Testimonio = {
  cita: string | null;
  persona: string;
  rol: string;
};

/**
 * Material visual del caso. Hoy, solo video.
 *
 * `fuente` y `poster` son rutas dentro de /public, o `null` mientras el
 * archivo no exista. Sin `fuente` el bloque no se dibuja: no hay recuadro de
 * "video próximamente".
 *
 * `vertical` es para grabaciones de pantalla de teléfono, que se comen media
 * pantalla de alto si se las deja crecer a ancho completo.
 *
 * `ancho` y `alto` son los del archivo, en pixeles. Van al elemento para que
 * el navegador reserve el lugar antes de bajar el poster: sin ellos, el texto
 * que sigue salta hacia abajo cuando la imagen entra.
 */
export type Media = {
  titulo: string;
  descripcion: string;
  fuente: string | null;
  poster: string | null;
  vertical: boolean;
  ancho: number;
  alto: number;
};

/**
 * Una etapa del trabajo. Los proyectos de una sola entrega tienen una; el de
 * Medex tiene dos, y la segunda todavía está en curso.
 *
 * `estado` existe para poder decirlo. Presentar como terminado algo que está a
 * mitad de camino es la forma más rápida de perder la credibilidad que la
 * sección entera vino a construir.
 */
export type Etapa = {
  titulo: string;
  estado: "entregada" | "en curso";
  detalle: string;
  puntos: string[];
};

/**
 * Un proceso del caso: cómo se hacía antes y cómo corre ahora.
 *
 * `pasos` se dibuja como cadena —A → B → C—, que es la manera más corta de
 * mostrar un flujo sin tener que diagramar nada.
 */
export type Flujo = {
  titulo: string;
  antes: string;
  pasos: string[];
};

export type Caso = {
  /** Segmento de la URL: /casos/<slug>. */
  slug: string;
  /** Nombre del cliente. Los tres autorizaron mostrarlo. */
  cliente: string;
  /** Rubro, en dos o tres palabras. */
  industria: string;
  /**
   * Qué clase de software es. Está acá para que se vea que no es lo mismo en
   * los tres: uno es un agente y otro es una automatización. La tecnología la
   * decide el proceso.
   */
  tipo: string;
  /** El antes y el después en una sola oración. Es el gancho de la tarjeta. */
  resumen: string;
  /** Qué se construyó, en una línea. */
  construido: string;
  /** Tres nombres cortos para la tarjeta. La lista completa es `herramientas`. */
  integraciones: string[];
  /** El problema, en párrafos. Sin adjetivos y sin dramatizar. */
  problema: string[];
  etapas: Etapa[];
  flujos: Flujo[];
  /** Qué cambió. Solo lo que el cliente puede confirmar. */
  resultado: string[];
  testimonio: Testimonio | null;
  /** Sistemas y herramientas realmente involucrados. */
  herramientas: string[];
  media: Media | null;
};

export const CASOS: Caso[] = [
  {
    slug: "grupo-medex",
    cliente: "Grupo Medex",
    industria: "Salud · dos sedes",
    tipo: "Agente de IA + extensión a medida",
    resumen:
      "De atender consultas y cargar turnos a mano para dos sedes a un agente que atiende y agenda por WhatsApp.",
    construido:
      "Agente de atención y turnos, más un control automático de las validaciones de PAMI.",
    integraciones: ["WhatsApp", "Trilan", "PAMI"],
    problema: [
      "El equipo pasaba gran parte del día respondiendo consultas y sacando turnos a mano para las dos sedes.",
      "Además, las prácticas médicas realizadas tienen que validarse ante PAMI. Ese control dependía de que una persona se acordara de entrar a revisar. Una práctica ya realizada no se validó a tiempo: PAMI no la pagó y Grupo Medex la hizo sin cobrarla.",
    ],
    etapas: [
      {
        titulo: "Atención y turnos",
        estado: "entregada",
        detalle:
          "Un agente de IA que atiende por WhatsApp para las dos sedes. La agenda funciona de forma autónoma.",
        puntos: [
          "Responde las consultas",
          "Agenda el turno",
          "Carga el turno en el sistema",
          "Confirma el turno",
        ],
      },
      {
        titulo: "Control de validaciones de PAMI",
        estado: "en curso",
        detalle:
          "El sistema de PAMI no expone una API para este proceso. Construimos una extensión de Chrome a medida que corre en la computadora del cliente y entra periódicamente a la plataforma a revisar el estado de las prácticas.",
        puntos: [
          "Prácticas validadas",
          "Prácticas no validadas",
          "Desglose por módulo",
          "Si la dueña lo quiere, todos los días a las 9:00 llega un resumen con el total de prácticas, cuántas están validadas, cuántas no y el desglose por módulo",
        ],
      },
    ],
    flujos: [
      {
        titulo: "Turnos y consultas",
        antes:
          "El equipo respondía cada consulta y cargaba cada turno a mano, para las dos sedes.",
        pasos: ["WhatsApp", "Agente", "Sistema de turnos", "Confirmación"],
      },
      {
        titulo: "Validaciones de PAMI",
        antes:
          "Una persona tenía que acordarse de entrar periódicamente a la plataforma de PAMI a revisar el estado de las prácticas.",
        pasos: [
          "Plataforma de PAMI",
          "Control automático",
          "Detección",
          "Resumen",
          "Intervención cuando corresponde",
        ],
      },
    ],
    resultado: [
      "El equipo, que antes estaba saturado de consultas y turnos, puede dedicarse a otras tareas.",
      "El control de validaciones apunta a evitar pérdidas como la que ya habían tenido: una práctica realizada, no validada a tiempo y no pagada por PAMI.",
    ],
    // Sol, directora de Grupo Medex, nos dejó su testimonio, pero todavía no
    // tenemos el texto exacto. Hasta que lo tengamos, `cita` queda en null y
    // el bloque no se dibuja. La idea que expresó —que el equipo, antes
    // saturado de turnos y consultas, ahora puede enfocarse en lo suyo— ya
    // está dicha arriba, en `resultado`, con nuestras palabras y sin comillas.
    testimonio: { cita: null, persona: "Sol", rol: "Directora de Grupo Medex" },
    herramientas: [
      "WhatsApp Business",
      "Poly Digital",
      "Trilan",
      "Extensión de Chrome a medida",
      "Plataforma de PAMI",
    ],
    // Grabación real, 384×832 y 2:20. El poster es un cuadro de la propia
    // conversación —el agente presentándose, sin ningún dato personal a la
    // vista— y es lo único que carga hasta que alguien toca play.
    media: {
      titulo: "El agente sacando un turno por WhatsApp",
      descripcion:
        "Grabación real de la conversación: la consulta, el turno agendado y la confirmación.",
      fuente: "/videos/medex-turno-whatsapp.mp4",
      poster: "/videos/medex-turno-whatsapp.jpg",
      vertical: true,
      ancho: 384,
      alto: 832,
    },
  },
  {
    slug: "emoty",
    cliente: "Emoty",
    industria: "Venta de arte",
    tipo: "Agente de atención",
    resumen:
      "De una atención manual que ya no daba abasto a un agente que responde automáticamente.",
    construido:
      "Agente de atención al público, conectado con WhatsApp, Tiendanube y Kommo.",
    integraciones: ["WhatsApp", "Tiendanube", "Kommo"],
    problema: [
      "El equipo atendía personalmente las consultas que llegaban por Instagram, WhatsApp y el resto de los canales.",
      "El volumen de consultas había superado la capacidad del equipo.",
    ],
    etapas: [
      {
        titulo: "Agente de atención al público",
        estado: "entregada",
        detalle:
          "Responde las consultas y guía al cliente hasta lo que está buscando.",
        puntos: [
          "Responde automáticamente",
          "Ofrece las preguntas frecuentes",
          "Usa menús interactivos",
        ],
      },
    ],
    flujos: [
      {
        titulo: "Atención al público",
        antes:
          "Cada consulta de Instagram, WhatsApp y los demás canales la respondía una persona del equipo.",
        pasos: [
          "Consulta",
          "Agente",
          "Preguntas frecuentes y menús",
          "Respuesta",
        ],
      },
    ],
    resultado: [
      "La atención dejó de depender de que alguien del equipo estuviera disponible para responder.",
    ],
    testimonio: {
      cita: "metieron un buen salto",
      persona: "Martín",
      rol: "Fundador de Emoty",
    },
    herramientas: ["WhatsApp", "Tiendanube", "Kommo CRM"],
    media: null,
  },
  {
    slug: "las-titas-bikinis",
    cliente: "Las Titas Bikinis",
    industria: "E-commerce · indumentaria",
    tipo: "Automatización",
    resumen:
      "Del email de carrito abandonado de Tiendanube a un seguimiento por WhatsApp cada dos horas.",
    construido:
      "Automatización que detecta los carritos abandonados y manda el enlace para completar la compra.",
    integraciones: ["Make", "Tiendanube", "WhatsApp"],
    problema: [
      "Tenían carritos abandonados en Tiendanube, y el único seguimiento era el email que la plataforma envía por defecto.",
    ],
    etapas: [
      {
        titulo: "Automatización de carritos abandonados",
        estado: "entregada",
        detalle:
          "Hecha con Make y conectada a Tiendanube. Corre cada dos horas. No hay agente acá: el proceso no lo necesita.",
        puntos: [
          "Revisa los carritos abandonados nuevos",
          "Filtra para no repetir el mismo carrito",
          "Envía un WhatsApp",
          "Incluye el link para completar la compra",
        ],
      },
    ],
    flujos: [
      {
        titulo: "Carritos abandonados",
        antes:
          "El único seguimiento automático era el email de carrito abandonado de Tiendanube.",
        pasos: [
          "Tiendanube, cada 2 horas",
          "Detección",
          "Filtro",
          "WhatsApp con el link de compra",
        ],
      },
    ],
    resultado: [
      "El carrito abandonado pasó a tener un segundo canal de seguimiento: un WhatsApp con el link de compra adentro.",
      "Nos comunicaron que van a volver a contactarnos para otro trabajo.",
    ],
    testimonio: {
      cita: "quedamos súper conformes",
      persona: "María",
      rol: "Fundadora de Las Titas Bikinis",
    },
    herramientas: ["Make", "Tiendanube", "WhatsApp"],
    media: null,
  },
];

/** Un caso por su slug. `undefined` si no existe: la ruta responde 404. */
export function casoPorSlug(slug: string): Caso | undefined {
  return CASOS.find((caso) => caso.slug === slug);
}

/**
 * DEMOS PROPIAS — sistemas construidos por el estudio, sin cliente detrás.
 *
 * No son casos y la sección las muestra aparte y rotuladas: una demo propia no
 * prueba que alguien nos haya contratado. Vacío hasta que exista la primera.
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
