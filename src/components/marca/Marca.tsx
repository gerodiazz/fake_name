/**
 * SISTEMA DE MARCA — TELESCA JUSTEL
 *
 * Tres piezas y una sola idea detrás:
 *
 *   · MONOGRAMA (TJ) — dos astas que cuelgan de una barra compartida. La T y
 *     la J no están escritas con una tipografía: están construidas con la
 *     misma geometría que el resto del sitio —líneas rectas, una curva, nada
 *     más— y por eso el monograma se lee como parte del sistema y no como un
 *     logo pegado encima.
 *
 *     La barra superior es de las dos letras a la vez. Esa es la idea: dos
 *     apellidos, un solo trabajo. El gancho de la J se mete debajo del asta
 *     de la T sin tocarla; ese hueco de un pixel y medio es lo que hace que
 *     el monograma se vea armado y no apilado.
 *
 *   · WORDMARK (TELESCA JUSTEL) — versales, tracking ancho, peso normal. No
 *     lleva serif: en versales chicas la sans con aire se lee como el nombre
 *     de un estudio, y la serif como el título de un libro.
 *
 *   · FIRMA — monograma y wordmark juntos, separados por una hairline. Es la
 *     versión de la barra superior y del pie.
 *
 * Todo se dibuja con currentColor: la marca hereda el color del contexto y
 * nunca trae un color propio. Un logo que impone su color es un logo que no
 * entra en el sistema.
 */

import Link from "next/link";

/**
 * El monograma. Sin tamaño propio: lo fija quien lo usa con la clase, así la
 * misma pieza sirve a 18px en la barra y a 200px en una portada.
 *
 * `trazo` existe porque a tamaños chicos el trazo tiene que engordar en
 * proporción para no desaparecer: a 18px, 2.4 se ve fino; a 120px, se ve
 * pesado. Los dos valores están medidos, no estimados.
 */
export function Monograma({
  className = "",
  trazo = 2.4,
  titulo,
}: {
  className?: string;
  trazo?: number;
  /** Texto accesible. Sin él, la pieza es decorativa. */
  titulo?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={trazo}
        strokeLinecap="square"
      >
        {/* La barra, de las dos letras a la vez. */}
        <path d="M6 8.4H26" />
        {/* El asta de la T. */}
        <path d="M12.5 8.4V24.4" />
        {/* El asta de la J y su gancho, que cierra hacia la T. */}
        <path d="M20.5 8.4v11a4.6 4.6 0 0 1-4.6 4.6" />
      </g>
    </svg>
  );
}

/**
 * El nombre completo, en versales. Es texto, no una imagen: se puede
 * seleccionar, buscar y traducir, y un lector de pantalla lo dice bien.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-sans uppercase leading-none tracking-[0.2em] ${className}`}
    >
      Telesca Justel
    </span>
  );
}

/**
 * La firma completa: monograma, hairline y nombre.
 *
 * UNA SOLA INSTANCIA, NO DOS. La primera versión renderizaba dos firmas —una
 * `hidden sm:inline-flex` y otra `sm:hidden`— y en mobile se veían las dos: el
 * `inline-flex` de la firma y el `hidden` de la utilidad son los dos reglas de
 * display en la misma capa, así que gana la que Tailwind escriba última y no
 * la que uno ponga después en el atributo. La barra se iba 20px de la
 * pantalla. Acá el que aparece y desaparece es el NOMBRE, no la firma, y eso
 * además evita tener el mismo enlace dos veces para un lector de pantalla.
 *
 * `compacta` fuerza el monograma solo, para los lugares que nunca quieren el
 * nombre completo.
 */
export default function Marca({
  href = "/",
  compacta = false,
  className = "",
}: {
  href?: string;
  compacta?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 text-tinta ${className}`}
      aria-label="Telesca Justel · inicio"
    >
      <Monograma className="h-[22px] w-[22px] shrink-0" trazo={2.6} />

      {compacta ? null : (
        <>
          {/* La hairline separa las dos piezas como las separa el sistema:
              con media línea y nada más. El nombre completo entra recién en
              sm: abajo de eso el ancho lo necesita el resto de la barra. */}
          <span
            aria-hidden="true"
            className="hidden h-[18px] w-px shrink-0 bg-linea lg:block"
          />
          <Wordmark className="hidden text-[11px] lg:inline" />
        </>
      )}
    </Link>
  );
}
