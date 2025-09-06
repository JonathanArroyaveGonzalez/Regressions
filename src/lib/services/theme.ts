/**
 * Theme management service
 * Handles dark/light theme switching and persistence
 */

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  storageKey: string;
  toggleButtonId: string;
  autoDetectPreference: boolean;
}

export class ThemeService {
  private config: ThemeConfig;
  private currentTheme: Theme = 'auto';
  private observers: Set<(theme: Theme) => void> = new Set();

  constructor(config: Partial<ThemeConfig> = {}) {
    this.config = {
      storageKey: 'theme-preference',
      toggleButtonId: 'theme-toggle-btn',
      autoDetectPreference: true,
      ...config
    };
  }

  /**
   * Initializes the theme service
   */
  initialize(): void {
    this.loadSavedTheme();
    this.applyTheme();
    this.setupToggleButton();
    this.setupMediaQueryListener();
  }

  /**
   * Gets the current theme
   */
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * Sets the theme
   */
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.saveTheme();
    this.applyTheme();
    this.notifyObservers();
  }

  /**
   * Toggles between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.getEffectiveTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Gets the effective theme (resolves 'auto' to actual theme)
   */
  getEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'auto') {
      return this.getSystemPreference();
    }
    return this.currentTheme === 'dark' ? 'dark' : 'light';
  }

  /**
   * Adds an observer for theme changes
   */
  addObserver(callback: (theme: Theme) => void): () => void {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  /**
   * Loads saved theme from storage
   */
  private loadSavedTheme(): void {
    try {
      const saved = localStorage.getItem(this.config.storageKey) as Theme;
      if (saved && ['light', 'dark', 'auto'].includes(saved)) {
        this.currentTheme = saved;
      }
    } catch (error) {
      console.warn('Failed to load saved theme:', error);
    }
  }

  /**
   * Saves theme to storage
   */
  private saveTheme(): void {
    try {
      localStorage.setItem(this.config.storageKey, this.currentTheme);
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }

  /**
   * Applies the theme to the document
   */
  private applyTheme(): void {
    const html = document.documentElement;
    const effectiveTheme = this.getEffectiveTheme();
    
    // Remove existing theme classes
    html.classList.remove('light-theme', 'dark-theme');
    
    // Add current theme class
    html.classList.add(`${effectiveTheme}-theme`);
    
    // Update theme color meta tag
    this.updateThemeColorMeta(effectiveTheme);
    
    // Update toggle button
    this.updateToggleButton(effectiveTheme);
  }

  /**
   * Updates the theme color meta tag
   */
  private updateThemeColorMeta(theme: 'light' | 'dark'): void {
    let metaTag = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      document.head.appendChild(metaTag);
    }
    
    metaTag.content = theme === 'dark' ? '#13151a' : '#f7f7f7';
  }

  /**
   * Updates the toggle button appearance
   */
  private updateToggleButton(theme: 'light' | 'dark'): void {
    const button = document.getElementById(this.config.toggleButtonId);
    if (button) {
      button.textContent = theme === 'dark' ? '☀️' : '🌙';
      button.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    }
  }

  /**
   * Sets up the theme toggle button
   */
  private setupToggleButton(): void {
    const button = document.getElementById(this.config.toggleButtonId);
    if (button) {
      button.addEventListener('click', () => this.toggleTheme());
    }
  }

  /**
   * Sets up media query listener for auto theme detection
   */
  private setupMediaQueryListener(): void {
    if (!this.config.autoDetectPreference) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'auto') {
        this.applyTheme();
        this.notifyObservers();
      }
    });
  }

  /**
   * Gets the system theme preference
   */
  private getSystemPreference(): 'light' | 'dark' {
    if (!this.config.autoDetectPreference) return 'light';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Notifies all observers of theme changes
   */
  private notifyObservers(): void {
    this.observers.forEach(callback => {
      try {
        callback(this.currentTheme);
      } catch (error) {
        console.warn('Theme observer error:', error);
      }
    });
  }
}

// Create singleton instance
const themeService = new ThemeService();

/**
 * Initialize theme service (convenience function)
 */
export function initializeTheme(config: Partial<ThemeConfig> = {}): ThemeService {
  const service = new ThemeService(config);
  service.initialize();
  return service;
}

export default themeService;
