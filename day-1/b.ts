const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\r\n');

let result = [];
let currentElfCalories = 0;
let elfIndex = 0;

for (let i = 0; i < inputList.length; i++) {
    if (inputList[i]) {
        currentElfCalories += Number(inputList[i]);
    } else {
        if (result.length < 3) {
            result.push(currentElfCalories);
            result.sort();
        } else if (currentElfCalories > result[0]) {
            result.shift();
            result.push(currentElfCalories);
            result.sort();
        }
        currentElfCalories = 0;
        elfIndex++;
    }
}

let sum = 0; 
result.forEach((res) => sum += res);

console.log('sum: ', sum);