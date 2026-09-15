"use client";

/**
 * EL EJEMPLO CONCEPTUAL, CORRIENDO
 *
 * Un panel con dos columnas: a la izquierda el mensaje como entra, a la
 * derecha las seis etapas del recorrido con su estado. Abajo, el marco: qué
 * información tiene autorizada, qué herramientas, qué permisos y reglas.
 *
 * POR QUÉ SE ANIMA. Para que se entienda que hay un ORDEN y que cada etapa
 * depende de la anterior. El recorrido entero dura 2,3 segundos —380ms por
 * etapa— y arranca cuando el bloque entra en pantalla, una sola vez. No hay
 * loop: un proceso que se repite solo no parece un proceso, parece un adorno.
 *
 * QUIEN NO ESPERA, IGUAL LEE TODO. El HTML del servidor trae las seis etapas
 * puestas y visibles; el JavaScript las esconde recién al montar, y solo si va
 * a animarlas. Sin JS, con el bundle todavía cargando o con
 * prefers-reduced-motion, el bloque es contenido completo y quieto.
 *
 * ESTADOS. Cada etapa muestra qué está haciendo mientras corre (procesando,
 * consultando, ejecutando) y qué quedó cuando terminó (procesado, consultado,
 * espera confirmación). Eso es lo que comunica que el sistema ejecuta un
 * proceso, y no que "genera un texto".
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEMOSTRACION,
  ETAPA_CONDICIONAL,
  ETIQUETA_INTERVENCION,
  type Etapa,
  type Mensaje,
} from "@/lib/demostracion";
import { prefiereMenosMovimiento } from "@/lib/movimiento";
import Boton from "@/components/ui/Boton";

/** Lo que tarda cada etapa en aparecer. Seis etapas: 2,3 segundos en total. */
const MS_POR_ETAPA = 380;

/** La respuesta del software entra cuando el recorrido llega a la acción. */
const ETAPA_DE_LA_RESPUESTA = 3;

const TOTAL = DEMOSTRACION.etapas.length;

/** Un mensaje de la conversación. El del sistema se distingue por el tinte. */
function Burbuja({ mensaje, visible }: { mensaje: Mensaje; visible: boolean }) {
  const esSistema = mensaje.de === "sistema";

  return (
    <li
      className={`traza-etapa flex flex-col ${esSistema ? "items-end" : "items-start"}`}
      data-visible={visible}
    >
      <p
        className={`
          max-w-[32ch] px-3.5 py-2.5 text-[13px] leading-relaxed sm:text-[14px]
          ${esSistema ? "bg-klein-tinte text-tinta" : "bg-papel text-tinta hairline hairline-t hairline-b"}
        `}
      >
        {mensaje.texto}
      </p>
      <span className="mt-1.5 text-[11px] tabular-nums text-tinta-2">
        <span className="sr-only">
          {esSistema ? "Respuesta del software" : "Mensaje del cliente"},{" "}
        </span>
        {mensaje.hora}
      </span>
    </li>
  );
}

/** Una etapa del recorrido, con su punto sobre el eje y su estado. */
function EtapaDelRecorrido({
  etapa,
  orden,
  visible,
  corriendo,
}: {
  etapa: Etapa;
  orden: number;
  visible: boolean;
  corriendo: boolean;
}) {
  const condicional = etapa.id === ETAPA_CONDICIONAL;

  return (
    <li
      className="traza-etapa relative py-2.5 pl-5"
      data-visible={visible}
      data-intervencion={Boolean(etapa.intervencion)}
    >
      <span className="traza-punto" aria-hidden="true" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-serif text-[17px] leading-snug sm:text-[18px]">
          <span
            aria-hidden="true"
            className="mr-2 text-[11px] tabular-nums tracking-[0.14em] text-tinta-2"
          >
            {String(orden).padStart(2, "0")}
          </span>
          {etapa.nombre}
        </h4>

        {/* El estado. Mientras corre dice qué está haciendo; después, qué
            quedó. Es el renglón que convierte una lista en un proceso. */}
        <span
          className="traza-estado"
          data-tono={corriendo ? "corriendo" : etapa.tono}
        >
          {corriendo ? `${etapa.corriendo}…` : etapa.estado}
        </span>
      </div>

      <p className="mt-1 max-w-[44ch] text-[14px] leading-relaxed text-tinta-2">
        {etapa.detalle}
      </p>

      {/* Solo la etapa condicional lleva renglón propio. Para las demás, el
          estado de la derecha ya dice lo mismo: repetir "espera confirmación"
          dos veces en la misma etapa era ruido, no énfasis. */}
      {condicional && etapa.intervencion ? (
        <p className="mt-2 text-[12px] text-tinta-2">
          Salida prevista · {ETIQUETA_INTERVENCION[etapa.intervencion]}
        </p>
      ) : null}
    </li>
  );
}

