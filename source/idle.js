var exec = require('child_process').execSync;
var cmd = 'DISPLAY=:0 xprintidle';

function getIdleTime() {
    return parseInt(exec(cmd));
}

module.exports = {
    getIdleTime: getIdleTime,
};
