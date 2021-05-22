import * as ClipboardEvent from "./clipboardEvents";
// GMPnkects
import { GNContainerDiv } from "./GreatNoteClass/GreatNoteDataClass";
import { GNImageContainer } from "./GreatNoteClass/GNImageContainer";
import { GNInputField } from "./GreatNoteClass/GNInputField";
import * as GreatNoteSvgDataClass from "./GreatNoteClass/GreatNoteSvgDataClass";
import { socket } from "./socketFunction";
import * as GNCommentController from "./commentFolder/commentController";
import * as LayerConroller from "./layerControllerFolder/layerController";
import * as pageController from "./pageControllerFolder/pageController";
import * as pageViewHelperFunction from "./pageViewHelperFunction";
import * as InitializeAttributeControllerFunction from "./attributeControllerFolder/initializeAttributeControllers";
import * as SwipeEventController from "./EventFolder/swipeEvent";
import * as TestHelper from "./testFolder/testHelperFunction";
import * as WindowController from "./EventFolder/specialWindowObject";
export function getDivFromHTML(mainController) {
    let pageArrayID = mainController.mainDocArray["mainArray_page"];
    // global htmlObjects
    let panelContainer = document.querySelector(".panelContainer");
    let pageContentContainer = document.querySelector(".pageContentContainer");
    panelContainer.style.zIndex = "100";
    let fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    fullPageModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageFull"]);
    let overviewModeDiv = document.querySelector(".overviewModeDiv");
    overviewModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageOverview"]);
    overviewModeDiv.setAttribute("status", "off");
    let bookmarkSubPanel = pageViewHelperFunction.createSubPanel("bookmark", true);
    let bookmarkSubPanelContent = bookmarkSubPanel.querySelector(".subPanelContent");
    return { pageArrayID, panelContainer, pageContentContainer, fullPageModeDiv, overviewModeDiv, bookmarkSubPanel, bookmarkSubPanelContent };
}
export function buildPageControllerButtonArray(mainController) {
    // create subPanel
    let pageControllerSubPanel = pageViewHelperFunction.createSubPanel("pageController", true);
    let pageControllerSubPanelContent = pageControllerSubPanel.querySelector(".subPanelContent");
    let testValuePanel = document.createElement("div");
    testValuePanel.classList.add("testValuePanel");
    pageControllerSubPanelContent.appendChild(testValuePanel);
    let editorControllerTemplate = document.querySelector("#editControllerTemplate");
    var editorController = editorControllerTemplate.content.cloneNode(true);
    // attribute controller
    let attributePanel = editorController.querySelector(".attributePanel");
    InitializeAttributeControllerFunction.initializeMainControllerAttributeControllerMapping(mainController);
    Object.values(mainController.attributeControllerMapping).forEach(p => {
        attributePanel.appendChild(p);
    });
    let copyButton = editorController.querySelector(".copyButton");
    let linkButton = editorController.querySelector(".linkButton");
    let deleteButton = editorController.querySelector(".deleteButton");
    copyButton.addEventListener("click", function () {
        let selectedObject = mainController.pageCurrentStatus.selectedObject;
        let nameOfGNtype = selectedObject._type;
        let selectedObjectData = selectedObject.extract();
        selectedObjectData["data"]["cx"] += 100;
        let copiedObject = mainController.createGNObjectThroughName(nameOfGNtype, { name: "", arrayID: "", insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: false });
        copiedObject.loadFromData(selectedObjectData);
        selectedObject.parentNode.appendChild(copiedObject);
    });
    linkButton.addEventListener("click", function () {
        let selectedObject = mainController.pageCurrentStatus.selectedObject;
        let nameOfGNtype = selectedObject._type;
        let selectedObjectData = selectedObject.extract();
        selectedObjectData["data"]["cx"] += 100;
        //_name:string, arrayID: string, insertPosition?: number|boolean, dataPointer?: string|boolean, saveToDatabase?: boolean=true
        let parentContainerObjectID = selectedObject.parentNode.getAccessPointer();
        let linkedObject = mainController.createGNObjectThroughName(nameOfGNtype, { name: "", arrayID: parentContainerObjectID, insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: true });
        linkedObject.loadFromData(selectedObjectData);
        selectedObject.parentNode.appendChild(linkedObject);
    });
    deleteButton.addEventListener("click", function () {
        let selectedObject = document.querySelector(".selectedObject");
        selectedObject.deleteFromDatabase();
        // selectedObject?.remove()
    });
    let testFieldButton = document.createElement("button");
    testFieldButton.innerText = "testFieldButton";
    testFieldButton.addEventListener("click", function () {
        let testFieldDiv = document.querySelector(".testField");
        if (testFieldDiv.classList.contains("open")) {
            testFieldDiv.classList.remove("open");
        }
        else {
            testFieldDiv.classList.add("open");
        }
    });
    let showMainDocButton = document.createElement("button");
    showMainDocButton.innerText = "mainDoc";
    showMainDocButton.addEventListener("click", function () {
        console.log(153, mainController.mainDoc["array"][0]["array"], mainController);
    });
    let resetButton = document.createElement("button");
    resetButton.innerText = "resetButton";
    resetButton.addEventListener("click", function () {
        mainController.initalizeMainDoc();
    });
    let objectIDGetter = document.createElement("input");
    let objectIDGetterSubmit = document.createElement("input");
    objectIDGetterSubmit.type = "submit";
    objectIDGetter.style.border = "3px solid gold";
    objectIDGetterSubmit.style.background = "gold";
    objectIDGetterSubmit.addEventListener("click", (e) => {
        console.log(mainController.getObjectById(objectIDGetter.value), document.querySelector(`*[accessPointer='${objectIDGetter.value}']`));
        window.selectedItem = document.querySelector(`*[accessPointer='${objectIDGetter.value}']`);
    });
    editorController.append(objectIDGetter, objectIDGetterSubmit, testFieldButton, showMainDocButton, resetButton);
    // toolBoxObject
    let toolBoxHtmlObject = buildToolBoxHtmlObject(mainController);
    pageControllerSubPanelContent.append(toolBoxHtmlObject, editorController);
    return { pageControllerSubPanel, pageControllerSubPanelContent, testFieldButton, copyButton, linkButton, deleteButton, showMainDocButton, resetButton };
}
export function buildToolBoxHtmlObject(mainController) {
    let toolBoxHtmlObject = mainController.toolBox.createToolboxHtmlObject();
    let eraserItemButton = mainController.toolBox.createEraserItemButton(toolBoxHtmlObject);
    let polylineItemButton = mainController.toolBox.createNewPolyLineItemButton(toolBoxHtmlObject);
    let selectionToolItemButton = mainController.toolBox.createSelectionToolItemButton(toolBoxHtmlObject);
    let addCommentItemButton = mainController.toolBox.createAddCommentButton(toolBoxHtmlObject);
    let moveObjectInDivButton = mainController.toolBox.createMoveObjectInDivButton(toolBoxHtmlObject);
    toolBoxHtmlObject.append(eraserItemButton, polylineItemButton, selectionToolItemButton, addCommentItemButton, moveObjectInDivButton);
    return toolBoxHtmlObject;
}
export function buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer) {
    // page controller
    // To create a page Controller to navigate previous and nex page
    pageController.pageControllerHTMLObject(mainController.pageController, bookmarkSubPanelContent);
    let createNewDivButton = pageViewHelperFunction.functionButtonCreater("new Div", pageViewHelperFunction.createNewPageEvent(mainController.pageController, fullPageModeDiv, overviewModeDiv, pageContentContainer));
    createNewDivButton.classList.add("addNewPage");
    let deletePageButton = document.createElement("button");
    deletePageButton.innerHTML = "delete page";
    deletePageButton.addEventListener("click", function () {
        let currentPageNumber = mainController.pageController.currentPage.pageNumber;
        mainController.pageController.deletePage(currentPageNumber);
        mainController.pageController.currentPage.fullPageHTMLObject.deleteFromDatabase();
        mainController.pageController.goToPage(currentPageNumber - 1);
        mainController.pageController.updatePageNumber(mainController.pageController.currentPage);
    });
    let switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv);
    let saveButton = document.createElement("button");
    saveButton.innerHTML = "saveButton";
    saveButton.addEventListener("click", function () {
        let saveData = mainController.saveMainDoc(true);
        socket.emit("saveNotebookUsingClientData", saveData);
    });
    let layerControllerHTMLObject = LayerConroller.createLayerController(mainController);
    bookmarkSubPanelContent.append(createNewDivButton, deletePageButton, switchViewModeButton, layerControllerHTMLObject, saveButton);
}
export function buildInitialHTMLSkeleton(mainController) {
    let currentStatus = mainController.pageCurrentStatus;
    let { pageArrayID, panelContainer, pageContentContainer, fullPageModeDiv, overviewModeDiv, bookmarkSubPanel, bookmarkSubPanelContent } = getDivFromHTML(mainController);
    let { pageControllerSubPanel, pageControllerSubPanelContent, testFieldButton, copyButton, linkButton, deleteButton, showMainDocButton, resetButton } = buildPageControllerButtonArray(mainController);
    //===================== bookmarkSubPanel ==================//
    buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer);
    // commentSubPanel
    let commentSubPanel = pageViewHelperFunction.createSubPanel("comment", false);
    // add events: initalizeWindowObject, addPasteImageEvent, swipeDetection
    attachEvents(mainController, pageContentContainer);
    pageViewHelperFunction.shortNotice("inital Value");
    socket.emit("clientAskServerForSocketData");
    panelContainer.append(pageControllerSubPanel, bookmarkSubPanel, commentSubPanel);
    window.mainController = mainController;
} // buildInitialHTMLSkeleton
export function buildInitialPage(mainController, saveToDatabase = false) {
    mainController.GNDataStructureMapping = {
        GNInputField: GNInputField,
        GNContainerDiv: GNContainerDiv,
        GNImageContainer: GNImageContainer,
        // svg
        GNSvg: GreatNoteSvgDataClass.GNSvg,
        GNSvgCircle: GreatNoteSvgDataClass.GNSvgCircle,
        GNSvgPolyLine: GreatNoteSvgDataClass.GNSvgPolyLine,
        GNSvgRect: GreatNoteSvgDataClass.GNSvgRect,
        GNComment: GNCommentController.GNComment
    };
    let pageController = mainController.pageController;
    let pageFullArray = mainController.mainDoc["array"][0]["array"];
    let pageOverviewArray = mainController.mainDoc["array"][1]["array"];
    let fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    let overviewModeDiv = document.querySelector(".overviewModeDiv");
    for (let i = 0; i < pageFullArray.length; i++) {
        let [newPage, smallView] = pageViewHelperFunction.createNewPage(pageController, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase);
        mainController.renderDataToHTML(pageFullArray[i], newPage);
        pageViewHelperFunction.insertNewPage(pageController, newPage, smallView, fullPageModeDiv, overviewModeDiv);
    }
    if (pageFullArray.length > 0)
        mainController.layerController.renderCurrentPageLayer();
    TestHelper.testFunction(mainController);
    // let updateEvent = setInterval(() =>{
    //   console.log("send changes to server")
    //   mainController.sendChangeToServer()
    // }, 4000)
} // buildInitialPage
function jsonify(x) {
    if (Array.isArray(x)) {
        return x.map(p => jsonify(p));
    }
    else if (typeof x === 'object') {
        let newX = {};
        Object.entries(x).forEach(([key, value], _) => {
            newX[key] = jsonify(value);
        });
        return newX;
    }
    else {
        return x;
    }
}
export function attachEvents(mainController, pageContentContainer) {
    WindowController.initalizeWindowObject();
    // clipboard event
    ClipboardEvent.addPasteImageEvent(mainController);
    // to add swipe, panning events to the pageContentContainer
    SwipeEventController.swipeDetection(mainController, pageContentContainer);
}
