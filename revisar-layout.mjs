/**
 * Script temporal de verificación visual. No forma parte del sitio.
 * Usa el Chrome ya instalado en el sistema, no descarga navegadores.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = "http://localhost:3000";
const SALIDA = "capturas";
await mkdir(SALIDA, { recursive: true });

const navegador = await chromium.launch({ channel: "chrome" });

/** Mide si el documento se desborda horizontalmente. */
const medirDesborde = () =>
  ({
    scroll: document.documentElement.scrollWidth,
    cliente: document.documentElement.clientWidth,
    culpables: [...document.querySelectorAll("*")]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 8)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return `${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 60)} → right ${Math.round(r.right)}`;
      }),
  });

for (const [nombre, ancho, alto] of [
  ["mobile", 375, 812],
  ["desktop", 1280, 900],
]) {
  const pagina = await navegador.newPage({
    viewport: { width: ancho, height: alto },
    deviceScaleFactor: 2,
  });

  const errores = [];
  pagina.on("console", (m) => m.type() === "error" && errores.push(m.text()));
  pagina.on("pageerror", (e) => errores.push(String(e)));

  await pagina.goto(BASE, { waitUntil: "networkidle" });

  // 1 · Home con el selector de rubro.
  await pagina.screenshot({ path: `${SALIDA}/${nombre}-01-hero.png` });

  // 2 · Recorrido: elegir Salud y contestar que sí tres veces.
  await pagina.getByRole("button", { name: "Salud y consultorios" }).click();
  await pagina.waitForTimeout(500);
  await pagina.screenshot({ path: `${SALIDA}/${nombre}-02-pregunta.png` });

  for (const texto of ["Sí, todo el día", "Sí, seguido", "Sí, una por una"]) {
    await pagina.getByRole("button", { name: texto }).click();
    await pagina.waitForTimeout(900);
  }
  await pagina.screenshot({
    path: `${SALIDA}/${nombre}-03-equipo.png`,
    fullPage: true,
  });

  // 3 · Terminar el recorrido para llegar al resultado.
  for (let i = 0; i < 3; i += 1) {
    const no = pagina.locator("main button", { hasText: /^no/ }).first();
    if (await no.isVisible().catch(() => false)) {
      await no.click();
      await pagina.waitForTimeout(500);
    }
  }
  await pagina.waitForTimeout(1600);
  await pagina.screenshot({
    path: `${SALIDA}/${nombre}-04-resultado.png`,
    fullPage: true,
  });

  const desbordeDiagnostico = await pagina.evaluate(medirDesborde);

  // 4 · Calculadora de referidos, cruzando el segundo escalón.
  await pagina.locator("#slider-referidos").evaluate((el) => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    ).set;
    setter.call(el, "16");
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await pagina.waitForTimeout(600);
  await pagina.locator("#referidos").scrollIntoViewIfNeeded();
  await pagina.screenshot({ path: `${SALIDA}/${nombre}-05-calculadora.png` });

  const desbordeReferidos = await pagina.evaluate(medirDesborde);

  // 5 · Página completa, para revisar las secciones 03 a 07.
  await pagina.screenshot({
    path: `${SALIDA}/${nombre}-06-completa.png`,
    fullPage: true,
  });

  console.log(`\n=== ${nombre} (${ancho}px) ===`);
  console.log("desborde tras diagnóstico:", JSON.stringify(desbordeDiagnostico));
  console.log("desborde en referidos:", JSON.stringify(desbordeReferidos));
  console.log("errores de consola:", errores.length ? errores : "ninguno");

  await pagina.close();
}

await navegador.close();
