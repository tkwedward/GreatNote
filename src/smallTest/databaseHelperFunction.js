export var specialCreationMessageEnum;
(function (specialCreationMessageEnum) {
    specialCreationMessageEnum["createNewFullPageObject"] = "createNewFullPageObject";
    specialCreationMessageEnum["createNewOverviewPageObject"] = "createNewOverviewPageObject";
})(specialCreationMessageEnum || (specialCreationMessageEnum = {}));
export function processCreationDataHelper(mainController, creationData) {
    let { htmlObjectData, metaData } = creationData;
    let parentElement = mainController.getHtmlObjectByID(metaData.parentAccessPointer);
    let htmlObjectName = htmlObjectData.GNType;
    let htmlObject = mainController.createGNObjectThroughName(htmlObjectName, { name: "", injectedData: htmlObjectData });
    console.log(htmlObject);
    if (htmlObject.classList.contains("fullPage")) {
        console.log("create new page");
        mainController.pageController.addPage(htmlObject);
    }
    parentElement.appendChild(htmlObject);
}
