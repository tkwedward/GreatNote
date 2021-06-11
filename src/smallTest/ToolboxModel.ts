import * as EventModel from "./EventModel"
import * as GreatNoteSvgDataClass from "./GreatNoteClass/GreatNoteSvgDataClass"
import { mainController } from "../index"
import { polylineMouseDownFunction } from "./ToolboxFolder/ToolboxEventFunction"
import * as EraserFunction from "./ToolboxFolder/eraserFunction"

let iconName = {
    bothLayerSelectionTool: "/graphics/toolBox/bothLayerSelectionTool.png",
    rectangleSelectionTool: "/graphics/toolBox/rectangleSelection.png",
    penSelectionTool: "/graphics/toolBox/penSelection.png",
    eraserTool: "/graphics/toolBox/eraserTool.png",
    commentTool: "/graphics/toolBox/commentTool.png",
    movableTool: "/graphics/toolBox/movableTool.png",
    penTool: "/graphics/toolBox/penTool.png",
    textTool: "/graphics/toolBox/textTool.png"
}


export interface ToolBoxInterface extends HTMLDivElement{
    itemArray: any[]       // to mark the status of the button
    targetPage: any
    currentActiveButton: any
    toolBoxItemStatus: ToolBoxItemStatusInterface
    currentActiveEventFunction: (event:any)=>void
    currentActiveEventName:string
    selectionHTMLObject?: HTMLDivElement
    optionHTMLObject?: HTMLDivElement

    checkToolBoxItemStatus(itemName:string):boolean
    switchToolBoxItemStatus(itemName:string):void

    activateToolboxItem(toolBoxItem:any):void

    createToolBoxItem(name:string, toolBoxHtmlObject: HTMLDivElement):HTMLDivElement    // to create an item

    createAddBookmarkButton(toolBoxHtmlObject:any):HTMLDivElement

    createMouseRectangleSelectionToolItemButton(toolBoxHtmlObject:any):HTMLDivElement



    registerSvg(svgLayer:any):void
}


export interface ToolBoxItemInterface extends HTMLDivElement{
    status: boolean       // to mark the stats of the button
    _parent: any          // to indicate the parent of the item
    eventFunction: any
    eventName: string
    activate():void
    deactivate():void
    resetButton():void         // to reset the button when other buttons aare clked
}

interface ToolBoxItemStatusInterface {
    currentActiveButton: string
    polylineItemButton: {status: boolean, attributeController: string}
    eraserItemButton: {status: boolean, attributeController: string}
    selectionToolItemButton: {status: boolean, attributeController: string}
    rectangleSelectionToolItemButton: {status: boolean, attributeController: string}
    addCommentItemButton: {status: boolean, attributeController: string}
    moveObjectInDivButton: {status: boolean, attributeController: string}
    addBookmarkButton: {status: boolean, attributeController: string}
    textToolItemButton: {status: boolean, attributeController: string}
    bothLayerSelectionToolItemButton: {status: boolean, attributeController: string}
}


export class ToolBoxClass implements ToolBoxInterface {
    itemArray: any[] = []      // to mark the status of the button
    targetPage: any
    currentActiveButton: any
    currentActiveEventFunction: (event:any)=>void = (e)=>{}
    currentActiveEventName:string = ""
    selectionHTMLObject?: HTMLDivElement
    optionHTMLObject?: HTMLDivElement

    //  check the item status
    toolBoxItemStatus: ToolBoxItemStatusInterface= {
        currentActiveButton: "",
        polylineItemButton: {
            status: false,
            attributeController: "polylineController"
        },
        eraserItemButton: {
            status: false,
            attributeController: "eraserController"
        },
        selectionToolItemButton: {
            status: false,
            attributeController: "penSelectionToolController"
        },
        rectangleSelectionToolItemButton: {
            status: false,
            attributeController: "rectangleSelectionTool"
        },
        addCommentItemButton: {
            status: false,
            attributeController: "addCommentController"
        },
        moveObjectInDivButton: {
            status: false,
            attributeController: "moveObjectInDivController"
        },
        addBookmarkButton: {
            status: false,
            attributeController: "addBookmarkController"
        },
        textToolItemButton: {
            status: false,
            attributeController: "textToolController"
        },
        bothLayerSelectionToolItemButton: {
            status: false,
            attributeController: "bothLayerSelectionToolController"
        }
    }


    checkToolBoxItemStatus(itemName:string):boolean{
        return this.toolBoxItemStatus[itemName]["status"]
    }

