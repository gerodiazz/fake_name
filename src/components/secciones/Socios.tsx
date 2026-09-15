/**
 * SECCIÓN 05 — QUIÉNES ESTAMOS DETRÁS
 *
 * Formato editorial: nombre, foto y una línea de trayectoria de cada socio. Sin
 * tarjetas, sin bordes alrededor, sin cargos inventados.
 *
 * El sitio no lleva logos de clientes, testimonios ni métricas de resultados de
 * terceros, y el espacio que queda libre no se rellena con prueba social: si la
 * sección queda corta, queda corta.
 *
 * Los datos de los dos socios viven en src/lib/sitio.ts, porque los datos
 * estructurados del layout los declaran como founders. Siguen siendo
 * PLACEHOLDER: hay que completarlos antes de publicar.
 */

import Image from "next/image";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { SOCIOS } from "@/lib/sitio";

export default function Socios() {
  return (
    <Seccion
      id="socios"
      numero="05"
      kicker="Quiénes estamos detrás"
      aire
      forma="socios"
      textoVertical="quiénes estamos detrás"
    >
      <div className="pb-28 pt-2 sm:pb-40">
        <TitularRevelado como="h2" className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]">
          Quiénes estamos detrás
        </TitularRevelado>
        <p className="mt-6 max-w-[48ch] text-[15px] text-tinta-2 sm:text-[16px]">
          Somos dos. El desarrollo no se terceriza.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-12">
          {SOCIOS.map((socio) => (
            <article key={socio.nombre}>
              {/* La foto. Sin marco ni sombra: solo un hairline de contención
                  mientras es un placeholder. */}
              <div className="relative aspect-[4/5] w-full max-w-[19rem] overflow-hidden bg-superficie hairline hairline-t hairline-b">
                {socio.foto ? (
                  <Image
                    src={socio.foto}
                    alt={socio.alt}
                    fill
                    // Ocupa media columna en desktop y el ancho útil en mobile.
                    sizes="(min-width: 640px) 19rem, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="kicker kicker-tinta">Foto pendiente</span>
                  </div>
                )}
              </div>

              <h3 className="mt-5 font-serif text-[23px] leading-tight sm:text-[26px]">
                {socio.nombre}
              </h3>
              <p className="mt-2 max-w-[42ch] text-[14px] leading-relaxed text-tinta-2">
                {socio.trayectoria}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
