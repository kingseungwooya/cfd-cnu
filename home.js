const defaultWidth = 500;
const defaultHeight = 500;

var gridXY;


var runBt = document.getElementById("executeBt");
var randomArray =  
runBt.addEventListener("click", function() {

    
    var xn = document.getElementById("xn").value;
    var yn = document.getElementById("yn").value;

    // 분할된 각 cell의 width와 height
    let dividedWidth = defaultHeight / xn;
    let dividedHeight = defaultHeight / yn;

<<<<<<< Updated upstream
=======
    //gridXY[j+1][i] - 4*gridXY[j][i] + gridXY[j-1][i] + gridXY[j][i+1] + gridXY[j][i-1] = 0;
    //gridXY[j][i] = 
>>>>>>> Stashed changes
    // create nx ny array 
    gridXY = Array(xn).fill().map(() => Array(yn));

    // grid property 설정
    document.documentElement.style.setProperty("--columns", xn);
    document.documentElement.style.setProperty("--width", dividedWidth + "px");
    document.documentElement.style.setProperty("--rows", yn);
    document.documentElement.style.setProperty("--height", dividedHeight + "px");


    // grid 초기화
    var grid = document.getElementById("gridBox");
<<<<<<< Updated upstream
=======
    
 
    grid.style.gridTemplateColumns = gridPrefix + xn + gridPostfix;
    grid.style.gridTemplateRows = gridPrefix + yn + gridPostfix;
        
    
>>>>>>> Stashed changes
    grid.innerHTML = "";
    
    // 값의 배열 만들기 
    let a = getCoefficientArray(xn, yn);
    console.log(a);
    // 계수의 배열 

    
/*

    for ( var i = 0; i < yn; i++ ) {
        gridXY[i] = new Array();
        for ( var j = 0; j < xn; j++ ) {
<<<<<<< Updated upstream

            let cell = new Cell( randomGenerator(),dividedWidth, dividedHeight);
=======
            //var itemOfGrid = gridXY[i][j];
            
            var weight = 0.0;
            if(i == yn/2 && j == xn/2) {
                weight = 100.0;   
            }
            var omega = getOmegaByWeight() 
            let cell = new Cell( weight ,dividedWidth, dividedHeight, omega);
>>>>>>> Stashed changes
            gridXY[i][j] = cell;
            var item = document.createElement("div");
            item.className = 'item';
            item.style.backgroundColor = cell['color'];
            
            grid.appendChild(item);
        }
    }
<<<<<<< Updated upstream

=======
    
     console.log(gridXY); */
>>>>>>> Stashed changes
})

// 0 ~ 1 사잇값 소수점 5자리까지 생성
function randomGenerator() {
    return Math.random().toFixed(5);
} 
function getOmegaByWeight(weight) {

}

// 가중치를 통해 red blue 값 조정
function getRGBByWeight(weight) {

    let red = (255 * weight).toFixed(5);
    let blue = (255 * ( 1 - weight )).toFixed(5);

    let rgb = `rgb(${red}, 0, ${blue})`;
    return rgb;
}

// cell class
class Cell {
    constructor ( weight ,width, height, omega) {
        this.weight = weight;
        this.width = width;
        this.height = height;
<<<<<<< Updated upstream
        this.color = getRGBByWeight(weight);
=======
        this.omega = omega;
        this.color = getColorBy(omega);    
    } 
    set weight(value) {
        this.weight = 100.0;
    }
}
// 선형방정식의 갯수 n x m  에서 행 m 개 입력  , 값의 배열 b 계수의 배열 a  
function cramer(n, a, b) {
    var matrix = [], x = [];

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

function getCoefficientArray(n, m) {
    let a = [];
    gridXY[j+1][i] - 4*gridXY[j][i] + gridXY[j-1][i] + gridXY[j][i+1] + gridXY[j][i-1] = 0;
    
    for (let i = 1; i <= m; i++) {
        let row = [];
        for (let j = 1; j <= n; j++) {
            a[j+1][i] = 1;
            a[j][i] = -4;
            a[j-1][i] = 1;
            a[j][i+1] = 1;
            a[j][i-1] = 1;
            a.push(row);
        }
>>>>>>> Stashed changes
    }
    return a;
}