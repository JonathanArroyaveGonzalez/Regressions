
import { defineConfig } from 'astro/config';

// Detecta si está en Vercel
const isVercel = !!process.env.VERCEL;

export default defineConfig({
  base: isVercel ? '/' : '/Regressions/', // Cambia '/Regressions/' si tu repo tiene otro nombre
  // ...otras opciones...
});