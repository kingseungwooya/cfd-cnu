const defaultWidth = 1;
const defaultHeight = 1;

const colorConfig = {
    red : [0.0, 0.2],
    orange :[0.2, 0.4],
    yellow : [0.4, 0.6],
    green : [0.6, 0.8],
    blue : [0.8, 1.0]
}

var gridXY;

var runBt = document.getElementById("executeBt");
var randomArray =  
runBt.addEventListener("click", function() {
    var xn = document.getElementById("xn").value;
    var yn = document.getElementById("yn").value;

    let dividedWidth = defaultHeight / xn;
    let dividedHeight = defaultHeight / yn;
    console.log("1");
    // create nx ny array 
    gridXY = Array(xn).fill().map(() => Array(yn));
    var gridPrefix = "repeat(";
    var gridPostfix = ",1fr)" 
    var grid = document.getElementById("gridBox");
    grid.style.gridTemplate = 
        gridPrefix + xn + gridPostfix +" / " 
        + gridPrefix + yn + gridPostfix + ";";
    console.log("2");

    for ( var i = 0; i < yn; i++ ) {
        for ( var j = 0; j < xn; j++ ) {
            //var itemOfGrid = gridXY[i][j];

            let cell = new Cell( randomGenerator(),dividedWidth, dividedHeight);
           // gridXY[i][j] = (cell);
            var item = document.createElement("div");
            item.className = 'item';
            item.style.backgroundColor = cell['color'];
            var text = document.createTextNode(cell['weight']);
            item.appendChild(text);
            grid.appendChild(item);
            console.log("3");
        }
    }
    
     
})

// 0 ~ 1 사잇값 
function randomGenerator() {
    return Math.random();
} 
function getColorByRandomNumber(weight) {
    for(var [key, value] in colorConfig) {
        var min = value[0];
        var max = value[1];
        if ( min<= weight < max) {
            return key;
        }
    }
    
}

class Cell {
    constructor ( weight ,width, height ) {
        this.weight = weight;
        this.width = width;
        this.height = height;
        this.color = getColorByRandomNumber(weight);
    }
}