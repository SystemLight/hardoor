module.exports = class Info {
    constructor(fileName, stats) {
        this.fileName = fileName;
        this.isDirectory = null;
        this.isFile = null;
        this.size = null;
        this.mtimeMs = null;
        if (stats) {
            this.isDirectory = stats.isDirectory();
            this.isFile = stats.isFile();
            this.size = stats.size;
            this.mtimeMs = stats.mtimeMs;
        }
    }
};