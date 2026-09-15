"use client";

/**
 * TITULAR REVELADO POR LÍNEAS
 *
 * Los titulares de sección no aparecen con opacidad: cada renglón sube desde
 * detrás de una máscara de overflow, escalonado de a 70 ms. El bloque de texto
 * tiene que aparecer, no encenderse.
 *
 * Dónde corta cada renglón no se sabe de antemano — depende del ancho, del
 * cuerpo con clamp() y de la fuente ya cargada — así que se mide en el
 * cliente: se pintan las palabras, se agrupan las que comparten posición
 * vertical y recién ahí se arma una máscara por renglón.
 *
 * Antes de medir se muestra el texto completo y quieto. Si el JS no corre o el
 * sistema pide menos movimiento, eso es lo que queda: el titular, legible.
 */

import { useEffect, useRef, useState } from "react";
import { prefiereMenosMovimiento } from "@/lib/movimiento";

type Props = {
  /** El texto del titular. Sin marcado: se parte en palabras. */
  children: string;
  /** Etiqueta del elemento a renderizar. */
  como?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
};

export default function TitularRevelado({
  children,
  como: Etiqueta = "h2",
  className = "",
  id,
}: Props) {
  const contenedor = useRef<HTMLElement>(null);
  /** Las palabras agrupadas por renglón. Vacío hasta que se mide. */
  const [renglones, setRenglones] = useState<string[][]>([]);
  const [revelado, setRevelado] = useState(false);

  // Paso 1: medir dónde corta cada renglón.
  useEffect(() => {
    if (prefiereMenosMovimiento()) {
      setRevelado(true);
      return;
    }

    const nodo = contenedor.current;
    if (!nodo) return;

    const medir = () => {
      const marcas = nodo.querySelectorAll<HTMLElement>("[data-palabra]");
      if (marcas.length === 0) return;

      const agrupadas: string[][] = [];
      let arribaPrevio: number | null = null;

      marcas.forEach((marca) => {
        const arriba = marca.offsetTop;
        // Tolerancia de 4px: dos palabras del mismo renglón pueden diferir
        // por redondeo sin estar en renglones distintos.
        if (arribaPrevio === null || Math.abs(arriba - arribaPrevio) > 4) {
          agrupadas.push([]);
          arribaPrevio = arriba;
        }
        agrupadas[agrupadas.length - 1].push(marca.textContent ?? "");
      });

      setRenglones(agrupadas);
    };

    // Se mide con las fuentes ya cargadas: Instrument Serif corta distinto
    // que la fuente de reserva y los renglones saldrían mal agrupados.
    if (document.fonts?.ready) {
      document.fonts.ready.then(medir);
    } else {
      medir();
    }

    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [children]);

  // Paso 2: revelar cuando el titular entra en viewport.
  useEffect(() => {
    if (renglones.length === 0) return;
    const nodo = contenedor.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setRevelado(true);
          observador.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [renglones.length]);

  const palabras = children.split(" ");

  return (
    <Etiqueta
      id={id}
      ref={contenedor as React.Ref<HTMLHeadingElement>}
      className={`${className} ${revelado ? "titular-revelado" : ""}`}
    >
      {renglones.length === 0 ? (
        // Antes de medir: el texto entero, con marcas para poder medirlo.
        // Es también el estado final para quien no tiene JS o pidió menos
        // movimiento.
        <>
          {palabras.map((palabra, i) => (
            <span key={i} data-palabra>
              {palabra}
              {i < palabras.length - 1 ? " " : ""}
            </span>
          ))}
        </>
      ) : (
        // Ya medido: una máscara por renglón, cada una con su retraso.
        renglones.map((renglon, i) => (
          <span
            key={i}
            className="titular-linea"
            style={{ ["--linea-i" as string]: String(i) }}
          >
            <span>{renglon.join(" ")}</span>
          </span>
        ))
      )}
    </Etiqueta>
  );
}
