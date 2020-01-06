let n=8;
let population = 10;
let genomesPool = [];
let unicGenerator = true;
let bestGenome = {};
// let genomesPool = [[4,0,3,5,7,1,6,2],[7,3,0,2,5,1,6,4]];
let display = (arr) => {
    let makeRow = (number) => {
        let row = [];
        for(let i=0; i<n; i++) {
            if(i==number) {
                row.push("[X]");
            }
            else {
                row.push("[ ]");
            }
        }
        return row.join(" ");
    }
    let board = [];
    for(let i=0; i<n; i++) {
        board.push(makeRow(arr.order[i]));
    }
    console.log(board);
}

let getRandomInt = (max)=> {
    return Math.floor(Math.random() * Math.floor(max));
}

let init = () => {
    let initGenome = () => {
        let genome = {
            order: [],
            rate: 1000
        }
        if(unicGenerator) {
            while(genome.order.length<n) {
                let randomNumber = getRandomInt(n)
                if(genome.order.indexOf(randomNumber)==-1){
                    genome.order.push(randomNumber);
                }
            }
        }
        else {
            for (let i = 0; i < n; i++) {
                let randomNumber = getRandomInt(n)
                genome.order.push(randomNumber);
            }
        }
        return genome;
    }
    
    for (let j = 0; j<population; j++) {
    genomesPool.push(initGenome());
    }
    // console.log(genomesPool);
}
//a.x, a.y, b.x, b.y
let isMatch = (a,b) => {
    let result=false
    if (a.x === b.x) {
        result=true;
        // console.log("vertical match")
    }
    if (a.y === b.y) {
        result=true;
        // console.log("horizontal match")
    }
    if (Math.abs(b.x-a.x) == Math.abs(b.y-a.y)) {
        result=true;
        // console.log("diagonal match")
    }

    if ((a.x===b.x)&&(a.y===b.y)) result = false;
    return result;
}
let gemmation = (genome) => {
    let newGenome;
    newGenome = Object.assign({},genome)
    let r1 = getRandomInt(n);
    let r2 = getRandomInt(n);
    [newGenome.order[r1],newGenome.order[r2]]=[newGenome.order[r2],newGenome.order[r1]]
    // console.log(genome);
    return newGenome;
   }
   
let calculateFitness =  (genome) => {
        let numberOfAttacks = 0;
        for(let i=0; i<n; i++) {
            for(let j=0; j<n; j++) {
                // console.log(genome);
                // console.log("...")
                let first = {
                    x: genome.order[i],
                    y: i
                }
                let second = {
                    x: genome.order[j],
                    y: j
                }
                if(isMatch(first,second)) numberOfAttacks++;
            }
        }
        // console.log(numberOfAttacks)
        return numberOfAttacks;
    }

let generationNumber = 1;
init();
genomesPool.sort(((a, b) => (a.rate > b.rate) ? 1 : -1));
while(genomesPool[0].rate!=0) {
    generationNumber++;
    genomesPool.sort(((a, b) => (a.rate > b.rate) ? 1 : -1));
    bestGenome = Object.assign({},genomesPool[0]);
    for(let i=1; i<population;i++) {
        genomesPool[parseInt(i)] = gemmation(bestGenome);
    }
    genomesPool.forEach(genome => {
        genome.rate = calculateFitness(genome)
    });
}
display(bestGenome);
console.log("found solution at genetation number " + generationNumber);