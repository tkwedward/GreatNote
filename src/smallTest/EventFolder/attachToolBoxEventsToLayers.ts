import {polylineMouseDownFunction} from "../ToolboxFolder/ToolboxEventFunction"
import {MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"
import * as EraserFunction from "../ToolboxFolder/eraserFunction"
import * as SelectionToolFunction from "../ToolboxFolder/selectionToolFunction"
import * as RectangleSelectionToolFunction from "../ToolboxFolder/rectangleSelectionFunction"
import * as AddCommentFunction from "../ToolboxFolder/addCommentFunction"
import * as MoveObjectInDivFunction from "../ToolboxFolder/moveObjectInDivFunction"
import * as TextToolFunction from "../ToolboxFolder/textToolHelperFunction"
import * as AddBookmarkFunction from "../ToolboxFolder/addBookmarkFunction"

export function attachEventListenerToSvgBoard(mainController: MainControllerInterface, svgBoard: SVGElement){
    if (svgBoard.getAttribute("eventAttached")=="true") return
    svgBoard.setAttribute("eventAttached", "true")

    let polylineMouseDown ={
      eventNameList: ["touchstart"],
      eventFunction: (e:any)=>{
        polylineMouseDownFunction(e, mainController, svgBoard,  "touchmove", "touchend")
      }
    }

    let eraserMouseDownFunction = {
      eventNameList: ["touchstart"],
      eventFunction: (e:any)=>{
        EraserFunction.eraserMouseDownFunction(e,  mainController, svgBoard, "touchmove", "touchend")
      }
    }

    let selectionStatusObject = {
      mode: "phaseOne", polyline: null, counter: 0
    }

    let selectionToolMouseDownFunction = {
      eventNameList: ["touchstart"],
      eventFunction: (e:any)=>{
        SelectionToolFunction.overallMouseDownFunction(e,  mainController, svgBoard, "touchmove", "touchend", selectionStatusObject)
      }
    }

    let rectangleSelectionStatusObject = {
      mode: "phaseOne", polyline: null, counter: 0
    }

    let rectangleSelectionToolMouseDownFunction = {
      eventNameList: ["mousedown"],
      eventFunction: (e:any)=>{
        RectangleSelectionToolFunction.overallMouseDownFunction(e,  mainController, svgBoard, "mousemove", "mouseup", rectangleSelectionStatusObject)
      }
    }

    let eventArray = [polylineMouseDown, eraserMouseDownFunction, selectionToolMouseDownFunction]
    // let eventArray = [polylineMouseDown, eraserMouseDownFunction, selectionToolMouseDownFunction, rectangleSelectionToolMouseDownFunction]

    eventArray.forEach(toolboxEvent=>{
        toolboxEvent.eventNameList.forEach(eventName=>{
            svgBoard.addEventListener(eventName, toolboxEvent.eventFunction)
        })
    })
}


export function attachEventListenerToDivLayer(mainController: MainControllerInterface, divLayer: HTMLDivElement){
  let addCommentMouseDownFunction = {
    eventNameList: ["mousedown"],
    eventFunction: (e:any)=>{
        AddCommentFunction.addCommentMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup")
    }
  } // addCommentMouseDownFunction

  let addBookmarkMouseDownFunction = {
    eventNameList: ["mousedown"],
    eventFunction: (e:any)=>{
        AddBookmarkFunction.addBookmarkMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup")
    }
  } // addCommentMouseDownFunction


  let moveObjectInDivMouseDownFunction = {
    eventNameList: ["mousedown"],
    eventFunction: (e: any)=>{
      MoveObjectInDivFunction.moveObejectInDivMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup")
    }
  }

  let textToolMouseDownFunction = {
    eventNameList: ["mousedown"],
    eventFunction: (e: any)=>{
      TextToolFunction.textToolMouseDownFunction(e, mainController, divLayer, "mousemove", "mouseup")
    }
  }
  // let eventArray = [addCommentMouseDownFunction, moveObjectInDivMouseDownFunction]
  let nameArray = ["addComment", "addBookmark", "moveObject", "textToolMouseDown"]
  let eventArray = [addCommentMouseDownFunction, addBookmarkMouseDownFunction, moveObjectInDivMouseDownFunction,  textToolMouseDownFunction]
  divLayer.greatNoteEventList = []

  eventArray.forEach((toolboxEvent: any, index :number)=>{
      divLayer.greatNoteEventList.push(nameArray[index])
      toolboxEvent.eventNameList.forEach((eventName: string)=>{
          divLayer.addEventListener(eventName, toolboxEvent.eventFunction)
      })
  })
}MoveObjectInDivFunction
