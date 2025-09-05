// Función para descargar un elemento como imagen (versión simplificada)
export async function downloadElementAsImage(elementId, filename = 'descarga.png') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Elemento no encontrado:', elementId);
    return;
  }
  
  try {
    // Cargamos html2canvas desde CDN si aún no está cargado
    if (typeof html2canvas !== 'function') {
      await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
    }
    
    // Crear un contenedor temporal para la composición
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.background = '#ffffff';
    tempContainer.style.padding = '20px';
    tempContainer.style.width = 'max-content';
    tempContainer.style.color = '#000000';
    
    // 1. Agregar el contenido de texto
    const contentText = document.getElementById('content-text');
    if (contentText) {
      const textDiv = document.createElement('div');
      textDiv.innerHTML = contentText.innerHTML;
      textDiv.style.color = '#000000';
      textDiv.style.marginBottom = '20px';
      textDiv.style.fontSize = '16px';
      textDiv.style.textAlign = 'center';
      textDiv.style.fontWeight = 'bold';
      tempContainer.appendChild(textDiv);
    }
    
    // 2. Agregar la gráfica (SVG)
    const svg = element.querySelector('svg');
    if (svg) {
      const svgClone = svg.cloneNode(true);
      
      // Aplicar estilos al SVG clonado
      svgClone.style.backgroundColor = '#ffffff';
      svgClone.style.display = 'block';
      svgClone.style.marginBottom = '20px';
      
      // Asegurar dimensiones
      const bbox = svg.getBoundingClientRect();
      svgClone.setAttribute('width', bbox.width);
      svgClone.setAttribute('height', bbox.height);
      
      // Aplicar estilos para mejor visualización
      applySVGStyles(svgClone);
      
      tempContainer.appendChild(svgClone);
    }
    
    // 3. Agregar la tabla de datos
    const dataTable = document.getElementById('data-table');
    if (dataTable) {
      const tableDiv = document.createElement('div');
      tableDiv.innerHTML = dataTable.innerHTML;
      
      // Aplicar estilos a la tabla
      const table = tableDiv.querySelector('table');
      if (table) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.margin = '0 auto';
        table.style.backgroundColor = '#ffffff';
        
        // Estilos para las celdas
        const cells = table.querySelectorAll('th, td');
        cells.forEach(cell => {
          cell.style.border = '1px solid #333333';
          cell.style.padding = '8px';
          cell.style.textAlign = 'center';
          cell.style.color = '#000000';
        });
        
        // Estilos para el encabezado
        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
          header.style.backgroundColor = '#4CAF50';
          header.style.color = 'white';
          header.style.fontWeight = 'bold';
        });
        
        // Estilos para las celdas de datos
        const dataCells = table.querySelectorAll('td');
        dataCells.forEach(cell => {
          cell.style.backgroundColor = '#ffffff';
          cell.style.color = '#000000';
        });
      }
      
      tempContainer.appendChild(tableDiv);
    }
    
    // Agregar el contenedor temporal al DOM
    document.body.appendChild(tempContainer);
    
    // Usar html2canvas para capturar todo el contenedor
    const finalCanvas = await html2canvas(tempContainer, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true
    });
    
    // Remover el contenedor temporal
    document.body.removeChild(tempContainer);
    
    // Descargar la imagen
    finalCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
    
  } catch (error) {
    console.error('Error al generar la imagen:', error);
    alert('Error al generar la imagen. Por favor, inténtalo de nuevo.');
  }
}

// Función para aplicar estilos al SVG para mejor renderizado
function applySVGStyles(svg) {
  // Aplicar estilos a todos los elementos del SVG
  const elements = svg.querySelectorAll('*');
  
  elements.forEach(element => {
    const tagName = element.tagName.toLowerCase();
    
    if (tagName === 'text') {
      element.style.fill = '#000000';
      element.style.stroke = 'none';
    } else if (tagName === 'circle') {
      element.style.fill = 'steelblue';
      element.style.opacity = '0.7';
    } else if (tagName === 'path') {
      const stroke = element.getAttribute('stroke');
      if (stroke === 'red' || element.style.stroke === 'red') {
        element.style.stroke = 'red';
        element.style.strokeWidth = '2';
        element.style.fill = 'none';
        element.style.opacity = '0.8';
      } else {
        element.style.stroke = '#000000';
        element.style.fill = 'none';
      }
    } else if (tagName === 'line') {
      element.style.stroke = '#000000';
      element.style.strokeWidth = '1';
    }
  });
  
  // Estilos específicos para ejes
  svg.querySelectorAll('.tick text, .axis text').forEach(text => {
    text.style.fill = '#000000';
    text.style.stroke = 'none';
  });
  
  svg.querySelectorAll('.tick line, .axis line, .domain').forEach(line => {
    line.style.stroke = '#000000';
    line.style.fill = 'none';
  });
}

// Función para cargar un script externo de forma dinámica
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Error al cargar el script ${src}`));
    document.head.appendChild(script);
  });
}
