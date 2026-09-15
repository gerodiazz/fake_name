/**
 * EJEMPLOS POR INDUSTRIA (sección 05)
 *
 * Contesta una sola pregunta: "¿qué podrían automatizar en una empresa como
 * la mía?". Por eso está ordenado por industria y no por tipo de tecnología.
 *
 * CÓMO ESTÁ ESCRITO
 *
 * · Cada ejemplo es un PROCESO CONCRETO contado con las mismas seis etapas de
 *   la sección 02 —solicitud, interpretación, consulta, acción, registro,
 *   escalamiento—. Que el esqueleto se repita es el argumento: no es un
 *   producto distinto por rubro, es el mismo recorrido aplicado a otro
 *   proceso. Además deja al lector imaginando su propio caso.
 *
 * · Nada de "automatizamos la gestión comercial". Una frase así no se puede
 *   imaginar. "Una consulta entra por WhatsApp, el sistema identifica qué
 *   propiedad busca y avisa al vendedor", sí.
 *
 * · Los oficios son los mismos que nombra el diagnóstico —"el que atiende",
 *   "el que cotiza"— y `rubroId` apunta al rubro correspondiente de
 *   src/lib/diagnostico.ts. Los nombres se mantienen en sincronía a mano.
 *
 * · NINGÚN RESULTADO NUMÉRICO. Ni porcentajes, ni horas, ni "de dos días a
 *   dos minutos". `queda` describe el estado en el que queda el trabajo, que
 *   es verificable, en vez de una mejora, que habría que inventar.
 */

/** Las seis etapas, en orden. Las mismas de src/lib/demostracion.ts. */
export const ETAPAS = [
  "Solicitud",
  "Interpretación",
  "Consulta",
  "Acción",
  "Registro",
  "Escalamiento",
] as const;

export type EjemploIndustria = {
  /** Id del rubro en src/lib/diagnostico.ts. */
  rubroId: string;
  industria: string;
  /** El proceso, en una línea, para quien no quiere leer las seis etapas. */
  proceso: string;
  /**
   * Por cuántas manos y aplicaciones pasa hoy ese trabajo. Se dibuja como una
   * cadena de piezas: la acumulación es el problema, y se ve antes de leerse.
   */
  hoy: string[];
  /** Una línea por etapa, en el orden de ETAPAS. */
  flujo: string[];
  /** Los oficios del diagnóstico que aparecen en este rubro. */
  oficios: string[];
  /** En qué estado queda el trabajo. Descriptivo, sin métricas. */
  queda: string;
};

