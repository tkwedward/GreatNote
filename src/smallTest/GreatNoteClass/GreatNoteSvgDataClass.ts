import {mainController} from "../../index"
import SVG from "svg.js";
import {GNObjectInterface, CreateGreatNoteObjectInterface, GNSvgContainerInterface, GNSvgObjectInterface, GNSvgCircleInterface, GNSvgCircleData, GNSvgRectInterface, GNSvgLineInterface, GNSvgLineData, GNSvgPolyLineInterface, GNSvgPolyLineData, GNSvgImageInterface, GNSvgImageDataInterface} from "./GreatNoteObjectInterface"
import {superGNObject} from "./GreateNoteObjectHelperFunction"
import * as GreatNoteDataClass from "./GreatNoteDataClass"


function createDummyData(){
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
        "stylesheet": {}
    }
}

//@auto-fold here
export function GNSvg(createData: CreateGreatNoteObjectInterface) : GNSvgContainerInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, _classNameList} = createData
    let svgDivContainer =  document.createElement("div")
    svgDivContainer.id = "testSvgDiv"
    let svgController = SVG(svgDivContainer)
    let svgBoard = <any> svgController.node
    svgBoard.svgController = svgController
    svgBoard.GNType = "GNSvg"
    svgBoard._name = name
    svgBoard._dataStructure = []
    svgBoard._styleStructure = ["width", "height", "background", "position", "left", "top"]

    svgBoard._classNameList = _classNameList || []
    _classNameList?.forEach(p=>{
      svgBoard.classList.add(p)
    })

    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    svgBoard.appendToContainer = function(parent:any){
        parent.appendChild(svgDivContainer)
    }

    svgBoard.applyStyle = function(stylesheet:any){
        Object.entries(stylesheet).forEach(([key, value], _)=>{
            svgBoard["style"][key] = value
        })
    }

    svgBoard.createDataObject = function(){
        let dataObject = <any> createDummyData()

        // data structure
        dataObject["GNType"] = svgBoard.GNType
        if (svgBoard._identity) dataObject["_identity"] = svgBoard._identity

        dataObject["_classNameList"] = Array.from(svgBoard.classList)

        svgBoard?._dataStructure?.forEach((p:any)=>{
          dataObject["data"][p] = svgBoard[p]
        })

        // stylesheet data
        svgBoard?._styleStructure?.forEach((p:any)=>{
          dataObject["stylesheet"][p] = svgBoard["style"][p]
        })

        return dataObject
    }

    svgBoard.loadFromData = function(data:any){
        svgBoard.GNSpecialCreationMessage = data.GNSpecialCreationMessage

         svgBoard.specialGNType = data.specialGNType

        if (data._classNameList) data._classNameList.forEach((p:any)=>svgBoard.classList.add(p))

        svgBoard._identity = data._identity

        svgBoard.setAttribute("accessPointer", data._identity.accessPointer)

        svgBoard.applyStyle(data.stylesheet)
    }

    //
    svgBoard.extract = () => svgBoard.createDataObject()
    // add extra funcitons to the object
    superGNObject(svgBoard, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData)

    if (injectedData){
      svgBoard.identity = injectedData._identity
      svgBoard.setAttribute("accessPointer", svgBoard.identity.accessPointer)
      svgBoard.objectData = injectedData

      if (injectedData._classNameList && injectedData._classNameList.length>0){
        injectedData._classNameList.forEach((p:any)=>svgBoard.classList.add(p))
      }
    }

    return svgBoard
}


//@auto-fold here
export function GNSvgCircle(createData: CreateGreatNoteObjectInterface) : GNSvgCircleInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase} = createData
    let svgObjectSoul = new SVG.Circle()
    svgObjectSoul.radius(75)
    svgObjectSoul.fill("red")
    let svgObject = <any> svgObjectSoul.node
    svgObject.soul = svgObjectSoul
    svgObject.GNType = "GNSvgCircle"
    svgObject._name = name
    svgObject._dataStructure = ["cx", "cy", "r"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (_GNData:any)=>{
        svgObject.style["cx"] = parseInt(_GNData["data"]["cx"]) + 200
        svgObject.style["cy"] = parseInt(_GNData["data"]["cy"])
        svgObject.style["r"]  = parseInt(_GNData["data"]["r"])
    }


    svgObject.createDataObject = function(){
        let dataObject = <any> createDummyData()

        // data structure
        dataObject["GNType"] = svgObject.GNType
        if (svgObject["_identity"]) dataObject["_identity"] = svgObject["_identity"]


        dataObject["data"]["cx"] = svgObject.style["cx"]
        dataObject["data"]["cy"] = svgObject.style["cy"]
        dataObject["data"]["r"] = svgObject.style["r"]

        // stylesheet data
        svgObject._styleStructure.forEach((p:any)=>{
          dataObject["stylesheet"][p] = svgObject["style"][p]
        })

        return dataObject
    }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgCircleData){
        svgObjectSoul.attr(attrList)
    }

    svgObject.appendTo = function (parentSVGContainer:any){
      //self.targetPage.svgNode.appendChild(eraser.node)
        parentSVGContainer.svgNode.appendChild(svgObject.node)
    }

    // add extra funcitons to the object
    superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}

