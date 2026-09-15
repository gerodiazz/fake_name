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

const PREGUNTAS = [
  {
    pregunta: "¿Necesito cambiar mis sistemas?",
    respuesta:
      "No. El trabajo se hace sobre lo que la empresa ya usa: el sistema de gestión, la planilla, el correo, el WhatsApp. Si algún sistema no tiene forma de integrarse, se dice en el diagnóstico y se busca otro camino antes de la propuesta, no después.",
  },
  {
    pregunta: "¿Cuánto tarda una implementación?",
    respuesta:
      "Dos semanas de base más una semana por proceso, con un tope de ocho. Un proceso queda funcionando alrededor de la tercera semana; cuatro procesos, alrededor de la sexta. El plazo definitivo va escrito en la propuesta.",
  },
  {
    pregunta: "¿Qué pasa si cambia el proceso o crece la empresa?",
    respuesta:
      "El código es de la empresa y queda documentado para poder modificarse. Los cambios chicos los hace el equipo interno; los grandes se cotizan como un trabajo nuevo. No hay un plan que haya que escalar por crecer.",
  },
  {
    pregunta: "¿Qué ocurre después de los 90 días?",
    respuesta:
      "El sistema sigue funcionando igual: no se apaga nada ni hay que renovar ninguna licencia. A partir de ahí hay soporte mensual opcional, o atención por hora cuando haga falta. También se puede no contratar nada.",
  },
  {
    pregunta: "¿Puedo seguir con otro proveedor?",
    respuesta:
      "Sí, y no hay que pedirnos permiso. El repositorio, la documentación y las credenciales quedan a nombre de la empresa desde la entrega. Cualquier equipo con acceso puede continuar el trabajo.",
  },
  {
    pregunta: "¿Qué no está incluido?",
    respuesta:
      "El consumo de las APIs de los modelos, que se paga directo al proveedor. Las licencias de los sistemas de terceros con los que el software se integra. El soporte una vez pasados los 90 días. Y cualquier proceso que no esté escrito en el alcance de la propuesta: si aparece uno nuevo durante la implementación, se cotiza aparte y se decide antes de seguir.",
  },
  {
    pregunta: "¿Y si no hay nada para automatizar?",
    respuesta:
      "Se dice en la reunión. Pasa cuando el trabajo repetitivo ya está resuelto o cuando el proceso cambia demasiado seguido como para que convenga fijarlo en software. En ese caso no hay propuesta y la reunión no se cobra igual.",
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
          Lo secundario. Cómo se cobra y de quién es el código están arriba, en{" "}
          <a
            href="#condiciones"
            className="text-tinta underline decoration-linea underline-offset-4 transition-colors duration-100 hover:decoration-tinta-2"
          >
            condiciones
          </a>
          ; qué pasa ante un error y dónde quedan los datos, en{" "}
          <a
            href="#control"
            className="text-tinta underline decoration-linea underline-offset-4 transition-colors duration-100 hover:decoration-tinta-2"
          >
            control
          </a>
          .
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
