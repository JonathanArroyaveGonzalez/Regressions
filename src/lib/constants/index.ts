/**
 * Download service configuration and constants
 */

export interface DownloadConfig {
  styles: {
    container: Record<string, string>;
    text: Record<string, string>;
    table: Record<string, string>;
    tableCell: Record<string, string>;
    tableHeader: Record<string, string>;
  };
  svg: {
    text: Record<string, string>;
    circle: Record<string, string>;
    regressionLine: Record<string, string>;
    axis: Record<string, string>;
    line: Record<string, string>;
  };
  theme: {
    darkClasses: string[];
    darkAttributes: string[];
    lightTheme: string;
  };
  canvas: {
    backgroundColor: string;
    scale: number;
    logging: boolean;
    useCORS: boolean;
    allowTaint: boolean;
  };
}

export const DOWNLOAD_CONFIG: DownloadConfig = {
  styles: {
    container: {
      'position': 'fixed',
      'top': '-9999px',
      'left': '-9999px',
      'background': '#ffffff !important',
      'background-color': '#ffffff !important',
      'padding': '20px',
      'width': 'max-content',
      'color': '#000000 !important',
      'font-family': 'Arial, sans-serif !important'
    },
    text: {
      'color': '#000000 !important',
      'background-color': '#ffffff !important',
      'margin-bottom': '20px',
      'font-size': '16px',
      'text-align': 'center',
      'font-weight': 'bold'
    },
    table: {
      'border-collapse': 'collapse',
      'width': '100%',
      'margin': '0 auto',
      'background-color': '#ffffff !important',
      'color': '#000000 !important'
    },
    tableCell: {
      'border': '1px solid #333333 !important',
      'padding': '8px',
      'text-align': 'center',
      'color': '#000000 !important',
      'background-color': '#ffffff !important'
    },
    tableHeader: {
      'background-color': '#4CAF50 !important',
      'color': '#ffffff !important',
      'font-weight': 'bold'
    }
  },
  svg: {
    text: { 
      'fill': '#000000 !important', 
      'color': '#000000 !important', 
      'stroke': 'none !important' 
    },
    circle: { 
      'fill': 'steelblue !important', 
      'opacity': '0.7 !important' 
    },
    regressionLine: { 
      'stroke': 'red !important', 
      'stroke-width': '2 !important', 
      'fill': 'none !important', 
      'opacity': '0.8 !important' 
    },
    axis: { 
      'stroke': '#000000 !important', 
      'stroke-width': '1 !important', 
      'fill': 'none !important' 
    },
    line: { 
      'stroke': '#000000 !important', 
      'stroke-width': '1 !important' 
    }
  },
  theme: {
    darkClasses: ['dark-theme', 'dark'],
    darkAttributes: ['data-theme', 'data-dark-theme'],
    lightTheme: 'light'
  },
  canvas: {
    backgroundColor: '#ffffff',
    scale: 2,
    logging: false,
    useCORS: true,
    allowTaint: true
  }
};
