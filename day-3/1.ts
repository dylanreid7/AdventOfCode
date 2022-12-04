const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\n');

const findCommonNum = (one: number[], two: number[]): number => {
    const secondSet = new Set(two);
    for (let i = 0; i < one.length; i++) {
        if (secondSet.has(one[i])) {
            return one[i];
        }
    };
    return 0;
}

const determineLetterNumber = (str: string): number => {
    if (str === str.toUpperCase()) {
        return str.charCodeAt(0) - 38;
    } 
    return str.charCodeAt(0) - 96;
}

let sum: number = 0;
inputList.forEach((ruckSack: string) => {
    const ruckLength = Math.floor(ruckSack.length / 2);
    let ruckFirstHalf = ruckSack.slice(0, ruckLength).split('').map((s) => determineLetterNumber(s));
    let ruckSecondHalf = ruckSack.slice(ruckLength).split('').map((s) => determineLetterNumber(s));
    let commonNum = findCommonNum(ruckFirstHalf, ruckSecondHalf);
    sum += commonNum;
})

console.log('sum: ', sum);