export const EJEMPLOS: EjemploIndustria[] = [
  {
    rubroId: "comercio",
    industria: "Comercio y retail",
    proceso: "Un pedido que llega por mensaje fuera de horario",
    hoy: ["WhatsApp", "vendedor", "sistema de gestión", "planilla", "vendedor"],
    flujo: [
      "Entra un mensaje pidiendo precio y disponibilidad.",
      "El sistema identifica producto, cantidad y si el cliente ya existe.",
      "Consulta precio y stock en el sistema de la empresa.",
      "Responde con el dato real y prepara el pedido.",
      "Guarda la conversación y el pedido generado.",
      "Si el producto no está o el cliente es nuevo, avisa al vendedor.",
    ],
    oficios: ["El que atiende", "El que carga", "El que publica"],
    queda:
      "El pedido queda preparado para revisar a la mañana, con la consulta ya contestada.",
  },
  {
    rubroId: "servicios",
    industria: "Servicios profesionales",
    proceso: "Un pedido de presupuesto que hoy se arma a mano",
    hoy: ["email", "planilla de precios", "documento anterior", "revisión", "email"],
    flujo: [
      "Llega una consulta por mail o por formulario.",
      "El sistema identifica qué servicio se pide y con qué alcance.",
      "Busca la lista de precios y las condiciones vigentes.",
      "Arma el presupuesto y lo deja para que una persona lo apruebe.",
      "Guarda el borrador junto con la consulta que lo originó.",
      "Si el pedido no entra en la lista de precios, lo pasa a quien cotiza.",
    ],
    oficios: ["El que cotiza", "El que insiste", "El que resume"],
    queda:
      "El presupuesto queda escrito con los precios vigentes y aprobado por una persona antes de salir.",
  },
  {
    rubroId: "salud",
    industria: "Salud y consultorios",
    proceso: "Los turnos que hoy ocupan el día de la recepción",
    hoy: ["teléfono", "WhatsApp", "recepción", "agenda", "llamada de confirmación"],
    flujo: [
      "Un paciente escribe para pedir, mover o cancelar un turno.",
      "El sistema identifica profesional, paciente y qué necesita.",
      "Mira la agenda real y qué horarios están libres.",
      "Da el turno, lo mueve o lo cancela, y lo confirma el día anterior.",
      "Deja registrado el movimiento en la agenda.",
      "Deriva a la recepción cualquier caso clínico o fuera de lo previsto.",
    ],
    oficios: ["El que agenda", "El que recuerda", "El que tramita"],
    queda:
      "La agenda queda actualizada en un solo lugar y el lugar que se libera se ofrece solo.",
  },
  {
    rubroId: "inmobiliaria",
    industria: "Inmobiliaria",
    proceso: "Una consulta por una propiedad, de las veinte que entran por día",
    hoy: ["portal", "WhatsApp", "planilla de propiedades", "vendedor"],
    flujo: [
      "Entra una consulta por WhatsApp o por un portal.",
      "El sistema identifica qué propiedad busca y con qué condiciones.",
      "Consulta disponibilidad, precio y estado de la publicación.",
      "Responde, propone horarios de visita y registra el contacto.",
      "Deja la consulta cargada con todo lo que se preguntó.",
      "Avisa al vendedor cuando hay intención real o algo que decidir.",
    ],
    oficios: ["El que filtra", "El que agenda", "El que publica"],
    queda:
      "El interesado tiene respuesta y el vendedor recibe solo las consultas que valen su tiempo.",
  },
  {
    rubroId: "industria",
    industria: "Industria y logística",
    proceso: "Órdenes de compra que se transcriben a mano al sistema",
    hoy: ["email", "PDF", "carga manual", "sistema", "control"],
    flujo: [
      "Llega una orden de compra por correo, en PDF o en el cuerpo del mail.",
      "El sistema identifica ítems, cantidades, precios y condiciones.",
      "Verifica cada ítem contra el catálogo y los precios acordados.",
      "Carga la orden y marca aparte lo que no reconoció.",
      "Guarda el documento original junto a lo que cargó.",
      "Frena y avisa si un precio no coincide o un ítem no existe.",
    ],
    oficios: ["El que carga", "El que controla", "El que sigue"],
    queda:
      "La orden queda cargada con su documento original al lado, y las diferencias quedan señaladas en vez de pasar de largo.",
  },
  {
    rubroId: "gastronomia",
    industria: "Gastronomía y turismo",
    proceso: "Reservas que entran por teléfono y por mensaje a la vez",
    hoy: ["teléfono", "WhatsApp", "libro de reservas", "mozo"],
    flujo: [
      "Entra una reserva por cualquiera de los dos canales.",
      "El sistema identifica fecha, cantidad de personas y preferencias.",
      "Consulta la disponibilidad real, la misma para los dos canales.",
      "Toma la reserva y la confirma.",
      "Deja la reserva cargada con el canal por el que entró.",
      "Deriva los casos especiales: eventos, grupos grandes, reclamos.",
    ],
    oficios: ["El que reserva", "El que atiende", "El que responde"],
    queda:
      "Las reservas de los dos canales caen sobre una sola disponibilidad, sin superponerse.",
  },
];

/** Busca un ejemplo por rubro, para enlazar con el diagnóstico. */
export function ejemploDeRubro(rubroId: string): EjemploIndustria | undefined {
  return EJEMPLOS.find((ejemplo) => ejemplo.rubroId === rubroId);
}
