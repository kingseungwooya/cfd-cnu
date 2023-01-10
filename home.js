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
    
    for ( var i = 0; i < yn; i++ ) {
        gridXY[i] = new Array();
        for ( var j = 0; j < xn; j++ ) {
            //var itemOfGrid = gridXY[i][j];

            let cell = new Cell( randomGenerator(),dividedWidth, dividedHeight);
            gridXY[i][j] = cell;
            var item = document.createElement("div");
            item.className = 'item';
           
            item.style.backgroundColor = cell['color'];
            var text = document.createTextNode(cell['weight']);
            //item.appendChild(text);
            
            grid.appendChild(item);
        }
    }
    
     console.log(gridXY);
})

// 0 ~ 1 사잇값 
function randomGenerator() {
    return Math.random().toFixed(1);
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
    constructor ( weight ,width, height ) {
        this.weight = weight;
        this.width = width;
        this.height = height;
        this.color = getColorByRandomNumber(weight);
    }
}