import { mainController } from "../index";
import * as GreatNoteDataClass from "./GreatNoteClass/GreatNoteDataClass";
import { highlightCurrentPageInOverviewMode } from "./pageControllerFolder/pageController";
// import {pageController, updatePageController, updatePageNumberInNewOrder, highlightCurrentPageInOverviewMode} from "./pageControllerFolder/pageController"
export function shortNotice(noticeText) {
    let shortNoticeDiv = document.createElement("div");
    shortNoticeDiv.textContent = noticeText;
    shortNoticeDiv.style.position = "fixed";
    shortNoticeDiv.style.width = "10%";
    shortNoticeDiv.style.left = "45%";
    shortNoticeDiv.style.top = "45%";
    shortNoticeDiv.style.background = "wheat";
    shortNoticeDiv.style.padding = "20px";
    shortNoticeDiv.style.zIndex = "10000";
    setTimeout(() => {
        shortNoticeDiv.remove();
    }, 1500);
    document.body.appendChild(shortNoticeDiv);
}
//@auto-fold here
export function createSubPanel(name, first) {
    var _a, _b;
    let subPanelTemplate = document.querySelector("#subPanelTemplate");
    let subPanel = document.importNode(subPanelTemplate.content, true);
    let subPanelNavbarTitle = subPanel.querySelector(`.subPanelTitle`);
    subPanelNavbarTitle.innerHTML = `${name}`;
    let subPanelContent = subPanel.querySelector(".subPanelContent");
    (_b = (_a = subPanelContent === null || subPanelContent === void 0 ? void 0 : subPanelContent.parentElement) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add(`${name}SubPanel`);
    if (first) {
        subPanelContent.setAttribute("status", "open");
    }
    else {
        subPanelContent.setAttribute("status", "close");
    }
    let subPanelSwitch = subPanel.querySelector(".subPanelSwitch");
    subPanelSwitch.addEventListener("click", function (event) {
        let newStatus = subPanelContent.getAttribute("status") == "open" ? "close" : "open";
        subPanelContent.setAttribute("status", newStatus);
    });
    return subPanel;
}
//@auto-fold here
export function createSubPanelItem(name) {
    // to create subpanel and fill with subPanelItem
    let subPanelItem = document.createElement("div");
    subPanelItem.classList.add("subPanelItem", `${name}SubPanelItem`);
    subPanelItem.innerText = name[0];
    subPanelItem.addEventListener("click", function () {
        let subPanelArrayParentNode = subPanelItem.parentNode;
        let subPanelArray = subPanelArrayParentNode.querySelectorAll(".subPanelItem");
        Array.from(subPanelArray).forEach(p => {
            p.setAttribute("status", "off");
        });
        subPanelItem.setAttribute("status", "on");
    });
    return subPanelItem;
}
//@auto-fold here
export function functionButtonCreater(name, buttonFunction) {
    let functionButton = document.createElement("div");
    functionButton.innerHTML = name;
    functionButton.classList.add("functionButton");
    functionButton.addEventListener("click", buttonFunction);
    return functionButton;
}
export function createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv) {
    let switchViewModeButton = document.createElement("button");
    switchViewModeButton.innerText = "pageMode";
    switchViewModeButton.setAttribute("mode", "pageMode");
    switchViewModeButton.addEventListener("click", function (e) {
        let mode = (switchViewModeButton.getAttribute("mode") == "overviewMode") ? "pageMode" : "overviewMode";
        switchViewModeButton.setAttribute("mode", mode);
        switchViewModeButton.innerText = mode;
        if (mode == "overviewMode") {
            fullPageModeDiv.setAttribute("status", "off");
            overviewModeDiv.setAttribute("status", "on");
            // pageViewHelperFunction.renderOverviewMode()
        }
        else {
            fullPageModeDiv.setAttribute("status", "on");
            overviewModeDiv.setAttribute("status", "off");
            // pageViewHelperFunction.renderFullPageMode()
        }
    });
    return switchViewModeButton;
}
export function createNewPage(pageController, fullPageModeDiv, overviewModeDiv, fullPageData, overviewPageData, saveToDatabase = true) {
    let newPage = GreatNoteDataClass.GNContainerDiv({
        name: "fullPage", arrayID: mainController.mainDocArray["mainArray_pageFull"], insertPosition: false,
        dataPointer: false,
        saveToDatabase: saveToDatabase,
        specialCreationMessage: "createNewFullPageObject",
        contentEditable: false,
        _classNameList: ["fullPage"]
    });
    newPage.classList.add("divPage", "fullPage");
    newPage._dataStructure = [];
    newPage._styleStructure = ["background", "width", "height"];
    // newPage.style.width = `${pageController.fullPageSize[0]}px`
    // newPage.style.height = `${pageController.fullPageSize[1]}px`
    let newPageAccesssPointer = saveToDatabase ? newPage.getAccessPointer() : false; // to avoid error when saveToDatabase is false and you cannot get the accessPointer of the new pagge
    let smallView = GreatNoteDataClass.GNContainerDiv({
        name: "overviewPage",
        arrayID: mainController.mainDocArray["mainArray_pageOverview"],
        insertPosition: false,
        dataPointer: newPageAccesssPointer,
        saveToDatabase: saveToDatabase,
        specialCreationMessage: "createNewOverviewPageObject",
        contentEditable: false,
        _classNameList: ["smallView"]
    });
    smallView.classList.add("divPageSmall");
    smallView._dataStructure = [];
    smallView._styleStructure = ["background", "width", "height"];
    smallView.style.background = "pink";
    smallView.style.width = `${pageController.overviewPageSize[0]}px`;
    smallView.style.height = `${pageController.overviewPageSize[1]}px`;
    // ==========================
    // add events to smallView
    // ==========================
    // smallViewDescription.innerText = `${pkmDatabase[dummyNumber].name}`
    // ==========================
    // add events to smallView
    // ==========================
    addEventToNewPage(pageController, newPage);
    clickEventOfSmallPage(pageController, smallView);
    // if saveToDatabase is false, then you do not need to save it
    if (saveToDatabase) {
        newPage.saveHTMLObjectToDatabase();
        smallView.saveHTMLObjectToDatabase();
    }
    if (fullPageData && overviewPageData) {
        fillInNewPageDataContent(newPage, fullPageData);
        fillInSmallViewDataContent(smallView, overviewPageData);
    }
    return [newPage, smallView];
}
export function fillInNewPageDataContent(newPage, fullPageData) {
    newPage.initializeHTMLObjectFromData(fullPageData);
}
export function fillInSmallViewDataContent(smallView, overviewPageData) {
    smallView.initializeHTMLObjectFromData(overviewPageData);
    // smallViewDescription.innerText = overviewPageData.data.innerText
}
export function addEventToNewPage(pageController, newPage) {
    newPage.addEventListener("click", function (e) {
        if (newPage.contains(e.target)) {
            if (pageController.selectedObject)
                pageController.selectedObject.classList.remove("selectedObject");
            pageController.selectedObject = e.target;
            e.target.classList.add("selectedObject");
        }
    });
}
export function insertNewPage(pageController, newFullPage, newSmallView, fullPageModeDiv, overviewModeDiv) {
    pageController.addPage(newFullPage, newSmallView);
    // ==========================
    // appending new pages to the fullPageModeDiv and overviewModeDiv
    //==========================
    // newFullPage.setAttribute("pageNumber", newPageNumber)
    fullPageModeDiv.appendChild(newFullPage);
    // newSmallView.setAttribute("pageNumber", newPageNumber)
    overviewModeDiv.appendChild(newSmallView);
    // highlight and update the pageNumberInput
    let pageNumberInput = document.querySelector(".pageNumberInput");
    pageNumberInput.value = pageController.currentPage.pageNumber;
    // highlightCurrentPageInOverviewMode(newSmallView, pageController)
}
//@auto-fold here
export function createNewPageEvent(currentStatus, fullPageModeDiv, overviewModeDiv, pageDummyContent, htmlObject) {
    // when click the new page button, a new page is created.
    // add new page fullPageMode
    let clickEventAction = function () {
        let [newPage, smallView] = createNewPage(currentStatus, fullPageModeDiv, overviewModeDiv);
        insertNewPage(currentStatus, newPage, smallView, fullPageModeDiv, overviewModeDiv);
        let addDivLayereButton = document.querySelector(".addDivLayerButton");
        let addSvgLayerButton = document.querySelector(".addSvgLayerButton");
        addDivLayereButton.click();
        addSvgLayerButton.click();
    };
    return clickEventAction;
}
function clickEventOfSmallPage(currentStatus, smallPage) {
    // click
    smallPage.addEventListener("click", function () {
        let clickedPageNumber = parseInt(smallPage.getAttribute("pageNumber"));
        // the next page is the clicked page + 1
        currentStatus.newPageNumber = clickedPageNumber + 1;
        highlightCurrentPageInOverviewMode(smallPage, clickedPageNumber, currentStatus);
        for (let i = 1; i < currentStatus.pageArrayFullPage.length; i++) {
            if (i < clickedPageNumber) {
                // pages before the clicked page
                // currentStatus.pageArrayFullPage[i].style.left = "-200%"
            }
            else if (i == clickedPageNumber) {
                // currentStatus.pageArrayFullPage[i].style.left = "0"
            }
            else {
                // currentStatus.pageArrayFullPage[i].style.left = "+200vw"
            }
        }
    });
}
// extract and create data object do not directly save object to the database.
// What is saved to the database is controlled by the saveHTMLOBjectTODatabase function in the mainController file
