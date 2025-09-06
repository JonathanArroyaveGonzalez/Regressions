/**
 * Physics Lab Library
 * Main entry point for all library functions
 */

// Services
export { ImageDownloadService, downloadElementAsImage } from './services/image-download.js';
export { VisitorCounterService, initializeVisitorCounter } from './services/visitor-counter.js';
export { ThemeService, initializeTheme } from './services/theme.js';

// Utils
export { getBaseUrl, getEnvironmentConfig, createUrl } from './utils/base-url.js';
export { applyStyles, removeDarkTheme, safeQuerySelector, createTempContainer, forceWhiteTheme } from './utils/dom.js';

// Constants
export { DOWNLOAD_CONFIG } from './constants/index.js';

// Types
export type { DownloadOptions } from './services/image-download.js';
export type { VisitorCounterConfig } from './services/visitor-counter.js';
export type { Theme, ThemeConfig } from './services/theme.js';
export type { DownloadConfig } from './constants/download.js';
