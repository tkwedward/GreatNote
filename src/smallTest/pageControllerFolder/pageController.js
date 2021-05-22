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
        "startPage": startPage,
        "endPage": endPage,
        "currentPage": startPage,
        "EventReceiver": document.createElement("span"),
        "totalPageNumber": 0,
        "fullPageSize": [1187, 720],
        "overviewPageSize": [237.4, 144],
        "selectedObject": null
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
    pageController.addPage = function (fullPageHTMLObject) {
        let newPage = { pageNumber: -1, previous: null, next: null, fullPageHTMLObject: null, smallViewHTMLObject: null };
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
        if (alpha.fullPageHTMLObject) {
            alpha.fullPageHTMLObject.style.display = "none";
        }
        pageController.updatePageNumber(alpha);
        pageController.totalPageNumber += 1;
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
    return pageController;
}
//@auto-fold here
export function pageControllerHTMLObject(pageController, subPanelContainer) {
    let pageNavigator = document.createElement("div");
    pageNavigator.classList.add("pageNavigator");
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
