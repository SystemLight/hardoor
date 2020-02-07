const fs = require("fs");

const koa = require("koa");
const koaBody = require("koa-body");
const koaRouter = require("koa-router");
const koaStatic = require("koa-static");

const app = new koa();
const router = new koaRouter();
const port = 9000;

function register(router, path) {
    let files = fs.readdirSync(path);
    files.forEach(fileName => {
        if (fileName.endsWith(".js")) {
            require(`${path}${fileName}`)(router);
        }
    });
}

function printInfo() {
    console.log("Server start");
    console.log(`Local access : [ http://127.0.0.1:${port} ]`);
}

function main() {
    app.use(koaBody({
        // multipart: true,
        // formidable: {
        //     hash: "md5",
        //     maxFileSize: 1024 * 1024 * 1024,
        // }
    }));

    register(router, "./view/");
    app.use(router.routes());

    app.use(koaStatic(__dirname + "./statics/"));

    printInfo();
    app.listen(port);
}

main();