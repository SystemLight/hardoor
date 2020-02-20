module.exports = {
    devServer: {
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
    }
};