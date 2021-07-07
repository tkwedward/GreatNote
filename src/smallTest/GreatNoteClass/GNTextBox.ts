import {GNObjectInterface, GNInputFieldInterface, CreateGreatNoteObjectInterface, GNButtonInterface, GNImageContainerInterface, GNContainerDivInterface, superGNObjectInterface} from "./GreatNoteObjectInterface"
import {superGNObject, createDummyData, setObjectMovable} from "./GreateNoteObjectHelperFunction"


interface GNTextBoxInterface extends GNContainerDivInterface{
    getAnnotationType(): string
    setMovable(): void
}

export function inputFunction(_object: any, item:any):((e:any)=>void){
    return function itemInputFunction(e:InputEvent){
        setTimeout(function(){
          _object.saveHTMLObjectToDatabase()
          item.addEventListener("input",  itemInputFunction)
        }, 3000)
        item.removeEventListener("input", itemInputFunction)
    }
}


export function createTextBox(_object: any, uniqueID?: string){
    let textBox = document.createElement("div");
    if (!uniqueID){
        uniqueID = `${Date.now().toString(36) + Math.random().toString(36).substr(2)}`
    }
    textBox.setAttribute("textBoxID", uniqueID)
    textBox.innerHTML = "TextContainerTextContainer"
    textBox.classList.add("textContainer")
    textBox.contentEditable = "true"
    textBox.draggable = false

    textBox.addEventListener("input", inputFunction(_object, textBox))


    textBox.addEventListener("paste", (e:any)=>{
        e.stopPropagation()

        var items = (e.clipboardData || e.originalEvent.clipboardData).items;

        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                // e.preventDefault()
                var blob = item.getAsFile();
                var reader = new FileReader();

                console.log(blob, item)
                reader.onload = function (event:any) {
                  console.log(event.target.result)
                  let targetImg = <HTMLImageElement> textBox.querySelector(`img[src='${event.target.result}']`)

                  targetImg.style.width = "98%"
                  targetImg.style.margin = "auto"
                  targetImg.style.display = "block"
                  targetImg.style.position = "relative"

                  let xhr = new XMLHttpRequest()
                  xhr.open('POST', '/talkNotes/processImageBase64Format', true);
                  xhr.onload = function () {
                      console.log("finish processing image")
                       let responseImgSrc = JSON.parse(this.responseText).imgsrc.replace("talkNotes/", "/")

                       console.log(responseImgSrc)

                       targetImg.src = window.location.origin
                       + "/image/" + responseImgSrc +".png"
                    };
                    xhr.send(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    })
    return textBox
}

export function GNTextBox(createData: CreateGreatNoteObjectInterface) : GNTextBoxInterface {
    let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, _classNameList} = createData

    let _object = <GNTextBoxInterface> document.createElement("div");
    _object.classList.add("GNTextBox")
    _object.addEventListener("mousedown", e=>{
        e.stopPropagation()
        console.log("from textBox")
    })
    _object.style.width = "500px";
    _object.style.minHeight = "50px";
    // _object.style.background = "lightblue";
    setObjectMovable(_object)

    _object.childrenList = {}

    _object.GNType = "GNTextContainer"
    _object.GNSpecialCreationMessage = specialCreationMessage || ""
    _object._dataStructure = ["innerHTML"]
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"]
    _object._classNameList = _classNameList || []
    _classNameList?.forEach(p=> _object.classList.add(p))

    _object.loadFromData = (injectedData:any, saveToDatabase=false) => {

        _object.GNSpecialCreationMessage = injectedData.GNSpecialCreationMessage

         _object.specialGNType = injectedData.specialGNType

        if (injectedData._classNameList) injectedData._classNameList.forEach((p:any)=>_object.classList.add(p))

        _object._identity = injectedData._identity

        _object.setAttribute("accessPointer", injectedData._identity.accessPointer)

        _object.applyStyle(injectedData.stylesheet, saveToDatabase)

        _object.innerHTML = injectedData["data"]["innerHTML"]
    }

    _object.extract = () => _object.createDataObject()

    _object.setMovable = ()=> setObjectMovable(_object)

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

        // data structure
        dataObject["data"]["innerHTML"] = _object.innerHTML

        // stylesheet data
        _object?._styleStructure?.forEach((p:any)=>{
            dataObject["stylesheet"][p] = _object.style[p]
        })

        return dataObject
    }

    _object.applyStyle = function (styleObject:any, saveToDatabase=true){
        Object.entries(styleObject).forEach(([key, value], _)=>{
            _object["style"][key] = value
        })
        // throw "unknown exception"

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
