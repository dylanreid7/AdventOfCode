import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\n').slice(10).map((line: string) => {
    let splitLine = line.split(' ');
    let resultStrings = [ splitLine[1], splitLine[3], splitLine[5][0]];
    let result = resultStrings.map((s) => Number(s));
    return result;
});

let initialShip: string[][] = [
    ['R', 'S', 'L', 'F', 'Q'],
    ['N', 'Z', 'Q', 'G', 'P', 'T'],
    ['S', 'M', 'Q', 'B'],
    ['T', 'G', 'Z', 'J', 'H', 'C', 'B', 'Q'],
    ['P', 'H', 'M', 'B', 'N', 'F', 'S'],
    ['P', 'C', 'Q', 'N', 'S', 'L', 'V', 'G'],
    ['W', 'C', 'F'],
    ['Q', 'H', 'G', 'Z', 'W', 'V', 'P', 'M'],
    ['G', 'Z', 'D', 'L', 'C', 'N', 'R']
];

inputList.forEach((line) => {
    let amount, fromStack, toStack;
    [amount, fromStack, toStack] = line;
    const fromStackLength = initialShip[fromStack - 1].length;
    const movedCrates = initialShip[fromStack - 1].slice(fromStackLength - amount);
    initialShip[fromStack - 1].splice(fromStackLength - amount);
    initialShip[toStack - 1] = initialShip[toStack - 1].concat(movedCrates);
});

let resultList = [];

initialShip.forEach((list) => {
    let lastCrate = list[list.length - 1];
    resultList.push(lastCrate);
});

const result = resultList.join('');

console.log('final answer, day 5, part 2: ', result);