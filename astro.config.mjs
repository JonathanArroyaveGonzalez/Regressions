
import { defineConfig } from 'astro/config';

// Configuración dinámica basada en el entorno
function getBaseUrl() {
  // Durante el development, usar raíz
  if (process.env.NODE_ENV === 'development') {
    return '/';
  }
  
  // Durante el build, verificamos el entorno
  const isVercel = !!(
    process.env.VERCEL === '1' || 
    process.env.VERCEL_ENV || 
    process.env.VERCEL_URL
  );
  
  return isVercel ? '/' : '/Regressions/';
}

export default defineConfig({
  base: getBaseUrl(),
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
});