import * as CommentController from "../commentFolder/commentController";
export function addCommentMouseDownFunction(e, mainController, divLayer, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("addCommentItemButton")) {
        return;
    }
    let divLayerAccessID = divLayer.getAccessPointer();
    let commentBox = CommentController.GNComment({ name: "commentDiv", arrayID: divLayerAccessID, saveToDatabase: true });
    //
    //
    divLayer.append(commentBox);
}
