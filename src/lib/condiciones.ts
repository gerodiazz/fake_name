/**
 * CONDICIONES COMERCIALES (sección 07)
 *
 * No es letra chica: es parte de la oferta, y por eso tiene sección propia.
 * Tres de estos puntos estaban escondidos dentro del acordeón de preguntas.
 *
 * Cada punto es un título y una línea. Antes eran dos párrafos —el detalle y
 * "lo que eso significa para el cliente"— y el segundo terminaba diciendo lo
 * mismo que el primero con otras palabras. Si una condición necesita dos
 * párrafos para entenderse, el problema es la condición, no el texto.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ REVISAR ANTES DE PUBLICAR                                            │
 * │ Cada punto es un compromiso que hay que poder sostener frente a un   │
 * │ cliente que lo reclame. Los dos socios tienen que confirmarlos.      │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type Condicion = {
  id: string;
  /** El compromiso, en dos o tres palabras. */
  titulo: string;
  /** Qué significa. Una línea. */
  detalle: string;
};

export const CONDICIONES: Condicion[] = [
  {
    id: "pago-unico",
    titulo: "Pago único",
    detalle:
      "Proyecto cerrado, se paga una vez. Ninguna suscripción es obligatoria para que el software siga funcionando.",
  },
  {
    id: "codigo-del-cliente",
    titulo: "El código es del cliente",
    detalle:
      "Repositorio, documentación y credenciales, a nombre de la empresa. Lo puede seguir cualquier otro proveedor.",
  },
  {
    id: "datos",
    titulo: "Los datos son del cliente",
    detalle:
      "Quedan en sus sistemas. No armamos una base propia ni los usamos para entrenar nada.",
  },
  {
    id: "costos-de-api",
    titulo: "Costos de API",
    detalle:
      "Se pagan en la cuenta de la empresa, directo al proveedor y sin recargo. El costo mensual se estima antes de empezar.",
  },
  {
    id: "sin-lock-in",
    titulo: "Sin lock-in",
    detalle:
      "No depende de una cuenta ni de un servidor nuestro. Dónde corre lo define la empresa.",
  },
  {
    id: "alcance-cerrado",
    titulo: "Alcance cerrado",
    detalle:
      "Qué se construye, cuánto cuesta y cuánto demora, por escrito antes de empezar.",
  },
  {
    id: "noventa-dias",
    titulo: "90 días de corrección",
    detalle:
      "Sin costo, los errores de lo que construimos dentro del alcance acordado. No cubre cambios de terceros, requerimientos nuevos ni ampliaciones.",
  },
];

/**
 * RANGO DE INVERSIÓN — pendiente de datos reales.
 *
 * La idea es que el visitante sepa en qué orden de magnitud se mueve el
 * trabajo ANTES de completar el formulario: que alguien se descarte solo es
 * preferible a una reunión que no iba a ningún lado, para las dos partes.
 *
 * Queda en null hasta que existan los precios reales. Un rango inventado acá
 * es de las pocas cosas que pueden hacer perder un cliente en la reunión
 * siguiente. Al escribir algo como "Los proyectos arrancan en USD 2.000",
 * aparece solo arriba del formulario de contacto.
 */
export const RANGO_INVERSION: string | null = null;
