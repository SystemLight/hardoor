const ph = require("path");

const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = (env, argv) => {
    let workEnv = argv.mode;

    return {
        mode: workEnv,
        target: "web",
        context: __dirname,
        resolve: {
            extensions: [".js", ".ts", ".jsx", ".tsx"]
        },
        entry: {
            "index": "./src/index.tsx"
        },
        output: {
            filename: "[name].umd.js",
            path: ph.resolve(__dirname, "dist"),
            libraryTarget: 'umd2',
            globalObject: 'this'
        },
        externals: {
            react: {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            }
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'style-loader!css-loader!less-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
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