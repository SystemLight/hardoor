const ph = require("path");
const fs = require("fs");

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


// development or production
const workEnv = "development";

let getMinify = workEnv === "development" ? undefined : {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true
};

let getDevServer = workEnv === "development" ? {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    proxy: {
        '/proxy':
            {
                target: 'https://cnodejs.org/',
                pathRewrite: {'^/proxy': ''},
                changeOrigin: true
            }
    }
} : undefined;

function getPage(pages) {
    let htmlArray = [];
    let entryObj = {};
    let fullPageStyle = fs.readFileSync("./template/fullPage.css");
    pages.forEach(v => {
        entryObj[v] = `./src/${v}.page.js`;
        htmlArray.push(new HtmlWebpackPlugin({
            title: 'react app',
            keywords: "关键词",
            description: "描述",
            iconPath: "./favicon.ico",
            style: fullPageStyle,
            hash: false,
            filename: v + '.html',
            template: "./template/template.html",
            inject: true,
            minify: getMinify,
            chunks: [v, "common"]
        }));
    });
    return [entryObj, htmlArray];
}

let [entryObj, htmlArray] = getPage(["index", "about"]);

let config = {
    mode: workEnv,
    devtool: workEnv === "development" ? 'inline-source-map' : "source-map",
    devServer: getDevServer,
    optimization: {
        splitChunks: {
            name: "common",
            chunks: "initial",
            maxInitialRequests: 3,
        }
    },
    context: __dirname,
    entry: {
        ...entryObj
    },
    output: {
        filename: "js/[name].bundle.js",
        path: ph.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /^(?!.*\.module).*\.less$/,
                loader: 'style-loader!css-loader!less-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /^(.*\.module).less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]-[hash:base64:6]",
                            },
                        }
                    },
                    "less-loader"
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /^(?!.*\.module).*\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /^(.*\.module).css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]-[hash:base64:6]",
                            },
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        fallback: 'file-loader',
                        name: 'images/[name].[hash:7].[ext]',
                        publicPath: '/',
                        esModule: false
                    }
                }],
                exclude: /(node_modules|bower_components)/
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/public',
                to: __dirname + '/dist',
                ignore: ['.*']
            }
        ]),
        ...htmlArray
    ]
};

module.exports = config;