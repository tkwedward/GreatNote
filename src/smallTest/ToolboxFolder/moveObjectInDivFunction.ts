import {ClassNameCollection} from "../settings"
import * as ToolBoxHelperFunction from "./toolBoxHelperFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"

let allowedSelectionObject = [ClassNameCollection.commentContainer]

export function moveObejectInDivMouseDownFunction(e:any, mainController: MainControllerInterface, divLayer: HTMLDivElement, moveEventName: string, upEventName: string, divSelctionObjectStatus:any){
  // let originalObjectPosition: any, _
  // let clickedPosition = {x: 0, y:0}
  //
  // if (!mainController.toolBox.checkToolBoxItemStatus("moveObjectInDivButton")){
  //     return
  // }
  //
  // if (divSelctionObjectStatus.selectedObject){
  //     divSelctionObjectStatus.selectedObject.classList.remove("selectedObjectInDiv")
  // }
  //
  // // if the objeect is in the allowedSelectionObject list, then
  // divSelctionObjectStatus.selectedObject = e.target
  // e.target.classList.add("selectedObjectInDiv");
  //
  // // get the object's original position
  //
  // [clickedPosition.x, clickedPosition.y, _] = ToolBoxHelperFunction.getPageXY(e);
  //
  //
  // originalObjectPosition = {x: divSelctionObjectStatus.selectedObject.offsetLeft, y: divSelctionObjectStatus.selectedObject.offsetTop}
  // console.log("the target Object is", e.target)
  // // mousemove event listener
  // let _moveEventFunction = (e:any)=>{
  //   console.log(34, "moveEventFUnction")
  //     moveEventFunction(e, divSelctionObjectStatus, originalObjectPosition, clickedPosition)
  // }
  // // mouseup event listener
  // let _upEventFunction = (e:any)=>{
  //   console.log(349, "_upEventFunction")
  //     divLayer.removeEventListener(moveEventName, _moveEventFunction)
  //     divLayer.removeEventListener(upEventName, _upEventFunction)
  //     divSelctionObjectStatus.selectedObject.saveHTMLObjectToDatabase()
  // }
  //
  // divLayer.addEventListener(moveEventName, _moveEventFunction)
  // divLayer.addEventListener(upEventName, _upEventFunction)
}


function moveEventFunction(e:any, divSelctionObjectStatus: any, originalObjectPosition: {x: number, y: number}, clickedPosition: {x: number, y: number}){
    let newPosition
    let deltaX, deltaY
    let [offsetX, offsetY, _] = ToolBoxHelperFunction.getPageXY(e);

    [deltaX, deltaY] = [offsetX - clickedPosition.x, offsetY - clickedPosition.y];

    divSelctionObjectStatus.selectedObject.style.position = "absolute"

    newPosition = {
      x: originalObjectPosition.x  + deltaX + "px",
      y: originalObjectPosition.y  + deltaY + "px"

    }
    divSelctionObjectStatus.selectedObject.style.left =  newPosition.x
    divSelctionObjectStatus.selectedObject.style.top =  newPosition.y

}

// function upEventFunction(divLayer, divSelctionObjectStatus:any, _moveEventName:string, _moveEventFunction, _upEventName:string, _upEventFunction){
//     console.log(divLayer, divSelctionObjectStatus, _moveEventName, _moveEventFunction, _upEventName, _upEventFunction)
//     divLayer.removeEventListener(_moveEventName, _moveEventFunction)
//     divLayer.removeEventListener(_upEventName, _upEventFunction)
//     // divSelctionObjectStatus.selectedObject.saveHTMLObjectToDatabase()
//
// }
