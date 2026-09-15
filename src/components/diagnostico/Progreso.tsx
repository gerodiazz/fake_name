/**
 * PROGRESO DEL DIAGNÓSTICO
 *
 * Una hairline que se llena. No es un adorno: es la única forma de ver cuánto
 * falta sin contar.
 *
 * No escribe ninguna etiqueta visible: el "02 / 04" lo pone la cabecera de la
 * herramienta, dos renglones más arriba, y decirlo dos veces sería ruido. Para
 * lector de pantalla sí va completo, en el aria-valuetext.
 */

export default function Progreso({
  paso,
  total,
  /** Cómo se llama cada paso. "Paso" en el recorrido del diagnóstico. */
  unidad = "Paso",
}: {
  paso: number;
  total: number;
  unidad?: string;
}) {
  const etiqueta = `${unidad} ${paso} de ${total}`;

  return (
    <div
      className="progreso"
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
  );
}
