/**
 * SECCIÓN 10 — PREGUNTAS FRECUENTES
 *
 * QUÉ SALIÓ DE ACÁ Y POR QUÉ
 *
 * Tres respuestas de este acordeón eran, en realidad, la oferta: cómo se
 * cobra, de quién es el código y quién paga las APIs. Estaban plegadas dentro
 * de un <details>, o sea que había que hacer clic para enterarse de lo mejor
 * que tiene el modelo comercial. Subieron a la sección de condiciones.
 *
 * Lo mismo con el comportamiento ante un error y el destino de los datos:
 * ahora tienen sección propia, la de control. Acá quedan las preguntas
 * secundarias, que son las que un acordeón sí puede esconder sin costo.
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
 * Siete preguntas y ninguna más.
 *
 * Eran ocho, y varias repetían con otras palabras lo que ya dicen las
 * secciones de condiciones y de control. Las que quedan son las que un
 * empresario hace de verdad antes de escribir, y cada respuesta ocupa lo que
 * necesita y ni una línea más: si la respuesta está desarrollada arriba, acá
 * va la versión corta.
 */
const PREGUNTAS = [
  {
    pregunta: "¿Esto reemplaza personas?",
    respuesta:
      "No. Se automatiza el trabajo repetitivo de un proceso —cargar, responder lo de siempre, perseguir datos— y las personas quedan para lo que necesita criterio. El propio sistema está construido para frenar y derivar cuando el caso se sale de lo previsto.",
  },
  {
    pregunta: "¿Se integra con los sistemas que ya tenemos?",
    respuesta:
      "Sí, y no hace falta cambiar nada: el trabajo se hace sobre el sistema de gestión, la planilla, el correo o el WhatsApp que la empresa ya usa. Si alguno no tiene forma de integrarse, se dice en el diagnóstico y se busca otro camino antes de la propuesta.",
  },
  {
    pregunta: "¿Qué pasa cuando el sistema no sabe qué hacer?",
    respuesta:
      "Se detiene y avisa. No improvisa una respuesta ni ejecuta una acción a medias: deja el caso con todo su contexto para que lo tome una persona.",
  },
  {
    pregunta: "¿Quién es dueño del software y de los datos?",
    respuesta:
      "La empresa, de los dos. El repositorio, la documentación y las credenciales se entregan a su nombre, y los datos quedan en sus sistemas.",
  },
  {
    pregunta: "¿Hay una suscripción obligatoria?",
    respuesta:
      "No. Se paga una vez, por el desarrollo y la implementación. El soporte posterior es opcional y nada se apaga por no contratarlo.",
  },
  {
    pregunta: "¿Cuánto demora y cuánto cuesta un proyecto?",
    respuesta:
      "Dos semanas de base más una por proceso, con tope de ocho. El precio depende de cuántos procesos entren y de con qué sistemas haya que integrarse, así que no hay lista de precios: sale de la propuesta, que se escribe después del diagnóstico y no se mueve durante el trabajo.",
  },
  {
    pregunta: "¿Cómo empezamos?",
    respuesta:
      "Con una reunión de 45 minutos, sin costo, para ver el proceso como funciona hoy. Si de ahí sale que no conviene automatizarlo —porque ocurre poco, porque cambia todos los meses o porque depende de un criterio que nadie tiene escrito—, lo decimos y no hay propuesta.",
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
      <div className="pb-32 pt-2 sm:pb-44">
        <TitularRevelado
          como="h2"
          className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          Preguntas frecuentes sobre automatización con IA
        </TitularRevelado>
        <p className="mt-6 max-w-[52ch] text-[15px] text-tinta-2 sm:text-[16px]">
          Las siete que suelen hacernos antes de escribir.
        </p>

        <div className="mt-16">
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