export default function TrazaAgente() {
  /**
   * Cuántas etapas se mostraron. Arranca en TOTAL —todas visibles— y el efecto
   * la baja a 0 solo si va a animar: así el HTML del servidor y el primer
   * render del cliente coinciden, y quien no tiene JS ve el bloque entero.
   */
  const [mostradas, setMostradas] = useState(TOTAL);
  const [anima, setAnima] = useState(false);
  const [corriendo, setCorriendo] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);
  const temporizadores = useRef<number[]>([]);

  const limpiar = useCallback(() => {
    temporizadores.current.forEach((id) => window.clearTimeout(id));
    temporizadores.current = [];
  }, []);

  const correr = useCallback(() => {
    limpiar();
    setMostradas(0);
    setCorriendo(true);

    for (let i = 1; i <= TOTAL; i += 1) {
      const id = window.setTimeout(() => {
        setMostradas(i);
        if (i === TOTAL) setCorriendo(false);
      }, i * MS_POR_ETAPA);
      temporizadores.current.push(id);
    }
  }, [limpiar]);

  // Arranca cuando el bloque entra en pantalla, una sola vez.
  useEffect(() => {
    if (prefiereMenosMovimiento()) return;
    const nodo = contenedor.current;
    if (!nodo || typeof IntersectionObserver === "undefined") return;

    setAnima(true);

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0]?.isIntersecting) return;
        observador.disconnect();
        correr();
      },
      // Un tercio del bloque a la vista: así el recorrido no arranca cuando
      // todavía se ve solo el borde superior del panel.
      { threshold: 0.33 },
    );

    observador.observe(nodo);
    return () => {
      observador.disconnect();
      limpiar();
    };
  }, [correr, limpiar]);

  /** Estado global del panel, el que se lee en la barra de arriba. */
  const terminado = !corriendo && mostradas >= TOTAL;

  return (
    <div ref={contenedor} className="traza" data-anima={anima}>
      <div className="panel panel-papel">
        {/* Barra del panel: canal, y en qué estado está el recorrido. */}
        <div className="panel-barra">
          <span className="text-[11px] uppercase tracking-[0.14em] text-tinta-2">
            {DEMOSTRACION.canal}
          </span>
          <span className="flex items-center gap-2">
            <span
              className="panel-punto"
              data-estado={terminado ? "listo" : "corriendo"}
            />
            <span
              className="traza-estado"
              data-tono={terminado ? "listo" : "corriendo"}
            >
              {terminado ? "completado" : "procesando"}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-10">
          {/* ---- la conversación ---- */}
          <div>
            <p className="kicker kicker-tinta">La conversación</p>
            <ul className="mt-4 flex flex-col gap-4">
              {DEMOSTRACION.conversacion.map((mensaje, i) => (
                <Burbuja
                  key={i}
                  mensaje={mensaje}
                  // El primer mensaje está desde el arranque; la respuesta del
                  // software entra cuando el recorrido llega a la acción.
                  visible={i === 0 || mostradas >= ETAPA_DE_LA_RESPUESTA}
                />
              ))}
            </ul>
          </div>

          {/* ---- las seis etapas ---- */}
          <div>
            <p className="kicker kicker-tinta">El recorrido, etapa por etapa</p>

            <ol className="relative mt-4">
              <span className="traza-eje" aria-hidden="true">
                <span
                  className="traza-eje-avance"
                  style={{ ["--avance" as string]: mostradas / TOTAL }}
                />
              </span>

              {DEMOSTRACION.etapas.map((etapa, i) => (
                <EtapaDelRecorrido
                  key={etapa.id}
                  etapa={etapa}
                  orden={i + 1}
                  visible={mostradas > i}
                  corriendo={corriendo && mostradas === i}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Volver a verlo. Solo tiene sentido si el bloque anima. */}
      {anima ? (
        <div className="mt-3 flex justify-end">
          <Boton tono="texto" onClick={correr} disabled={corriendo}>
            {corriendo ? "corriendo…" : "ver de nuevo"}
          </Boton>
        </div>
      ) : null}

      {/* ---- el marco ---- */}
      <div className="mt-10">
        <p className="kicker kicker-tinta">
          Dentro de qué límites trabaja, en este ejemplo
        </p>
        <dl className="grilla-expuesta grilla-expuesta-sm mt-5 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-2 lg:grid-cols-3">
          {DEMOSTRACION.marco.map((limite) => (
            <div key={limite.titulo} className="py-5 sm:px-5">
              <dt className="text-[14px] text-tinta">{limite.titulo}</dt>
              <dd className="mt-1 max-w-[38ch] text-[13px] leading-relaxed text-tinta-2">
                {limite.detalle}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
