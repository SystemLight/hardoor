const ph = require("path");

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const {splitChunks, chunksOnAllPages, pages} = require("./pages.config");


module.exports = (env, argv) => {
    let workEnv = argv.mode;

    let getMinify = workEnv === "development" ? undefined : {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
    };

    let getDevServer = {
        contentBase: './dist',
        index: 'index.html',
        openPage: '',
        inline: true,
        historyApiFallback: true,
        hot: false,
        hotOnly: false,
        open: true,
        proxy: {
            '/proxy':
                {
                    target: 'https://cnodejs.org/',
                    secure: true,
                    pathRewrite: {'^/proxy': ''},
                    changeOrigin: true,
                    cookieDomainRewrite: ".cnodejs.org"
                }
        }
    };

    let getHtmlPage = function (pages) {
        let htmlArray = [];
        if (!Array.isArray(pages)) {
            pages = [pages];
        }
        pages.forEach((page) => {
            if (page.hasOwnProperty("notHtml") && page.notHtml) {
                // 如果页面设置了notHtml参数将不创建对应的html页面
                return;
            }

            // 初始默认参数
            let defaultPageOpt = {
                title: 'my vue app',
                keywords: "关键词",
                description: "描述",
                iconPath: "./favicon.ico",
                style: "",
                pageName: "index",
                template: "./draft/template.html",
                chunks: []
            };

            switch (typeof page) {
                case "string":
                    defaultPageOpt["pageName"] = page;
                    break;
                case "object":
                    defaultPageOpt = Object.assign(defaultPageOpt, page);
                    break;
                default:
                    break;
            }

            if (typeof defaultPageOpt.chunks === "string") {
                defaultPageOpt["chunks"] = [defaultPageOpt["chunks"]];
            }

            let chunks;
            switch (typeof chunksOnAllPages) {
                case "string":
                    chunks = new Set([defaultPageOpt.pageName, ...defaultPageOpt.chunks, chunksOnAllPages]);
                    break;
                case "object":
                    chunks = new Set([defaultPageOpt.pageName, ...defaultPageOpt.chunks, ...chunksOnAllPages]);
                    break;
                default:
                    chunks = [defaultPageOpt.pageName, ...defaultPageOpt.chunks];
                    break;
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
                    chunks: [...chunks]
                })
            );
        });
        return htmlArray;
    };

    let getEntry = function (pages) {
        let entryObject = {};
        if (!Array.isArray(pages)) {
            pages = [pages];
        }
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
        context: __dirname,
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': ph.resolve('src'),
                '@views': ph.resolve('src/views'),
                '@comp': ph.resolve('src/components'),
                '@core': ph.resolve('src/core'),
                '@utils': ph.resolve('src/utils')
            }
        },
        devServer: getDevServer,
        optimization: {splitChunks: splitChunks},
        entry: getEntry(pages),
        output: {
            filename: "js/[name].bundle.js",
            path: ph.resolve(__dirname, "dist"),
            publicPath: "/"
        },
        externals: {},
        module: {
            rules: [
                {
                    test: /^(?!.*\.module).*\.less$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "less-loader"]
                    })
                },
                {
                    test: /^(.*\.module).less$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: "[name]-[hash:base64:6]",
                                    },
                                }
                            },
                            "less-loader"
                        ]
                    })
                },
                {
                    test: /^(?!.*\.module).*\.css$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                },
                {
                    test: /^(.*\.module).css$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: "[name]-[hash:base64:6]",
                                    },
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {}
                        // other vue-loader options go here
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            fallback: 'file-loader',
                            name: 'media/images/[name].[hash:7].[ext]',
                            publicPath: '/',
                            esModule: false
                        }
                    }]
                },
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([
                {
                    from: __dirname + '/public',
                    to: __dirname + '/dist',
                    ignore: ['.*']
                }
            ]),
            new ExtractTextPlugin({
                filename: "css/[name].style.css"
            }),
            // new PrerenderSPAPlugin({
            //     staticDir: ph.resolve(__dirname, "dist"),
            //     routes: ['/', '/about'],
            //     renderer: new Renderer({
            //         headless: false,
            //         renderAfterDocumentEvent: 'pre-render'
            //     })
            // }),
            ...getHtmlPage(pages),
        ]
    }
};
