/** Script temporal de verificación. No forma parte del sitio. */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("capturas", { recursive: true });
const navegador = await chromium.launch({ channel: "chrome" });

/**
 * Recorre el diagnóstico hasta el resultado. Con `yaEligioRubro` se salta el
 * paso 0, para el caso en que la prueba ya lo hizo por su cuenta.
 */
async function hastaElResultado(pagina, yaEligioRubro = false) {
  if (!yaEligioRubro) {
    await pagina.getByRole("button", { name: "Salud y consultorios" }).click();
    await pagina.waitForTimeout(1500);
  }
  for (const t of ["Sí, todo el día", "Sí, seguido", "Sí, una por una"]) {
    await pagina.getByRole("button", { name: t }).click();
    await pagina.waitForTimeout(950);
  }
  for (let i = 0; i < 3; i += 1) {
    const no = pagina.locator("main button", { hasText: /^no/ }).first();
    if (await no.isVisible().catch(() => false)) {
      await no.click();
      await pagina.waitForTimeout(600);
    }
  }
  await pagina.waitForTimeout(1800);
}

/* ============ 1 · Con movimiento ============ */
{
  const pagina = await navegador.newPage({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
  });
  await pagina.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await hastaElResultado(pagina);

  // Todas las fichas tienen que tener la misma sombra en reposo.
  const sombras = await pagina.evaluate(() =>
    [...document.querySelectorAll("li.ficha")].map(
      (li) => getComputedStyle(li).boxShadow,
    ),
  );
  console.log("sombras de las fichas:", JSON.stringify(sombras, null, 1));

  await pagina.locator("#diagnostico").scrollIntoViewIfNeeded();
  await pagina.waitForTimeout(400);
  await pagina.screenshot({
    path: "capturas/mov-final-resultado.png",
    clip: { x: 0, y: 150, width: 375, height: 420 },
  });
  await pagina.close();
}

/* ============ 2 · Sin movimiento ============ */
{
  const contexto = await navegador.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const pagina = await contexto.newPage();
  await pagina.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // La palabra del hero no debe rotar.
  const leer = () =>
    pagina.locator(".palabra-mascara .palabra-pieza").first().innerText();
  const a = await leer();
  await pagina.waitForTimeout(2800);
  const b = await leer();
  console.log("\n[reduce] palabra:", JSON.stringify([a, b]), a === b ? "QUIETA ✓" : "ROTA ✗");

  // La cortina no debe montarse nunca.
  await pagina.getByRole("button", { name: "Salud y consultorios" }).click();
  await pagina.waitForTimeout(120);
  console.log("[reduce] cortinas montadas:", await pagina.locator(".barrido").count());

  // Y el cambio de estado tiene que haber sido inmediato.
  console.log(
    "[reduce] primera pregunta visible:",
    await pagina.getByText("¿La secretaria vive dando").isVisible(),
  );

  await hastaElResultado(pagina, true);
  const estado = await pagina.evaluate(() => {
    const ficha = document.querySelector("li.ficha");
    const linea = document.querySelector(".linea-dibujada");
    return {
      fichaTransform: ficha ? getComputedStyle(ficha).transform : null,
      fichaSombra: ficha ? getComputedStyle(ficha).boxShadow : null,
      lineaVisible: linea
        ? getComputedStyle(linea, "::before").transform
        : null,
      numero: document.querySelector(".numero-gigante")?.textContent?.slice(0, 40),
    };
  });
  console.log("[reduce] estado final:", JSON.stringify(estado));
  await pagina.close();
}

await navegador.close();
