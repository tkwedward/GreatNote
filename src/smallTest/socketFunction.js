let io = require('socket.io-client');
import { mainController } from "../index";
export var socket;
socket = io.io();
socket.emit("message", "I want to connect");
socket.on("connect", () => {
    // emit to everybody
    socket.emit('joinRoom', mainController.notebookID);
    socket.emit("message", "user connected");
    // socket.emit("initialDataRequest")
});
socket.on("serverSendSocketIdArray", (data) => {
    // emit to everybody
    // console.log(1616, data)
    // socket.emit("initialDataRequest")
});
socket.on("message", (msg) => {
    console.log(msg);
});
socket.on("mongoDBError", (msg) => {
    console.log("error from DB");
    let allTabBar = Array.from(document.querySelectorAll(".tabBar"));
    allTabBar.forEach(p => p.style.background = "purple");
    document.body.innerHTML = "mongoDB error. Please refresh";
});
socket.on("broadcastMessage", (msg) => {
    console.log(msg);
});
socket.on("saveDataToServer", (data) => {
    mainController.saveMainDoc(true);
});
import { renderSmallView } from "./pageControllerFolder/smallViewHelperFunction";
socket.on("receivePageDataFromServer", (data) => {
    console.log(data["array"]);
    data["array"].forEach((p) => {
        let layerHTMLObject = document.querySelector(`*[accessPointer='${p._identity.accessPointer}']`);
        let fullPageHTMLObject = mainController.tracePageFromElement(layerHTMLObject);
        let smallViewHTMLObject = fullPageHTMLObject.smallViewHTMLObject;
        fullPageHTMLObject.setAttribute("latestUpdateTime", `${new Date()}`);
        renderSmallView(fullPageHTMLObject, smallViewHTMLObject, fullPageHTMLObject.soul.pageNumber);
        mainController.renderDataToHTML(p, layerHTMLObject);
    });
    // socket.off("receivePageDataFromServer")
});
socket.on("serverResponseToLoadMainDocRequest", (data) => {
    // console.log(323232)
    mainController.loadMainDoc(data);
    mainController.buildInitialHTMLSkeleton();
    mainController.buildPageFromMainDoc();
});
function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
}
socket.on("processInitialData", (data) => {
    // let convertedData = Decodeuint8arr(data)
    // console.log(data)
    // console.log(444444, data)
    mainController.loadMainDoc(data);
    mainController.buildInitialHTMLSkeleton();
    mainController.buildPageFromMainDoc();
    // TestFunction.testFunction(mainController)
});
socket.on("socketConnectionUpdate", (data) => {
    // mainController.communitcationController.update(data)
});
socket.on("serverSendChangeFileToClient", (changeDataArray) => {
    // changeData: meta, htmlObjectData
    changeDataArray.forEach((changeData) => {
        mainController.processChangeData(changeData);
    });
});
