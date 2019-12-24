const fs = require("fs");
const sPath = require("path");


function fileStat(path) {
    return new Promise(resolve => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve({err});
            }
            resolve({stats});
        });
    })
}

function exists(file) {
    return new Promise(function (resolve) {
        fs.access(file, fs.constants.F_OK, (err) => {
            if (err) {
                resolve({err, exist: false});
            }
            resolve({exist: true});
        });
    })
}

function readFolder(path) {
    return new Promise(resolve => {
        fs.readdir(path, (err, files) => {
            if (err) {
                resolve({err});
            }
            resolve({files});
        });
    })
}

function createFolder(path) {
    return new Promise(resolve => {
        fs.mkdir(path, err => {
            if (err) {
                resolve({err});
            }
            resolve({success: true});
        });
    })
}

function removeEmptyFolder(path) {
    return new Promise(resolve => {
        fs.rmdir(path, err => {
            if (err) {
                resolve({err});
            }
            resolve({success: true});
        });
    })
}

function removeFile(path) {
    return new Promise(resolve => {
        fs.unlink(path, err => {
            if (err) {
                resolve({err});
            }
            resolve({success: true});
        });
    });
}

function move(oldPath, newPath) {
    return new Promise(resolve => {
        fs.rename(oldPath, newPath, err => {
            if (err) {
                resolve({err});
            }
            resolve({success: true});
        });
    });
}

async function createNestedFolder(path) {
    let parentPath = sPath.dirname(path);
    let {exist} = await exists(parentPath);
    if (!exist) {
        let {err} = await createNestedFolder(parentPath);
        if (err) {
            return {err};
        }
    }
    let {err} = await createFolder(path);
    if (err) {
        return {err};
    }
    return {success: true};
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


move("./dest/1", "./dest/8").then((e) => {
    console.log(e);
});

