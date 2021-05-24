import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"
import {mousePositionRatioAdjustment} from "./toolBoxHelperFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"
export function polylineMouseDownFunction(e:any, mainController: MainControllerInterface, svgBoard: any, moveEventName:string, upEventName:string){
    if (!mainController.toolBox.checkToolBoxItemStatus("polylineItemButton")){
        return
    }

    let polylineController = mainController.attributeControllerMapping.polylineController

    let [offsetX, offsetY, touchIsPen, ratio] = [0, 0, false, 0]
    let originalWidth = mainController.pageCurrentStatus.fullPageSize[0]
    if (e.type=="touchstart"){
        let rect = e.target.getBoundingClientRect();
        ratio =  rect.width / originalWidth
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio) ;
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
        touchIsPen = e.targetTouches[0].radiusX > 10? false: true
    }

    if (e.type=="mousedown"){
       offsetX = mousePositionRatioAdjustment(e.offsetX, ratio)
       offsetY = mousePositionRatioAdjustment(e.offsetY, ratio)
   }

   // touchIsPen = true
   if (e.type=="mousedown" || touchIsPen){
        e.preventDefault()
       let [strokeColor, strokeWidth]:[string, string] = polylineController.extract()
       let polyline = GreatNoteSvgDataClass.GNSvgPolyLine({name:"", arrayID: svgBoard.getAccessPointer(), insertPosition:false, dataPointer:false, saveToDatabase:true, specialCreationMessage:"polylineCreated"})
       polyline.style.pointerEvents = "none"

       let pointArray = [[offsetX, offsetY]]
       //
       polyline.soul.plot(pointArray)
       polyline.appendTo(svgBoard)
       polyline.applyStyle({"stroke": strokeColor, "stroke-width": strokeWidth, "fill": "none"})
       //
       // define the mouse move event
       let mouseMoveFunction = (e:any)=>{
         e.preventDefault()
         let [newOffsetX, newOffsetY]  = [0, 0]

         if (e.type=="touchmove"){
             let rect = e.target.getBoundingClientRect();
             newOffsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
             newOffsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
         }
          if (e.type=="mousemove"){
             newOffsetX = mousePositionRatioAdjustment(e.offsetX, ratio)
             newOffsetY = mousePositionRatioAdjustment(e.offsetY, ratio)
         }

         pointArray.push([newOffsetX, newOffsetY])
         polyline.soul.plot(pointArray)
       }
       svgBoard.addEventListener(moveEventName, mouseMoveFunction)
       //
       // define the mouse move function
       let mouseUpFunction = (e:any)=>{
         e.preventDefault()
         polyline.saveHTMLObjectToDatabase()
         svgBoard.removeEventListener(moveEventName, mouseMoveFunction)
         svgBoard.removeEventListener(upEventName, mouseUpFunction)
       }

       svgBoard.addEventListener(upEventName, mouseUpFunction)
   }
}
