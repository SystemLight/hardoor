'use strict';

// 如果使用webStorm开发工具，为了优化提示需要配置file->setting->Language&Frameworks->JavaScript-webpack
// 配置路径指向当前文件即可
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            '@views': resolve('src/views'),
            '@comp': resolve('src/components'),
            '@core': resolve('src/core'),
            '@utils': resolve('src/utils')
        }
    },
};
