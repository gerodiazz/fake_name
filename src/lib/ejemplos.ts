/**
 * EJEMPLOS DE PROCESOS (sección 04)
 *
 * Los mismos oficios que nombra el diagnóstico —"el que atiende", "el que
 * cotiza"— pero acá abiertos en tres tiempos: qué pasa hoy, qué hace el
 * sistema, con qué queda la empresa.
 *
 * REGLA DE ESCRITURA
 *
 * · Los nombres son de OFICIO, nunca de tecnología. Es la misma regla que en
 *   src/lib/diagnostico.ts y los nombres se mantienen en sincronía a mano:
 *   `agenteId` apunta al agente del diagnóstico cuando existe el equivalente.
 *
 * · `resultado` describe el estado en el que queda el trabajo, no un ahorro.
 *   No hay porcentajes, no hay "hasta un X%", no hay dinero. Las únicas horas
 *   del sitio son las que el visitante estima él mismo en el diagnóstico, y
 *   ahí están rotuladas como estimación.
 *
 * · `pasos` son las acciones que ejecuta el sistema, en orden y en tercera
 *   persona. Es lo que se contrata: si un paso no se puede construir, se saca.
 */

export type Ejemplo = {
  id: string;
  /** Nombre de oficio. El mismo que usa el diagnóstico. */
  nombre: string;
  /** Id del agente equivalente en el diagnóstico, o null si no hay. */
  agenteId: string | null;
  /** Qué ocurre hoy, con el proceso hecho a mano. */
  problema: string;
  /** Las acciones que ejecuta el sistema, en orden. */
  pasos: string[];
  /** En qué estado queda el trabajo. Descriptivo: sin métricas. */
  resultado: string;
  /** Dónde aparece más seguido. Orienta al lector, no promete nada. */
  dondeAparece: string;
};

export const EJEMPLOS: Ejemplo[] = [
  {
    id: "el-que-atiende",
    nombre: "El que atiende",
    agenteId: "comercio-atiende",
    problema:
      "Las consultas de precio, disponibilidad y envío entran por mensaje a cualquier hora. Alguien las contesta una por una, mirando el sistema.",
    pasos: [
      "Lee el mensaje y entiende qué se está preguntando.",
      "Consulta precio y disponibilidad en el sistema de la empresa.",
      "Responde con el dato real, no con una respuesta armada de antemano.",
      "Deriva a una persona cuando la consulta se sale de lo previsto.",
    ],
    resultado:
      "La consulta queda contestada con el dato del sistema, a la hora que llegó, y la conversación queda registrada.",
    dondeAparece: "Comercio, gastronomía, servicios",
  },
  {
    id: "el-que-cotiza",
    nombre: "El que cotiza",
    agenteId: "servicios-cotiza",
    problema:
      "Cada cotización se arma a mano sobre la anterior: se copia un documento viejo, se cambian los precios y se revisa que no haya quedado nada del cliente anterior.",
    pasos: [
      "Toma los datos del pedido y los ítems que corresponden.",
      "Aplica la lista de precios y las condiciones vigentes de la empresa.",
      "Arma el documento con el formato de la empresa.",
      "Lo deja listo para revisar antes de que salga.",
    ],
    resultado:
      "La cotización queda escrita con los precios vigentes y una persona la aprueba antes de enviarla.",
    dondeAparece: "Servicios profesionales, industria",
  },
  {
    id: "el-que-carga",
    nombre: "El que carga",
    agenteId: "comercio-carga",
    problema:
      "Los pedidos llegan por mensaje o por correo y alguien los transcribe al sistema, ítem por ítem, con el riesgo de equivocarse en una cantidad.",
    pasos: [
      "Lee el pedido como llegó, en el texto que escribió el cliente.",
      "Identifica productos, cantidades y condiciones.",
      "Verifica contra el catálogo y marca lo que no reconoce.",
      "Carga el pedido en el sistema y deja el registro de lo que hizo.",
    ],
    resultado:
      "El pedido queda cargado y listo para facturar, y lo que el sistema no reconoció queda separado para que lo mire una persona.",
    dondeAparece: "Comercio, industria y logística",
  },
  {
    id: "el-que-agenda",
    nombre: "El que agenda",
    agenteId: "salud-agenda",
    problema:
      "La recepción pasa el día dando, moviendo y cancelando turnos por teléfono y por mensaje, sobre la misma agenda.",
    pasos: [
      "Ofrece los horarios que están realmente libres.",
      "Da, mueve o cancela el turno en la agenda de cada profesional.",
      "Confirma el turno el día anterior.",
      "Ofrece el lugar que se libera a quien está esperando.",
    ],
    resultado:
      "La agenda queda actualizada en un solo lugar y la recepción deja de ser el cuello de botella.",
    dondeAparece: "Salud, servicios, inmobiliaria",
  },
  {
    id: "el-que-publica",
    nombre: "El que publica",
    agenteId: "comercio-publica",
    problema:
      "El mismo producto o la misma propiedad se carga a mano en la tienda, en los marketplaces y en cada portal. Cuando cambia un precio, hay que cambiarlo en todos.",
    pasos: [
      "Toma la ficha desde una sola carga.",
      "La publica en cada canal con el formato que ese canal exige.",
      "Sincroniza precio y disponibilidad cuando cambian en el sistema.",
      "Avisa cuando un canal rechaza una publicación.",
    ],
    resultado:
      "Los canales muestran el mismo precio y la misma disponibilidad que el sistema de la empresa.",
    dondeAparece: "Comercio, inmobiliaria",
  },
  {
    id: "el-que-insiste",
    nombre: "El que insiste",
    // En el diagnóstico este oficio aparece como "El que tramita": pide la
    // documentación y sostiene el pedido hasta que llega.
    agenteId: "servicios-tramita",
    problema:
      "Los contactos se enfrían y la documentación no llega porque nadie tiene tiempo de volver a escribir por tercera vez.",
    pasos: [
      "Responde al contacto nuevo apenas entra.",
      "Sostiene el seguimiento con el ritmo que defina la empresa.",
      "Pide lo que falta y controla que esté completo.",
      "Avisa a una persona cuando hay respuesta o cuando hay que frenar.",
    ],
    resultado:
      "El seguimiento se sostiene solo y una persona entra cuando hay algo que decidir.",
    dondeAparece: "Servicios profesionales, inmobiliaria, salud",
  },
];
