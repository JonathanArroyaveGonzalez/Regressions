export function getBaseUrl() {
  // Detecta si está en Vercel
  const isVercel = typeof process !== 'undefined' && 
                  (!!process.env.VERCEL || !!process.env.VERCEL_ENV);
  
  // Si es Vercel, usa '/', si no usa '/Regressions/' para GitHub Pages
  return isVercel ? '/' : '/Regressions/';
}
