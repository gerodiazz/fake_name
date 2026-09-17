/**
 * EJEMPLOS — procesos que se podrían construir
 *
 * Contesta la pregunta que el visitante se hace después de entender qué es un
 * agente: "¿esto se puede aplicar a mi empresa?".
 *
 * QUÉ CAMBIÓ Y POR QUÉ
 *
 * Esta sección pasó por tres versiones y todas fueron demasiado largas: seis
 * párrafos de seis oraciones, después seis filas con dos cadenas cada una.
 * Ocupaba tres pantallas de scroll para decir algo que se dice en tres líneas.
 *
 * Ahora son dos cosas separadas:
 *
 *   · La lista de rubros, en una línea. Sirve para que el visitante se
 *     reconozca, y para eso alcanza con el nombre del rubro.
 *   · Tres ejemplos, de tres líneas cada uno: qué pasa hoy, qué hace el
 *     software, con qué queda la empresa.
 *
 * Tres ejemplos y no seis: el cuarto ya no agrega nada que no haya dicho el
 * primero, y el diagnóstico cubre los seis rubros igual.
 *
 * Los oficios —"el que atiende", "el que cotiza"— son los mismos que nombra el
 * diagnóstico, y por eso siguen acá: cuando el visitante llega a las
 * preguntas, ya sabe de qué se está hablando.
 *
 * Ningún ejemplo lleva métricas: son ejemplos, no casos. Los trabajos
 * entregados, con cliente y nombre, viven en src/lib/casos.ts y tienen su
 * propia sección más arriba en la home. Las dos cosas no se mezclan.
 */

/** Los rubros que cubre el diagnóstico. Una línea, para reconocerse. */
export const INDUSTRIAS = [
  "Comercio y retail",
  "Servicios profesionales",
  "Salud y consultorios",
  "Inmobiliaria",
  "Industria y logística",
  "Gastronomía y turismo",
];

export type Ejemplo = {
  id: string;
  /** El proceso, no el rubro. Dos o tres palabras. */
  titulo: string;
  /** Qué pasa hoy, en una línea. */
  problema: string;
  /** Qué hace el software, en una línea. Verbos concretos, en orden. */
  queHace: string;
  /** Con qué queda la empresa. Descriptivo, sin métricas. */
  resultado: string;
  /** Los oficios del diagnóstico que cubre este ejemplo. */
  oficios: string[];
};

export const EJEMPLOS: Ejemplo[] = [
  {
    id: "pedidos",
    titulo: "Pedidos",
    problema: "Llegan por mensaje a cualquier hora y alguien los transcribe.",
    queHace:
      "Interpreta el pedido, consulta stock, responde con el dato real y lo deja cargado.",
    resultado: "Queda listo para revisar, y la consulta contestada cuando entró.",
    oficios: ["El que atiende", "El que carga"],
  },
  {
    id: "consultas",
    titulo: "Consultas",
    problema: "Entran veinte por día y el vendedor las contesta todas.",
    queHace:
      "Responde con la información autorizada, registra el contacto y avisa cuando hay intención real.",
    resultado: "El vendedor recibe solo lo que vale su tiempo.",
    oficios: ["El que filtra", "El que agenda"],
  },
  {
    id: "documentos",
    titulo: "Documentos",
    problema: "Las órdenes de compra llegan en PDF y se cargan a mano.",
    queHace:
      "Lee el documento, lo verifica contra el catálogo, lo carga y marca lo que no reconoce.",
    resultado: "Queda cargada con su original al lado y las diferencias señaladas.",
    oficios: ["El que carga", "El que controla"],
  },
];
