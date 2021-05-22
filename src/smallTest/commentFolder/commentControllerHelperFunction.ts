import {GNContainerDiv} from "../GreatNoteClass/GreatNoteDataClass"
import {GNDropdownList} from "../GreatNoteClass/GNDropdownList"
import {GNObjectInterface, GNContainerDivInterface, CreateGreatNoteObjectInterface} from "../GreatNoteClass/GreatNoteObjectInterface"

export interface CommentContainerInterface extends GNContainerDivInterface{
    // to create the comment object and append to the container
    createCommentObject(createData: CreateGreatNoteObjectInterface):any
    createReplyObject(createData: CreateGreatNoteObjectInterface):any
}


export function loadFromData(_commentContainer:any, injectedData:any){
    _commentContainer._identity = injectedData._identity
    _commentContainer.setAttribute("accessPointer", injectedData._identity.accessPointer)

    if (injectedData.classList) injectedData.classList.forEach((className:string)=>{
      // add class name if the object does not have the class naame
        if (!_commentContainer.classList.contains(className)){
            _commentContainer.classList.add(className)
        }  else { return }
    }) // add classList

    if (injectedData.stylesheet){
      _commentContainer.applyStyle(injectedData.stylesheet, false)
    }
}


export function createCommentObject(_commentContainer:any, createData:any){
  let {arrayID, saveToDatabase, injectedData}  = createData
  let _commentObject = GNContainerDiv(createData)
  _commentObject.classList.add("commentObject")
  _commentObject.specialGNType = "GNCommentObject"

  // commentContent
  let _commentContent = GNContainerDiv({
      name: "commentContent",
      arrayID: _commentObject.getAccessPointer(), contentEditable:true,
      saveToDatabase: saveToDatabase
  })
  _commentContent.contentEditable = "true"
  _commentContent.classList.add("commentField")

  // _commentType
  let _commentType = GNDropdownList({
      name: "commentType",
      arrayID: _commentObject.getAccessPointer(),
      statusList: ["reply", "comment"],
      saveToDatabase: saveToDatabase
  })

  //
  if (injectedData){
    console.log(45, "injected", injectedData["array"][1])
    _commentType.loadFromData(injectedData["array"][0])
    _commentContent.loadFromData(injectedData["array"][1])

  }

  _commentType.classList.add("commentType")
  _commentType.style.display = "block"

  console.log(636363, _commentContent, _commentType)
//   when nit is not injectdData, then initialize the html
  if (!injectedData) {
    // _commentObject.textContent = "creaaated by intiaal"
  }
  _commentObject.append(_commentType, _commentContent)
  // _commentObject.append(_commentType, _commentContent)
  _commentObject.appendTo(_commentContainer)
  return _commentObject
}


//@auto-fold here
export function addEventToCommentContainer(commentContainer){
    commentContainer.addEventListener("click", function(e){
        e.stopPropagation()
    })
}


//@auto-fold here
export function addCommentController(_commentContainer: CommentContainerInterface){
    let controller =  document.createElement("div")
    controller.classList.add("commentController")

    // add comment button
    let addCommentButton = document.createElement("button")
    addCommentButton.classList.add("addCommentButton")
    addCommentButton.innerText = "add Comment"

    addCommentButton.addEventListener("click", (e)=>{
        let newCommentField = _commentContainer.createCommentObject({"name": "", arrayID: _commentContainer.getAccessPointer(), saveToDatabase:true, contentEditable: false})
        newCommentField.saveHTMLObjectToDatabase()
    })

    // delete comment button
    let deleteCommentButton = document.createElement("button")
    deleteCommentButton.classList.add("deleteCommentButton")
    deleteCommentButton.innerText = "delete Comment"
    deleteCommentButton.addEventListener("click", (e)=>{
        _commentContainer.deleteFromDatabase()
    })

    // add objects to htmlObject
    controller.append(addCommentButton, deleteCommentButton)

    _commentContainer.insertBefore(controller, _commentContainer.firstChild)
}
