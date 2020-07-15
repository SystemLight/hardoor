let splitChunks = {
    // chunks : all, async, and initial
    chunks: 'async',
    minSize: 30720,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameDelimiter: '~',
    automaticNameMaxLength: 30,
    cacheGroups: {
        common: {
            name: "common",
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10,
            chunks: 'all'
        },
        react: {
            test: /[\\/]node_modules[\\/](scheduler|react|react-dom)/,
            name: 'react',
            chunks: 'all',
            enforce: true,
        }
    }
};

module.exports = {
    splitChunks,
    defaultOpt: {
        title: "React WEB"
    },
    chunksOnAllPages: ["common", "vendors", "react"],
    isExtractCss: false,
    pages: {pageName: "index", type: "tsx"}
};
