import { calculateDistance, changeItemPosition, getOffSetXY, getPageXY } from "./toolBoxHelperFunction";
import * as PopUpBoxManager from "../pageControllerFolder/PopUpBoxFunction";
export function selectionToolPhaseTwoMouseDownEvent(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    if (selectionStatusObject.mode != "phaseTwo") {
        return;
    }
    let clickedPoint = svgBoard.createSVGPoint();
    let touchIsPen;
    [clickedPoint.x, clickedPoint.y, touchIsPen] = getOffSetXY(e);
    // if (!touchIsPen) return
    e.preventDefault();
    let targetObjectOriginalDataArray = selectionStatusObject.selectedObjectArray.map((p) => p.soul.array().value);
    let selectionPolylineOriginalData = selectionStatusObject.polyline.soul.array().value;
    // if the clicked point is outside the area, then just delete the selected circle and then go back to selection Mode
    if (!selectionStatusObject.polyline.isPointInFill(clickedPoint)) {
        selectionStatusObject.polyline.remove();
        selectionStatusObject.polyline = null;
        selectionStatusObject.mode = "phaseOne";
        selectionStatusObject.selectedObjectArray = [];
        return;
    }
    //
    selectionStatusObject.triggerFlag = true;
    setTimeout(function () {
        if (selectionStatusObject.triggerFlag) {
            // if hold, then create popup box
            addHoldTouchAction(e, svgBoard, selectionStatusObject);
        }
        else {
            console.log("I will not trigger.");
        }
    }, 1000);
    let blockEvent = false;
    let mouseMoveFunction = (e) => {
        e.preventDefault();
        if (!selectionStatusObject.polyline)
            return;
        if (blockEvent)
            return;
        blockEvent = true;
        setTimeout(() => { blockEvent = false; }, 100);
        let [newX, newY, ..._] = getOffSetXY(e);
        let [deltaX, deltaY] = [newX - clickedPoint.x, newY - clickedPoint.y];
        changeItemPosition(selectionStatusObject.polyline, selectionPolylineOriginalData, deltaX, deltaY);
        selectionStatusObject.selectedObjectArray.forEach((p, i) => {
            if (p.soul) {
                changeItemPosition(p, targetObjectOriginalDataArray[i], deltaX, deltaY);
            }
        });
        let distance = calculateDistance(newX, newY, clickedPoint.x, clickedPoint.y);
        if (distance > 0.5)
            selectionStatusObject.triggerFlag = false;
    };
    let mouseUpFunction = (e) => {
        e.preventDefault();
        selectionStatusObject.triggerFlag = false;
        console.log(selectionStatusObject);
        selectionStatusObject.selectedObjectArray.forEach((p) => p.saveHTMLObjectToDatabase());
        svgBoard.removeEventListener(moveEventName, mouseMoveFunction);
        svgBoard.removeEventListener(upEventName, mouseMoveFunction);
    };
    // define the mouse move event
    svgBoard.addEventListener(moveEventName, mouseMoveFunction);
    svgBoard.addEventListener(upEventName, mouseUpFunction);
}
// a popup box comes out
function addHoldTouchAction(e, svgBoard, selectionStatusObject) {
    let popUpBox = PopUpBoxManager.createPopUpBox();
    let [pageX, pageY, ..._] = getPageXY(e);
    svgBoard.parentNode.appendChild(popUpBox);
    popUpBox.style.left = (pageX + 10) + "px";
    popUpBox.style.top = (pageY + 10) + "px";
    PopUpBoxManager.addItemToCreatePopUpBox(popUpBox, "deleteAll", function () {
        selectionStatusObject.selectedObjectArray.forEach((p) => {
            p.remove();
        });
        popUpBox.remove();
    });
}
