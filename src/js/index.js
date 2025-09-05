import * as d3 from "d3";
import Swal from "sweetalert2";

document.getElementById("agregarFila").addEventListener("click", function () {
  let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
  let nuevaFila = tabla.insertRow(tabla.rows.length);
  let celda1 = nuevaFila.insertCell(0);
  let celda2 = nuevaFila.insertCell(1);
  const isLight = document.documentElement.classList.contains('light-theme');
  const inputStyle = isLight ? 'color:#181818;' : 'color:#fff;';
  celda1.innerHTML = `<td><input type="number" class=" input-x" style="${inputStyle}"></td>`;
  celda2.innerHTML = `<td><input type="number" class="input-y" style="${inputStyle}"></td>`;
});

document.getElementById("eliminarFila").addEventListener("click", function () {
  let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
  if (tabla.rows.length > 1) {
    tabla.deleteRow(tabla.rows.length - 1);
  }
});

document.getElementById("graficar").addEventListener("click", function () {
  let data = [];
  const inputXElements = document.querySelectorAll(".input-x");
  const inputYElements = document.querySelectorAll(".input-y");

  inputXElements.forEach((inputX, index) => {
    const x = parseFloat(inputX.value);
    const y = parseFloat(inputYElements[index].value);
    if (!isNaN(x) && !isNaN(y)) {
      data.push({ x, y });
    }
  });

  if (data.length > 0) {
    // Detectar tema actual
    const isLight = document.documentElement.classList.contains('light-theme');
    Swal.fire({
      title: "Seleccione el tipo de regresión que desea realizar.",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#00B600",
      denyButtonColor: "#FF7400",
      cancelButtonColor: "#FF0000",
      confirmButtonText: "Lineal📈",
      denyButtonText: `Cuadratica📈`,
      cancelButtonText: `Cancelar❌`,
      color: isLight ? "#222" : "#fff",
      background: isLight ? "#f7f7f7" : "#13151a",
      imageUrl: "https://i.gifer.com/YaDc.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Animación Funciones 📈",
    }).then((result) => {
      if (result.isConfirmed) {
        drawGraph(data);
        data = [];
      } else if (result.isDenied) {
        drawGraph2(data);
        data = [];
      }
    });
  }
});

function drawGraph(data) {
  const margin = { top: 20, right: 20, bottom: 90, left: 90 };

  let inputX = document.getElementById("inputX").value;
  let inputY = document.getElementById("inputY").value;

  if (inputX.trim() === "" && inputY.trim() === "") {
    inputX = "X";
    inputY = "Y";
  }

  // Selecciona el contenedor SVG y elimina su contenido previo antes de añadir uno nuevo
  const svgContainer = d3.select("#graph-container");
  svgContainer.selectAll("*").remove();

  const svg = svgContainer
    .append("svg")
    .attr("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`) // viewBox dinámico
    .attr("preserveAspectRatio", "xMidYMid meet") // Mantener el aspect ratio
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const width = window.innerWidth - margin.left - margin.right;
  const height = window.innerHeight - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.x)])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.y)])
    .range([height, 0]);

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  // Detectar tema actual para color de texto
  const isLight = document.documentElement.classList.contains('light-theme');
  const axisColor = isLight ? '#181818' : '#fff';

  // Añadir ejes X e Y a la gráfica
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("fill", axisColor);

  svg.append("g")
    .call(yAxis)
    .selectAll("text")
    .style("fill", axisColor);

  // Cambiar color de las líneas y ticks de los ejes
  svg.selectAll('.domain').attr('stroke', axisColor);
  svg.selectAll('.tick line').attr('stroke', axisColor);

  // Agregar etiquetas a los ejes
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 50) + ")"
    )
    .style("text-anchor", "middle")
    .text(inputX)
    .style("fill", axisColor)
    .style("font-size", "25px");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(inputY)
    .style("fill", axisColor)
    .style("font-size", "25px");

  // Dibujar puntos de dispersión
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 5)
    .attr("fill", "steelblue")
    .attr("opacity", 0.7); // ajusta la opacidad

  // Calcular regresión lineal manualmente
  const n = data.length;
  const xSum = data.reduce((acc, d) => acc + d.x, 0);
  const ySum = data.reduce((acc, d) => acc + d.y, 0);
  const xySum = data.reduce((acc, d) => acc + d.x * d.y, 0);
  const xSquaredSum = data.reduce((acc, d) => acc + d.x * d.x, 0);

  const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
  const intercept = (ySum - slope * xSum) / n;

  // Calcular coeficiente de determinación (R^2)
  const yMean = ySum / n;
  const SSTotal = data.reduce((acc, d) => acc + Math.pow(d.y - yMean, 2), 0);
  const SSResidual = data.reduce((acc, d) => {
    const yPredicted = slope * d.x + intercept;
    return acc + Math.pow(d.y - yPredicted, 2);
  }, 0);
  const coefficientOfDetermination = 1 - SSResidual / SSTotal;

  // Dibujar línea de tendencia proyectada desde x=0 hasta x máximo
  const minX = 0;
  const maxX = d3.max(data, (d) => d.x);
  const trendLinePoints = [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept }
  ];
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveLinear);

  svg
    .append("path")
    .datum(trendLinePoints)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("d", line)
    .attr("opacity", 0.8);

  // Mostrar ecuación de la línea y coeficiente R^2
  let equationText = `${inputY} =  ${slope.toFixed(
    2
  )} ${inputX}  + ${intercept.toFixed(2)} `;

  if (intercept.toFixed(2) < 0) {
    equationText = `${inputY} =  ${slope.toFixed(
      2
    )} ${inputX}  ${intercept.toFixed(2)} `;
  }

  let rSquaredText = ` ✅ R² = ${coefficientOfDetermination.toFixed(5)} ✅`;
   if (coefficientOfDetermination <= 0.6 || coefficientOfDetermination >= 1.4) {
    rSquaredText = `❌ R² = ${coefficientOfDetermination.toFixed(5)} ❌ <strong>El ajuste no es bueno revise sus datos.</strong>`;
   }
  const titleG = `${inputY} Frente a ${inputX}`;

  //Insetar los datos de la tabla en el contenedor
  insertDataTable(equationText, titleG, rSquaredText, data, inputX, inputY);
}

