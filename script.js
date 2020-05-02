
Population = require("./Population");
target = "this is a genetic algorithm";
const popMax = 500;
const mutationRate = 0.003;

// var bestPhrase;
// var allPhrases;
// var stats;
var population;

population = new Population(target, mutationRate, popMax)

while(!population.isTargetMatch()) {
    population.calcFitness();
    population.naturalSelection();
    population.generate();
}

console.log("target matched!");
console.log("Total Generations:", population.totalGenerations)






