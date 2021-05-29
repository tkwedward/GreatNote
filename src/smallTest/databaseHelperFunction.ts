import * as pageViewHelperFunction from "./pageViewHelperFunction"
import {GNObjectInterface} from "./GreatNoteClass/GreatNoteObjectInterface"
import {MainControllerInterface, AddDatabaseFormatInterface} from "./mainControllerFolder/mainControllerInterface"

export enum specialCreationMessageEnum{
    createNewFullPageObject = "createNewFullPageObject",
    createNewOverviewPageObject = "createNewOverviewPageObject"
}

export function processCreationDataHelper(mainController:MainControllerInterface, creationData: AddDatabaseFormatInterface){
    let {htmlObjectData, metaData} =  creationData
    console.log(creationData)
    let parentElement = <any> mainController.getHtmlObjectByID(metaData.parentAccessPointer)

    let htmlObjectName = htmlObjectData.GNType

    let htmlObject = <any> mainController.createGNObjectThroughName(htmlObjectName, {name:"", injectedData: htmlObjectData})
    console.log(htmlObject)
    if (htmlObject.classList.contains("fullPage")){
        console.log("create new page")
        mainController.pageController.addPage(htmlObject)
    }

    let insertPosition = <number> metaData.insertPosition

    if (insertPosition){
      parentElement.insertBefore(htmlObject, parentElement.children[insertPosition]);
    } else {
      parentElement.appendChild(htmlObject)
    }
}
