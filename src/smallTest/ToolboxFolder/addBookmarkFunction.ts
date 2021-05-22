import { GNBookmark }  from "../bookmarkFolder/GNBookmark"
import { GNBookmarkLinkedObject }  from "../bookmarkFolder/GNBookmarkLinkedObject"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"

export function addBookmarkMouseDownFunction(e:any, mainController:MainControllerInterface, divLayer:any, moveEventName:string, upEventName:string){
    if (!mainController.toolBox.checkToolBoxItemStatus("addBookmarkButton")){
        return
    }
    console.log("from addBookmarkFunction", e)

    let divLayerAccessID = divLayer.getAccessPointer()

    // the bookmark objectt
    let bookmarkDiv = GNBookmark({name: "GNBookmark", arrayID: divLayerAccessID, saveToDatabase: true})

    // the linked object
    let bookmarkSidebar = <HTMLDivElement> document.querySelector(".commentSubPanel .subPanelContent")
    let boookmarkLinkedObejctDataPointer = <string> bookmarkDiv.getAttribute("accessPointer")
    let bookmarkSidebarContentAccessPointer = mainController.mainDocArray["mainArray_bookmark"]
    let bookmarkLinkedObject = GNBookmarkLinkedObject({name: "GNBookmarkLinkedObject", arrayID: bookmarkSidebarContentAccessPointer, dataPointer: boookmarkLinkedObejctDataPointer,  saveToDatabase: true})

    divLayer.append(bookmarkDiv)
    bookmarkSidebar.append(bookmarkLinkedObject)


}
