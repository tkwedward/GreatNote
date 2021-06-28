import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"
import {HTMLObjectControllerInterface, PolylineControllerInterface} from "./attributeControllerInterface"
import { checkPointInsideRect, checkCornersInside, checkSideInsideRect, getPointWidthAndHeight, addEventToSelectionRect, SelectionRectInterface } from "../ToolboxFolder/rectangleSelectionHelperFunction"

export interface SelectionToolControllerInterface extends HTMLObjectControllerInterface{
    selectionRect: any
    selectionRectInfo: any
    selectedItem: {
      divLayerItemArray: any[],
      svgLayerItemArray: any[],
    }
    copiedData: {
      divLayerCopiedDataArray: any[],
      svgLayerCopiedDataArray: any[],
    }
    divLayer: any
    svgLayer: any
}

export function createCheckBoxContainer(): [HTMLDivElement, HTMLLabelElement, HTMLInputElement, HTMLLabelElement, HTMLInputElement]{
    let checkBoxContainer = document.createElement("div")

    let divCheckBoxLabel = document.createElement("label")
    divCheckBoxLabel.htmlFor = "divCheckBox"
    divCheckBoxLabel.innerText = "div"
    let divCheckBox = document.createElement("input")
    divCheckBox.type = "checkbox"
    divCheckBox.id = "divCheckBox"
    divCheckBox.checked = true

    let svgCheckBoxLabel = document.createElement("label")
    svgCheckBoxLabel.htmlFor = "svgCheckBox"
    svgCheckBoxLabel.innerText = "svg"
    let svgCheckBox = document.createElement("input")
    svgCheckBox.type = "checkbox"
    svgCheckBox.id = "svgCheckBox"
    svgCheckBox.checked = true

    return [checkBoxContainer, divCheckBoxLabel, divCheckBox, svgCheckBoxLabel, svgCheckBox]
}

export function createRectangleSelectionToolController(mainController:MainControllerInterface):SelectionToolControllerInterface{
    let rectangleSelectionToolControllerContainer = <SelectionToolControllerInterface> document.createElement("div")
    rectangleSelectionToolControllerContainer.classList.add("rectangleSelectionToolController")

    let phaseInput = document.createElement("input")
    phaseInput.classList.add("phaseInput")

    let [checkBoxContainer, divCheckBoxLabel, divCheckBox, svgCheckBoxLabel, svgCheckBox] = createCheckBoxContainer()

    let copyButton = document.createElement("button")
    copyButton.innerText = "copy"
    copyButton.addEventListener("click", function(){
      let divLayerCopiedDataArray = rectangleSelectionToolControllerContainer.selectedItem.divLayerItemArray.map((p:any)=> p.extract())
      let svgLayerCopiedDataArray = rectangleSelectionToolControllerContainer.selectedItem.svgLayerItemArray.map((p:any)=> p.extract())

      rectangleSelectionToolControllerContainer.copiedData = {
        divLayerCopiedDataArray, svgLayerCopiedDataArray
      }



      rectangleSelectionToolControllerContainer.selectionRect.forEach((p:HTMLDivElement)=>p.remove())
    })

    let cutButton = document.createElement("button")
    cutButton.innerText = "cut"
    cutButton.addEventListener("click", function(){
      // selectionToolControllerContainer.copyDataArray = []
      // let selectionPolyline = <any> document.querySelector(".selectionPolyline")
      // selectionToolControllerContainer.copyDataArray = selectionPolyline?.selectedObjectArray.map((p:any)=> {
      //     let polylineData = p.extract()
      //     p.deleteFromDatabase()
      //     return polylineData
      // })
      //
      // selectionToolControllerContainer.selectionRectInfo = createSelectionRectInformation(selectionPolyline)
      // selectionPolyline.remove()
    })

    let pasteButton = document.createElement("button")
    pasteButton.innerText = "paste"
    pasteButton.addEventListener("click", function(){
        let { divLayerCopiedDataArray, svgLayerCopiedDataArray } = rectangleSelectionToolControllerContainer.copiedData

        let currentPageHTMLObject = mainController.pageController.currentPage.fullPageHTMLObject

        let {top, left, width, height} =  rectangleSelectionToolControllerContainer.selectionRectInfo
        let strokeColor = "blue"
        let strokeWidth = "2px"


        let overlay =  currentPageHTMLObject.querySelector(".pageOverlay")
        let divLayer =  currentPageHTMLObject.querySelector(".divLayer")
        let svgLayer = currentPageHTMLObject.querySelector(".svgLayer")



        let divLayerAccessPointer = divLayer?.getAccessPointer()
        let svgLayerAccessPointer = svgLayer?.getAccessPointer()


        let newSelectionRect = <SelectionRectInterface> document.createElement("div")
        newSelectionRect.classList.add("selectionRect")
        newSelectionRect.style.position = "absolute"
        newSelectionRect.style.border = `2px solid blue`
        newSelectionRect.style.left = left + "px"
        newSelectionRect.style.top = top + "px"
        newSelectionRect.style.width = width + "px"
        newSelectionRect.style.height = height + "px"
        newSelectionRect.style.pointerEvents = "none"
        newSelectionRect.style.background = "rgba(0, 0, 0, 0.5)"

        newSelectionRect.divLayerItemArray = []
        newSelectionRect.svgLayerItemArray = []

        addEventToSelectionRect(newSelectionRect, rectangleSelectionToolControllerContainer)
        overlay.append(newSelectionRect)

        if (divCheckBox.checked && divLayer){
            divLayerCopiedDataArray.forEach(p=>{
              let item = <any> mainController.createGNObjectThroughName(p.GNType, {
                name: "test", arrayID: divLayerAccessPointer,saveToDatabase: true
              })

              p._identity = item._identity
              item.loadFromData(p)
              item.saveHTMLObjectToDatabase()
              divLayer?.append(item)
              newSelectionRect.divLayerItemArray.push(item)
            })
        }
        if (svgCheckBox.checked && svgLayer){
            svgLayerCopiedDataArray.forEach(p=>{
              let item = <any> mainController.createGNObjectThroughName(p.GNType, {
                name: "test", arrayID: svgLayerAccessPointer, saveToDatabase: true
              })
              p._identity = item._identity
              item.loadFromData(p)
              item.saveHTMLObjectToDatabase()
              svgLayer?.append(item)
              newSelectionRect.svgLayerItemArray.push(item)
            })
        }
    })

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "delete"
    deleteButton.addEventListener("click", function(){
        // let selectionPolyline = <any> document.querySelector(".selectionPolyline")
        // selectionPolyline.selectedObjectArray.forEach((p:any)=> p.remove())
        // selectionPolyline.remove()
    })

    let clearButton = document.createElement("button")
    clearButton.innerText = "clearButton"
    clearButton.addEventListener("click", function(){
        rectangleSelectionToolControllerContainer.selectionRect.forEach((p:HTMLDivElement)=>p.remove())
    })




    checkBoxContainer.append(divCheckBoxLabel, divCheckBox, svgCheckBoxLabel, svgCheckBox)



    rectangleSelectionToolControllerContainer.append(copyButton, cutButton, pasteButton, deleteButton, clearButton, phaseInput, checkBoxContainer)

    return rectangleSelectionToolControllerContainer
}
