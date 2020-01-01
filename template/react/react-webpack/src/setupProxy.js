const proxy = require('http-proxy-middleware');


module.exports = function (app) {
    app.use(
        proxy(
            '/proxy',
            {
                target: 'https://cnodejs.org/',
                pathRewrite: {'^/proxy': ''},
                changeOrigin: true
            }
        )
    );
};