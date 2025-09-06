/**
 * Visitor counter service using uCounter.com
 * Provides a simple and reliable visitor tracking
 */

export interface VisitorCounterConfig {
  counterId: string;
  statUrl: string;
}

export class VisitorCounterService {
  private config: VisitorCounterConfig;
  private elementId: string;

  constructor(elementId: string, config: Partial<VisitorCounterConfig> = {}) {
    this.elementId = elementId;
    this.config = {
      counterId: 'https://yo.ucounter.com/25/kqlf/09/s/7/',
      statUrl: 'https://ucounter.com/stat.js',
      ...config
    };
  }

  /**
   * Initializes the visitor counter using uCounter.com
   */
  async initialize(): Promise<void> {
    const element = document.getElementById(this.elementId);
    if (!element) {
      console.warn(`Visitor counter element with id "${this.elementId}" not found`);
      return;
    }

    try {
      // Create container for uCounter
      element.innerHTML = '';
      element.style.textAlign = 'center';

      // Load the counter script
      await this.loadCounterScript();
      
      // Load the stat script
      await this.loadStatScript();

    } catch (error) {
      console.error('Failed to initialize visitor counter:', error);
      element.innerHTML = '<span title="Visitor counter temporarily unavailable">👁️ --</span>';
    }
  }

  /**
   * Load the uCounter main script
   */
  private loadCounterScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.config.counterId;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load counter script'));
      
      const element = document.getElementById(this.elementId);
      if (element) {
        element.appendChild(script);
      }
    });
  }

  /**
   * Load the uCounter stat script
   */
  private loadStatScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.config.statUrl;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load stat script'));
      
      document.head.appendChild(script);
    });
  }
}

/**
 * Convenience function to initialize a visitor counter
 */
export function initializeVisitorCounter(
  elementId = 'visitor-counter',
  config: Partial<VisitorCounterConfig> = {}
): VisitorCounterService {
  const service = new VisitorCounterService(elementId, config);
  service.initialize();
  return service;
}
