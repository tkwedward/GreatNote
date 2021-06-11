import * as HighLevelController from "./highLevelController";
import * as ObjectInDivAttributeControoler from "./objectInDivAttributeController";
//** to initialize the main controller attribute controller mapping so that other objects can access tthe attribute controllers through the mainController
// defined in ToolBoxClass' s toolBoxItemStatus in ToolboxModel.ts
export function initializeMainControllerAttributeControllerMapping(mainController) {
    console.log(777777, mainController);
    let polylineController = HighLevelController.createPolylineController();
    polylineController.style.display = "none";
    let selectionToolController = HighLevelController.createSelectionToolController(mainController);
    selectionToolController.style.display = "none";
    let objectInDivAttributeController = ObjectInDivAttributeControoler
        .createMoveObjectInDivController();
    objectInDivAttributeController.style.display = "none";
    mainController.attributeControllerMapping = {
        polylineController: polylineController,
        selectionToolController: selectionToolController,
        moveObjectInDivController: objectInDivAttributeController
    };
}
