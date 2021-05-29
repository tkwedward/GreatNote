"use strict";
exports.__esModule = true;
exports.socket = void 0;
var _io = require('socket.io-client');
var buildInitialPage_1 = require("./buildInitialPage");
exports.socket = _io.io();
exports.socket.on("message", function (data) {
    console.log(data);
});
exports.socket.on("serverResponsesForOverallNoteBookInfo", function (data) {
    buildInitialPage_1.buildInitialPageFunction(data);
});
