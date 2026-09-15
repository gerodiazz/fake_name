"use client";

/**
 * SECCIÓN 02 — DIAGNÓSTICO INTERACTIVO
 *
 * Es la pieza central del sitio y reemplaza al catálogo de servicios. El
 * recorrido es una máquina de estados corta:
 *
 *   rubro → preguntas (de a una, o todas juntas) → resultado
 *
 * Coreografía al contestar que sí, medida desde el toque:
 *   0 ms    la línea Klein empieza a tachar la pregunta y el texto se apaga
 *   400 ms  termina el tachado y emerge la ficha del agente
 *   700 ms  entra la siguiente pregunta
 *
 * Contestar que no es pasar: 260 ms y la siguiente. Con
 * prefers-reduced-motion todos esos tiempos se colapsan.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import SelectorRubro from "@/components/diagnostico/SelectorRubro";
import Progreso from "@/components/diagnostico/Progreso";
import PreguntaUna from "@/components/diagnostico/PreguntaUna";
import ListaPreguntas from "@/components/diagnostico/ListaPreguntas";
import PilaAgentes from "@/components/diagnostico/PilaAgentes";
import BarraInferior from "@/components/diagnostico/BarraInferior";
import Resultado from "@/components/diagnostico/Resultado";
import { useBarrido } from "@/components/BarridoKlein";
import { useDiagnostico } from "@/lib/estado-diagnostico";
import { retardo } from "@/lib/movimiento";
import type { Pregunta } from "@/lib/diagnostico";

export default function Diagnostico() {
  const {
    rubro,
    preguntas,
    respuestas,
    completo,
    textoLibre,
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

  // El momento firma. Se usa exactamente dos veces: al elegir rubro y al
  // pasar al resultado.
  const barrer = useBarrido();

  /* ---- estado local del recorrido ---- */
  const [indice, setIndice] = useState(0);
  const [modoLista, setModoLista] = useState(false);
  /** Id de la pregunta que está siendo tachada en este instante. */
  const [tachada, setTachada] = useState<string | null>(null);
  /** Id de la pregunta ya contestada, en transición de salida. */
  const [apagada, setApagada] = useState<string | null>(null);
  /** Ids de preguntas cuya ficha de agente ya está visible. */
  const [mostradas, setMostradas] = useState<string[]>([]);

  // Todos los temporizadores en curso, para poder limpiarlos al desmontar o
  // al reiniciar el diagnóstico.
  const temporizadores = useRef<number[]>([]);

  const limpiarTemporizadores = useCallback(() => {
    temporizadores.current.forEach((id) => window.clearTimeout(id));
    temporizadores.current = [];
  }, []);

  const programar = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, retardo(ms));
    temporizadores.current.push(id);
  }, []);

  useEffect(() => limpiarTemporizadores, [limpiarTemporizadores]);

  /* ---- pasos ---- */

  // "Otro rubro" suma un paso final de texto libre después de las universales.
  const pideTextoLibre = Boolean(rubro?.pideTextoLibre);
  const totalPasos = preguntas.length + (pideTextoLibre ? 1 : 0);
  const preguntaActual: Pregunta | undefined = preguntas[indice];
  const enPasoDeTextoLibre = pideTextoLibre && indice === preguntas.length;

  /**
   * Avanza al paso siguiente, o cierra el diagnóstico si no queda ninguno.
   * Recibe el índice de origen en vez de leerlo de un updater: el salto se
   * programa en el momento de contestar, así que el índice de entonces es el
   * correcto.
   */
  const avanzar = useCallback(
    (desde: number) => {
      setTachada(null);
      setApagada(null);
      const siguiente = desde + 1;
      if (siguiente >= totalPasos) {
        // Segundo y último barrido del sitio, más corto que el del rubro:
        // el visitante ya sabe qué es esa cortina.
        barrer(marcarCompleto, 700);
      } else {
        setIndice(siguiente);
      }
    },
    [totalPasos, marcarCompleto, barrer],
  );

  /** Cerrar el diagnóstico desde la lista o desde el paso de texto libre. */
  const terminar = useCallback(
    () => barrer(marcarCompleto, 700),
    [barrer, marcarCompleto],
  );

  /* ---- respuestas en el recorrido de a una ---- */

  function contestarQueSi(pregunta: Pregunta) {
    if (apagada) return; // ya se está resolviendo esta pregunta
    responder(pregunta.id, true);
    setTachada(pregunta.id); // arranca el tachado (400 ms por CSS)
    setApagada(pregunta.id); // y el texto baja a tinta secundaria
    programar(() => setMostradas((previas) => [...previas, pregunta.id]), 400);
    programar(() => avanzar(indice), 700);
  }

  function contestarQueNo(pregunta: Pregunta) {
    if (apagada) return;
    responder(pregunta.id, false);
    setApagada(pregunta.id);
    programar(() => avanzar(indice), 260);
  }

  /* ---- respuestas en modo lista ---- */

  function contestarEnLista(pregunta: Pregunta, siONo: boolean) {
    responder(pregunta.id, siONo);
    setMostradas((previas) => {
      const sinEsta = previas.filter((id) => id !== pregunta.id);
      return siONo ? [...sinEsta, pregunta.id] : sinEsta;
    });
  }

  /* ---- navegación ---- */

  /**
   * Elegir el rubro dispara el momento firma: la cortina Klein sube, tapa
   * todo, y cuando se va la primera pregunta ya está puesta. El visitante no
   * ve el reemplazo, ve el resultado.
   */
  function elegirRubroYEmpezar(id: string) {
    limpiarTemporizadores();
    barrer(() => {
      elegirRubro(id);
      setIndice(0);
      setModoLista(false);
      setTachada(null);
      setApagada(null);
      setMostradas([]);
    }, 1100);
  }

  function rehacer() {
    limpiarTemporizadores();
    reiniciar();
    setIndice(0);
    setModoLista(false);
    setTachada(null);
    setApagada(null);
    setMostradas([]);
  }

  /**
   * Orden de contratación: el orden en que se fue diciendo que sí. De ahí sale
   * la numeración de cada ficha.
   */
  const contratados = mostradas
    .map((id) => preguntas.find((p) => p.id === id))
    .filter((p): p is Pregunta => Boolean(p))
    .map((p, i) => ({ agente: p.agente, orden: i + 1 }));

  // La pila se dibuja al revés: la última contratada arriba, empujando al
  // resto hacia abajo.
  const pila = [...contratados].reverse();

  /* ---- render ---- */

  // Paso 0: todavía no hay rubro.
  if (!rubro) {
    return <SelectorRubro onElegir={elegirRubroYEmpezar} />;
  }

  return (
    <div>
      {/* Rubro elegido, siempre a la vista, con salida para cambiarlo. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="kicker kicker-tinta">{rubro.nombre}</p>
        <button type="button" onClick={rehacer} className="boton boton-texto">
          cambiar de rubro
        </button>
      </div>

      <div className="mt-2">
        {completo ? (
          <Resultado
            agentes={agentes}
            horasAnuales={horasAnuales}
            semanas={semanas}
            rubroNombre={rubro.nombre}
            rubroId={rubro.id}
            codigo={codigoReferido}
            onRehacer={rehacer}
          />
        ) : modoLista ? (
          <ListaPreguntas
            preguntas={preguntas}
            respuestas={respuestas}
            onResponder={contestarEnLista}
            onTerminar={terminar}
            onVolverAlRecorrido={() => setModoLista(false)}
          />
        ) : enPasoDeTextoLibre ? (
          /* Paso extra de "Otro rubro": el visitante escribe su proceso. */
          <div className="anim-entrar">
            {/* Último paso del recorrido: la barra llega al final. */}
            <Progreso paso={totalPasos} total={totalPasos} unidad="Paso" />
            <h3 className="titular mt-6 max-w-[19ch] text-[clamp(1.6rem,7.2vw,2.75rem)]">
              ¿Qué proceso consume más tiempo?
            </h3>
            <label htmlFor="proceso-libre" className="sr-only">
              Descripción del proceso que consume más tiempo
            </label>
            <textarea
              id="proceso-libre"
              value={textoLibre}
              onChange={(e) => escribirTextoLibre(e.target.value)}
              rows={3}
              placeholder="Una descripción breve, como se contaría en una reunión."
              // Sin focus:outline-none: el anillo Klein global es la única
              // señal de foco que tiene este campo, que no tiene caja.
              className="
                mt-6 w-full max-w-[42ch] resize-none bg-transparent pb-2
                text-[16px] text-tinta placeholder:text-tinta-2/70
                hairline hairline-b
              "
            />
            <div className="mt-5 flex flex-col items-start">
              <button
                type="button"
                onClick={terminar}
                className="
                  inline-flex min-h-[44px] items-center font-serif text-[21px]
                  leading-none text-klein underline decoration-[1.5px]
                  underline-offset-[7px]
                  transition-[opacity,transform] duration-100
                  active:opacity-55
                "
              >
                Listo
              </button>
              <button
                type="button"
                onClick={terminar}
                className="boton boton-texto mt-1"
              >
                prefiero no escribirlo
              </button>
            </div>
          </div>
        ) : preguntaActual ? (
          <PreguntaUna
            // La key fuerza el remontaje: cada pregunta entra con su animación.
            key={preguntaActual.id}
            pregunta={preguntaActual}
            paso={indice + 1}
            total={totalPasos}
            tachada={tachada === preguntaActual.id}
            apagada={apagada === preguntaActual.id}
            onSi={() => contestarQueSi(preguntaActual)}
            onNo={() => contestarQueNo(preguntaActual)}
          />
        ) : null}
      </div>

      {/* Atajo para quien no quiere el recorrido de a una. */}
      {!completo && !modoLista ? (
        <button
          type="button"
          onClick={() => setModoLista(true)}
          className="boton boton-texto mt-8 underline decoration-linea underline-offset-4"
        >
          ver todas las preguntas
        </button>
      ) : null}

      {/* La lista que se va armando. Se acumula abajo, siempre visible. Cuando
          llega el resultado deja de mostrarse aquí: ya está contada. */}
      {!completo ? (
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

      {/* Marcador del recorrido. Entra al contratar el primero y se va con el
          resultado, donde el número pasa a ser el protagonista. */}
      {!completo ? <BarraInferior agentes={contratados.map((c) => c.agente)} /> : null}
    </div>
  );
}
