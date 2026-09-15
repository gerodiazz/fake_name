/**
 * CAPA GRÁFICA — piezas decorativas del sistema visual
 *
 * Todas las piezas de este archivo son ornamento: van con aria-hidden, sin
 * eventos de puntero y sin selección de texto. Ninguna transporta información
 * que no esté escrita en la página.
 *
 * Reglas que se respetan aquí:
 *   · Paleta cerrada: papel, superficie, tinta, tinta-2, línea y acento.
 *   · Contraste AA: cuando una pieza puede caer debajo de un texto, se recorta
 *     o se apaga en los anchos donde no hay margen libre (ver `.forma-*`, que
 *     solo existen de 1024px para arriba).
 *   · Nada se anima salvo el trazado del diagrama de la sección 03, que además
 *     se apaga entero bajo prefers-reduced-motion.
 *
 * Los estilos viven en globals.css, junto al resto del sistema.
 */

import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Marca de agua: el número de expediente, recortado por el borde
   -------------------------------------------------------------------------- */

/**
 * El número de la sección en la serif del sitio, sin relleno y con un contorno
 * de 1px en color línea. Se ancla arriba a la derecha y sale por el borde
 * superior: la sección lo recorta con overflow.
 */
export function MarcaAgua({ numero }: { numero: string }) {
  return (
    <span className="marca-agua" aria-hidden="true">
      {numero}
    </span>
  );
}

/* --------------------------------------------------------------------------
   Marcas de imprenta
   -------------------------------------------------------------------------- */

/** Escuadras de registro en las dos esquinas superiores de la sección. */
export function MarcasRegistro() {
  return (
    <span aria-hidden="true">
      <span className="marca-registro marca-registro-izq" />
      <span className="marca-registro marca-registro-der" />
    </span>
  );
}

/** Texto al margen izquierdo, girado, como el canto de un pliego impreso. */
export function TextoVertical({ children }: { children: string }) {
  return (
    <span className="texto-vertical" aria-hidden="true">
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------------
   Formas geométricas recortadas
   -------------------------------------------------------------------------- */

/**
 * Cuarto de círculo o rectángulo en el tinte del acento que entra por un borde de la
 * sección y sale del viewport. Nunca completa, nunca centrada.
 *
 * `variante` elige la geometría y la posición, definidas en globals.css. Solo
 * se usan en tres secciones del sitio, una por sección, y solo aparecen de
 * 1024px para arriba: en anchos menores no hay margen libre y la forma caería
 * debajo del texto.
 */
export function Forma({
  variante,
}: {
  variante: "hero" | "socios" | "faq";
}) {
  return <span className={`forma forma-${variante}`} aria-hidden="true" />;
}

/* --------------------------------------------------------------------------
   Banda a sangre completa
   -------------------------------------------------------------------------- */

/**
 * Banda de tinta sólida de ancho de viewport, sin márgenes ni radio. Existen
 * exactamente dos en el sitio: el resultado del diagnóstico (02) y el total de
 * la calculadora de referidos (04). Son los dos momentos en que el recorrido
 * aprieta; el resto del sitio respira.
 *
 * El contenido vuelve al ancho de lectura adentro de la banda, para que el
 * número siga alineado con la columna de texto de la página.
 *
 * Encima va el tramado de puntos en papel, con máscara lateral: se desvanece
 * hacia la izquierda y deja limpia la zona donde caen el número y su apoyo.
 */
export function Banda({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`banda ${className}`}>
      <span className="banda-tramado" aria-hidden="true" />
      <div className="banda-contenido">{children}</div>
    </div>
  );
}
