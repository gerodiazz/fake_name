/**
 * PROGRESO DEL DIAGNÓSTICO
 *
 * Antes el recorrido se marcaba con un contador de expediente: "02 / 06". Se
 * veía bien y no se leía como progreso. En el medio de un recorrido de seis
 * pasos, saber cuánto falta importa más que la estética del contador, así que
 * ahora dice "Pregunta 2 de 6" con todas las letras y además hay una barra.
 *
 * La barra es una hairline que se llena. No es un adorno: es la única forma de
 * ver el avance sin contar.
 *
 * Para lector de pantalla va como progressbar con sus valores; el texto queda
 * aria-hidden para no decir dos veces lo mismo.
 */

export default function Progreso({
  paso,
  total,
  /** Cómo se llama cada paso. "Pregunta" en el recorrido normal. */
  unidad = "Pregunta",
}: {
  paso: number;
  total: number;
  unidad?: string;
}) {
  const etiqueta = `${unidad} ${paso} de ${total}`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p
          className="text-[11px] uppercase tracking-[0.14em] text-tinta-2"
          aria-hidden="true"
        >
          {etiqueta}
        </p>
        <p
          className="text-[11px] tabular-nums text-tinta-2"
          aria-hidden="true"
        >
          {Math.round((paso / total) * 100)}%
        </p>
      </div>

      <div
        className="progreso mt-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={paso}
        aria-valuetext={etiqueta}
      >
        <span
          className="progreso-avance"
          style={{ ["--avance" as string]: paso / total }}
        />
      </div>
    </div>
  );
}
