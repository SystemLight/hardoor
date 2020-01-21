#!/usr/bin/env node
const readline = require('readline');
const ph = require('path');
const child_process = require('child_process');
const program = require('commander');
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
    console.log("wait npm install " + new Date().toLocaleString());
    console.log("Takes about two minutes.");
    process.stdout.write('\n');
    let loadIcon = ["\\", "|", "/", "-"];
    let x = 0;
    let y = 0;
    let waitTimer = setInterval(function () {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(loadIcon[x++] + "   " + new Date().toLocaleString() + "   " + loadIcon[y++]);
        x &= 3;
        y &= 3;
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
    const node_accept = ["null", "koa"];
    const react_accept = ["null", "webpack", "antd"];

    program.version(info.version).name(info.name);
    program
        .option('-p, --project', 'generate a empty project')
        .option('-b, --browser', 'generate a project for which html in browser')
        .option('-e, --es6', 'generate a project for es6')
        .option('-n, --node <string>', `generate a project for node
        ,Acceptable parameters:${node_accept.join(",")}`)

        .option('-j, --jquery', 'generate a project for jquery')
        .option('-r, --react <string>', `generate a project for react
        ,Acceptable parameters:${react_accept.join(",")}`)

        .option('-v, --vue', 'generate a project for vue')
        .option('-i, --install', 'automatically execute npm install');
    program.parse(process.argv);

    if (program.project) {
        generate(ph.resolve(__dirname, "../template/project"), program.install);
    } else if (program.html) {
        console.log("Not currently supported");
    } else if (program.es6) {
        console.log("Not currently supported");
    } else if (program.node) {
        switch (program.node) {
            case "null":
                generate(ph.resolve(__dirname, "../template/project"), program.install);
                break;
            case "koa":
                generate(ph.resolve(__dirname, "../template/koa"), program.install);
                break;
            default:
                console.log("-n, --node parameter is not supported");
                break;
        }
    } else if (program.jquery) {
        console.log("Not currently supported");
    } else if (program.react) {
        switch (program.react) {
            case "null":
                generate(ph.resolve(__dirname, "../template/project"), program.install);
                break;
            case "webpack":
                generate(ph.resolve(__dirname, "../template/react-webpack"), program.install);
                break;
            case "antd":
                generate(ph.resolve(__dirname, "../template/react-antd"), program.install);
                break;
            default:
                console.log("-r, --react parameter is not supported");
                break;
        }
    } else if (program.vue) {
        console.log("Not currently supported");
    } else {
        console.log("The combination is not currently supported");
    }
}

main();