// Función para cargar librerías desde CDN
async function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Verificar si ya está cargado
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log(`Script cargado exitosamente: ${src}`);
      resolve();
    };
    script.onerror = (error) => {
      console.error(`Error al cargar script: ${src}`, error);
      reject(new Error(`No se pudo cargar ${src}`));
    };
    document.head.appendChild(script);
  });
}

export async function downloadElementAsImage(elementId, filename = 'descarga.png') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Elemento no encontrado:', elementId);
    alert('No se encontró el elemento a descargar');
    return;
  }
  
  try {
    console.log('Iniciando descarga de imagen...');
    
    // Cargar las librerías necesarias desde CDN
    console.log('Cargando html2canvas...');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    
    console.log('Cargando Canvg...');
    await loadScript('https://unpkg.com/canvg/lib/umd.js');
    
    // Esperar a que html2canvas esté disponible
    let attempts = 0;
    while (typeof window.html2canvas !== 'function' && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (typeof window.html2canvas !== 'function') {
      throw new Error('html2canvas no se cargó correctamente');
    }
    
    // Esperar a que Canvg esté disponible
    attempts = 0;
    while (!window.canvg && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!window.canvg) {
      throw new Error('Canvg no se cargó correctamente');
    }
    
    console.log('Librerías cargadas exitosamente');
    const { Canvg } = window.canvg;
    
    // Crear un contenedor temporal para la composición
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.background = '#ffffff'; // Siempre fondo blanco
    tempContainer.style.padding = '20px';
    tempContainer.style.width = 'max-content';
    tempContainer.style.color = '#000000'; // Texto negro por defecto
    
    // 1. Convertir SVG a Canvas con estilos
    const svg = element.querySelector('svg');
    if (svg) {
      // Obtener estilos computados del SVG y sus elementos
      const svgWithStyles = await addInlineStyles(svg);
      
      const svgCanvas = document.createElement('canvas');
      const ctx = svgCanvas.getContext('2d');
      
      // Obtener dimensiones
      const viewBox = svg.getAttribute('viewBox');
      let width, height;
      if (viewBox) {
        [, , width, height] = viewBox.split(' ').map(Number);
      } else {
        const bbox = svg.getBoundingClientRect();
        width = bbox.width;
        height = bbox.height;
      }
      
      svgCanvas.width = width;
      svgCanvas.height = height;
      
      // Fondo blanco para el canvas del SVG
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      
      // Renderizar SVG con estilos en canvas
      const v = await Canvg.from(ctx, svgWithStyles);
      await v.render();
      
      // Agregar el canvas al contenedor temporal
      const imgFromCanvas = document.createElement('img');
      imgFromCanvas.src = svgCanvas.toDataURL();
      imgFromCanvas.style.display = 'block';
      imgFromCanvas.style.marginBottom = '20px';
      tempContainer.appendChild(imgFromCanvas);
    }
    
    // 2. Agregar el texto de contenido
    const contentText = document.getElementById('content-text');
    if (contentText) {
      const textDiv = document.createElement('div');
      textDiv.innerHTML = contentText.innerHTML;
      // Forzar estilos para texto negro
      textDiv.style.color = '#000000';
      textDiv.style.marginBottom = '20px';
      textDiv.style.fontSize = '16px';
      textDiv.style.textAlign = 'center';
      textDiv.style.fontWeight = 'bold';
      tempContainer.appendChild(textDiv);
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
          cell.style.color = '#000000'; // Texto negro
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
    
    // 4. Usar html2canvas para capturar todo el contenedor
    console.log('Capturando imagen con html2canvas...');
    const finalCanvas = await window.html2canvas(tempContainer, {
      backgroundColor: '#ffffff', // Fondo blanco
      scale: 2, // Mayor calidad
      logging: false,
      useCORS: true,
      allowTaint: true
    });
    
    // Remover el contenedor temporal
    document.body.removeChild(tempContainer);
    
    // 5. Descargar la imagen
    console.log('Generando descarga...');
    finalCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      console.log('Descarga completada exitosamente');
    }, 'image/png');
    
  } catch (error) {
    console.error('Error detallado al generar la imagen:', error);
    alert(`Error al generar la imagen: ${error.message}`);
  }
}

// Función auxiliar para agregar estilos inline al SVG con colores fijos
async function addInlineStyles(svg) {
  const clone = svg.cloneNode(true);
  
  // Establecer fondo blanco para el SVG
  clone.style.backgroundColor = '#ffffff';
  
  // Obtener todos los elementos del SVG
  const elements = clone.querySelectorAll('*');
  
  elements.forEach(element => {
    const tagName = element.tagName.toLowerCase();
    
    // Aplicar estilos según el tipo de elemento
    if (tagName === 'text') {
      // Todo el texto en negro
      element.style.fill = '#000000';
      element.style.stroke = 'none';
      const fontSize = window.getComputedStyle(element).fontSize;
      if (fontSize) element.style.fontSize = fontSize;
      const fontFamily = window.getComputedStyle(element).fontFamily;
      if (fontFamily) element.style.fontFamily = fontFamily;
    } 
    else if (tagName === 'circle') {
      // Mantener el color de los puntos
      element.style.fill = 'steelblue';
      element.style.opacity = '0.7';
    } 
    else if (tagName === 'path') {
      // Verificar si es la línea de regresión (roja) o los ejes
      const stroke = element.getAttribute('stroke');
      const d = element.getAttribute('d');
      
      if (stroke === 'red' || element.style.stroke === 'red') {
        // Línea de regresión
        element.style.stroke = 'red';
        element.style.strokeWidth = '2';
        element.style.fill = 'none';
        element.style.opacity = '0.8';
      } else if (d && (d.includes('M0') || d.includes('L0'))) {
        // Probablemente son los ejes
        element.style.stroke = '#000000';
        element.style.strokeWidth = '1';
        element.style.fill = 'none';
      } else {
        // Otros paths (como los ticks de los ejes)
        element.style.stroke = '#000000';
        element.style.fill = 'none';
      }
    }
    else if (tagName === 'line') {
      // Líneas de los ejes y ticks en negro
      element.style.stroke = '#000000';
      element.style.strokeWidth = '1';
    }
    else if (tagName === 'g') {
      // Grupos que contienen los ejes
      if (element.classList.contains('tick') || 
          element.classList.contains('axis') ||
          element.getAttribute('class')?.includes('axis')) {
        // Asegurar que todos los elementos de los ejes sean negros
        element.querySelectorAll('line, path').forEach(child => {
          child.style.stroke = '#000000';
        });
        element.querySelectorAll('text').forEach(child => {
          child.style.fill = '#000000';
        });
      }
    }
    
    // Propiedades generales importantes
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
  });
  
  // Asegurar que todos los elementos de texto de los ejes sean negros
  clone.querySelectorAll('.tick text, .axis text').forEach(text => {
    text.style.fill = '#000000';
    text.style.stroke = 'none';
  });
  
  // Asegurar que todas las líneas de los ejes sean negras
  clone.querySelectorAll('.tick line, .axis line, .domain').forEach(line => {
    line.style.stroke = '#000000';
    line.style.fill = 'none';
  });
  
  return new XMLSerializer().serializeToString(clone);
}

// Hacer la función disponible globalmente
window.downloadElementAsImage = downloadElementAsImage;
