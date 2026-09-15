/**
 * PÁGINA ÚNICA
 *
 * Las siete secciones del expediente, en orden. El diagnóstico (02) es la
 * pieza central: todo lo que viene después se lee en función de lo que el
 * visitante contestó ahí, y el resultado viaja hasta el formulario de la 07.
 *
 * No hay sección de casos, testimonios, logos ni métricas de resultados. La
 * prueba del sitio es el diagnóstico: el visitante ve su propia estimación.
 *
 * Un solo H1, el del hero. Cada sección abre con un H2 que lleva el término
 * por el que se busca ese contenido.
 */

import BarraSuperior from "@/components/BarraSuperior";
import Hero from "@/components/Hero";
import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import Diagnostico from "@/components/diagnostico/Diagnostico";
import ComoTrabajamos from "@/components/secciones/ComoTrabajamos";
import Referidos from "@/components/secciones/Referidos";
import Socios from "@/components/secciones/Socios";
import Faq from "@/components/secciones/Faq";
import Contacto from "@/components/secciones/Contacto";
import PieDePagina from "@/components/PieDePagina";
import { PREGUNTAS_UNIVERSALES, RUBROS } from "@/lib/diagnostico";

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
          son anclas de esta página: /d tiene su propio recorrido. */}
      <BarraSuperior />

      <main>
        {/* 01 · Hero */}
        <Hero />

        {/* 02 · Diagnóstico interactivo */}
        <Seccion id="diagnostico" numero="02" kicker="Diagnóstico">
          <div className="pb-16 pt-2 sm:pb-24">
            <TitularRevelado
              como="h2"
              className="titular mt-5 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
            >
              Diagnóstico de procesos automatizables
            </TitularRevelado>
            <p className="mt-5 max-w-[48ch] text-[15px] text-tinta-2 sm:text-[16px]">
              Seis preguntas sobre cómo se trabaja hoy. Al final queda una lista
              de procesos y una estimación de horas.
            </p>

            <div className="mt-10">
              <Diagnostico />
            </div>

            <PreguntasDelDiagnostico />
          </div>
        </Seccion>

        {/* 03 · Cómo trabajamos */}
        <ComoTrabajamos />

        {/* 04 · Programa de referidos */}
        <Referidos />

        {/* 05 · Quiénes estamos detrás */}
        <Socios />

        {/* 06 · FAQ */}
        <Faq />

        {/* 07 · Contacto */}
        <Contacto />
      </main>

      <PieDePagina />
    </>
  );
}
