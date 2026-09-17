# Video de los casos

Acá vive el material visual de los casos reales.

    medex-turno-whatsapp.mp4   384×832, 2:20, 16 MB   ← cargado
    medex-turno-whatsapp.jpg   el poster, 48 KB       ← cargado

Es la grabación del agente de **Grupo Medex** sacando un turno por WhatsApp, y
está apuntada desde `src/lib/casos.ts`, en el caso `grupo-medex`, campo
`media`:

```ts
media: {
  titulo: "El agente sacando un turno por WhatsApp",
  descripcion: "Grabación real de la conversación: la consulta, el turno agendado y la confirmación.",
  fuente: "/videos/medex-turno-whatsapp.mp4",
  poster: "/videos/medex-turno-whatsapp.jpg",
  vertical: true,
},
```

**Mientras `fuente` sea `null`, el bloque de video no se dibuja.** No hay
recuadro gris ni "video próximamente": es la misma regla que el resto del
sitio.

**Formato del video:** MP4 (H.264 + AAC), que es lo que reproduce cualquier
navegador sin plugins. Es una grabación de pantalla de teléfono, así que va
vertical (9:16) y el componente la topa a 360px de ancho. Sin audio necesario:
la conversación se lee.

**Peso:** el archivo actual pesa 16 MB para 2:20 a 384×832, que es mucho para
esa resolución. No castiga la carga de la página —con `preload="none"` no se
baja hasta que alguien toca play, y lo único que pesa de entrada son los 48 KB
del poster— pero sí a quien le da play desde el celular. Vale la pena
recomprimirlo con ffmpeg y, de paso, recortarlo a la parte que importa:

    ffmpeg -i medex-turno-whatsapp.mp4 -t 60 -vcodec libx264 -crf 28            -preset slow -acodec aac -b:a 64k medex-turno-whatsapp-nuevo.mp4

Dos minutos y veinte es largo para una demo: la consulta, el turno y la
confirmación se ven en menos de un minuto.

**Poster:** un cuadro de la propia grabación, del mismo tamaño que el video. Es
lo que se ve antes del play y lo único que pesa en la carga inicial. El actual
es el segundo 25 —el agente presentándose— justamente porque no tiene ningún
dato personal a la vista. Si se cambia el video, hay que sacar un cuadro nuevo
con el mismo criterio.

**Datos a la vista:** la conversación es real. No hay datos de pacientes —el
turno lo saca Matheo probando el agente— pero en el video sí se ven, a partir
del minuto uno, **su DNI y su casilla de correo personal**. El poster no los
muestra y solo aparecen si alguien le da play. Aun así conviene taparlos o
recortar el video antes de dejarlo así: una vez publicado, queda publicado.
