import * as pageViewHelperFunction from "./pageViewHelperFunction"
import {GNObjectInterface} from "./GreatNoteClass/GreatNoteObjectInterface"
import {MainControllerInterface, AddDatabaseFormatInterface} from "./mainControllerFolder/mainControllerInterface"

export enum specialCreationMessageEnum{
    createNewFullPageObject = "createNewFullPageObject",
    createNewOverviewPageObject = "createNewOverviewPageObject"
}

export function processCreationDataHelper(mainController:MainControllerInterface, creationData: AddDatabaseFormatInterface){
    let {htmlObjectData, metaData} =  creationData

    let parentElement = <any> mainController.getHtmlObjectByID(metaData.parentAccessPointer)

    let htmlObjectName = htmlObjectData.GNType

    let htmlObject = <any> mainController.createGNObjectThroughName(htmlObjectName, {name:"", injectedData: htmlObjectData})

    console.log(19191919190000, metaData, htmlObject)

    if (htmlObject.classList.contains("fullPage")){
        console.log("create new page")

        mainController.pageController.addPage(<HTMLDivElement> htmlObject, <number >metaData.insertPosition)
    }

    let insertPosition = <number> metaData.insertPosition

    if (insertPosition){
      parentElement.insertBefore(htmlObject, parentElement.children[insertPosition]);
    } else {
      parentElement.appendChild(htmlObject)
    }
}
