// const fs = require('fs');
import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\n').map((line: string) => line.split(','));

const isFullyContained = (pair: string[]): boolean => {
    let list = [];
    pair.forEach((range: string) => {
        let tuple = range.split('-').map((s) => Number(s));
        list.push(tuple);
    })
    if (list[0][0] <= list[1][0] && list[0][1] >= list[1][1]) {
        return true;
    } else if (list[1][0] <= list[0][0] && list[1][1] >= list[0][1]) {
        return true;
    }
    return false;
}

let fullyContainedTotal = 0;

inputList.forEach((pair: string[]) => {
    if (isFullyContained(pair)) {
        fullyContainedTotal++;
    }
});

console.log('overlap total: ', fullyContainedTotal);