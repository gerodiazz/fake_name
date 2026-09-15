# Datos pendientes

Todo lo que el sitio todavía no puede decir porque el dato no existe. El
criterio está en `src/lib/sitio.ts`: un dato que no es real no se rellena con
uno inventado. Queda en `null` o en un arreglo vacío, y la parte del sitio que
lo mostraría **no se renderiza** hasta que exista.

Por eso hoy no hay ningún "PLACEHOLDER" ni ninguna "Foto pendiente" visible en
la página, aunque falten datos.

---

## Bloqueante para publicar

| Qué falta | Dónde se carga | Qué pasa mientras tanto |
|---|---|---|
| **Nombre real de la marca** | `src/lib/sitio.ts:18` | Aparece "fakename" en la barra, el hero, el pie, los metadatos y la imagen de Open Graph. Se cambia en un solo lugar. |
| **Email de contacto** | `src/lib/sitio.ts:40` | **Es el único dato de relleno que sigue a la vista**, porque es a donde el formulario manda el mensaje. Con `hola@fakename.com.ar` el sitio no recibe nada. |
| **Nombres, trayectoria y fotos de los socios** | `src/lib/sitio.ts:91` | La sección "Quiénes estamos detrás" muestra solo lo que sí es cierto: que son dos y que el desarrollo no se terceriza. Al cargar los dos objetos aparecen las fichas y se completan los `founders` de los datos estructurados. Las fotos van en `/public/socios/`. |

## No bloquea, pero el sitio dice menos de lo que podría

| Qué falta | Dónde se carga | Qué se enciende al cargarlo |
|---|---|---|
| **Teléfono / WhatsApp** | `src/lib/sitio.ts:46` y `:48` | Aparece el enlace de WhatsApp en el bloque de contacto directo. Hoy no se muestra ninguno: antes había un número falso. |
| **Ciudad** | `src/lib/sitio.ts:50` | Aparece debajo del contacto directo. |
| **Enlace de agendamiento** (Cal.com, Calendly) | `src/lib/sitio.ts:57` | Aparece el botón "Agendar directo" arriba del formulario, y el botón del formulario baja a tinta para no competir. Resuelve el pedido de que contactar no sea una barrera. |
| **Rango de inversión real** | `src/lib/condiciones.ts:89` | Aparece una línea arriba del formulario con el orden de magnitud del trabajo, para que alguien pueda descartarse solo. Escribir algo como `"Los proyectos arrancan en USD 2.000"`. |
| **Tramos de presupuesto del formulario** | `src/components/secciones/Contacto.tsx:40` | Hoy son tramos tentativos en dólares. Hay que confirmarlos contra el precio real del trabajo. |
| **Primer caso real** | `src/lib/casos.ts:48` | Aparece la sección "Casos" completa, con su número de expediente, y las secciones siguientes se corren solas. El tipo `Caso` ya pide problema, proceso anterior, solución, resultado, tiempo y herramientas. |
| **Demos propias** | `src/lib/casos.ts:70` | Aparecen dentro de la misma sección, separadas de los casos y rotuladas como lo que son: construidas por el estudio, sin cliente detrás. |

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
- No inventa porcentajes de ahorro, ni resultados, ni "de dos días a dos
  minutos". El único número es la estimación de horas que el propio visitante
  arma en el diagnóstico, y el resultado dice de dónde sale: de rangos de
  partida, no de datos de su empresa.
- No simula un motor de evaluación que no existe. El resultado del diagnóstico
  ordena lo que el visitante contestó; no le pone un puntaje.
- No muestra placeholders como si fueran contenido.
