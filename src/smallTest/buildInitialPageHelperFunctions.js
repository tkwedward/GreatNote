import * as ClipboardEvent from "./clipboardEvents";
// GMPnkects
import { GNContainerDiv } from "./GreatNoteClass/GreatNoteDataClass";
import { GNImageContainer } from "./GreatNoteClass/GNImageContainer";
import { GNInputField } from "./GreatNoteClass/GNInputField";
import { GNTextContainer } from "./GreatNoteClass/GNTextContainer";
import { GNBookmark } from "./bookmarkFolder/GNBookmark";
import { GNPage } from "./GreatNoteClass/GNPage";
import * as GreatNoteSvgDataClass from "./GreatNoteClass/GreatNoteSvgDataClass";
import * as GroupController from "./groupControllerFolder/groupController";
import { getAllPageAnnotation, buildAnnotationPage } from "./pageControllerFolder/annotationHelperFunctions";
import { socket } from "./socketFunction";
import * as GNCommentController from "./commentFolder/commentController";
import * as LayerConroller from "./layerControllerFolder/layerController";
import * as PageController from "./pageControllerFolder/pageController";
import * as pageViewHelperFunction from "./pageViewHelperFunction";
import * as InitializeAttributeControllerFunction from "./attributeControllerFolder/initializeAttributeControllers";
import * as CollectionController from "./collectionControllerFolder/collectionController";
import * as SwipeEventController from "./EventFolder/swipeEvent";
import * as SmallViewHelperFunction from "./pageControllerFolder/smallViewHelperFunction";
import * as UserControllerHelperFunction from "./UserFolder/UserController";
// import * as WindowController from "./EventFolder/specialWindowObject"
let openStatus = true;
export function createGNDataStructureMapping(mainController) {
    mainController.GNDataStructureMapping = {
        GNInputField: GNInputField,
        GNContainerDiv: GNContainerDiv,
        GNImageContainer: GNImageContainer,
        GNBookmark: GNBookmark,
        GNPage: GNPage,
        GNTextContainer: GNTextContainer,
        // svg
        GNSvg: GreatNoteSvgDataClass.GNSvg,
        GNSvgCircle: GreatNoteSvgDataClass.GNSvgCircle,
        GNSvgPolyLine: GreatNoteSvgDataClass.GNSvgPolyLine,
        GNSvgRect: GreatNoteSvgDataClass.GNSvgRect,
        GNComment: GNCommentController.GNComment
    };
}
export function getImportantDivFromHTML(mainController) {
    let pageArrayID = mainController.mainDocArray["mainArray_page"];
    // global htmlObjects
    let panelContainer = document.querySelector(".panelContainer");
    let pageContentContainer = document.querySelector(".pageContentContainer");
    panelContainer.style.zIndex = "100";
    let fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    fullPageModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageFull"]);
    let overviewModeDiv = document.querySelector(".overviewModeDiv");
    overviewModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageOverview"]);
    let overviewModeDivWrapper = document.querySelector(".overviewModeDivWrapper");
    overviewModeDivWrapper.setAttribute("status", "off");
    console.log(overviewModeDivWrapper);
    let [bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent] = pageViewHelperFunction.createSubPanel("bookmark");
    return { pageArrayID, panelContainer, pageContentContainer, fullPageModeDiv, overviewModeDiv, bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent };
}
export function buildPageControllerButtonArray(mainController) {
    // create subPanel
    let [pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent] = pageViewHelperFunction.createSubPanel("pageController");
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
    let showAnnotationButton = document.createElement("button");
    showAnnotationButton.classList.add("showAnnotationButton");
    showAnnotationButton.innerText = "showAnnotation";
    showAnnotationButton.addEventListener("click", function () {
        let annotationPage = document.querySelector(".annotationPage");
        console.log(annotationPage.style.display);
        if (annotationPage.style.display == "block") {
            annotationPage.style.display = "none";
            return;
        }
        // if the display is none or other
        annotationPage.style.display = "block";
        let annotationPageContentWrapper = annotationPage.querySelector(".annotationPageContentWrapper");
        let currentPage = mainController.pageController.startPage.next;
        let allPageAnnotationArray = [];
        while (currentPage) {
            if (!currentPage.getCategorizedAnnotationArray)
                break;
            let currentPageAnnotationData = getAllPageAnnotation(currentPage);
            if (currentPageAnnotationData) {
                allPageAnnotationArray.push(currentPageAnnotationData);
            }
            currentPage = currentPage.next;
        }
        // console.log(177177, allPageAnnotationArray, annotationPageContentWrapper)
        //
        // if (annotationPageContentWrapper.innerHTML==""){
        //     renderAnnotationPage(allPageAnnotationArray, annotationPageContentWrapper)
        // }
    });
    // ============ scale Controller ===========//
    function scaleChange(scale) {
        let currentPage = mainController.pageController.startPage.next;
        while (currentPage) {
            if (!currentPage.fullPageHTMLObject)
                break;
            currentPage.fullPageHTMLObject.style.transform = `scale(${scale})`;
            currentPage = currentPage.next;
        }
    }
    let scaleController = document.createElement("div");
    let scaleInput = document.createElement("input");
    scaleInput.value = "1";
    scaleInput.style.width = "50px";
    let scaleIncreaseButton = document.createElement("button");
    scaleIncreaseButton.innerText = "+";
    scaleIncreaseButton.classList.add("scaleIncreaseButton");
    scaleIncreaseButton.addEventListener("click", function (e) {
        let newScale = +scaleInput.value + 0.1;
        scaleInput.value = newScale.toFixed(2);
        scaleChange(newScale);
    });
    let scaleDecreaseButton = document.createElement("button");
    scaleDecreaseButton.innerText = "-";
    scaleDecreaseButton.classList.add("scaleDecreaseButton");
    scaleDecreaseButton.addEventListener("click", function (e) {
        let newScale = +scaleInput.value - 0.1;
        scaleInput.value = newScale.toFixed(2);
        scaleChange(newScale);
    });
    scaleController.append(scaleIncreaseButton, scaleInput, scaleDecreaseButton);
    // ===================  ==================//
    let objectIDGetter = document.createElement("input");
    let objectIDGetterSubmit = document.createElement("input");
    objectIDGetterSubmit.type = "submit";
    objectIDGetter.style.border = "3px solid gold";
    objectIDGetterSubmit.style.background = "gold";
    objectIDGetterSubmit.addEventListener("click", (e) => {
        // console.log(mainController.getObjectById(objectIDGetter.value), document.querySelector(`*[accessPointer='${objectIDGetter.value}']`));
        window.selectedItem = document.querySelector(`*[accessPointer='${objectIDGetter.value}']`);
    });
    let minimizedBarButton = document.createElement("button");
    minimizedBarButton.innerText = "minimize";
    minimizedBarButton.addEventListener("click", e => {
        let pageWrapper = document.querySelector(".pageWrapper");
        pageWrapper.classList.toggle("minimizedBar");
    });
    editorController.append(objectIDGetter, objectIDGetterSubmit, testFieldButton, showMainDocButton, showAnnotationButton);
    // toolBoxObject
    let toolBoxHtmlObject = buildToolBoxHtmlObject(mainController);
    pageControllerSubPanelContent.append(toolBoxHtmlObject, minimizedBarButton, editorController, scaleController);
    let annotationPage = document.querySelector(".annotationPage");
    return { pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent, testFieldButton, showMainDocButton, showAnnotationButton, annotationPage, scaleController };
} // buildPageControllerButtonArray
export function buildToolBoxHtmlObject(mainController) {
    let toolBoxHtmlObject = mainController.toolBox.createToolboxHtmlObject();
    let eraserItemButton = mainController.toolBox.createEraserItemButton(toolBoxHtmlObject);
    let polylineItemButton = mainController.toolBox.createNewPolyLineItemButton(toolBoxHtmlObject);
    let selectionToolItemButton = mainController.toolBox.createSelectionToolItemButton(toolBoxHtmlObject);
    let mouseRectangleSelectionToolItemButton = mainController.toolBox.createMouseRectangleSelectionToolItemButton(toolBoxHtmlObject);
    let addCommentItemButton = mainController.toolBox.createAddCommentButton(toolBoxHtmlObject);
    let moveObjectInDivButton = mainController.toolBox.createMoveObjectInDivButton(toolBoxHtmlObject);
    let addBookmarkButton = mainController.toolBox.createAddBookmarkButton(toolBoxHtmlObject);
    let textToolButton = mainController.toolBox.createTextToolItemButton(toolBoxHtmlObject);
    let bothLayerSelectionToolItemButton = mainController.toolBox.createBothLayerSelectionToolItemButton(toolBoxHtmlObject);
    toolBoxHtmlObject.append(eraserItemButton, polylineItemButton, selectionToolItemButton, mouseRectangleSelectionToolItemButton, addCommentItemButton, moveObjectInDivButton, addBookmarkButton, textToolButton, bothLayerSelectionToolItemButton);
    return toolBoxHtmlObject;
}
export function buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer) {
    // page controller
    // To create a page Controller to navigate previous and nex page
    PageController.pageControllerHTMLObject(mainController.pageController, bookmarkSubPanelContent);
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
    //
    // let saveButton = document.createElement("button")
    // saveButton.innerHTML = "saveButton"
    // saveButton.addEventListener("click", function(){
    //     let saveData = mainController.saveMainDoc(true)
    //     socket.emit("saveNotebookUsingClientData", saveData)
    //
    // })
    let layerControllerHTMLObject = LayerConroller.createLayerController(mainController);
    bookmarkSubPanelContent.append(createNewDivButton, deletePageButton, switchViewModeButton, layerControllerHTMLObject);
}
export function buildInitialHTMLSkeleton(mainController) {
    let currentStatus = mainController.pageCurrentStatus;
    let annotationPage = buildAnnotationPage(mainController);
    let [topSubPanel, topSubPanelTabBar, topSubPanelTabContent] = pageViewHelperFunction.subPanelTab("topSubPanel");
    // usr controller
    let [userControllerSubPanelNavbarTitle, userpageControllerSubPanelContent, userViewer] = UserControllerHelperFunction.buildUserController(mainController);
    topSubPanel.addTabAndTabContent(userControllerSubPanelNavbarTitle, userpageControllerSubPanelContent, false);
    // pageController
    let { pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent, testFieldButton, showMainDocButton, showAnnotationButton } = buildPageControllerButtonArray(mainController);
    topSubPanel.addTabAndTabContent(pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent);
    let [middleSubPanel, middleSubPanelTabBar, middleSubPanelTabContent] = pageViewHelperFunction.subPanelTab("middleSubPanel");
    let { pageArrayID, panelContainer, pageContentContainer, fullPageModeDiv, overviewModeDiv, bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent } = getImportantDivFromHTML(mainController);
    let [groupControllerNavbarTitle, groupControllerContent] = GroupController.GroupController(mainController);
    let [collectionControllerNavbarTitle, collectionControllerContent] = CollectionController.CollectionController(mainController);
    middleSubPanel.addTabAndTabContent(collectionControllerNavbarTitle, collectionControllerContent, false);
    middleSubPanel.addTabAndTabContent(groupControllerNavbarTitle, groupControllerContent, false);
    middleSubPanel.addTabAndTabContent(bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent);
    //===================== bookmarkSubPanel ==================//
    buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer);
    let [bottomSubPanel, bottomSubPanelTabBar, bottomSubPanelTabContent] = pageViewHelperFunction.subPanelTab("bottomSubPanel");
    // commentSubPanel
    let [commentSubPanelNavbarTitle, commentSubPanelContent] = pageViewHelperFunction.createSubPanel("comment", true);
    commentSubPanelContent.setAttribute("accessPointer", mainController.mainDocArray["mainArray_bookmark"]);
    bottomSubPanel.addTabAndTabContent(commentSubPanelNavbarTitle, commentSubPanelContent);
    //
    // let commentSidebar = CommentSidebarController.GNCommentSidebar()
    // commentSubPanelContent.append(commentSidebar)
    // add events: initalizeWindowObject, addPasteImageEvent, swipeDetection
    attachEvents(mainController, pageContentContainer);
    panelContainer.append(topSubPanel, middleSubPanel, bottomSubPanel);
    pageViewHelperFunction.shortNotice("inital Value");
    socket.emit("clientAskServerForSocketData");
    window.mainController = mainController;
} // buildInitialHTMLSkeleton
export function buildInitialPage(mainController, saveToDatabase = false) {
    let fullPageModeDiv = document.querySelector(".fullPageModeDiv");
    let overviewModeDiv = document.querySelector(".overviewModeDiv");
    let commentSubPanelContent = document.querySelector(".commentSubPanel");
    let groupControllerWrapper = document.querySelector(".groupControllerWrapper");
    let collectionControllerWrapper = document.querySelector(".collectionControllerWrapper");
    createGNDataStructureMapping(mainController);
    let pageController = mainController.pageController;
    let pageFullArray = [];
    let pageOverviewArray = [];
    let bookmarkArray = [];
    let collectionArray = [];
    let arrayObject = {};
    mainController.mainDoc["array"].forEach((p) => {
        if (p.GNType == "mainArray_pageFull") {
            pageFullArray = p.array;
        }
        if (p.GNType == "mainArray_pageOverview") {
            pageOverviewArray = p.array;
        }
        if (p.GNType == "mainArray_bookmark") {
            bookmarkArray = p.array;
        }
        if (p.GNType == "mainArray_panel") {
            collectionArray = p.array;
        }
    });
    let pageNotRendered = [];
    let targetPageIndex = pageFullArray.length - 1;
    let preloadRange = 1;
    for (let i = 0; i < pageFullArray.length; i++) {
        let newPage = pageViewHelperFunction.createNewPage(pageController, fullPageModeDiv, pageFullArray[i], saveToDatabase);
        pageViewHelperFunction.insertNewPage(pageController, newPage, fullPageModeDiv);
        mainController.renderDataToHTML(pageFullArray[i], newPage);
        newPage.setAttribute("latestUpdateTime", `${new Date()}`);
        let pageID = pageFullArray[i]._identity.accessPointer;
        // getPageDataFromServer(mainController, pageID)
        if (i >= targetPageIndex - preloadRange && i <= targetPageIndex + preloadRange) {
            if (i == targetPageIndex)
                newPage.classList.add("currentPage");
            newPage.setAttribute("loaded", "true");
            getPageDataFromServer(mainController, pageID);
        }
        else {
            pageNotRendered.push(pageID);
        }
        // if (i==0){
    }
    // let loadPages = setInterval(()=>{
    //
    //     if (pageNotRendered.length > 0){
    //
    //       let pageID = <string >pageNotRendered.pop()
    //       let targetPage = <HTMLDivElement> document.querySelector(`*[accessPointer=${pageID}]`)
    //
    //       if (targetPage.getAttribute("loaded")!="true") {
    //         targetPage.setAttribute("loaded", "true")
    //         getPageDataFromServer(mainController, pageID)
    //       }
    //     }
    // }, 10000)
    // pageNotRendered.forEach(p=>getPageDataFromServer(mainController, p))
    let annotationButton = document.querySelector(".showAnnotationButton");
    let switchViewModeButton = document.querySelector(".switchViewModeButton");
    SmallViewHelperFunction.createSmallViewPageController(mainController);
} // buildInitialPage
export function getPageDataFromServer(mainController, pageID) {
    let notebookID = mainController.notebookID;
    socket.emit("getPageData", { notebookID, pageID });
}
export function attachEvents(mainController, pageContentContainer) {
    // WindowController.initalizeWindowObject()
    // clipboard event
    ClipboardEvent.addPasteImageEvent(mainController);
    // to add swipe, panning events to the pageContentContainer
    SwipeEventController.swipeDetection(mainController, pageContentContainer);
}
