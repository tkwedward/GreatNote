import {clearUpEvent, calculateDistance, changeItemPosition, getOffSetXY, getPageXY, mousePositionRatioAdjustment, getTouchOffset} from "./toolBoxHelperFunction"
import * as PopUpBoxManager from "../pageControllerFolder/PopUpBoxFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"

// export function selectionToolPhaseTwoMouseDownEvent(e: any, mainController: MainControllerInterface, svgBoard:any, moveEventName:string, upEventName:string, selectionStatusObject: any){
//     if (selectionStatusObject.mode != "phaseTwo"){
//         return
//     }
//     console.log("99999999, phasetwo")
//     let rectSelectionToolController =  mainController.attributeControllerMapping.rectSelectionToolController
//
//     let phaseInput =  rectSelectionToolController.querySelector(".phaseInput")
//     phaseInput.value = "phaseTwo"
//
//     let clickedPoint = svgBoard.createSVGPoint();
//     let touchIsPen;
//     [clickedPoint.x, clickedPoint.y, touchIsPen] = getOffSetXY(e);
//
//     e.preventDefault();
//
//     // let targetObjectOriginalDataArray = selectionStatusObject.selectedObjectArray
//     // if the clicked point is outside the area, then just delete the selected circle and then go back to selection Mode
//     // if (!selectionStatusObject.selectionRect.node.isPointInFill(clickedPoint)){
//     //   selectionStatusObject.selectionRect.node.remove()
//     //   selectionStatusObject.selectionRect = null
//     //   selectionStatusObject.mode = "phaseOne"
//     //   selectionStatusObject.selectedObjectArray = []
//     //   return
//     // }
//
//     rectSelectionToolController.selectionRect.node.remove()
//
//     selectionStatusObject.mode = "phaseOne"
//     // selectionStatusObject.selectedObjectArray = []
// }
