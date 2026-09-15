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
  /** En qué consiste y en qué casos entra, en una sola línea. */
  detalle: string;
};

/**
 * Seis capacidades, una línea cada una.
 *
 * Antes cada una tenía un párrafo de detalle más otro de "cuándo entra": doce
 * párrafos para decir seis cosas. Quien lee esta sección está resolviendo una
 * duda concreta —qué pasa si se equivoca— y no necesita doce párrafos, necesita
 * ver que hay frenos y que los decide él.
 */
export const CAPACIDADES: Capacidad[] = [
  {
    id: "aprobacion",
    titulo: "Pedir aprobación",
    detalle:
      "Prepara la acción y la deja esperando: no queda firme hasta que alguien la confirma. Para lo que tiene consecuencia hacia afuera o sobre el dinero.",
  },
  {
    id: "derivar",
    titulo: "Derivar a una persona",
    detalle:
      "Cuando el caso se sale de lo previsto, frena y se lo pasa a alguien del equipo con todo el contexto.",
  },
  {
    id: "registrar",
    titulo: "Registrar cada acción",
    detalle:
      "Qué hizo, cuándo y con qué datos. El registro es de la empresa y se revisa sin pedirnos nada.",
  },
  {
    id: "reglas",
    titulo: "Aplicar reglas",
    detalle:
      "Condiciones que no puede saltear: montos máximos, clientes que tienen que existir en el sistema, horarios, excepciones.",
  },
  {
    id: "permisos",
    titulo: "Limitar permisos",
    detalle:
      "Credenciales propias, separadas de las de las personas, con lo mínimo que el proceso necesita. Si solo necesita leer, solo lee.",
  },
  {
    id: "detenerse",
    titulo: "Detenerse ante lo inesperado",
    detalle:
      "Si el dato no aparece o el otro sistema no responde, no improvisa una respuesta: se detiene y avisa.",
  },
];

/**
 * Lo que sí se afirma siempre, sin depender del proyecto. Son dos, y son las
 * dos que un cliente necesita escuchar antes de dar acceso a sus sistemas.
 */
export const POSICION = [
  {
    titulo: "Qué pasa con los datos",
    detalle:
      "Son de la empresa y quedan en sus sistemas. No armamos una base propia con los datos de un cliente ni los usamos para entrenar nada. Qué información sale hacia el proveedor del modelo y qué no, se define en la propuesta.",
  },
];

/** Y si igual se equivoca. Cierra la sección. */
export const SI_SE_EQUIVOCA =
  "Se corrige. Durante los primeros 90 días desde la entrega la corrección está incluida, y el registro sirve para encontrar qué pasó en vez de discutirlo.";
