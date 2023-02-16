var w, h;
var stars = [];
var count = -400;
var inc = 0;
function setup () {
	pixelDensity (displayDensity ());
	w = windowWidth;
	h = windowHeight;
	createCanvas (windowWidth, windowHeight, WEBGL);
	colorMode (HSB, 100);
	background (0);
	setInterval(mousePressed, 5000);
	mousePressed();
}
function draw () {
	inc++;
	background (0, 0, 0);
  	camera (0.0, 0.0, count,
			0.0, 0.0, 0.0,
			0.0, 1.0, 0.0);
	rotateX (map (sin(inc/50)*width/50, 0.0, height, 0.0, PI));
	rotateZ (map (height/2, 0.0, width, -PI, PI));
	if (frameCount == 30) {
		for (var i = 0; i < 3000; i++) {
			stars.push (new StarCreate (0.0, 0.0, 0.0, random (100)));
		}
	}
	for (var i = 0; i < stars.length; i++) {
		stars[i].update ();
		stars[i].render ();
	}
	count -= 0.5;
}
function StarCreate (dx, dy, dz, col) {
	this.location = new p5.Vector (dx, dy, dz);
	this.velocity = new p5.Vector (0.0, 0.0, 0.0);
	this.acceleration = new p5.Vector (0.0, 0.0, 0.0);
	this.direction = random (-PI, PI);
	this.init_force = new p5.Vector (cos (this.direction), sin (this.direction), random (-1.0, 1.0));
	this.init_force.mult (random (10.0, 400.0));
	this.update = function () {
		this.init_force.mult (0.2);
		this.acceleration.add (this.init_force);
		this.velocity.add (this.acceleration);
		this.velocity.mult (0.98);
		this.location.add (this.velocity);
		this.acceleration.mult (0.0);
	}
	this.render = function () {
		push ();
		translate (this.location.x, this.location.y, this.location.z);
		noStroke ();
		fill (col, 255, 100);
		box (4);
		pop ();
	}
}
function mousePressed () {
	stars = [];
	count = -400;
	for (var i = 0; i < 2000; i++) {
		stars.push (new StarCreate (0.0, 0.0, 0.0, random (100)));
	}
}