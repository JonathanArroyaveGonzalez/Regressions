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
    
    // Crear un contenedor temporal para la composición con estilos absolutos
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.background = '#ffffff !important'; // Siempre fondo blanco
    tempContainer.style.color = '#000000 !important'; // Texto negro por defecto
    tempContainer.style.padding = '20px';
    tempContainer.style.width = 'max-content';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '14px';
    
    // Aplicar estilos CSS reset básico para evitar herencia de temas
    tempContainer.style.cssText += `
      all: initial !important;
      position: fixed !important;
      top: -9999px !important;
      left: -9999px !important;
      background: #ffffff !important;
      color: #000000 !important;
      padding: 20px !important;
      width: max-content !important;
      font-family: Arial, sans-serif !important;
      font-size: 14px !important;
      font-weight: normal !important;
    `;
    
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
    
    // 2. Procesar y agregar el texto de contenido con clonación completa
    const contentText = document.getElementById('content-text');
    if (contentText) {
      console.log('Procesando content-text...');
      
      // Crear div completamente nuevo en lugar de clonar
      const textDiv = document.createElement('div');
      textDiv.style.cssText = `
        color: #000000 !important;
        background-color: #ffffff !important;
        margin-bottom: 20px !important;
        padding: 15px !important;
        text-align: center !important;
        font-family: Arial, sans-serif !important;
        font-size: 16px !important;
        font-weight: normal !important;
        border: 1px solid #ccc !important;
      `;
      
      // Extraer el contenido HTML y procesarlo
      const htmlContent = contentText.innerHTML;
      textDiv.innerHTML = htmlContent;
      
      // Función para aplicar estilos recursivamente a TODOS los elementos
      function forceBlackStyles(element) {
        // Aplicar estilos al elemento actual
        element.style.cssText += `
          color: #000000 !important;
          background-color: transparent !important;
          font-family: Arial, sans-serif !important;
        `;
        
        // Si es H3
        if (element.tagName === 'H3') {
          element.style.cssText += `
            color: #000000 !important;
            font-size: 22px !important;
            font-weight: bold !important;
            margin: 10px 0 15px 0 !important;
            text-align: center !important;
            background-color: transparent !important;
          `;
        }
        
        // Si es párrafo
        if (element.tagName === 'P') {
          element.style.cssText += `
            color: #000000 !important;
            font-size: 14px !important;
            margin: 8px 0 !important;
            background-color: transparent !important;
          `;
        }
        
        // Si es div
        if (element.tagName === 'DIV') {
          element.style.cssText += `
            color: #000000 !important;
            background-color: transparent !important;
          `;
        }
        
        // Aplicar recursivamente a todos los hijos
        Array.from(element.children).forEach(child => {
          forceBlackStyles(child);
        });
      }
      
      // Aplicar estilos a todos los elementos
      forceBlackStyles(textDiv);
      
      // También aplicar directamente a elementos específicos
      textDiv.querySelectorAll('*').forEach(el => {
        el.style.color = '#000000 !important';
        el.style.fontFamily = 'Arial, sans-serif !important';
        el.style.backgroundColor = 'transparent !important';
      });
      
      tempContainer.appendChild(textDiv);
    }
    
    // 3. Procesar y agregar la tabla de datos con clonación completa
    const dataTable = document.getElementById('data-table');
    if (dataTable) {
      console.log('Procesando data-table...');
      
      // Crear div completamente nuevo
      const tableDiv = document.createElement('div');
      tableDiv.style.cssText = `
        color: #000000 !important;
        background-color: #ffffff !important;
        margin-top: 20px !important;
        padding: 15px !important;
        font-family: Arial, sans-serif !important;
        border: 1px solid #ccc !important;
      `;
      
      // Extraer y procesar el contenido
      const htmlContent = dataTable.innerHTML;
      tableDiv.innerHTML = htmlContent;
      
      // Función para aplicar estilos recursivamente
      function forceTableStyles(element) {
        element.style.cssText += `
          color: #000000 !important;
          font-family: Arial, sans-serif !important;
          background-color: transparent !important;
        `;
        
        // Si es H4 (título de la tabla)
        if (element.tagName === 'H4') {
          element.style.cssText = `
            color: #000000 !important;
            font-size: 20px !important;
            font-weight: bold !important;
            text-align: center !important;
            margin: 0 0 15px 0 !important;
            background-color: transparent !important;
            font-family: Arial, sans-serif !important;
          `;
        }
        
        // Si es tabla
        if (element.tagName === 'TABLE') {
          element.style.cssText = `
            border-collapse: collapse !important;
            width: 100% !important;
            margin: 0 auto !important;
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, sans-serif !important;
          `;
        }
        
        // Si es TH (encabezado)
        if (element.tagName === 'TH') {
          element.style.cssText = `
            border: 2px solid #333333 !important;
            padding: 12px !important;
            text-align: center !important;
            background-color: #4CAF50 !important;
            color: #ffffff !important;
            font-family: Arial, sans-serif !important;
            font-size: 16px !important;
            font-weight: bold !important;
          `;
        }
        
        // Si es TD (celda de datos)
        if (element.tagName === 'TD') {
          element.style.cssText = `
            border: 2px solid #333333 !important;
            padding: 10px !important;
            text-align: center !important;
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, sans-serif !important;
            font-size: 14px !important;
            font-weight: normal !important;
          `;
        }
        
        // Si es párrafo (como data-count)
        if (element.tagName === 'P') {
          element.style.cssText += `
            color: #000000 !important;
            font-size: 12px !important;
            text-align: center !important;
            margin: 10px 0 !important;
            background-color: transparent !important;
          `;
        }
        
        // Aplicar recursivamente a todos los hijos
        Array.from(element.children).forEach(child => {
          forceTableStyles(child);
        });
      }
      
      // Aplicar estilos a todos los elementos
      forceTableStyles(tableDiv);
      
      // Segunda pasada para asegurar que todo sea negro
      tableDiv.querySelectorAll('*').forEach(el => {
        if (el.tagName !== 'TH') { // Los TH deben ser blancos sobre verde
          el.style.color = '#000000 !important';
        }
        el.style.fontFamily = 'Arial, sans-serif !important';
      });
      
      // Tercera pasada específica para elementos problemáticos
      tableDiv.querySelectorAll('h4').forEach(h4 => {
        h4.style.color = '#000000 !important';
        h4.style.backgroundColor = 'transparent !important';
      });
      
      tableDiv.querySelectorAll('td').forEach(td => {
        td.style.color = '#000000 !important';
        td.style.backgroundColor = '#ffffff !important';
      });
      
      tempContainer.appendChild(tableDiv);
    }
    
    // Agregar el contenedor temporal al DOM
    document.body.appendChild(tempContainer);
    
    // 4. Usar html2canvas para capturar todo el contenedor con configuración mejorada
    console.log('Capturando imagen con html2canvas...');
    console.log('Contenido del tempContainer:', tempContainer.innerHTML.substring(0, 500));
    
    const finalCanvas = await window.html2canvas(tempContainer, {
      backgroundColor: '#ffffff', // Fondo blanco forzado
      scale: 2, // Mayor calidad
      logging: true, // Activar logging para debug
      useCORS: true,
      allowTaint: true,
      ignoreElements: function(element) {
        // Ignorar elementos que puedan causar problemas
        return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
      },
      onclone: function(clonedDoc) {
        // Forzar estilos en el documento clonado
        console.log('Aplicando estilos en documento clonado...');
        const clonedContainer = clonedDoc.querySelector('body > div');
        if (clonedContainer) {
          clonedContainer.style.color = '#000000 !important';
          clonedContainer.style.backgroundColor = '#ffffff !important';
          
          // Forzar estilos en todos los elementos del clone
          clonedContainer.querySelectorAll('*').forEach(el => {
            el.style.color = '#000000 !important';
            el.style.fontFamily = 'Arial, sans-serif !important';
            
            if (el.tagName === 'H3' || el.tagName === 'H4') {
              el.style.color = '#000000 !important';
              el.style.fontWeight = 'bold !important';
            }
            
            if (el.tagName === 'TH') {
              el.style.backgroundColor = '#4CAF50 !important';
              el.style.color = '#ffffff !important';
            }
            
            if (el.tagName === 'TD') {
              el.style.backgroundColor = '#ffffff !important';
              el.style.color = '#000000 !important';
            }
          });
        }
      }
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
      element.setAttribute('font-family', 'Arial, sans-serif');
      
      // Determinar tipo de texto por contenido y posición
      const textContent = element.textContent || '';
      const parentClass = element.parentElement?.getAttribute('class') || '';
      const transform = element.getAttribute('transform') || '';
      
      // Detectar números de los ejes
      const isAxisNumber = !isNaN(parseFloat(textContent)) && isFinite(textContent) && 
                          (parentClass.includes('tick') || parentClass.includes('axis'));
      
      // Detectar título principal (contiene "frente a")
      const isMainTitle = textContent.includes('frente a');
      
      // Detectar etiquetas de ejes (generalmente tienen transform y son una sola letra o palabra)
      const isAxisLabel = transform.includes('rotate') || 
                         (textContent.length <= 3 && !isAxisNumber) ||
                         (textContent.match(/^[A-Za-z]\s*$/));
      
      if (isMainTitle) {
        // Título principal del gráfico
        element.setAttribute('font-size', '18px');
        element.setAttribute('font-weight', 'bold');
      } else if (isAxisLabel) {
        // Etiquetas de los ejes (X, Y)
        element.setAttribute('font-size', '16px');
        element.setAttribute('font-weight', 'bold');
      } else if (isAxisNumber) {
        // Números de los ejes
        element.setAttribute('font-size', '12px');
        element.setAttribute('font-weight', 'normal');
      } else {
        // Texto de leyenda u otros
        element.setAttribute('font-size', '14px');
        element.setAttribute('font-weight', 'normal');
      }
    } 
    else if (tagName === 'circle') {
      // Puntos de dispersión en rojo para mejor visibilidad
      element.setAttribute('fill', '#e74c3c');
      element.setAttribute('opacity', '0.8');
      element.setAttribute('r', '5');
    } 
    else if (tagName === 'path') {
      // Verificar si es la línea de regresión o los ejes
      const currentStroke = element.getAttribute('stroke') || element.style.stroke || '';
      const strokeWidth = element.getAttribute('stroke-width') || element.style.strokeWidth || '';
      const className = element.getAttribute('class') || '';
      
      // Detectar línea de regresión por grosor y clase
      if (strokeWidth === '3' || strokeWidth === '2' || 
          className.includes('regression') || 
          currentStroke.includes('red') || 
          currentStroke.includes('blue') ||
          currentStroke.includes('#e74c3c') || 
          currentStroke.includes('#3498db')) {
        // Es línea de regresión
        const color = currentStroke.includes('blue') || currentStroke.includes('#3498db') ? '#3498db' : '#e74c3c';
        element.setAttribute('stroke', color);
        element.setAttribute('stroke-width', '3');
        element.setAttribute('fill', 'none');
        element.setAttribute('opacity', '1');
      } else {
        // Son los ejes o domain paths
        element.setAttribute('stroke', '#000000');
        element.setAttribute('stroke-width', '1');
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
  
  // Asegurar que todos los elementos de texto de los ejes sean negros con tamaño corregido
  clone.querySelectorAll('.tick text, .axis text').forEach(text => {
    text.setAttribute('fill', '#000000');
    text.setAttribute('stroke', 'none');
    text.setAttribute('font-size', '14px'); // Tamaño más pequeño para números de ejes
    text.setAttribute('font-weight', 'normal');
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
    text.setAttribute('font-family', 'Arial, sans-serif');
    
    // Determinar tipo de texto más específicamente
    const textContent = text.textContent || '';
    const parentClass = text.parentElement?.getAttribute('class') || '';
    const transform = text.getAttribute('transform') || '';
    const y = parseFloat(text.getAttribute('y') || '0');
    const x = parseFloat(text.getAttribute('x') || '0');
    
    // Detectar título principal (generalmente en la parte superior)
    const isMainTitle = textContent.includes('frente a') || y < 30;
    
    // Detectar números de los ejes
    const isAxisNumber = !isNaN(parseFloat(textContent)) && isFinite(textContent) && 
                        (parentClass.includes('tick') || 
                         text.closest('.tick') || 
                         text.closest('[class*="axis"]'));
    
    // Detectar etiquetas de ejes (X, Y)
    const isAxisLabel = transform.includes('rotate') || 
                       (textContent.length <= 3 && !isAxisNumber && !isMainTitle) ||
                       (x > 200 && y > 400) || // Etiqueta X (abajo centro)
                       (x < 50); // Etiqueta Y (izquierda)
    
    // Detectar leyenda (generalmente en esquina superior derecha)
    const isLegendText = x > 400 || textContent.includes('Datos') || textContent.includes('Regresión');
    
    if (isMainTitle) {
      // Título principal
      text.setAttribute('font-size', '18px');
      text.setAttribute('font-weight', 'bold');
    } else if (isAxisLabel) {
      // Etiquetas de los ejes
      text.setAttribute('font-size', '16px');
      text.setAttribute('font-weight', 'bold');
    } else if (isAxisNumber) {
      // Números de los ejes
      text.setAttribute('font-size', '12px');
      text.setAttribute('font-weight', 'normal');
    } else if (isLegendText) {
      // Texto de la leyenda
      text.setAttribute('font-size', '12px');
      text.setAttribute('font-weight', 'normal');
    } else {
      // Cualquier otro texto
      text.setAttribute('font-size', '14px');
      text.setAttribute('font-weight', 'normal');
    }
  });
  
  return new XMLSerializer().serializeToString(clone);
}

// Hacer la función disponible globalmente
window.downloadElementAsImage = downloadElementAsImage;
