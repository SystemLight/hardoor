const path = require("path");

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: __dirname,
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        inline: true,
    },
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
                loader: 'style-loader!css-loader'
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
                        publicPath: '/'
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

const proConfig = {
    mode: 'production',
    devtool: "source-map",
    context: __dirname,
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js",
        publicPath: "/"
    },
    module: devConfig.module,
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
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            }
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

module.exports = devConfig;