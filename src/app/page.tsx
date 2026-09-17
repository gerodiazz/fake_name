/**
 * HOME
 *
 * El recorrido sigue el orden en que un visitante decide: entender qué
 * hacemos, ver que ya lo hicimos, saber quién lo construye, entender el modelo
 * y recién ahí contar su proceso.
 *
 * LA REDUCCIÓN. La página tenía once secciones y dos pantallas y media solo de
 * explicación conceptual: qué es un agente, en qué se diferencia de un
 * chatbot, un ejemplo inventado con su conversación y su recorrido de seis
 * etapas, tres ejemplos por industria y una sección entera sobre qué pasa si
 * el software se equivoca. Todo eso le enseñaba vocabulario técnico a alguien
 * que vino a resolver un problema de su empresa.
 *
 * Quedaron ocho. El criterio para sacar fue uno solo: si una sección no ayuda
 * a entender qué hacemos, a demostrar que sabemos hacerlo, a generar confianza
 * o a llegar al diagnóstico, se fue. Los casos reales hicieron la mayor parte
 * del trabajo: con tres clientes con nombre, los ejemplos conceptuales pasaron
 * a ser la versión débil de lo mismo.
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
import ComoFunciona from "@/components/secciones/ComoFunciona";
import Casos from "@/components/secciones/Casos";
import Socios from "@/components/secciones/Socios";
import ComoTrabajamos from "@/components/secciones/ComoTrabajamos";
import Condiciones from "@/components/secciones/Condiciones";
import Faq from "@/components/secciones/Faq";
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

        {/* 02 · El mecanismo: de seis saltos a uno. Diez segundos de lectura */}
        <ComoFunciona
          numero={numeroDe("como-funciona")}
          kicker={kickerDe("como-funciona")}
        />

        {/* 03 · La prueba: tres clientes con nombre */}
        <Casos numero={numeroDe("casos")} kicker={kickerDe("casos")} />

        {/* 04 · Quién lo construye */}
        <Socios numero={numeroDe("socios")} kicker={kickerDe("socios")} />

        {/* 05 · Cómo se trabaja: cuatro etapas con sus plazos */}
        <ComoTrabajamos
          numero={numeroDe("como-trabajamos")}
          kicker={kickerDe("como-trabajamos")}
        />

        {/* 06 · Qué queda en manos de la empresa */}
        <Condiciones
          numero={numeroDe("condiciones")}
          kicker={kickerDe("condiciones")}
        />

        {/* 07 · Las cuatro objeciones que quedan */}
        <Faq numero={numeroDe("faq")} kicker={kickerDe("faq")} />

        {/* 08 · El diagnóstico y la salida, en una sola sección. Contacto ya no
            es sección propia: es el cierre de esta, y conserva su ancla. */}
        <Seccion
          id="diagnostico"
          numero={numeroDe("diagnostico")}
          kicker={kickerDe("diagnostico")}
        >
          <div className="pb-20 pt-2 sm:pb-24">
            <TitularRevelado
              como="h2"
              className="titular mt-5 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
            >
              Diagnóstico de procesos automatizables
            </TitularRevelado>
            <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
              Seis preguntas sobre cómo se trabaja hoy. Al terminar queda la
              lista de procesos que se pueden pasar a software, con valores de
              referencia. No se piden datos de contacto para verlo.
            </p>

            <div className="mt-10">
              <Diagnostico />
            </div>

            <Contacto />
          </div>
        </Seccion>
      </main>

      <PieDePagina />
    </>
  );
}
