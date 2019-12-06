const koa = require("koa");
const koaBody = require("koa-body");
const koaRouter = require("koa-router");
const koaStatic = require("koa-static");

const app = new koa();
const router = new koaRouter();

app.use(koaBody({
    // multipart: true,
    // formidable: {
    //     hash: "md5",
    //     maxFileSize: 1024 * 1024 * 1024,
    // }
}));

require("./viewRegister")(router, "./view/");

app.use(router.routes());
app.use(koaStatic(__dirname + "/statics"));

app.listen(9000);
