/**
 * BOTÓN — el único botón del sitio
 *
 * Antes cada llamada a la acción era una cadena de doce clases de Tailwind
 * copiada a mano: ocho archivos, y tres de esas cadenas ya habían divergido
 * entre sí. Acá vive una sola vez.
 *
 * Renderiza <a> o <button> según reciba `href` o no, porque son cosas
 * distintas: un enlace navega y un botón hace algo. La diferencia importa para
 * el teclado y para el lector de pantalla, no es un detalle de implementación.
 *
 * Los estilos están en globals.css, en el bloque SISTEMA DE COMPONENTES, junto
 * al resto de los componentes y sus estados.
 *
 * JERARQUÍA — un botón principal por pantalla. Cuando hay dos acciones juntas,
 * la segunda es `lineal`, que es la misma acción con menos peso visual. El
 * `texto` es para salidas menores: rehacer, volver, cambiar de rubro.
 */

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tono = "principal" | "lineal" | "texto";

type Comunes = {
  children: ReactNode;
  tono?: Tono;
  /** Alto reducido, para barras y lugares apretados. */
  chico?: boolean;
  className?: string;
};

type ComoEnlace = Comunes & {
  href: string;
  /** Se abre en una pestaña nueva. Agrega el rel seguro. */
  externo?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

type ComoBoton = Comunes & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

type Props = ComoEnlace | ComoBoton;

function clases(tono: Tono, chico: boolean, extra: string): string {
  return ["boton", `boton-${tono}`, chico ? "boton-chico" : "", extra]
    .filter(Boolean)
    .join(" ");
}

export default function Boton(props: Props) {
  const { children, tono = "principal", chico = false, className = "" } = props;
  const clase = clases(tono, chico, className);

  if (props.href !== undefined) {
    const { href, externo, tono: _t, chico: _c, className: _cn, ...resto } = props;

    // Los enlaces internos que no son anclas usan next/link: son navegaciones
    // entre rutas y aprovechan el prefetch. Las anclas de la misma página, no.
    const esRuta = href.startsWith("/") && !href.startsWith("/#");

    if (esRuta && !externo) {
      return (
        <Link href={href} className={clase} {...resto}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={clase}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...resto}
      >
        {children}
      </a>
    );
  }

  const { tono: _t, chico: _c, className: _cn, ...resto } = props;
  return (
    <button className={clase} {...resto}>
      {children}
    </button>
  );
}
