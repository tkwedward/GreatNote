import {GNObjectInterface, GNContainerDivInterface, CreateGreatNoteObjectInterface} from "../GreatNoteClass/GreatNoteObjectInterface"
import {GNContainerDiv} from "../GreatNoteClass/GreatNoteDataClass"
import {superGNObject, setObjectMovable} from "../GreatNoteClass/GreateNoteObjectHelperFunction"
import * as CommentControlerHelperFunction from "./commentControllerHelperFunction"
import {CommentContainerInterface} from "./commentControllerHelperFunction"
//@auto-fold here

export function GNCommentSidebar(createData?: CreateGreatNoteObjectInterface){
    // let {name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData} = createData

    let _commentSidebar = <any> document.createElement("div")
    _commentSidebar.classList.add("commentSidebar")
    _commentSidebar.tagsArray = new Set(["question", "comment"])

    let _commentSidebarController = document.createElement("div")
    _commentSidebarController.classList.add("commentSidebarController")

    let addCommentButton = document.createElement("button")
    addCommentButton.innerText = "add"

    addCommentButton.addEventListener("click", function(e){
        let _commentBox = newCommentBox(_commentSidebar)
        _commentSidebar.append(_commentBox)
    })


    _commentSidebarController.append(addCommentButton)
    _commentSidebar.append(_commentSidebarController)


    return _commentSidebar
}


export function newCommentBox(_commentSidebar:any){
    let _commentBoxWrapper = document.createElement("div")
    _commentBoxWrapper.classList.add("commentBoxWrapper")
    let _commentBox = document.createElement("div")
    _commentBox.classList.add("commentBox")
    _commentBox.contentEditable = "true"

    let commentBoxTagWrapper = createCommentBoxTagWrapper(_commentSidebar)

    _commentBoxWrapper.append(_commentBox, commentBoxTagWrapper)

    return _commentBoxWrapper
}



export function createCommentBoxTagWrapper(_commentSidebar: any){
    let commentBoxTagWrapper = <any> document.createElement("div")
    commentBoxTagWrapper.classList.add("commentBoxTagWrapper")
    commentBoxTagWrapper.selectedTagsArray = new Set()

    commentBoxTagWrapper.addNewTags = function(data:string){
        let commentTag = document.createElement("div")
        commentTag.classList.add("commentTag")
        commentTag.textContent = data
        _commentSidebar.tagsArray.add(data)
        commentBoxTagWrapper.selectedTagsArray.add(data)
        commentBoxTagWrapper.append(commentTag)

    }

    let commentBoxInputWrapper = createCommentBoxInputWrapper(_commentSidebar, commentBoxTagWrapper)


    commentBoxTagWrapper.append(commentBoxInputWrapper)

    return commentBoxTagWrapper
}

export function createCommentBoxInputWrapper(_commentSidebar: any, commentBoxTagWrapper: any){
  let commentBoxInputWrapper = document.createElement("div")
  let commentBoxTagsInput = document.createElement("input")
  commentBoxTagsInput.classList.add("commentBoxTagsInput")

  let testTagArray = ["question", "comment"]

  let commentBoxDropdownList = document.createElement("div")
  commentBoxDropdownList.classList.add("commentBoxDropdownList")
  commentBoxInputWrapper.append(commentBoxTagsInput, commentBoxDropdownList)

  commentBoxTagsInput.addEventListener("input", (e)=>{
      // function: to filter out the tags in the testTagArray, when click, set the value of the input field
      let inputValue = commentBoxTagsInput.value

      // a set that remove the selected tags
      let tagsArray = new Set(
    [..._commentSidebar.tagsArray].filter(x => !commentBoxTagWrapper.selectedTagsArray.has(x)));

      let filteredTag = [...tagsArray].filter((p:any)=>p.startsWith(inputValue))
      commentBoxDropdownList.style.display = "block"
      commentBoxDropdownList.innerHTML = ""
      filteredTag.forEach((p:any)=>{
          let newTagChoice = document.createElement("div")
          newTagChoice.classList.add("newTagChoice")
          newTagChoice.innerText = p

          // add click event for an item in the commentBoxDropdownList
          newTagChoice.addEventListener("click", (e) => {
              commentBoxTagWrapper.addNewTags(p)
              commentBoxDropdownList.style.display = "none"
              commentBoxTagsInput.value = ""
          })

          commentBoxDropdownList.append(newTagChoice)
      })
  })


  commentBoxTagsInput.addEventListener("keyup", (e)=>{
      if (e.keyCode != 13) return


      commentBoxDropdownList.style.display = "none"

      if (commentBoxTagsInput.value != ""){
          commentBoxTagWrapper.addNewTags(commentBoxTagsInput.value)

          commentBoxTagsInput.value = ""
      }
      console.log('Enter');
  })

  return commentBoxInputWrapper
}
