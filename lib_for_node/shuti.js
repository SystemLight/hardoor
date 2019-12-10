const fs = require("fs");
const sPath = require("path");


async function readFolder(path) {
    return await new Promise(resolve => {
        fs.readdir(path, (err, files) => {
            if (err) {
                resolve({err})
            }
            resolve({files});
        });
    })
}

async function createFolder(path) {
    return await new Promise(resolve => {
        fs.mkdir(path, {recursive: true}, err => {
            if (err) {
                resolve({err});
            }
            resolve({});
        });
    });
}

async function removeEmptyFolder(path) {
    return await new Promise(resolve => {
        fs.rmdir(path, err => {
            if (err) {
                resolve({err});
            }
            resolve({});
        });
    })
}

async function RemoveFolder(path) {
    let {err, files} = await readFolder(path);
    if (err) {
        return {err};
    }
    for (let f in files) {
        if (files.hasOwnProperty(f)) {
            let nowPath = sPath.join(path, files[f]);
            let {stats} = await fileStat(nowPath);
            if (stats) {
                if (stats.isFile()) {
                    await removeFile(nowPath);
                }
                if (stats.isDirectory()) {
                    await RemoveFolder(nowPath);
                }
            }
        }
    }
    return await removeEmptyFolder(path);
}

async function fileStat(path) {
    return await new Promise(resolve => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve({err});
            }
            resolve({stats});
        });
    })
}

async function removeFile(path) {
    return await new Promise(resolve => {
        fs.unlink(path, err => {
            if (err) {
                resolve({err});
            }
            resolve({});
        });
    });
}

async function move(oldPath, newPath) {
    return await new Promise(resolve => {
        fs.rename(oldPath, newPath, err => {
            if (err) {
                resolve({err});
            }
            resolve({});
        });
    });
}

module.exports = {
    readFolder,
    createFolder,
    removeEmptyFolder,
    RemoveFolder,
    fileStat,
    removeFile,
    move,
};
