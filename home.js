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

    // create nx ny array 
    gridXY = Array(xn).fill().map(() => Array(yn));

    // grid property 설정
    document.documentElement.style.setProperty("--columns", xn);
    document.documentElement.style.setProperty("--width", dividedWidth + "px");
    document.documentElement.style.setProperty("--rows", yn);
    document.documentElement.style.setProperty("--height", dividedHeight + "px");


    // grid 초기화
    var grid = document.getElementById("gridBox");
    grid.innerHTML = "";
    
    for ( var i = 0; i < yn; i++ ) {
        gridXY[i] = new Array();
        for ( var j = 0; j < xn; j++ ) {

            let cell = new Cell( randomGenerator(),dividedWidth, dividedHeight);
            gridXY[i][j] = cell;
            var item = document.createElement("div");
            item.className = 'item';
            item.style.backgroundColor = cell['color'];
            
            grid.appendChild(item);
        }
    }

})

// 0 ~ 1 사잇값 소수점 5자리까지 생성
function randomGenerator() {
    return Math.random().toFixed(5);
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
    constructor ( weight ,width, height ) {
        this.weight = weight;
        this.width = width;
        this.height = height;
        this.color = getRGBByWeight(weight);
    }
}