import {HTMLObjectControllerInterface, PolylineControllerInterface} from "./attributeControllerInterface"
import {choiceController, dropdownListController,  inputFieldAndDropdownListController} from "./basicControllerType"
import {universalControllerCreater, superController} from "./attributeControllerHelperFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"


export function createPolylineController():PolylineControllerInterface{
  let polylineControllerContainer = <PolylineControllerInterface> document.createElement("div")
  polylineControllerContainer.classList.add("polylineController")
  polylineControllerContainer.targetHTMLType = "polyline"

  // color controller
  let colorTemplate = document.createElement("div")
  colorTemplate.style.display = "inline-block"
  colorTemplate.style["width"] = "30px"
  colorTemplate.style["height"] = "30px"
  colorTemplate.style["margin"] = "5px"

  let polylineStrokeColorController = choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorTemplate)
  polylineStrokeColorController.classList.add("polylineColorController")

  let polylineStrokeWidthController = universalControllerCreater("widthController", {
      attributeName: "width",
      unitOptions: ["px", "vw", "%"],
      controllerType: inputFieldAndDropdownListController
  })
  polylineStrokeWidthController.classList.add("polylineStrokeWidthController")
  polylineStrokeWidthController.querySelector("input").value = "2"

  polylineControllerContainer.controllerArray = [polylineStrokeColorController, polylineStrokeWidthController]
  polylineControllerContainer.append(...polylineControllerContainer.controllerArray)

  polylineControllerContainer.extract = function(){
      let strokeColor = polylineStrokeColorController.extract()

      let strokeWidth =  polylineStrokeWidthController.extract()
      return [strokeColor, strokeWidth]
  }

  superController(polylineControllerContainer)

  return polylineControllerContainer
}

export function createDivControllerContainer():HTMLObjectControllerInterface{
    let divControllerContainer = <HTMLObjectControllerInterface> document.createElement("div")
    divControllerContainer.classList.add("divController")
    divControllerContainer.targetHTMLType = "DIV"

    // color controller
    let colorSquare = document.createElement("div")
    colorSquare.style.display = "inline-block"
    colorSquare.style["width"] = "50px"
    colorSquare.style["height"] = "50px"
    colorSquare.style["margin"] = "10px"
    let backgroundColorController = choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare)

    // width Controller
    let widthController = universalControllerCreater("widthController", {
        attributeName: "width",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    })

    let heightController = universalControllerCreater("widthController", {
        attributeName: "height",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    })

    let positionController = universalControllerCreater("positionController", {
        attributeName: "position",
        selectionList: ["none", "relative", "absolute"],
        controllerType: dropdownListController
    })

    divControllerContainer.controllerArray = [widthController, heightController, positionController, backgroundColorController]
    divControllerContainer.append(...divControllerContainer.controllerArray)

    superController(divControllerContainer)

    return divControllerContainer
}


export function createSvgCircleControllerContainer():HTMLObjectControllerInterface{
    let svgCircleContainer = <HTMLObjectControllerInterface> document.createElement("div")

    svgCircleContainer.classList.add("svgCircleContainer")
    svgCircleContainer.targetHTMLType = "circle"

    let radiusController = inputFieldAndDropdownListController("r", ["px", "vw", "%"])

    let circleCenterXController = universalControllerCreater("cxController", {
        attributeName: "cx",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    })

    let circleCenterYController = universalControllerCreater("cyController", {
        attributeName: "cy",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    })

    let colorSquare = document.createElement("div")
    colorSquare.style.display = "inline-block"
    colorSquare.style["width"] = "50px"
    colorSquare.style["height"] = "50px"
    colorSquare.style["margin"] = "10px"

    let fillController = choiceController("fill", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare)

    svgCircleContainer.controllerArray = [radiusController, circleCenterXController, circleCenterYController, fillController]

    svgCircleContainer.append(...svgCircleContainer.controllerArray)
    superController(svgCircleContainer)

    return svgCircleContainer
}// createSvgCircleControllerContainer


interface SelectionToolControllerInterface extends HTMLObjectControllerInterface{
    copyDataArray: any
}

export function createSelectionToolController(mainController:MainControllerInterface):SelectionToolControllerInterface{
    let selectionToolControllerContainer = <SelectionToolControllerInterface> document.createElement("div")
    selectionToolControllerContainer.classList.add("penSelectionToolController")

    selectionToolControllerContainer.copyDataArray = []

    let copyButton = document.createElement("button")
    copyButton.innerText = "copy"
    copyButton.addEventListener("click", function(){
      selectionToolControllerContainer.copyDataArray = []
      let selectionPolyline = <any> document.querySelector(".selectionPolyline")
      selectionToolControllerContainer.copyDataArray = selectionPolyline.selectedObjectArray.map((p:any)=> p.extract())
    })

    let cutButton = document.createElement("button")
    cutButton.innerText = "cut"
    cutButton.addEventListener("click", function(){
        duplicateSvgData(mainController, selectionToolControllerContainer, true)
    })

    let pasteButton = document.createElement("button")
    pasteButton.innerText = "paste"
    pasteButton.addEventListener("click", function(){
        duplicateSvgData(mainController, selectionToolControllerContainer)
    })

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "delete"
    deleteButton.addEventListener("click", function(){
        let selectionPolyline = <any> document.querySelector(".selectionPolyline")
        selectionPolyline.selectedObjectArray.forEach((p:any)=> p.remove())
        selectionPolyline.remove()
    })

    selectionToolControllerContainer.append(copyButton, cutButton, pasteButton, deleteButton)

    return selectionToolControllerContainer
}

function duplicateSvgData(mainController:MainControllerInterface, selectionToolControllerContainer:any , removeOriginalData: boolean = false){
  let currentPageSvgLayer = <any> document.querySelector(".currentPage svg")

  selectionToolControllerContainer.copyDataArray.forEach((p:any)=>{
      let newHTMLObject
      if (p.GNType=="GNSvgPolyLine") {

          newHTMLObject = mainController.createGNObjectThroughName("GNSvgPolyLine", {name: "", saveToDatabase: true, injectedData: p})

          console.log(159159, currentPageSvgLayer, newHTMLObject )

          currentPageSvgLayer.append(newHTMLObject)
      }
  })
  selectionToolControllerContainer.copyDataArray = []

  let selectionPolyline = <any> document.querySelector(".selectionPolyline")
  selectionPolyline.remove()
}
