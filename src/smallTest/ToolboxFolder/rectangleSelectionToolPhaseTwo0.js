import { getOffSetXY } from "./toolBoxHelperFunction";
export function selectionToolPhaseTwoMouseDownEvent(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    if (selectionStatusObject.mode != "phaseTwo") {
        return;
    }
    let clickedPoint = svgBoard.createSVGPoint();
    let touchIsPen;
    [clickedPoint.x, clickedPoint.y, touchIsPen] = getOffSetXY(e);
    e.preventDefault();
    let targetObjectOriginalDataArray = selectionStatusObject.selectedObjectArray;
    // if the clicked point is outside the area, then just delete the selected circle and then go back to selection Mode
    if (!selectionStatusObject.selectionRect.node.isPointInFill(clickedPoint)) {
        selectionStatusObject.selectionRect.node.remove();
        selectionStatusObject.selectionRect = null;
        selectionStatusObject.mode = "phaseOne";
        selectionStatusObject.selectedObjectArray = [];
        return;
    }
}
