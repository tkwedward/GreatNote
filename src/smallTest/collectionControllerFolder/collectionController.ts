import { GNObjectInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface"
import {superGNObject, setObjectMovable, createDummyData} from "../GreatNoteClass/GreateNoteObjectHelperFunction"
import { MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"
import * as RectangleSelectionToolFunction from "../ToolboxFolder/rectangleSelectionToolPhaseOne"
import {createCollectionRow, convertAccessPointerToHTMLObject, createAddCollectionButton, createCollectionControllerWrapper } from "./colllectionControllerHelperFunctions"

export function CollectionController(mainController: MainControllerInterface) {
    let [collectionControllerWrapper, collectionControllerNavbarTitle, collectioniViewer] = createCollectionControllerHTMLObject(mainController)
    return [ collectionControllerNavbarTitle, collectionControllerWrapper]
}

export function createCollectionControllerHTMLObject(mainController: MainControllerInterface){
    let collectionControllerNavbarTitle = document.createElement("div");
    collectionControllerNavbarTitle.classList.add("collectionControllerNavbarTitle", "subPanelTitle")
    collectionControllerNavbarTitle.innerText = "colllection"

    let collectionViewer = document.createElement("div")
    collectionViewer.classList.add("collectionViewer")

    let collectionControllerWrapper = createCollectionControllerWrapper(collectionViewer)

    let collectionControllerBar = document.createElement("div")
    collectionControllerBar.classList.add("collectionControllerBar")

    let addCollectionButton = createAddCollectionButton(collectionControllerWrapper, collectionViewer)
    let closeCollectionPageButton = document.createElement("button")
    closeCollectionPageButton.innerText = "close"
    closeCollectionPageButton.addEventListener("click", e=>{
        let collectionPage = <HTMLDivElement> document.querySelector(".collectionPage")
        collectionPage.style.display = "none"
    })

    collectionControllerBar.append(addCollectionButton, closeCollectionPageButton)

    collectionControllerWrapper.append(collectionViewer, collectionControllerBar)
    return [collectionControllerWrapper, collectionControllerNavbarTitle, collectionViewer]
}
