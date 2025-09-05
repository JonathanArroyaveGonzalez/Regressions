
import { defineConfig } from 'astro/config';

// Detectar Vercel de múltiples formas
const isVercel = !!(
  process.env.VERCEL ||
  process.env.VERCEL_ENV ||
  process.env.VERCEL_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.VERCEL_GIT_PROVIDER ||
  // También verificamos si el comando incluye vercel
  process.argv.some(arg => arg.includes('vercel')) ||
  // O si está en un entorno de producción sin ser GitHub Actions
  (process.env.NODE_ENV === 'production' && !process.env.GITHUB_ACTIONS)
);

console.log('Variables de entorno Vercel:');
console.log('VERCEL:', process.env.VERCEL);
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
console.log('VERCEL_URL:', process.env.VERCEL_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS);
console.log('Detectado como Vercel:', isVercel);

export default defineConfig({
  base: isVercel ? '/' : '/Regressions/',
  // ...otras opciones...
});