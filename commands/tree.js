const fs = require('fs');
const path = require('path');

function treeFn(dirPath) {
    let doesExist = fs.existsSync(dirPath, "");

    if (doesExist === false || dirPath === undefined) {
        dirPath = process.cwd();
        // console.log("Please 🙏 enter valid path !")
        // return
    }

    treeConstructHelper(dirPath, "");


}

function treeConstructHelper(dirPath, indentation) {
    // 1. check that is file or folder
    // 2. if file then print
    // 3. if not then, print and call helper() with childpath
    const isFile = fs.lstatSync(dirPath).isFile();
    const baseName = path.basename(dirPath);
    if (isFile) {
        console.log(indentation, "├───", baseName);
    }
    else {
        // console.log("path: ", dirPath);
        console.log(indentation, "└───", baseName);
        const childrens = fs.readdirSync(dirPath);
        for (const child of childrens) {
            treeConstructHelper(path.join(dirPath, child), `${indentation}\t`);
        }
    }
}


module.exports = {
    treeConstruct : treeFn,
}