"use client";

/**
 * MOMENTO FIRMA — el barrido
 *
 * Un panel de tinta sólida sube desde abajo, tapa la pantalla entera, sostiene
 * cien milisegundos y sale por arriba. El cambio de estado ocurre mientras
 * está todo tapado: cuando el panel se va, lo nuevo ya está puesto.
 *
 * Se usa exactamente dos veces:
 *   · al elegir el rubro      → 1100 ms
 *   · al pasar al resultado   → 700 ms
 *
 * Es el único lugar del sitio donde la tinta ocupa toda la pantalla. Si se
 * usara en un tercer lugar dejaría de ser un evento.
 *
 * Bajo prefers-reduced-motion el barrido no existe: el cambio de estado se
 * aplica de inmediato y el panel nunca se monta.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { prefiereMenosMovimiento } from "@/lib/movimiento";

type Barrer = (
  /** Qué hacer con la pantalla tapada. */
  cambiarEstado: () => void,
  /** Duración total del barrido. */
  duracionMs?: number,
) => void;

const Contexto = createContext<Barrer | null>(null);

/** Porcentaje del recorrido en que el panel cubre del todo (ver keyframes). */
const FRACCION_CUBIERTO = 0.45;

export function ProveedorBarrido({ children }: { children: ReactNode }) {
  const [corriendo, setCorriendo] = useState(false);
  const [duracion, setDuracion] = useState(1100);
  const temporizadores = useRef<number[]>([]);

  // Si el componente se va con un barrido a medio camino, no dejamos
  // temporizadores sueltos tocando estado.
  useEffect(
    () => () => {
      temporizadores.current.forEach((id) => window.clearTimeout(id));
      temporizadores.current = [];
    },
    [],
  );

  const barrer = useCallback<Barrer>((cambiarEstado, duracionMs = 1100) => {
    // Sin movimiento: el cambio es directo y no se monta nada.
    if (prefiereMenosMovimiento()) {
      cambiarEstado();
      return;
    }

    setDuracion(duracionMs);
    setCorriendo(true);

    // Con la pantalla tapada, se cambia lo que haya que cambiar.
    temporizadores.current.push(
      window.setTimeout(cambiarEstado, duracionMs * FRACCION_CUBIERTO),
    );
    // Y al terminar, el panel se desmonta.
    temporizadores.current.push(
      window.setTimeout(() => setCorriendo(false), duracionMs),
    );
  }, []);

  return (
    <Contexto.Provider value={barrer}>
      {children}
      {corriendo ? (
        <div
          className="barrido"
          data-corriendo="true"
          style={{ ["--barrido-ms" as string]: `${duracion}ms` }}
          // Es una cortina, no contenido: los lectores de pantalla la ignoran.
          aria-hidden="true"
        />
      ) : null}
    </Contexto.Provider>
  );
}

/** Devuelve la función de barrido. Fuera del proveedor, cambia sin cortina. */
export function useBarrido(): Barrer {
  const barrer = useContext(Contexto);
  // Nunca dejamos que la falta de proveedor rompa una interacción.
  return barrer ?? ((cambiarEstado) => cambiarEstado());
}