function drawGraph2(data) {
  const margin = { top: 20, right: 20, bottom: 90, left: 90 };

  let inputX = document.getElementById("inputX").value;
  let inputY = document.getElementById("inputY").value;

  if (inputX.trim() === "" && inputY.trim() === "") {
    inputX = "X";
    inputY = "Y";
  }

  const svgContainer = d3.select("#graph-container");
  svgContainer.selectAll("*").remove();

  const svg = svgContainer
    .append("svg")
    .attr("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const width = window.innerWidth - margin.left - margin.right;
  const height = window.innerHeight - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.x), d3.max(data, (d) => d.x)])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.y)])
    .range([height, 0]);

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  // Detectar tema actual para color de texto
  const isLight = document.documentElement.classList.contains('light-theme');
  const axisColor = isLight ? '#181818' : '#fff';

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("fill", axisColor);

  svg.append("g")
    .call(yAxis)
    .selectAll("text")
    .style("fill", axisColor);

  // Cambiar color de las líneas y ticks de los ejes
  svg.selectAll('.domain').attr('stroke', axisColor);
  svg.selectAll('.tick line').attr('stroke', axisColor);

  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 50) + ")"
    )
    .style("text-anchor", "middle")
    .text(inputX)
    .style("fill", axisColor)
    .style("font-size", "25px");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(inputY)
    .style("fill", axisColor)
    .style("font-size", "25px");

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 5)
    .attr("fill", "steelblue")
    .attr("opacity", 0.7);

  // Calcular los coeficientes de la regresión cuadrática
  const n = data.length;
  const sumX = data.reduce((acc, d) => acc + d.x, 0);
  const sumY = data.reduce((acc, d) => acc + d.y, 0);
  const sumXY = data.reduce((acc, d) => acc + d.x * d.y, 0);
  const sumXX = data.reduce((acc, d) => acc + d.x * d.x, 0);
  const sumXXX = data.reduce((acc, d) => acc + d.x * d.x * d.x, 0);
  const sumXXXX = data.reduce((acc, d) => acc + d.x * d.x * d.x * d.x, 0);
  const sumXXY = data.reduce((acc, d) => acc + d.x * d.x * d.y, 0);
  const sumYY = data.reduce((acc, d) => acc + d.y * d.y, 0);

  const determinant =
    (sumXX - (sumX * sumX) / n) * (sumXXXX - (sumXX * sumXX) / n) -
    (sumXXX - (sumXX * sumX) / n) * (sumXXX - (sumXX * sumX) / n);

  const determinantB =
    (sumXY - (sumX * sumY) / n) * (sumXXXX - (sumXX * sumXX) / n) -
    (sumXXY - (sumXX * sumY) / n) * (sumXXX - (sumXX * sumX) / n);

  const determinantC =
    (sumXX - (sumX * sumX) / n) * (sumXXY - (sumXX * sumY) / n) -
    (sumXXX - (sumXX * sumX) / n) * (sumXY - (sumX * sumY) / n);

  const b = determinantB / determinant;
  const c = determinantC / determinant;
  const a = sumY / n - b * (sumX / n) - c * (sumXX / n);

  // La función cuadrática correcta es: a + b*x + c*x^2
  const quadraticFunction = (x) => a + b * x + c * x * x;
  const minX = d3.min(data, (d) => d.x);
  const maxX = d3.max(data, (d) => d.x);
  const curvePoints = [];
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const x = minX + (i * (maxX - minX)) / steps;
    curvePoints.push({ x, y: quadraticFunction(x) });
  }
  //Calcular R^2
  const coefficientOfDetermination =
    (b * (sumXY - (sumX * sumY) / n) + c * (sumXXY - (sumXX * sumY) / n)) /
    (sumYY - (sumY * sumY) / n);

  // Dibujar la curva de la parábola suavizada
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveBasis);

  svg
    .append("path")
    .datum(curvePoints)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("d", line)
    .attr("opacity", 0.8);

  let equationText = `${inputY} = ${a.toFixed(2)} + ${b.toFixed(2)} ${inputX} + ${c.toFixed(2)} ${inputX}²`;
  if (b < 0 && c < 0) {
    equationText = `${inputY} = ${a.toFixed(2)}  ${b.toFixed(2)} ${inputX}  ${c.toFixed(2)} ${inputX}²`;
  } else if (b < 0) {
    equationText = `${inputY} = ${a.toFixed(2)}  ${b.toFixed(2)} ${inputX} + ${c.toFixed(2)} ${inputX}²`;
  } else if (c < 0) {
    equationText = `${inputY} = ${a.toFixed(2)} + ${b.toFixed(2)} ${inputX}  ${c.toFixed(2)} ${inputX}²`;
  }

  let rSquaredText = ` ✅ R² = ${coefficientOfDetermination.toFixed(5)} ✅`;
  if (coefficientOfDetermination <= 0.6 || coefficientOfDetermination >= 1.4)  {
    rSquaredText = `❌ R² = ${coefficientOfDetermination.toFixed(5)} ❌ <strong>El ajuste no es bueno revise sus datos.</strong>`;
   }
  //Insertar los datos de la tabla en el contenedor
  insertDataTable(
    equationText,
    `${inputY} Frente a ${inputX}`,
    rSquaredText,
    data,
    inputX,
    inputY
  );
}

