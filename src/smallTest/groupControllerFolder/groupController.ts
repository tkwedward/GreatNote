import { GNObjectInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface"
import {superGNObject, setObjectMovable, createDummyData} from "../GreatNoteClass/GreateNoteObjectHelperFunction"
import { MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"
import * as RectangleSelectionToolFunction from "../ToolboxFolder/rectangleSelectionToolPhaseOne"
import {createGroupRow, convertAccessPointerToHTMLObject, markObjectInsideSelectionArea, createAddGroupButton, createGroupControllerWrapper } from "./groupControllerHelperFunctions"


export function createBookmarkHTMLObject(_object:any){
  // interior parts
  let bookmarkHeader = document.createElement("div")
  bookmarkHeader.classList.add("bookmarkHeader")

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

  let deleteButton = document.createElement("button")
  deleteButton.innerText = "delete"
  deleteButton.addEventListener("click", function(){
      _object.deleteFromDatabase()
  })

  bookmarkHeader.append(bookmarkType, deleteButton)


  return [bookmarkHeader, bookmarkTitle, bookmarkType, tagsWrapper, tagsInput, deleteButton]
}

export function GroupController(mainController: MainControllerInterface) {
    let [groupControllerWrapper, groupControllerNavbarTitle, groupViewer] = createGroupControllerHTMLObject(mainController)
    return [groupControllerNavbarTitle, groupControllerWrapper]
}

export function createGroupControllerHTMLObject(mainController: MainControllerInterface){
    let groupViewer = document.createElement("div")
    groupViewer.classList.add("groupViewer")

    let groupControllerNavbarTitle = document.createElement("div");
    groupControllerNavbarTitle.classList.add("groupControllerNavbarTitle", "subPanelTitle")
    groupControllerNavbarTitle.innerText = "group"

    let groupControllerBar = document.createElement("div")
    groupControllerBar.classList.add("groupControllerBar")

    let addGroupButton = createAddGroupButton(groupViewer)

    let groupControllerWrapper = createGroupControllerWrapper(groupViewer)

    groupControllerBar.append(addGroupButton)
    groupControllerWrapper.append(groupViewer, groupControllerBar)
    return [groupControllerWrapper, groupControllerNavbarTitle, groupViewer]
}
