import html2canvas from "html2canvas";
import { STYLES, CANVAS_CONFIG } from './config/styles.js';
import { applyStyles, removeDarkTheme, safeQuerySelector } from './utils/dom-utils.js';
import { processSVG } from './modules/svg-processor.js';
import { processContentText, processDataTable } from './modules/content-processor.js';

class ImageDownloader {
  constructor() {
    this.tempContainer = null;
  }

  async downloadElementAsImage(elementId, filename = 'descarga.png') {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return false;
    }
    
    try {
      await this.processElements(element);
      const canvas = await this.captureCanvas();
      this.downloadCanvas(canvas, filename);
      return true;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    } finally {
      this.cleanup();
    }
  }

  async processElements(element) {
    this.tempContainer = this.createTempContainer();

    const components = [
      { element: safeQuerySelector(element, 'svg'), processor: processSVG },
      { element: document.getElementById('content-text'), processor: processContentText },
      { element: document.getElementById('data-table'), processor: processDataTable }
    ];

    for (const { element: comp, processor } of components) {
      if (comp) {
        await processor(comp, this.tempContainer);
      }
    }

    document.body.appendChild(this.tempContainer);
  }

  createTempContainer() {
    const container = document.createElement('div');
    applyStyles(container, STYLES.container);
    removeDarkTheme(container);
    container.setAttribute('data-force-light-theme', 'true');
    return container;
  }

  async captureCanvas() {
    return await html2canvas(this.tempContainer, CANVAS_CONFIG);
  }

  downloadCanvas(canvas, filename) {
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob from canvas');
      }
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  cleanup() {
    if (this.tempContainer && this.tempContainer.parentNode) {
      document.body.removeChild(this.tempContainer);
    }
    this.tempContainer = null;
  }
}

// Create singleton instance
const imageDownloader = new ImageDownloader();

// Export the main function for backward compatibility
export async function downloadElementAsImage(elementId, filename = 'descarga.png') {
  return await imageDownloader.downloadElementAsImage(elementId, filename);
}

// Export the class for advanced usage
export { ImageDownloader };
