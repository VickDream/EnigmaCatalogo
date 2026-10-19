export default async function run(page, ui) {
  // Recargar y capturar el estado temprano del splash
  const shots = [];
  const t0 = Date.now();
  await page.reload({ waitUntil: 'commit' });
  for (const delay of [300, 800, 1500, 2500]) {
    const elapsed = Date.now() - t0;
    if (elapsed < delay) await page.waitForTimeout(delay - elapsed);
    const has = await page.evaluate(() => !!document.querySelector('[class*="blurOverlay"]'));
    // Contenido real detrás (tarjetas del catálogo) y opacidad del splash
    const info = await page.evaluate(() => {
      const splash = document.querySelector('[class*="blurOverlay"]');
      const cards = document.querySelectorAll('[class*="cardNormal"], [class*="cardLarge"], [class*="cardTall"], [class*="cardWide"]').length;
      const bg = getComputedStyle(document.querySelector('.app-background') || document.body).backgroundImage.slice(0, 60);
      return { splash: !!splash, splashOpacity: splash ? getComputedStyle(splash).opacity : null, cards, bg };
    });
    await page.screenshot({ path: `qa-${delay}.png` });
    shots.push({ delay, ...info });
  }
  return shots;
}
