/**
 * SVG processing utilities for image download
 */

import { DOWNLOAD_CONFIG } from '../constants/index.js';
import { applyStyles, cloneElementWithStyles, forceWhiteTheme } from '../utils/dom.js';

/**
 * Processes SVG elements for image download with forced white background
 */
export async function processSVG(svgElement: Element, container: HTMLElement): Promise<void> {
  const svgClone = cloneElementWithStyles(svgElement) as unknown as SVGElement;
  
  // Apply consistent styles to SVG elements and force white theme
  applySVGStyles(svgClone);
  forceWhiteTheme(svgClone as unknown as HTMLElement);
  
  // Create wrapper div for the SVG
  const svgWrapper = document.createElement('div');
  applyStyles(svgWrapper, {
    'margin-bottom': '20px',
    'text-align': 'center',
    'background-color': '#ffffff',
    'color': '#000000'
  });
  
  svgWrapper.appendChild(svgClone);
  container.appendChild(svgWrapper);
}

/**
 * Applies consistent styles to SVG elements and their children with forced colors
 */
function applySVGStyles(svgElement: SVGElement): void {
  // Force white background on SVG itself
  svgElement.style.setProperty('background', '#ffffff', 'important');
  svgElement.style.setProperty('background-color', '#ffffff', 'important');
  
  // Apply styles to text elements with forced black color
  const textElements = svgElement.querySelectorAll('text');
  textElements.forEach(text => {
    Object.entries(DOWNLOAD_CONFIG.svg.text).forEach(([prop, value]) => {
      if (prop === 'fill' || prop === 'color') {
        text.setAttribute(prop, '#000000');
        text.style.setProperty(prop, '#000000', 'important');
      } else {
        text.style.setProperty(prop, value.replace(' !important', ''), 'important');
      }
    });
  });
  
  // Apply styles to circles (data points) with forced colors
  const circles = svgElement.querySelectorAll('circle');
  circles.forEach(circle => {
    Object.entries(DOWNLOAD_CONFIG.svg.circle).forEach(([prop, value]) => {
      if (prop === 'fill') {
        circle.setAttribute('fill', 'steelblue');
        circle.style.setProperty('fill', 'steelblue', 'important');
      } else {
        circle.style.setProperty(prop, value.replace(' !important', ''), 'important');
      }
    });
  });
  
  // Apply styles to lines (axes and regression) with forced black for axes
  const lines = svgElement.querySelectorAll('line');
  lines.forEach(line => {
    const isAxis = line.classList.contains('axis') || 
                   line.getAttribute('class')?.includes('axis') ||
                   line.getAttribute('stroke') === '#000' ||
                   line.getAttribute('stroke') === 'black';
    
    if (isAxis) {
      Object.entries(DOWNLOAD_CONFIG.svg.axis).forEach(([prop, value]) => {
        if (prop === 'stroke') {
          line.setAttribute('stroke', '#000000');
          line.style.setProperty('stroke', '#000000', 'important');
        } else {
          line.style.setProperty(prop, value.replace(' !important', ''), 'important');
        }
      });
    } else {
      Object.entries(DOWNLOAD_CONFIG.svg.line).forEach(([prop, value]) => {
        if (prop === 'stroke') {
          line.setAttribute('stroke', '#000000');
          line.style.setProperty('stroke', '#000000', 'important');
        } else {
          line.style.setProperty(prop, value.replace(' !important', ''), 'important');
        }
      });
    }
  });
  
  // Apply styles to paths (regression lines) with forced red color
  const paths = svgElement.querySelectorAll('path');
  paths.forEach(path => {
    const isRegression = path.classList.contains('regression') ||
                        path.getAttribute('class')?.includes('regression') ||
                        path.getAttribute('stroke') === 'red';
    
    if (isRegression) {
      Object.entries(DOWNLOAD_CONFIG.svg.regressionLine).forEach(([prop, value]) => {
        if (prop === 'stroke') {
          path.setAttribute('stroke', 'red');
          path.style.setProperty('stroke', 'red', 'important');
        } else {
          path.style.setProperty(prop, value.replace(' !important', ''), 'important');
        }
      });
    } else {
      // For non-regression paths, make them black
      path.setAttribute('stroke', '#000000');
      path.style.setProperty('stroke', '#000000', 'important');
    }
  });
  
  // Handle any remaining elements that might have color
  const allSvgElements = svgElement.querySelectorAll('*');
  allSvgElements.forEach(element => {
    // Force visible colors for download
    if (element.getAttribute('fill') === 'currentColor' || 
        element.getAttribute('fill') === 'white' || 
        element.getAttribute('fill') === '#fff' ||
        element.getAttribute('fill') === '#ffffff') {
      element.setAttribute('fill', '#000000');
    }
    
    if (element.getAttribute('stroke') === 'currentColor' || 
        element.getAttribute('stroke') === 'white' || 
        element.getAttribute('stroke') === '#fff' ||
        element.getAttribute('stroke') === '#ffffff') {
      element.setAttribute('stroke', '#000000');
    }
  });
}
