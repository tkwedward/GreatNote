import { GNObjectInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface";
export interface GNBookmarkLinkedObjectInterface extends GNObjectInterface, HTMLElement {
}
export declare function createBookmarkLinkedObjectHTMLObject(_object: any): (HTMLDivElement | HTMLButtonElement | HTMLInputElement | HTMLSelectElement)[];
export declare function GNBookmarkLinkedObject(createData: CreateGreatNoteObjectInterface): GNBookmarkLinkedObjectInterface;
