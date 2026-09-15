/**
 * SECCIÓN 06 — FAQ
 *
 * Acordeón con <details>/<summary> nativos: teclado, lectores de pantalla y
 * búsqueda dentro de la página funcionan sin una línea de JavaScript. El
 * triángulo del navegador se apaga por CSS y en su lugar hay un signo que gira
 * de + a ×.
 *
 * Las preguntas son las que aparecen de verdad antes de empezar un trabajo:
 * cómo se cobra, de quién es el código, qué pasa si algo falla.
 *
 * Es el ÚNICO lugar del sitio donde se dice que el pago es una sola vez, en
 * "¿Cómo se cobra?". En el resto de las secciones el modelo se transmite por
 * implicación: precio cerrado por escrito, el sistema queda instalado.
 *
 * Aquí también se declaran los datos estructurados FAQPage, armados desde el
 * mismo arreglo que se renderiza: no hay forma de que el marcado y la página
 * digan cosas distintas.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ REVISAR ANTES DE PUBLICAR                                            │
 * │ Varias respuestas fijan compromisos concretos: 90 días de corrección │
 * │ incluida, 5 días hábiles para la propuesta, entrega del repositorio  │
 * │ completo. Son coherentes con el modelo de un solo pago, pero hay que  │
 * │ confirmar que los dos socios los sostengan tal como están escritos.   │
 * └──────────────────────────────────────────────────────────────────────┘
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";

const PREGUNTAS = [
  {
    pregunta: "¿Cómo se cobra?",
    respuesta:
      "Se paga una vez, por el desarrollo y la implementación. El soporte posterior es opcional y se cotiza aparte. El monto y las condiciones quedan escritos en la propuesta, antes de que empiece el trabajo.",
  },
  {
    pregunta: "¿Qué pasa si el agente deja de funcionar?",
    respuesta:
      "Durante los primeros 90 días desde la entrega, la corrección está incluida: da igual si el error es propio o si cambió el sistema con el que el agente se integra. Después existe soporte mensual opcional, o atención por hora cuando haga falta. Nada se apaga por no contratar soporte.",
  },
  {
    pregunta: "¿De quién es el código?",
    respuesta:
      "De la empresa. Se entrega el repositorio completo, la documentación y las credenciales, a su nombre. Puede seguirlo el equipo interno o cualquier otro proveedor. No queda alojado en un servidor del estudio ni depende de una cuenta del estudio para funcionar.",
  },
  {
    pregunta: "¿Quién paga los costos de API de los modelos de IA?",
    respuesta:
      "La empresa, en su propia cuenta y directo al proveedor del modelo. No hay intermediación ni recargo. En el diagnóstico se estima el costo mensual según el volumen de uso previsto, así el número aparece antes y no después.",
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

export default function Faq() {
  return (
    <Seccion
      id="faq"
      numero="06"
      kicker="Preguntas"
      aire
      forma="faq"
      marcasRegistro
    >
      <div className="pb-32 pt-2 sm:pb-44">
        <TitularRevelado como="h2" className="titular max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]">
          Preguntas frecuentes sobre automatización con IA
        </TitularRevelado>
        <p className="mt-6 max-w-[48ch] text-[15px] text-tinta-2 sm:text-[16px]">
          Lo que suelen preguntarnos antes de empezar.
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
