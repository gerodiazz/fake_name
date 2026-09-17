/**
 * SECCIÓN — QUIÉNES ESTAMOS DETRÁS
 *
 * Dos personas con nombre y apellido, con exactamente el mismo peso visual.
 * No hay un fundador y un segundo: misma columna, mismo cuerpo, mismo orden
 * de lectura. Esa simetría ES el argumento de la sección.
 *
 * LO QUE NO SE INVENTA. El rol, la foto y el LinkedIn se dibujan solo cuando
 * existen de verdad (ver SOCIOS en src/lib/sitio.ts). Sin foto no hay recuadro
 * vacío ni silueta gris; sin LinkedIn no hay ícono muerto. Un cargo inventado
 * en la sección que promete que vas a hablar con quien escribe el código es
 * exactamente donde más caro sale.
 *
 * LAS FOTOS VAN DE A DOS. O están las dos o no está ninguna: un marco vacío al
 * lado de una foto rompe la simetría que la sección necesita.
 *
 * El sitio no lleva logos de clientes, testimonios ni métricas de terceros, y
 * el espacio que queda libre no se rellena con prueba social.
 */

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
        <div className="relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden bg-superficie hairline hairline-t hairline-b">
          <Image
            src={socio.foto}
            alt={socio.nombre}
            fill
            sizes="20rem"
            className="object-cover"
          />
        </div>
      ) : null}

      <h3
        className={`font-serif text-[23px] leading-tight sm:text-[26px] ${
          HAY_FOTOS ? "mt-5" : ""
        }`}
      >
        {socio.nombre}
      </h3>

      {socio.rol ? (
        <p className="mt-1 text-[14px] leading-relaxed text-tinta-2">
          {socio.rol}
        </p>
      ) : null}

      {socio.linkedin ? (
        <a
          href={socio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver perfil de LinkedIn de ${socio.nombre}`}
          className="enlace-linkedin mt-3 inline-flex h-11 w-11 items-center justify-center text-tinta-2"
        >
          <IconoLinkedIn className="h-[18px] w-[18px]" />
        </a>
      ) : null}
    </article>
  );
}

export default function Socios({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
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

        <p className="mt-6 max-w-[46ch] font-serif text-[21px] leading-snug sm:text-[24px]">
          Somos dos. El desarrollo no se terceriza.
        </p>

        {/* Los dos perfiles. Dos columnas de igual ancho en desktop, apilados
            abajo de sm. El gap es generoso a propósito: son dos personas, no
            dos tarjetas de un catálogo. */}
        <div
          className={`grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 ${
            HAY_FOTOS ? "mt-12" : "mt-10"
          }`}
        >
          {SOCIOS.map((socio) => (
            <Perfil key={socio.nombre} socio={socio} />
          ))}
        </div>

        <p className="hairline hairline-t mt-10 max-w-[52ch] pt-6 text-[15px] leading-relaxed text-tinta-2">
          La reunión de diagnóstico la toma quien después escribe el código.
        </p>
      </div>
    </Seccion>
  );
}
