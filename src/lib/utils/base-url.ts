/**
 * Utility for handling base URLs across different deployment environments
 */

interface EnvironmentConfig {
  isVercel: boolean;
  isGitHubPages: boolean;
  baseUrl: string;
}

/**
 * Detects the current deployment environment and returns appropriate base URL
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  // Server-side detection during build
  if (typeof window === 'undefined') {
    // Durante desarrollo, usar raíz
    if (process.env.NODE_ENV === 'development') {
      return {
        isVercel: false,
        isGitHubPages: false,
        baseUrl: '/'
      };
    }
    
    const isVercel = !!(
      process.env.VERCEL === '1' || 
      process.env.VERCEL_ENV || 
      process.env.VERCEL_URL
    );
    
    return {
      isVercel,
      isGitHubPages: !isVercel,
      baseUrl: isVercel ? '/' : '/Regressions/'
    };
  }
  
  // Client-side detection
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isVercel = hostname.includes('vercel.app') || hostname.includes('physical-regressions');
  
  return {
    isVercel,
    isGitHubPages: !isVercel && !isLocalhost,
    baseUrl: (isLocalhost || isVercel) ? '/' : '/Regressions/'
  };
}

/**
 * Gets the base URL for the current environment
 */
export function getBaseUrl(): string {
  return getEnvironmentConfig().baseUrl;
}

/**
 * Creates a full URL by combining base URL with a path
 */
export function createUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
}
