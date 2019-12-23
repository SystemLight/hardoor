const path = require("path");

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

let config = {
    mode: workEnv,
    devtool: workEnv === "development" ? 'inline-source-map' : "source-map",
    devServer: getDevServer,
    context: __dirname,
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js",
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
        new HtmlWebpackPlugin({
            title: 'my react app',
            keywords: "关键词",
            description: "描述",
            iconPath: "./images/favicon.ico",
            hash: false,
            filename: 'index.html',
            template: "./public/index.html",
            inject: true,
            minify: getMinify
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/public',
                to: __dirname + '/dist',
                ignore: ['.*']
            }
        ])
    ]
};

module.exports = config;