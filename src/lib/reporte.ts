/**
 * EL REPORTE DEL DIAGNÓSTICO
 *
 * Arma el texto que se manda por email y el resumen que viaja a la agenda, a
 * partir de lo que el visitante contestó.
 *
 * SE ARMA EN EL SERVIDOR, NO EN EL CLIENTE. El navegador manda los datos
 * crudos —rubro y respuestas— y acá se reconstruye el reporte leyendo
 * src/lib/diagnostico.ts. Si el cliente mandara el texto ya escrito, cualquiera
 * podría hacer que el sitio envíe por correo lo que se le ocurra desde una
 * dirección nuestra. Además garantiza que el reporte diga exactamente lo mismo
 * que la pantalla.
 *
 * NO HAY LÓGICA NUEVA ACÁ. Los procesos, las horas y el plazo salen de las
 * mismas funciones que usa la pantalla del resultado: horasPorAnio() y
 * semanasDeImplementacion(). Ni un número se calcula distinto.
 */

import {
  SEMANAS_BASE,
  SEMANAS_TOPE,
  buscarRubro,
  horasPorAnio,
  preguntasDeRubro,
  semanasDeImplementacion,
} from "@/lib/diagnostico";

/** Lo que manda el navegador. Todo lo demás se deriva de esto. */
export type EntradaReporte = {
  rubroId: string;
  /** Respuestas por id de pregunta. Solo se aceptan ids del rubro elegido. */
  respuestas: Record<string, boolean>;
  /** El proceso escrito a mano, solo en "Otro rubro". */
  textoLibre?: string;
};

export type Reporte = {
  rubro: string;
  procesos: { nombre: string; descripcion: string; horasSemanales: number }[];
  horasAnuales: number;
  semanas: number;
  textoLibre: string;
  asunto: string;
  /** El reporte completo, en texto plano. */
  texto: string;
  /** Versión corta, para el campo de notas de la agenda. */
  resumen: string;
};

/** Tope del texto libre. Lo que entra por acá termina en un correo. */
const TOPE_TEXTO_LIBRE = 500;

/**
 * Arma el reporte. Devuelve null si el rubro no existe: es la única
 * validación que hace falta, porque todo lo demás se deriva del catálogo.
 */
export function armarReporte(entrada: EntradaReporte): Reporte | null {
  const rubro = buscarRubro(entrada.rubroId);
  if (!rubro) return null;

  const preguntas = preguntasDeRubro(rubro);

  // Solo cuentan las preguntas que pertenecen a este rubro. Un id inventado
  // o de otro rubro no entra: el recorrido del visitante fue este y no otro.
  const marcadas = preguntas.filter((p) => entrada.respuestas[p.id] === true);
  const agentes = marcadas.map((p) => p.agente);

  const horasAnuales = horasPorAnio(agentes);
  const semanas = semanasDeImplementacion(agentes.length);
  const textoLibre = (entrada.textoLibre ?? "").trim().slice(0, TOPE_TEXTO_LIBRE);

  const procesos = agentes.map((a) => ({
    nombre: a.nombre,
    descripcion: a.descripcion,
    horasSemanales: a.horasSemanales,
  }));

  /* ---- el resumen corto, para la agenda ---- */
  const resumen = [
    `Rubro: ${rubro.nombre}.`,
    agentes.length > 0
      ? `Procesos marcados (${agentes.length}): ${agentes.map((a) => a.nombre).join(", ")}.`
      : "No se marcó ningún proceso.",
    agentes.length > 0
      ? `Referencia: ${horasAnuales.toLocaleString("es")} horas al año, implementación estimada en ${semanas} semanas.`
      : "",
    textoLibre ? `Proceso que consume más tiempo: ${textoLibre}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* ---- el reporte completo ---- */
  const lineas: string[] = [
    "DIAGNÓSTICO DE PROCESOS AUTOMATIZABLES",
    "Telesca Justel",
    "",
    `Rubro: ${rubro.nombre}`,
    "",
  ];

  if (procesos.length > 0) {
    lineas.push(`PROCESOS QUE SE PUEDEN PASAR A SOFTWARE (${procesos.length})`);
    lineas.push("");
    procesos.forEach((p, i) => {
      lineas.push(`${String(i + 1).padStart(2, "0")}. ${p.nombre}`);
      lineas.push(`    ${p.descripcion}`);
      lineas.push(`    Referencia: ${p.horasSemanales} horas por semana.`);
      lineas.push("");
    });
    lineas.push("REFERENCIAS DE TIEMPO");
    lineas.push("");
    lineas.push(
      `Horas al año involucradas en estos procesos: ${horasAnuales.toLocaleString("es")}.`,
    );
    lineas.push(
      `Implementación estimada: ${semanas} semanas (${SEMANAS_BASE} de base más una por proceso, con tope de ${SEMANAS_TOPE}).`,
    );
    lineas.push("");
    lineas.push(
      "Las horas salen de los rangos que usamos como punto de partida para cada tipo de proceso, no de datos de tu empresa. Es un punto de partida, no un análisis: en la reunión se reemplazan por los que midan ustedes.",
    );
  } else {
    lineas.push("No se marcó ningún proceso.");
    lineas.push("");
    lineas.push(
      "Puede ser que lo repetitivo ya esté resuelto, o que el proceso que más tiempo consume no esté en la lista. En los dos casos la reunión no tiene costo, y si no hay nada que convenga automatizar, lo decimos ahí.",
    );
  }

  if (textoLibre) {
    lineas.push("");
    lineas.push("PROCESO QUE CONSUME MÁS TIEMPO");
    lineas.push("");
    lineas.push(textoLibre);
  }

  lineas.push("");
  lineas.push("QUÉ SALE DE LA REUNIÓN");
  lineas.push("");
  lineas.push("· Esta misma lista revisada sobre el proceso real, no sobre promedios.");
  lineas.push("· Alcance, plazo y precio cerrados por escrito, o la respuesta de que no hay nada que automatizar.");
  lineas.push("· Una estimación del costo mensual de las APIs según el volumen de uso.");
  lineas.push("");
  lineas.push("45 minutos, sin costo y sin compromiso.");

  return {
    rubro: rubro.nombre,
    procesos,
    horasAnuales,
    semanas,
    textoLibre,
    asunto: `Tu diagnóstico de procesos · ${rubro.nombre}`,
    texto: lineas.join("\n"),
    resumen,
  };
}
