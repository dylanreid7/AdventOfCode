import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\n').map((line: string) => line.split(','));

const doesOverlap = (pair: string[]): boolean => {
    let list = [];
    pair.forEach((range: string) => {
        let tuple = range.split('-').map((s) => Number(s));
        list.push(tuple);
    })
    const firstLower = list[0][0];
    const firstUpper = list[0][1];
    const secondLower = list[1][0];
    const secondUpper = list[1][1];
    if (firstLower >= secondLower && firstLower <= secondUpper) {
        return true;
    } else if (firstUpper >= secondLower && firstUpper <= secondUpper) {
        return true;
    } else if (secondLower >= firstLower && secondLower <= firstUpper) {
        return true;
    } else if (secondUpper >= firstLower && secondUpper <= firstUpper) {
        return true;
    }
    return false;
}

let overlapTotal = 0;

inputList.forEach((pair: string[]) => {
    if (doesOverlap(pair)) {
        overlapTotal++;
    }
});

console.log('overlap total: ', overlapTotal);