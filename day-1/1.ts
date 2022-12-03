const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\r\n');

let result = 0;
let currentCalories = 0;

for (let i = 0; i < inputList.length; i++) {
    if (inputList[i]) {
        currentCalories += Number(inputList[i]);
        if (currentCalories > result) {
            result = currentCalories;
        }
    } else {
        currentCalories = 0;
    }
}


console.log('input: ', inputList);
console.log('result: ', result);