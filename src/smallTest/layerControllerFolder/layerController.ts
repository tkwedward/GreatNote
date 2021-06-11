import * as GreatNoteDataClass from "../GreatNoteClass/GreatNoteDataClass"
import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"
import { MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"
import * as ToolBoxEvents from "../EventFolder/attachToolBoxEventsToLayers"
import {socket} from "../socketFunction"

export function switchStatus(item:any){
    let currentStatus = item.getAttribute("status")
    let newStatus = currentStatus=="on"? "off": "on"
    item.setAttribute("status", newStatus)
    return newStatus
}

export interface LayerControllerInterface extends HTMLDivElement{
    renderCurrentPageLayer():void
    content: any
}

// ** make the layer controller panel so that you can add new div / new svg layer
export function createLayerController(mainController:MainControllerInterface){
  // layerController HTML part
  let layerControllerTemplate = <LayerControllerInterface > document.querySelector("#layerControllerTemplate")
  let layerControllerHTMLObject = layerControllerTemplate["content"].cloneNode(true);

  let layerView = layerControllerHTMLObject.querySelector(".layerView")

  let addDivLayerButton = layerControllerHTMLObject.querySelector(".addDivLayerButton")
  addDivLayerButton.addEventListener("click", function(e:any){
      layerControllerHTMLObject.addDivLayer(e)
  }, {detail: {"run": 12345}})

  let addSvgLayerButton = layerControllerHTMLObject.querySelector(".addSvgLayerButton")
  addSvgLayerButton.addEventListener("click", function(e:any){
      layerControllerHTMLObject.addSvgLayer(e)
  })// addSvgLayerButton.addEventListener

  let showCurrentPageButton = layerControllerHTMLObject.querySelector(".showCurrentPageButton")
  showCurrentPageButton.addEventListener("click", function(){
      showCurrentPageButtonFunction(mainController, layerView)
  })

  let moveUpButton = <HTMLButtonElement> layerControllerHTMLObject.querySelector(".moveUpButton")
  moveUpButton.addEventListener("click", e=>{
    let selectedRow = <HTMLDivElement> layerView.querySelector(".selectedRow")
    let selectedLayerRow= <HTMLDivElement> selectedRow.parentElement
    let selectedLayerRowPreviousSibling =< HTMLDivElement> selectedLayerRow.previousSibling
    let parentElement= <HTMLDivElement> selectedLayerRow.parentElement
    parentElement.insertBefore(selectedLayerRow, selectedLayerRowPreviousSibling)

    // update the data in the DB
    let allLayerArray = Array.from(parentElement.querySelectorAll(".layerLevel"))
    let updatedChildArray = allLayerArray.map(p=>p.getAttribute("pageaccesspointer"))
    // changeLayerPosition(mainController, updatedChildArray)

    // chaange the layer in the fullPage
    let selectedLayerID = selectedLayerRow.getAttribute("pageaccesspointer")
    let selectedLayerRowPreviousSiblingID = selectedLayerRowPreviousSibling.getAttribute("pageaccesspointer")
    let selectedLayer= <HTMLDivElement> document.querySelector(`*[accessPointer='${selectedLayerID}']`)
    let selectedLayerPreviousSibling = <HTMLDivElement> document.querySelector(`*[accessPointer='${selectedLayerRowPreviousSiblingID}']`)
    let selectedLayerParentElement  = <HTMLDivElement> selectedLayer.parentElement

    selectedLayerParentElement.insertBefore(selectedLayer, selectedLayerPreviousSibling)
  })

  let moveDownButton = <HTMLButtonElement> layerControllerHTMLObject.querySelector(".moveDownButton")
  moveDownButton.addEventListener("click", e=>{
    let selectedRow = layerView.querySelector(".selectedRow")
    let selectedLayerRow= <HTMLDivElement> selectedRow.parentElement
    let selectedLayerRowNextSibling =< HTMLDivElement> selectedLayerRow.nextSibling
    let parentElement= <HTMLDivElement> selectedLayerRow.parentElement
    parentElement.insertBefore(selectedLayerRowNextSibling, selectedLayerRow)


    // update databasae
    let allLayerArray = Array.from(parentElement.querySelectorAll(".layerLevel"))
    let updatedChildArray = allLayerArray.map(p=>p.getAttribute("pageaccesspointer"))
    // changeLayerPosition(mainController, updatedChildArray)


    // chaange the layer in the fullPage
    let selectedLayerID = selectedLayerRow.getAttribute("pageaccesspointer")
    let selectedLayerNextSiblingID = selectedLayerRowNextSibling.getAttribute("pageaccesspointer")
    let selectedLayer= <HTMLDivElement> document.querySelector(`*[accessPointer='${selectedLayerID}']`)
    let selectedLayerNextSibling = <HTMLDivElement> document.querySelector(`*[accessPointer='${selectedLayerNextSiblingID}']`)
    let selectedLayerParentElement  = <HTMLDivElement> selectedLayer.parentElement

    console.log(68686868, selectedLayerID, selectedLayerNextSibling)
    selectedLayerParentElement.insertBefore(selectedLayerNextSibling, selectedLayer)

  })


  //
  // layerControllerHTMLObject functions
  //
  layerControllerHTMLObject.renderCurrentPageLayer = function(){
      showCurrentPageButtonFunction(mainController, layerView)
  }

  layerControllerHTMLObject.addDivLayer = function (e:any){

      let currentPage = mainController.pageController.currentPage
      let currentPageHTMLObject = mainController.pageController.currentPage.fullPageHTMLObject
      let divLayer = GreatNoteDataClass.GNContainerDiv({name:"",arrayID: currentPageHTMLObject.getAccessPointer(), saveToDatabase: true,  _classNameList: ["divLayer"]})
      divLayer.applyStyle({width: "100%", height: "100%", "position": "absolute", "left": "0px", "top": "0px"})
      mainController.saveHTMLObjectToDatabase(divLayer)

      ToolBoxEvents.attachEventListenerToDivLayer(mainController, divLayer)

      divLayer.appendTo(currentPageHTMLObject)

      layerControllerHTMLObject.renderCurrentPageLayer()
  }

  layerControllerHTMLObject.addSvgLayer = function (e:any){
    let currentPage = mainController.pageController.currentPage
    let currentPageHTMLObject = mainController.pageController.currentPage.fullPageHTMLObject
      let svgLayer = GreatNoteSvgDataClass.GNSvg({name:"", arrayID: currentPageHTMLObject.getAccessPointer(), saveToDatabase: true, _classNameList: ["svgLayer"]})
      mainController.toolBox.registerSvg(svgLayer)

      svgLayer.applyStyle({width: "100%", height: "100%",  "background": "transparent", position: "absolute", left: "0px", top: "0px"})
      mainController.saveHTMLObjectToDatabase(svgLayer)
      svgLayer.classList.add("svgLayer")
      ToolBoxEvents.attachEventListenerToSvgBoard(mainController, svgLayer)
      svgLayer.appendTo(currentPageHTMLObject)

      layerControllerHTMLObject.renderCurrentPageLayer()
  }

  mainController.layerController = layerControllerHTMLObject

  return layerControllerHTMLObject
}


export function showCurrentPageButtonFunction(mainController:MainControllerInterface, layerView:HTMLDivElement){
    layerView.innerHTML = ""

    let currentPageData = mainController.pageController.currentPage.fullPageHTMLObject?.extract()
    console.log(138138, currentPageData)

    if (currentPageData.array.length == 0){
      let layerArray = mainController.pageController.currentPage.fullPageHTMLObject.children
      Array.from(layerArray).forEach((p:any)=>{
        currentPageData.array.push(p.extract())
        console.log(p)
      })
    }

    let layerObject = buildLayerContentFunction(mainController, currentPageData, layerView)
    layerView.appendChild(layerObject)
}

//** aa funciton to build a list of items in a page so that tthey can be shown in the layer panel for switch on and off and lock the layer
export function buildLayerContentFunction(mainController: MainControllerInterface, currentPageData: any, layerView:HTMLDivElement, layerLevel=0){
  // first create an item object that conatin the information of the layerLeevel and pageAccessPointer
  // pageAccessPointer is used for finding the related HTML obejct show that you can manipulate them
    let layerRowTemplate =  document.querySelector("#layerRowTemplate")

    let item = document.createElement("div")
    item.classList.add("layerLevel")
    item.draggable = true
    let itemRow = layerRowTemplate.content.cloneNode(true)
                    .querySelector(".layerRow")
    itemRow.setAttribute("layerLevel", layerLevel.toString())
    let itemViewSwitch =  itemRow.querySelector(".viewSwitch")
    let itemRowName =  itemRow.querySelector(".viewName")
    let itemExpandSwitch =  itemRow.querySelector(".expandSwitch")


    item.appendChild(itemRow)
    item.setAttribute("layerLevel", layerLevel.toString())
    if (layerLevel==0) itemRow.style.display = "none"
    if (layerLevel > 1) item.setAttribute("status", "off")


    for (let i = 0; i < layerLevel; i++ ){
        itemRowName.innerText+= "-"
    }

    itemRowName.innerText += currentPageData.GNType
    addItemRowFunction(layerView, itemRow)

    // add click event to the item object to change the style of the related html objec tin that page
    item.setAttribute("pageAccessPointer", currentPageData._identity.accessPointer)

    // the event on the three buttons
    itemViewSwitch.addEventListener("click", function(e:any){
        e.stopPropagation()

        let relatedHTMLObject = <HTMLElement> document.querySelector(`*[accessPointer='${currentPageData._identity.accessPointer}']`)
        mainController.toolBox.targetPage = relatedHTMLObject

        // to test if the style is visible or not
        relatedHTMLObject.style.visibility =  (relatedHTMLObject.style.visibility == "hidden") ? "inherit": "hidden"

        switchStatus(itemViewSwitch)
    })

    itemExpandSwitch.addEventListener("click", function(e:any){
        e.stopPropagation()
        let newStatus = switchStatus(itemExpandSwitch)
        let targetItem = Array.from(item.querySelectorAll(`.layerLevel[layerlevel='${layerLevel}']`))
        targetItem.forEach(p=>p.setAttribute("status", newStatus))
    })

    itemRowName.addEventListener("click", function(e:any){
        e.stopPropagation()
        let selectedRow = layerView.querySelector(".selectedRow")
        if (selectedRow) selectedRow.classList.remove("selectedRow")
        itemRow.classList.add("selectedRow")
    })

    item.addEventListener("dragstart", function (e){
        e.stopPropagation()
        e.target.classList.add("draggedLayerRow")
    })

    item.addEventListener("dragleave", function( e ) {
      e.preventDefault();
      // console.log("dragleave", e)
    }, false);

    item.addEventListener("dragover", function( e ) {
      e.preventDefault();
    }, false);

    layerView.addEventListener("drop", function(e){
      let draggedLayerRow = <HTMLDivElement> document.querySelector(".draggedLayerRow")

      // console.log(draggedLayerRow)
      if (draggedLayerRow){
          draggedLayerRow.classList.remove("draggedLayerRow")
          draggedLayerRow.style.background = "red"
          console.log(draggedLayerRow.offsetTop)
          console.log(layerView.children)
      }
    })

    // to
    layerLevel+=1
    if (currentPageData.array.length > 0){
        currentPageData.array.forEach((p:any)=>{
            item.appendChild(buildLayerContentFunction(mainController, p, layerView, layerLevel))
        })
    }

    return item
}

function addItemRowFunction(layerView:any, itemRow:any){
  itemRow.addEventListener("click", function(){
    let selectedRow = layerView.querySelector(".selectedRow")
    if (selectedRow) selectedRow.classList.remove("selectedRow")
    itemRow.classList.add("selectedRow")
  })
} // addItemRowFunction

function changeLayerPosition(mainController: MainControllerInterface, updatedChildArray: any){
  let currentPageHTMLObject = <any> document.querySelector(".currentPage")
  let currentPageID = currentPageHTMLObject.getAccessPointer()

  let microUpdateData = {
      metaData: {
        action: "microUpdate",
        description: "change layer position",
        notebookID: mainController.notebookID,
        accessPointer: currentPageID,
        modifyField: "_identity.children",
        newData: updatedChildArray
      }
  }
  mainController.changeList.push(microUpdateData)
} // changeLayerPosition
