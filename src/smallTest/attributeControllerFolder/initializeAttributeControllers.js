import * as HighLevelController from "./highLevelController";
//** to initialize the main controller attribute controller mapping so that other objects can access tthe attribute controllers through the mainController
export function initializeMainControllerAttributeControllerMapping(mainController) {
    let polylineController = HighLevelController.createPolylineController();
    mainController.attributeControllerMapping = {
        polylineController: polylineController
    };
}
