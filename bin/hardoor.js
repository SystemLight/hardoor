#!/usr/bin/env node
const program = require('commander');
const ph = require('path');
const child_process = require('child_process');

const {copy} = require("halfigs/node8-basic/shutil");
const info = require(ph.resolve(__dirname, "../package.json"));


function generate(template_dir, install) {
    let process_dir = process.cwd();
    copy.copyFolder(template_dir, process_dir).then(function (e) {
        console.log("generate template results: ", e);
        !e.err && install && npmInstall();
    });
}

function npmInstall() {
    console.log("wait npm install");
    let P = ["\\", "|", "/", "-"];
    let x = 0;
    let waitTimer = setInterval(function () {
        process.stdout.write("\r" + P[x++]);
        x &= 3;
    }, 250);
    const install = child_process.exec("npm install", (error) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("done install");
        console.log("enjoy the day")
    });
    install.stdout.on('data', (data) => {
        clearInterval(waitTimer);
        console.log(data);
    });
}

function main() {
    program.version(info.version)
        .name(info.name);
    program
        .option('-a, --antd', 'generate react antd project')
        .option('-w, --webpack', 'generate react webpack project')
        .option('-k, --koa', 'generate koa project')
        .option('-p, --project', 'generate a project')
        .option('-i, --install', 'automatically execute npm install');
    program.parse(process.argv);
    if (program.antd) {
        generate(ph.resolve(__dirname, "../template/react/react-antd"), program.install);
    }
    if (program.webpack) {
        generate(ph.resolve(__dirname, "../template/react/react-webpack"), program.install);
    }
    if (program.koa) {
        generate(ph.resolve(__dirname, "../template/koa"), program.install);
    }
    if (program.project) {
        generate(ph.resolve(__dirname, "../template/project"), program.install);
    }
}

main();