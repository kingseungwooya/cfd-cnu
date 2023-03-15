
// input 값으로는 구하려는 파이의 좌표가 입력된다  파이(n , m)의 ( nxm 개의 )선형방정식
export function getCoefficientArray(piI, piJ, nx, ny) {
  // gridXY[j+1][i] - 4*gridXY[j][i] + gridXY[j-1][i] + gridXY[j][i+1] + gridXY[j][i-1] = 0;
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
export function gaussianElimination(A, b) {
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
    if (maxEl == 0) {
      return "System has no unique solution";
    }

    // Swap maximum row with current row (column by column)
    for (var k = i; k < n + 1; k++) {
      var tmp = A[maxRow][k];
      A[maxRow][k] = A[i][k];
      A[i][k] = tmp;
      if (k == n) {
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
        if (j == n) {
          b[k] += c * b[i];
        }
      }
    }
  }

  // Solve equation Ax=b for an upper triangular matrix A
  var x = new Array(n);
  for (var i = n - 1; i > -1; i--) {
    if (A[i][i] === 0) {
      return "System has no unique solution";
    }
    x[i] = b[i] / A[i][i];
    for (var k = i - 1; k > -1; k--) {
      b[k] -= A[k][i] * x[i];
    }
  }

  return x;
}

/*
// crammer
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
} */
