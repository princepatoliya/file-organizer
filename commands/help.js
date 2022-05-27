function helpFn() {
    console.log(`List of all commands:
        node main.js tree "Directory path"
        node main.js organize "Directory path"
        node main.js help
    `);
}

module.exports = {
    helpInfo : helpFn,
}