import { getPageDataFromServer } from "../buildInitialPageHelperFunctions";
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
        fullPageSize: [1187, 720],
        overviewPageSize: [237.4, 144],
        selectedObject: null
    };
    pageController.updatePageNumber = function (initialPage = pageController.startPage) {
        let _currentPageNumber = initialPage.pageNumber;
        let _currentPage = initialPage;
        while (_currentPage) {
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
    pageController.addPage = function (fullPageHTMLObject) {
        let newPage = new PageObject();
        fullPageHTMLObject.soul = newPage;
        let alpha = pageController.currentPage;
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
        _targetPage.fullPageHTMLObject.style.display = "block";
        // set the position of the page according to the position relative to the targetPage
        pageController.currentPage.fullPageHTMLObject.classList.remove("currentPage");
        pageController.currentPage.fullPageHTMLObject.style.display = "none";
        // turn targetPage to current Page
        pageController.currentPage = _targetPage;
        pageController.currentPage.fullPageHTMLObject.classList.add("currentPage");
        pageController.pagNumberInput.value = "" + pageNumber;
        mainController.layerController.renderCurrentPageLayer();
        if (pageController.currentPage.fullPageHTMLObject.getAttribute("visited") == "false") {
            let notebookID = mainController.notebookID;
            let pageID = pageController.currentPage.fullPageHTMLObject.getAccessPointer();
            getPageDataFromServer(mainController, notebookID, pageID);
            pageController.currentPage.fullPageHTMLObject.setAttribute("visited", "true");
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
    let leftButton = document.createElement("div");
    let rightButton = document.createElement("div");
    leftButton.innerHTML = "L";
    pageNumberInput.value = "1";
    pageNumberInput.style.margin = "0 auto";
    rightButton.innerHTML = "R";
    pageNavigator.append(leftButton, pageNumberInput, rightButton);
    subPanelContainer.append(pageNavigator);
    //@auto-fold here
    function leftButtonClickEvent() {
        if (pageController.currentPage.pageNumber > 1) {
            pageController.goToPage(+pageNumberInput.value - 1, pageNumberInput);
        }
    }
    leftButton.addEventListener("click", leftButtonClickEvent);
    leftButton.addEventListener("touchstart", leftButtonClickEvent);
    // turn to next page
    //@auto-fold here
    function rightButtonClickEvent() {
        if (pageController.currentPage.pageNumber < pageController.totalPageNumber) {
            pageController.goToPage(+pageNumberInput.value + 1, pageNumberInput);
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
