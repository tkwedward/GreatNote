let _io = require('socket.io-client');
import {Socket} from "socket.io"
import {buildInitialPageFunction} from "./buildInitialPage"

export var socket: Socket
socket = _io.io()

socket.on("message", (data:any)=>{
    console.log(data)
})

socket.on("serverResponsesForOverallNoteBookInfo", (data:any)=>{
    buildInitialPageFunction(data)


})
