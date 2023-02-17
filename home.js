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


