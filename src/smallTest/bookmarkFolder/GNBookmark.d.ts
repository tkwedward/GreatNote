import { GNObjectInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface";
export interface GNBookmarkInterface extends GNObjectInterface, HTMLElement {
    setMovable(): void;
    getPageNumber(): number;
}
export declare function createBookmarkHTMLObject(_object: any): (HTMLDivElement | HTMLInputElement | HTMLButtonElement | HTMLSelectElement)[];
export declare function GNBookmark(createData: CreateGreatNoteObjectInterface): GNBookmarkInterface;
