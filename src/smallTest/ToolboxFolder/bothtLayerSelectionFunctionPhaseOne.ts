import {clearUpEvent, calculateDistance, changeItemPosition, getOffSetXY, getPageXY, mousePositionRatioAdjustment, getTouchOffset} from "./toolBoxHelperFunction"
import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"
import * as GreatNoteDataClass from "../GreatNoteClass/GreatNoteDataClass"
import * as Settings from "../settings"
import {shortNotice} from "../pageViewHelperFunction"
import {locationLog} from "../ToolboxFolder/toolBoxHelperFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"

let strokeColor = "blue"
let strokeWidth = "2px"

export function selectionToolPhaseOneMouseDownFunction(e:any, mainController:MainControllerInterface, svgBoard:any, moveEventName:string, upEventName:string, selectionStatusObject:any){
  if (selectionStatusObject.mode == "phaseTwo"){
      return
  }

  let [originalPositionX, originalPositionY, touchIsPen] = getOffSetXY(e)
  let [offsetX, offsetY] = [originalPositionX, originalPositionY]

  selectionStatusObject.selectedObjectArray = []
  selectionStatusObject.counter += 1;
  let selectionRect = svgBoard.svgController.rect(0, 0)
  selectionRect.node.classList.add("selectionRect")
  selectionRect.attr({
    x: originalPositionX, y: originalPositionY,
    fill: "none", stroke: '#000',
    "fill-opacity": 0.5, "stroke-width": 5,
    "stroke-dasharray": "5"
  })


  let rect = e.target.getBoundingClientRect();
  let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0]


  let mouseMoveFunction = (e:any)=>{
      e.preventDefault()

      let offsetX, offsetY
      let rect = e.target.getBoundingClientRect();
      offsetX = mousePositionRatioAdjustment(e.offsetX, ratio);
      offsetY = mousePositionRatioAdjustment(e.offsetY, ratio);
      let width = Math.abs(originalPositionX - offsetX)
      let height = Math.abs(originalPositionY - offsetY)


      // in region 1
      if (offsetX > originalPositionX && offsetY < originalPositionY){
        selectionRect.attr({x: originalPositionX, y: offsetY, width: width, height: height})
      }


      // in region 2
      if (offsetX < originalPositionX && offsetY < originalPositionY){
          selectionRect.attr({x: offsetX, y: offsetY, width: width, height: height})
      }

      // in region 3
      if (offsetX < originalPositionX && offsetY > originalPositionY){
          selectionRect.attr({x: offsetX, y: originalPositionY, width: width, height: height})
      }

      // in region 4
      if (offsetX > originalPositionX && offsetY > originalPositionY){
          selectionRect.attr({width: width, height: height})
      }
  }

  let mouseUpFunction = (e:MouseEvent)=>{
      e.preventDefault()


    // cleaan up
      clearUpEvent(svgBoard, moveEventName, mouseMoveFunction)
      clearUpEvent(svgBoard, upEventName, mouseUpFunction)

      selectionStatusObject.selectionRect = selectionRect
  }

  // define the mouse move event
  svgBoard.addEventListener(moveEventName, mouseMoveFunction)
  svgBoard.addEventListener(upEventName, mouseUpFunction)

}  // mouseDownEventBeforeSelection
