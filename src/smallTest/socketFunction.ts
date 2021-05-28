
let io = require('socket.io-client');
import {mainController} from "../index"
export var socket:any
import * as CommunicatorController from "./communicationFolder/communitcationController"
import * as Automerge from 'automerge'

socket = io.io()

socket.on("connect", ()=>{
    // emit to everybody
    socket.emit("message", "user connected")
    // socket.emit("initialDataRequest")
})

socket.on("serverSendSocketIdArray", (data:any)=>{
    // emit to everybody
    // console.log(1616, data)
    // socket.emit("initialDataRequest")
})

socket.on("message", (msg:any)=>{
    console.log(msg)
})

socket.on("broadcastMessage", (msg: any)=>{
    console.log(msg)
})

socket.on("saveDataToServer", (data:any)=>{
    mainController.saveMainDoc(true)
})

socket.on("serverResponseToLoadMainDocRequest", (data:any)=>{
  // console.log(323232)
    mainController.loadMainDoc(data)
    mainController.buildInitialHTMLSkeleton()
    mainController.buildPageFromMainDoc()
})

function Decodeuint8arr(uint8array:any){
    return new TextDecoder("utf-8").decode(uint8array);
}

socket.on("processInitialData", (data:any)=>{
    // let convertedData = Decodeuint8arr(data)
    // console.log(data)
    // console.log(444444, data)
    mainController.loadMainDoc(data)
    mainController.buildInitialHTMLSkeleton()
    mainController.buildPageFromMainDoc()

    // TestFunction.testFunction(mainController)
})


socket.on("socketConnectionUpdate", (data:any)=>{
    // mainController.communitcationController.update(data)
})


socket.on("serverSendChangeFileToClient", (changeDataArray: any)=>{
    // changeData: meta, htmlObjectData
    changeDataArray.forEach((changeData:any)=>{
      mainController.processChangeData(changeData)
    })

})
