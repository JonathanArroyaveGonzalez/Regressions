# 🧪 Physics Lab - Laboratorio de Física

<div align="center">
  <img src="public/favicon.svg" alt="Physics Lab Logo" width="120" height="120">
  
  ### Herramientas Interactivas para Análisis Físico y Estadístico
  
  [![Astro](https://img.shields.io/badge/Astro-4.0+-ff5d01?style=flat&logo=astro)](https://astro.build/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![D3.js](https://img.shields.io/badge/D3.js-7.9+-f68e56?style=flat&logo=d3.js)](https://d3js.org/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)](https://vercel.com/)
  [![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-blue?style=flat&logo=jenkins)](https://jenkins.io/)
  
  ## 🌐 Aplicación en Producción
  
  > **Esta aplicación está desplegada y disponible en:** 
  > ### **🚀 [https://physical-regressions.vercel.app/](https://physical-regressions.vercel.app/)**
  
  **🔧 CI/CD Pipeline:** Este proyecto utiliza **Jenkins** para integración y despliegue continuo, garantizando que todas las actualizaciones sean probadas y desplegadas automáticamente en **Vercel**.
  
  ---
  
  [📖 Documentación](#-documentación) • [🛠️ Instalación](#-instalación) • [🤝 Contribuir](#-contribuir)
</div>

---

## 📋 Tabla de Contenidos

- [� Deployment y CI/CD](#-deployment-y-cicd)
- [�🎯 Descripción](#-descripción)
- [✨ Características](#-características)
- [🧮 Herramientas Disponibles](#-herramientas-disponibles)
- [🛠️ Instalación](#-instalación)
- [🚀 Uso](#-uso)
- [🏗️ Arquitectura](#-arquitectura)
- [📖 Documentación](#-documentación)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## 🌐 Deployment y CI/CD

### 🚀 **Aplicación en Producción**
La aplicación está completamente desplegada y funcional en:
**https://physical-regressions.vercel.app/**

### 🔧 **Pipeline CI/CD con Jenkins**
Este proyecto implementa un pipeline de integración y despliegue continuo usando **Jenkins** que:

- ✅ **Build automático** en cada push al repositorio
- ✅ **Testing** de funcionalidades críticas
- ✅ **Despliegue automático** a Vercel en caso de éxito
- ✅ **Notificaciones** de estado del deployment
- ✅ **Rollback automático** en caso de fallos

### 📊 **Estado del Deployment**
- **Platform:** Vercel
- **CI/CD:** Jenkins Pipeline
- **Status:** ✅ Activo y funcional
- **URL:** https://physical-regressions.vercel.app/
- **Last Deploy:** Automático via Jenkins

### 🛠️ **Configuración de Vercel**
```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

---

## 🎯 Descripción

**Physics Lab** es una suite completa de herramientas web interactivas diseñada específicamente para estudiantes, profesores e investigadores en el campo de la física y las ciencias exactas. El proyecto combina análisis estadístico avanzado, simulaciones físicas interactivas y herramientas de cálculo precisas en una interfaz moderna y accesible.

### 🎓 Ideal para:
- **Estudiantes universitarios** realizando experimentos de laboratorio
- **Profesores** que necesitan herramientas de demostración interactivas
- **Investigadores** analizando datos experimentales
- **Ingenieros** validando cálculos y modelos matemáticos

---

## ✨ Características

### 🔬 **Análisis Estadístico Avanzado**
- Regresión lineal y cuadrática con método de mínimos cuadrados
- Cálculo automático de coeficientes de correlación (R²)
- Visualización interactiva con gráficos D3.js de alta calidad
- Exportación de resultados en formato PNG de alta resolución

### 🎨 **Interfaz Moderna**
- Tema claro/oscuro con persistencia de preferencias
- Diseño responsive optimizado para móviles y escritorio
- Transiciones suaves y animaciones CSS modernas
- Componentes reutilizables con Astro

### ⚡ **Rendimiento Optimizado**
- Arquitectura moderna con TypeScript y ES6 modules
- Bundle splitting automático para carga rápida
- Tree-shaking para eliminación de código no utilizado
- Compilación estática con Astro para máximo rendimiento

### 🎯 **Precisión Científica**
- Implementación de algoritmos matemáticos verificados
- Manejo de errores numéricos y casos edge
- Validación de entrada de datos robusta
- Cálculos de alta precisión con JavaScript nativo

---

## 🧮 Herramientas Disponibles

### 📊 **Análisis de Regresiones**
Herramienta avanzada para análisis estadístico de datos experimentales.

**Características:**
- ✅ Regresión lineal (y = mx + b)
- ✅ Regresión cuadrática (y = ax² + bx + c)
- ✅ Coeficiente de determinación (R²)
- ✅ Gráficos interactivos con zoom y pan
- ✅ Tabla de datos editable en tiempo real
- ✅ Exportación de gráficos y tablas

**Casos de uso:**
- Análisis de datos experimentales
- Validación de modelos teóricos
- Determinación de constantes físicas
- Predicción de comportamientos

### 🎯 **Calculadora de Porcentaje de Error**
Evalúa la precisión de mediciones experimentales comparándolas con valores teóricos.

**Características:**
- ✅ Cálculo automático de error absoluto y relativo
- ✅ Interpretación cualitativa de resultados (Excelente/Bueno/Aceptable/Revisar)
- ✅ Historial de cálculos con persistencia local
- ✅ Pasos detallados del cálculo
- ✅ Interfaz intuitiva con validación en tiempo real

**Fórmula:** `% Error = |Valor Teórico - Valor Experimental| / |Valor Teórico| × 100`

### 🔗 **Simulación de la Ley de Hooke**
Simulación interactiva de sistemas masa-resorte con visualización en tiempo real.

**Características:**
- ✅ Control dinámico de masa, constante elástica y gravedad
- ✅ Visualización del sistema con vectores de fuerza
- ✅ Cálculo de energía potencial elástica
- ✅ Simulación de oscilaciones amortiguadas
- ✅ Indicador de posición de equilibrio
- ✅ Animaciones suaves con Canvas API

**Física implementada:**
- Fuerza elástica: `F = kx`
- Energía potencial: `U = ½kx²`
- Posición de equilibrio: `x = mg/k`
- Movimiento armónico simple con amortiguamiento

---

## 🛠️ Instalación

### Prerrequisitos
- **Node.js** 18.0+ 
- **npm** 9.0+ o **pnpm** 8.0+
- **Git** para control de versiones

### Instalación Local

1. **Clona el repositorio:**
```bash
git clone https://github.com/JonathanArroyaveGonzalez/Regressions.git
cd Regressions
```

2. **Instala las dependencias:**
```bash
npm install
# o usando pnpm (recomendado)
pnpm install
```

3. **Ejecuta el servidor de desarrollo:**
```bash
npm run dev
# o
pnpm dev
```

4. **Abre tu navegador en:**
```
http://localhost:4321
```

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Vista previa de compilación |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea código con Prettier |
| `npm run type-check` | Verifica tipos TypeScript |

---

## 🚀 Uso

### Análisis de Regresiones

1. **Navega a la herramienta:** `/regresiones`
2. **Personaliza las variables:** Cambia los nombres "X" e "Y" por tus variables
3. **Ingresa datos:** Usa la tabla para agregar puntos experimentales
4. **Genera análisis:** Selecciona tipo de regresión y haz clic en "Graficar"
5. **Interpreta resultados:** Analiza la ecuación y coeficiente R²
6. **Exporta:** Descarga gráfico y tabla para reportes

### Cálculo de Error Porcentual

1. **Navega a:** `/error-porcentual`
2. **Ingresa valores:** Valor teórico y experimental
3. **Obtén resultados:** El cálculo se actualiza automáticamente
4. **Revisa historial:** Consulta cálculos anteriores guardados

### Simulación Ley de Hooke

1. **Navega a:** `/ley-hooke`
2. **Ajusta parámetros:** Masa, constante elástica, gravedad
3. **Observa equilibrio:** Ve la posición de equilibrio calculada
4. **Simula oscilación:** Activa las oscilaciones amortiguadas

---

## 🏗️ Arquitectura

### Estructura del Proyecto

```
📁 Physics Lab/
├── 📁 public/                    # Archivos estáticos
│   ├── 📁 js/                   # Scripts del lado cliente
│   │   ├── 📁 config/           # Configuraciones
│   │   ├── 📁 modules/          # Módulos ES6
│   │   └── 📁 utils/            # Utilidades
│   └── download.js              # Sistema de descarga principal
├── 📁 src/                      # Código fuente
│   ├── 📁 components/           # Componentes Astro
│   ├── 📁 layouts/              # Layouts base
│   ├── 📁 lib/                  # 🆕 Librería centralizada
│   │   ├── 📁 constants/        # Constantes y configuración
│   │   ├── 📁 services/         # Servicios principales
│   │   └── 📁 utils/            # Utilidades TypeScript
│   ├── 📁 pages/                # Páginas de la aplicación
│   └── 📁 styles/               # 🆕 Estilos globales
├── 📄 astro.config.mjs          # Configuración Astro
├── 📄 tsconfig.json             # Configuración TypeScript
├── 📄 .eslintrc.json            # 🆕 Configuración ESLint
└── 📄 .prettierrc.json          # 🆕 Configuración Prettier
```

### Tecnologías Principales

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Astro** | 4.0+ | Framework principal, SSG |
| **TypeScript** | 5.0+ | Tipado estático, mejor DX |
| **D3.js** | 7.9+ | Visualización de datos |
| **HTML2Canvas** | 1.4+ | Exportación de imágenes |
| **Regression.js** | 2.0+ | Cálculos estadísticos |
| **SweetAlert2** | 11+ | Notificaciones elegantes |

### Servicios Centralizados

- **🖼️ ImageDownloadService:** Exportación de gráficos con soporte para temas
- **🎨 ThemeService:** Gestión de tema claro/oscuro con persistencia
- **👁️ VisitorCounterService:** Contador de visitas con API externa
- **🔧 Utilities:** DOM manipulation, URL handling, content processing

---

## 📖 Documentación

### Archivos de Documentación

- **[CAMBIOS_DOWNLOAD.md](CAMBIOS_DOWNLOAD.md)** - Mejoras sistema de descarga
- **[REORGANIZACION_RESUMEN.md](REORGANIZACION_RESUMEN.md)** - Reestructuración completa
- **[MEJORAS.md](MEJORAS.md)** - Historial de mejoras

### Guías de Desarrollo

#### Agregar Nueva Herramienta

1. **Crear página:** `src/pages/nueva-herramienta.astro`
2. **Agregar servicio:** `src/lib/services/nueva-herramienta.ts`
3. **Definir tipos:** Interfaces TypeScript apropiadas
4. **Agregar estilos:** Componentes CSS específicos
5. **Actualizar navegación:** Links en páginas principales

#### Personalizar Temas

```css
/* src/styles/global.css */
:root {
  --accent: 136, 58, 234;        /* Color principal */
  --accent-light: 224, 204, 250; /* Color claro */
  --accent-dark: 49, 10, 101;    /* Color oscuro */
}
```

#### Configurar Despliegue

- **Vercel:** Configuración automática con `vercel.json`
- **GitHub Pages:** Usar `astro.config.mjs` con base correcta
- **Netlify:** Compatible sin configuración adicional

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### 1. Preparar Entorno
```bash
git clone https://github.com/JonathanArroyaveGonzalez/Regressions.git
cd Regressions
pnpm install
```

### 2. Crear Rama de Trabajo
```bash
git checkout -b feature/nueva-funcionalidad
```

### 3. Desarrollar
- Sigue las convenciones de código existentes
- Agrega tests si es aplicable
- Documenta cambios importantes

### 4. Verificar Calidad
```bash
pnpm lint        # Verificar ESLint
pnpm format      # Formatear código
pnpm type-check  # Verificar tipos
pnpm build       # Compilar proyecto
```

### 5. Enviar Pull Request
- Describe claramente los cambios
- Referencia issues relacionados
- Incluye capturas si hay cambios visuales

### Convenciones de Commits

```
feat: nueva funcionalidad
fix: corrección de bugs
docs: documentación
style: formateo
refactor: reestructuración
test: pruebas
build: configuración
```

---

## 🐛 Reportar Issues

¿Encontraste un problema? [Abre un issue](https://github.com/JonathanArroyaveGonzalez/Regressions/issues) con:

- **Descripción clara** del problema
- **Pasos para reproducir** el error
- **Resultado esperado** vs resultado actual
- **Capturas de pantalla** si es aplicable
- **Información del sistema** (browser, OS)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 Jonathan Arroyave González

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🌟 Agradecimientos

- **[Astro Team](https://astro.build/)** por el excelente framework
- **[D3.js Community](https://d3js.org/)** por las herramientas de visualización
- **Comunidad científica** por la validación de algoritmos matemáticos
- **Estudiantes y profesores** que han probado y mejorado las herramientas

---

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~15,000+
- **Archivos TypeScript:** 25+
- **Componentes Astro:** 10+
- **Herramientas disponibles:** 3
- **Tests implementados:** En desarrollo
- **Cobertura de código:** En desarrollo

---

<div align="center">
  
  ### 🚀 ¡Hecho con ❤️ para la comunidad científica!
  
  **Physics Lab** - Transformando la educación científica con tecnología moderna
  
  [⭐ Star en GitHub](https://github.com/JonathanArroyaveGonzalez/Regressions) • [🐛 Reportar Bug](https://github.com/JonathanArroyaveGonzalez/Regressions/issues) • [💡 Solicitar Feature](https://github.com/JonathanArroyaveGonzalez/Regressions/issues)
  
</div>