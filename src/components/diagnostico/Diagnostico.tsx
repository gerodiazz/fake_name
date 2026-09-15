"use client";

/**
 * DIAGNÓSTICO — asistente de cuatro pasos
 *
 *   01 · Rubro          a qué se dedica la empresa
 *   02 · Su operación   las tres preguntas propias del rubro
 *   03 · Lo común       las tres que valen para cualquier empresa
 *   04 · Resultado      los procesos marcados, las horas y el plazo
 *
 * QUÉ CAMBIÓ RESPECTO DE LA VERSIÓN ANTERIOR
 *
 * Antes había dos recorridos conviviendo: uno de a una pregunta por pantalla
 * y otro con todas en una lista, con un enlace para saltar de uno a otro. Dos
 * implementaciones de lo mismo, con dos comportamientos distintos y el doble
 * de estado. Queda uno solo: las preguntas van agrupadas por paso.
 *
 * Elegir el rubro tampoco dispara ya el recorrido: lo marca, y avanzar es una
 * decisión aparte. Eso es lo que permite volver al paso 1 y encontrar la
 * elección donde estaba.
 *
 * LO QUE SE CONSERVA
 *
 * · El tachado de la pregunta contestada y la ficha del agente que cae en la
 *   pila. Es la coreografía que hace que esto se sienta una herramienta.
 * · La cortina, ahora en un solo lugar: el paso al resultado. Antes también
 *   corría al elegir el rubro, donde ahora hay un botón y no un salto.
 * · El cálculo del resultado, intacto: sale de src/lib/diagnostico.ts y de
 *   src/lib/estado-diagnostico.tsx, y no se tocó una línea.
 *
 * LAS RESPUESTAS PERSISTEN mientras se navega: viven en el contexto, no en
 * este componente, así que ir y volver entre pasos no borra nada. Cambiar de
 * rubro sí las borra, porque las preguntas pasan a ser otras.
 */

import { useCallback, useState } from "react";
import SelectorRubro from "@/components/diagnostico/SelectorRubro";
import GrupoPreguntas from "@/components/diagnostico/GrupoPreguntas";
import Progreso from "@/components/diagnostico/Progreso";
import PilaAgentes from "@/components/diagnostico/PilaAgentes";
import BarraInferior from "@/components/diagnostico/BarraInferior";
import Resultado from "@/components/diagnostico/Resultado";
import Boton from "@/components/ui/Boton";
import { useBarrido } from "@/components/Barrido";
import { useDiagnostico } from "@/lib/estado-diagnostico";
import { PREGUNTAS_UNIVERSALES, type Pregunta } from "@/lib/diagnostico";
import { SITIO } from "@/lib/sitio";

/** Los cuatro pasos del recorrido. El cuarto es el resultado. */
const TOTAL_PASOS = 4;

/** Nombre de cada paso, para el rótulo de la herramienta. */
const NOMBRES = [
  "Tu empresa",
  "Tu operación",
  "Lo que pasa en cualquier empresa",
  "Tu diagnóstico",
];

