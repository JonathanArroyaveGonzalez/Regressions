
import { defineConfig } from 'astro/config';

// Configuración simple y definitiva
// Para Vercel, no necesitamos base (será '/')
// Para GitHub Pages, se cambiará en el workflow
export default defineConfig({
  base: '/',
});