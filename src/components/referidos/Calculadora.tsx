"use client";

/**
 * CALCULADORA DE REFERIDOS (sección 04)
 *
 * Misma gramática que el diagnóstico: se mueve el slider, el número responde,
 * se desbloquea un estado. Por eso el número usa el MISMO componente serif
 * gigante que las horas de la sección 02, ahora en dólares. La simetría entre
 * los dos bloques es deliberada y tiene que leerse.
 *
 * Todos los montos y escalones salen del objeto REFERIDOS. Aquí no hay ni un
 * número de negocio escrito a mano.
 *
 * El cruce de un escalón es el momento de mayor impacto del sitio y ahí se
 * gasta el presupuesto de animación: la marca se enciende, el número salta y
 * vuelve, y el desglose se reordena con la línea del bono nuevo.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import NumeroGigante from "@/components/NumeroGigante";
import { Banda } from "@/components/Decoracion";
import {
  REFERIDOS,
  calcularGanancia,
  enDolares,
  escalonesOrdenados,
  maximoClientes,
} from "@/lib/referidos";

/** Ancho del thumb del slider. El track útil es el ancho menos este valor. */
const THUMB = 44;

/**
 * Posición horizontal de un valor sobre el track, en CSS.
 * El centro del thumb no llega a los bordes: recorre desde THUMB/2 hasta
 * ancho − THUMB/2. Las marcas tienen que usar la misma cuenta o quedan
 * corridas respecto del punto que las cruza.
 */
function posicion(valor: number, minimo: number, maximo: number): string {
  const fraccion = (valor - minimo) / (maximo - minimo);
  return `calc(${THUMB / 2}px + ${fraccion} * (100% - ${THUMB}px))`;
}

