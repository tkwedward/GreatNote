import { MainControllerInterface, AddDatabaseFormatInterface } from "./mainControllerFolder/mainControllerInterface";
export declare enum specialCreationMessageEnum {
    createNewFullPageObject = "createNewFullPageObject",
    createNewOverviewPageObject = "createNewOverviewPageObject"
}
export declare function processCreationDataHelper(mainController: MainControllerInterface, creationData: AddDatabaseFormatInterface): void;
