const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,//不跳转.
        hot: true,  //是否启用模块热替换功能
        inline: true,//实时更新
    },
    entry: {
        index: __dirname + "/src/index.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'my react app',
            keywords: "关键词",
            description: "描述",
            iconPath: "",
            hash: false,
            filename: 'index.html',
            template: __dirname + "/public/index.html",
            inject: true,
            // minify: { // 压缩HTML文件
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace: true, // 删除空白符与换行符
            //     minifyCSS: true// 压缩内联css
            // }
        }),
    ]
};


module.exports = devConfig;