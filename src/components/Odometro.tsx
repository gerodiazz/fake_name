"use client";

/**
 * ODÓMETRO — la mecánica de dígitos que rueda.
 *
 * APOYO 2 DEL SISTEMA DE MOVIMIENTO. Cada dígito es una ventana con una
 * columna del 0 al 9 adentro. Mostrar el 7 es correr la columna siete
 * posiciones. De ahí salen las dos propiedades que pedía el sistema, sin
 * lógica extra:
 *
 *   · al entrar, cada ventana sube desde abajo con 70 ms de retraso entre una
 *     y la siguiente, de izquierda a derecha;
 *   · al cambiar de valor, los dígitos que no cambian tienen la columna en la
 *     misma posición y por lo tanto no se mueven. Ruedan solo los que cambian.
 *
 * El cambio de valor no lleva stagger a propósito: con el slider de referidos
 * arrastrándose, escalonar los dígitos se sentiría como lag, no como odómetro.
 *
 * Se usa en dos tamaños: el número gigante de las secciones 02 y 04, y el
 * marcador de la barra inferior del diagnóstico.
 */

type Props = {
  /** El número ya formateado, con prefijo y separadores si los lleva. */
  texto: string;
  /** Si es true, los dígitos entran escalonados la primera vez. */
  animado?: boolean;
};

export default function Odometro({ texto, animado = false }: Props) {
  return (
    <span className="odometro">
      {texto.split("").map((caracter, i) => (
        <Caracter
          // La clave es la posición: así la ventana sobrevive al cambio de
          // valor y la columna rueda en vez de remontarse.
          key={i}
          caracter={caracter}
          indice={i}
          animado={animado}
        />
      ))}
    </span>
  );
}

/** Un carácter: rueda si es dígito, acompaña si no. */
function Caracter({
  caracter,
  indice,
  animado,
}: {
  caracter: string;
  indice: number;
  animado: boolean;
}) {
  const esDigito = caracter >= "0" && caracter <= "9";

  // Puntos de miles, espacios y el prefijo: no ruedan.
  if (!esDigito) {
    return <span className="odo-fijo">{caracter}</span>;
  }

  return <Digito digito={Number(caracter)} indice={indice} animado={animado} />;
}

/** Ventana de un dígito, con la columna del 0 al 9 adentro. */
function Digito({
  digito,
  indice,
  animado,
}: {
  digito: number;
  indice: number;
  animado: boolean;
}) {
  // En el primer render la columna ya nace en la posición del dígito y las
  // transiciones de CSS no corren al montar: no hay conteo desde cero. Lo que
  // se ve entrar es la ventana subiendo, que es el efecto que buscamos.
  return (
    <span className="odo-celda">
      <span
        className={animado ? "odo-entrada" : undefined}
        style={
          animado
            ? ({ ["--odo-i" as string]: String(indice) } as React.CSSProperties)
            : undefined
        }
      >
        <span
          className="odo-columna"
          style={{ ["--odo-d" as string]: String(digito) }}
        >
          {/* Diez posiciones fijas: la ventana muestra la que corresponda. */}
          {Array.from({ length: 10 }, (_, n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      </span>
    </span>
  );
}
