"use client";

/**
 * BARRA SUPERIOR — el índice del expediente
 *
 * No es un menú de sitio: es el índice de un documento numerado. Cada sección
 * aparece con su número y la que se está leyendo es la única en Klein. Eso reemplaza cualquier subrayado, pastilla o caja: el color hace de
 * indicador y el resto sigue siendo tinta sobre papel.
 *
 * La marca a la izquierda hace de 01: vuelve al hero.
 *
 * Abajo de md el índice se despliega en filas de expediente, con el mismo
 * signo que gira de + a × del acordeón de la FAQ. El panel no lleva animación
 * propia: el sistema de movimiento ya tiene sus cuatro momentos y un menú
 * abriéndose no es uno de ellos.
 *
 * Sin JavaScript los enlaces funcionan igual (son anclas), solo no se marca la
 * sección activa. El panel de mobile sí necesita JS, y por eso el índice
 * completo también queda disponible en cada cabecera de sección.
 */

import { useEffect, useRef, useState } from "react";
import Boton from "@/components/ui/Boton";
import { SECCIONES, SECCIONES_DEL_INDICE } from "@/lib/secciones";
import { SITIO } from "@/lib/sitio";

/**
 * Las secciones del índice salen de src/lib/secciones.ts, que es el mismo
 * lugar del que las lee la home. Antes estaban escritas dos veces —acá y en
 * page.tsx— con sus números a mano: reordenar la página significaba editar los
 * dos archivos y confiar en no equivocarse.
 *
 * El índice de desktop muestra solo las secciones marcadas `enIndice`: a 11px
 * y en mayúsculas, once nombres no entran en un renglón. El panel de mobile
 * las muestra todas, porque ahí hay lugar de sobra.
 *
 * EL BOTÓN DE AGENDAR vive siempre a la derecha, en desktop y en mobile. Es la
 * única acción del sitio que tiene que estar disponible en cualquier punto del
 * scroll: alguien puede decidir a la mitad de la sección de condiciones, y no
 * corresponde hacerlo bajar 8000px hasta el formulario para encontrar cómo.
 */
const DE_DESKTOP = SECCIONES_DEL_INDICE;
const DE_MOBILE = SECCIONES.filter((seccion) => seccion.id !== "contenido");

/** Alto de la barra si todavía no se pudo medir el nodo. */
const ALTO_BARRA_FALLBACK = 56;

export default function BarraSuperior() {
  /** Id de la sección que se está leyendo. Vacío mientras se ve el hero. */
  const [activa, setActiva] = useState("");
  const [abierto, setAbierto] = useState(false);
  const barra = useRef<HTMLElement>(null);

  /**
   * Gana la última sección cuyo borde superior ya pasó por debajo de la barra.
   * Se mide contra la barra y no contra el centro de la pantalla porque el
   * diagnóstico es larguísimo y el centro lo marcaría activo demasiado tarde.
   */
  useEffect(() => {
    let pendiente = false;

    const calcular = () => {
      pendiente = false;
      const limite = (barra.current?.offsetHeight ?? ALTO_BARRA_FALLBACK) + 8;

      let actual = "";
      for (const seccion of DE_MOBILE) {
        const nodo = document.getElementById(seccion.id);
        if (nodo && nodo.getBoundingClientRect().top <= limite) {
          actual = seccion.id;
        }
      }

      // Al final de la página gana la última: contacto queda parcialmente
      // tapada por el footer y por la barra inferior del diagnóstico, y puede
      // no llegar a cruzar la línea de lectura.
      const fondo =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      if (fondo) actual = DE_MOBILE[DE_MOBILE.length - 1].id;

      setActiva(actual);
    };

    const alMoverse = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(calcular);
    };

    calcular();
    window.addEventListener("scroll", alMoverse, { passive: true });
    window.addEventListener("resize", alMoverse);
    return () => {
      window.removeEventListener("scroll", alMoverse);
      window.removeEventListener("resize", alMoverse);
    };
  }, []);

  // Escape cierra el índice, como cualquier capa que tape contenido.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  return (
    <nav
      ref={barra}
      aria-label="Secciones"
      // z-40: por encima del contenido, por debajo del barrido Klein (z-90),
      // que tiene que poder tapar la pantalla entera.
      className="barra-superior sticky top-0 z-40 hairline hairline-b"
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center gap-4 px-5 sm:gap-6 sm:px-8">
        {/* La marca es el 01: vuelve al hero. */}
        <a
          href="#contenido"
          onClick={() => setAbierto(false)}
          className="flex h-12 shrink-0 items-center font-serif text-[19px] leading-none sm:h-14"
        >
          {SITIO.nombre}
        </a>

        {/* Índice, de md para arriba. Los números aparecen recién en lg:
            antes de eso el renglón queda justo. */}
        <ul className="ml-auto hidden items-center gap-6 md:flex lg:gap-7">
          {DE_DESKTOP.map((seccion) => {
            const esActiva = activa === seccion.id;
            return (
              <li key={seccion.id}>
                <a
                  href={`#${seccion.id}`}
                  data-activa={esActiva}
                  aria-current={esActiva ? "true" : undefined}
                  className="nav-enlace flex h-12 items-center gap-1.5 sm:h-14"
                >
                  {seccion.corto}
                </a>
              </li>
            );
          })}
        </ul>

        {/* La acción, siempre a la vista. En mobile con la etiqueta corta:
            "Agendar diagnóstico" no entra al lado del botón de índice. */}
        <Boton href="#contacto" chico className="hidden shrink-0 md:inline-flex">
          Agendar diagnóstico
        </Boton>
        <Boton
          href="#contacto"
          chico
          className="ml-auto shrink-0 md:hidden"
          onClick={() => setAbierto(false)}
        >
          Agendar
        </Boton>

        {/* Abajo de md el índice se despliega. */}
        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          data-abierto={abierto}
          aria-expanded={abierto}
          aria-controls="indice-secciones"
          className="nav-enlace nav-boton flex h-12 items-center gap-2 md:hidden"
        >
          Índice
          {/* El mismo signo que en la FAQ: + que gira a ×. */}
          <span
            aria-hidden="true"
            className="nav-signo text-[17px] leading-none transition-transform duration-200"
          >
            +
          </span>
        </button>
      </div>

      {/* Panel de mobile: filas de expediente, número y nombre, hairlines y
          nada más. Tapa el contenido en vez de empujarlo. */}
      <div
        id="indice-secciones"
        hidden={!abierto}
        className="absolute inset-x-0 top-full hairline hairline-b bg-papel md:hidden"
      >
        <ul className="mx-auto w-full max-w-[1120px] px-5">
          {DE_MOBILE.map((seccion, i) => {
            const esActiva = activa === seccion.id;
            return (
              <li key={seccion.id} className={i > 0 ? "hairline hairline-t" : ""}>
                <a
                  href={`#${seccion.id}`}
                  onClick={() => setAbierto(false)}
                  data-activa={esActiva}
                  aria-current={esActiva ? "true" : undefined}
                  className="nav-fila flex min-h-[56px] items-baseline gap-4 py-4"
                >
                  <span
                    aria-hidden="true"
                    className="nav-numero text-[11px] tracking-[0.14em]"
                  >
                    {seccion.numero}
                  </span>
                  <span className="font-serif text-[19px] leading-snug">
                    {seccion.corto}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