export default function Calculadora() {
  const MINIMO = 1;
  const MAXIMO = useMemo(() => maximoClientes(), []);
  const escalones = useMemo(() => escalonesOrdenados(), []);

  // Arranca en 1: el visitante tiene que mover algo para que el número hable.
  const [clientes, setClientes] = useState(MINIMO);
  // Hasta que alguien lo toca, el track late suave. Es la única forma de
  // decir "esto se arrastra" sin escribirlo.
  const [tocado, setTocado] = useState(false);

  const ganancia = useMemo(() => calcularGanancia(clientes), [clientes]);

  /* ---- detección del cruce de escalón ---- */

  // Cuántos escalones había alcanzados en el render anterior.
  const alcanzadosPrevios = useRef(0);
  // Cambia de valor para pedirle al número que salte.
  const [impulso, setImpulso] = useState(0);
  // Clientes del escalón que se está encendiendo ahora mismo.
  const [encendiendo, setEncendiendo] = useState<number | null>(null);

  useEffect(() => {
    const ahora = ganancia.alcanzados.length;

    // Solo festejamos al subir. Al bajar el slider las marcas se apagan secas.
    if (ahora > alcanzadosPrevios.current) {
      const recienAlcanzado = ganancia.alcanzados[ahora - 1];
      alcanzadosPrevios.current = ahora;
      setEncendiendo(recienAlcanzado.clientes);
      setImpulso((valor) => valor + 1);
      const id = window.setTimeout(() => setEncendiendo(null), 450);
      return () => window.clearTimeout(id);
    }

    alcanzadosPrevios.current = ahora;
    // La dependencia es la cantidad, no el arreglo: `alcanzados` se recrea en
    // cada render y haría correr el efecto de más, cortando el temporizador.
  }, [ganancia.alcanzados.length]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- barra de progreso al próximo escalón ---- */

  // El progreso se mide desde el último escalón alcanzado, no desde cero:
  // así la barra se vacía y se vuelve a llenar en cada tramo.
  const base =
    ganancia.alcanzados.length > 0
      ? ganancia.alcanzados[ganancia.alcanzados.length - 1].clientes
      : 0;
  const progreso = ganancia.proximo
    ? Math.min(
        100,
        ((clientes - base) / (ganancia.proximo.clientes - base)) * 100,
      )
    : 100;

  return (
    <div>
      {/* ---- el número ----
          Segunda y última banda del sitio, gemela de la del resultado del
          diagnóstico: ancho de viewport, papel sobre azul, tramado al costado.
          Que las dos sean iguales es el argumento visual de la página. */}
      <Banda>
        <NumeroGigante
          valor={ganancia.total}
          prefijo="USD "
          impulso={impulso}
          tono="papel"
          etiqueta={`${enDolares(ganancia.total)} de total por ${clientes} ${
            clientes === 1 ? "cliente referido" : "clientes referidos"
          }`}
        />
        <p className="mt-6 max-w-[28ch] font-serif text-[19px] leading-snug text-acento-tinte sm:text-[21px]">
          total por {clientes}{" "}
          {clientes === 1 ? "cliente referido" : "clientes referidos"}.
        </p>
      </Banda>

      {/* ---- el slider ----
          La mecánica va acotada a ancho de lectura: a 1120px, el desglose
          dejaba media pantalla de aire entre la etiqueta y el importe. El
          número gigante sí queda libre. */}
      <div className="mt-10 max-w-[46rem]">
        <div className="flex items-baseline justify-between">
          <label htmlFor="slider-referidos" className="kicker kicker-tinta">
            Clientes referidos
          </label>
          <span className="font-serif text-[21px] leading-none tabular-nums">
            {clientes}
          </span>
        </div>

        {/* El track y las marcas se dibujan acá abajo; el input va encima,
            transparente salvo por el thumb. */}
        <div className="relative mt-3 h-11">
          {/* Track apagado: un hairline de punta a punta. Late hasta que
              alguien lo arrastra por primera vez. */}
          <div
            aria-hidden="true"
            className={`absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-linea ${
              tocado ? "" : "track-latente"
            }`}
          />
          {/* Track recorrido, hasta donde llegó el thumb. */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-tinta transition-[width] duration-100"
            style={{ width: posicion(clientes, MINIMO, MAXIMO) }}
          />

          {/* Marcas de los escalones. Se dibujan desde el arreglo: agregar uno
              nuevo a REFERIDOS lo hace aparecer acá sin tocar nada. */}
          {escalones.map((escalon) => {
            const alcanzado = clientes >= escalon.clientes;
            const seEstaEncendiendo = encendiendo === escalon.clientes;
            return (
              <span
                key={escalon.clientes}
                aria-hidden="true"
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: posicion(escalon.clientes, MINIMO, MAXIMO) }}
              >
                <span
                  className={`
                    block h-[7px] w-[7px] rounded-full transition-colors duration-200
                    ${alcanzado ? "bg-tinta" : "bg-linea"}
                    ${seEstaEncendiendo ? "anim-encender" : ""}
                  `}
                />
              </span>
            );
          })}

          <input
            id="slider-referidos"
            type="range"
            min={MINIMO}
            max={MAXIMO}
            step={1}
            value={clientes}
            onChange={(e) => {
              setClientes(Number(e.target.value));
              setTocado(true);
            }}
            onPointerDown={() => setTocado(true)}
            aria-valuetext={`${clientes} ${
              clientes === 1 ? "cliente referido" : "clientes referidos"
            }, ${enDolares(ganancia.total)}`}
            className="slider-referidos absolute inset-0 w-full"
          />
        </div>

        {/* Etiquetas bajo cada marca. Solo el número de clientes: los montos
            van en la leyenda de abajo, que fluye y no se puede desbordar por
            el costado en pantallas de 375px. */}
        <div className="relative mt-1 h-5">
          {escalones.map((escalon) => {
            const alcanzado = clientes >= escalon.clientes;
            return (
              <span
                key={escalon.clientes}
                aria-hidden="true"
                className={`
                  absolute top-0 -translate-x-1/2 text-[11px] tabular-nums
                  transition-colors duration-200
                  ${alcanzado ? "text-tinta" : "text-tinta-2/60"}
                `}
                style={{ left: posicion(escalon.clientes, MINIMO, MAXIMO) }}
              >
                {escalon.clientes}
              </span>
            );
          })}
        </div>

        {/* Leyenda de la escalera completa, dibujada desde el arreglo. */}
        <p className="mt-2 text-[13px] text-tinta-2">
          Escalones:{" "}
          {escalones.map((escalon, i) => (
            <span key={escalon.clientes}>
              {i > 0 ? " · " : ""}
              <span
                className={
                  clientes >= escalon.clientes ? "text-tinta" : undefined
                }
              >
                {escalon.clientes} clientes, +{enDolares(escalon.bono)}
              </span>
            </span>
          ))}
        </p>
      </div>

      {/* ---- progreso al próximo escalón ---- */}
      <div className="hairline hairline-t mt-6 max-w-[46rem] pt-5">
        {ganancia.proximo ? (
          <>
            <p className="text-[15px] text-tinta">
              Faltan <span className="tabular-nums">{ganancia.faltan}</span>{" "}
              {ganancia.faltan === 1 ? "cliente" : "clientes"} para el bono de{" "}
              {enDolares(ganancia.proximo.bono)}.
            </p>
            <div
              aria-hidden="true"
              className="mt-3 h-px w-full bg-linea"
              // La barra es un hairline que se rellena: sin caja, sin radio.
            >
              <div
                className="h-px bg-tinta transition-[width] duration-200"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </>
        ) : (
          <p className="max-w-[46ch] text-[15px] text-tinta">
            Escalera completa. Los referidos que siguen se suman igual, a{" "}
            {enDolares(REFERIDOS.porCliente)} cada uno.
          </p>
        )}
      </div>

      {/* ---- desglose ---- */}
      <dl className="mt-8 max-w-[46rem] text-[15px]">
        <div className="hairline hairline-t flex items-baseline justify-between gap-4 py-3">
          <dt className="text-tinta-2">
            Comisiones · {clientes} × {enDolares(REFERIDOS.porCliente)}
          </dt>
          <dd className="tabular-nums">{enDolares(ganancia.comisiones)}</dd>
        </div>

        {/* Una línea por bono desbloqueado. Cada una emerge al aparecer: es el
            reordenamiento del desglose en el cruce. */}
        {ganancia.alcanzados.map((escalon) => (
          <div
            key={escalon.clientes}
            className="anim-emerger hairline hairline-t flex items-baseline justify-between gap-4 py-3"
          >
            <dt className="text-tinta-2">
              Bono por {escalon.clientes} clientes
            </dt>
            <dd className="tabular-nums">{enDolares(escalon.bono)}</dd>
          </div>
        ))}

        <div className="hairline hairline-t flex items-baseline justify-between gap-4 py-3">
          <dt className="font-serif text-[19px]">Total</dt>
          <dd className="font-serif text-[19px] tabular-nums text-acento">
            {enDolares(ganancia.total)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
