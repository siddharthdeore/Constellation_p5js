var particles = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	stroke(255);
	for (var i = 100; i >= 0; i--) {
		var p=new Particle(random(windowWidth),random(windowHeight),0,0);
		particles.push(p);
	}
}
function draw() {
	background(0);
	fill(255);
	text(mouseX+' '+mouseY,0,10);
	calcNear();
	for (var i = particles.length - 1; i >= 0; i--) {
		particles[i].render();
		//particles[i].ins(random(-1,1),random(-1,1));
	}

}

function Particle(x,y,vx,vy){
	this.x=x;
	this.y=y;
	this.vx=vx;
	this.vy=vy;
	this.ni=1;

	this.render = function(){
		stroke(255);
		ellipse(this.x,this.y,3);
		stroke(100);
		line(this.x,this.y,particles[this.ni].x,particles[this.ni].y)
	}

}
Particle.prototype.ins = function(x,y) {
	this.x+=x;
	this.y+=y;
}; 
Particle.prototype.update = function(x,y,vx,vy) {
	this.x=x;
	this.y=y;
	this.vx=vx;
	this.vy=vy;
}; 

function dist(a,b,c,d) {
	return(Math.square((a-c)*(b-d)));
}
function calcNear() {
	for (var i = particles.length - 1; i >= 0; i--) {
		var p=particles[i];
		var max=100000;
		for (var j = particles.length - 1; j >= 0; j--) {
			if(i!=j){
				var d=dist(particles[i].x,particles[i].y,particles[j].x,particles[j].y);
				if(d<max)
				{
					max=d;
					particles[i].ni=j;
				}
			}
		}
	}
}
