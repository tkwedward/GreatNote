import { getOffSetXY } from "./toolBoxHelperFunction";
import { selectionToolPhaseOneMouseDownFunction } from "./rectangleSelectionToolPhaseOne";
import { selectionToolPhaseTwoMouseDownEvent } from "./rectangleSelectionToolPhaseTwo";
export function overallMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    if (!mainController.toolBox.checkToolBoxItemStatus("bothLayerSelectionToolItemButton"))
        return;
    let offsetX, offstY, touchIsPen;
    [offsetX, offstY, touchIsPen] = getOffSetXY(e);
    e.preventDefault();
    if (selectionStatusObject.mode == "phaseOne") {
        selectionToolPhaseOneMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject);
        selectionStatusObject.mode = "phaseTwo";
    }
    else if (selectionStatusObject.mode == "phaseTwo") {
        selectionToolPhaseTwoMouseDownEvent(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject);
    }
} // overallMouseDownFunction
export function getPointWidthAndHeight(rect) {
    let rectData = rect.getBoundingClientRect();
    let { x, y, width, height } = rectData;
    let w = width;
    let h = height;
    return { x, y, w, h };
} // checkSideInsideRect
export function checkPointInsideRect(point, rectData) {
    return point.x > rectData.x && point.x < rectData.x + rectData.w && point.y > rectData.y && point.y < rectData.y + rectData.h;
} // checkSideInsideRect
export function checkCornersInside(rect1Data, rect2Data) {
    let c1 = { x: rect1Data.x, y: rect1Data.y };
    let c2 = { x: rect1Data.x + rect1Data.w, y: rect1Data.y };
    let c3 = { x: rect1Data.x + rect1Data.w, y: rect1Data.y + rect1Data.h };
    let c4 = { x: rect1Data.x, y: rect1Data.y + rect1Data.h };
    return [checkPointInsideRect(c1, rect2Data), checkPointInsideRect(c2, rect2Data), checkPointInsideRect(c3, rect2Data), checkPointInsideRect(c4, rect2Data)];
} // checkSideInsideRect
export function checkSideInsideRect(rect1Data, rect2Data) {
    let x1_1 = rect1Data.x;
    let x1_2 = rect1Data.x + rect1Data.w;
    let y1_1 = rect1Data.y;
    let y1_2 = rect1Data.y + rect1Data.h;
    let x2_1 = rect2Data.x;
    let x2_2 = rect2Data.x + rect2Data.w;
    let y2_1 = rect2Data.y;
    let y2_2 = rect2Data.y + rect2Data.h;
    if (x1_1 < x2_1 && x1_2 > x2_2 && y1_1 > y2_1 && y1_2 < y2_2) {
        return true;
    }
    else {
        return false;
    }
} // checkSideInsideRect
