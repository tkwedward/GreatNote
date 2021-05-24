import { getOffSetXY } from "./toolBoxHelperFunction";
import { selectionToolPhaseOneMouseDownFunction } from "./selectionToolPhaseOne";
import { selectionToolPhaseTwoMouseDownEvent } from "./selectionToolPhaseTwo";
export function overallMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject) {
    if (!mainController.toolBox.checkToolBoxItemStatus("selectionToolItemButton"))
        return;
    let offsetX, offstY, touchIsPen;
    [offsetX, offstY, touchIsPen] = getOffSetXY(e);
    // if (!touchIsPen) return
    e.preventDefault();
    if (selectionStatusObject.mode == "phaseOne") {
        selectionToolPhaseOneMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject);
        selectionStatusObject.mode = "phaseTwo";
    }
    else if (selectionStatusObject.mode == "phaseTwo") {
        selectionToolPhaseTwoMouseDownEvent(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject);
    }
} // overallMouseDownFunction
