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
| **Foto, rol y LinkedIn de cada socio** | `src/lib/sitio.ts`, en `SOCIOS` | Los nombres ya están: Matheo Telesca y Geronimo Justel. Falta el resto, y cada cosa se dibuja sola cuando existe. **Fotos:** en `/public/images/` (ver `LEEME.md` ahí); mientras falte la de alguno de los dos, la sección no dibuja ningún recuadro. **LinkedIn:** la URL completa del perfil; sin ella no hay ícono. **Rol:** una o dos palabras. Nada de esto se inventa. |

## No bloquea, pero el sitio dice menos de lo que podría

| Qué falta | Dónde se carga | Qué se enciende al cargarlo |
|---|---|---|
| **Teléfono / WhatsApp** | `src/lib/sitio.ts:46` y `:48` | Aparece el enlace de WhatsApp en el bloque de contacto directo. Hoy no se muestra ninguno: antes había un número falso. |
| **Ciudad** | `src/lib/sitio.ts:50` | Aparece debajo del contacto directo. |
| **Enlace de agendamiento** (Cal.com, Calendly) | `src/lib/sitio.ts:57` | Aparece el botón "Agendar directo" arriba del formulario, y el botón del formulario baja a tinta para no competir. Resuelve el pedido de que contactar no sea una barrera. |
| **Rango de inversión real** | `src/lib/condiciones.ts:89` | Aparece una línea arriba del formulario con el orden de magnitud del trabajo, para que alguien pueda descartarse solo. Escribir algo como `"Los proyectos arrancan en USD 2.000"`. |
| **Tramos de presupuesto del formulario** | `src/components/secciones/Contacto.tsx:40` | Hoy son tramos tentativos en dólares. Hay que confirmarlos contra el precio real del trabajo. |
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
- **Condiciones** (`src/lib/condiciones.ts`): proyecto cerrado y pago único,
  entrega del repositorio con documentación y credenciales, servicios externos
  pagados directo al proveedor, 90 días de corrección, sin dependencia de una
  cuenta del estudio, precio y plazo cerrados antes de empezar.
- **Control, errores y datos** (`src/lib/control.ts`): las seis de la lista son
  capacidades que **pueden** formar parte de una implementación, y están
  escritas así a propósito. Lo que sí se afirma siempre son las dos de
  `POSICION`: qué se decide antes de construir y qué pasa con los datos.
  Revisar que esas dos sean ciertas en todos los proyectos.
- **Ejemplos por industria** (`src/lib/ejemplos.ts`): son procesos que existen
  en casi cualquier empresa del rubro y están rotulados como ejemplos, no como
  trabajos hechos. Confirmar que los seis se puedan construir tal como están
  descritos: si alguno no, se saca o se reescribe.
- **Casos reales** (`src/lib/casos.ts`): los tres clientes autorizaron que se
  muestre su nombre. No hay ningún porcentaje, ninguna hora ahorrada y ningún
  monto recuperado, porque no se midieron, y las páginas de caso lo dicen con
  todas las letras. La etapa de validaciones de PAMI figura **en curso**:
  cuando se entregue, cambiar `estado` a `"entregada"`.
- **Qué es un agente** (`src/lib/agente.ts`): la definición y las dos columnas
  de la comparación. No dice que el agente "piensa" ni que reemplaza personas,
  y dice cuándo conviene una automatización simple en vez de un agente.
- **Plazos** (`src/components/secciones/ComoTrabajamos.tsx`): 45 minutos de
  diagnóstico, 5 días hábiles para la propuesta, 2 a 8 semanas de
  implementación, 1 semana de entrega.
- **FAQ** (`src/components/secciones/Faq.tsx`): qué no está incluido y qué pasa
  después de los 90 días.
- **Ejemplo conceptual** (`src/lib/demostracion.ts`): el diálogo y los datos
  son inventados y la sección lo rotula arriba de la pieza ("Ejemplo
  conceptual · así podría funcionar"). Si alguna vez se reemplaza por una
  conversación real, hace falta el permiso del cliente.

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
