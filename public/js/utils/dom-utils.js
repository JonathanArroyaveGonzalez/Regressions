import { THEME_CONFIG } from '../config/styles.js';

export function applyStyles(element, styles, useImportant = true) {
  if (!element || !styles) return;
  
  const priority = useImportant ? 'important' : '';
  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(property, value, priority);
  });
}

export function removeDarkTheme(element) {
  if (!element) return;
  
  THEME_CONFIG.darkClasses.forEach(cls => element.classList.remove(cls));
  THEME_CONFIG.darkAttributes.forEach(attr => element.removeAttribute(attr));
}

export function setAttributes(element, attributes) {
  if (!element || !attributes) return;
  
  Object.entries(attributes).forEach(([attr, value]) => {
    element.setAttribute(attr, value);
  });
}

export function safeQuerySelector(parent, selector) {
  try {
    return parent?.querySelector(selector) || null;
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return null;
  }
}

export function safeQuerySelectorAll(parent, selector) {
  try {
    return parent?.querySelectorAll(selector) || [];
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return [];
  }
}
