#!/usr/bin/env node
var player = require('./source/player');
var idle   = require('./source/idle');
var fs     = require('fs');

var rgbFile;

if (process.argv.length < 3) {
    console.log('You need to pass a .rgb file as an argument to this program.');
    console.log('node playRGBFile.js [filename.rgb]');
    process.exit();
} else {
    rgbFile = process.argv[2];
}

var commands = JSON.parse(fs.readFileSync(rgbFile));

player.writeCommandToKeyboard('active');

var refreshRate = 1000/24;
var index = 0;
var isIdle = false;
setInterval(function () {
    index %= commands.length;
    if (isIdle)
        player.writeCommandToKeyboard('rgb 000000');
    else
        player.writeCommandToKeyboard(commands[index]);
    index += 1;
}, refreshRate);
setInterval(function() {
    if (idle.getIdleTime() > 60000)
        isIdle = true;
    else
        isIdle = false;
}, 4000);
