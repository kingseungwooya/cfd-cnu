import { getCoefficientArray, gaussianElimination } from './logic/equation.js';
import { getColorByPi } from './logic/RGBCalculator.js';

const defaultWidth = 500;
const defaultHeight = 500;

var gridXY;

var minOfOmega;
var maxOfOmega;

var runBt = document.getElementById("executeBt");
runBt.addEventListener("click", function () {
  var xn = document.getElementById("xn").value;
  var yn = document.getElementById("yn").value;

  let dividedWidth = defaultWidth / xn;
  let dividedHeight = defaultHeight / yn;

  gridXY = Array(xn)
    .fill()
    .map(() => Array(yn));

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
  // 값의 배열(b) 초기화
  let valueCount = xn * yn;
  let valueArray = new Array(valueCount).fill(0);

  // 계수 행렬 초기화
  let coefficientMatrix = [];
  let rowCount = 0;

  for (var i = 1; i <= yn; i++) {
    gridXY[i] = new Array();
    for (var j = 1; j <= xn; j++) {
      // 계수행렬 구하기
      coefficientMatrix[rowCount] = new Array();
      coefficientMatrix[rowCount] = getCoefficientArray(j, i, xn, yn);

      // 값 배열 구하기
      if (j == Math.ceil(yn / 2) && i == Math.ceil(xn / 2)) {
        valueArray[rowCount] = 100; // 중간값은 100으로 value 생성
      }
      rowCount++;
    }
  }

  let result = gaussianElimination(coefficientMatrix, valueArray);
  console.log(result);
  minOfOmega = Math.min(result);
  maxOfOmega = Math.max(result);

  let count = 0;
  for (row = 0; row < xn; row++) {
    for (col = 0; col < yn; col++) {
      var pi = result[count];
      var color = getColorByPi(pi, minOfOmega, maxOfOmega);
      var item = document.createElement("div");
      item.className = "item";

      item.style.backgroundColor = color;
      grid.appendChild(item);
      count++;
    }
  }
});

class Cell {
  constructor(weight, width, height, omega) {
    this.weight = weight;
    this.width = width;
    this.height = height;
    this.omega = omega;
    this.color = getColorByOmega(omega);
  }
}
