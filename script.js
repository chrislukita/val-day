let particles = [];
let bookCard = document.getElementById("bookCard");
let bookCover = document.getElementById("bookCover");
let loveLetter = document.getElementById("loveLetter");


function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i<500; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 20);
    for (let particle of particles) {
        particle.update();
        particle.show();
    }
}

function heartFunction(angle, size) {
    let x = size * 16 * pow(sin(angle), 3);
    let y = -size * (13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle));
    return createVector(x,y);
}


class Particle {
    constructor() {
        this.angle = random(TWO_PI);
        this.size = random(30, 40);
        this.pos = heartFunction(this.angle, random(25,35));
        this.pos.x += width / 2;
        this.pos.y += height/2;
        this.vel = createVector(0, 0)
        this.alpha = 255;
        this.color = color(random(200, 255), random(50, 100), random(50, 100));
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.pos);
        let distance = dir.mag();

        if (distance < 150) {
            dir.setMag(0.1);
            this.vel.add(dir);
        } else {
            this.vel.mult(0.95);
        }

        this.pos.add(this.vel);
        this.alpha -= 0.5;
        if (this.alpha <= 0) {
            this.reset();
        }
    }

    reset() {
        this.angle = random(TWO_PI);
        this.pos = heartFunction(this.angle,  random(25,35));
        this.pos.x += width / 2;
        this.pos.y += height / 2;
        this.alpha = 255;
    }
    
    show() {
        noStroke();
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
        ellipse(this.pos.x, this.pos.y, 8);
    }
}


function mousePressed() {
    if (mouseButton === LEFT) {
        for (let particle of particles) {
            particle.reset();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}