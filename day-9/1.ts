import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map((s) => s.split(' '));

let tailVisited = {
    '0': [0],
};

let currentHeadPosition: number[] = [0, 0];
let currentTailPosition: number[] = [0, 0];

const moveHead = (direction: string): void => {
    if (direction === 'U') {
        currentHeadPosition = [currentHeadPosition[0] - 1, currentHeadPosition[1]];
    } else if (direction === 'D') { 
        currentHeadPosition = [currentHeadPosition[0] + 1, currentHeadPosition[1]];
    } else if (direction === 'L') {
        currentHeadPosition = [currentHeadPosition[0], currentHeadPosition[1] - 1];
    } else if (direction === 'R') {
        currentHeadPosition = [currentHeadPosition[0], currentHeadPosition[1] + 1];
    }
}

const isTouching = () => {
    const horDiff = Math.abs(currentHeadPosition[0] - currentTailPosition[0]);
    const verDiff = Math.abs(currentHeadPosition[1] - currentTailPosition[1]);
    return (horDiff <= 1 && verDiff <= 1);
}

const moveTail = () => {
    let headRow = currentHeadPosition[0];
    let headCol = currentHeadPosition[1];
    let tailRow = currentTailPosition[0];
    let tailCol = currentTailPosition[1];
    if (isTouching()) {
        return;
    } else if (headRow === tailRow) {
        if (headRow > tailRow) {
            tailRow++;
        } else {
            tailRow--;
        }
    } else if (headCol === tailCol) {
        if (headCol > tailCol) {
            tailCol++;
        } else {
            tailCol--;
        }
    } else if (headRow !== tailRow && headCol !== tailCol) {
        if (headRow > tailRow && headCol > tailCol) {
            tailRow++;
            tailCol++;
        } else if (headRow > tailRow && headCol < tailCol) {
            tailRow++;
            tailCol--;
        } else if (headRow < tailRow && headCol > tailCol) {
            tailRow--;
            tailCol++;
        } else if (headRow < tailRow && headCol < tailCol) {
            tailRow--;
            tailCol--;
        }
    }
    // else if same row
      // if to left
        // move left
      // else
        // move right
    // else if same col
      // if above
        // move up
      // else 
        // move down
    // else if different row and col
      // if up and right
      // else if up and left
      // else if down and right
      // else if down and left
    // update to headRow, headCol, etc
    currentTailPosition = [tailRow, tailCol];
}

const isTailInNewPosition = (): boolean => {
    let tailRow = tailVisited[currentTailPosition[0]];
    // console.log('tail visited: ', tailVisited);
    // console.log('tail row: ', tailRow);
    for (let i = 0; i < tailRow.length; i++) {
        if (tailRow[i] === currentTailPosition[1]) {
            return false;
        }
    }
    return true;
}

// move pieces function (direction, number)
    // iterate up to number
      // move the head in appropriate direction (helper function?)
      // move the tail in the appropriate direction accordingly
      // if tail position is 0
        // make it a 1
const movePieces = (direction: string, places: number) => {
    // console.log('d: ', direction);
    // console.log('places: ', places);
    for (let i = 0; i < places; i++) {
        moveHead(direction);
        // console.log('current head: ', currentHeadPosition);
        moveTail();
        // console.log('current tail: ', currentTailPosition);
        // console.log('tail visited: ', tailVisited);
        // console.log('tv row: ', tailVisited[currentTailPosition[0]]);
        if (!tailVisited[currentTailPosition[0]]) {
            tailVisited[currentTailPosition[0]] = [currentTailPosition[1]];
        } else if(isTailInNewPosition()) {
            tailVisited[currentTailPosition[0]].push(currentTailPosition[1]);
        }
    }
}

input.forEach((line) => {
    movePieces(line[0], Number(line[1]));
});

let finalAnswer = 0;
Object.keys(tailVisited).forEach((key) => finalAnswer += tailVisited[key].length);

console.log('tail visited: ', tailVisited);

console.log('final answer, day 9, part 1: ', finalAnswer);

// console.log('input: ', input);