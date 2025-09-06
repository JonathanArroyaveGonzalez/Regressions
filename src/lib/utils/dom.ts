/**
 * DOM manipulation utilities for download functionality
 */

import { DOWNLOAD_CONFIG } from '../constants/index.js';

/**
 * Applies styles to an element with proper type checking and !important override
 */
export function applyStyles(element: HTMLElement, styles: Record<string, string>): void {
  Object.entries(styles).forEach(([property, value]) => {
    // Ensure all styles use !important for download forcing
    const forceImportant = value.includes('!important') ? value : `${value} !important`;
    element.style.setProperty(property, forceImportant, 'important');
  });
}

/**
 * Forces white background and black text for download
 */
export function forceWhiteTheme(element: HTMLElement): void {
  // Remove all dark theme classes and attributes
  removeDarkTheme(element);
  
  // Force white background and black text
  element.style.setProperty('background', '#ffffff', 'important');
  element.style.setProperty('background-color', '#ffffff', 'important');
  element.style.setProperty('color', '#000000', 'important');
  
  // Apply to all children recursively
  const allElements = element.querySelectorAll('*') as NodeListOf<HTMLElement>;
  allElements.forEach(child => {
    child.style.setProperty('color', '#000000', 'important');
    child.style.setProperty('background-color', 'transparent', 'important');
    
    // Special handling for text elements
    if (child.tagName.toLowerCase() === 'text' || child.getAttribute('fill')) {
      child.style.setProperty('fill', '#000000', 'important');
    }
  });
}

/**
 * Removes dark theme classes and attributes from an element
 */
export function removeDarkTheme(element: HTMLElement): void {
  // Remove dark theme classes
  DOWNLOAD_CONFIG.theme.darkClasses.forEach(className => {
    element.classList.remove(className);
  });
  
  // Remove dark theme attributes
  DOWNLOAD_CONFIG.theme.darkAttributes.forEach(attr => {
    element.removeAttribute(attr);
  });
  
  // Add light theme indicators
  element.setAttribute('data-force-light-theme', 'true');
  element.classList.add('download-light-theme');
}

/**
 * Safe query selector that handles potential null results
 */
export function safeQuerySelector(parent: Element, selector: string): Element | null {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.warn(`Failed to query selector "${selector}":`, error);
    return null;
  }
}

/**
 * Creates a temporary container for image processing with forced white theme
 */
export function createTempContainer(): HTMLDivElement {
  const container = document.createElement('div');
  applyStyles(container, DOWNLOAD_CONFIG.styles.container);
  forceWhiteTheme(container);
  return container;
}

/**
 * Clones an element with deep copy of styles and forces white theme
 */
export function cloneElementWithStyles(element: Element): HTMLElement {
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Copy computed styles to inline styles
  const computedStyle = window.getComputedStyle(element);
  for (let i = 0; i < computedStyle.length; i++) {
    const property = computedStyle[i];
    const value = computedStyle.getPropertyValue(property);
    clone.style.setProperty(property, value);
  }
  
  // Force white theme on clone
  forceWhiteTheme(clone);
  
  return clone;
}
