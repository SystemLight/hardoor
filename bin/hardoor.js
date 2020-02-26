#!/usr/bin/env node

const commander = require("commander");
const fs = require("fs-extra");
const ph = require("path");
const {install} = require("./npmInstall");
const hardoor = require("../package.json");


let childFlag = false;

function installAction(template, {block, auto, force, path}) {
    let searchPath = block ? "../block/" : "../template/";
    let sourceDir = ph.join(__dirname, searchPath);
    let dir = fs.readdirSync(sourceDir);
    if (dir.includes(template)) {
        let sourcePath = ph.join(sourceDir, block ? template + "/content" : template);
        let targetPath = ph.join(process.cwd(), path || "");
        fs.copy(sourcePath, targetPath, {overwrite: !!force, errorOnExist: !!!force})
            .then(function () {
                !block && fs.rename("./gitignore", "./.gitignore");
                console.log("Generate template successfully");
                if (block) {
                    const afterScript = require(ph.normalize(sourcePath + "/../"));
                    afterScript(install);
                    return;
                }
                if (auto && !block) {
                    install();
                }
            })
            .catch(err => console.log("copy fail: ", err));
    } else {
        console.log("Error: A template does not exist, please use `hardoor list` to view the list");
    }
    childFlag = true;
}

function listAction({block}) {
    let searchPath = block ? "../block/" : "../template/";
    let templatePath = ph.join(__dirname, searchPath);
    let templates = fs.readdirSync(templatePath);
    templates.forEach(template => {
        let description = require(ph.join(templatePath, template, "package.json")).description;
        console.log("[" + template + "]", "---", description, "\n")
    });
    childFlag = true;
}

commander
    .name("+")
    .usage(hardoor.description)
    .version(hardoor.version);

commander.on('command:*', function () {
    commander.help();
});

commander
    .command('install <template>')
    .alias('i')
    .description('Copy template to current directory')
    .option('-b, --block', "Install template block")
    .option('-a, --auto', "Run `npm i` to install automatically")
    .option('-f, --force', "Force overwrite existing files")
    .option('-p, --path <String>', "Specify a relative path")
    .action(installAction);

commander
    .command('list')
    .option('-b, --block', "View list of template blocks")
    .description('View a list of currently available templates')
    .action(listAction);

commander.parse(process.argv);
if (!childFlag) {
    commander.help();
}
