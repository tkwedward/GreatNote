import {CreateGreatNoteObjectInterface, GNDropdownListInterface} from "./GreatNoteObjectInterface"
import {superGNObject, createDummyData} from "./GreateNoteObjectHelperFunction"

//@auto-fold here

export function GNDropdownList(createData:CreateGreatNoteObjectInterface): GNDropdownListInterface {
   let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, statusList} = createData

    let _object = <GNDropdownListInterface> document.createElement("select")

    statusList?.forEach(p=>{
        let option = document.createElement("option")
        option.value = p
        option.innerText = p
        _object.appendChild(option)
    })

    _object._name = name
    _object.GNType = "GNDropdownList"
    _object.GNSpecialCreationMessage = specialCreationMessage || ""
    _object._dataStructure = ["value"]
    _object._identity = {accessPointer: "", dataPointer: "", linkArray: []}
    _object._styleStructure = []

    _object.extract = () => _object.createDataObject()


    _object.createDataObject = function(){
        let dataObject = <any> createDummyData()
        dataObject["GNType"] = _object.GNType
        dataObject["GNSpecialCreationMessage"] = _object.GNSpecialCreationMessage || ""
        dataObject["specialGNType"] = _object.specialGNType || ""

        if (_object._identity) dataObject["_identity"] = _object._identity
        dataObject["classList"] = Array.from(_object.classList)

        // data structure
        dataObject["data"]["value"] = _object["value"]

        // stylesheet data

        return dataObject
    }

    _object.loadFromData = (data)=>{
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage
        _object.specialGNType = data.specialGNTyp
        _object.setAttribute("accessPointer", data._identity.accessPointer)
        _object._identity = data._identity

        if (data.classList) data.classList.forEach((p:any)=>_object.classList.add(p))


        _object["value"] = data["data"]["value"]
    }

    _object.applyStyle = (styleObject, saveToDatabase=true)=>{}


    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input")

    _object.addEventListener("change", (e)=>{
        e.stopPropagation()

        if (_object?._identity?.accessPointer!="") _object.saveHTMLObjectToDatabase()

        if (_object.processUpdateData) _object.processUpdateData()
    }, false)//addEventListener

    return _object
}
