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
    annotationPage.append(checkBoxContainer, getCheckedValueButton, annotationPageContentWrapper);
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
