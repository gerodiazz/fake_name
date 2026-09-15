/**
 * SECCIÓN 05 — QUIÉNES ESTAMOS DETRÁS
 *
 * Sube en el recorrido: antes venía después del programa de referidos, casi al
 * final. Ahora va inmediatamente después de los ejemplos, que es donde el
 * visitante ya entendió qué hacemos y empieza a preguntarse quiénes somos.
 *
 * SIN PLACEHOLDERS VISIBLES — antes esta sección mostraba dos fichas que
 * decían "PLACEHOLDER · Nombre del primer socio" y un recuadro con la leyenda
 * "Foto pendiente". Eso se veía en producción y era peor que no mostrar nada.
 *
 * Mientras SOCIOS esté vacío (ver src/lib/sitio.ts), la sección muestra solo
 * lo que sí es cierto: que son dos, que el desarrollo no se terceriza y que
 * quien atiende la reunión es quien escribe el código. Al cargar los datos
 * reales aparecen las fichas, sin tocar este archivo.
 *
 * El sitio no lleva logos de clientes, testimonios ni métricas de terceros, y
 * el espacio que queda libre no se rellena con prueba social.
 */

import Image from "next/image";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { SOCIOS } from "@/lib/sitio";

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
      <div className="pb-28 pt-2 sm:pb-40">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Quiénes estamos detrás
        </TitularRevelado>

        <p className="mt-6 max-w-[46ch] font-serif text-[21px] leading-snug sm:text-[24px]">
          Somos dos. El desarrollo no se terceriza.
        </p>
        <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          La reunión de diagnóstico la toma la persona que después escribe el
          código. No hay un vendedor adelante y un equipo desconocido atrás, y
          no hay un tercero al que se le pasa el trabajo.
        </p>

        {SOCIOS.length > 0 ? (
          <div className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-12">
            {SOCIOS.map((socio) => (
              <article key={socio.nombre}>
                {/* La foto. Sin marco ni sombra: solo un hairline de
                    contención. */}
                <div className="relative aspect-[4/5] w-full max-w-[19rem] overflow-hidden bg-superficie hairline hairline-t hairline-b">
                  {socio.foto ? (
                    <Image
                      src={socio.foto}
                      alt={socio.alt}
                      fill
                      // Media columna en desktop, el ancho útil en mobile.
                      sizes="(min-width: 640px) 19rem, 100vw"
                      className="object-cover"
                    />
                  ) : null}
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
        ) : null}
      </div>
    </Seccion>
  );
}
