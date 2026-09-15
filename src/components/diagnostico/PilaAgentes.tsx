"use client";

/**
 * LA PILA DE FICHAS
 *
 * La última contratada queda arriba y las anteriores ceden lugar hacia abajo,
 * de a una, con 40 ms entre cada una. Se lee como cartas que se van tirando
 * sobre una mesa, que es exactamente lo que el sistema de movimiento pide.
 *
 * El corrimiento se hace con la Web Animations API y no con una animación de
 * CSS: una ficha puede cambiar de posición muchas veces — de la 1 a la 2, de
 * la 2 a la 3 — y una animación CSS ya consumida no se vuelve a disparar solo
 * porque cambie una custom property. Con .animate() cada cambio dispara su
 * propio movimiento.
 *
 * NOTA SOBRE EL ORDEN: la ficha más nueva va arriba. Es lo que pide "las que
 * ya están se desplazan hacia abajo". La numeración sigue siendo el orden de
 * contratación, así que la pila se lee 03 · 02 · 01 de arriba hacia abajo:
 * el 01 es el primero que se contrató y quedó al fondo, como en una pila real.
 */

import { useEffect, useRef } from "react";
import FichaAgente, { rotacionDe } from "@/components/diagnostico/FichaAgente";
import { prefiereMenosMovimiento } from "@/lib/movimiento";
import type { Agente } from "@/lib/diagnostico";

type Contratado = {
  agente: Agente;
  /** Número de contratación, de 1 en adelante. */
  orden: number;
};

type Props = {
  /** Ya ordenados como pila: el primero del arreglo es el de más arriba. */
  pila: Contratado[];
  /**
   * En el resultado la pila se pinta entera de una vez, así que caen todas
   * escalonadas. Durante el recorrido, en cambio, cae solo la última.
   */
  caenTodas?: boolean;
};

/** Cuánto se desplaza una ficha al ceder lugar. Dentro del tope de 20px. */
const DESPLAZAMIENTO = 14;

export default function PilaAgentes({ pila, caenTodas = false }: Props) {
  const nodos = useRef(new Map<string, HTMLLIElement>());
  /** Los ids que había en el render anterior, para saber cuál es nueva. */
  const idsPrevios = useRef<string[]>([]);

  const ids = pila.map((c) => c.agente.id);
  const firma = ids.join("|");

  useEffect(() => {
    const previos = idsPrevios.current;
    const nuevos = ids.filter((id) => !previos.includes(id));

    // Nada que correr: primer render, o no entró ninguna ficha nueva.
    if (nuevos.length === 0 || previos.length === 0) {
      idsPrevios.current = ids;
      return;
    }

    if (prefiereMenosMovimiento()) {
      idsPrevios.current = ids;
      return;
    }

    // Las que ya estaban ceden lugar, escalonadas de arriba hacia abajo.
    let escalon = 0;
    ids.forEach((id) => {
      if (nuevos.includes(id)) return;
      const nodo = nodos.current.get(id);
      if (!nodo) return;

      const rot = `rotate(${rotacionDe(id)}deg)`;
      nodo.animate(
        [
          { transform: `translateY(${-DESPLAZAMIENTO}px) ${rot}` },
          { transform: `translateY(0px) ${rot}` },
        ],
        {
          duration: 320,
          delay: escalon * 40,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "backwards",
        },
      );
      escalon += 1;
    });

    idsPrevios.current = ids;
    // firma cambia solo cuando cambia la composición de la pila.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firma]);

  return (
    <ul className="mt-3 max-w-[46rem]">
      {pila.map((contratado, i) => (
        <FichaAgente
          key={contratado.agente.id}
          agente={contratado.agente}
          orden={contratado.orden}
          // Durante el recorrido cae solo la de arriba, que es la que acaba de
          // contratarse. En el resultado caen todas, escalonadas.
          recienCaida={
            caenTodas ||
            (i === 0 && !idsPrevios.current.includes(contratado.agente.id))
          }
          escalon={caenTodas ? i : 0}
          refNodo={(nodo) => {
            if (nodo) nodos.current.set(contratado.agente.id, nodo);
            else nodos.current.delete(contratado.agente.id);
          }}
        />
      ))}
    </ul>
  );
}
