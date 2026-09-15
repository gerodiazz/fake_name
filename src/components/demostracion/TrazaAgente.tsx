/**
 * EL EJEMPLO CONCEPTUAL — conversación, etapas y marco.
 *
 * Izquierda: el mensaje como entra, en el canal por el que entra.
 * Derecha: las seis etapas del recorrido, con el dato concreto de cada una.
 * Abajo: el marco, o sea lo que el software puede y no puede hacer.
 *
 * El marco es la parte que convence a quien tiene que dar acceso a sus
 * sistemas: información autorizada, herramientas, permisos, reglas, registro e
 * intervención humana. Sin eso, la pieza se lee como un chatbot enchufado a
 * una empresa; con eso, como software que opera dentro de un proceso.
 *
 * No hay robots, ni circuitos, ni cerebros: la tecnología se muestra como lo
 * que es, una conversación y un recorrido de acciones.
 *
 * Componente de servidor: es contenido, no interacción. Se lee con JavaScript
 * apagado y no anima nada. La animación etapa por etapa, si se hace, va en la
 * fase visual: primero tiene que estar bien la información.
 */

import {
  DEMOSTRACION,
  ETIQUETA_INTERVENCION,
  type Etapa,
  type Mensaje,
} from "@/lib/demostracion";

/** Un mensaje de la conversación. El del sistema se distingue por el tinte. */
function Burbuja({ mensaje }: { mensaje: Mensaje }) {
  const esSistema = mensaje.de === "sistema";

  return (
    <li className={`flex flex-col ${esSistema ? "items-end" : "items-start"}`}>
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

/** Una etapa del recorrido. Las que no son automáticas van marcadas. */
function EtapaDelRecorrido({ etapa, orden }: { etapa: Etapa; orden: number }) {
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
          <h4 className="font-serif text-[18px] leading-snug sm:text-[19px]">
            {etapa.nombre}
          </h4>
          <p className="mt-1 max-w-[42ch] text-[14px] leading-relaxed text-tinta">
            {etapa.que}
          </p>
          <p className="mt-1 max-w-[42ch] text-[13px] leading-relaxed text-tinta-2">
            {etapa.detalle}
          </p>
          {etapa.intervencion ? (
            <p className="kicker mt-2">
              {ETIQUETA_INTERVENCION[etapa.intervencion]}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default function TrazaAgente() {
  return (
    <div>
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

        {/* ---- las seis etapas ---- */}
        <div>
          <p className="kicker kicker-tinta">El recorrido, etapa por etapa</p>
          <ol className="mt-5">
            {DEMOSTRACION.etapas.map((etapa, i) => (
              <EtapaDelRecorrido key={etapa.id} etapa={etapa} orden={i + 1} />
            ))}
            <li className="hairline hairline-t" aria-hidden="true" />
          </ol>
        </div>
      </div>

      {/* ---- el marco ---- */}
      <div className="mt-12">
        <p className="kicker kicker-tinta">
          Dentro de qué límites trabaja, en este ejemplo
        </p>
        <dl className="grilla-expuesta grilla-expuesta-sm mt-5 grid grid-cols-1 hairline hairline-t hairline-b sm:grid-cols-2 lg:grid-cols-3">
          {DEMOSTRACION.marco.map((limite) => (
            <div key={limite.titulo} className="py-5 sm:px-5">
              <dt className="text-[14px] text-tinta">{limite.titulo}</dt>
              <dd className="mt-1 max-w-[38ch] text-[13px] leading-relaxed text-tinta-2">
                {limite.detalle}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
