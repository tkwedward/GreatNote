let _io = require('socket.io-client');
import { buildInitialPageFunction } from "./buildInitialPage";
export var socket;
socket = _io.io();
socket.on("message", (data) => {
    console.log(data);
});
socket.on("serverResponsesForOverallNoteBookInfo", (data) => {
    buildInitialPageFunction(data);
});
