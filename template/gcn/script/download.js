const Fs = require('fs');
const process = require("process");
const Path = require('path');
const Axios = require('axios');
const compressing = require('compressing');

async function download(url, targetPath) {
    const path = Path.resolve(__dirname, targetPath, 'code.zip');
    const writer = Fs.createWriteStream(path);

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    }).then(() => {
        return compressing.zip.uncompress(path, Path.dirname(path));
    });
}

const url = 'http://127.0.0.1:8095/api/project/abc'
download(url, `${process.cwd()}/src/component`).then(() => {
});
