import {mainController} from "../../index"
import * as ToolBoxEvents from "../EventFolder/attachToolBoxEventsToLayers"
import  {GNObjectInterface} from "../GreatNoteClass/GreatNoteObjectInterface"
import {superGNObjectInterface, CreateGreatNoteObjectInterface} from "./GreatNoteObjectInterface"


interface DummnyDataInterface {
    data: any,
    array: any[],
    GNType: string,
    specialGNType: string,
    _identity: {
      dataPointer: string,
      accessPointer: string,
      linkArray: string[]
    },
    stylesheet: any,
    GNSpecialCreationMessage: string
    _classNameList: string[]
}

export function createDummyData(): DummnyDataInterface{
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "specialGNType": "",
        "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": [""]},
        "stylesheet": {},
        "GNSpecialCreationMessage": "",
        "_classNameList": []
    }
}


//@auto-fold here
export function superGNObject(_object:any, saveToDatabase?:boolean, arrayID?:string, insertPosition?:number|boolean, dataPointer?:string|boolean, specialCreationMessage?:string, injectedData?: any, attachEventListener=true){
    _object = <superGNObjectInterface>_object
    _object._identity = {
      accessPointer: "", dataPointer: "", linkArray: []
    }

    /** important function to extract data from individual elements*/

    // when the data is first created, add it to the database
    _object.addToDatabase = function(arrayID: string, insertPosition?:number|boolean, dataPointer?:string, specialCreationMessage?: string){

        let temporaryPointer =  `temporaryPointer_${Date.now().toString(36) + Math.random().toString(36).substr(2)}`
        _object._identity.accessPointer = temporaryPointer
        _object.setAttribute("accessPointer", temporaryPointer)

        mainController.addData(arrayID, _object, temporaryPointer, insertPosition, dataPointer, specialCreationMessage)
    }


    _object.saveHTMLObjectToDatabase = function(){
        mainController.saveHTMLObjectToDatabase(_object)
    }

    /** to apply stylesheet to an element */
    _object.updateLinkObject = function(){
        let dataPointer = _object.getDataPointer()
        let accessPointer = _object.getAccessPointer()
        let masterObject = mainController.getObjectById(dataPointer)
        let linkArray = masterObject._identity.linkArray
        let dataObject = _object.extract()

        linkArray.forEach((p:string)=>{
            let targetHTML = <any> document.querySelector(`*[accesspointer='${p}']`)

            if (p!= accessPointer){
                targetHTML?.loadFromData(dataObject)
            } else {
                // _object.saveHTMLObjectToDatabase()
            }
        })
    }

    _object.initializeHTMLObjectFromData = function(data: any){
        _object.setAttribute("accessPointer", data._identity.accessPointer)
        _object._identity = data._identity
        _object.GNType = data.GNType
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage
    }

    _object.getLocatedPageNumber = function (){

        if (_object.classList.contains("divPage")){
            let targetID = _object.getAccessPointer()
            let pageNumber =  mainController.pageController.getPageNumberFromPageID(targetID)
            mainController.pageController.goToPage(pageNumber)
            _object.scrollIntoView()

            // return [pageNumber, mainController]
        } else {
            let parent = _object.parentElement
            return parent.getLocatedPageNumber()
        }
    }


    _object.processUpdateData  = function(){
        // let objectData = _object.reloadDataFromDatabase()
        // _object.updateLinkObject()
    }

    // _object.reloadDataFromDatabase = function(){
    //     let dataPointer = _object.getDataPointer()
    //     let accessPointer = _object.getAccessPointer()
    //
    //     let dataPointerObject = mainController.getObjectById(dataPointer)
    //
    //     _object.loadFromData(dataPointerObject)
    //     //
    //     if (dataPointer!= accessPointer){
    //         let accessPointerObject= mainController.getObjectById(accessPointer)
    //         _object.applyStyle(accessPointerObject.stylesheet)
    //     } else {
    //         _object.applyStyle(dataPointerObject.stylesheet)
    //     }
    //     return dataPointerObject
    // }


    _object.appendTo = function(_parent:HTMLDivElement){
        _object._parent = _parent
        _parent.appendChild(_object)
    }

    _object.generateGNObjectThroughGNType = function(_GNType:string, createDataObject: CreateGreatNoteObjectInterface){
        return mainController.createGNObjectThroughName(_GNType, createDataObject)
    }

    // ========================================
    // =======   for database acces    ========
    // ========================================

    _object.getDataPointer = function(){
        return _object._identity.dataPointer
    }

    _object.setDataPointer = function(dataPointer:string){
        _object._identity.dataPointer = dataPointer
    }

    _object.getAccessPointer = function(){
        return _object._identity.accessPointer
    }

    _object.setAccessPointer = function(accessPointer:string){
        _object._identity.accessPointer = accessPointer
    }

    _object.getLinkArray = function(){
        let objectInDatabase = mainController.getObjectById(_object.getAccessPointer())
        return objectInDatabase._identity.linkArray
    }


    // ========================================
    // =======   database operations   ========
    // ========================================
    _object.deleteFromDatabase = function (){
        // mainController
        mainController.deleteFromDataBase(_object)
    }


    _object.getDataFromDataBase = function(){
        return mainController.getObjectById(_object.getDataPointer())
    }

    if (attachEventListener){
        attachEventListenerToLayer(mainController, arrayID, _object, injectedData)
    }


    if (saveToDatabase){
        _object.addToDatabase(arrayID, insertPosition, dataPointer, specialCreationMessage)
        // _object.editEvent(editEvent)
    }
}

