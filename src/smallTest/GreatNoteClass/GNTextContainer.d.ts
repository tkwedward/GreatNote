import { GNObjectInterface, CreateGreatNoteObjectInterface, GNContainerDivInterface } from "./GreatNoteObjectInterface";
interface GNTextContainerInterface extends GNContainerDivInterface {
    getAnnotationType(): string;
    setMovable(): void;
}
export declare function createSelectionObject(className: string, valueList: string[]): HTMLSelectElement;
export declare function createTextContainerHTMLObject(): [GNTextContainerInterface, HTMLElement, HTMLInputElement, HTMLSelectElement];
export declare function GNTextContainer(createData: CreateGreatNoteObjectInterface): GNTextContainerInterface;
export interface GNTemplateInterface extends GNObjectInterface, HTMLImageElement {
}
export {};
