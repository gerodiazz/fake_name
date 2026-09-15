/**
 * SECCIÓN 03 — CÓMO TRABAJAMOS
 *
 * Las cuatro etapas, dibujadas como diagrama de proceso: un eje de 0.5px en
 * color línea con un nodo por etapa, el primero en Klein, y el texto de cada
 * etapa colgando de su nodo. El eje se traza de izquierda a derecha al entrar
 * en viewport, con scroll-driven animations nativas.
 *
 * El diagrama existe de 1024px para arriba, que es donde hay cuatro columnas.
 * En anchos menores las etapas se apilan con sus hairlines, como el resto del
 * sitio: el diagrama horizontal a 375px sería ilegible.
 *
 * Sección que respira: es una de las cuatro que quedan vacías a propósito.
 */

import Seccion from "@/components/Seccion";
import TitularRevelado from "@/components/TitularRevelado";
import { SITIO } from "@/lib/sitio";

/**
 * Las cuatro etapas, con su plazo habitual.
 *
 * Cada una contesta la pregunta que el cliente tiene en ese momento del
 * proyecto, y la pregunta va escrita: es la diferencia entre leer una lista de
 * etapas y entender qué pasa en cada una.
 */
const PASOS = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    pregunta: "¿Qué proceso vamos a automatizar?",
    plazo: "45 minutos · sin costo",
    detalle:
      "Vemos el proceso con la persona que lo hace. De ahí sale qué conviene automatizar y qué no.",
  },
  {
    numero: "02",
    titulo: "Propuesta",
    pregunta: "¿Qué se construye, cuánto cuesta y cuánto tarda?",
    plazo: "5 días hábiles",
    detalle:
      "Alcance, plazo y precio por escrito. Si no cierra, no hay propuesta y no se debe nada.",
  },
  {
    numero: "03",
    titulo: "Implementación",
    pregunta: "¿Cómo pasa de la idea al sistema funcionando?",
    plazo: "2 a 8 semanas",
    detalle:
      "Desarrollo e integración con los sistemas que la empresa ya usa, con una revisión en cada entrega parcial.",
  },
  {
    numero: "04",
    titulo: "Entrega",
    pregunta: "¿Qué queda en manos de la empresa?",
    plazo: "1 semana",
    detalle:
      "El sistema funcionando, el repositorio, la documentación y la capacitación de quien lo va a usar.",
  },
];

/**
 * El eje del diagrama, en unidades de viewBox. El SVG escala de forma uniforme,
 * así que cada nodo cae en el centro de su columna: con cuatro columnas, los
 * centros están al 12.5 %, 37.5 %, 62.5 % y 87.5 % del ancho.
 */
const ANCHO = 1000;
const ALTO = 72;
const EJE_Y = 30;
const NODOS_X = PASOS.map((_, i) => ((i + 0.5) / PASOS.length) * ANCHO);

/**
 * Diagrama de proceso. Decorativo: la información de las etapas está escrita
 * como texto debajo, y el SVG solo dibuja el recorrido.
 *
 * Cada nodo y cada tic aparecen dentro de su propio tramo del scroll, así que
 * el rango va inline: es el único dato que cambia entre uno y otro.
 */
function Diagrama() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="diagrama"
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* El eje, de punta a punta. */}
      <line
        className="diagrama-eje"
        x1="0"
        y1={EJE_Y}
        x2={ANCHO}
        y2={EJE_Y}
        vectorEffect="non-scaling-stroke"
      />

      {NODOS_X.map((x, i) => {
        // El trazado avanza de izquierda a derecha: cada etapa entra en su
        // propio tramo del recorrido del scroll.
        const desde = 15 + i * 13;
        const rango = `entry ${desde}% entry ${desde + 16}%`;

        return (
          <g key={PASOS[i].numero}>
            {/* Nodo. El primero es el paso activo: relleno Klein, sin contorno. */}
            <circle
              className={i === 0 ? "diagrama-nodo-activo" : "diagrama-nodo"}
              cx={x}
              cy={EJE_Y}
              r="7"
              vectorEffect="non-scaling-stroke"
              style={{ animationRange: rango }}
            />
            {/* Tic que baja del eje hacia el texto de la etapa. */}
            <line
              className="diagrama-tic"
              x1={x}
              y1={EJE_Y + 16}
              x2={x}
              y2={ALTO}
              vectorEffect="non-scaling-stroke"
              style={{ animationRange: rango }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function ComoTrabajamos({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <Seccion
      id="como-trabajamos"
      numero={numero}
      kicker={kicker}
      aire
      marcasRegistro
      textoVertical={`${SITIO.nombre} · ${new Date().getFullYear()}`}
    >
      <div className="pb-28 pt-2 sm:pb-40">
        <TitularRevelado como="h2" className="titular max-w-[18ch] text-[clamp(1.75rem,7.5vw,3rem)]">
          Cómo trabajamos
        </TitularRevelado>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-tinta-2 sm:text-[16px]">
          Cuatro etapas, cada una con su plazo. El precio y el alcance se
          cierran en la segunda, antes de que el trabajo arranque.
        </p>

        {/* El diagrama solo en desktop, donde existen las cuatro columnas. */}
        <div className="mt-16 hidden lg:block">
          <Diagrama />
        </div>

        {/* Las cuatro etapas. En desktop cuelgan de los nodos del diagrama y no
            llevan hairlines: la línea ya la dibuja el eje. Apiladas en mobile,
            conservan la grilla expuesta del resto del sitio. */}
        <ol className="grilla-etapas mt-12 grid grid-cols-1 lg:mt-0 lg:grid-cols-4">
          {PASOS.map((paso, i) => (
            <li key={paso.numero} className="py-6 lg:px-5 lg:pt-0 lg:text-center">
              {/* El número de la primera etapa acompaña al nodo activo: es el
                  único en Klein, como el nodo. */}
              <p className={`kicker ${i === 0 ? "" : "kicker-tinta"}`}>
                {paso.numero}
              </p>
              <h3 className="mt-3 font-serif text-[21px] leading-tight sm:text-[23px]">
                {paso.titulo}
              </h3>
              <p className="mt-1 text-[13px] tabular-nums text-tinta-2">
                {paso.plazo}
              </p>
              {/* La pregunta que el cliente tiene en esta etapa. En tinta
                  plena: es lo que se lee cuando se recorre el diagrama. */}
              <p className="mt-4 max-w-[46ch] text-[14px] leading-relaxed text-tinta lg:mx-auto">
                {paso.pregunta}
              </p>
              <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-tinta-2 lg:mx-auto">
                {paso.detalle}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Seccion>
  );
}