import {MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"

function attachEventListenerToLayer(mainController:MainControllerInterface, arrayID?:string, _object?: any, injectedData?:any){
    if (_object.GNType == "GNSvg"){
        ToolBoxEvents.attachEventListenerToSvgBoard(mainController, _object)
    }

    if (injectedData?.GNSpecialCreationMessage){
        ToolBoxEvents.attachEventListenerToDivLayer(mainController, _object)
    }
}


export function setObjectMovable(_object:any){
    let eventName = "mousedown"
    let moveEventName = "mousemove"
    let attributeX = "left"
    let attributeY = "top"
    _object.style.position = "absolute"

    _object.addEventListener("mousedown", (e:any)=>{
        console.log(e)
       e.stopPropagation()
       let [startX, startY] = [e["screenX"], e["screenY"]]
       let objectInitialX =  0
       let objectInitialY =  0
       let initialLeftValue = parseInt(_object.style[attributeX as keyof CSSStyleDeclaration].replace("px", "")) || 0
       let initialTopValue = parseInt(_object.style[attributeY as keyof CSSStyleDeclaration ].replace("px", "")) || 0
       let [currentX, currentY, deltaX, deltaY] = [0, 0, 0, 0]

       let mousemoveFunction = (e:any)=>{
          e.stopPropagation()
           currentY = e.screenY
           currentX = e.screenX
           deltaX = currentX - startX
           deltaY = currentY - startY
           let newX =
           _object.style[attributeX] = `${initialLeftValue + deltaX}px`
           _object.style[attributeY] = `${initialTopValue + deltaY}px`
       }

       function endDragEvent(e:any){
         Array.from(_object?.parentNode?.childNodes).forEach((p:any)=>{
            p["style"]["pointerEvents"] = "inherit"
         })
         let endX = e["screenX"]
         let endY = e["screenY"]
         _object.removeEventListener("mousemove", mousemoveFunction)
       }

       let mouseUpEvent = (e:any)=>{
          e.stopPropagation()
           endDragEvent(e)
           if (e.type == "mouseup"){
              _object.saveHTMLObjectToDatabase()
           }

           _object.removeEventListener("mouseup", mouseUpEvent)
           _object.removeEventListener("mouseout", mouseUpEvent)
       }

       _object.addEventListener("mousemove", mousemoveFunction, false)
       _object.addEventListener("mouseup", mouseUpEvent, false)
       _object.addEventListener("mouseout", mouseUpEvent, false)
     })
}
