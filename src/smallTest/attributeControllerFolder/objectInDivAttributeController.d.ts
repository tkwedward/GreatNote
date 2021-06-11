export declare function createMoveObjectInDivController(): HTMLDivElement;
export declare function createInputDiv(inputLabelName: string): [HTMLDivElement, HTMLInputElement];
export interface ImageContainerAttributeControllerInterface extends HTMLDivElement {
    targetImageContainer: any;
    renderImage(): void;
}
export declare function createImageContainerAttributeController(): ImageContainerAttributeControllerInterface;
