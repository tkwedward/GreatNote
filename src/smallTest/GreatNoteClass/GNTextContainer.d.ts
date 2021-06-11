import { CreateGreatNoteObjectInterface, GNContainerDivInterface } from "./GreatNoteObjectInterface";
interface GNTextContainerInterface extends GNContainerDivInterface {
    getAnnotationType(): string;
    setMovable(): void;
}
export declare function createSelectionObject(className: string, valueList: string[]): HTMLSelectElement;
export declare function inputFunction(_object: any, item: any): ((e: any) => void);
export declare function createTextBox(_object: any, uniqueID?: string): HTMLDivElement;
export declare function createTextContainerHTMLObject(): [GNTextContainerInterface, HTMLInputElement, HTMLSelectElement];
export declare function GNTextContainer(createData: CreateGreatNoteObjectInterface): GNTextContainerInterface;
export {};
