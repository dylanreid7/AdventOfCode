import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map((s) => s.split('').map((l) => Number(l)));

const checkRowsAndCols = (data: any, target: number): boolean => {
    for (let i = 0; i < data.length; i++) {
        let visible = true;
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] >= target) {
                visible = false;
            }
        }
        if (visible) return true;
    }
    return false;
}

const isVisible = (rowIdx: number, colIdx: number): boolean => {
    const currentHeight = input[rowIdx][colIdx];
    const row = input[rowIdx];
    const rowLeft = row.slice(0, colIdx);
    const rowRight = row.slice(colIdx + 1);
    let col = [];
    for (let i = 0; i < input.length; i++) {
        col.push(input[i][colIdx]);
    }
    const colAbove = col.slice(0, rowIdx);
    const colBelow = col.slice(rowIdx + 1);
    const rowsAndCols = [rowLeft, rowRight, colAbove, colBelow];
    return checkRowsAndCols(rowsAndCols, currentHeight);
}   

let visibleTreeCount = input.length * 2 + input[0].length * 2 - 4;
for (let r = 1; r < input.length - 1; r++) {
    for (let c = 1; c < input.length - 1; c++) {
        if (isVisible(r, c)) {
            visibleTreeCount++;
        }
    }
}

console.log('final answer, day 7, part 1: ', visibleTreeCount);