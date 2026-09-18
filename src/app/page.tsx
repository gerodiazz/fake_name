/**
 * HOME
 *
 * Cuatro preguntas y una sección para cada una: qué hacen, me sirve a mí, ya
 * lo hicieron, cómo empiezo. Si esas cuatro están contestadas, no hace falta
 * explicar nada más.
 *
 * LA REDUCCIÓN, SEGUNDA PASADA. La página tenía ocho secciones y el
 * diagnóstico —la única herramienta de conversión del sitio— estaba último,
 * detrás de siete pantallas de explicación: el mecanismo dibujado, tres
 * clientes, los dos socios, cuatro etapas de trabajo con sus plazos, cuatro
 * condiciones comerciales y cuatro preguntas frecuentes. Para probar el
 * producto había que atravesar una clase entera sobre automatización.
 *
 * Quedaron cinco, y el diagnóstico subió a la 02. Se fueron "cómo funciona",
 * "cómo trabajamos", "condiciones" y las preguntas frecuentes: lo que valía de
 * las cuatro entra en la sección "qué hacemos" y en el renglón que cierra el
 * CTA final. El criterio fue el mismo de siempre, aplicado más fuerte: si una
 * sección no ayuda a entender qué hacemos, a demostrar que sabemos hacerlo, a
 * generar confianza o a llegar al diagnóstico, se fue. Y si un caso real lo
 * demuestra mejor que un párrafo, gana el caso.
 *
 * EL ORDEN Y LA NUMERACIÓN NO ESTÁN ACÁ. Viven en src/lib/secciones.ts, que
 * es también de donde los lee la barra superior. Cada sección recibe su número
 * por prop: mover una sección es mover una línea de aquel arreglo, y la
 * numeración del expediente se recalcula sola.
 *
 * El programa de referidos tiene su propia ruta, /referidos: son dos funnels
 * distintos y mezclarlos hacía que la home tuviera que vender dos cosas.
 *
 * Un solo H1, el del hero. Cada sección abre con un H2 que lleva el término
 * por el que se busca ese contenido.
 */

import BarraSuperior from "@/components/BarraSuperior";
import Hero from "@/components/Hero";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import Diagnostico from "@/components/diagnostico/Diagnostico";
import Casos from "@/components/secciones/Casos";
import QueHacemos from "@/components/secciones/QueHacemos";
import Socios from "@/components/secciones/Socios";
import Contacto from "@/components/secciones/Contacto";
import PieDePagina from "@/components/PieDePagina";
import { kickerDe, numeroDe } from "@/lib/secciones";

export default function Home() {
  return (
    <>
      {/* Índice del expediente. Vive acá y no en el layout porque sus enlaces
          son anclas de esta página: /d, /casos y /referidos tienen su propio
          recorrido. */}
      <BarraSuperior />

      <main>
        {/* 01 · Qué hacemos, en un titular */}
        <Hero numero={numeroDe("contenido")} />

        {/* 02 · Probalo ahora. Es lo primero después del hero a propósito: el
            diagnóstico es la herramienta de conversión del sitio, no un
            contenido de cierre. La introducción es mínima porque la
            herramienta se explica sola al usarla. */}
        <Seccion
          id="diagnostico"
          numero={numeroDe("diagnostico")}
          kicker={kickerDe("diagnostico")}
        >
          <div className="pb-20 pt-2 sm:pb-24">
            <TitularRevelado
              como="h2"
              className="titular mt-5 max-w-[22ch] text-[clamp(1.75rem,7.5vw,3rem)]"
            >
              ¿Qué parte de tu empresa todavía depende demasiado de una persona?
            </TitularRevelado>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
              Seis preguntas. Al terminar queda la lista de procesos que se
              pueden pasar a software, sin dejar datos de contacto.
            </p>

            <div className="mt-10">
              <Diagnostico />
            </div>
          </div>
        </Seccion>

        {/* 03 · La prueba: tres clientes con nombre */}
        <Casos numero={numeroDe("casos")} kicker={kickerDe("casos")} />

        {/* 04 · Qué clase de software construimos */}
        <QueHacemos
          numero={numeroDe("que-hacemos")}
          kicker={kickerDe("que-hacemos")}
        />

        {/* 05 · Quién lo construye y la salida. Contacto no es sección propia:
            es el cierre de esta, y conserva su ancla #contacto. */}
        <Socios numero={numeroDe("socios")} kicker={kickerDe("socios")}>
          <Contacto />
        </Socios>
      </main>

      <PieDePagina />
    </>
  );
}
