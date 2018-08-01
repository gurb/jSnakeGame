var gameSnake;
var elem = document.getElementById("oyun");

window.addEventListener('keydown', this.controller, false);

//Mozilla ve Opera9+
if (document.addEventListener){
    document.addEventListener("DOMContentLoaded", startGame, false);
    document.addEventListener("keydown", controller, false);
}

function startGame(){
    gameArea.start();
    gameSnake = new snake(20,20,"blue",40,160);
}

var gameArea = {
    canvas : document.createElement("canvas"),
    skor : document.createElement("div"),
    start : function() {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.ctx = this.canvas.getContext("2d");
        this.skor.id = "puan";
        //this.txtSkor = this.skor.getContext;
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        elem.appendChild(this.canvas);
        elem.appendChild(this.skor);
        this.interval = setInterval(updateGameArea, 150);
    },
    drawGrid : function() {
        this.ctx.beginPath();
        for(var x = 0; x < this.canvas.width; x++){
            this.ctx.moveTo(0,20*x);
            this.ctx.lineTo(640,20*x);      
        }
        for(var y = 0; y < this.canvas.height; y++){
            this.ctx.moveTo(20*y,0);
            this.ctx.lineTo(20*y,480);      
        }
        this.ctx.strokeStyle="#CCCCCC";
        this.ctx.stroke();
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
    this.pastX = new Array(100);
    this.pastY = new Array(100);
    this.nTail = 0;
    this.tempX = 0;
    this.tempY = 0;
    this.temp2X = 0;
    this.temp2Y = 0;
    this.score = 0;
    this.foodX = Math.floor(Math.random() * 32)*20;
    this.foodY = Math.floor(Math.random() * 24)*20;
    this.update = function() {
        ctx = gameArea.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    this.tail = function(){
        for(var i=0; i< this.nTail; i++){
            ctx = gameArea.ctx;
            ctx.fillStyle = color;
            ctx.fillRect(this.pastX[i], this.pastY[i], this.width, this.height);
        } 
    },
    this.collisions = function(){
        if(this.x == 640){
            this.x = -20;
        }else if(this.y == 480){
            this.y = -20;
        }else if(this.x == -20){
            this.x = 640;
        }else if(this.y == -20){
            this.y = 480;
        }
    },
    this.food = function(){
        ctx = gameArea.ctx;
        ctx.fillStyle = "#BAD7F2";
        ctx.fillRect(this.foodX, this.foodY, this.width, this.height);
    }
    this.newPosition = function() {
        document.getElementById("puan").innerHTML = 'Puan: ' + this.score;
        if(this.x == this.foodX && this.y == this.foodY){
            this.score += 10;
            this.nTail += 1;
            this.foodX = Math.floor(Math.random() * 32)*20;
            this.foodY = Math.floor(Math.random() * 24)*20;
            
        }
        
        this.pastX[0] = this.x;
        this.pastY[0] = this.y;
        this.tempX = this.pastX[0];
        this.tempY = this.pastY[0];
        for(var i = 0; i < this.nTail; i++){
            this.temp2X = this.pastX[i];
            this.temp2Y = this.pastY[i];
            this.pastX[i] = this.tempX;
            this.pastY[i] = this.tempY;
            this.tempX = this.temp2X;
            this.tempY = this.temp2Y;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    gameArea.clear();
    gameArea.drawGrid();
    gameSnake.collisions();
    gameSnake.newPosition();
    gameSnake.tail();
    gameSnake.food();
    gameSnake.update();
}

var endofkey;

//w -> 87
//s -> 83
//a -> 65
//d -> 68
function controller(event) {    
    if(event.which == 87){ //up
        if(window.endofkey==83){
            event.which=83;
        }else{ 
            gameSnake.speedY = -20;
            gameSnake.speedX = 0;
        }
    }else if(event.which == 65){ //left
        if(window.endofkey==68){
            event.which=68;
        }else{
            gameSnake.speedX = -20;
            gameSnake.speedY = 0;         
        }
    }else if(event.which == 83){ //down
        if(window.endofkey==87){
            event.which=87;
        }else{
            gameSnake.speedY = 20;
            gameSnake.speedX = 0;        
        }    
    }else if(event.which == 68){ //right
        if(window.endofkey==65){
            event.which=65;
        }else{
            gameSnake.speedX = 20;
            gameSnake.speedY = 0;
        }
    }
    
    //hareket sınırlaması
    //ör -> sağa giderken sola gidilmez da!
    if(window.endofkey==65){
        if(event.which==68){
            window.endofkey = 65;
        }else{
            window.endofkey = event.which;
        }
    }
    else if(window.endofkey==87){
        if(event.which==83){
            window.endofkey = 87;
        }else{
            window.endofkey = event.which;
        }
    }
    else if(window.endofkey==68){
        if(event.which==65){
            window.endofkey = 68;
        }else{
            window.endofkey = event.which;
        }
    }
    else if(window.endofkey==83){
        if(event.which==87){
            window.endofkey = 83;
        }else{
            window.endofkey = event.which;
        }
    }
    else{window.endofkey = event.which;}
}
