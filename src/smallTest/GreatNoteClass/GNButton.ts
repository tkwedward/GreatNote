import {CreateGreatNoteObjectInterface, GNButtonInterface} from "./GreatNoteObjectInterface"
import {superGNObject, createDummyData} from "./GreateNoteObjectHelperFunction"

//@auto-fold here
export function GNButton(_name:string, statusList: string[], arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean):GNButtonInterface{
    let _object = <any> document.createElement("button");

    _object._name = _name
    _object.GNType = GNButton.name
    _object.statusList = statusList
    _object._dataStructure = ["innerText"]
    _object._styleStructure = []
    _object.innerHTML = statusList[0]


    // functions
    _object.loadFromData = (data:any) => { _object.innerHTML = data }

    _object.createDataObject = function(){
        let dataObject = <any> createDummyData()

        // data structure
        dataObject["GNType"] = _object.GNType

        dataObject["classList"] = Array.from(_object.classList)

        if (_object._identity) dataObject["_identity"] = _object._identity

        _object._dataStructure.forEach((p:any)=>{
          dataObject["data"][p] = _object[p]
        })

        // stylesheet data
        _object._styleStructure.forEach((p:any)=>{
          dataObject["stylesheet"][p] = _object["style"][p]
        })

        return dataObject
    }


    _object.extract = () => _object.createDataObject()
    _object.addClickEvent = function(clickFunction:(e:any)=>void){
        _object.addEventListener("click", (e:any)=>{
            clickFunction(_object)
        })
    }
    // a user define array

    _object.addEventListener("click", ()=>{
      let currentIndex = _object.statusList.indexOf(_object.innerText)
      let nextIndex = (currentIndex + 1) % _object.statusList.length
      _object.innerText = _object.statusList[nextIndex]
      _object.saveHTMLObjectToDatabase()
      _object.updateLinkObject()
    })

    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer)
    // _object.editEvent("input")

    return _object
}
