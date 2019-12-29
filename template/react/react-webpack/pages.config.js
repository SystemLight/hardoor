let splitChunks = {
    // chunks : all, async, and initial
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        },
        // react: {
        //     test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //     name: 'react',
        //     chunks: 'all',
        // }
    }
};


// 这是一个webpack页面配置项，暂时还未实现完全动态化，目前你至少需要把你的页面名称写到pages中
// 如果你只有一个页面：pages可以直接写成index，它对应你的src下的index.js文件，同时生成index.html
// 多个文件情况下，你可以将pages设置为["index","about"]
// 如果你的文件配置具有个性化内容，你可以写成[{pageName:"index",其它个性参数},{pageName:"about",其它个性参数}]
// 这只是简单的讲解，实际上多页面情况涉及到代码拆分问题，需要进行chunks参数设置，同时要设置splitChunks
// 具体怎么设置，这里不再提及，请参考更详细的说明
module.exports = {
    // workEnv : development or production
    workEnv: "development", splitChunks,
    pages: "index"
};