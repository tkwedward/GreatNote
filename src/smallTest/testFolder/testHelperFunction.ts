import {MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"
import *  as GreatNoteSVGDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"
import *  as GreatNoteDataClass from "../GreatNoteClass/GreatNoteDataClass"
import * as ClipboardEvent from "../clipboardEvents"


let bookmarkStructure = {
    "children": [
      {
        "index": "1",
        "name": "bookmark1",
        "_identity": [],
        "children": [
              {
                  "index": "1.1",
                  "name": "bookmark1.1",
                  "_identity": [],
                  "children": [],
              },
              {
                  "index": "1.2",
                  "name": "bookmark1.1",
                  "_identity": [],
                  "children": []
              }
          ]
      },
      {
        "index": "2",
        "name": "bookmark1",
        "_identity": [],
        "children": [
              {
                  "index": "2.1",
                  "name": "bookmark1.1",
                  "_identity": [],
                  "children": [
                    {
                        "index": "2.1.2",
                        "name": "bookmark2.1.2",
                        "_identity": [],
                        "children": []
                    }
                  ],
              }
          ]
      }
    ]
}
import * as BookmarkHelperFunction from "../bookmarkFolder/bookmarkHelperFunction"


export function renderBookmarkItem(item:any, parentDiv:any, level = 0){
    if (item.index == -1 || item.index == Infinity ) return
    let bookmarkItem = document.createElement("div")
    bookmarkItem.classList.add("bookmarkItem", "bookmarkLevel" + level)
    bookmarkItem.innerHTML = item.index
    bookmarkItem.style.paddingLeft = 20 * level + "px"
    parentDiv.appendChild(bookmarkItem)

    item.bookmarkHTMLObject = bookmarkItem

    bookmarkItem.addEventListener("click", function(){
        let selectedBookmark = parentDiv.querySelector(".selectedBookmark")
        if (selectedBookmark) selectedBookmark.classList.remove("selectedBookmark")

        bookmarkItem.classList.add("selectedBookmark")
    })

    let currentChild = item.childrenArray.head
    while (currentChild){
        renderBookmarkItem(currentChild, parentDiv, level+1)
        currentChild = currentChild.next
    }
}

export function testFunction(mainController:MainControllerInterface){
    let testFieldDiv = <HTMLDivElement> document.querySelector(".testField")
    testFieldDiv.style.display = "block"
    console.log("testFunction")

    let bookmarkWrapper = document.createElement("div")
    bookmarkWrapper.classList.add("bookmarkWrapper")

    let bookmarkController = document.createElement("div")
    bookmarkWrapper.classList.add("bookmarkWrapper")

    testFieldDiv.append(bookmarkWrapper)

    let bookmarkArray = ["1", "1.1", "1.1.1", "1.1.2", "2", "2.1", "2.2", "2.2.1", "2.2.2", "1.1.3", "3", "4", "2.2.2.1"]
    let bookmarkTree = new  BookmarkHelperFunction.BookmarkTree()
    // bookmarkTree.buildBookmarkTree(bookmarkArray)

    bookmarkArray.forEach(p=>{
        let item = BookmarkHelperFunction.buildBookmarkItem(p)
        bookmarkTree.addBookmarkItem(item)
    })
    // renderBookmarkItem(bookmarkTree.root.chilsdrenArray, bookmarkWrapper)
    let currentNode = bookmarkTree.root.childrenArray.head

    while (currentNode){
        renderBookmarkItem(currentNode, bookmarkWrapper, 0)
        currentNode = currentNode.next
    }

    console.log(878787, bookmarkTree.root)

}
