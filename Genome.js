class Genome {
    constructor(lifespan) {
        this.dna = new DNA(lifespan);
        this.pos = createVector(width/2, height);
        this.vel = createVector();
        this.acc = createVector();
        this.completed = false;
        this.crashed = false;
        this.fitness = 0;
        console.log(this.pos)
    }
    applyForce(force) {
        this.acc.add(force)
    }
    update(count) {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        
        // did it reach the target?
        if (d < 10) {
            this.completed = true;
        }
        
        // did it crash?
        if (this.pos.x > barrierx && this.pos.x < barrierx + barrierw 
            && this.pos.y > barriery && this.pos.y < barriery + barrierh) {
                this.crashed = true;
            }
            
        // if neither crashed nor complete, carry on    
        if (!this.completed && !this.crashed) {
            this.applyForce(this.dna.genes[count]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        triangle(0, 0, 0, 6, 12, 3)
        pop();
    }
    calcFitness() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y)
        this.fitness = 1/d;
        if (this.crashed) this.fitness = 0;
        if (this.completed) this.fitness += 0.2
    }
}