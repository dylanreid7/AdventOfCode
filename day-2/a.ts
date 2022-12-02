const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const inputList = input.split('\r\n');

const gameScore = (oppPlay: string, myPlay: string) => {
    let score = 0;
    if (myPlay === 'X') {
        score += 1; 
        if (oppPlay === 'A') {
            score += 3;
        } else if (oppPlay === 'B') {
            score += 0;
        } else if (oppPlay === 'C') {
            score += 6;
        }
    } else if (myPlay === 'Y') {
        score += 2;
        if (oppPlay === 'A') {
            score += 6;
        } else if (oppPlay === 'B') {
            score += 3;
        } else if (oppPlay === 'C') {
            score += 0;
        }
    } else if (myPlay === 'Z') {
        score += 3;
        if (oppPlay === 'A') {
            score += 0;
        } else if (oppPlay === 'B') {
            score += 6;
        } else if (oppPlay === 'C') {
            score += 3;
        }
    }
    return score;
}

let result = 0;

for (let i = 0; i < inputList.length; i++) {
    let split = inputList[i].split(' ');
    let opponentPlay = split[0];
    let myPlay = split[1];
    let currentGameScore = gameScore(opponentPlay, myPlay);
    result += currentGameScore;
}

console.log('score: ', result);