import { MainController } from "./smallTest/mainControllerFolder/mainController";
import * as ToolBoxModel from "./smallTest/ToolboxModel";
import { socket } from "./smallTest/socketFunction";
export var mainController;
mainController = new MainController();
// console.log(PageController.highlightCurrentPageInOverviewMode)
mainController.toolBox = new ToolBoxModel.ToolBoxClass();
// to create the attributeControllers
let urlSplitArray = location.href.split("/");
let notebookID = urlSplitArray[urlSplitArray.length - 1];
mainController.notebookID = notebookID;
console.log(14141414, notebookID);
socket.emit("initialDataRequest", notebookID); // processInitialDat
setInterval(function () {
    if (mainController.changeList.length > 0) {
        console.log(mainController.changeList);
        socket.emit("clientSendChangesToServer", mainController.changeList);
        mainController.changeList = [];
    }
}, 1000);
