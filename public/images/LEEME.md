# Fotos de los socios

Acá viven las dos fotografías de la sección "Quiénes estamos detrás".

    matheo-telesca.jpg    640×640, cargada
    geronimo-justel.jpg   640×640, cargada

Están apuntadas desde `src/lib/sitio.ts`, en `SOCIOS`:

```ts
{ nombre: "Matheo Telesca", rol: "AI Automation Engineer", foto: "/images/matheo-telesca.jpg", linkedin: "https://www.linkedin.com/in/matheo-telesca-084a20209/" }
```

**Formato:** JPG o WebP, vertical (relación 4:5), al menos 800 × 1000 px.
Retrato normal, luz pareja, sin filtros ni fondos armados. El sitio las
recorta con `object-cover`, así que la cara conviene que esté centrada.

Las dos actuales son cuadradas de 640 × 640 y no llegan a ese mínimo. Entran
igual porque las dos caras están centradas: el encuadre a 4:5 les come un 10%
de cada costado y no toca la cara. Se ven bien, pero en una pantalla retina
quedan apenas blandas, y la de Matheo tiene menos aire arriba que la de
Geronimo, así que las dos caras no están exactamente a la misma escala. Si
algún día hay retratos verticales de 800 × 1000, reemplazarlas mejora las dos
cosas. Si no, así están bien.

**Si un día hace falta corregir el encuadre** sin cambiar el archivo, se le
agrega `object-position` a la `<Image>` de `src/components/secciones/Socios.tsx`
(por ejemplo `object-[50%_35%]` para subir el recorte).

**Extensión:** si el archivo baja como `.jfif` —Windows y Chrome lo hacen a
veces—, es un JPEG igual: alcanza con renombrarlo a `.jpg`, no hay que
recodificar nada.

**Si algún día falta la de alguno de los dos, la sección no dibuja ningún
recuadro.** O están las dos, o no está ninguna: un marco vacío al lado de una
foto rompe la simetría, y esa simetría es justamente lo que la sección tiene
que transmitir.

Estas fotos son las únicas imágenes del sitio: no hay stock, ni avatares, ni
ilustraciones. No las reemplaces por una imagen generada.
