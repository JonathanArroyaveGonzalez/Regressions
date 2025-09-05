export function getBaseUrl() {
  // En el servidor (durante build), verificamos las variables de entorno
  if (typeof window === 'undefined') {
    // Durante el build, verificamos si es Vercel
    const isVercel = process.env.VERCEL === '1' || 
                     process.env.VERCEL_ENV || 
                     process.env.VERCEL_URL ||
                     process.env.NODE_ENV === 'production';
    
    return isVercel ? '/' : '/Regressions/';
  }
  
  // En el cliente (navegador), verificamos la URL
  const isVercel = window.location.hostname.includes('vercel.app') ||
                   window.location.hostname.includes('physical-regressions');
  
  return isVercel ? '/' : '/Regressions/';
}
