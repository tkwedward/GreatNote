import { GNContainerDiv } from "../GreatNoteClass/GreatNoteDataClass";
import * as CommentControlerHelperFunction from "./commentControllerHelperFunction";
//@auto-fold here
export function GNComment(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData } = createData;
    let _commentContainer = GNContainerDiv({ name: "commentDiv", saveToDatabase: false });
    _commentContainer.GNType = GNComment.name;
    _commentContainer.classList.add("_commentContainer");
    if (arrayID && saveToDatabase) {
        _commentContainer.addToDatabase(arrayID);
        _commentContainer.saveHTMLObjectToDatabase();
    }
    //@auto-fold here
    _commentContainer.createCommentObject = function (createData) {
        return CommentControlerHelperFunction.createCommentObject(_commentContainer, createData);
    };
    _commentContainer.loadFromData = function (injectedData) {
        CommentControlerHelperFunction.loadFromData(_commentContainer, injectedData);
    }; // _commentContainer.loadFromData
    //@auto-fold here
    if (injectedData) {
        // if there are data, loop each object and create
        console.log(323232, "inject data");
        _commentContainer.loadFromData(injectedData);
        // ****************************
        // render the comments inside
        // ****************************
        injectedData["array"].forEach((p) => {
            let newObject = _commentContainer.createCommentObject({ name: "", injectedData: p });
            // newObject.initializeHTMLObjectFromData(p)
        });
    }
    else {
        let newCommentField = _commentContainer.createCommentObject({ "name": "", arrayID: _commentContainer.getAccessPointer(), saveToDatabase: true });
        newCommentField.saveHTMLObjectToDatabase();
    } // if not injectedData
    CommentControlerHelperFunction.addEventToCommentContainer(_commentContainer);
    CommentControlerHelperFunction.addCommentController(_commentContainer);
    return _commentContainer;
}
