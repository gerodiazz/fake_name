# Datos pendientes

Todo lo que el sitio todavía no puede decir porque el dato no existe. El
criterio está en `src/lib/sitio.ts`: un dato que no es real no se rellena con
uno inventado. Queda en `null` o en un arreglo vacío, y la parte del sitio que
lo mostraría **no se renderiza** hasta que exista.

Por eso hoy no hay ningún "PLACEHOLDER" ni ninguna "Foto pendiente" visible en
la página, aunque falten datos.

---

> La marca es **TELESCA JUSTEL**, con monograma **TJ**. El wordmark, el
> monograma y el favicon viven en `src/components/marca/Marca.tsx` y
> `src/app/icon.svg`; los datos, en `src/lib/sitio.ts`.

## Bloqueante para publicar

| Qué falta | Dónde se carga | Qué pasa mientras tanto |
|---|---|---|
| **Dominio y email reales** | `src/lib/sitio.ts` (`url` y `email`) | La marca ya es Telesca Justel, pero `telescajustel.com` es un supuesto: hay que registrar el dominio real y crear la casilla. **Es el único dato de relleno que sigue a la vista**, porque es a donde el formulario manda el mensaje: hasta que exista, el sitio no recibe nada. |

## No bloquea, pero el sitio dice menos de lo que podría

| Qué falta | Dónde se carga | Qué se enciende al cargarlo |
|---|---|---|
| **Teléfono / WhatsApp** | `src/lib/sitio.ts:46` y `:48` | Aparece el enlace de WhatsApp en el bloque de contacto directo. Hoy no se muestra ninguno: antes había un número falso. |
| **Ciudad** | `src/lib/sitio.ts:50` | Aparece debajo del contacto directo. |
| **Enlace de agendamiento** (Cal.com, Calendly) | `src/lib/sitio.ts:57` | Aparece el botón "Agendar directo" arriba del formulario, y el botón del formulario baja a tinta para no competir. Resuelve el pedido de que contactar no sea una barrera. |
| **Retratos de mayor resolución** | `/public/images/` (ver `LEEME.md` ahí) | Las dos fotos actuales son cuadradas de 640 × 640 y la sección las encuadra a 4:5. Se ven bien porque las caras están centradas, pero quedan apenas blandas en retina y las dos no están a la misma escala. Verticales de 800 × 1000 arreglan las dos cosas. No bloquea nada. |
| **Recomprimir el video de Medex** | `/public/videos/` (ver `LEEME.md` ahí) | Ya está publicado y funcionando, pero pesa 16 MB para 2:20 a 384×832. Con `preload="none"` no afecta la carga de la página —solo se baja si alguien toca play— así que no bloquea nada. Recortarlo a un minuto y recomprimirlo lo dejaría en un par de megas. En el mismo paso conviene tapar el DNI y el correo personal que se ven pasado el minuto uno. |
| **Demos propias** | `src/lib/casos.ts`, en `DEMOS` | Aparecen dentro de la sección de casos, separadas de ellos y rotuladas como lo que son: construidas por el estudio, sin cliente detrás. |

---

## Variables de entorno

Se configuran en Vercel, en *Settings → Environment Variables*. Ninguna va al
navegador: las tres se leen solo del lado del servidor.

