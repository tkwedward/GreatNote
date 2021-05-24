import { getOffSetXY } from "./toolBoxHelperFunction";
import { selectionToolPhaseOneMouseDownFunction } from "./rectangleSelectionToolPhaseOne";
import { selectionToolPhaseTwoMouseDownEvent } from "./rectangleSelectionToolPhaseTwo";
export function overallMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    if (!mainController.toolBox.checkToolBoxItemStatus("rectangleSelectionToolItemButton"))
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
