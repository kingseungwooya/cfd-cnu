const defaultWidth = 500;
const defaultHeight = 500;

const colorConfig = {
    'red' : [0.0, 0.2],
    'orange' :[0.2, 0.4],
    'yellow' : [0.4, 0.6],
    'green' : [0.6, 0.8],
    'blue' : [0.8, 1.0]
}

var gridXY;


var runBt = document.getElementById("executeBt");
var randomArray =  
runBt.addEventListener("click", function() {

    
    var xn = document.getElementById("xn").value;
    var yn = document.getElementById("yn").value;

    let dividedWidth = defaultHeight / xn;
    let dividedHeight = defaultHeight / yn;

    //gridXY[j+1][i] - 4*gridXY[j][i] + gridXY[j-1][i] + gridXY[j][i+1] + gridXY[j][i-1] = 0;
    //gridXY[j][i] = 
    // create nx ny array 
    gridXY = Array(xn).fill().map(() => Array(yn));

    document.documentElement.style.setProperty("--columns", xn);
    document.documentElement.style.setProperty("--width", dividedWidth + "px");
    document.documentElement.style.setProperty("--rows", yn);
    document.documentElement.style.setProperty("--height", dividedHeight + "px");


    var gridPrefix = "repeat(";
    var gridPostfix = ", 1fr);" 
    var grid = document.getElementById("gridBox");
    
 
    grid.style.gridTemplateColumns = gridPrefix + xn + gridPostfix;
    grid.style.gridTemplateRows = gridPrefix + yn + gridPostfix;
        
    
    grid.innerHTML = "";
    
    // 값의 배열 만들기 
    
    // 계수의 배열 

    let coefficientMatrix = [];


    for ( var i = 0; i < yn; i++ ) {
        gridXY[i] = new Array();
        for ( var j = 0; j < xn; j++ ) {

            
            var weight = 0.0;
            if(i == yn/2 && j == xn/2) {
                weight = 100.0;   
            }
            coefficientMatrix.push(getCoefficientArray(i, j, xn, yn));
            /*
            var omega = getOmegaByWeight() 
            let cell = new Cell( weight ,dividedWidth, dividedHeight, omega);
            gridXY[i][j] = cell;
            var item = document.createElement("div");
            item.className = 'item';
           
            item.style.backgroundColor = cell['color'];
            var text = document.createTextNode(cell['weight']);
            //item.appendChild(text);
            
            grid.appendChild(item);*/
        }
    }
    
     console.log("coefficientMatrix is : " + coefficientMatrix); 
})

// 0 ~ 1 사잇값 
function randomGenerator() {
    return Math.random().toFixed(1);
} 
function getOmegaByWeight(weight) {

}

function getColorByRandomNumber(weight) {
    for(key in colorConfig) {
        
        var min = colorConfig[key][0];
        var max = colorConfig[key][1];
        
        if ( min < weight <= max) {
            //console.log(weight);
            //console.log(key);
            return key;
        }
    }
    
}

class Cell {
    constructor ( weight ,width, height, omega) {
        this.weight = weight;
        this.width = width;
        this.height = height;
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
// input 값으로는 구하려는 파이의 좌표가 입력된다  파이(n , m)의 ( nxm 개의 )선형방정식 
function getCoefficientArray(piI, piJ, nx, ny) {
    
    
    gridXY[j+1][i] - 4*gridXY[j][i] + gridXY[j-1][i] + gridXY[j][i+1] + gridXY[j][i-1] = 0;
    let row = [];
    for (let j = 1; j <= ny; i++) {
        
        for (let i = 1; i <= nx; i++) {
            if( i == piI && j == piJ) {
                row.push(-4);    
            }
            else if( (i == (piI - 1) && j == piJ) ||
                  (i == piI && j == piJ - 1) ||
                      (i == (piI + 1) && j == piJ) ||
                          (i == piI && j == piJ + 1) ) {
                row.push(1);    
            } else {
                row.push(0)
            }
        }
    }
    return row;
}