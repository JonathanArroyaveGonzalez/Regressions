 # Regresiones Lineales y Cuadráticas

 Herramienta web interactiva para realizar regresiones lineales y cuadráticas, visualizar gráficas y tablas, y descargar los resultados como imagen. Incluye soporte para tema claro/oscuro.

 ## 🚀 Características principales

 - **Cambio de tema**: Cambia entre modo claro y oscuro con un solo clic.
 - **Gráficas mejoradas**: La curva de la regresión cuadrática se muestra suave y precisa.
 - **Descarga de resultados**: Descarga la gráfica junto con la tabla de datos como una imagen PNG.
 - **Interfaz intuitiva**: Agrega o elimina filas de datos fácilmente, personaliza los nombres de variables y visualiza la ecuación y el R².

 ## 📦 Instalación

 ```sh
 git clone https://github.com/JonathanArroyaveGonzalez/Regressions.git
 cd Regressions
 npm install
 ```

 ## �️ Uso

 1. Ejecuta el proyecto con Astro (`npm run dev`).
 2. Ingresa tus datos en la tabla.
 3. Selecciona el tipo de regresión (lineal o cuadrática).
 4. Visualiza la gráfica y la tabla de resultados.
 5. Usa el botón "Descargar gráfica y tabla" para guardar los resultados como imagen.
 6. Cambia el tema claro/oscuro con el botón correspondiente.

 ## 📚 Estructura del Proyecto

 ```text
 /public
	 favicon.svg
 /src
	 /assets
	 /components
		 Card.astro
		 Content.astro
	 /js
		 index.js
		 theme.js
		 download.js
	 /layouts
		 Layout.astro
	 /pages
		 index.astro
		 tutorial.astro
		 acerca-de.astro
 package.json
 astro.config.mjs
 tsconfig.json
 ```

 ## 🛠️ Tecnologías

 - [Astro](https://astro.build/)
 - [D3.js](https://d3js.org/) para visualización de datos
 - [html2canvas](https://html2canvas.hertzen.com/) para descarga de imágenes
 - [SweetAlert2](https://sweetalert2.github.io/) para diálogos interactivos

 ## Comandos útiles

 Todos los comandos se ejecutan desde la raíz del proyecto:

 | Comando                   | Acción                                           |
 | :------------------------ | :----------------------------------------------- |
 | `npm install`             | Instala dependencias                            |
 | `npm run dev`             | Inicia el servidor local en `localhost:4321`     |
 | `npm run build`           | Construye el sitio para producción en `./dist/`  |
 | `npm run preview`         | Previsualiza el build localmente                 |
 | `npm run astro ...`       | Ejecuta comandos CLI de Astro                    |
 | `npm run astro -- --help` | Ayuda sobre la CLI de Astro                     |

 ## ✨ Créditos

 Desarrollado por [Jonathan Arroyave](https://github.com/JonathanArroyaveGonzalez)
