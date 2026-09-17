/**
 * SECCIÓN — PREGUNTAS FRECUENTES
 *
 * CUATRO PREGUNTAS. Eran siete, y las tres que se fueron eran las que el
 * propio sitio ya contesta: cómo empezamos lo dice la etapa 01 de cómo
 * trabajamos, qué pasa cuando el sistema no sabe qué hacer lo dice el
 * renglón de cómo funciona, y cuánto demora y cuánto cuesta no se contesta
 * en una landing: sale del diagnóstico y de la propuesta.
 *
 * Las cuatro que quedan son objeciones, no explicaciones. Dos de ellas
 * —de quién es el software y si hay suscripción— también están arriba, en
 * condiciones: acá van en el registro en el que alguien las pregunta, y la
 * respuesta agrega lo que la condición no dice.
 *
 * Acordeón con <details>/<summary> nativos: teclado, lectores de pantalla y
 * búsqueda dentro de la página funcionan sin una línea de JavaScript.
 *
 * Los datos estructurados FAQPage se arman desde el mismo arreglo que se
 * renderiza: no hay forma de que el marcado y la página digan cosas distintas.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ REVISAR ANTES DE PUBLICAR                                            │
 * │ Varias respuestas fijan compromisos concretos: plazos de             │
 * │ implementación, qué incluye y qué no, qué pasa después de los 90     │
 * │ días. Los dos socios tienen que confirmar que los sostienen tal como │
 * │ están escritos.                                                       │
 * └──────────────────────────────────────────────────────────────────────┘
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";

/**
 * Cuatro preguntas y ninguna más, de dos o tres líneas cada una. Si la
 * respuesta está desarrollada arriba, acá va la versión corta.
 */
const PREGUNTAS = [
  {
    pregunta: "¿Se integra con los sistemas que ya tenemos?",
    respuesta:
      "Sí, y no hace falta cambiar nada: el trabajo se hace sobre el sistema de gestión, la planilla, el correo o el WhatsApp que la empresa ya usa. Si alguno no tiene forma de integrarse, se dice en el diagnóstico.",
  },
  {
    pregunta: "¿Reemplaza personas?",
    respuesta:
      "No. Se automatiza el trabajo repetitivo —cargar, responder lo de siempre, perseguir datos— y las personas quedan para lo que necesita criterio.",
  },
  {
    pregunta: "¿Quién es dueño del software y de los datos?",
    respuesta:
      "La empresa, de los dos. El repositorio, la documentación y las credenciales se entregan a su nombre, y los datos quedan en sus sistemas.",
  },
  {
    pregunta: "¿Hay una suscripción obligatoria?",
    respuesta:
      "No. Se paga una vez, por el desarrollo y la implementación, y nada se apaga por no contratar soporte. Los errores dentro del alcance acordado se corrigen sin costo durante 90 días.",
  },
];

/** FAQPage, armado desde el mismo arreglo que se muestra en pantalla. */
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PREGUNTAS.map((item) => ({
    "@type": "Question",
    name: item.pregunta,
    acceptedAnswer: { "@type": "Answer", text: item.respuesta },
  })),
};

export default function Faq({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion
      id="faq"
      numero={numero}
      kicker={kicker}
      aire
      forma="faq"
      marcasRegistro
    >
      <div className="pb-20 pt-2 sm:pb-24">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Preguntas frecuentes sobre automatización con IA
        </TitularRevelado>

        <div className="mt-10">
          {PREGUNTAS.map((item) => (
            <details key={item.pregunta} className="faq hairline hairline-t">
              <summary
                className="
                  flex min-h-[64px] cursor-pointer items-center justify-between
                  gap-6 py-4 transition-opacity duration-100 active:opacity-55
                "
              >
                <span className="font-serif text-[19px] leading-snug sm:text-[21px]">
                  {item.pregunta}
                </span>
                {/* El signo gira 45° al abrirse: de + a ×. */}
                <span
                  aria-hidden="true"
                  className="faq-signo shrink-0 text-[20px] leading-none text-tinta-2 transition-transform duration-200"
                >
                  +
                </span>
              </summary>
              <p className="anim-emerger max-w-[62ch] pb-6 pr-8 text-[15px] leading-relaxed text-tinta-2">
                {item.respuesta}
              </p>
            </details>
          ))}
          {/* Hairline de cierre del acordeón. */}
          <div className="hairline hairline-t" />
        </div>
      </div>

      <script
        type="application/ld+json"
        // Contenido propio y estático: no hay entrada de usuario acá.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
      />
    </Seccion>
  );
}