    switchToolBoxItemStatus(itemName:string){
      // turn off the attributeController and status of the buttom thaat is active
      let currentActiveButton = this.toolBoxItemStatus.currentActiveButton

      if (currentActiveButton){
          // switch off the current status
          this.toolBoxItemStatus[currentActiveButton]["status"] = !this.toolBoxItemStatus[currentActiveButton]["status"]
          // console.log(949494, currentActiveButton)

          // turn off attributeControllerWant
          let attributeControllerWantToTurnedOff = getAttributeController(this.toolBoxItemStatus, currentActiveButton)
          if (attributeControllerWantToTurnedOff) attributeControllerWantToTurnedOff["style"].display = "none"
      }

      this.toolBoxItemStatus.currentActiveButton = itemName
      this.toolBoxItemStatus[itemName]["status"] = !this.toolBoxItemStatus[itemName]["status"]

      // turn on attributeControllerWantToturn on
      let attributeControllerWantToTurnedOn =  getAttributeController(this.toolBoxItemStatus, itemName)
      console.log(attributeControllerWantToTurnedOn)
      if (attributeControllerWantToTurnedOn) attributeControllerWantToTurnedOn["style"].display = "block"
    }

    createToolboxHtmlObject(){
        let self = this
        let toolBoxContainer = <ToolBoxInterface>document.createElement("div")

        toolBoxContainer.classList.add("toolBoxHtml")
        this.itemArray = []

        let toolBoxSelectionHtmlObject = document.createElement("div")
        toolBoxSelectionHtmlObject.classList.add("toolBoxSelectionHtmlObject")

        let toolBoxOptionHtmlObject = document.createElement("div")
        toolBoxOptionHtmlObject.classList.add("toolBoxOption")

        toolBoxContainer.selectionHTMLObject  = toolBoxSelectionHtmlObject
        toolBoxContainer.optionHTMLObject = toolBoxOptionHtmlObject


        toolBoxContainer.appendChild(toolBoxSelectionHtmlObject)
        return toolBoxContainer
    }

    createToolBoxItem(name:string, toolBoxContainer:any, imagePath?:string):ToolBoxItemInterface{
        let toolBoxItem = <ToolBoxItemInterface> document.createElement("div")
        // the html style part
        toolBoxItem.classList.add("toolBoxItem", name)

        if (imagePath){
            let icon = document.createElement("img")
            icon.classList.add("toolBoxIcon")
            icon.src = imagePath
            toolBoxItem.append(icon)
        } else {
            toolBoxItem.innerText = name[0]
        }


        let squreLength = "40px"
        toolBoxItem.style.width = squreLength
        toolBoxItem.style.height = squreLength

        // internaal variable part
        toolBoxItem.status = false

        toolBoxItem.resetButton = function(){
            toolBoxItem.status = false
        }

        toolBoxItem._parent = toolBoxContainer.selectionHTMLObject
        this.itemArray.push(toolBoxItem)


        toolBoxItem.addEventListener(toolBoxItem.eventName, toolBoxItem.eventFunction)

        return toolBoxItem
    }

    createNewPolyLineItemButton(toolBoxHtmlObject:any){
        let toolBoxItem = this.createToolBoxItem("PolyLine", toolBoxHtmlObject, iconName.penTool)

        toolBoxItem.addEventListener("click", (e)=>{
            console.log("polyline item button is activated")
            this.activateButtonFunction(toolBoxItem, "polylineItemButton")
        })

        toolBoxItem.activate = function(){
          changeSvgEventPointer("divLayer", "none")
        }

        toolBoxItem.deactivate = function(){
          changeSvgEventPointer("divLayer", "auto")
        }

        return toolBoxItem
    }

    createSelectionToolItemButton(toolBoxHtmlObject:any){
        let toolBoxItem = this.createToolBoxItem("SelectionTool", toolBoxHtmlObject, iconName.penSelectionTool)

        toolBoxItem.addEventListener("click", (e)=>{
            console.log("Selection Tool item button is activated")
            this.activateButtonFunction(toolBoxItem, "selectionToolItemButton")
        })

        toolBoxItem.activate = function(){
          changeSvgEventPointer("divLayer", "none")
        }

        toolBoxItem.deactivate = function(){
          changeSvgEventPointer("divLayer", "auto")
        }

        return toolBoxItem
    }

    createBothLayerSelectionToolItemButton(toolBoxHtmlObject:any){
        let toolBoxItem = this.createToolBoxItem("BothLayerSelectionTool", toolBoxHtmlObject, iconName.bothLayerSelectionTool)

        toolBoxItem.addEventListener("click", (e)=>{
            console.log("Selection Tool item button is activated")
            this.activateButtonFunction(toolBoxItem, "bothLayerSelectionToolItemButton")
        })

        return toolBoxItem
    }

