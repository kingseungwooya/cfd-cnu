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
    var xn = document.getElementById("xn");
    var yn = document.getElementById("yn");

    let dividedWidth = defaultHeight / xn;
    let dividedHeight = defaultHeight / yn;

    // create nx ny array 
    gridXY = Array(nx).fill().map(() => Array(ny));

    var grid = document.getElementById("gridBox");
    grid.style.grid-template-c

    for ( var i = 0; i < yn; i++ ) {
        for ( var j = 0; j < xn; j++ ) {
            var itemOfGrid = gridXY[i][j];

            let cell = new Cell( randomGenerator(),dividedWidth, dividedHeight);

            var item = document.createElement("div");
            item.className = 'item';
            item.style.backgroundColor = cell['color'];
            



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