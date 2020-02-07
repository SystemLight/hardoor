const ph = require("path");

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {pages, splitChunks} = require("./pages.config");


module.exports = (env, argv) => {
    let workEnv = argv.mode;

    let getMinify = workEnv === "development" ? undefined : {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
    };

    let getDevServer = workEnv === "development" ? {
        contentBase: './dist',
        inline: true,
        historyApiFallback: true,
        hot: false,
        hotOnly: false,
        proxy: {
            '/proxy':
                {
                    target: 'https://cnodejs.org/',
                    pathRewrite: {'^/proxy': ''},
                    changeOrigin: true
                }
        }
    } : undefined;

    let getHtmlPage = function (pages) {
        let htmlArray = [];
        pages = typeof pages === "string" ? [pages] : pages;
        pages.forEach((page) => {
            let defaultPageOpt = {
                title: 'my react app',
                keywords: "关键词",
                description: "描述",
                iconPath: "./favicon.ico",
                style: "",
                pageName: "index",
                template: "./draft/template.html",
                chunks: []
            };
            if (typeof page === "string") {
                defaultPageOpt["pageName"] = page;
            } else {
                defaultPageOpt = Object.assign(defaultPageOpt, page);
            }
            htmlArray.push(
                new HtmlWebpackPlugin({
                    title: defaultPageOpt.title,
                    keywords: defaultPageOpt.keywords,
                    description: defaultPageOpt.description,
                    iconPath: defaultPageOpt.iconPath,
                    style: defaultPageOpt.style,
                    hash: false,
                    filename: `${defaultPageOpt.pageName}.html`,
                    template: defaultPageOpt.template,
                    inject: true,
                    minify: getMinify,
                    chunks: [defaultPageOpt.pageName, ...defaultPageOpt.chunks]
                })
            );
        });
        return htmlArray;
    };

    let getEntry = function (pages) {
        let entryObject = {};
        pages = typeof pages === "string" ? [pages] : pages;
        pages.forEach(page => {
            let key;
            if (typeof page === "string") {
                key = page;
            } else {
                key = page.pageName;
            }
            entryObject[key] = `./src/${key}.js`;
        });
        return entryObject;
    };

    return {
        mode: workEnv,
        devtool: workEnv === "development" ? 'inline-source-map' : "source-map",
        devServer: getDevServer,
        context: __dirname,
        entry: getEntry(pages),
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
                            name: 'media/images/[name].[hash:7].[ext]',
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
            ...getHtmlPage(pages)
        ],
        optimization: {splitChunks: splitChunks}
    }
};