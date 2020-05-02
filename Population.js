// DNA = require("./DNA");

class Genome {
    constructor(mutationRate, popSize, lifespan) {
        this.mutationRate = mutationRate;
        this.lifespan = lifespan;
        this.popSize = popSize;
        this.matingPool // ArrayList for the mating pool
        this.stack = [];

        for (let i = 0; i < this.popSize; i++) {
            this .stack.push(new Genome(lifespan));
        }  
    }
    evaluate() {
        this.matingPool = [];
        let maxfit = 0;
        for (let i = 0; i < this.popSize; i++){
            this.stack[i].calcFitness();
            if (this.stack[i].fitness > maxfit) {
                maxfit = this.stack[i].fitness
            }
        }
        for (let i = 0; i < this.popSize; i++){
            this.stack[i].fitness /= maxfit;
        }
        for (let i = 0; i < this.popSize; i++){
            let n = this.stack[i].fitness * 100;
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.stack[i])
            }
        }
    }
    selection() {
        // picks a random index in matingPool
        let parentA = random(this.matingPool);
        let parentB = random(this.matingPool);
        let child = new Genome()
        child.dna.genes = this.crossover(parentA, parentB);
        child.dna.mutate(mutationRate);
        return child;
    }
    generateNextGen() {
        for (let i = 0; i < this.popSize; i++) {
            this.stack[i] = this.selection();
        }
    }
    crossover(partnerA, partnerB) {
        let genes = [];
        let midpoint = getRandomInt(0, this.lifespan);

        for (let i = 0; i < this.lifespan; i++) {
            if (i > midpoint) genes[i] = partnerA.dna.genes[i];
            else genes[i] = partnerB.dna.genes[i];
        }
        return genes;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
