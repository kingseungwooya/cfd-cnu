import { getColorByPi } from './logic/RGBCalculator.js';
import { laplacianSOR } from './iter_method/iterativeMethod.js';

const defaultWidth = 500;
const defaultHeight = 500;

// iterative method constant value

// 1e-6 or 1e-8.
const epsilon = 0.001;
// 1000 or 10000
const maxIter = 1000;
// 1 ~ 2
const omega = 1.5;
// 
var minOfPis;
var maxOfPis;

var runBt = document.getElementById("executeBt");
runBt.addEventListener("click", function () {
  var xn = document.getElementById("xn").value;
  var yn = document.getElementById("yn").value;

  let dividedWidth = defaultWidth / xn;
  let dividedHeight = defaultHeight / yn;

  document.documentElement.style.setProperty("--columns", xn);
  document.documentElement.style.setProperty("--width", dividedWidth + "px");
  document.documentElement.style.setProperty("--rows", yn);
  document.documentElement.style.setProperty("--height", dividedHeight + "px");

  var gridPrefix = "repeat(";
  var gridPostfix = ", 1fr);";
  var grid = document.getElementById("gridBox");

  grid.style.gridTemplateColumns = gridPrefix + xn + gridPostfix;
  grid.style.gridTemplateRows = gridPrefix + yn + gridPostfix;

  grid.innerHTML = "";
 

   // Initialize the b matrix with a single point source
   const b = [];
   for (let i = 0; i < yn; i++) {
     const temp = [];
     for (let j = 0; j < xn; j++) {
       if (j === Math.floor(xn / 2) && i === Math.floor(yn / 2)) {
         temp.push(100);
       } else {
         temp.push(0);
       }
     }
     b.push(temp);
   }
  let startTime = new Date();
  let result = laplacianSOR(xn, yn,epsilon, omega, b, maxIter);
  let endTime = new Date();
  console.log(endTime - startTime);
  
  findUV(result, dividedWidth, dividedHeight);
 
  // 결과 내 최대 최소 값 구하기 

  maxOfPis = result.reduce((acc, curr) => Math.max(acc, ...curr), Number.NEGATIVE_INFINITY);
  minOfPis =  result.reduce((acc, curr) => Math.min(acc, ...curr), Number.POSITIVE_INFINITY);
  console.log(`Maximum value: ${maxOfPis}`); // Maximum value: 9
  console.log(`Minimum value: ${minOfPis}`); // Minimum value: 1

  // 각 cell에 색깔 입력 
  for (var i = 0; i < yn; i++) {
    for (var j = 0; j < xn; j++) {
      var pi = result[i][j];
      var color = getColorByPi(pi, minOfPis, maxOfPis);
      var item = document.createElement("div");
      item.className = "item";

      item.style.backgroundColor = color.toString();
      grid.appendChild(item);
    }
  }
});

function findUV(p, dx, dy) {
  const n = p.length;
  const m = p[0].length;
  const u = new Array(n);
  const v = new Array(n);

  for (let i = 0; i < n; i++) {
    u[i] = new Array(m).fill(0);
  }

  for (let i = 0; i < n; i++) {
    v[i] = new Array(m).fill(0);
  }
  console.log("u is" );
  console.log( u);

  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      u[i][j] = (p[i+1][j] - p[i-1][j])  / (2 * dx);
      v[i][j] = (p[i][j+1] - p[i][j-1]) / (2 * dy);
    }
  }
  u[0][0] = 0;
  u[0][1] = 0;
  u[1][0] = 0;
  v[0][0] = 0;
  v[1][0] = 0;
  v[0][1] = 0;
  u[n - 1][m - 1] = 0;
  v[n - 1][m - 1] = 0;
  u[n - 1][m - 2] = 0;
  v[n - 1][m - 2] = 0;
  u[n - 2][m - 1] = 0;
  v[n - 2][m - 1] = 0;

  drawArrows(n, m, dx, dy, u, v);
  return { u, v };



}
function drawArrows(n, m, dx, dy, u, v) {
  d3.selectAll(".svg").select("svg").remove();
  document.querySelectorAll(".svg").innerHTML = "";
  const svg = d3.select("body")
    .append("svg")
    .attr("class", "svg")
    .attr("width", 500)
    .attr("height", 500);
    
  const CELL_SIZE = Math.min(svg.attr("width") / m, svg.attr("height") / n);
  
  const arrowSize = CELL_SIZE * 0.2;
  const arrowheads = [
    "M 0 0 L -5 -10 L 5 -10 z",
    "M 0 0 L -5 10 L 5 10 z"
  ];
  
  const arrowheadScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([-arrowSize / 2, arrowSize / 2]);
  
  const lineData = [];
  for (let i = 0; i < n ; i++) {
    for (let j = 0; j < m ; j++) {
      const x = j * CELL_SIZE + CELL_SIZE / 2;
      const y = (n - 1 - i) * CELL_SIZE + CELL_SIZE / 2;
      
      // Calculate the center of the cell
      const x0 = j * dx + dx / 2;
      const y0 = i * dy + dy / 2;
      
      // Calculate the end point of the line
      const x1 = x0 + arrowheadScale(u[i][j]);
      const y1 = y0 - arrowheadScale(v[i][j]);

      lineData.push({x1, y1, x2: x0, y2: y0});
      
      const arrowhead = arrowheads[Math.sign(v[i][j]) === 1 ? 0 : 1];
      /*
      const arrow = svg.append("path")
        .attr("d", arrowhead)
        .attr("transform", `translate(${x},${y}) rotate(${Math.atan2(-v[i][j], u[i][j]) * 180 / Math.PI})`)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "none");*/
    }
  }
  
  const lines = svg.selectAll("line")
    .data(lineData)
    .enter()
    .append("line")
    .attr("x1", d => d.x1)
    .attr("y1", d => d.y1)
    .attr("x2", d => d.x2)
    .attr("y2", d => d.y2)
    .attr("stroke", "black")
    .attr("stroke-width", 20)
    .attr("marker-end", d => `url(#arrow-${d.x2}-${d.y2})`);
  
    
    const arrowMarkers = svg.selectAll("marker")
    .data(lineData)
    .enter()
    .append("marker")
    .attr("id", d => `arrow-${d.x2}-${d.y2}`)
    .attr("markerWidth", arrowSize)
    .attr("markerHeight", arrowSize)
    .attr("refX", arrowSize / 2)
    .attr("refY", arrowSize / 2)
    .attr("orient", "auto")
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1);
}