    createMouseRectangleSelectionToolItemButton(toolBoxHtmlObject:any){
        let toolBoxItem = this.createToolBoxItem("MouseRectangleSelectionTool", toolBoxHtmlObject, iconName["rectangleSelectionTool"])

        toolBoxItem.addEventListener("click", (e)=>{
            console.log("Mouse Rectangle Selection Tool item button is activated")
            this.activateButtonFunction(toolBoxItem, "rectangleSelectionToolItemButton")
        })

        return toolBoxItem
    }


    createEraserItemButton(toolBoxHtmlObject:any){
        // let self = this
        let toolBoxItem = this.createToolBoxItem("Eraser", toolBoxHtmlObject, iconName.eraserTool)

        toolBoxItem.addEventListener("click", e=>{
            this.activateButtonFunction(toolBoxItem, "eraserItemButton")
        })

        toolBoxItem.activate = function(){
          changeSvgEventPointer("divLayer", "none")
        }

        toolBoxItem.deactivate = function(){
          changeSvgEventPointer("divLayer", "auto")
        }


        return toolBoxItem
    }

    createAddCommentButton(toolBoxHtmlObject:any){
        let toolBoxItem = this.createToolBoxItem("AddComment", toolBoxHtmlObject)

        toolBoxItem.addEventListener("click", e=>{
            this.activateButtonFunction(toolBoxItem, "addCommentItemButton")
        })

        return toolBoxItem
    }

    createAddBookmarkButton(toolBoxHtmlObject:any){
        let toolBoxItem = this.createToolBoxItem("Bookmark", toolBoxHtmlObject, iconName.commentTool)

        toolBoxItem.addEventListener("click", e=>{
            this.activateButtonFunction(toolBoxItem, "addBookmarkButton")
        })

        return toolBoxItem
    }


    createMoveObjectInDivButton(toolBoxHtmlObject:any){
      let toolBoxItem = this.createToolBoxItem("MoveObjectInDiv", toolBoxHtmlObject, iconName.movableTool)

      toolBoxItem.addEventListener("click", e=>{
          this.activateButtonFunction(toolBoxItem, "moveObjectInDivButton")
      })

      toolBoxItem.activate = function(){
        changeSvgEventPointer("svgLayer", "none")
      }

      toolBoxItem.deactivate = function(){
        changeSvgEventPointer("svgLayer", "auto")
      }

      return toolBoxItem
    }

    createTextToolItemButton(toolBoxHtmlObject:any){
        let toolBoxItem = this.createToolBoxItem("textTool", toolBoxHtmlObject, iconName.textTool)

        toolBoxItem.addEventListener("click", (e)=>{
            console.log("Text Tool item button is activated")
            this.activateButtonFunction(toolBoxItem, "textToolItemButton")
        })


        toolBoxItem.activate = function(){
          changeSvgEventPointer("svgLayer", "none")
        }

        toolBoxItem.deactivate = function(){
          changeSvgEventPointer("svgLayer", "auto")
        }

        return toolBoxItem
    }


    activateButtonFunction(toolBoxItem:any, itemName:string){
      // to deactivate the previous button and activate the new button

        if (this.currentActiveButton){
            this.currentActiveButton.style.background = "gold"

            if (this.currentActiveButton.deactivate)this.currentActiveButton.deactivate()
        }

        this.switchToolBoxItemStatus(itemName)
        toolBoxItem.style.background = "red"
        this.currentActiveButton = toolBoxItem

        if (this.currentActiveButton.activate) this.currentActiveButton.activate()
    }


    registerSvg(svgLayer:any){
      let self = this
        svgLayer.addEventListener("click", function(){
            console.log("The svg is register to the toolbox")
            console.log("======================")
            self.targetPage = svgLayer
        })
    }

}

export function getAttributeController(toolBoxItemStatus:any, itemName:string){
    let attributeControllerClassName = toolBoxItemStatus[itemName]["attributeController"]
    return document.querySelector(`.${attributeControllerClassName}`)
}

export function changeSvgEventPointer(type:string, pointerEventOption:string){
  let currentLayerArray
  if (type=="divLayer"){
      currentLayerArray = mainController.pageController.currentPage.fullPageHTMLObject.querySelectorAll(".divLayer")
  }
  if (type=="svgLayer"){
      currentLayerArray = mainController.pageController.currentPage.fullPageHTMLObject.querySelectorAll(".svgLayer")
  }

    Array.from(currentLayerArray).forEach((layer:any)=>{
        layer.style.pointerEvents = pointerEventOption
    })
}
