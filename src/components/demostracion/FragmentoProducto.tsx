/**
 * FRAGMENTO DE PRODUCTO — el visual del hero
 *
 * No es una imagen ni una ilustración: es un pedazo de la misma interfaz que
 * la sección 02 muestra completa. Un mensaje entrando, tres etapas resueltas y
 * el estado final.
 *
 * Existe para que el hero conteste "qué es esto" sin que haya que leer, y para
 * que el visitante quiera bajar a ver el recorrido entero. Por eso las tres
 * etapas que muestra son las tres primeras del ejemplo de abajo, con el mismo
 * vocabulario: cuando llega a la sección 02, reconoce lo que ya vio.
 *
 * Estático y sin JavaScript: es lo primero que se pinta en la página y no
 * puede depender de que cargue un bundle. La versión que corre está abajo.
 *
 * Las tres etapas se leen del mismo objeto DEMOSTRACION: si el ejemplo cambia,
 * el fragmento cambia con él y no quedan dos guiones distintos conviviendo.
 */

import { DEMOSTRACION } from "@/lib/demostracion";

/** Las tres primeras etapas del recorrido: hasta que el software responde. */
const ETAPAS = DEMOSTRACION.etapas.slice(0, 3);
/** El mensaje que entra, tal como aparece abajo. */
const ENTRADA = DEMOSTRACION.conversacion[0];

export default function FragmentoProducto() {
  return (
    <div
      className="panel w-full max-w-[26rem]"
      // Ornamental en el sentido estricto: todo lo que dice acá está escrito
      // completo en la sección 02, con su rótulo de ejemplo conceptual. Para
      // un lector de pantalla, repetirlo dos veces sería ruido.
      aria-hidden="true"
    >
      {/* Barra del panel: de dónde entra y en qué estado está. */}
      <div className="panel-barra">
        <span className="text-[11px] uppercase tracking-[0.14em] text-tinta-2">
          {DEMOSTRACION.canal}
        </span>
        <span className="flex items-center gap-2">
          <span className="panel-punto" data-estado="listo" />
          <span className="traza-estado" data-tono="listo">
            resuelto
          </span>
        </span>
      </div>

      <div className="panel-cuerpo">
        {/* El mensaje, como llega. */}
        <p className="bg-klein-tinte px-3 py-2.5 text-[13px] leading-relaxed text-tinta">
          {ENTRADA.texto}
        </p>

        {/* Las tres primeras etapas, ya resueltas. */}
        <ol className="relative mt-4">
          <span className="traza-eje" aria-hidden="true">
            <span
              className="traza-eje-avance"
              style={{ ["--avance" as string]: 1 }}
            />
          </span>

          {ETAPAS.map((etapa) => (
            <li
              key={etapa.id}
              className="traza-etapa relative py-1.5 pl-4"
              data-visible="true"
              // Texto más chico que el de la sección: el punto sube.
              style={{ ["--punto-top" as string]: "0.55rem" }}
            >
              <span className="traza-punto" aria-hidden="true" />
              <span className="text-[13px] leading-snug text-tinta">
                {etapa.nombre}
              </span>
              <span className="ml-2 text-[12px] leading-snug text-tinta-2">
                {etapa.detalle}
              </span>
            </li>
          ))}
        </ol>

        {/* El cierre: hay una etapa que espera a una persona. Es el dato que
            diferencia esto de un chatbot, y por eso está en el hero. */}
        <p className="hairline hairline-t mt-3 flex items-center gap-2 pt-3">
          <span className="panel-punto" data-estado="atencion" />
          <span className="text-[12px] leading-snug text-tinta-2">
            El pedido queda preparado y lo confirma una persona.
          </span>
        </p>
      </div>
    </div>
  );
}
