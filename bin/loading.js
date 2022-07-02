const ora = require('ora');

let timer;
const startTime = new Date();
const spinner = ora({
    text: "Waiting time: 0 second",
    spinner: "line"
});

function start() {
    spinner.start();
    timer = setInterval(function () {
        spinner.text = "Waiting time: " + Math.floor((new Date() - startTime) / 1000) + " second";
    }, 1000);
}

function stop() {
    spinner.stop();
    clearInterval(timer);
}

module.exports = {
    start, stop
};
