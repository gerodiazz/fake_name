/**
 * HOME
 *
 * El recorrido sigue el orden en que un visitante decide: entender qué es
 * esto, verlo funcionando, reconocer su propio problema, saber quién lo va a
 * construir, entender el modelo, bajar el riesgo y recién ahí escribir.
 *
 * EL ORDEN Y LA NUMERACIÓN NO ESTÁN ACÁ. Viven en src/lib/secciones.ts, que
 * es también de donde los lee la barra superior. Cada sección recibe su número
 * por prop: mover una sección es mover una línea de aquel arreglo, y la
 * numeración del expediente se recalcula sola.
 *
 * El programa de referidos ya no está en esta página: tiene su propia ruta,
 * /referidos. Son dos funnels distintos —uno le vende a la empresa que tiene
 * el proceso, el otro a quien puede presentarla— y mezclarlos hacía que la
 * home tuviera que vender dos cosas a la vez.
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
import Ejemplos from "@/components/secciones/Ejemplos";
import Socios from "@/components/secciones/Socios";
import ComoTrabajamos from "@/components/secciones/ComoTrabajamos";
import Condiciones from "@/components/secciones/Condiciones";
import Control from "@/components/secciones/Control";
import Casos from "@/components/secciones/Casos";
import Faq from "@/components/secciones/Faq";
import Contacto from "@/components/secciones/Contacto";
import PieDePagina from "@/components/PieDePagina";
import { PREGUNTAS_UNIVERSALES, RUBROS } from "@/lib/diagnostico";
import { kickerDe, numeroDe } from "@/lib/secciones";

/**
 * Las preguntas del diagnóstico, escritas en el HTML inicial.
 *
 * El recorrido es interactivo: hasta que no se elige un rubro, las preguntas
 * de ese rubro no existen en el DOM, así que un buscador no las ve. Esta lista
 * las deja escritas desde el servidor. No está oculta para engañar a nadie: es
 * el mismo texto que se recorre arriba, disponible también para quien navega
 * con lector de pantalla.
 */
function PreguntasDelDiagnostico() {
  return (
    <section className="sr-only" aria-labelledby="preguntas-indice">
      <h3 id="preguntas-indice">Preguntas del diagnóstico, por rubro</h3>
      {RUBROS.filter((rubro) => rubro.preguntas.length > 0).map((rubro) => (
        <div key={rubro.id}>
          <h4>{rubro.nombre}</h4>
          <ul>
            {rubro.preguntas.map((pregunta) => (
              <li key={pregunta.id}>
                {pregunta.texto} {pregunta.agente.nombre}:{" "}
                {pregunta.agente.descripcion}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h4>Preguntas comunes a cualquier rubro</h4>
        <ul>
          {PREGUNTAS_UNIVERSALES.map((pregunta) => (
            <li key={pregunta.id}>
              {pregunta.texto} {pregunta.agente.nombre}:{" "}
              {pregunta.agente.descripcion}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Índice del expediente. Vive acá y no en el layout porque sus enlaces
          son anclas de esta página: /d y /referidos tienen su propio
          recorrido. */}
      <BarraSuperior />

      <main>
        {/* 01 · Entender */}
        <Hero numero={numeroDe("contenido")} />

        {/* 02 · Entender qué es un agente y verlo funcionando */}
        <ComoFunciona
          numero={numeroDe("como-funciona")}
          kicker={kickerDe("como-funciona")}
        />

        {/* 03 · Reconocer el problema propio, con números propios */}
        <Seccion
          id="diagnostico"
          numero={numeroDe("diagnostico")}
          kicker={kickerDe("diagnostico")}
        >
          <div className="pb-16 pt-2 sm:pb-24">
            <TitularRevelado
              como="h2"
              className="titular mt-5 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
            >
              Diagnóstico de procesos automatizables
            </TitularRevelado>
            <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
              Seis preguntas sobre cómo se trabaja hoy. Al terminar queda la
              lista de los procesos que se pueden pasar a software, con valores
              de referencia de cuánto tiempo suele llevar cada uno y en cuántas
              semanas se implementarían. Es un punto de partida, no un análisis
              de tu empresa: eso sale de la reunión. No se piden datos de
              contacto para verlo.
            </p>

            <div className="mt-10">
              <Diagnostico />
            </div>

            <PreguntasDelDiagnostico />
          </div>
        </Seccion>

        {/* 04 · "¿Qué podrían automatizar en una empresa como la mía?" */}
        <Ejemplos numero={numeroDe("ejemplos")} kicker={kickerDe("ejemplos")} />

        {/* 05 · Confiar: quién lo construye */}
        <Socios numero={numeroDe("socios")} kicker={kickerDe("socios")} />

        {/* 06 · Entender el modelo: las cuatro etapas y sus plazos */}
        <ComoTrabajamos
          numero={numeroDe("como-trabajamos")}
          kicker={kickerDe("como-trabajamos")}
        />

        {/* 07 · Entender el modelo: qué se contrata y qué se recibe */}
        <Condiciones
          numero={numeroDe("condiciones")}
          kicker={kickerDe("condiciones")}
        />

        {/* 08 · Bajar el riesgo: control, errores y datos */}
        <Control numero={numeroDe("control")} kicker={kickerDe("control")} />

        {/* 09 · Prueba. No se renderiza mientras no haya casos reales. */}
        <Casos numero={numeroDe("casos")} kicker={kickerDe("casos")} />

        {/* 10 · Lo secundario */}
        <Faq numero={numeroDe("faq")} kicker={kickerDe("faq")} />

        {/* 11 · Contactar */}
        <Contacto numero={numeroDe("contacto")} kicker={kickerDe("contacto")} />
      </main>

      <PieDePagina />
    </>
  );
}
