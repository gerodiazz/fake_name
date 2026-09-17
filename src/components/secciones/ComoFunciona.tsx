/**
 * SECCIÓN — CÓMO FUNCIONA
 *
 * QUÉ SALIÓ DE ACÁ Y POR QUÉ
 *
 * Esta sección ocupaba dos pantallas y media. Tenía la transformación, la
 * definición de "qué es un agente", la comparación entre chatbot y
 * automatización, una conversación de WhatsApp completa y el recorrido del
 * agente en seis etapas con su marco de permisos. Todo eso le enseñaba
 * vocabulario técnico a alguien que vino a resolver un problema de su
 * empresa, y lo hacía antes de mostrarle una sola cosa que hayamos
 * construido.
 *
 * Quedó el diagrama y dos oraciones. Lo que el visitante necesita entender
 * acá es el mecanismo —de seis saltos a uno—; la prueba de que funciona está
 * en la sección siguiente, que son tres clientes con nombre. Un caso real
 * convence más que cualquier definición.
 *
 * La segunda oración es lo que antes era una sección entera, "qué pasa si el
 * software se equivoca": permisos, reglas, registro y derivación a una
 * persona. Son detalles de implementación, y un renglón alcanza.
 *
 * Se llama igual que el botón secundario del hero: el visitante toca "Ver
 * cómo funciona" y llega a una sección que se llama así.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import Transformacion from "@/components/demostracion/Transformacion";

export default function ComoFunciona({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion id="como-funciona" numero={numero} kicker={kicker} superficie>
      <div className="pb-16 pt-2 sm:pb-20">
        <TitularRevelado
          como="h2"
          className="titular mt-5 max-w-[20ch] text-[clamp(1.75rem,7.5vw,3rem)]"
        >
          De un proceso a mano a un proceso que corre solo
        </TitularRevelado>

        <div className="hairline hairline-t hairline-b mt-10 py-10">
          <Transformacion />
        </div>

        <p className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-tinta sm:text-[16px]">
          El software consulta información, ejecuta acciones en los sistemas
          que la empresa ya usa y deriva a una persona cuando el caso se sale
          de lo previsto.
        </p>
        <p className="mt-3 max-w-[58ch] text-[14px] leading-relaxed text-tinta-2">
          Trabaja con permisos y reglas definidos antes de construirlo, y
          registra lo que hace.
        </p>
      </div>
    </Seccion>
  );
}
