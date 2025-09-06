import { STYLES } from '../config/styles.js';
import { applyStyles, removeDarkTheme, safeQuerySelectorAll } from '../utils/dom-utils.js';

export function processContentText(contentText, container) {
  if (!contentText || !container) return;

  try {
    const textDiv = document.createElement('div');
    textDiv.innerHTML = contentText.innerHTML;
    applyStyles(textDiv, STYLES.text);
    
    processChildElements(textDiv);
    container.appendChild(textDiv);
  } catch (error) {
    console.error('Error processing content text:', error);
  }
}

export function processDataTable(dataTable, container) {
  if (!dataTable || !container) return;

  try {
    const tableDiv = document.createElement('div');
    tableDiv.innerHTML = dataTable.innerHTML;
    removeDarkTheme(tableDiv);

    const table = tableDiv.querySelector('table');
    if (!table) return;

    setupTableStyles(table);
    container.appendChild(tableDiv);
  } catch (error) {
    console.error('Error processing data table:', error);
  }
}

function processChildElements(parent) {
  safeQuerySelectorAll(parent, '*').forEach(child => {
    removeDarkTheme(child);
    applyStyles(child, { color: '#000000', 'background-color': 'transparent' });
  });
}

function setupTableStyles(table) {
  applyStyles(table, STYLES.table);
  removeDarkTheme(table);

  // Process all cells
  safeQuerySelectorAll(table, 'th, td').forEach(cell => {
    applyStyles(cell, STYLES.tableCell);
    removeDarkTheme(cell);
    
    // Force styles on child elements
    safeQuerySelectorAll(cell, '*').forEach(child => {
      applyStyles(child, { color: '#000000' });
      removeDarkTheme(child);
    });
  });

  // Style headers specifically
  safeQuerySelectorAll(table, 'th').forEach(header => {
    applyStyles(header, STYLES.tableHeader);
  });
}
