/**
 * POST /api/reporte — manda el diagnóstico por email
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ HOY ESTE ENDPOINT NO PUEDE ENVIAR NADA, Y LO DICE.                   │
 * │                                                                       │
 * │ El proyecto no tiene servicio de correo. Sin RESEND_API_KEY y         │
 * │ EMAIL_REMITENTE configuradas, la ruta responde 503 con un código      │
 * │ claro y la pantalla le dice al visitante que el envío todavía no está │
 * │ disponible, ofreciéndole copiar el reporte.                           │
 * │                                                                       │
 * │ Lo que NO hace es contestar 200 y mostrar "listo, te lo enviamos".    │
 * │ Un acuse de recibo falso es peor que no tener la función: el          │
 * │ visitante se va esperando un correo que no existe.                    │
 * │                                                                       │
 * │ Al cargar las dos variables, el envío empieza a funcionar sin tocar   │
 * │ una línea de código.                                                  │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * QUÉ SE GUARDA: nada. No hay base de datos y este endpoint no persiste el
 * email ni las respuestas: arma el correo, lo manda y termina. Es lo que dice
 * la sección de condiciones del sitio, y tiene que seguir siendo cierto.
 *
 * QUÉ RECIBE: el rubro y las respuestas crudas, no el texto del reporte. El
 * cuerpo del correo se arma acá (ver src/lib/reporte.ts). Si el cliente
 * mandara el texto ya escrito, cualquiera podría hacer que el sitio envíe lo
 * que quiera desde una dirección nuestra.
 */

import { armarReporte, type EntradaReporte } from "@/lib/reporte";
import { SITIO } from "@/lib/sitio";

/** Validación de email: la misma que hace el navegador, sin sorpresas. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** El servicio de correo. Se llama por HTTP: no hace falta una dependencia. */
const RESEND = "https://api.resend.com/emails";

type Cuerpo = Partial<EntradaReporte> & { email?: string };

export async function POST(pedido: Request) {
  let cuerpo: Cuerpo;
  try {
    cuerpo = await pedido.json();
  } catch {
    return Response.json({ error: "cuerpo-invalido" }, { status: 400 });
  }

  const email = (cuerpo.email ?? "").trim();
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "email-invalido" }, { status: 400 });
  }

  if (typeof cuerpo.rubroId !== "string" || typeof cuerpo.respuestas !== "object") {
    return Response.json({ error: "diagnostico-invalido" }, { status: 400 });
  }

  const reporte = armarReporte({
    rubroId: cuerpo.rubroId,
    respuestas: (cuerpo.respuestas ?? {}) as Record<string, boolean>,
    textoLibre: typeof cuerpo.textoLibre === "string" ? cuerpo.textoLibre : "",
  });

  if (!reporte) {
    return Response.json({ error: "rubro-desconocido" }, { status: 400 });
  }

  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.EMAIL_REMITENTE;

  if (!clave || !remitente) {
    // 503 y no 500: el servicio no está configurado, no es que falló.
    return Response.json(
      { error: "envio-no-configurado", reporte: reporte.texto },
      { status: 503 },
    );
  }

  try {
    const respuesta = await fetch(RESEND, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: [email],
        reply_to: SITIO.email,
        subject: reporte.asunto,
        text: reporte.texto,
      }),
    });

    if (!respuesta.ok) {
      // El detalle del proveedor queda en el log del servidor, no en la
      // respuesta: puede traer información de la cuenta.
      console.error("Resend respondió", respuesta.status, await respuesta.text());
      return Response.json({ error: "envio-fallido" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("No se pudo llamar al servicio de correo", error);
    return Response.json({ error: "envio-fallido" }, { status: 502 });
  }
}
