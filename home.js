const defaultWidth = 500;
const defaultHeight = 500;


var gridXY;

var minOfOmega;
var maxOfOmega;


var runBt = document.getElementById("executeBt");
var randomArray = runBt.addEventListener("click", function () {
  var xn = document.getElementById("xn").value;
  var yn = document.getElementById("yn").value;

  let dividedWidth = defaultHeight / xn;
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
        console.log(yn / 2);
        valueArray[rowCount] = 100; // 중간값은 100으로 value 생성
      }
      rowCount++;
    }
  }

  console.log(valueArray);
  console.log(coefficientMatrix);

  // solve x by 계수행렬 and 값 배열
  // let resultByCramer = cramer(valueCount,coefficientMatrix, valueArray)
  let result = gaussianElimination(coefficientMatrix, valueArray);
  console.log(result);
  minOfOmega = Math.min(result);
  maxOfOmega = Math.max(result);


  let count = 0;
  for( row = 0; row < xn; row++) {
    for( col = 0; col < yn; col++) {
      var omega = result[count];
      var color = getColorByOmega(omega, minOfOmega, maxOfOmega);
      //let cell = new Cell( weight ,dividedWidth, dividedHeight, omega);
      //gridXY[i][j] = cell;
      var item = document.createElement("div");
      item.className = 'item';
           
      item.style.backgroundColor =color;
      grid.appendChild(item);
      count++;
    }
  }

});


function getColorByRandomNumber(weight) {
  for (key in colorConfig) {
    var min = colorConfig[key][0];
    var max = colorConfig[key][1];

    if (min < weight <= max) {
      //console.log(weight);
      //console.log(key);
      return key;
    }
  }
}
function getColorByOmega(omega, min, max) {
  if( omega < 0) {
    var red = (min - value) * (255/(max-min));
    var blue = 0;
    var green = (value - max) * (255/(max-min));
  } else {
    var blue = (max - value) * (255/(max-min));
    var red = 0;
    var green = (value - min) * (255/(max-min));
  }
  

  let rgb = `rgb(${red}, ${green}, ${blue}})`;
  return rgb;
}

class Cell {
  constructor(weight, width, height, omega) {
    this.weight = weight;
    this.width = width;
    this.height = height;
    this.omega = omega;
    this.color = getColorByOmega(omega);
  }
  
}
// input 값으로는 구하려는 파이의 좌표가 입력된다  파이(n , m)의 ( nxm 개의 )선형방정식
function getCoefficientArray(piI, piJ, nx, ny) {
    //gridXY[j+1][i] - 4*gridXY[j][i] + gridXY[j-1][i] + gridXY[j][i+1] + gridXY[j][i-1] = 0;
    const FOUR = Number(-4);
    const ONE = Number(1);
    const ZERO = Number(0);

    let row = new Array();
    for (let j = 1; j <= ny; j++) {
      for (let i = 1; i <= nx; i++) {
        if (i == piI && j == piJ) {
          row.push(FOUR);
        } else if (
          (i == piI - 1 && j == piJ) ||
          (i == piI && j == piJ - 1) ||
          (i == piI + 1 && j == piJ) ||
          (i == piI && j == piJ + 1)
        ) {
          row.push(ONE);
        } else {
          row.push(ZERO);
        }
      }
      
    }
    return row;
  }
// 가우스 소거법
function solveSystemOfLinearEquations(A, b) {
  // Validation 
  if (A.length !== b.length) {
    return "Error: incompatible systems";
  }

  let x = [];
  for (let i = 0; i < A.length; i++) {
    let sum = 0;
    for (let j = 0; j < A[i].length; j++) {
      var multiple = A[i][j] * x[j];
      if (!isNaN(multiple)) {
        sum += A[i][j] * x[j];
      }
    }
    var calc = (b[i] - sum) / A[i][i];
    if (!isNaN(calc)) {
      x[i] = calc;
    } else {
      x[i] = 0;
    }
  }

  return x;
}
function gaussianElimination(A, b) {
    var n = A.length;

    for (var i = 0; i < n; i++) {
        // Search for maximum in this column
        var maxEl = Math.abs(A[i][i]),
            maxRow = i;
        for (var k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            }
        }
        //If the max element is zero, then the system has no unique solution
        if(maxEl == 0){
            return 'System has no unique solution';
        }

        // Swap maximum row with current row (column by column)
        for (var k = i; k < n + 1; k++) {
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
            if(k == n){
                var tmpB = b[maxRow];
                b[maxRow] = b[i];
                b[i] = tmpB;
            }
        }

        // Make all rows below this one 0 in current column
        for (k = i + 1; k < n; k++) {
            var c = -A[k][i] / A[i][i];
            for (var j = i; j < n + 1; j++) {
                if (i == j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
                if(j == n){
                    b[k] += c * b[i];
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    var x = new Array(n);
    for (var i = n - 1; i > -1; i--) {
        if(A[i][i] === 0){
            return 'System has no unique solution';
        }
        x[i] = b[i] / A[i][i];
        for (var k = i - 1; k > -1; k--) {
            b[k] -= A[k][i] * x[i];
        }
    }

    return x;
}

// 선형방정식의 갯수 n x m  에서 행 m 개 입력  , 값의 배열 b 계수의 배열 a
function cramer(n, a, b) {
  var matrix = [],
    x = [];

  // Build n x (n+1) matrix
  for (let i = 0; i < n; i++) {
    matrix.push([]);
    for (let j = 0; j <= n; j++) {
      if (j !== n) {
        matrix[i][j] = a[i][j];
      } else {
        matrix[i][j] = b[i];
      }
    }
  }
  // Calculate determinants of each coefficient
  for (let i = 0; i < n; i++) {
    let tempMatrix = [];

    for (let j = 0; j < n; j++) {
      let row = [];
      for (let k = 0; k < n; k++) {
        if (j !== i) {
          row.push(matrix[j][k]);
        }
      }
      tempMatrix.push(row);
    }

    x[i] = getDeterminant(tempMatrix, n - 1) / getDeterminant(matrix, n);
  }

  return x;
}
// Function for calculate determinant
function getDeterminant(matrix, n) {
  let sum = 0;

  if (n === 1) {
    return matrix[0][0];
  }

  for (let i = 0; i < n; i++) {
    let tempMatrix = [];

    for (let j = 0; j < n - 1; j++) {
      let row = [];
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          row.push(matrix[j + 1][k]);
        }
      }
      tempMatrix.push(row);
    }

    let det = getDeterminant(tempMatrix, n - 1);
    sum += Math.pow(-1, i + 2) * matrix[0][i] * det;
  }

  return sum;
}

