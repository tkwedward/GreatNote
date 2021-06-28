import * as HighLevelController from "./highLevelController";
import * as ObjectInDivAttributeControoler from "./objectInDivAttributeController";
import * as RectSelectionToolController from "./rectSelectionToolController";
import * as EraserToolController from "./eraserToolController";
//** to initialize the main controller attribute controller mapping so that other objects can access tthe attribute controllers through the mainController
// defined in ToolBoxClass' s toolBoxItemStatus in ToolboxModel.ts
export function initializeMainControllerAttributeControllerMapping(mainController) {
    console.log(777777, mainController);
    let polylineController = HighLevelController.createPolylineController();
    polylineController.style.display = "none";
    let selectionToolController = HighLevelController.createSelectionToolController(mainController);
    selectionToolController.style.display = "none";
    let eraserToolController = EraserToolController.createEraserToolController();
    eraserToolController.style.display = "none";
    let objectInDivAttributeController = ObjectInDivAttributeControoler
        .createMoveObjectInDivController();
    objectInDivAttributeController.style.display = "none";
    let rectSelectionToolController = RectSelectionToolController
        .createRectangleSelectionToolController(mainController);
    rectSelectionToolController.style.display = "none";
    mainController.attributeControllerMapping = {
        polylineController: polylineController,
        eraserToolController: eraserToolController,
        selectionToolController: selectionToolController,
        moveObjectInDivController: objectInDivAttributeController,
        rectSelectionToolController: rectSelectionToolController
    };
}
