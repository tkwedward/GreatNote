import { GNObjectInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface"
import {superGNObject, setObjectMovable, createDummyData} from "../GreatNoteClass/GreateNoteObjectHelperFunction"


export interface GNBookmarkLinkedObjectInterface extends GNObjectInterface, HTMLElement {
}


export function createBookmarkLinkedObjectHTMLObject(_object:any){
  let bookmarkTitle = document.createElement("div")
  bookmarkTitle.classList.add("bookmarkTitle")
  bookmarkTitle.contentEditable = "true"
  bookmarkTitle.draggable = false

  let bookmarkType = document.createElement("select")
  let commentTypeOption = document.createElement("option")
  commentTypeOption.value = "comment"
  commentTypeOption.innerText = "comment"
  let quesitonTypeOption = document.createElement("option")
  quesitonTypeOption.value = "question"
  quesitonTypeOption.innerText = "question"
  bookmarkType.append(commentTypeOption, quesitonTypeOption)

  let tagsWrapper = document.createElement("div")
  tagsWrapper.classList.add("tagsWrapper")

  let tagsInput = document.createElement("input")
  tagsInput.classList.add("tagsInput")
  tagsWrapper.append(tagsInput)

  let goToBookmarkPageButton = document.createElement("button")
  goToBookmarkPageButton.innerText = "goToPage"
  goToBookmarkPageButton.addEventListener("click", e => {
      console.log("goToBookmarkPageButton")
      let masterObject = <any> document.querySelector(`div[accessPointer='${_object.getDataPointer()}']`)
      masterObject?.getLocatedPageNumber()
  })
  return [bookmarkTitle, bookmarkType, tagsWrapper, tagsInput, goToBookmarkPageButton]
}

export function GNBookmarkLinkedObject(createData: CreateGreatNoteObjectInterface):GNBookmarkLinkedObjectInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, _classNameList} = createData

    let _object = <GNBookmarkLinkedObjectInterface> document.createElement("div");
    _object.classList.add("GNBookmarkLinkedObject")
    _object.GNType = "GNBookmarkLinkedObject"
    _object.GNSpecialCreationMessage = specialCreationMessage || ""
    _object._dataStructure = [""]
    _object._styleStructure = ["background"]

    let [bookmarkTitle, bookmarkType, tagsWrapper, tagsInput, goToBookmarkPageButton] = createBookmarkLinkedObjectHTMLObject(_object)

    _object.append(bookmarkTitle, bookmarkType, tagsWrapper, goToBookmarkPageButton)

    // add classname
    _object._classNameList = _classNameList || []
    _classNameList?.forEach(p=>{
      _object.classList.add(p)
    })

    _object.applyStyle = function(styleData){
        Object.entries(styleData).forEach(([key, value], _)=>{
            _object.style[key] = value
        })
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
      dataObject["GNSpecialCreationMessage"] = _object.GNSpecialCreationMessage
      dataObject["specialGNType"] = _object.specialGNType || ""

      if (_object._identity) dataObject["_identity"] = _object._identity

      dataObject["_classNameList"] = Array.from(_object.classList)

      let computedStyle = window.getComputedStyle(_object)
      _object?._styleStructure?.forEach((p:any)=>{
          dataObject["stylesheet"][p] = computedStyle[p]
      })

      return dataObject
    }

    _object.loadFromData = (injectedData:any) => {
        // first update the content, if the data is from the master, then just use the master's data only, not its css and other meta daat
        let linkedObjectData = _object.extract()
        console.log(7575757,"before", injectedData, linkedObjectData)

        if (injectedData._identity.accessPointer == injectedData._identity.dataPointer){
            linkedObjectData.data = injectedData.data
        }
        // if data is from itself
        if (injectedData._identity.accessPointer != injectedData._identity.dataPointer){
            // fill in array, object, data, style, _classNameList, identity
            _object._identity = injectedData._identity
            _object.setAttribute("accessPointer",injectedData._identity.accessPointer)

            let dataPointerHTMLObject = <any> document.querySelector(`*[accessPointer='${injectedData._identity.dataPointer}']`)
            console.log(injectedData._identity.dataPointer, dataPointerHTMLObject)
            let masterDataPointerObject = dataPointerHTMLObject.extract()
            linkedObjectData.data = masterDataPointerObject.data
        }

        console.log("after", injectedData)

        bookmarkTitle.innerHTML = linkedObjectData.data.bookmarkTitle

        bookmarkType.value = linkedObjectData.data.bookmarkType
        //
        //
        if (injectedData._classNameList) linkedObjectData._classNameList.forEach((p:any)=>_object.classList.add(p))

        _object.objectData = linkedObjectData
        // _object.applyStyle(injectedData.stylesheet)
    }

    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData)


    if (injectedData){
      _object.loadFromData(injectedData)
    }

    return _object
}