| Variable | Para qué | Sin ella |
|---|---|---|
| `RESEND_API_KEY` | Enviar el reporte del diagnóstico por email, con [Resend](https://resend.com). La clave se crea en su panel. | El endpoint `/api/reporte` responde 503 y la pantalla dice, con todas las letras, que el envío todavía no está disponible; al visitante se le ofrece copiar el reporte. **No se simula un envío.** |
| `EMAIL_REMITENTE` | La dirección desde la que sale ese correo, con el dominio verificado en Resend. Por ejemplo `diagnostico@telescajustel.com`. | Igual que arriba: las dos tienen que estar. |
| `NEXT_PUBLIC_URL_SITIO` | El dominio de producción, para los enlaces absolutos, el sitemap y las imágenes de Open Graph. | Se usa `https://telescajustel.com`, que todavía es un supuesto. |

Si mañana se prefiere otro proveedor de correo, lo único que cambia es la
llamada `fetch` de `src/app/api/reporte/route.ts`: el reporte se arma aparte,
en `src/lib/reporte.ts`.

## Agenda

Todavía no hay ninguna contratada, así que el botón "Agendar llamada para
revisar este diagnóstico" lleva al formulario de contacto, que ya llega
precargado con el diagnóstico. No se inventó una URL.

Al contratar Cal.com o Calendly, se completa `agenda` en `src/lib/sitio.ts`:

```ts
agenda: { url: "https://cal.com/telescajustel/45min", plataforma: "cal" }
```

A partir de ahí, el resumen del diagnóstico —rubro, procesos marcados, horas
de referencia y plazo— viaja solo hasta el calendario: en `notes` si es
Cal.com, en `a1` si es Calendly, que son los mecanismos oficiales de precarga
de cada plataforma. En Calendly hay que crear una pregunta personalizada en el
evento para que `a1` tenga dónde caer.

---

## Para confirmar entre los dos socios

Son compromisos que el sitio afirma y que hay que poder sostener frente a un
cliente que los reclame.

- **Horas del diagnóstico** (`src/lib/diagnostico.ts`, campo `horasSemanales`
  de cada agente): es el único número del sitio y sale de rangos de partida,
  no de un estudio. El sitio lo dice así en el resultado, pero conviene
  revisar los valores contra la experiencia real: es el dato que un cliente
  puede discutir en la reunión.
- **Condiciones** (`src/lib/condiciones.ts`, en `RESUMEN_CONDICIONES`): pago
  único, código y datos en manos del cliente, sin suscripción obligatoria. Era
  una sección entera con cuatro compromisos; hoy es el renglón que cierra el
  CTA final y el que aparece en cada página de caso. Es lo único que el sitio
  afirma sobre la parte comercial, y hay que poder sostenerlo tal cual.
- **Derivación a una persona** (`src/components/secciones/QueHacemos.tsx`): la
  última línea de la sección afirma que el sistema deriva a una persona cuando
  el caso se sale de lo previsto. Antes era una sección entera sobre permisos,
  reglas y registro; ahora es un renglón, y hay que poder sostenerlo en todos
  los proyectos.
- **Casos reales** (`src/lib/casos.ts`): los tres clientes autorizaron que se
  muestre su nombre. No hay ningún porcentaje, ninguna hora ahorrada y ningún
  monto recuperado, porque no se midieron, y las páginas de caso lo dicen con
  todas las letras. La etapa de validaciones de PAMI figura **en curso**:
  cuando se entregue, cambiar `estado` a `"entregada"`.
- **45 minutos, sin costo** (`src/components/secciones/Contacto.tsx`): es el
  único plazo que sigue escrito en la home. Las cuatro etapas del trabajo —con
  sus 5 días de propuesta y sus 2 a 8 semanas de implementación— salieron de la
  landing: se cuentan en la reunión y se cierran en la propuesta.

---

## Lo que el sitio no va a hacer

- No inventa casos, logos, testimonios ni métricas de resultados de terceros.
  Los tres casos publicados están construidos y entregados, y cada dato de esas
  páginas lo puede confirmar el cliente que lo protagonizó. Un testimonio sin
  texto exacto no se publica: queda en `null`.
- No inventa porcentajes de ahorro, ni resultados, ni "de dos días a dos
  minutos". El único número es la estimación de horas que el propio visitante
  arma en el diagnóstico, y el resultado dice de dónde sale: de rangos de
  partida, no de datos de su empresa.
- No simula un motor de evaluación que no existe. El resultado del diagnóstico
  ordena lo que el visitante contestó; no le pone un puntaje.
- No muestra placeholders como si fueran contenido.
