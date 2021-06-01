import {clearUpEvent, calculateDistance, changeItemPosition, getOffSetXY, getPageXY, mousePositionRatioAdjustment, getTouchOffset} from "./toolBoxHelperFunction"
import * as PopUpBoxManager from "../pageControllerFolder/PopUpBoxFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"

export function selectionToolPhaseTwoMouseDownEvent(e: any, mainController: MainControllerInterface, svgBoard:any, moveEventName:string, upEventName:string, selectionStatusObject: any){
    if (selectionStatusObject.mode != "phaseTwo"){
        return
    }

    let clickedPoint = svgBoard.createSVGPoint()
    let touchIsPen;
    [clickedPoint.x, clickedPoint.y, touchIsPen] = getOffSetXY(e);

    // if (!touchIsPen) return

    e.preventDefault();
    let targetObjectOriginalDataArray: any = []
    selectionStatusObject.selectedObjectArray.forEach((p:any) =>{
      if (p){
          targetObjectOriginalDataArray.push(p.soul.array().value)
      }
    });

    let selectionPolylineOriginalData = selectionStatusObject.polyline.soul.array().value;

    // if the clicked point is outside the area, then just delete the selected circle and then go back to selection Mode
    if (!selectionStatusObject.polyline.isPointInFill(clickedPoint)){
      selectionStatusObject.polyline.remove()
      selectionStatusObject.polyline = null
      selectionStatusObject.mode = "phaseOne"
      selectionStatusObject.selectedObjectArray = []
      return
    }
    //
    selectionStatusObject.triggerFlag = true
    setTimeout(function(){
        if (selectionStatusObject.triggerFlag ){
          // if hold, then create popup box
          addHoldTouchAction(e, svgBoard, selectionStatusObject)
        } else {
          console.log("I will not trigger.")
        }
     }, 1000)

    let blockEvent = false

    let mouseMoveFunction = (e:any)=>{
        e.preventDefault()
        if (!selectionStatusObject.polyline) return

        if (blockEvent) return
        blockEvent = true
        setTimeout(()=>{blockEvent = false}, 100)


        let [newX, newY, ..._] = getOffSetXY(e)
        let [deltaX, deltaY] = [newX - clickedPoint.x, newY - clickedPoint.y]

        changeItemPosition(selectionStatusObject.polyline, selectionPolylineOriginalData, deltaX, deltaY)

        selectionStatusObject.selectedObjectArray.forEach((p:any, i:number)=>{
            if (p.soul){
                changeItemPosition(p, targetObjectOriginalDataArray[i], deltaX, deltaY)
            }
        })

        let distance = calculateDistance(newX, newY, clickedPoint.x, clickedPoint.y)

        if (distance > 0.5) selectionStatusObject.triggerFlag = false
    }

    let mouseUpFunction = (e:any)=>{
        e.preventDefault()
        selectionStatusObject.triggerFlag = false

        selectionStatusObject.selectedObjectArray.forEach((p:any)=>p.saveHTMLObjectToDatabase())

        svgBoard.removeEventListener(moveEventName, mouseMoveFunction)
        svgBoard.removeEventListener(upEventName, mouseMoveFunction)
    }

    // define the mouse move event
    svgBoard.addEventListener(moveEventName, mouseMoveFunction)
    svgBoard.addEventListener(upEventName, mouseUpFunction)
}


  // a popup box comes out
function addHoldTouchAction(e:any, svgBoard:any, selectionStatusObject:any){
      let popUpBox = PopUpBoxManager.createPopUpBox()
      let [pageX, pageY, ..._] = getPageXY(e)
      svgBoard.parentNode.appendChild(popUpBox)
      popUpBox.style.left = (pageX + 10) + "px"
      popUpBox.style.top = (pageY + 10) + "px"

      PopUpBoxManager.addItemToCreatePopUpBox(popUpBox, "deleteAll", function(){
          selectionStatusObject.selectedObjectArray.forEach((p:any)=>{
              p.remove()
          })
          popUpBox.remove()
      })
  }
