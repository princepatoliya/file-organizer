#!/usr/bin/env node

const inputArr = process.argv.slice(2);

const treeObj = require("./commands/tree");
const organizeObj = require("./commands/organize");
const helpObj = require("./commands/help");

// node main.js tree "Directory path"
// node main.js organize "Directory path"
// node main.js help

const [command, Path] = inputArr;
switch (command) {
    case "tree":
        treeObj.treeConstruct(Path);
        break;

    case "organize":
        // console.log("Nah....Too risky broo :(");
        organizeObj.organizeFiles(Path);
        break;

    case "help":
        helpObj.helpInfo();
        break;

    default:
        console.log("Please 🙏 enter valid command !");
}