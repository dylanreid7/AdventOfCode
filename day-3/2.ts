const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\n');

const getCommonLetter = (strOne: string, strTwo: string, strThree: string) => {
    for (let i = 0; i < strOne.length; i++) {
        if (strTwo.includes(strOne[i]) && strThree.includes(strOne[i])) {
            return strOne[i];
        }
    }
    return '';
}

const getLetterNumber = (str: string): number => {
    let charCode = str.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
        // get to 27
        charCode -= 38;
    } else if (charCode >= 97 && charCode <= 122) {
        charCode -= 96;
    }
    return charCode;
}

let result: number = 0;

for (let i = 0; i < inputList.length; i += 3) {
    let ruckOne = inputList[i];
    let ruckTwo = inputList[i + 1];
    let ruckThree = inputList[i + 2];
    let commonLetter = getCommonLetter(ruckOne, ruckTwo, ruckThree);
    let letterNum = getLetterNumber(commonLetter);
    result += letterNum;
}

console.log('result: ', result);
