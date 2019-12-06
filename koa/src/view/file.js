module.exports = function (router) {

    router.get("/", async ctx => {
        ctx.body = "hello koa";
    });

};