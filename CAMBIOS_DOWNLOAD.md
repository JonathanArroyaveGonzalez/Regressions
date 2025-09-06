# Cambios Realizados en el Sistema de Descarga

## Problemas Solucionados

### 1. Eliminación de Código Duplicado
- **Antes**: Existían dos archivos idénticos:
  - `src/js/download.js`
  - `public/download.js`
- **Después**: Se eliminó `public/download.js` y se consolidó todo en `src/js/download.js`
- **Actualización**: Se corrigió la referencia en `src/pages/regresiones.astro` para usar la ruta correcta

### 2. Corrección del Problema de Tema Oscuro
- **Problema**: Cuando el tema oscuro estaba activo, el texto de las gráficas descargadas aparecía en blanco (invisible)
- **Solución**: Se implementó una sobrescritura agresiva de estilos que garantiza:
  - Todo el texto aparece en negro (`#000000`)
  - El fondo es siempre blanco (`#ffffff`)
  - Se remueven todas las clases y atributos relacionados con tema oscuro
  - Se usa `setProperty()` con `'important'` para sobrescribir cualquier estilo CSS

## Mejoras Implementadas

### En la función `addInlineStyles()`
- Sobrescritura agresiva de colores para elementos SVG
- Uso de `setProperty()` con flag `important` 
- Atributos SVG forzados además de estilos CSS
- Eliminación de clases de tema oscuro
- Sobrescritura final de todos los elementos de texto y líneas

### En el contenedor temporal
- Fondo blanco forzado con `important`
- Texto negro por defecto con `important`
- Atributo especial `data-force-light-theme="true"`
- Eliminación de clases de tema oscuro

### En texto de contenido y tablas
- Sobrescritura de estilos en elementos hijos
- Colores forzados para todas las celdas
- Eliminación de clases de tema oscuro en todos los niveles

## Resultado
Las gráficas descargadas ahora mantienen siempre:
- Fondo blanco
- Texto negro visible
- Colores consistentes independientemente del tema activo en la aplicación
- Una sola fuente de código para mantener
