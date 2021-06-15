

let gameWidth = screen.width;
let gameHeight = screen.height;


var body = document.getElementsByTagName("body")[0];

let canvas = document.createElement('canvas');
canvas.id = "canvas";
let canvas2 = document.createElement('canvas');
canvas2.id = "canvas2";

let ctx = canvas.getContext("2d");
canvas.width = gameWidth;
canvas.height = gameHeight;
canvas.style.zIndex = 0;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
body.appendChild(canvas);


let ctx2 = canvas2.getContext("2d");	
canvas2.width = gameWidth;
canvas2.height = gameHeight;
canvas2.width = gameWidth;
canvas2.height = gameHeight;
canvas2.style.zIndex = -1;
body.appendChild(canvas2);


let starAmount = 400;



class Star{
	constructor(){
	this.position = {x: 0,y: 0};
	this.speedX;
	this.speedY;
	this.size;                                              
	this.colorInt;
	this.colorHex;
	this.generate();
	}
	generate(deltaTime){
		this.position.x = gameWidth/2;
		this.position.y = gameHeight/2;
		this.speedX = ((Math.random() -0.5) * 0.5);
		this.speedY = ((Math.random() -0.5) * 0.5);

		this.size = this.speedX*40;
		

		// det her kan gøres noget simplere.
		if (Math.random() < .98)
			this.colorInt = Math.floor((Math.random() * 8000))+1;
		else
			this.colorInt = (Math.floor(Math.random() *16)) *16777216 + 4026532095;
		
		this.colorHex = ('#' + this.colorInt.toString(16).padStart(6, '0'));	

	}
	update(deltaTime){
		if (!deltaTime) return;
		this.position.y = Math.floor(this.position.y + this.speedY);
		this.position.x = Math.floor(this.position.x + this.speedX);
		
		this.speedX += ((Math.random() -0.5) * 2);
		this.speedY += ((Math.random() -0.5) * 2);
		
		if(this.position.y + 1 > gameHeight || this.position.y - 1 < 0) this.generate(deltaTime);
		if(this.position.x + 1 > gameWidth || this.position.x - 1 < 0) this.generate(deltaTime);
		//if(this.position.y + 1 > gameHeight || this.position.y - 1 < 0) this.speedY *= -1;
		//if(this.position.x + 1 > gameWidth || this.position.x - 1 < 0) this.speedX *= -1;

	}
	draw(){
		ctx2.fillStyle = this.colorHex;
		ctx2.fillRect(this.position.x,this.position.y,this.size,this.size);
	}
}
class StarField{
	constructor(){
		this.stars = new Array();
		
		for (var i = 0; i <= starAmount; i++){
			this.stars.push(new Star());
		}
	}
	update(deltaTime){
		for (var i = 0; i <= starAmount; i++)
			this.stars[i].update(deltaTime);
	}
	draw(context){
		for (var i = 0; i <= starAmount; i++)
			this.stars[i].draw();
	}
}


starField = new StarField();


let lastTime = 0;

function gameLoop(timestamp){
let deltaTime = timestamp - lastTime;
lastTime = timestamp;

starField.update(deltaTime);


ctx2.fillStyle = 'rgba(0, 0, 0, 0.05)';
ctx2.fillRect(0,0,gameWidth,gameHeight);

//ctx.clearRect(0,0,gameWidth,gameHeight);

starField.draw();

requestAnimationFrame(gameLoop);
}
// start gameloop:
gameLoop();