import { polylineMouseDownFunction } from "../ToolboxFolder/ToolboxEventFunction";
import * as EraserFunction from "../ToolboxFolder/eraserFunction";
import * as SelectionToolFunction from "../ToolboxFolder/selectionToolFunction";
import * as RectangleSelectionToolFunction from "../ToolboxFolder/rectangleSelectionFunction";
import * as AddCommentFunction from "../ToolboxFolder/addCommentFunction";
import * as MoveObjectInDivFunction from "../ToolboxFolder/moveObjectInDivFunction";
import * as TextToolFunction from "../ToolboxFolder/textToolHelperFunction";
import * as AddBookmarkFunction from "../ToolboxFolder/addBookmarkFunction";
export function attachEventListenerToSvgBoard(mainController, svgBoard) {
    console.log(1313131313, "attachItemtoSvgBoard", svgBoard, svgBoard.getAttribute("eventAttached"));
    if (svgBoard.getAttribute("eventAttached") == "true")
        return;
    svgBoard.setAttribute("eventAttached", "true");
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
        mode: "phaseOne", polyline: null, counter: 0
    };
    let selectionToolMouseDownFunction = {
        eventNameList: ["touchstart"],
        eventFunction: (e) => {
            SelectionToolFunction.overallMouseDownFunction(e, mainController, svgBoard, "touchmove", "touchend", selectionStatusObject);
        }
    };
    let rectangleSelectionStatusObject = {
        mode: "phaseOne", polyline: null, counter: 0
    };
    let rectangleSelectionToolMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: (e) => {
            RectangleSelectionToolFunction.overallMouseDownFunction(e, mainController, svgBoard, "mousemove", "mouseup", rectangleSelectionStatusObject);
        }
    };
    let eventArray = [polylineMouseDown, eraserMouseDownFunction, selectionToolMouseDownFunction, rectangleSelectionToolMouseDownFunction];
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
    let addBookmarkMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: (e) => {
            AddBookmarkFunction.addBookmarkMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup");
        }
    }; // addCommentMouseDownFunction
    let divSelctionObjectStatus = {
        "selectedObject": null
    };
    let moveObjectInDivMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: (e) => {
            MoveObjectInDivFunction.moveObejectInDivMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup", divSelctionObjectStatus);
        }
    };
    let textToolMouseDownFunction = {
        eventNameList: ["mousedown"],
        eventFunction: (e) => {
            TextToolFunction.textToolMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup");
        }
    };
    // let eventArray = [addCommentMouseDownFunction, moveObjectInDivMouseDownFunction]
    let eventArray = [addCommentMouseDownFunction, addBookmarkMouseDownFunction, textToolMouseDownFunction];
    eventArray.forEach(toolboxEvent => {
        toolboxEvent.eventNameList.forEach(eventName => {
            divLayer.addEventListener(eventName, toolboxEvent.eventFunction);
        });
    });
}
