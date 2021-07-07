import { getPageDataFromServer } from "../buildInitialPageHelperFunctions";
import { addFunctionToSmallViewHTMLObject } from "../pageControllerFolder/smallViewHelperFunction";
import * as Setting from "../settings";
import * as RectangleSelectionToolFunction from "../ToolboxFolder/rectangleSelectionFunction";
class PageObject {
    constructor() {
        this.pageNumber = -1;
        this.previous = null;
        this.next = null;
        this.fullPageHTMLObject = null;
        this.smallViewHTMLObject = null;
        this.pageRelatedData = {
            sectionArray: [],
            annotationArray: []
        };
    }
    createAnnotationDummyObject() {
        return {
            comment: [], group: [], question: [], solution: [], section: [], equation: []
        };
    }
    getCategorizedAnnotationArray() {
        let annotationDummyObject = this.createAnnotationDummyObject();
        this.pageRelatedData.annotationArray.forEach((p) => {
            var _a;
            (_a = annotationDummyObject[p.annotationType]) === null || _a === void 0 ? void 0 : _a.push(p);
        });
        return annotationDummyObject;
    }
}
export function initializePageController(mainController) {
    let startPage = {
        previous: null,
        next: null,
        pageNumber: 0,
        name: "startPage"
    };
    let endPage = { previous: startPage, next: null, pageNumber: 1, name: "endPage" };
    startPage.next = endPage;
    let pageController = {
        startPage: startPage,
        endPage: endPage,
        currentPage: startPage,
        EventReceiver: document.createElement("span"),
        totalPageNumber: 0,
        fullPageSize: Setting.pageSizeInfo.fullPageSize,
        overviewPageSize: Setting.pageSizeInfo.overviewPageSize,
        selectedObject: null
    };
    pageController.updatePageNumber = function (initialPage = pageController.startPage) {
        let _currentPageNumber = initialPage.pageNumber;
        let _currentPage = initialPage;
        while (_currentPage) {
            console.log(108109, _currentPage);
            _currentPage.pageNumber = _currentPageNumber;
            _currentPageNumber += 1;
            _currentPage = _currentPage.next;
        }
    };
    pageController.updateCurrentPage = function (previousCurrentPageHTMLObject, newCurrentPageHTMLObject) {
        previousCurrentPageHTMLObject === null || previousCurrentPageHTMLObject === void 0 ? void 0 : previousCurrentPageHTMLObject.classList.remove("currentPage");
        newCurrentPageHTMLObject.classList.add("currentPage");
    };
    pageController.getAnnotationFromAccessPointer = function (pageAccessPointer, annotationAccessPointer) {
        let pageObject = pageController.getPageObjectFromAccessPointer(pageAccessPointer);
        let annotationObject = pageObject.annotationArray.filter(p => p.accessPointer == annotationAccessPointer);
        return annotationObject;
    };
    pageController.movePage = function (fullPageHtmlObject, pageNumber, relativePosition = "after") {
        // connect the new bonding
        console.log(130130, fullPageHtmlObject.soul);
        let alpha = pageController.getPage(pageNumber);
        // remove the original bonding
        let oldPreviousPage = fullPageHtmlObject.soul.previous;
        let oldNextPage = fullPageHtmlObject.soul.next;
        console.log(137137, oldPreviousPage, oldNextPage);
        oldPreviousPage.next = oldNextPage;
        oldNextPage.previous = oldPreviousPage;
        let beta = alpha.next;
        alpha.next = fullPageHtmlObject.soul;
        beta.previous = fullPageHtmlObject.soul;
        fullPageHtmlObject.previous = alpha;
        fullPageHtmlObject.next = beta;
        fullPageHtmlObject.parentElement.insertBefore(fullPageHtmlObject, alpha.fullPageHTMLObject);
        fullPageHtmlObject.parentElement.insertBefore(alpha.fullPageHTMLObject, fullPageHtmlObject);
        pageController.updatePageNumber(pageController.startPage);
    };
    pageController.addPage = function (fullPageHTMLObject) {
        var _a;
        let alpha = pageController.currentPage;
        let newPage = new PageObject();
        fullPageHTMLObject.soul = newPage;
        let beta = pageController.currentPage.next;
        newPage.previous = alpha;
        newPage.next = beta;
        alpha.next = newPage;
        beta.previous = newPage;
        pageController.currentPage = newPage;
        newPage.fullPageHTMLObject = fullPageHTMLObject;
        // newPage.smallViewHTMLObject = smallViewHTMLObject
        newPage.fullPageHTMLObject.style.display = "block";
        pageController.updateCurrentPage(alpha.fullPageHTMLObject, newPage.fullPageHTMLObject);
        if (alpha.fullPageHTMLObject) {
            alpha.fullPageHTMLObject.style.display = "none";
        }
        pageController.updatePageNumber(alpha);
        pageController.totalPageNumber += 1;
        fullPageHTMLObject.style.width = pageController.fullPageSize[0] + "px";
        fullPageHTMLObject.style.height = pageController.fullPageSize[1] + "px";
        //
        let overviewModeDiv = document.querySelector(".overviewModeDiv");
        let smallViewDivWrapper = document.createElement("div");
        let smallViewHTMLObject = document.createElement("div");
        smallViewHTMLObject.classList.add("smallView");
        overviewModeDiv.append(smallViewHTMLObject);
        //
        smallViewHTMLObject.style.width = pageController.overviewPageSize[0] + "px";
        smallViewHTMLObject.style.height = pageController.overviewPageSize[1] + "px";
        smallViewHTMLObject.fullPageHTMLObject = fullPageHTMLObject;
        fullPageHTMLObject.smallViewHTMLObject = smallViewHTMLObject;
        smallViewHTMLObject.setAttribute("smallViewAccessPoiniter", fullPageHTMLObject.getAccessPointer());
        smallViewHTMLObject.classList.add(fullPageHTMLObject.getAccessPointer());
        let smallViewContent = document.createElement("div");
        smallViewContent.classList.add("smallViewContent");
        smallViewContent.innerText = pageController.currentPage.pageNumber;
        smallViewHTMLObject.append(smallViewContent);
        addFunctionToSmallViewHTMLObject(pageController, smallViewHTMLObject, smallViewContent);
        let smallViewData = (_a = fullPageHTMLObject.objectData) === null || _a === void 0 ? void 0 : _a.data.smallViewData;
        if (smallViewData)
            smallViewHTMLObject.loadFromData(smallViewData);
        let overlay = document.createElement("div");
        overlay.classList.add("pageOverlay");
        overlay.style.position = "fixed";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        // overlay.style.opacity = "0.1"
        fullPageHTMLObject.append(overlay);
        overlay.addEventListener("mousedown", (e) => {
            RectangleSelectionToolFunction.overallMouseDownFunction(e, mainController, overlay, "mousemove", "mouseup");
        });
        // render current Page
        let showCurrentPageButton = document.querySelector(".showCurrentPageButton");
        showCurrentPageButton.click();
    };
    pageController.getPageObjectFromAccessPointer = function (accessPointer) {
        let _currentPage = pageController.startPage.next;
        while (_currentPage) {
            if (_currentPage.fullPageHTMLObject.getAttribute("accessPointer") == accessPointer)
                break;
            _currentPage = _currentPage.next;
        }
        return _currentPage;
    };
    pageController.getPage = function (pageNumber) {
        if (pageNumber == -999) {
            let lastPage = pageController.endPage.previous;
            return lastPage;
        }
        let _currentPage = pageController.startPage;
        while (_currentPage) {
            if (_currentPage.pageNumber == pageNumber)
                break;
            _currentPage = _currentPage.next;
        }
        return _currentPage;
    };
    pageController.deletePage = function (targetPageNumber) {
        let targetPage = pageController.getPage(targetPageNumber);
        let alpha = targetPage.previous;
        let beta = targetPage.next;
        pageController.totalPageNumber -= 1;
        alpha.next = beta;
        beta.previous = alpha;
    };
    pageController.goToPage = function (pageNumber, pageNumberInput) {
        if (pageNumber == pageController.currentPage.pageNumber)
            return;
        let _targetPage = pageController.getPage(pageNumber);
        if (_targetPage.name == "startPage" || _targetPage.name == "endPage") {
            console.log("You are hitting the start page or the end page.");
            return;
        }
        _targetPage.fullPageHTMLObject.style.display = "block";
        // set the position of the page according to the position relative to the targetPage
        pageController.currentPage.fullPageHTMLObject.classList.remove("currentPage");
        pageController.currentPage.fullPageHTMLObject.style.display = "none";
        // turn targetPage to current Page
        pageController.currentPage = _targetPage;
        pageController.currentPage.fullPageHTMLObject.classList.add("currentPage");
        pageController.pagNumberInput.value = `${pageNumber}`;
        mainController.layerController.renderCurrentPageLayer();
        function loadPageData(pageObject) {
            if (!pageObject || !(pageObject === null || pageObject === void 0 ? void 0 : pageObject.previous) || !(pageObject === null || pageObject === void 0 ? void 0 : pageObject.next))
                return;
            let loaded = pageObject.fullPageHTMLObject.getAttribute("loaded");
            if (loaded != "true") {
                let pageID = pageObject.fullPageHTMLObject.getAccessPointer();
                getPageDataFromServer(mainController, pageID);
                pageObject.fullPageHTMLObject.setAttribute("loaded", "true");
            }
        }
        let notebookID = mainController.notebookID;
        let range = 2;
        let currentPage_in_back_direction = pageController.currentPage;
        for (let i = 0; i < range; i++) {
            loadPageData(currentPage_in_back_direction);
            currentPage_in_back_direction = currentPage_in_back_direction === null || currentPage_in_back_direction === void 0 ? void 0 : currentPage_in_back_direction.previous;
        }
        let currentPage_in_forward_direction = pageController.currentPage.next;
        for (let i = 0; i < range; i++) {
            loadPageData(currentPage_in_forward_direction);
            currentPage_in_forward_direction = currentPage_in_forward_direction === null || currentPage_in_forward_direction === void 0 ? void 0 : currentPage_in_forward_direction.next;
        }
    }; // go To Page
    pageController.printAllPage = function () {
        let array = [];
        let _currentPage = pageController.startPage;
        while (_currentPage) {
            array.push(_currentPage);
            _currentPage = _currentPage.next;
        }
    }; // printAllPage
    pageController.transvereList = function (action) {
        let _currentPage = pageController.startPage;
        while (_currentPage) {
            action(_currentPage);
            _currentPage = _currentPage.next;
        }
    }; // transvereList
    pageController.EventReceiver.addEventListener("goToPageEvent", (e) => {
        pageController.goToPage(e["detail"].pageNumber);
    });
    pageController.getPageNumberFromPageID = function (accessPoiniter) {
        var _a;
        let pageNumber = 0;
        let _currentPage = pageController.startPage;
        while (_currentPage) {
            if (((_a = _currentPage.fullPageHTMLObject) === null || _a === void 0 ? void 0 : _a.getAccessPointer()) == accessPoiniter) {
                pageNumber = _currentPage.pageNumber;
                break;
            }
            _currentPage = _currentPage.next;
        }
        return pageNumber;
    };
    pageController.savePageChangeToDatabase = function (newPageOrderArray) {
        mainController.savePageChangeToDatabase(newPageOrderArray);
    };
    window.pageController = pageController;
    return pageController;
}
//@auto-fold here
export function pageControllerHTMLObject(pageController, subPanelContainer) {
    let pageNavigator = document.createElement("div");
    pageNavigator.classList.add("pageController");
    pageNavigator.soul = pageController;
    let pageNumberInput = document.createElement("input");
    pageNumberInput.classList.add("pageNumberInput");
    pageController.pagNumberInput = pageNumberInput;
    pageNumberInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            let goToPageEvent = new CustomEvent("goToPageEvent", { 'detail': { pageNumber: parseInt(pageNumberInput.value) } });
            pageController.EventReceiver.dispatchEvent(goToPageEvent);
        }
    });
    let leftButton = document.createElement("button");
    leftButton.classList.add("leftButton");
    let rightButton = document.createElement("button");
    rightButton.classList.add("rightButton");
    leftButton.innerHTML = "L";
    pageNumberInput.value = "1";
    pageNumberInput.style.margin = "0 auto";
    rightButton.innerHTML = "R";
    pageNavigator.append(leftButton, pageNumberInput, rightButton);
    subPanelContainer.append(pageNavigator);
    //@auto-fold here
    function leftButtonClickEvent() {
        if (pageController.currentPage.pageNumber > 1) {
            removeCurrrentPageChildren(pageController.currentPage.fullPageHTMLObject);
            pageController.goToPage(+pageNumberInput.value - 1, pageNumberInput);
        }
    }
    function removeCurrrentPageChildren(fullPageHTMLObject) {
        let children = Array.from(fullPageHTMLObject.children);
        // children.forEach(child=>{
        //       child.remove()
        // })
    }
    leftButton.addEventListener("click", leftButtonClickEvent);
    leftButton.addEventListener("touchstart", leftButtonClickEvent);
    // turn to next page
    //@auto-fold here
    function rightButtonClickEvent() {
        removeCurrrentPageChildren(pageController.currentPage.fullPageHTMLObject);
        if (pageController.currentPage.pageNumber < pageController.totalPageNumber) {
            pageController.goToPage(+pageNumberInput.value + 1, pageNumberInput);
        }
        else {
            console.log(4100, "Over size");
        }
    }
    rightButton.addEventListener("click", rightButtonClickEvent);
} // right Button
export function highlightCurrentPageInOverviewMode(smallPageView, currentPageNumber, currentStatus) {
    // for (let i = 1; i < currentStatus.pageArraySmallView.length; i++){
    //     currentStatus.pageArraySmallView[i].style.border = "0px"
    // }
    // let currentPageHtml = currentStatus.pageArraySmallView[currentPageNumber]
    //  // smallPageView.parentNode.querySelector(`.divPageSmall[pageNumber='${currentPageNumber}']`)
    // currentPageHtml.style.border = "3px red solid"
}
