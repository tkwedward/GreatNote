interface CollectionPageInterface extends HTMLDivElement {
    pageStatus: {
        height: number;
    };
    svgLayer: any;
    divLayer: any;
    currentActiveCollectionRow: any;
    injecetDataToCollectionPage(injectedData: any): void;
    renderGroupDataToCollectionPage(groupData: any): void;
}
export declare function attachExtraFunctionToCollectionPage(collectionPage: CollectionPageInterface, divLayer: any, svgLayer: any): void;
export declare function attachEventsToCollectionPage(collectionPage: CollectionPageInterface, divLayer: HTMLDivElement, svgLayer: any): void;
export {};
