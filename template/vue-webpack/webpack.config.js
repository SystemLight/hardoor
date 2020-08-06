const ph = require("path");

module.exports = {
    context: __dirname,
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            '@': ph.resolve('src'),
            '@views': ph.resolve('src/views'),
            '@comp': ph.resolve('src/components'),
            '@utils': ph.resolve('src/utils')
        }
    },
    entry: "src/index.js",
    output: {
        filename: "js/[name].bundle.js",
        path: "./build",
        publicPath: "/"
    },
    module: {
        rules: []
    },
    plugins: []
};
