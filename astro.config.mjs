
import { defineConfig } from 'astro/config';

// Forzar base '/' para Vercel
// Vercel siempre servirá desde la raíz del dominio
const base = '/';

console.log('=== ASTRO CONFIG DEBUG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL);
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);
console.log('VERCEL_URL:', process.env.VERCEL_URL);
console.log('CI:', process.env.CI);
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS);
console.log('Using base:', base);
console.log('========================');

export default defineConfig({
  base: base,
  // ...otras opciones...
});