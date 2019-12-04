const fs = require("fs");
const sPath = require("path");


async function readDir(path) {
    return await new Promise(function (resolve) {
        fs.readdir(path, function (err, files) {
            if (err) {
                resolve([])
            }
            resolve(files);
        });
    })
}

async function fileStat(path) {
    return await new Promise(function (resolve) {
        fs.stat(path, function (err, stats) {
            if (err) {
                resolve(false);
            }
            resolve(stats);
        });
    })
}

async function removeFile(path) {
    return await new Promise(function (resolve) {
        fs.unlink(path, err => {
            if (err) {
                resolve(false);
            }
            resolve(true);
        });
    });
}

async function removeEmptyFolder(path) {
    return await new Promise(function (resolve) {
        fs.rmdir(path, function (err) {
            if (err) {
                resolve(false);
            }
            resolve(true);
        });
    })
}

async function tryRemoveFolder(path) {
    let files = await readDir(path);
    for (let f in files) {
        if (files.hasOwnProperty(f)) {
            let nowPath = sPath.join(path, files[f]);
            let stats = await fileStat(nowPath);
            if (stats) {
                if (stats.isFile()) {
                    await removeFile(nowPath);
                }
                if (stats.isDirectory()) {
                    await tryRemoveFolder(nowPath);
                }
            }
        }
    }
    let removeStatus = await removeEmptyFolder(path);
    if (removeStatus) {
        return removeStatus;
    } else {
        return await removeEmptyFolder(path);
    }
}

module.exports = {
    readDir,
    fileStat,
    removeFile,
    removeEmptyFolder,
    tryRemoveFolder
};