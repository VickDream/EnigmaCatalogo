 export default async function run(page) {
  const result = { prod_splash_seen: false, prod_splash_visibleMs: null, prod_splash_onNav: false };

  // 1) Cargar el sitio de producción y observar el splash
  await page.goto('https://d77b8350.enigmacatalogo.pages.dev/', { waitUntil: 'load' });
  const t0 = Date.now();
  while (Date.now() - t0 < 8000) {
    const splash = await page.evaluate(() => !!document.querySelector('[class*="blurOverlay"]'));
    if (splash) {
      result.prod_splash_seen = true;
      result.prod_splash_visibleMs = Date.now() - t0;
      break;
    }
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(2500);

  // 2) Navegar con el router interno (click en Trabajos Realizados) y observar el splash
  const link = page.locator('a[href="/galeria"]').first();
  if (await link.count()) {
    await link.click();
    const t1 = Date.now();
    while (Date.now() - t1 < 4000) {
      const splash = await page.evaluate(() => !!document.querySelector('[class*="blurOverlay"]'));
      if (splash) { result.prod_splash_onNav = true; break; }
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(1500);
  }

  // 3) Cargar localhost y repetir
  await page.goto('http://localhost:5173/', { waitUntil: 'load' });
  const t2 = Date.now();
  while (Date.now() - t2 < 8000) {
    const splash = await page.evaluate(() => !!document.querySelector('[class*="blurOverlay"]'));
    if (splash) {
      result.local_splash_seen = true;
      result.local_splash_visibleMs = Date.now() - t2;
      break;
    }
    await page.waitForTimeout(50);
  }

  return result;
}
