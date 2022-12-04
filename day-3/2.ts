const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
import { determineLetterNumber } from './1';

const inputList = input.split('\n');

const getCommonLetter = (strOne: string, strTwo: string, strThree: string) => {
    for (let i = 0; i < strOne.length; i++) {
        if (strTwo.includes(strOne[i]) && strThree.includes(strOne[i])) {
            return strOne[i];
        }
    }
    return '';
}

let result: number = 0;

for (let i = 0; i < inputList.length; i += 3) {
    let commonLetter = getCommonLetter(inputList[i], inputList[i + 1], inputList[i + 2]);
    let letterNum = determineLetterNumber(commonLetter);
    result += letterNum;
}

console.log('result: ', result);
