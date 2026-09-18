/**
 * SECCIÓN — QUIÉNES ESTAMOS DETRÁS (y el cierre del sitio)
 *
 * Dos personas con nombre y apellido, con exactamente el mismo peso visual.
 * No hay un fundador y un segundo: misma columna, mismo cuerpo, mismo orden
 * de lectura. Esa simetría ES el argumento de la sección.
 *
 * UNA SOLA FRASE. La sección tenía además una bajada, un renglón de cierre
 * entre hairlines y el rol de cada uno debajo del nombre. Quedó la frase que
 * importa —el desarrollo no se terceriza— y el resto se fue: quien quiera
 * saber a qué se dedica cada uno tiene el LinkedIn ahí mismo.
 *
 * LO QUE NO SE INVENTA. La foto y el LinkedIn se dibujan solo cuando existen
 * de verdad (ver SOCIOS en src/lib/sitio.ts). Sin foto no hay recuadro vacío
 * ni silueta gris; sin LinkedIn no hay ícono muerto. Las fotos van de a dos: o
 * están las dos o no está ninguna, porque un marco vacío al lado de una foto
 * rompe la simetría que la sección necesita.
 *
 * EL CIERRE VIVE ACÁ. `children` es el CTA final, que entra debajo de los dos
 * perfiles y dentro de esta misma sección: son las dos últimas preguntas del
 * visitante —quién está detrás y cómo los contacto— y separarlas en dos
 * secciones significaba dos cabeceras y dos números para una sola intención.
 *
 * El sitio no lleva logos de clientes, testimonios ni métricas de terceros, y
 * el espacio que queda libre no se rellena con prueba social.
 */

import type { ReactNode } from "react";
import Image from "next/image";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import IconoLinkedIn from "@/components/ui/IconoLinkedIn";
import { SOCIOS, type Socio } from "@/lib/sitio";

/** Las fotos se muestran solo si están las dos. */
const HAY_FOTOS = SOCIOS.length > 0 && SOCIOS.every((socio) => socio.foto);

function Perfil({ socio }: { socio: Socio }) {
  return (
    <article>
      {HAY_FOTOS && socio.foto ? (
        // Sin marco, sin sombra y sin recorte circular: un rectángulo
        // editorial con una hairline de contención, como el resto del sitio.
        <div className="relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden bg-superficie hairline hairline-t hairline-b">
          <Image
            src={socio.foto}
            alt={socio.nombre}
            fill
            sizes="18rem"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-3">
        <h3 className="font-serif text-[21px] leading-tight sm:text-[23px]">
          {socio.nombre}
        </h3>

        {socio.linkedin ? (
          <a
            href={socio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver perfil de LinkedIn de ${socio.nombre}`}
            className="enlace-linkedin -my-3 inline-flex h-11 w-11 items-center justify-center text-tinta-2"
          >
            <IconoLinkedIn className="h-[18px] w-[18px]" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function Socios({
  numero,
  kicker,
  children,
}: {
  numero: string;
  kicker: string;
  /** El CTA final, que cierra esta misma sección. */
  children?: ReactNode;
}) {
  return (
    <Seccion
      id="socios"
      numero={numero}
      kicker={kicker}
      aire
      forma="socios"
      textoVertical="quiénes estamos detrás"
    >
      <div className="pb-20 pt-2 sm:pb-24">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Quiénes estamos detrás
        </TitularRevelado>

        <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Somos dos. Diseñamos y desarrollamos personalmente cada solución.
        </p>

        {/* Los dos perfiles. Dos columnas de igual ancho en desktop, apilados
            abajo de sm. */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
          {SOCIOS.map((socio) => (
            <Perfil key={socio.nombre} socio={socio} />
          ))}
        </div>

        {children}
      </div>
    </Seccion>
  );
}
