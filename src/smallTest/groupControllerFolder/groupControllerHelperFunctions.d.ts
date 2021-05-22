export interface GroupDataInterface {
    groupName: string;
    elementAccessPointeArray: string[];
    uniqueID: string;
    pageAccessPointer: string;
    rectInfo: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export declare function createGroupControllerWrapper(groupViewer: any): any;
export declare function createGroupRow(injectedData?: GroupDataInterface): any[];
export declare function createAddGroupButton(groupViewer: any): HTMLDivElement;
export declare function convertAccessPointerToHTMLObject(accessPointerArray: string[]): (Element | null)[];
export declare function markObjectInsideSelectionArea(): any;
