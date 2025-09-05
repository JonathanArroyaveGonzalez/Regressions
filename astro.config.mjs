
import { defineConfig } from 'astro/config';

// Para deployment en Vercel, siempre usamos '/' como base
// Para GitHub Pages, usamos '/Regressions/'
const deploymentTarget = process.env.VERCEL_ENV || process.env.VERCEL ? 'vercel' : 'github';

export default defineConfig({
  base: deploymentTarget === 'vercel' ? '/' : '/Regressions/',
  // ...otras opciones...
});