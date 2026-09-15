/**
 * CONTROL, ERRORES Y DATOS (sección 09)
 *
 * La pregunta que el sitio no contestaba en ningún lado, y que todo el mundo
 * se hace: ¿qué pasa si la IA se equivoca?
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ CÓMO ESTÁ ESCRITA ESTA SECCIÓN                                       │
 * │                                                                       │
 * │ Las seis de abajo son CAPACIDADES que pueden formar parte de una      │
 * │ implementación según el proceso, no una lista de cosas que todos      │
 * │ nuestros sistemas tienen. Decir "todos nuestros agentes registran     │
 * │ cada acción y piden aprobación" sería una afirmación sobre sistemas   │
 * │ que todavía no se construyeron.                                       │
 * │                                                                       │
 * │ Por eso cada punto tiene `cuando`: en qué caso esa capacidad entra en │
 * │ el proyecto. La decisión es del cliente y se toma antes de construir. │
 * │                                                                       │
 * │ No se describe acá ninguna arquitectura que el estudio no tenga. Lo   │
 * │ que se afirma es la posición de trabajo, que sí se sostiene en        │
 * │ cualquier proyecto.                                                   │
 * └──────────────────────────────────────────────────────────────────────┘
 */

/** La idea que ordena toda la sección. */
export const PREMISA = "No todo tiene que resolverse automáticamente.";

export type Capacidad = {
  id: string;
  /** Qué puede hacer el sistema. En infinitivo: es una capacidad, no una promesa. */
  titulo: string;
  /** En qué consiste. */
  detalle: string;
  /** En qué casos entra en una implementación. */
  cuando: string;
};

export const CAPACIDADES: Capacidad[] = [
  {
    id: "aprobacion",
    titulo: "Pedir aprobación",
    detalle:
      "El sistema prepara la acción y la deja esperando: no queda firme hasta que alguien la confirma.",
    cuando:
      "En acciones con consecuencia hacia afuera o sobre el dinero: enviar un presupuesto, confirmar un precio, cerrar una operación.",
  },
  {
    id: "derivar",
    titulo: "Derivar a una persona",
    detalle:
      "Cuando el caso se sale de lo previsto, el sistema frena y se lo pasa a alguien del equipo con todo el contexto.",
    cuando:
      "En cualquier proceso que atienda clientes: siempre hay un caso que no entra en el molde.",
  },
  {
    id: "registrar",
    titulo: "Registrar cada acción",
    detalle:
      "Qué hizo, cuándo, con qué datos y qué devolvió el sistema con el que se integró. El registro es de la empresa y se revisa sin pedirnos nada.",
    cuando:
      "Cuando hace falta poder reconstruir después qué pasó, que es casi siempre.",
  },
  {
    id: "reglas",
    titulo: "Aplicar reglas",
    detalle:
      "Condiciones duras que el sistema no puede saltear: montos máximos, clientes que tienen que existir en el sistema, horarios, excepciones.",
    cuando:
      "Cuando la empresa ya tiene criterios claros sobre qué se puede y qué no.",
  },
  {
    id: "permisos",
    titulo: "Limitar permisos",
    detalle:
      "Credenciales propias, separadas de las de las personas, con lo mínimo que el proceso necesita. Si solo necesita leer, solo lee.",
    cuando:
      "Siempre que el software toque un sistema de la empresa. Los permisos los da la empresa y los puede revocar cuando quiera.",
  },
  {
    id: "detenerse",
    titulo: "Detenerse ante lo inesperado",
    detalle:
      "Si el dato no aparece, si el otro sistema no responde o si el pedido no se entiende, el sistema no improvisa una respuesta: se detiene y avisa.",
    cuando:
      "Cuando una respuesta equivocada cuesta más que una respuesta demorada.",
  },
];

/**
 * Lo que sí se afirma siempre, sin depender del proyecto. Son dos, y son las
 * dos que un cliente necesita escuchar antes de dar acceso a sus sistemas.
 */
export const POSICION = [
  {
    titulo: "Qué se decide antes de construir",
    detalle:
      "Qué acciones quedan automáticas, cuáles esperan aprobación y qué se considera un caso dudoso. Esa lista sale del diagnóstico y va escrita en la propuesta: no se descubre después del primer error.",
  },
  {
    titulo: "Qué pasa con los datos",
    detalle:
      "Son de la empresa y quedan en sus sistemas. No armamos una base propia con los datos de un cliente ni los usamos para entrenar nada. Qué información sale hacia el proveedor del modelo y qué no, se define en la propuesta.",
  },
];

/** Y si igual se equivoca. Cierra la sección. */
export const SI_SE_EQUIVOCA =
  "Se corrige. Durante los primeros 90 días desde la entrega la corrección está incluida, y el registro sirve para encontrar qué pasó en vez de discutirlo.";
