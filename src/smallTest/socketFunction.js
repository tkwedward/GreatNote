let io = require('socket.io-client');
import { mainController } from "../index";
export var socket;
socket = io.io();
socket.on("connect", () => {
    // emit to everybody
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
socket.on("saveDataToServer", (data) => {
    mainController.saveMainDoc(true);
});
socket.on("serverResponseToLoadMainDocRequest", (data) => {
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
    mainController.loadMainDoc(data);
    mainController.buildInitialHTMLSkeleton();
    mainController.buildPageFromMainDoc();
    // TestFunction.testFunction(mainController)
});
socket.on("socketConnectionUpdate", (data) => {
    // mainController.communitcationController.update(data)
});
socket.on("serverSendChangeFileToClient", (changeDataArray) => {
    console.log(59, changeDataArray);
    // changeData: meta, htmlObjectData
    changeDataArray.forEach((changeData) => {
        if (changeData.metaData.socketId == socket.id && changeData.metaData.action == "create") {
            changeData.metaData.action = "modifyTemporaryPointer";
        }
        mainController.processChangeData(changeData);
    });
});
