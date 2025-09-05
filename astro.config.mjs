
import { defineConfig } from 'astro/config';

// Verifica si estamos en un entorno de Vercel mirando la URL
const isVercel = process.env.VERCEL === '1' || 
                 process.env.VERCEL_ENV || 
                 process.env.VERCEL_URL || 
                 process.env.NEXT_PUBLIC_VERCEL_URL;

console.log('Entorno de despliegue:', isVercel ? 'Vercel' : 'GitHub Pages');

export default defineConfig({
  base: isVercel ? '/' : '/Regressions/',
  // ...otras opciones...
});