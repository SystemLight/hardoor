const child_process = require('child_process');
const loading = require("./loading");


function install(callback) {
    loading.start();
    child_process.exec("npm install", (error) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("finish installation");
        console.log("enjoy the day")
    }).stdout.on('data', (data) => {
        loading.stop();
        console.log(data);
        callback&&callback();
    });
}


module.exports = {install};