
let io = require('socket.io-client');
import {mainController} from "../index"
export var socket:any
import * as CommunicatorController from "./communicationFolder/communitcationController"
import * as Automerge from 'automerge'
import { renderSmallView } from "./pageControllerFolder/smallViewHelperFunction"

socket = io.io()

window.socket = socket
socket.emit("message", "I want to connect")
socket.on("connect", ()=>{
    // emit to everybody
    socket.emit('joinRoom', {notebookID: mainController.notebookID, nodeID: mainController.uniqueNodeId} );

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

socket.on("mongoDBError", (msg:any)=>{
  console.log("error from DB")
    let allTabBar = Array.from(document.querySelectorAll(".tabBar"))
    allTabBar.forEach(p=>p.style.background = "purple")

    document.body.innerHTML = "mongoDB error. Please refresh"


})

socket.on("broadcastMessage", (msg: any)=>{
    console.log(msg)
})

socket.on("saveDataToServer", (data:any)=>{
    mainController.saveMainDoc(true)
})


socket.on("receivePageDataFromServer", (data: any)=>{
  console.log(49494949, data)
  data["array"].forEach((p:any)=>{
      let layerHTMLObject = <any> document.querySelector(`*[accessPointer='${p._identity.accessPointer}']`)
      let fullPageHTMLObject = mainController.tracePageFromElement(layerHTMLObject)
      let smallViewHTMLObject = fullPageHTMLObject.smallViewHTMLObject
      fullPageHTMLObject.setAttribute("latestUpdateTime", `${new Date()}`)
      renderSmallView(fullPageHTMLObject, smallViewHTMLObject, fullPageHTMLObject.soul.pageNumber)

      mainController.renderDataToHTML(p, layerHTMLObject)
  })
  // socket.off("receivePageDataFromServer")
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


socket.on("serverSendUserData", (data:[string, string, string])=>{
    // data = []
    console.log(9349343, data)


})

socket.on("socketConnectionUpdate", (data:any)=>{
    // nodeID, socket.it, notebookID mainController.communitcationController.update(data)
    console.log(9349343, data)
})


socket.on('disconnected', function() {
  socket.emit('deleteNode', mainController.uniqueNodeId);
})

socket.on("serverSendChangeFileToClient", (changeData: any)=>{
    // changeData: meta, htmlObjectData
    console.log(9292929, changeData, socket.id,  changeData.metaData.socketId, changeData.metaData.uniqueNodeId)
    if (mainController.uniqueNodeId != changeData.metaData.uniqueNodeId){

        mainController.processChangeData(changeData)
    } else {
      console.log("I don't process the received data.")
    }

})
