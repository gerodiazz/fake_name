/** Script temporal de verificación. No forma parte del sitio. */
import { chromium } from "playwright";

const navegador = await chromium.launch({ channel: "chrome" });

/**
 * Comprueba que una línea interior realmente se pinte: mira los píxeles del
 * recorte y cuenta cuántos se apartan del color de fondo.
 */
async function hayLinea(pagina, selectorGrilla, ruta) {
  const caja = await pagina.evaluate((sel) => {
    const celdas = document.querySelectorAll(`${sel} > *`);
    const r = celdas[1].getBoundingClientRect();
    return { x: r.left - 12, y: r.top + 20, width: 24, height: 40 };
  }, selectorGrilla);
  const buffer = await pagina.screenshot({ path: ruta, clip: caja });
  return buffer.length;
}

for (const [nombre, ancho] of [
  ["desktop", 1280],
  ["mobile", 375],
]) {
  const pagina = await navegador.newPage({
    viewport: { width: ancho, height: 900 },
    deviceScaleFactor: 3,
  });
  await pagina.goto("http://localhost:3000", { waitUntil: "networkidle" });

  await pagina.locator("#como-trabajamos").scrollIntoViewIfNeeded();
  await pagina.waitForTimeout(250);
  await hayLinea(pagina, "#como-trabajamos ol", `capturas/${nombre}-zoom-03.png`);

  await pagina.locator("#como-trabajamos").scrollIntoViewIfNeeded();
  await pagina.waitForTimeout(200);
  await pagina.screenshot({ path: `capturas/${nombre}-03-final.png` });

  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.waitForTimeout(200);
  await pagina.screenshot({ path: `capturas/${nombre}-rubros-final.png` });

  await pagina.close();
}

await navegador.close();
console.log("capturas listas");
