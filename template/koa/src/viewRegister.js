const fs = require("fs");


module.exports = function (router, path) {
    let files = fs.readdirSync(path);
    files.forEach(fileName => {
        if (fileName.endsWith(".js")) {
            require(`${path}${fileName}`)(router);
        }
    });
};