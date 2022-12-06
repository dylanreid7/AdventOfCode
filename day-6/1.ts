import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('');

let answer = 0;

for (let i = 0; i < inputList.length; i++) {
    let fourCharSlice = inputList.slice(i, i + 4);
    let repeatedChar = false;
    let storage = {};
    for (let j = 0; j < fourCharSlice.length; j++) {
        if (!storage[fourCharSlice[j]]) {
            storage[fourCharSlice[j]] = 1;
        } else {
            repeatedChar = true;
            break;
        }
    }
    if (!repeatedChar) {
        answer = i + 4;
        break;
    }
}

console.log('final answer, day 6, part 1: ', answer);