export default function Diagnostico() {
  const {
    rubroId,
    rubro,
    respuestas,
    textoLibre,
    completo,
    codigoReferido,
    agentes,
    horasAnuales,
    semanas,
    elegirRubro,
    responder,
    escribirTextoLibre,
    marcarCompleto,
    reiniciar,
  } = useDiagnostico();

  /** La cortina. Un solo uso en todo el sitio: el paso al resultado. */
  const barrer = useBarrido();

  const [paso, setPaso] = useState(1);
  /** El rubro marcado en el paso 1, que puede no ser todavía el confirmado. */
  const [marcado, setMarcado] = useState<string | null>(rubroId);
  /** Ids de lo que falta contestar. Se llena recién al intentar continuar. */
  const [faltantes, setFaltantes] = useState<string[]>([]);

  /** Las tres del rubro. "Otro rubro" no tiene: pide texto libre. */
  const propias = rubro?.preguntas ?? [];
  const pideTextoLibre = Boolean(rubro?.pideTextoLibre);

  const contestar = useCallback(
    (pregunta: Pregunta, siONo: boolean) => {
      responder(pregunta.id, siONo);
      setFaltantes((previas) => previas.filter((id) => id !== pregunta.id));
    },
    [responder],
  );

  /** Las que faltan de un grupo. Vacío si están todas. */
  function sinContestar(preguntas: Pregunta[]): string[] {
    return preguntas
      .filter((p) => respuestas[p.id] === undefined)
      .map((p) => p.id);
  }

  function irA(siguiente: number) {
    setFaltantes([]);
    setPaso(siguiente);
    // El foco vuelve al encabezado del paso: sin esto, quien navega por
    // teclado queda parado en un botón que ya no existe.
    window.requestAnimationFrame(() => {
      document.getElementById("paso-titulo")?.focus();
    });
  }

  function continuar() {
    if (paso === 1) {
      if (!marcado) {
        setFaltantes(["rubro"]);
        return;
      }
      // Cambiar de rubro borra las respuestas: las preguntas pasan a ser
      // otras. Confirmar el mismo rubro no toca nada.
      if (marcado !== rubroId) elegirRubro(marcado);
      irA(2);
      return;
    }

    if (paso === 2) {
      // El paso de texto libre no obliga a escribir nada.
      const faltan = pideTextoLibre ? [] : sinContestar(propias);
      if (faltan.length > 0) {
        setFaltantes(faltan);
        return;
      }
      irA(3);
      return;
    }

    if (paso === 3) {
      const faltan = sinContestar(PREGUNTAS_UNIVERSALES);
      if (faltan.length > 0) {
        setFaltantes(faltan);
        return;
      }
      // El momento firma: la cortina tapa, el estado cambia detrás y al
      // destaparse el resultado ya está puesto.
      barrer(() => {
        marcarCompleto();
        setPaso(4);
      }, 700);
    }
  }

  function volver() {
    if (paso > 1) irA(paso - 1);
  }

  function rehacer() {
    reiniciar();
    setMarcado(null);
    setFaltantes([]);
    setPaso(1);
  }

  /* ---- render ---- */

  // El resultado ocupa la herramienta entera: ahí el marcador de pasos ya no
  // aporta y el número grande es el protagonista.
  if (completo && paso === 4) {
    return (
      <Resultado
        agentes={agentes}
        horasAnuales={horasAnuales}
        semanas={semanas}
        rubroNombre={rubro?.nombre ?? ""}
        rubroId={rubro?.id ?? ""}
        codigo={codigoReferido}
        onRehacer={rehacer}
      />
    );
  }

  /** La pila de fichas, la última contratada arriba. */
  const pila = agentes
    .map((agente, i) => ({ agente, orden: i + 1 }))
    .reverse();

  return (
    <div>
      {/* Cabecera de la herramienta: de quién es, en qué paso va y cuánto
          falta. Es lo que la hace sentir un producto y no un formulario. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="kicker kicker-tinta">
          {SITIO.marcaCorta} · Diagnóstico
        </p>
        <p className="text-[11px] tabular-nums tracking-[0.14em] text-tinta-2">
          {String(paso).padStart(2, "0")} /{" "}
          {String(TOTAL_PASOS).padStart(2, "0")}
        </p>
      </div>

      <div className="mt-3">
        <Progreso paso={paso} total={TOTAL_PASOS} unidad="Paso" />
      </div>

      {/* El contenido del paso. La key remonta el bloque en cada cambio, así
          la transición de entrada corre sola. */}
      <div key={paso} className="anim-entrar mt-10">
        <h3
          id="paso-titulo"
          tabIndex={-1}
          className="kicker kicker-tinta outline-none"
        >
          {NOMBRES[paso - 1]}
        </h3>

        <div className="mt-4">
          {paso === 1 ? (
            <SelectorRubro elegido={marcado} onElegir={setMarcado} />
          ) : null}

          {paso === 2 && !pideTextoLibre ? (
            <GrupoPreguntas
              preguntas={propias}
              respuestas={respuestas}
              onResponder={contestar}
              faltantes={faltantes}
            />
          ) : null}

          {paso === 2 && pideTextoLibre ? (
            <div>
              <h4 className="titular max-w-[22ch] text-[clamp(1.4rem,6vw,2.2rem)]">
                ¿Qué proceso consume más tiempo?
              </h4>
              <label htmlFor="proceso-libre" className="sr-only">
                Descripción del proceso que consume más tiempo
              </label>
              <textarea
                id="proceso-libre"
                value={textoLibre}
                onChange={(e) => escribirTextoLibre(e.target.value)}
                rows={3}
                placeholder="Una descripción breve, como se contaría en una reunión."
                className="campo hairline hairline-b mt-6 w-full max-w-[46ch] resize-none bg-transparent pb-2 text-[16px] text-tinta placeholder:text-tinta-2/70"
              />
              <p className="mt-2 text-[13px] text-tinta-2">
                Se puede dejar vacío.
              </p>
            </div>
          ) : null}

          {paso === 3 ? (
            <GrupoPreguntas
              preguntas={PREGUNTAS_UNIVERSALES}
              respuestas={respuestas}
              onResponder={contestar}
              faltantes={faltantes}
            />
          ) : null}
        </div>
      </div>

      {/* Falta elegir rubro: el único aviso que no cuelga de una pregunta. */}
      {faltantes.includes("rubro") ? (
        <p className="campo-error mt-4 text-[13px]" aria-live="polite">
          Elegí un rubro para continuar.
        </p>
      ) : null}

      {/* Navegación. Continuar es la acción; atrás es una salida. */}
      <div className="hairline hairline-t mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
        <Boton onClick={continuar}>
          {paso === 3 ? "Ver el resultado" : "Continuar"}
        </Boton>

        {paso > 1 ? (
          <Boton tono="texto" onClick={volver}>
            <span aria-hidden="true">←</span> atrás
          </Boton>
        ) : null}

        {rubro ? (
          <span className="text-[13px] text-tinta-2">{rubro.nombre}</span>
        ) : null}
      </div>

      {/* La lista que se va armando, visible desde el paso 2. */}
      {paso > 1 ? (
        <div className="mt-12">
          <p className="kicker kicker-tinta">
            Procesos marcados · {String(pila.length).padStart(2, "0")}
          </p>
          {pila.length > 0 ? (
            <PilaAgentes pila={pila} />
          ) : (
            <p className="mt-3 text-[13px] text-tinta-2">
              Las respuestas afirmativas arman la lista aquí.
            </p>
          )}
        </div>
      ) : null}

      {/* Marcador del recorrido, mientras se contesta. */}
      <BarraInferior agentes={agentes} />
    </div>
  );
}