function insertDataTable(
  equationText,
  titleG,
  rSquaredText,
  data,
  inputX,
  inputY
) {
  let dataTable = document.getElementById("data-table");
  let contentText = document.getElementById("content-text");
  let contentTextExport = document.getElementById("content-text-export");
  const html = `🔺 ${titleG} 🔻<br>↪︎ ${equationText} ↩︎<br>  ${rSquaredText} `;
  contentText.innerHTML = html;
  if (contentTextExport) contentTextExport.innerHTML = html;

  // Detectar tema actual para el color de texto
  const isLight = document.documentElement.classList.contains('light-theme');
  const thStyle = isLight ? ' style="color:#181818;"' : '';
  const tdStyle = isLight ? ' style="color:#181818;"' : '';
  // Crear la estructura de la tabla
  let tableHTML = `<table><thead><tr><th${thStyle}>${inputX}➡️</th><th${thStyle}>${inputY}⬆️</th></tr></thead><tbody>`;
  // Iterar sobre los datos y agregar filas a la tabla
  data.forEach((item) => {
    tableHTML += `<tr><td${tdStyle}>${item.x}</td><td${tdStyle}>${item.y}</td></tr>`;
  });

  tableHTML += "</tbody></table>";

  dataTable.innerHTML = tableHTML;
}
