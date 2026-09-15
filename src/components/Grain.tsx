/**
 * GRANO GLOBAL
 *
 * Una sola capa de ruido sobre todo el sitio, montada una única vez en el
 * layout raíz. Es lo que le da al papel su textura: sin esto, el fondo plano
 * delata la pantalla.
 *
 * El ruido se genera con feTurbulence (fractalNoise) y se desatura con
 * feColorMatrix, así que no hay imagen que cargar ni dependencia que instalar.
 * Va en multiply al 0.3: multiplica parejo el papel y la tinta, de modo que el
 * contraste del texto no baja. El tope duro es 0.35.
 *
 * Decorativo de punta a punta: aria-hidden, sin eventos y sin selección.
 */

export default function Grain() {
  return (
    <div className="grano" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        // El SVG no aporta contenido: solo transporta el filtro.
        role="presentation"
        focusable="false"
      >
        <filter id="grano-filtro">
          {/* stitchTiles evita la costura visible cuando el patrón se repite. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
          />
          {/* Sin color: el sitio tiene una paleta cerrada y el grano no la toca. */}
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grano-filtro)" />
      </svg>
    </div>
  );
}
