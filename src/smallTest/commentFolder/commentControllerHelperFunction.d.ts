import { GNContainerDivInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface";
export interface CommentContainerInterface extends GNContainerDivInterface {
    createCommentObject(createData: CreateGreatNoteObjectInterface): any;
    createReplyObject(createData: CreateGreatNoteObjectInterface): any;
}
export declare function loadFromData(_commentContainer: any, injectedData: any): void;
export declare function createCommentObject(_commentContainer: any, createData: any): GNContainerDivInterface;
export declare function addEventToCommentContainer(commentContainer: any): void;
export declare function addCommentController(_commentContainer: CommentContainerInterface): void;
