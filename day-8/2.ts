import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map((s) => s.split('').map((l) => Number(l)));

const visibleTreesAtIdx = (rowIdx: number, colIdx: number): number => {
    const currentHeight = input[rowIdx][colIdx];
    const row = input[rowIdx];
    const rowLeft = row.slice(0, colIdx).reverse();
    const rowRight = row.slice(colIdx + 1);
    let col = [];
    for (let i = 0; i < input.length; i++) {
        col.push(input[i][colIdx]);
    }
    const colAbove = col.slice(0, rowIdx).reverse();
    const colBelow = col.slice(rowIdx + 1);
    const rowsAndCols = [rowLeft, rowRight, colAbove, colBelow];
    let totalTreesVisible = 1;
    rowsAndCols.forEach((a) => {
        totalTreesVisible *= numTreesVisible(a, currentHeight);
    });
    return totalTreesVisible;
}   

const numTreesVisible = (arr: number[], target: number): number => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (target > arr[i]) {
            sum++;
        } else {
            sum++;
            break;
        }
    }
    return sum;
}

let highestNumVisibleTrees = 0;
for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input.length; c++) {
        const numTrees = visibleTreesAtIdx(r, c);
        if (numTrees > highestNumVisibleTrees) {
            highestNumVisibleTrees = numTrees;
        }
    }
}

console.log('final answer, day 8, part 2: ', highestNumVisibleTrees);