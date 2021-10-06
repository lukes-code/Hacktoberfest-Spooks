//Spooky birb game

var spookyBirb;
var spookyObstacles = [];
var spookyScoreObstacles = [];
var spookyScore;
var spookyScoreValue = 0;
var spookyBackground;
var birbSound;
var pass = false;

//load it up
$("#spooky-birb-load-img").click(function(){
    console.log('Time to get spooky');
	$("#spooky-birb-load-img").css("display","none");
    myGameArea.start();
    spookyBirb = new component(50, 30, "Images/pixel-bat-1.gif", 15, 270, "image");
	spookyScore = new component("30px", "Consolas", "black", 5, 30, "text");
	spookyBackground = new component(1100, 600, "Images/pixel-graveyard.gif", 0, 0, "background");
	birbSound = new sound("birb-squeak.mp3");
	spookyMusic = new sound("spooky-music.mp3", true);
	spookyMusic.play();

});

//game canvas
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1068;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        $("#spooky-birb").append(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0; 
        this.interval = setInterval(updateGameArea, 10);
		window.addEventListener('keydown', function (e) {
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.keys[e.keyCode] = false;
		})
    },
    clear : function() {
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
		clearInterval(this.interval);
	}
}

//birb component
function component(width, height, color, x, y, type) {
	//create an object
	this.type = type;
	if (type == "image" || type == "background") {
		this.image = new Image();
		this.image.src = color;
	}
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else if (this.type == "image" || this.type == "background") {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			if (this.type == "background") {
				ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
			}
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
    }
    this.newPos = function(type) {
		//move object
        this.x += this.speedX;
        this.y += this.speedY;
		if (this.type == "background") {
			if (this.x == -(this.width)) {
				this.x = 0;
			}
		}
		if(type == "birb"){
			this.birbPrison();
		}
    }
	this.crashWith = function(otherobj) {
		//check if an object touches another object
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) ||
		(mytop > otherbottom) ||
		(myright < otherleft) ||
		(myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
	this.passThrough = function(otherobj) {
		//check if an object passes through another object
		var myleft = this.x;
		var otherright = otherobj.x + (otherobj.width);
		if (myleft > otherright){
			pass = true;
		}
		return pass;
	}
	this.birbPrison = function() {
		//stop the spooky birb escaping

		//get max x and y values to stop escaping from the bottom and right
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) this.y = rockbottom;
		var prisonbars = myGameArea.canvas.width - this.width;
        if (this.x > prisonbars) this.x = prisonbars;
		
		//use 0 for top and left
		if (this.y < 0) this.y = 0;
		if (this.x < 0) this.x = 0;

    }
}

function updateGameArea() {

	var x, height, gap, minHeight, maxHeight, minGap, maxGap;

	//obstacle hit
	for (i = 0; i < spookyObstacles.length; i += 1) {
		if (spookyBirb.crashWith(spookyObstacles[i])) {
			spookyMusic.stop();
			birbSound.play();
			myGameArea.stop();
			$('#spooky-birb-restart-img').css("display","block");
			return;
		}
	}

	//increase score
	for (i = 0; i < spookyScoreObstacles.length; i += 1) {
		if (spookyBirb.passThrough(spookyScoreObstacles[i])) {
			spookyScoreObstacles.splice(i,1);
			pass = false;
			spookyScoreValue += 1;
		}
	}

	//clear the canvas
	myGameArea.clear();
	//increase frame number
	myGameArea.frameNo += 1;

	//show background
	spookyBackground.speedX = -0.5;
	spookyBackground.newPos();
	spookyBackground.update();

	//make the obstacles
	if (myGameArea.frameNo == 1 || everyinterval(150)) {
		x = myGameArea.canvas.width;
		y = myGameArea.canvas.height;
		minHeight = 20;
		maxHeight = 200;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		minGap = 60;
		maxGap = 200;
		gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		spookyObstacles.push(new component(60, height, "Images/pixel-grave-flip.png", x, 0, "image"));
		spookyObstacles.push(new component(60, x - height - gap, "Images/pixel-grave-tall.png", x, height + gap, "image"));
		spookyScoreObstacles.push(new component(60, 600, "rgba(255, 255, 255, 0)", x, 0));
	  }
	for (i = 0; i < spookyObstacles.length; i += 1) {
		spookyObstacles[i].x += -1;
		spookyObstacles[i].update();
	}
	for (i = 0; i < spookyScoreObstacles.length; i += 1) {
		spookyScoreObstacles[i].x += -1;
		spookyScoreObstacles[i].update();
	}

	//show score
	spookyScore.text = "SPOOKS: " + spookyScoreValue;
	spookyScore.update();

	//move birb
	spookyBirb.speedX = 0;
	spookyBirb.speedY = 0;
	if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) {spookyBirb.speedX = -1.2; }
	if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68])) {spookyBirb.speedX = 1.2; }
	if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) {spookyBirb.speedY = -1.2; }
	if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) {spookyBirb.speedY = 1.2; }

	//show spooky birb
	spookyBirb.newPos("birb");
	spookyBirb.update();

	//flap the birb
	if(everyinterval(10)){
		spookyBirb.image.src = (spookyBirb.image.src.endsWith("Images/pixel-bat-1.gif")) ? "Images/pixel-bat-2.gif" : "Images/pixel-bat-1.gif";
	}

}

//interval func
function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
	return false;
}

//movement
function stopMove() {
	spookyBirb.speedX = 0;
	spookyBirb.speedY = 0;
}

//sound
function sound(src,loop) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	if(loop) this.sound.loop = true;
	document.body.appendChild(this.sound);
	this.play = function(){
	  this.sound.play();
	}
	this.stop = function(){
	  this.sound.pause();
	}
}

//restart (refreshes page)
$('#spooky-birb-restart-img').click(function() {
    location.reload();
});
