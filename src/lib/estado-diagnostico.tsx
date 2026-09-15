"use client";

/**
 * ESTADO COMPARTIDO DEL DIAGNÓSTICO
 *
 * El resultado del diagnóstico (sección 02) tiene que llegar al formulario del
 * footer (sección 07) ya escrito. En vez de pasar props por medio sitio, el
 * estado vive en un contexto que envuelve toda la página.
 *
 * Nada de esto se guarda en un servidor: es estado de la visita.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buscarRubro,
  horasPorAnio,
  preguntasDeRubro,
  semanasDeImplementacion,
  type Agente,
  type Pregunta,
  type Rubro,
} from "@/lib/diagnostico";

type Respuestas = Record<string, boolean>;

type ContextoDiagnostico = {
  /* ---- estado crudo ---- */
  rubroId: string | null;
  respuestas: Respuestas;
  textoLibre: string;
  /** True cuando el visitante contestó (o salteó) todas las preguntas. */
  completo: boolean;
  /** Código de referido de esta visita. Vacío hasta que monta el cliente. */
  codigoReferido: string;

  /* ---- derivados ---- */
  rubro: Rubro | undefined;
  preguntas: Pregunta[];
  agentes: Agente[];
  horasAnuales: number;
  semanas: number;

  /* ---- acciones ---- */
  elegirRubro: (id: string) => void;
  responder: (preguntaId: string, siONo: boolean) => void;
  /**
   * Borra la respuesta de una pregunta. La usa el botón de atrás: volver un
   * paso tiene que DESHACER lo contestado, no dejarlo puesto. Sin esto, quien
   * vuelve para corregir un "sí" se lo encuentra igual en el resultado.
   */
  olvidar: (preguntaId: string) => void;
  escribirTextoLibre: (texto: string) => void;
  marcarCompleto: () => void;
  reiniciar: () => void;

  /** Texto ya redactado con el resultado, para precargar el contacto. */
  resumenParaContacto: () => string;
};

const Contexto = createContext<ContextoDiagnostico | null>(null);

/** Clave de localStorage donde persiste el código de referido de la visita. */
const CLAVE_CODIGO = "tj:codigo-referido";

/** Arma un código corto y legible en voz alta: TJ-7K2Q. */
function generarCodigo(): string {
  const alfabeto = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin I, O, 0, 1
  let salida = "";
  for (let i = 0; i < 4; i += 1) {
    salida += alfabeto[Math.floor(Math.random() * alfabeto.length)];
  }
  return `TJ-${salida}`;
}

export function ProveedorDiagnostico({ children }: { children: ReactNode }) {
  const [rubroId, setRubroId] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [textoLibre, setTextoLibre] = useState("");
  const [completo, setCompleto] = useState(false);
  // Arranca vacío para que el HTML del servidor y el del cliente coincidan.
  const [codigoReferido, setCodigoReferido] = useState("");

  // El código se arma recién en el cliente y se reusa entre recargas, así el
  // mismo visitante comparte siempre el mismo código.
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_CODIGO);
      if (guardado) {
        setCodigoReferido(guardado);
        return;
      }
      const nuevo = generarCodigo();
      window.localStorage.setItem(CLAVE_CODIGO, nuevo);
      setCodigoReferido(nuevo);
    } catch {
      // Navegador con storage bloqueado: el código igual sirve en memoria.
      setCodigoReferido(generarCodigo());
    }
  }, []);

  const rubro = useMemo(() => buscarRubro(rubroId), [rubroId]);

  const preguntas = useMemo(
    () => (rubro ? preguntasDeRubro(rubro) : []),
    [rubro],
  );

  // Los agentes contratados son los de las preguntas contestadas que sí.
  // El orden es el del recorrido: el equipo se arma en el orden en que se dijo
  // que sí.
  const agentes = useMemo(
    () => preguntas.filter((p) => respuestas[p.id]).map((p) => p.agente),
    [preguntas, respuestas],
  );

  const horasAnuales = useMemo(() => horasPorAnio(agentes), [agentes]);
  const semanas = useMemo(
    () => semanasDeImplementacion(agentes.length),
    [agentes.length],
  );

  const elegirRubro = useCallback((id: string) => {
    setRubroId(id);
    setRespuestas({});
    setTextoLibre("");
    setCompleto(false);
  }, []);

  const responder = useCallback((preguntaId: string, siONo: boolean) => {
    setRespuestas((previas) => ({ ...previas, [preguntaId]: siONo }));
  }, []);

  const olvidar = useCallback((preguntaId: string) => {
    setRespuestas((previas) => {
      const { [preguntaId]: _descartada, ...resto } = previas;
      return resto;
    });
  }, []);

  const escribirTextoLibre = useCallback((texto: string) => {
    setTextoLibre(texto);
  }, []);

  const marcarCompleto = useCallback(() => setCompleto(true), []);

  const reiniciar = useCallback(() => {
    setRubroId(null);
    setRespuestas({});
    setTextoLibre("");
    setCompleto(false);
  }, []);

  /**
   * Redacta el resultado en prosa corta. Este texto se precarga en el campo
   * del formulario de contacto: lo contestado arriba no hay que volver a
   * explicarlo.
   */
  const resumenParaContacto = useCallback(() => {
    if (!rubro) return "";

    const lineas: string[] = [];
    lineas.push(`Rubro: ${rubro.nombre}.`);

    if (agentes.length > 0) {
      lineas.push(
        `Procesos a automatizar (${agentes.length}): ${agentes
          .map((a) => `${a.nombre} — ${a.descripcion}`)
          .join(" / ")}`,
      );
      lineas.push(
        `Horas anuales involucradas, estimadas: ${horasAnuales.toLocaleString("es")}.`,
      );
      lineas.push(`Plazo estimado de implementación: ${semanas} semanas.`);
    } else {
      lineas.push("Todavía no hay procesos marcados en el diagnóstico.");
    }

    if (textoLibre.trim()) {
      lineas.push(`Proceso que consume más tiempo: ${textoLibre.trim()}`);
    }

    return lineas.join("\n");
  }, [rubro, agentes, horasAnuales, semanas, textoLibre]);

  const valor: ContextoDiagnostico = {
    rubroId,
    respuestas,
    textoLibre,
    completo,
    codigoReferido,
    rubro,
    preguntas,
    agentes,
    horasAnuales,
    semanas,
    elegirRubro,
    responder,
    olvidar,
    escribirTextoLibre,
    marcarCompleto,
    reiniciar,
    resumenParaContacto,
  };

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

/** Hook de acceso. Falla fuerte si alguien lo usa fuera del proveedor. */
export function useDiagnostico(): ContextoDiagnostico {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useDiagnostico se usa dentro de <ProveedorDiagnostico>");
  }
  return contexto;
}
