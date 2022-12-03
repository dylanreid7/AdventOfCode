const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\n');

const findCommonLetter = (strOne: string, strTwo: string) => {
    for (let i = 0; i < strOne.length; i++) {
        if (strTwo.includes(strOne[i])) {
            return strOne[i];
        }
    }
    return '';
}

const determineLetterNumber = (str: string): number => {
    let charCode = str.charCodeAt(0);
    console.log('charCode og', charCode);
    if (charCode >= 65 && charCode <= 90) {
        // get to 27
        charCode -= 38;
    } else if (charCode >= 97 && charCode <= 122) {
        charCode -= 96;
    }
    return charCode;
}

let sum = 0;
inputList.forEach((ruckSack: string) => {
    const ruckLength = Math.floor(ruckSack.length / 2);
    let ruckFirstHalf = ruckSack.slice(0, ruckLength);
    let ruckSecondHalf = ruckSack.slice(ruckLength);
    let commonLetter = findCommonLetter(ruckFirstHalf, ruckSecondHalf);
    console.log('common letter: ', commonLetter);
    let letterNumber = determineLetterNumber(commonLetter);
    console.log('letter num: ', letterNumber);
    sum += letterNumber;
})

console.log('sum: ', sum);