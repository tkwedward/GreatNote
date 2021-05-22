export var specialCreationMessageEnum;
(function (specialCreationMessageEnum) {
    specialCreationMessageEnum["createNewFullPageObject"] = "createNewFullPageObject";
    specialCreationMessageEnum["createNewOverviewPageObject"] = "createNewOverviewPageObject";
})(specialCreationMessageEnum || (specialCreationMessageEnum = {}));
export function processCreationDataHelper(mainController, creationData) {
    let { htmlObjectData, metaData } = creationData;
    let parentElement = mainController.getHtmlObjectByID(metaData.arrayID);
    let htmlObjectName = htmlObjectData.GNType;
    let htmlObject = mainController.createGNObjectThroughName(htmlObjectName, { name: "", injectedData: htmlObjectData });
    console.log(171717171, htmlObject, htmlObject.extract(), htmlObjectData);
    if (htmlObject.classList.contains("fullPage")) {
        console.log("create new page");
        mainController.pageController.addPage(htmlObject);
    }
    console.log(16, parentElement, creationData, htmlObject);
    parentElement.appendChild(htmlObject);
}
