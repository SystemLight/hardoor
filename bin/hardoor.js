#!/usr/bin/env node
const commander = require("commander");
const fs = require("fs-extra");
const ph = require("path");
const {install} = require("./npmInstall");
const hardoor = require("../package.json");


let childFlag = false;

commander
    .name("+")
    .usage(hardoor.description)
    .version(hardoor.version);

commander.on('command:*', function () {
    commander.help();
});

commander
    .command('install <template>')
    .description('Copy template to current directory')
    .option('-a, --auto', "Run `npm i` to install automatically")
    .option('-f, --force', "Force overwrite existing files")
    .action(function (template, {auto, force}) {
        let sourceDir = ph.join(__dirname, "../template/");
        let dir = fs.readdirSync(sourceDir);
        if (dir.includes(template)) {
            let sourcePath = ph.join(sourceDir, template);
            let targetPath = process.cwd();
            fs.copy(sourcePath, targetPath, {overwrite: !!force, errorOnExist: !!!force})
                .then(function () {
                    fs.rename("./gitignore", "./.gitignore");
                    console.log("Generate template successfully");
                    if (auto) {
                        install();
                    }
                }).catch(err => console.log("copy fail: ", err));
        } else {
            console.log("Error: A template does not exist, please use `hardoor list` to view the list");
        }
        childFlag = true;
    });

commander
    .command('list')
    .description('View a list of currently available templates')
    .action(function () {
        let templatePath = ph.join(__dirname, "../template/");
        let templates = fs.readdirSync(templatePath);
        templates.forEach(template => {
            let description = require(ph.join(templatePath, template, "package.json")).description;
            console.log("[" + template + "]", "---", description, "\n")
        });
        childFlag = true;
    });

commander.parse(process.argv);
if (!childFlag) {
    commander.help();
}
