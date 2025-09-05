export function getBaseUrl() {
  // Detecta si está en Vercel mirando la URL del navegador
  const isVercel = typeof window !== 'undefined' && 
                  window.location.hostname.includes('vercel.app');
  
  // Si está en Vercel, usa '/', si no usa '/Regressions/' para GitHub Pages
  return isVercel ? '/' : '/Regressions/';
}
