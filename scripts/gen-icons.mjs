// 从 logo.svg 生成 PWA 所需的 PNG 图标
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, '../public/logo.svg');
const outDir = resolve(__dirname, '../public');

const svg = readFileSync(svgPath);

const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 512, name: 'maskable-512x512.png', padding: 0.18 },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 32, name: 'favicon-32x32.png' },
];

for (const s of sizes) {
  let pipeline = sharp(svg, { density: 384 }).resize(s.size, s.size, { fit: 'contain' });
  if (s.padding) {
    // maskable 需要安全区：先在彩色背景上居中放置
    const inner = await sharp(svg, { density: 384 })
      .resize(Math.round(s.size * (1 - s.padding * 2)), Math.round(s.size * (1 - s.padding * 2)), { fit: 'contain' })
      .toBuffer();
    pipeline = sharp({
      create: {
        width: s.size,
        height: s.size,
        channels: 4,
        background: { r: 0x1f, g: 0x57, b: 0xf5, alpha: 1 },
      },
    }).composite([{ input: inner, gravity: 'center' }]);
  }
  await pipeline.png().toFile(resolve(outDir, s.name));
  console.log('✓', s.name);
}
console.log('Icons generated.');
