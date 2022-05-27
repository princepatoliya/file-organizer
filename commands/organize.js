const types = require("../utils");
const fs = require('fs');
const path = require('path');

function organizeFn(dirPath) {
    // console.log("organize hit, dirpath", dirPath);

    // 1.Take input -> dirPath path given
    let doesExist = fs.existsSync(dirPath);
    let destPath;

    if (doesExist === false || dirPath === undefined) {
        // console.log("Please 🙏 enter valid path !")
        // return
        dirPath = process.cwd();
    }


    destPath = path.join(dirPath, "organized_files");
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
    }
    else {
        console.log(" 🪧 - Directory already exists.");
    }

    // 2. identify categories of every file that present in directroy
    organizeHelper(dirPath, destPath);
    //3. copy / cut files to that organized directory inside of particular category folder
}


function organizeHelper(src, destpath) {

    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for (let file of childNames) {
        // console.log(file);
        let childAddress = path.join(src, file);
        if (fs.lstatSync(childAddress).isFile()) {

            //3. copy / cut files to that organized directory inside of particular category folder
            let category = getCategory(file);
            console.log(`This ${file} belongs to ------->" ${category} " categrory.`);

            sendFilesToDestination(childAddress, destpath, category); // file_address, Destination_folder_address(organized file address), Catergory(folder name)


        }
        else {
            organizeHelper(childAddress, destpath);
        }
    }
}


// find extension type of file
function getCategory(name) {

    let fileExt = path.extname(name).slice(1);
    // console.log(Object.values(types.utility.ty));

    for (const [typename, type] of Object.entries(types.utility.types)) {
        for (const ext of type) {
            if (ext === fileExt) return typename;
        }
        
    }
    return "Other";
}


function sendFilesToDestination(fileAddress, destAddress, categoryName) {
    let categoryFolderPath = path.join(destAddress, categoryName)

    let categoryFolderExist = fs.existsSync(categoryFolderPath);
    if (!categoryFolderExist) {
        fs.mkdirSync(categoryFolderPath);
    }
    let fileDestiAddress = path.join(categoryFolderPath, path.basename(fileAddress));
    fs.copyFileSync(fileAddress, fileDestiAddress);
    console.log(path.basename(fileAddress), "Copy to", categoryName)

}


module.exports = {
    organizeFiles : organizeFn,
}