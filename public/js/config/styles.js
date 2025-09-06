export const STYLES = {
  container: {
    position: 'fixed',
    top: '-9999px',
    left: '-9999px',
    background: '#ffffff',
    'background-color': '#ffffff',
    padding: '20px',
    width: 'max-content',
    color: '#000000',
    'font-family': 'Arial, sans-serif'
  },
  text: {
    color: '#000000',
    'background-color': '#ffffff',
    'margin-bottom': '20px',
    'font-size': '16px',
    'text-align': 'center',
    'font-weight': 'bold'
  },
  table: {
    'border-collapse': 'collapse',
    width: '100%',
    margin: '0 auto',
    'background-color': '#ffffff',
    color: '#000000'
  },
  tableCell: {
    border: '1px solid #333333',
    padding: '8px',
    'text-align': 'center',
    color: '#000000',
    'background-color': '#ffffff'
  },
  tableHeader: {
    'background-color': '#4CAF50',
    color: 'white',
    'font-weight': 'bold'
  }
};

export const SVG_STYLES = {
  text: { fill: '#000000', color: '#000000', stroke: 'none' },
  circle: { fill: 'steelblue', opacity: '0.7' },
  regressionLine: { stroke: 'red', 'stroke-width': '2', fill: 'none', opacity: '0.8' },
  axis: { stroke: '#000000', 'stroke-width': '1', fill: 'none' },
  line: { stroke: '#000000', 'stroke-width': '1' }
};

export const THEME_CONFIG = {
  darkClasses: ['dark-theme', 'dark'],
  darkAttributes: ['data-theme', 'data-dark-theme'],
  lightTheme: 'light'
};

export const CANVAS_CONFIG = {
  backgroundColor: '#ffffff',
  scale: 2,
  logging: false,
  useCORS: true,
  allowTaint: true
};
