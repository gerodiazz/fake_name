/**
 * VIDEO DE UN CASO
 *
 * Una grabación real vale más que cualquier ilustración, así que cuando existe
 * va arriba, apenas contado el problema y la solución. Pero no a costa de la
 * página:
 *
 *   · `preload="none"` cuando hay poster — el navegador no baja un solo byte
 *     del video hasta que alguien lo pide. Lo único que carga es la imagen.
 *     Sin poster no queda otra que `preload="metadata"`: hace falta el primer
 *     cuadro para no dejar un rectángulo negro.
 *   · `width` y `height` reales, para que el lugar esté reservado antes de que
 *     cargue el poster y el texto de abajo no salte.
 *   · Sin JavaScript. Los controles nativos alcanzan: play, pausa, barra y
 *     pantalla completa, con teclado y lector de pantalla incluidos. Un
 *     reproductor propio sería otra dependencia y peores atajos.
 *
 * Si todavía no hay archivo, el componente no dibuja nada. No hay recuadro
 * gris ni "video próximamente": es la misma regla que el resto del sitio.
 *
 * `vertical` es para grabaciones de pantalla de teléfono. A ancho completo
 * ocuparían tres pantallas de alto en desktop, así que se topan a 360px y el
 * texto queda al lado en las pantallas que dan.
 */

import type { Media } from "@/lib/casos";

export default function VideoCaso({ media }: { media: Media | null }) {
  if (!media?.fuente) return null;

  return (
    <figure className="mt-10">
      <div className={media.vertical ? "max-w-[360px]" : "max-w-[720px]"}>
        <video
          controls
          preload={media.poster ? "none" : "metadata"}
          playsInline
          width={media.ancho}
          height={media.alto}
          {...(media.poster ? { poster: media.poster } : {})}
          className="hairline h-auto w-full border-[0.5px] bg-superficie"
        >
          <source src={media.fuente} type="video/mp4" />
          {media.descripcion}
        </video>
      </div>

      <figcaption className="mt-4 max-w-[46ch]">
        <span className="kicker kicker-tinta">Grabación real</span>
        <span className="mt-2 block text-[14px] leading-relaxed text-tinta-2">
          {media.titulo}. {media.descripcion}
        </span>
      </figcaption>
    </figure>
  );
}
