/**
 * Image download service
 * Provides functionality to download chart elements as PNG images
 */

import html2canvas from 'html2canvas';
import { DOWNLOAD_CONFIG } from '../constants/download.js';
import { createTempContainer, safeQuerySelector } from '../utils/dom.js';
import { processSVG } from '../utils/svg-processor.js';
import { processContentText, processDataTable } from '../utils/content-processor.js';

export interface DownloadOptions {
  filename?: string;
  includeContent?: boolean;
  includeDataTable?: boolean;
}

export class ImageDownloadService {
  private tempContainer: HTMLDivElement | null = null;

  /**
   * Downloads an element as a PNG image
   */
  async downloadElementAsImage(
    elementId: string, 
    options: DownloadOptions = {}
  ): Promise<boolean> {
    const { 
      filename = 'chart-download.png',
      includeContent = true,
      includeDataTable = true
    } = options;

    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return false;
    }
    
    try {
      await this.processElements(element, { includeContent, includeDataTable });
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

  /**
   * Processes all elements to be included in the image
   */
  private async processElements(
    element: HTMLElement, 
    options: { includeContent: boolean; includeDataTable: boolean }
  ): Promise<void> {
    this.tempContainer = createTempContainer();

    const components = [
      { 
        element: safeQuerySelector(element, 'svg'), 
        processor: processSVG,
        enabled: true
      },
      { 
        element: document.getElementById('content-text'), 
        processor: processContentText,
        enabled: options.includeContent
      },
      { 
        element: document.getElementById('data-table'), 
        processor: processDataTable,
        enabled: options.includeDataTable
      }
    ];

    for (const { element: comp, processor, enabled } of components) {
      if (comp && enabled) {
        await processor(comp, this.tempContainer);
      }
    }

    document.body.appendChild(this.tempContainer);
  }

  /**
   * Captures the temporary container as a canvas
   */
  private async captureCanvas(): Promise<HTMLCanvasElement> {
    if (!this.tempContainer) {
      throw new Error('No container to capture');
    }
    
    return await html2canvas(this.tempContainer, DOWNLOAD_CONFIG.canvas);
  }

  /**
   * Downloads a canvas as a file
   */
  private downloadCanvas(canvas: HTMLCanvasElement, filename: string): void {
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

  /**
   * Cleans up temporary elements
   */
  private cleanup(): void {
    if (this.tempContainer?.parentNode) {
      document.body.removeChild(this.tempContainer);
    }
    this.tempContainer = null;
  }
}

// Create singleton instance
const imageDownloadService = new ImageDownloadService();

/**
 * Downloads an element as an image (convenience function)
 */
export async function downloadElementAsImage(
  elementId: string, 
  filename = 'chart-download.png'
): Promise<boolean> {
  return await imageDownloadService.downloadElementAsImage(elementId, { filename });
}

export default imageDownloadService;
