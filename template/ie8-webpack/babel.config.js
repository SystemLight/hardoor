module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                targets: {
                    // 兼容IE8: 期望版本号
                    ie: "8",
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                },
                useBuiltIns: "usage",
                modules: false,
                corejs: {
                    "version": 3,
                    "proposals": true,
                }
            },
        ]
    ];
    const plugins = [
        // 兼容IE8: 避免webpack将esModule用defineProperty引入导出，特将esModule语法全部转为commonJS
        "@babel/plugin-transform-modules-commonjs"
    ];

    return {
        presets,
        plugins
    };
};