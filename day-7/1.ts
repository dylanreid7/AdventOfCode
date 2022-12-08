import * as fs from 'fs';
import { dirname } from 'path/posix';

const input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

// eventually need to parse this thing and get it to look like: 

// { a : { size: 1234, parent: null}, b : { size: 234}, c : { size: 1234, d: { size: 123, parent: 'c' (or reference c somehow?)}, e: 3455}
// directory info = {}
// currentDirectory = ''
// iterate through input list
  // if current is a cd
    // if doing cd ..
      // go up within the dir info object 
      // set currDir appropriately
    // currentDirectory equals directory
        
  // else if current is ls
    // ??? get ready to rumble

  // else if starts with number
    // add to size of current directory
  // else if starts with dir
    // place it within current directory's sub directories with its own obj


const isParent = (currentDir: string) => {
    
}

type Directory = {
    name: string;
    parent?: Directory | null;
    subDirectories: Directory[];
    subFiles: File[];
}

type File = {
    name: string;
    size: number;
}
// directory 
// create directory: { / : { dirs: { },  files: { }, parent}}


let directorySizes = {};

// { a : { size: 1234, children: [ { b : }]}, b : { size: 234}, c : { size: 1234, d: { size: 123, parent: 'c' (or reference c somehow?)}, e: 3455}
const generateFileStructure = (inputList: string[]) => {
    let fileStructure: Directory = {
        name: '/',
        parent: null,
        subDirectories: [],
        subFiles: [],
    };
    let currentDirectory: Directory = fileStructure;
    for (let i = 1; i < inputList.length; i++) {
        const line: string = inputList[i];
        const beginning: string = line.split(' ')[0];
        // console.log('beginning: ', beginning);
        // console.log('current directory: ', currentDirectory);
        // console.log('line: ', line);
        if (beginning === '$') {
            const cmd: string = line.split('').slice(2, 4).join('');
            if (cmd === 'cd') {
                const dir = line.split(' ')[2];
                if (dir === '..') {
                    currentDirectory = currentDirectory.parent;
                } else {
                    // console.log('fs', fileStructure);
                    const newDir = currentDirectory.subDirectories.find((d) => d.name === dir);
                    currentDirectory = newDir as Directory;
                }
            } else if (cmd === 'ls') {
                continue;
            }
        } else if (beginning === 'dir') {
            const dirName: string = line.split(' ')[1];
            let tempDir: Directory = {
                name: dirName,
                parent: currentDirectory, 
                subDirectories: [],
                subFiles: [],
            };
            currentDirectory.subDirectories.push(tempDir);
        } else if (Number(beginning)) {
            let fileSize = Number(line.split(' ')[0]);
            let fileName = line.split(' ')[1];
            console.log('file size: ', fileSize);
            const tempFile: File = {
                name: fileName,
                size: fileSize,
            };
            currentDirectory.subFiles.push(tempFile);
        }
    }
    return fileStructure;
}

let files = generateFileStructure(input);
console.log('fs: ', files);

let dirSizes: number[] = [];

const getFileSizes = (dir: Directory): number => {
    let size = 0;
    for (let file in dir.subFiles) {
        size += dir.subFiles[file].size;
    }
    for (let directory in dir.subDirectories) {
        let dirSize = getFileSizes(dir.subDirectories[directory]);
        size += dirSize;
        dirSizes.push(size);
    }
    return size;
}

getFileSizes(files);

console.log('dir sizes: ', dirSizes);

let finalAnswer = 0;
dirSizes.forEach((d) => {
    if (d <= 100000) {
        finalAnswer += d;
    }
});

console.log('final answer, day 7, part 1: ', finalAnswer);

// let sum = 0;
// let keys = Object.keys(directorySizes);
// keys.forEach((dir) => {
//     if (directorySizes[dir] < 100000) {
//         sum += directorySizes[dir];
//     }
// })

// console.log('directory sizes: ', directorySizes);

// console.log('final answer, day 7, part 1: ', sum);

// console.log('input: ', inputList);