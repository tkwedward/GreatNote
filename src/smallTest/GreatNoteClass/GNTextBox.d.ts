import { CreateGreatNoteObjectInterface, GNContainerDivInterface } from "./GreatNoteObjectInterface";
interface GNTextBoxInterface extends GNContainerDivInterface {
    getAnnotationType(): string;
    setMovable(): void;
}
export declare function inputFunction(_object: any, item: any): ((e: any) => void);
export declare function createTextBox(_object: any, uniqueID?: string): HTMLDivElement;
export declare function GNTextBox(createData: CreateGreatNoteObjectInterface): GNTextBoxInterface;
export {};
