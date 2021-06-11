export function getAllPageAnnotation(currentPage, checkedArray) {
    let currentPageAnnotationData = currentPage.getCategorizedAnnotationArray();
    console.log(currentPage, currentPageAnnotationData);
    let filteredCurrentPageAnnotationData = {};
    if (checkedArray) {
        checkedArray.forEach((p) => {
            filteredCurrentPageAnnotationData[p] = currentPageAnnotationData[p];
        });
    }
    else {
        filteredCurrentPageAnnotationData = currentPageAnnotationData;
    }
    let newItem = {
        pageNumber: currentPage.pageNumber,
        currentPageAnnotationData: filteredCurrentPageAnnotationData
    };
    let numberOfItem = 0;
    Object.values(filteredCurrentPageAnnotationData).forEach((p) => {
        console.log(2323232, p);
        if (p)
            numberOfItem += p.length;
    });
    if (numberOfItem > 0) {
        return newItem;
    }
    else {
        return;
    }
}
export function buildAnnotationPage(mainController) {
    let annotationPage = document.querySelector(".annotationPage");
    let checkBoxContainer = document.createElement("div");
    checkBoxContainer.classList.add("checkBoxContainer");
    let annotationPageContentWrapper = document.createElement("div");
    annotationPageContentWrapper.classList.add("annotationPageContentWrapper");
    let checkBoxChoiceArray = ["section", "question", "solution", "comment", "equation", "group"];
    checkBoxChoiceArray.forEach(p => {
        let checkBoxChoice = document.createElement("div");
        let checkBox = document.createElement("input");
        checkBox.id = "checkBox_" + p;
        checkBox.type = "checkbox";
        checkBox.value = p;
        let checkBoxLabel = document.createElement("label");
        checkBoxLabel.setAttribute("for", "checkBox_" + p);
        checkBoxLabel.innerText = p;
        checkBoxChoice.append(checkBox, checkBoxLabel);
        checkBoxContainer.append(checkBoxChoice);
    });
    let getCheckedValueButton = document.createElement("button");
    getCheckedValueButton.classList.add("getCheckedValueButton");
    getCheckedValueButton.innerText = "getCheckedValue";
    getCheckedValueButton.addEventListener("click", e => {
        let checkedArray = Array.from(document.querySelectorAll(".checkBoxContainer input:checked")).map((p) => p.value);
        console.log(626262, checkedArray);
        let currentPage = mainController.pageController.startPage.next;
        let allPageAnnotationArray = [];
        while (currentPage) {
            if (!currentPage.getCategorizedAnnotationArray)
                break;
            // pageNumber: , currentPageAnnotationData
            let currentPageAnnotationData = getAllPageAnnotation(currentPage, checkedArray);
            // console.log(7676767, currentPageAnnotationData)
            if (currentPageAnnotationData) {
                allPageAnnotationArray.push(currentPageAnnotationData);
            }
            currentPage = currentPage.next;
        }
        console.log(allPageAnnotationArray);
        renderAnnotationPage(allPageAnnotationArray, annotationPageContentWrapper);
    });
    let firstRect = document.createElement("div");
    firstRect.classList.add("firstRect");
    firstRect.style.width = "200px";
    firstRect.style.height = "100px";
    firstRect.style.position = "absolute";
    firstRect.style.top = "200px";
    firstRect.style.left = "200px";
    firstRect.style.background = "green";
    let secondRect = document.createElement("div");
    secondRect.classList.add("secondRect");
    secondRect.style.width = "200px";
    secondRect.style.height = "250px";
    secondRect.style.position = "absolute";
    secondRect.style.top = "200px";
    secondRect.style.left = "500px";
    secondRect.style.background = "red";
    function getPointWidthAndHeight(rect) {
        let rectData = rect.getBoundingClientRect();
        let { x, y, width, height } = rectData;
        let w = width;
        let h = height;
        return { x, y, w, h };
    }
    function checkPointInsideRect(point, rectData) {
        return point.x > rectData.x && point.x < rectData.x + rectData.w && point.y > rectData.y && point.y < rectData.y + rectData.h;
    }
    function checkCornersInside(rect1Data, rect2Data) {
        let c1 = { x: rect1Data.x, y: rect1Data.y };
        let c2 = { x: rect1Data.x + rect1Data.w, y: rect1Data.y };
        let c3 = { x: rect1Data.x + rect1Data.w, y: rect1Data.y + rect1Data.h };
        let c4 = { x: rect1Data.x, y: rect1Data.y + rect1Data.h };
        return [checkPointInsideRect(c1, rect2Data), checkPointInsideRect(c2, rect2Data), checkPointInsideRect(c3, rect2Data), checkPointInsideRect(c4, rect2Data)];
    }
    function checkSideInsideRect(rect1Data, rect2Data) {
        let x1_1 = rect1Data.x;
        let x1_2 = rect1Data.x + rect1Data.w;
        let y1_1 = rect1Data.y;
        let y1_2 = rect1Data.y + rect1Data.h;
        let x2_1 = rect2Data.x;
        let x2_2 = rect2Data.x + rect2Data.w;
        let y2_1 = rect2Data.y;
        let y2_2 = rect2Data.y + rect2Data.h;
        if (x1_1 < x2_1 && x1_2 > x2_2 && y1_1 > y2_1 && y1_2 < y2_2) {
            return true;
        }
        else {
            return false;
        }
    }
    let result = document.createElement("input");
    result.style.width = "300px";
    let checkButton = document.createElement("button");
    checkButton.innerHTML = "checkButton";
    checkButton.addEventListener("click", e => {
        let rect1Data = getPointWidthAndHeight(firstRect);
        let rect2Data = getPointWidthAndHeight(secondRect);
        let cornerCheck1 = checkCornersInside(rect1Data, rect2Data);
        let cornerCheck2 = checkCornersInside(rect2Data, rect1Data);
        let sideCheck1 = checkSideInsideRect(rect1Data, rect2Data);
        let sideCheck2 = checkSideInsideRect(rect2Data, rect1Data);
        let resultRect = [cornerCheck1, cornerCheck2, sideCheck1, sideCheck2].flat();
        result.value = `${resultRect.some(p => p == true)}`;
    });
    annotationPage.append(checkBoxContainer, getCheckedValueButton, annotationPageContentWrapper, checkButton, result, firstRect, secondRect);
    // let testBox = document.createElement("div")
    // testBox.style.width = "300px"
    // testBox.style.height = "300px"
    // testBox.style.background = "red"
    // testBox.style.position = "absolute"
    // testBox.style.left = "100px"
    // testBox.style.top = "100px"
    //
    // let testBox2 = document.createElement("div")
    // testBox2.style.width = "50px"
    // testBox2.style.height = "300px"
    // testBox2.style.background = "red"
    //
    // let bottomRight = document.createElement("div")
    // bottomRight.style.width = "10px"
    // bottomRight.style.height = "10px"
    // bottomRight.style.background = "black"
    // bottomRight.style.position = "absolute"
    // bottomRight.style.left = 300 - 10/2 + "px"
    // bottomRight.style.top = 300 - 10/2 + "px"
    // testBox.append(bottomRight)
    // annotationPage.append(testBox, testBox2)
    //
    // bottomRight.draggable = true
    //
    // bottomRight.addEventListener("dragstart", e=>{
    //     let initialPosition = {x: e.x, y: e.y}
    //     let {left, top} = bottomRight.getBoundingClientRect()
    //     let initialLeftAndTop = {left, top}
    //
    //
    //     let [deltaX, deltaY] = [0, 0]
    //     console.log(initialPosition, initialLeftAndTop, e)
    //
    //     let dragFunction = (e:DragEvent)=>{
    //         deltaX = e.x  - initialPosition.x;
    //         deltaY = e.y - initialPosition.y;
    //
    //         bottomRight.style.left = (initialLeftAndTop.left + deltaX) + "px"
    //         bottomRight.style.top = (initialLeftAndTop.top + deltaY) + "px"
    //         // console.log(e)
    //         // console.log(deltaX, deltaY)
    //     }
    //
    //     let dragEndFunction =(e:DragEvent)=>{
    //         e.preventDefault()
    //         // deltaX = e.screenX  - initialPosition.x;
    //         // deltaY = e.screenY - initialPosition.y;
    //
    //         // bottomRight.style.left = initialLeftAndTop.left + deltaX + "px"
    //         // bottomRight.style.top = initialLeftAndTop.top + deltaY + "px"
    //
    //         bottomRight.removeEventListener("drag", dragFunction)
    //         bottomRight.removeEventListener("dragend", dragEndFunction)
    //     }
    //
    //     bottomRight.addEventListener("drag", dragFunction)
    //     bottomRight.addEventListener("dragend", dragEndFunction)
    // })
    return [annotationPage, getCheckedValueButton];
}
export function renderAnnotationPage(currentPageAnnotationData, annotationPageContentWrapper) {
    annotationPageContentWrapper.innerHTML = "";
    currentPageAnnotationData.forEach((p) => {
        let pageWrapper = document.createElement("div");
        pageWrapper.style.margin = "10px 0";
        let title = document.createElement("div");
        title.innerText = `P. ${p.pageNumber}`;
        pageWrapper.append(title);
        Object.entries(p.currentPageAnnotationData).forEach(([key, itemArray], _) => {
            let keyContainer = document.createElement("div");
            keyContainer.innerText = key;
            // question, solution or
            itemArray.forEach((item) => {
                var _a, _b;
                let masterObject = document.querySelector(`*[accessPointer='${item.accessPointer}']`);
                let annotationSummary = document.createElement("div");
                annotationSummary.innerText = `${(_a = masterObject.querySelector("input")) === null || _a === void 0 ? void 0 : _a.value}`;
                let annotationContent = document.createElement("div");
                annotationContent.innerHTML = `${(_b = masterObject.querySelector("div")) === null || _b === void 0 ? void 0 : _b.innerHTML}`;
                let separationLine = document.createElement("hr");
                console.log(key, item, masterObject);
                pageWrapper.append(annotationSummary, annotationContent, separationLine);
            });
        }); // p.currentPageAnnotationData).forEach
        annotationPageContentWrapper.append(pageWrapper);
    });
    console.log(currentPageAnnotationData);
}
