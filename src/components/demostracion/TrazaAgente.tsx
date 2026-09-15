/**
 * LA PIEZA DE LA DEMOSTRACIÓN — conversación y traza, lado a lado.
 *
 * Izquierda: el mensaje como entra, en el canal por el que entra.
 * Derecha: lo que ejecuta el software, paso por paso.
 *
 * No hay robots, ni circuitos, ni cerebros: la tecnología se muestra como lo
 * que es, una conversación y un registro de acciones. Las dos columnas usan
 * las mismas hairlines y el mismo kicker que el resto del expediente.
 *
 * Componente de servidor: es contenido, no interacción. Se lee con JavaScript
 * apagado y no anima nada. La animación paso a paso, si se hace, va después:
 * primero tiene que estar bien la información.
 */

import {
  DEMOSTRACION,
  ETIQUETA_TIPO,
  type Mensaje,
  type PasoTraza,
} from "@/lib/demostracion";

/** Un mensaje de la conversación. El del sistema se distingue por el tinte. */
function Burbuja({ mensaje }: { mensaje: Mensaje }) {
  const esSistema = mensaje.de === "sistema";

  return (
    <li
      className={`flex flex-col ${esSistema ? "items-end" : "items-start"}`}
    >
      <p
        className={`
          max-w-[34ch] px-4 py-3 text-[14px] leading-relaxed
          ${esSistema ? "bg-klein-tinte text-tinta" : "bg-papel text-tinta hairline hairline-t hairline-b"}
        `}
      >
        {mensaje.texto}
      </p>
      <span className="mt-1.5 text-[11px] tabular-nums text-tinta-2">
        {/* Quién habla, dicho para lector de pantalla: el color y la posición
            no alcanzan. */}
        <span className="sr-only">
          {esSistema ? "Respuesta del software" : "Mensaje del cliente"},{" "}
        </span>
        {mensaje.hora}
      </span>
    </li>
  );
}

/** Un paso de la traza. El que espera aprobación es el único en Klein. */
function Paso({ paso, orden }: { paso: PasoTraza; orden: number }) {
  const esperaAprobacion = paso.tipo === "aprobacion";

  return (
    <li className="hairline hairline-t py-4">
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="shrink-0 text-[11px] tabular-nums tracking-[0.14em] text-tinta-2"
        >
          {String(orden).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <p className="font-serif text-[18px] leading-snug sm:text-[19px]">
            {paso.accion}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-tinta-2">
            {paso.detalle}
          </p>
          <p
            className={`kicker mt-2 ${esperaAprobacion ? "" : "kicker-tinta"}`}
          >
            {ETIQUETA_TIPO[paso.tipo]}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function TrazaAgente() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      {/* ---- la conversación ---- */}
      <div>
        <p className="kicker kicker-tinta">{DEMOSTRACION.canal}</p>
        <ul className="mt-5 flex flex-col gap-5">
          {DEMOSTRACION.conversacion.map((mensaje, i) => (
            <Burbuja key={i} mensaje={mensaje} />
          ))}
        </ul>
      </div>

      {/* ---- lo que ejecuta el software ---- */}
      <div>
        <p className="kicker kicker-tinta">Lo que ejecuta el software</p>
        <ol className="mt-5">
          {DEMOSTRACION.traza.map((paso, i) => (
            <Paso key={paso.id} paso={paso} orden={i + 1} />
          ))}
          <li className="hairline hairline-t" aria-hidden="true" />
        </ol>
      </div>
    </div>
  );
}
