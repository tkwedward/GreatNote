
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


socket.on("saveDataToServer", (data:any)=>{
    mainController.saveMainDoc(true)
})

socket.on("serverResponseToLoadMainDocRequest", (data:any)=>{
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

    mainController.loadMainDoc(data)
    mainController.buildInitialHTMLSkeleton()
    mainController.buildPageFromMainDoc()

    // TestFunction.testFunction(mainController)
})


socket.on("socketConnectionUpdate", (data:any)=>{
    // mainController.communitcationController.update(data)
})


socket.on("serverSendChangeFileToClient", (changeDataArray: any)=>{
    console.log(59, changeDataArray)
    // changeData: meta, htmlObjectData
    changeDataArray.forEach((changeData:any)=>{
      if (changeData.metaData.socketId == socket.id && changeData.metaData.action == "create"){
          changeData.metaData.action = "modifyTemporaryPointer"
      }
      mainController.processChangeData(changeData)
    })
})