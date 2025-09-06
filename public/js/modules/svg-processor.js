import { Canvg } from "canvg";
import { SVG_STYLES } from '../config/styles.js';
import { applyStyles, removeDarkTheme, setAttributes, safeQuerySelectorAll } from '../utils/dom-utils.js';

export async function processSVG(svg, container) {
  if (!svg || !container) return;

  try {
    const svgWithStyles = await addInlineStyles(svg);
    const canvas = await createSVGCanvas(svg, svgWithStyles);
    const img = createImageFromCanvas(canvas);
    container.appendChild(img);
  } catch (error) {
    console.error('Error processing SVG:', error);
    throw error;
  }
}

async function createSVGCanvas(svg, svgWithStyles) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const { width, height } = getSVGDimensions(svg);
  canvas.width = width;
  canvas.height = height;

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const v = await Canvg.from(ctx, svgWithStyles);
  await v.render();
  
  return canvas;
}

function createImageFromCanvas(canvas) {
  const img = document.createElement('img');
  img.src = canvas.toDataURL();
  applyStyles(img, { display: 'block', 'margin-bottom': '20px' }, false);
  return img;
}

export function getSVGDimensions(svg) {
  const viewBox = svg.getAttribute('viewBox');
  if (viewBox) {
    const [, , width, height] = viewBox.split(' ').map(Number);
    return { width, height };
  }
  const bbox = svg.getBoundingClientRect();
  return { width: bbox.width, height: bbox.height };
}

async function addInlineStyles(svg) {
  const clone = svg.cloneNode(true);
  
  applyStyles(clone, { 'background-color': '#ffffff', color: '#000000' }, false);
  clone.setAttribute('data-theme', 'light');
  removeDarkTheme(clone);

  const elements = safeQuerySelectorAll(clone, '*');
  
  elements.forEach(element => {
    const tagName = element.tagName.toLowerCase();
    removeDarkTheme(element);
    applySVGElementStyles(element, tagName);
    copyComputedStyles(element);
  });

  applyFinalTextOverrides(clone);
  
  return new XMLSerializer().serializeToString(clone);
}

function applySVGElementStyles(element, tagName) {
  const styleHandlers = {
    text: () => {
      applyStyles(element, SVG_STYLES.text);
      setAttributes(element, { fill: '#000000', color: '#000000' });
    },
    circle: () => {
      applyStyles(element, SVG_STYLES.circle);
      setAttributes(element, { fill: 'steelblue' });
    },
    path: () => handlePathElement(element),
    line: () => {
      applyStyles(element, SVG_STYLES.line);
      setAttributes(element, { stroke: '#000000' });
    },
    g: () => handleGroupElement(element)
  };

  const handler = styleHandlers[tagName];
  if (handler) handler();
}

function handlePathElement(element) {
  const stroke = element.getAttribute('stroke') || element.style.stroke;
  
  if (stroke === 'red' || stroke?.includes('red')) {
    applyStyles(element, SVG_STYLES.regressionLine);
    setAttributes(element, { stroke: 'red', fill: 'none' });
  } else {
    applyStyles(element, SVG_STYLES.axis);
    setAttributes(element, { stroke: '#000000', fill: 'none' });
  }
}

function handleGroupElement(element) {
  removeDarkTheme(element);
  applyStyles(element, { color: '#000000' });
  
  if (isAxisGroup(element)) {
    safeQuerySelectorAll(element, 'line, path').forEach(child => {
      applyStyles(child, { stroke: '#000000' });
      child.setAttribute('stroke', '#000000');
    });
    safeQuerySelectorAll(element, 'text').forEach(child => {
      applyStyles(child, SVG_STYLES.text);
      setAttributes(child, { fill: '#000000', color: '#000000' });
    });
  }
}

function isAxisGroup(element) {
  const className = element.getAttribute('class') || '';
  return element.classList.contains('tick') || 
         element.classList.contains('axis') ||
         className.includes('axis') ||
         className.includes('tick');
}

function copyComputedStyles(element) {
  try {
    const computedStyles = window.getComputedStyle(element);
    const importantProps = [
      'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin',
      'text-anchor', 'dominant-baseline'
    ];
    
    importantProps.forEach(prop => {
      const value = computedStyles.getPropertyValue(prop);
      if (value && value !== 'none' && value !== 'auto') {
        element.style[prop] = value;
      }
    });
  } catch (error) {
    console.warn('Could not copy computed styles:', error);
  }
}

function applyFinalTextOverrides(clone) {
  const selectors = {
    text: ['text', '.tick text', '.axis text', '[class*="tick"] text', '[class*="axis"] text'],
    lines: ['.tick line', '.axis line', '.domain', '[class*="tick"] line', '[class*="axis"] line']
  };
  
  selectors.text.forEach(selector => {
    safeQuerySelectorAll(clone, selector).forEach(text => {
      applyStyles(text, SVG_STYLES.text);
      setAttributes(text, { fill: '#000000', color: '#000000' });
      removeDarkTheme(text);
    });
  });

  selectors.lines.forEach(selector => {
    safeQuerySelectorAll(clone, selector).forEach(line => {
      applyStyles(line, SVG_STYLES.axis);
      setAttributes(line, { stroke: '#000000', fill: 'none' });
    });
  });
}
