const ph = require("path");

const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = (env, argv) => {
    let workEnv = argv.mode;

    return {
        mode: workEnv,
        target: "node",
        context: __dirname,
        resolve: {
            extensions: [".js", ".ts"]
        },
        entry: {
            "index": "./src/index.ts"
        },
        output: {
            filename: "[name].js",
            path: ph.resolve(__dirname, "dist"),
            libraryTarget: 'commonjs2'
        },
        externals: {},
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader!ts-loader'
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
        ]
    }
};