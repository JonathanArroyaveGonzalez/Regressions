export function getBaseUrl() {
  // Detecta si está en Vercel
  return import.meta.env.PROD && !import.meta.env.DEV && typeof window !== 'undefined' && 
         window.location.hostname.includes('vercel.app') ? '/' : '/Regressions/';
}
