/**
 * Content processing utilities for download functionality
 */

import { DOWNLOAD_CONFIG } from '../constants/index.js';
import { applyStyles, cloneElementWithStyles, forceWhiteTheme } from '../utils/dom.js';

/**
 * Processes text content for image download with forced white background
 */
export function processContentText(contentElement: Element, container: HTMLElement): void {
  const textClone = cloneElementWithStyles(contentElement);
  applyStyles(textClone, DOWNLOAD_CONFIG.styles.text);
  forceWhiteTheme(textClone);
  container.appendChild(textClone);
}

/**
 * Processes data table for image download with forced white background and black text
 */
export function processDataTable(tableElement: Element, container: HTMLElement): void {
  const tableClone = cloneElementWithStyles(tableElement) as HTMLTableElement;
  
  // Apply table styles with forced colors
  applyStyles(tableClone, DOWNLOAD_CONFIG.styles.table);
  forceWhiteTheme(tableClone);
  
  // Style table cells with forced colors
  const cells = tableClone.querySelectorAll('td, th');
  cells.forEach(cell => {
    const isHeader = cell.tagName.toLowerCase() === 'th';
    const cellStyles = isHeader 
      ? { ...DOWNLOAD_CONFIG.styles.tableCell, ...DOWNLOAD_CONFIG.styles.tableHeader }
      : DOWNLOAD_CONFIG.styles.tableCell;
    
    applyStyles(cell as HTMLElement, cellStyles);
    
    // Force text color for visibility
    if (isHeader) {
      (cell as HTMLElement).style.setProperty('color', '#ffffff', 'important');
    } else {
      (cell as HTMLElement).style.setProperty('color', '#000000', 'important');
      (cell as HTMLElement).style.setProperty('background-color', '#ffffff', 'important');
    }
  });
  
  // Create wrapper for table with forced white background
  const tableWrapper = document.createElement('div');
  applyStyles(tableWrapper, {
    'margin-top': '20px',
    'text-align': 'center',
    'background-color': '#ffffff',
    'color': '#000000'
  });
  
  tableWrapper.appendChild(tableClone);
  container.appendChild(tableWrapper);
}
