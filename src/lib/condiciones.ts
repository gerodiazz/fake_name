/**
 * CONDICIONES COMERCIALES (sección 07)
 *
 * Esto no es letra chica ni una nota al pie del FAQ: es parte de la oferta, y
 * por eso tiene sección propia y visible. Tres de estos puntos estaban
 * escondidos dentro del acordeón de preguntas frecuentes.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ REVISAR ANTES DE PUBLICAR                                            │
 * │ Cada punto de acá es un compromiso que hay que poder sostener frente │
 * │ a un cliente que lo reclame: los 90 días, la entrega del repositorio │
 * │ completo, el precio cerrado antes de empezar. Los dos socios tienen   │
 * │ que confirmar la redacción tal como está escrita.                     │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type Condicion = {
  id: string;
  /** El compromiso, en dos o tres palabras. */
  titulo: string;
  /** Qué significa, en una línea corta y concreta. */
  detalle: string;
  /**
   * La consecuencia para el cliente, dicha desde su lado. Es lo que baja el
   * riesgo de contratar, y por eso va separado del detalle.
   */
  implicancia: string;
};

export const CONDICIONES: Condicion[] = [
  {
    id: "pago-unico",
    titulo: "Pago único",
    detalle:
      "La implementación se presupuesta como proyecto cerrado y se paga una vez. El soporte posterior es opcional y se cotiza aparte.",
    implicancia:
      "No hay suscripción obligatoria para que el software siga funcionando.",
  },
  {
    id: "codigo-del-cliente",
    titulo: "El código es del cliente",
    detalle:
      "El software desarrollado pertenece a la empresa. Se entrega el repositorio completo, la documentación y las credenciales, a su nombre.",
    implicancia: "Lo puede seguir el equipo interno o cualquier otro proveedor.",
  },
  {
    id: "costos-de-api",
    titulo: "Costos de API",
    detalle:
      "La empresa paga los servicios externos que usa su sistema —el consumo de los modelos, entre otros— en su propia cuenta y directo al proveedor. No hay intermediación ni recargo.",
    implicancia:
      "El costo mensual se estima antes de empezar, no aparece después.",
  },
  {
    id: "noventa-dias",
    titulo: "90 días de corrección",
    detalle:
      "Desde la entrega, corregimos sin costo los errores de lo que construimos, dentro del alcance acordado. No cubre cambios que haga un tercero o la propia empresa, ni requerimientos nuevos: eso se cotiza como trabajo aparte y se dice antes de hacerlo.",
    implicancia:
      "Lo que entregamos funcionando, sigue funcionando. Sin discutir de quién es la culpa.",
  },
  {
    id: "sin-lock-in",
    titulo: "Sin lock-in",
    detalle:
      "El software no depende de una cuenta ni de un servidor del estudio para funcionar. Dónde corre lo define la empresa.",
    implicancia:
      "Nadie queda obligado a seguir con nosotros para poder usar lo que se construyó.",
  },
  {
    id: "alcance-cerrado",
    titulo: "Alcance cerrado",
    detalle:
      "Qué se va a construir, cuánto cuesta y cuánto demora quedan por escrito antes de empezar. Si el alcance no cierra, no hay propuesta y no se debe nada.",
    implicancia: "No se factura por hora contra un alcance que se mueve.",
  },
];

/**
 * RANGO DE INVERSIÓN — pendiente de datos reales.
 *
 * La idea es que el visitante sepa en qué orden de magnitud se mueve el
 * trabajo ANTES de completar el formulario: que alguien se descarte solo es
 * preferible a una reunión que no iba a ningún lado, para las dos partes.
 *
 * Queda en null hasta que existan los precios reales. Mientras tanto no se
 * muestra ningún número: un rango inventado acá es de las pocas cosas que
 * pueden hacer perder un cliente en la reunión siguiente.
 *
 * Al escribir algo como "Los proyectos arrancan en USD 2.000", aparece solo
 * arriba del formulario de contacto.
 */
export const RANGO_INVERSION: string | null = null;
