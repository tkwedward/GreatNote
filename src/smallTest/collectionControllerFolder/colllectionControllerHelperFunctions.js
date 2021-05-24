import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass";
import * as CollectionPageHelperFunction from "./collectionPageHelperFunction";
export function createCollectionControllerWrapper(collectionViewer) {
    let collectionControllerWrapper = document.createElement("div");
    collectionControllerWrapper.classList.add("collectionControllerWrapper");
    collectionControllerWrapper.collectionArray = [];
    collectionControllerWrapper.renderGroup = function (collectionData) {
        collectionData.forEach(p => {
            let [collectionRow, collectionName, collectionSwitch] = createCollectionRow(p);
            collectionViewer.append(collectionRow);
        });
    };
    return collectionControllerWrapper;
} // createcollectionControllerWrapper
export function createCollectionRow(injectedData) {
    let collectionRow = document.createElement("div");
    collectionRow.classList.add("collectionRow");
    collectionRow.collectionData = [];
    let collectionName = document.createElement("div");
    collectionName.contentEditable = "true";
    collectionName.innerText = "Collection";
    collectionName.classList.add("collectionName");
    if (injectedData) {
        collectionRow.collectionData = injectedData;
        collectionRow.setAttribute("collectionID", injectedData.uniqueID);
        collectionName.innerText = injectedData.collectionName;
    }
    let collectionShow = document.createElement("div");
    let collectionSwitch = document.createElement("span");
    collectionShow.innerText = "show";
    collectionShow.addEventListener("click", e => {
        let collectionPage = document.querySelector(".collectionPage");
        collectionPage.style.display = "block";
        collectionPage.currentActiveCollectionRow = collectionRow;
        collectionPage.injecetDataToCollectionPage(collectionRow.collectionData);
    });
    collectionRow.append(collectionName, collectionShow, collectionSwitch);
    return [collectionRow, collectionName, collectionSwitch];
} // createcollectionRow
export function createAddCollectionButton(collectionWrapper, collectionViewer) {
    let addButton = document.createElement("button");
    addButton.innerText = "addCollection";
    addButton.addEventListener("click", function () {
        let [collectionRow, collectionName, collectionSwitch] = createCollectionRow();
        collectionViewer.append(collectionRow);
    });
    return addButton;
} // createAddGroupButton
export function convertAccessPointerToHTMLObject(accessPointerArray) {
    return accessPointerArray.map(p => document.querySelector(`*[accessPointer='${p}']`));
} //convertAccessPointerToHTMLObject
export function createCollectionPage() {
    let collectionPage = document.querySelector(".collectionPage");
    collectionPage.pageStatus = { height: 0 };
    let divLayer = document.createElement("div");
    divLayer.classList.add("collectionPageDivLayer");
    divLayer.style.position = "absolute";
    divLayer.style.top = "0px";
    divLayer.style.left = "0px";
    let svgLayer = GreatNoteSvgDataClass.GNSvg({ "name": "dummySVG", _classNameList: ["collectionPageSvgLayer"] });
    collectionPage.append(divLayer, svgLayer);
    collectionPage.divLayer = divLayer;
    collectionPage.svgLayer = svgLayer;
    // attach injection function to the collection page htmlObject
    CollectionPageHelperFunction.attachExtraFunctionToCollectionPage(collectionPage, divLayer, svgLayer);
    CollectionPageHelperFunction.attachEventsToCollectionPage(collectionPage, divLayer, svgLayer);
    return collectionPage;
}
