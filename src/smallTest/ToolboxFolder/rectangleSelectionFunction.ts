
import {getOffSetXY, getPageXY} from "./toolBoxHelperFunction"
import {selectionToolPhaseOneMouseDownFunction} from "./rectangleSelectionToolPhaseOne"
import {selectionToolPhaseTwoMouseDownEvent} from "./rectangleSelectionToolPhaseTwo"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"

export function overallMouseDownFunction(e:any, mainController: MainControllerInterface, overlay:any, moveEventName:string, upEventName:string){
    if (!mainController.toolBox.checkToolBoxItemStatus("rectangleSelectionToolItemButton")) return
    let offsetX, offstY, touchIsPen;
    [offsetX, offstY, touchIsPen] = getOffSetXY(e);

    e.preventDefault()

    console.log(141414, overlay)

    // if (selectionStatusObject.mode=="phaseOne"){
        selectionToolPhaseOneMouseDownFunction(e, mainController, overlay, moveEventName, upEventName)
        // selectionStatusObject.mode = "phaseTwo"

    // } else if (selectionStatusObject.mode=="phaseTwo"){
    //     selectionToolPhaseTwoMouseDownEvent(e, mainController, svgBoard, moveEventName, upEventName, selectionStatusObject)
    // }
} // overallMouseDownFunction
