"use client";

/**
 * APOYO 1 — tipografía cinética del hero
 *
 * La palabra variable del titular rota en loop dentro de una máscara de altura
 * fija, deslizando hacia arriba. 2.2 s quieta, 300 ms de transición.
 *
 * La máscara ajusta su ancho a la palabra que entra, porque las palabras miden
 * muy distinto ("tu socio" contra "alguien a las 9pm") y sin eso el resto del
 * titular pegaría un salto en cada cambio.
 *
 * Bajo prefers-reduced-motion se muestra la primera palabra y no rota nunca:
 * el titular se lee igual, simplemente no se mueve.
 */

import { useEffect, useRef, useState } from "react";
import { prefiereMenosMovimiento } from "@/lib/movimiento";

type Props = {
  /** Las palabras que se turnan. La primera es la que ve quien no tiene JS. */
  palabras: string[];
};

/** Cuánto queda quieta cada palabra. */
const MS_QUIETA = 2200;
/** Cuánto tarda el deslizamiento. */
const MS_DESLIZ = 300;

export default function PalabraCinetica({ palabras }: Props) {
  const [indice, setIndice] = useState(0);
  /** Índice de la palabra que está saliendo, o null si no hay cambio en curso. */
  const [saliendo, setSaliendo] = useState<number | null>(null);
  const [ancho, setAncho] = useState<number | null>(null);
  const [quieto, setQuieto] = useState(true);

  // Reglas de medición: una por palabra, fuera de flujo e invisibles.
  const reglas = useRef<(HTMLSpanElement | null)[]>([]);
  const temporizadores = useRef<number[]>([]);

  /** Mide la palabra i y fija el ancho de la máscara. */
  function medir(i: number) {
    const regla = reglas.current[i];
    if (regla) setAncho(regla.getBoundingClientRect().width);
  }

  // Ancho inicial. Se recalcula si cambia el tamaño de la ventana, porque el
  // titular usa clamp() y la palabra cambia de cuerpo con el viewport.
  useEffect(() => {
    medir(indice);
    const alMedir = () => medir(indice);
    window.addEventListener("resize", alMedir);
    return () => window.removeEventListener("resize", alMedir);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice]);

  // El loop. No arranca si el sistema pidió menos movimiento.
  useEffect(() => {
    if (prefiereMenosMovimiento() || palabras.length < 2) {
      setQuieto(true);
      return;
    }
    setQuieto(false);

    const programar = () => {
      const id = window.setTimeout(() => {
        setIndice((actual) => {
          setSaliendo(actual);
          return (actual + 1) % palabras.length;
        });
        // La saliente se descarta recién cuando terminó de subir.
        temporizadores.current.push(
          window.setTimeout(() => setSaliendo(null), MS_DESLIZ),
        );
        programar();
      }, MS_QUIETA);
      temporizadores.current.push(id);
    };

    programar();

    return () => {
      temporizadores.current.forEach((id) => window.clearTimeout(id));
      temporizadores.current = [];
    };
  }, [palabras.length]);

  const palabraActual = palabras[indice];

  return (
    <>
      {/* Lo que leen los buscadores y los lectores de pantalla: una sola
          palabra, sin la rotación, que de otro modo sería ruido. */}
      <span className="sr-only">{palabras[0]}</span>

      <span
        aria-hidden="true"
        className="palabra-mascara"
        style={ancho !== null ? { width: `${ancho}px` } : undefined}
      >
        {/* La palabra que se va, subiendo fuera de la máscara. */}
        {saliendo !== null && !quieto ? (
          <span className="palabra-pieza" data-rol="saliente">
            {palabras[saliendo]}
          </span>
        ) : null}

        {/* La que está o la que entra. Al cambiar de key se remonta abajo y
            sube a su lugar. */}
        <span
          key={quieto ? "fijo" : indice}
          className="palabra-pieza"
          data-rol={quieto ? "entrante" : "esperando"}
          ref={(nodo) => {
            // En el mismo frame en que monta abajo, se la manda a su lugar.
            if (nodo && !quieto) {
              requestAnimationFrame(() =>
                nodo.setAttribute("data-rol", "entrante"),
              );
            }
          }}
        >
          {palabraActual}
        </span>

        {/* Reglas de medición. Nunca se ven. */}
        {palabras.map((palabra, i) => (
          <span
            key={palabra}
            className="palabra-regla"
            ref={(nodo) => {
              reglas.current[i] = nodo;
            }}
          >
            {palabra}
          </span>
        ))}
      </span>
    </>
  );
}
