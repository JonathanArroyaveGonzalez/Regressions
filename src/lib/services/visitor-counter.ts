/**
 * Visitor counter service
 * Provides a unified approach to tracking site visits
 */

export interface VisitorCounterConfig {
  namespace: string;
  apiUrl: string;
  updateInterval: number;
}

export interface VisitorCount {
  count: number;
  source: 'api' | 'local' | 'hybrid';
}

export class VisitorCounterService {
  private config: VisitorCounterConfig;
  private elementId: string;
  private currentCount: VisitorCount | null = null;

  constructor(elementId: string, config: Partial<VisitorCounterConfig> = {}) {
    this.elementId = elementId;
    this.config = {
      namespace: 'physics-lab',
      apiUrl: 'https://api.countapi.xyz',
      updateInterval: 60000, // 1 minute
      ...config
    };
  }

  /**
   * Initializes the visitor counter
   */
  async initialize(): Promise<void> {
    const element = document.getElementById(this.elementId);
    if (!element) {
      console.warn(`Visitor counter element with id "${this.elementId}" not found`);
      return;
    }

    element.textContent = 'Loading...';

    try {
      // Incrementa globalmente cada vez que alguien entra
      const count = await this.incrementVisitorCount();
      this.currentCount = { count, source: 'api' };
      this.updateDisplay(this.currentCount);

      // Actualiza periódicamente desde la API
      setInterval(() => this.refreshCount(), this.config.updateInterval);
    } catch (error) {
      console.error('Failed to initialize visitor counter:', error);
      element.textContent = '👁️ Error';
    }
  }

  /**
   * Incrementa el contador global en la API
   */
  private async incrementVisitorCount(): Promise<number> {
    const response = await fetch(
      `${this.config.apiUrl}/hit/${this.config.namespace}/visits`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.value;
  }

  /**
   * Refresca el contador global (sin incrementarlo)
   */
  private async refreshCount(): Promise<void> {
    try {
      const response = await fetch(
        `${this.config.apiUrl}/get/${this.config.namespace}/visits`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const count = data.value;

      if (count !== this.currentCount?.count) {
        this.currentCount = { count, source: 'api' };
        this.updateDisplay(this.currentCount);
      }
    } catch (error) {
      console.warn('Failed to refresh visitor count:', error);
    }
  }

  /**
   * Updates the display with current count
   */
  private updateDisplay(count: VisitorCount): void {
    const element = document.getElementById(this.elementId);
    if (!element) return;

    element.textContent = `👁️ ${count.count}`;
    element.title = 'Global visitor count';
  }

  /**
   * Gets the current count value
   */
  getCurrentCount(): VisitorCount | null {
    return this.currentCount;
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
