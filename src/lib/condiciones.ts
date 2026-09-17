/**
 * CONDICIONES COMERCIALES
 *
 * No es letra chica: es parte de la oferta, y por eso está a la vista y sin
 * nada plegado.
 *
 * ERAN SIETE Y QUEDARON CUATRO. Las cuatro que quedan son las que bajan el
 * riesgo de contratar, y son las que alguien repite cuando le cuenta a un
 * socio de qué se trata. Las otras tres se fueron porque ya estaban dichas en
 * otro lado o no pesan en la decisión:
 *
 *   · "Alcance cerrado" lo dice la etapa 02 de cómo trabajamos, que es
 *     literalmente "alcance, precio y plazo por escrito".
 *   · "Costos de API" pasó a una línea del pago único: es una aclaración de
 *     esa condición, no una condición aparte.
 *   · "90 días de corrección" pasó a la respuesta de la pregunta sobre la
 *     suscripción, que es donde alguien se lo pregunta de verdad.
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
      "Proyecto cerrado, se paga una vez. Ninguna suscripción es obligatoria para que el software siga funcionando; los costos de API, si los hay, se pagan directo al proveedor y sin recargo.",
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
    id: "sin-lock-in",
    titulo: "Sin lock-in",
    detalle:
      "No depende de una cuenta ni de un servidor nuestro. Dónde corre lo define la empresa.",
  },
];

/**
 * RANGO DE INVERSIÓN — pendiente de datos reales.
 *
 * La idea es que el visitante sepa en qué orden de magnitud se mueve el
 * trabajo ANTES de escribir: que alguien se descarte solo es preferible a una
 * reunión que no iba a ningún lado, para las dos partes.
 *
 * Queda en null hasta que existan los precios reales. Un rango inventado acá
 * es de las pocas cosas que pueden hacer perder un cliente en la reunión
 * siguiente. Al escribir algo como "Los proyectos arrancan en USD 2.000",
 * aparece solo arriba del formulario.
 */
export const RANGO_INVERSION: string | null = null;
