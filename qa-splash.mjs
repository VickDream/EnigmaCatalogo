// qa-splash.mjs — sample splash overlay state over time in production build
export default async function run(page, ui) {
  const samples = [];
  await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
  const t0 = Date.now();
  for (let i = 0; i < 20; i++) {
    const state = await page.evaluate(() => {
      const el = document.querySelector('[class*="blurOverlay"]');
      if (!el) return { present: false };
      const cs = getComputedStyle(el);
      return {
        present: true,
        opacity: cs.opacity,
        backdrop: cs.backdropFilter,
        display: cs.display,
      };
    });
    samples.push({ t: Date.now() - t0, ...state });
    await page.waitForTimeout(200);
  }
  return samples;
}
