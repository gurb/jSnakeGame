var gameSnake;

window.addEventListener('keydown', this.controller, false);

function startGame(){
    gameArea.start();
    gameSnake = new snake(80,40,"blue",40,160);
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.ctx = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 500);
    },
    clear : function() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
}

function snake(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameArea.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    gameArea.clear();
    gameSnake.newPosition();
    gameSnake.update();
}

function controller(event) {
    if(event.which == 38){ //up
        gameSnake.speedY -=1;
    }else if(event.which == 37){ //left
        gameSnake.speedX -=1;
    }else if(event.which == 40){ //down
        gameSnake.speedY +=1;
    }else if(event.which == 39){ //right
        gameSnake.speedX +=1;
    }
}





