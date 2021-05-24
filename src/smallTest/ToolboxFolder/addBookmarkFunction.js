import { GNBookmark } from "../bookmarkFolder/GNBookmark";
import { GNBookmarkLinkedObject } from "../bookmarkFolder/GNBookmarkLinkedObject";
export function addBookmarkMouseDownFunction(e, mainController, divLayer, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("addBookmarkButton")) {
        return;
    }
    console.log("from addBookmarkFunction", e);
    let divLayerAccessID = divLayer.getAccessPointer();
    // the bookmark objectt
    let bookmarkDiv = GNBookmark({ name: "GNBookmark", arrayID: divLayerAccessID, saveToDatabase: true });
    // the linked object
    let bookmarkSidebar = document.querySelector(".commentSubPanel .subPanelContent");
    let boookmarkLinkedObejctDataPointer = bookmarkDiv.getAttribute("accessPointer");
    let bookmarkSidebarContentAccessPointer = mainController.mainDocArray["mainArray_bookmark"];
    let bookmarkLinkedObject = GNBookmarkLinkedObject({ name: "GNBookmarkLinkedObject", arrayID: bookmarkSidebarContentAccessPointer, dataPointer: boookmarkLinkedObejctDataPointer, saveToDatabase: true });
    divLayer.append(bookmarkDiv);
    bookmarkSidebar.append(bookmarkLinkedObject);
}
