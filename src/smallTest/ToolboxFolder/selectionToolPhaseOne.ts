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
  touchIsPen = true
  if (e.type=="mousedown" || touchIsPen){
      selectionStatusObject.selectedObjectArray = []
      selectionStatusObject.counter += 1;
      let polyline = GreatNoteSvgDataClass.GNSvgPolyLine({name:"",  saveToDatabase:false, _classNameList: ["selectionPolyline"]})
      polyline.classList.add("selectionPolyline")
      polyline.style.pointerEvents = "none"
      polyline.soul.plot([[offsetX, offsetY]])
      polyline.appendTo(svgBoard)
      polyline.applyStyle({"stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none"})
      polyline.style["stroke-dasharray"] = "5"
      selectionStatusObject.polyline = polyline

      let polylineArray = polyline.soul.array().value
      // calculate the ratio
      let rect = e.target.getBoundingClientRect();
      let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0]


      let mouseMoveFunction = (e:any)=>{
          e.preventDefault()

          let offsetX, offsetY
          if (e.type=="touchmove"){
              let rect = e.target.getBoundingClientRect();
              offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
              offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
          } else if (e.type=="mousemove"){
              [offsetX, offsetY] = [e.offsetX, e.offsetY];
          }


          polylineArray.push([offsetX, offsetY])

          polyline.soul.plot(polylineArray)
      }

      let mouseUpFunction = (e)=>{
        e.preventDefault()
        // cleaan up
          polylineArray.push([originalPositionX, originalPositionY])
          polyline.soul.plot(polylineArray)
        // cleaan up
          clearUpEvent(svgBoard, moveEventName, mouseMoveFunction)
          clearUpEvent(svgBoard, upEventName, mouseUpFunction)
          markObjectInsideSelectionArea(svgBoard, selectionStatusObject)
      }

      // define the mouse move event
      svgBoard.addEventListener(moveEventName, mouseMoveFunction)
      svgBoard.addEventListener(upEventName, mouseUpFunction)
   } // if touch is pen
}  // mouseDownEventBeforeSelection



export function markObjectInsideSelectionArea(svgBoard, selectionStatusObject){
  let selectionObjectSet = new Set()
  let polyline = selectionStatusObject.polyline
  let newPoint = svgBoard.createSVGPoint();
  svgBoard.childNodes.forEach(object=>{
      // the object cannot  be the polyline
      if (object!=polyline && object.soul){
        let lineArray = object.soul.array().value
        Array.from(lineArray).forEach(p=>{
            newPoint.x = p[0]
            newPoint.y = p[1]
            if (polyline.isPointInFill(newPoint)){
                selectionObjectSet.add(object.getAccessPointer())
            }
            return
        }) // Array.from(lineArray)
        return
      } // if object!=polyline)
  })// svgBoard.childNodes.forEach
  selectionStatusObject.selectedObjectArray = Array.from(selectionObjectSet)

  selectionStatusObject.selectedObjectArray = selectionStatusObject.selectedObjectArray.map(p=>svgBoard.querySelector(`polyline[accessPointer='${p}']`))

  polyline.selectedObjectArray = selectionStatusObject.selectedObjectArray

  // selectionStatusObject.selectedObjectArray.push(polyline)
}
