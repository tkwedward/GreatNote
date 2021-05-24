import { MainController } from "./smallTest/mainControllerFolder/mainController";
import * as ToolBoxModel from "./smallTest/ToolboxModel";
import { socket } from "./smallTest/socketFunction";
import * as PageController from "./smallTest/pageControllerFolder/pageController";
export var mainController;
mainController = new MainController();
console.log(PageController.highlightCurrentPageInOverviewMode);
mainController.toolBox = new ToolBoxModel.ToolBoxClass();
// to create the attributeControllers
socket.emit("initialDataRequest"); // processInitialDat
setInterval(function () {
    if (mainController.changeList.length > 0) {
        console.log(mainController.changeList);
        socket.emit("clientSendChangesToServer", mainController.changeList);
        mainController.changeList = [];
    }
}, 1000);
