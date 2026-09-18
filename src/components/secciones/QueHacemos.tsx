/**
 * SECCIÓN — QUÉ HACEMOS
 *
 * Tres bloques de una línea, los procesos en un renglón y nada más.
 *
 * ES LO QUE QUEDÓ DE CUATRO SECCIONES. Antes de esta sección el sitio tenía
 * "cómo funciona" (el mecanismo con su diagrama y su marco de permisos),
 * "cómo trabajamos" (cuatro etapas con sus plazos), "condiciones" (cuatro
 * compromisos comerciales) y las preguntas frecuentes. Eran cuatro pantallas
 * para decir lo que acá dice un renglón: los casos reales, que están arriba,
 * ya demostraron todo eso con clientes de verdad.
 *
 * Va DESPUÉS de los casos a propósito. Primero se ve que lo hicimos; recién
 * después se dice de qué clase de trabajo se trata. Al revés sería un catálogo
 * de servicios pidiendo que le crean.
 *
 * LOS PROCESOS VAN EN UN RENGLÓN, no en una grilla de seis fichas. Están para
 * que alguien se reconozca en uno —"esto es lo que me pasa a mí"— y para eso
 * alcanza con nombrarlos. El que no ve el suyo tiene el diagnóstico de arriba,
 * que pregunta por el rubro y termina en "otro".
 *
 * El renglón de cierre es lo que antes era una sección entera —"qué pasa si el
 * software se equivoca"—: permisos, reglas, registro y derivación a una
 * persona. Son detalles de implementación y una frase alcanza.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";

/** Las tres clases de trabajo. Una línea cada una, y ninguna nombra una tecnología. */
const QUE_CONSTRUIMOS = [
  {
    id: "agentes",
    titulo: "Agentes de IA",
    detalle: "Atienden consultas, agendan y ejecutan tareas en los sistemas.",
  },
  {
    id: "automatizaciones",
    titulo: "Automatizaciones",
    detalle: "Conectan sistemas y eliminan el trabajo repetitivo entre ellos.",
  },
  {
    id: "software",
    titulo: "Software a medida",
    detalle: "Construido alrededor del proceso real de cada empresa.",
  },
];

export default function QueHacemos({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion
      id="que-hacemos"
      numero={numero}
      kicker={kicker}
      aire
      forma="servicios"
      marcasRegistro
    >
      <div className="pb-20 pt-2 sm:pb-24">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Automatizamos el trabajo que hoy consume tiempo
        </TitularRevelado>

        <ul className="grilla-expuesta grilla-expuesta-lg mt-10 grid grid-cols-1 hairline hairline-t hairline-b lg:grid-cols-3">
          {QUE_CONSTRUIMOS.map((bloque) => (
            <li key={bloque.id} className="py-7 sm:px-5">
              <h3 className="font-serif text-[21px] leading-tight sm:text-[23px]">
                {bloque.titulo}
              </h3>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-tinta-2">
                {bloque.detalle}
              </p>
            </li>
          ))}
        </ul>

        {/* Los procesos, en un renglón. Alcanza con nombrarlos: quien tiene
            uno de estos se reconoce sin que se lo expliquen. */}
        <p className="mt-10 max-w-[54ch] font-serif text-[19px] leading-snug sm:text-[21px]">
          Pedidos, consultas, turnos, documentos, seguimiento y tareas
          administrativas.
        </p>

        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-tinta-2">
          Cuando un caso se sale de lo previsto, el sistema lo deriva a una
          persona.
        </p>
      </div>
    </Seccion>
  );
}
