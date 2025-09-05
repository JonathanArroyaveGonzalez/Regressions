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

// Función para cargar módulos ESM
async function loadESMScript(src) {
  return new Promise(async (resolve, reject) => {
    try {
      // Importar el módulo ESM
      const module = await import(src);
      
      // Hacer disponible Canvg globalmente
      window.canvg = module;
      
      console.log(`Módulo ESM cargado exitosamente: ${src}`);
      resolve();
    } catch (error) {
      console.error(`Error al cargar módulo ESM: ${src}`, error);
      reject(new Error(`No se pudo cargar ${src}`));
    }
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
    // Usar la versión ESM de Canvg desde jsDelivr
    await loadESMScript('https://cdn.jsdelivr.net/npm/canvg@4.0.3/+esm');
    
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
    
    // Crear un contenedor temporal para la composición
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.background = '#ffffff'; // Siempre fondo blanco
    tempContainer.style.padding = '20px';
    tempContainer.style.width = 'max-content';
    tempContainer.style.color = '#000000'; // Texto negro por defecto
    
    // 1. Convertir SVG a Canvas con Canvg
    const svg = element.querySelector('svg');
    if (svg) {
      console.log('Procesando SVG con Canvg...');
      
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
      
      // Renderizar SVG con Canvg
      const v = window.canvg.Canvg.fromString(ctx, svgWithStyles);
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
  
  // Asegurar que el SVG tenga dimensiones definidas
  const viewBox = clone.getAttribute('viewBox');
  if (viewBox) {
    const [x, y, width, height] = viewBox.split(' ').map(Number);
    if (!clone.getAttribute('width')) clone.setAttribute('width', width);
    if (!clone.getAttribute('height')) clone.setAttribute('height', height);
  }
  
  // Obtener todos los elementos del SVG
  const elements = clone.querySelectorAll('*');
  
  elements.forEach(element => {
    const tagName = element.tagName.toLowerCase();
    
    // Aplicar estilos según el tipo de elemento
    if (tagName === 'text') {
      // TODO EL TEXTO EN NEGRO SIEMPRE para descarga (independiente del tema)
      element.setAttribute('fill', '#000000');
      element.setAttribute('stroke', 'none');
      
      // Aumentar tamaño de fuente para números de ejes en descarga
      const textContent = element.textContent || '';
      const isNumber = !isNaN(parseFloat(textContent)) && isFinite(textContent);
      
      if (isNumber) {
        // Es un número de eje, aplicar tamaño grande
        element.setAttribute('font-size', '20px');
        element.setAttribute('font-weight', 'bold');
      } else {
        // Es una etiqueta de eje, aplicar tamaño normal
        element.setAttribute('font-size', '25px');
        element.setAttribute('font-weight', 'bold');
      }
      
      // Aplicar familia de fuente
      element.setAttribute('font-family', 'Arial, sans-serif');
    } 
    else if (tagName === 'circle') {
      // Mantener el color de los puntos
      element.setAttribute('fill', 'steelblue');
      element.setAttribute('opacity', '0.7');
    } 
    else if (tagName === 'path') {
      // Verificar si es la línea de regresión (roja) o los ejes
      const currentStroke = element.getAttribute('stroke') || element.style.stroke;
      const d = element.getAttribute('d');
      
      if (currentStroke === 'red' || currentStroke?.includes('red')) {
        // Línea de regresión
        element.setAttribute('stroke', 'red');
        element.setAttribute('stroke-width', '2');
        element.setAttribute('fill', 'none');
        element.setAttribute('opacity', '0.8');
      } else if (d && (d.includes('M0') || d.includes('L0'))) {
        // Probablemente son los ejes
        element.setAttribute('stroke', '#000000');
        element.setAttribute('stroke-width', '1');
        element.setAttribute('fill', 'none');
      } else {
        // Otros paths (como los ticks de los ejes)
        element.setAttribute('stroke', '#000000');
        element.setAttribute('fill', 'none');
      }
    }
    else if (tagName === 'line') {
      // Líneas de los ejes y ticks en negro
      element.setAttribute('stroke', '#000000');
      element.setAttribute('stroke-width', '1');
    }
    else if (tagName === 'g') {
      // Grupos que contienen los ejes
      const className = element.getAttribute('class') || '';
      if (className.includes('tick') || 
          className.includes('axis') ||
          element.classList.contains('tick') ||
          element.classList.contains('axis')) {
        // Asegurar que todos los elementos de los ejes sean negros
        element.querySelectorAll('line, path').forEach(child => {
          child.setAttribute('stroke', '#000000');
        });
        element.querySelectorAll('text').forEach(child => {
          child.setAttribute('fill', '#000000');
        });
      }
    }
  });
  
  // Asegurar que todos los elementos de texto de los ejes sean negros con tamaño aumentado
  clone.querySelectorAll('.tick text, .axis text').forEach(text => {
    text.setAttribute('fill', '#000000');
    text.setAttribute('stroke', 'none');
    text.setAttribute('font-size', '20px'); // Tamaño fijo para números de ejes
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('font-family', 'Arial, sans-serif');
  });
  
  // Asegurar que todas las líneas de los ejes sean negras
  clone.querySelectorAll('.tick line, .axis line, .domain').forEach(line => {
    line.setAttribute('stroke', '#000000');
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke-width', '1');
  });
  
  // Forzar estilos en TODOS los elementos de texto sin excepción
  clone.querySelectorAll('text').forEach(text => {
    text.setAttribute('fill', '#000000');
    text.setAttribute('stroke', 'none');
    
    // Determinar si es un número de eje o una etiqueta
    const textContent = text.textContent || '';
    const isNumber = !isNaN(parseFloat(textContent)) && isFinite(textContent);
    
    if (isNumber) {
      // Números de los ejes
      text.setAttribute('font-size', '20px');
      text.setAttribute('font-weight', 'bold');
    } else {
      // Etiquetas de los ejes (X, Y)
      text.setAttribute('font-size', '25px');
      text.setAttribute('font-weight', 'bold');
    }
    
    text.setAttribute('font-family', 'Arial, sans-serif');
  });
  
  return new XMLSerializer().serializeToString(clone);
}

// Hacer la función disponible globalmente
window.downloadElementAsImage = downloadElementAsImage;
