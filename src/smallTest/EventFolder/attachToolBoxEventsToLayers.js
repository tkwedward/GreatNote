import { polylineMouseDownFunction } from "../ToolboxFolder/ToolboxEventFunction";
import * as EraserFunction from "../ToolboxFolder/eraserFunction";
import * as SelectionToolFunction from "../ToolboxFolder/selectionToolFunction";
import * as AddCommentFunction from "../ToolboxFolder/addCommentFunction";
import * as MoveObjectInDivFunction from "../ToolboxFolder/moveObjectInDivFunction";
export function attachEventListenerToSvgBoard(mainController, svgBoard) {
    let polylineMouseDown = {
        eventNameList: ["touchstart"],
        eventFunction: (e) => {
            polylineMouseDownFunction(e, mainController, svgBoard, "touchmove", "touchend");
        }
    };
    let eraserMouseDownFunction = {
        eventNameList: ["touchstart"],
        eventFunction: (e) => {
            EraserFunction.eraserMouseDownFunction(e, mainController, svgBoard, "touchmove", "touchend");
        }
    };
    let selectionStatusObject = {
        mode: "phaseOne",
        polyline: null,
        counter: 0
    };
    let selectionToolMouseDownFunction = {
        eventNameList: ["touchstart"],
        eventFunction: (e) => {
            SelectionToolFunction.overallMouseDownFunction(e, mainController, svgBoard, "touchmove", "touchend", selectionStatusObject);
        }
    };
    let eventArray = [polylineMouseDown, eraserMouseDownFunction, selectionToolMouseDownFunction];
    eventArray.forEach(toolboxEvent => {
        toolboxEvent.eventNameList.forEach(eventName => {
            svgBoard.addEventListener(eventName, toolboxEvent.eventFunction);
        });
    });
}
export function attachEventListenerToDivLayer(mainController, divLayer) {
    let addCommentMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: (e) => {
            AddCommentFunction.addCommentMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup");
        }
    }; // addCommentMouseDownFunction
    let divSelctionObjectStatus = {
        "selectedObject": null
    };
    let moveObjectInDivMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: (e) => {
            MoveObjectInDivFunction.moveObejectInDivMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup", divSelctionObjectStatus);
            // AddCommentFunction.addCommentMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup")
        }
    };
    let eventArray = [addCommentMouseDownFunction, moveObjectInDivMouseDownFunction];
    // let eventArray = [addCommentMouseDownFunction]
    eventArray.forEach(toolboxEvent => {
        toolboxEvent.eventNameList.forEach(eventName => {
            divLayer.style.background = "maroon";
            divLayer.addEventListener(eventName, toolboxEvent.eventFunction);
        });
    });
}
