import {clearUpEvent, calculateDistance, changeItemPosition, getOffSetXY, getPageXY, mousePositionRatioAdjustment, getTouchOffset} from "./toolBoxHelperFunction"
import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"
import * as GreatNoteDataClass from "../GreatNoteClass/GreatNoteDataClass"
import * as Settings from "../settings"
import {shortNotice} from "../pageViewHelperFunction"
import {locationLog} from "../ToolboxFolder/toolBoxHelperFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"
import { checkPointInsideRect, checkCornersInside, checkSideInsideRect, getPointWidthAndHeight, addEventToSelectionRect, SelectionRectInterface } from "./rectangleSelectionHelperFunction"

let strokeColor = "blue"
let strokeWidth = "2px"

export function selectionToolPhaseOneMouseDownFunction(e:any, mainController:MainControllerInterface, overlay:any, moveEventName:string, upEventName:string){
  let rectSelectionToolController =  mainController.attributeControllerMapping.rectSelectionToolController
    let phaseInput =  rectSelectionToolController.querySelector(".phaseInput")
    phaseInput.value = "phaseOne"

  // if (selectionStatusObject.mode != "phaseOne"){
  //     return
  // }

  for (let child of overlay.children){
      child.style.pointerEvents = "none"
  }

  let [originalPositionX, originalPositionY, touchIsPen] = getOffSetXY(e)
  let [offsetX, offsetY] = [originalPositionX, originalPositionY]

  let strokeWidth = 5

  let selectionRect = <SelectionRectInterface> document.createElement("div")
  selectionRect.classList.add("selectionRect")
  selectionRect.style.position = "absolute"
  selectionRect.style.border = `${strokeWidth}px solid blue`
  selectionRect.style.left = originalPositionX + "px"
  selectionRect.style.top = originalPositionY + "px"
  selectionRect.style.width = "0px"
  selectionRect.style.height = "0px"
  selectionRect.style.pointerEvents = "none"
  rectSelectionToolController.selectionRect = selectionRect
  addEventToSelectionRect(selectionRect, rectSelectionToolController)
  overlay.append(selectionRect)



  let rect = e.target.getBoundingClientRect();
  let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0]

  let [top, left, width, height] = [0, 0, 0, 0]
  let mouseMoveFunction = (e:any)=>{
      e.preventDefault()

      let offsetX, offsetY
      let rect = e.target.getBoundingClientRect();
      offsetX = mousePositionRatioAdjustment(e.offsetX, ratio);
      offsetY = mousePositionRatioAdjustment(e.offsetY, ratio);



      width = Math.abs(originalPositionX - offsetX)
      height = Math.abs(originalPositionY - offsetY)

      phaseInput.value = `${offsetX}, ${offsetY}`
      // in region 1
      if (offsetX > originalPositionX && offsetY < originalPositionY){
          [left, top] = [originalPositionX, offsetY];
      }

      // in region 2
      if (offsetX < originalPositionX && offsetY < originalPositionY){
        [left, top] = [offsetX, offsetY];
      }

      // in region 3
      if (offsetX < originalPositionX && offsetY > originalPositionY){
        [left, top] = [offsetX, originalPositionY];
      }

      // in region 4
      if (offsetX > originalPositionX && offsetY > originalPositionY){
        [left, top] = [originalPositionX, originalPositionY];
      }

      selectionRect.style.left = left + "px"
      selectionRect.style.top = top + "px"
      selectionRect.style.width = width + "px"
      selectionRect.style.height = height + "px"
  }

  let mouseUpFunction = (e:MouseEvent)=>{
      e.preventDefault()

      // to recover the pointerEvent
      for (let child of overlay.children){
          child.style.pointerEvents = "auto"
      }

      phaseInput.value = JSON.stringify([left, top, width, height])
      let currentPageHTMLObject = mainController.pageController.currentPage.fullPageHTMLObject

      // create divLayerSelectionRect and svgLayerSelectionRect
      let divLayer = currentPageHTMLObject.querySelector(".divLayer")
      let svgLayer = currentPageHTMLObject.querySelector(".svgLayer")

      rectSelectionToolController.divLayer = divLayer
      rectSelectionToolController.svgLayer = svgLayer

      let divLayerSelectionRect = document.createElement("div")
      divLayerSelectionRect.classList.add("divLayerSelectionRect")
      divLayerSelectionRect.style.position = "absolute"
      divLayerSelectionRect.style.left = left + "px"
      divLayerSelectionRect.style.top = top + "px"
      divLayerSelectionRect.style.width = width + "px"
      divLayerSelectionRect.style.height = height + "px"

      divLayerSelectionRect.style.background = "pink"
      divLayerSelectionRect.style.border = "5px solid red"
      divLayerSelectionRect.style.opacity = "0"
      divLayer.append(divLayerSelectionRect)

      let svgLayerSelectionRect = svgLayer.svgController.rect(width + strokeWidth*2, height + strokeWidth * 2)
      svgLayerSelectionRect.attr({
        x: left, y: top, fill: "none", stroke: '#000',
        "fill-opacity": 0.5, "stroke-width": strokeWidth,
        "stroke-dasharray": "5"
      })
      svgLayerSelectionRect.node.style.opacity = "0"

      rectSelectionToolController.selectionRect = [selectionRect, divLayerSelectionRect, svgLayerSelectionRect]


      rectSelectionToolController.selectionRectInfo = {left, top, width, height}


      let selectedDivLayerItem = new Set()
      let selectedSvgLayerItem = new Set()

      let divSelectionRectData = getPointWidthAndHeight(divLayerSelectionRect)

      Array.from(divLayer.children).forEach((p:any)=>{
          if (p.nodeName!="DIV") return
          let tempRect = getPointWidthAndHeight(p)
          let checkCorner1 = checkCornersInside(tempRect, divSelectionRectData)
          let checkCorner2 = checkCornersInside( divSelectionRectData, tempRect)
          let checkSide1 = checkSideInsideRect(divSelectionRectData, tempRect)
          let checkSide2 = checkSideInsideRect(tempRect, divSelectionRectData)
          let resultArray = [checkCorner1, checkCorner2, checkSide1, checkSide2].flat()

          let overlapped = resultArray.some(p=>p==true)
          if (overlapped) { selectedDivLayerItem.add(p) }
      })

      let tempPoint = svgLayer.createSVGPoint();

      Array.from(svgLayer.children).forEach((p:any)=>{
        if (p.tagName == "polyline"){
            let pointArrayOfPolyline =  p.soul.array().value

            for (let _p: [number, number] of pointArrayOfPolyline) {
              tempPoint.x = _p[0]
              tempPoint.y = _p[1]

              if (svgLayerSelectionRect.node.isPointInFill(tempPoint)){
                  selectedSvgLayerItem.add(p)
                  break
              }
            }// // for pointArrayOfPolyline
        } // if (p.tagName == "polyline"){

      }) // svgBoard.children.forEach



      selectionRect.divLayerItemArray = Array.from(selectedDivLayerItem)
      selectionRect.svgLayerItemArray = Array.from(selectedSvgLayerItem)

      rectSelectionToolController.selectedItem = {
          divLayerItemArray: Array.from(selectedDivLayerItem),
          svgLayerItemArray: Array.from(selectedSvgLayerItem)
      }

    // cleaan up
      clearUpEvent(overlay, moveEventName, mouseMoveFunction)
      clearUpEvent(overlay, upEventName, mouseUpFunction)


  }
  // define the mouse move event
  overlay.addEventListener(moveEventName, mouseMoveFunction)
  overlay.addEventListener(upEventName, mouseUpFunction)

}  // mouseDownEventBeforeSelection
