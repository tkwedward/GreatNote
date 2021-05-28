
import {GNObjectInterface, GNInputFieldInterface, CreateGreatNoteObjectInterface, GNButtonInterface, GNImageContainerInterface, GNContainerDivInterface, superGNObjectInterface, GNExtractDataInterface} from "./GreatNoteObjectInterface"
import {superGNObject, createDummyData} from "./GreateNoteObjectHelperFunction"




//@auto-fold here

export function GNContainerDiv(createData: CreateGreatNoteObjectInterface) : GNContainerDivInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, contentEditable, _classNameList} = createData
    let _object = <any> document.createElement("div");
    _object.childrenList = {}

    _object.GNType = "GNContainerDiv"
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"]

    // add classname

    _object._classNameList = _classNameList || []
    _classNameList?.forEach(p=>{
      _object.classList.add(p)
    })
    // console.log(242424, _object._classNameList)

    _object.loadFromData = (data:any) => {
        if (data._classNameList) data._classNameList.forEach((p:any)=>_object.classList.add(p))

        _object._identity = data._identity

        _object.setAttribute("accessPointer", data._identity.accessPointer)

        if (contentEditable){
          _object["textContent"] = data["data"]["textContent"]
        }
    }

    _object.extract = () => _object.createDataObject()

    _object.createDataObject = function(){
        let dataObject:any
        if (_object.objectData){
          dataObject = _object.objectData
        } else {
          dataObject = createDummyData()
        }


        dataObject["GNType"] = _object.GNType

        if (_object._identity) dataObject["_identity"] = _object._identity

        dataObject["_classNameList"] = Array.from(_object.classList)

        // stylesheet data
        _object?._styleStructure?.forEach((p:any)=>{
            dataObject["stylesheet"][p] = _object.style[p]
        })

        return dataObject
    }

    _object.applyStyle = function (styleObject:any, saveToDatabase=true){
        Object.entries(styleObject).forEach(([key, value], _)=> _object["style"][key] = value)

        if (saveToDatabase) _object.saveHTMLObjectToDatabase()
    }

    // add extra funcitons to the object

    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData)

    if (injectedData){
      _object.loadFromData(injectedData)

      _object.applyStyle(injectedData.stylesheet, false)  //

      if (injectedData._classNameList && injectedData._classNameList.length>0){
        injectedData._classNameList.forEach((p:any)=>_object.classList.add(p))
      }

      _object._identity = injectedData._identity
      _object.setAttribute("accessPointer", _object._identity.accessPointer)
      _object.objectData = injectedData

    }

    return _object
}
