export interface CollectionDataInterface {
    collectionName: string;
    groupDataArray: any;
    uniqueID: string;
}
export declare function createCollectionControllerWrapper(collectionViewer: any): any;
export declare function createCollectionRow(injectedData?: CollectionDataInterface): any[];
export declare function createAddCollectionButton(collectionWrapper: any, collectionViewer: any): HTMLButtonElement;
export declare function convertAccessPointerToHTMLObject(accessPointerArray: string[]): (Element | null)[];
export declare function createCollectionPage(): any;
