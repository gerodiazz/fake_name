/**
 * CONTROL, ERRORES Y DATOS (sección 08)
 *
 * La pregunta que no estaba contestada en ningún lado: qué pasa cuando el
 * software se equivoca, y quién manda.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ REGLA DE ESTA SECCIÓN                                                │
 * │                                                                       │
 * │ No se describe acá ninguna arquitectura que el estudio no tenga       │
 * │ construida. Lo que se afirma es la POSICIÓN de trabajo, que sí se     │
 * │ sostiene en cualquier proyecto: qué se decide con el cliente, qué     │
 * │ queda registrado, quién aprueba qué.                                  │
 * │                                                                       │
 * │ Cuando una decisión depende de cómo se implemente cada sistema, se    │
 * │ dice: para eso está el campo `seDefine`. Es preferible escribir "esto │
 * │ se define en la propuesta" antes que inventar un diagrama.            │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type PuntoDeControl = {
  id: string;
  /** La pregunta que se está contestando, tal como la haría un cliente. */
  pregunta: string;
  /** La respuesta que se sostiene en cualquier proyecto. */
  respuesta: string;
  /**
   * Lo que depende de cada implementación y se acuerda con la empresa. Null
   * cuando la respuesta no tiene nada que negociar.
   */
  seDefine: string | null;
};

export const PUNTOS_DE_CONTROL: PuntoDeControl[] = [
  {
    id: "sin-certeza",
    pregunta: "¿Qué pasa cuando el sistema no está seguro?",
    respuesta:
      "Se detiene y avisa. Un caso que no entra en lo previsto no se resuelve con una respuesta aproximada: queda marcado y esperando a una persona.",
    seDefine:
      "Qué se considera un caso dudoso en cada proceso, y a quién se le avisa.",
  },
  {
    id: "aprobacion",
    pregunta: "¿Qué acciones requieren aprobación?",
    respuesta:
      "Las que tienen consecuencia hacia afuera o sobre el dinero. Escribirle a un cliente, confirmar un precio, cargar una operación: cuáles de esas pasan por una persona se decide antes de construir, no después del primer error.",
    seDefine:
      "La lista de acciones que quedan automáticas y la de las que esperan aprobación.",
  },
  {
    id: "persona",
    pregunta: "¿Cuándo interviene una persona?",
    respuesta:
      "Cuando el sistema lo pide y cuando la empresa quiera. El trabajo se puede tomar en cualquier punto: no hay un modo en el que el software sea el único que puede continuar.",
    seDefine: null,
  },
  {
    id: "registro",
    pregunta: "¿Cómo se registra lo que hizo?",
    respuesta:
      "Cada acción queda registrada: qué hizo, cuándo, con qué datos y qué devolvió el sistema con el que se integró. Ese registro es para la empresa y se puede revisar sin pedirnos nada.",
    seDefine: "Dónde vive el registro y cuánto tiempo se conserva.",
  },
  {
    id: "permisos",
    pregunta: "¿A qué tiene acceso?",
    respuesta:
      "A lo mínimo que necesita el proceso, con credenciales propias y separadas de las de las personas. Si un proceso solo necesita leer, solo lee.",
    seDefine:
      "Los permisos concretos sobre cada sistema, que da la empresa y puede revocar cuando quiera.",
  },
  {
    id: "datos",
    pregunta: "¿Qué pasa con los datos?",
    respuesta:
      "Son de la empresa y quedan en sus sistemas. El estudio no arma una base propia con los datos de un cliente ni los usa para entrenar nada.",
    seDefine:
      "Qué datos salen hacia el proveedor del modelo, cuáles no y cómo se anonimizan cuando hace falta.",
  },
  {
    id: "error",
    pregunta: "¿Y si igual se equivoca?",
    respuesta:
      "Se corrige. Durante los primeros 90 días desde la entrega la corrección está incluida, y el registro sirve para encontrar qué pasó en vez de discutirlo.",
    seDefine: null,
  },
];
