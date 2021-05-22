import * as CommentController  from "../commentFolder/commentController"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"

export function addCommentMouseDownFunction(e:any, mainController:MainControllerInterface, divLayer:any, moveEventName:string, upEventName:string){
    if (!mainController.toolBox.checkToolBoxItemStatus("addCommentItemButton")){
        return
    }

    let divLayerAccessID = divLayer.getAccessPointer()
    let commentBox = CommentController.GNComment({name: "commentDiv", arrayID: divLayerAccessID, saveToDatabase: true})
    //
    //
    divLayer.append(commentBox)

}