// ==============
//@auto-fold here
export function GNSvgRect(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgRectInterface {
    let svgObject = <any> new SVG.Rect()
    svgObject.GNType = GNSvgRect.name
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data:any)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:any){
        Object.entries(attrList).forEach(([key, value], _)=>{
            svgObject.node.style[key] = value

        })
    }

    // add extra funcitons to the object
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}




//@auto-fold here
export function GNSvgLine(name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgLineInterface {
    let svgObject = <GNSvgLineInterface> new SVG.Line()
    svgObject.GNType = GNSvgLine.name
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:any){
        svgObject.plot(attrList["points"])
        svgObject.attr(attrList["attribute"])

    }

    // add extra funcitons to the object
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}


//@auto-fold here
export function GNSvgPolyLine(createData: CreateGreatNoteObjectInterface) : GNSvgPolyLineInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase,specialCreationMessage, injectedData} = createData

    let svgObjectSoul = <SVG.PolyLine> SVG(document.createElement("polyline")).polyline([0, 0, 0, 0])


    let svgObject = <any> svgObjectSoul.node
    svgObject.soul = svgObjectSoul

    svgObject.GNType = GNSvgPolyLine.name
    svgObject._name = name
    svgObject._dataStructure = ["points"]
    svgObject._styleStructure = ["stroke", "stroke-width", "fill"]

    // functions
    svgObject.loadFromData = (injectedData:any)=>{
      svgObject.soul.plot(injectedData["data"]["points"])
      svgObject.applyStyle(injectedData["stylesheet"])
    }

    svgObject.createDataObject = function(){
        let dataObject = <any> createDummyData()

        // data structure
        dataObject["GNType"] = svgObject.GNType
        if (svgObject._identity) dataObject["_identity"] = svgObject._identity

        dataObject["data"]["points"] = svgObject.soul.array().value.toString()

        // stylesheet data
        dataObject["stylesheet"]["stroke"] = svgObject["style"]["stroke"]
        dataObject["stylesheet"]["stroke-width"] = svgObject["style"]["stroke-width"]
        dataObject["stylesheet"]["fill"] = svgObject["style"]["fill"]

        return dataObject
    }


    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:any){
      svgObject._styleStructure.forEach((p:any)=>{
          if (p=="fill"){
              svgObject["style"]["fill"] = attrList["fill"] || "none"
          } else {
              svgObject["style"][p] = attrList[p]
          }
      })
    }

    // to share same data function
    superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    // add extra funcitons to the object

    if (injectedData){
      svgObject.loadFromData(injectedData)

      svgObject.applyStyle(injectedData.stylesheet, false)  //

      if (svgObject._classNameList && svgObject._classNameList.length>0){
        svgObject._classNameList.forEach((p:any)=>svgObject.classList.add(p))
      }

      svgObject.identity = injectedData._identity
      svgObject.setAttribute("accessPointer", svgObject.identity.accessPointer)
      svgObject.objectData = injectedData
    }

    return svgObject
} //GNSvgPolyLine


//@auto-fold here
export function GNSvgImage(name:string, arrayID?: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase: boolean=true) : GNSvgImageInterface {

    let svgObject = <any> SVG(document.createElement("image")).image()

    svgObject.setImgSrc = function (src:string){
        svgObject.load(src)
    }

    svgObject.GNType = "GNSvgImage"
    svgObject._name = name
    svgObject._dataStructure = ["value"]
    svgObject._styleStructure = []

    // functions
    svgObject.loadFromData = (data:any)=>{ svgObject = data }

    svgObject.extract = () => svgObject.createDataObject()

    svgObject.applyStyle = function(attrList:GNSvgPolyLineData){
        svgObject.attr(attrList["attribute"])
    }

    // add extra funcitons to the object
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase)
    return svgObject
}


function SuperSVG(svgObject: any, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean){
    svgObject.appendTo = function (parentSVGContainer:any){
        svgObject.soul.addTo(parentSVGContainer.svgController)
    }
}
