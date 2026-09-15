/**
 * EJEMPLOS POR PROCESO (sección 04)
 *
 * Contesta la pregunta que el visitante se hace después de entender qué es un
 * agente: "¿qué podrían automatizar en una empresa como la mía?".
 *
 * QUÉ CAMBIÓ Y POR QUÉ
 *
 * Cada ejemplo era un párrafo largo: seis etapas, una oración completa cada
 * una, por seis rubros. Treinta y seis oraciones que nadie iba a leer. Ahora
 * cada uno son dos cadenas cortas enfrentadas:
 *
 *   QUÉ HACE HOY UNA PERSONA     →     QUÉ HACE EL SOFTWARE
 *   WhatsApp · vendedor ·              Consulta · producto ·
 *   sistema · planilla · vendedor      disponibilidad · pedido
 *
 * La comparación se lee en dos segundos y dice más que el párrafo: de un lado
 * cinco saltos entre personas y aplicaciones, del otro cuatro pasos seguidos.
 * Y el ejemplo sigue siendo un PROCESO concreto, no un rubro.
 *
 * Los oficios —"el que atiende", "el que cotiza"— son los mismos que nombra el
 * diagnóstico. Esa continuidad hace que, al llegar a las preguntas, el
 * visitante ya sepa de qué se está hablando.
 *
 * Ningún ejemplo lleva métricas: son ejemplos, no casos.
 */

export type EjemploProceso = {
  /** Id del rubro en src/lib/diagnostico.ts. */
  rubroId: string;
  industria: string;
  /** El proceso, en una línea. Es el título real del ejemplo. */
  proceso: string;
  /** Por cuántas manos y aplicaciones pasa hoy. Se dibuja como cadena. */
  hoy: string[];
  /** Los pasos del software. Cuatro, cortos, en el orden en que ocurren. */
  conSoftware: string[];
  /** En qué estado queda el trabajo. Descriptivo, sin métricas. */
  queda: string;
  /** Los oficios del diagnóstico que aparecen en este rubro. */
  oficios: string[];
};

export const EJEMPLOS: EjemploProceso[] = [
  {
    rubroId: "comercio",
    industria: "Comercio y retail",
    proceso: "Un pedido que llega por mensaje fuera de horario",
    hoy: ["WhatsApp", "vendedor", "sistema de gestión", "planilla", "vendedor"],
    conSoftware: ["Consulta", "producto", "disponibilidad", "pedido"],
    queda:
      "El pedido queda preparado para revisar a la mañana, con la consulta ya contestada.",
    oficios: ["El que atiende", "El que carga", "El que publica"],
  },
  {
    rubroId: "servicios",
    industria: "Servicios profesionales",
    proceso: "Un pedido de presupuesto que hoy se arma a mano",
    hoy: ["email", "documento anterior", "lista de precios", "revisión", "email"],
    conSoftware: ["Solicitud", "clasificación", "documentación", "respuesta"],
    queda:
      "El presupuesto queda escrito con los precios vigentes y lo aprueba una persona antes de salir.",
    oficios: ["El que cotiza", "El que insiste", "El que resume"],
  },
  {
    rubroId: "salud",
    industria: "Salud y consultorios",
    proceso: "Los turnos que hoy ocupan el día de la recepción",
    hoy: ["teléfono", "WhatsApp", "recepción", "agenda", "llamado de confirmación"],
    conSoftware: ["Solicitud", "clasificación", "agenda", "confirmación"],
    queda:
      "La agenda queda actualizada en un solo lugar y el turno que se libera se ofrece solo.",
    oficios: ["El que agenda", "El que recuerda", "El que tramita"],
  },
  {
    rubroId: "inmobiliaria",
    industria: "Inmobiliaria",
    proceso: "Una consulta por una propiedad, de las veinte que entran por día",
    hoy: ["portal", "WhatsApp", "planilla de propiedades", "vendedor"],
    conSoftware: ["Consulta", "disponibilidad", "calificación", "seguimiento"],
    queda:
      "El interesado tiene respuesta y el vendedor recibe solo las consultas que valen su tiempo.",
    oficios: ["El que filtra", "El que agenda", "El que publica"],
  },
  {
    rubroId: "industria",
    industria: "Industria y logística",
    proceso: "Órdenes de compra que se transcriben a mano al sistema",
    hoy: ["email", "PDF", "carga manual", "sistema", "control"],
    conSoftware: ["Orden", "validación", "carga", "aviso de diferencias"],
    queda:
      "La orden queda cargada con su documento original al lado, y las diferencias quedan señaladas en vez de pasar de largo.",
    oficios: ["El que carga", "El que controla", "El que sigue"],
  },
  {
    rubroId: "gastronomia",
    industria: "Gastronomía y turismo",
    proceso: "Reservas que entran por teléfono y por mensaje a la vez",
    hoy: ["teléfono", "WhatsApp", "libro de reservas", "mozo"],
    conSoftware: ["Reserva", "disponibilidad", "confirmación", "recordatorio"],
    queda:
      "Las reservas de los dos canales caen sobre una sola disponibilidad, sin superponerse.",
    oficios: ["El que reserva", "El que atiende", "El que responde"],
  },
];
