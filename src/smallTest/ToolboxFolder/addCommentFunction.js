import * as CommentController from "../commentFolder/commentController";
export function addCommentMouseDownFunction(e, mainController, divLayer, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("addCommentItemButton")) {
        return;
    }
    let divLayerAccessID = divLayer.getAccessPointer();
    console.log(divLayer, mainController.getObjectById(divLayerAccessID));
    let commentBox = CommentController.GNComment({ name: "commentDiv", arrayID: divLayerAccessID, saveToDatabase: true });
    console.log(divLayer, mainController.getObjectById(divLayerAccessID));
    //
    //
    divLayer.append(commentBox);
}
