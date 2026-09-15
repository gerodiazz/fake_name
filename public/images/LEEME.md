# Fotos de los socios

Acá van las dos fotografías de la sección "Quiénes estamos detrás".

    matheo-telesca.jpg
    geronimo-justel.jpg

Después hay que apuntar a ellas desde `src/lib/sitio.ts`, en `SOCIOS`:

```ts
{ nombre: "Matheo Telesca", rol: null, foto: "/images/matheo-telesca.jpg", linkedin: null }
```

**Formato:** JPG o WebP, vertical (relación 4:5), al menos 800 × 1000 px.
Retrato normal, luz pareja, sin filtros ni fondos armados. El sitio las
recorta con `object-cover`, así que la cara conviene que esté centrada.

**Mientras falte la de alguno de los dos, la sección no dibuja ningún recuadro
de foto.** O están las dos, o no está ninguna: un marco vacío al lado de una
foto rompe la simetría, y esa simetría es justamente lo que la sección tiene
que transmitir.

Estas fotos son las únicas imágenes del sitio: no hay stock, ni avatares, ni
ilustraciones. No las reemplaces por una imagen generada.
