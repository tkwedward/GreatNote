export interface ItemCardInterface extends HTMLDivElement {
    uniqueID: string;
    extract(): any;
}
export declare function createControlPanel(): HTMLDivElement;
export declare function createContentInfoBox(): HTMLDivElement;
export declare function createCategoryBox(newObjectData: any): HTMLDivElement;
export declare function createEditInfoBox(itemCard: ItemCardInterface): [HTMLDivElement, HTMLInputElement, HTMLInputElement, HTMLTextAreaElement];
export declare function createItemCard(data: {
    name: string;
    source: string;
    description: string;
    category: string;
    id?: string;
}): ItemCardInterface;
