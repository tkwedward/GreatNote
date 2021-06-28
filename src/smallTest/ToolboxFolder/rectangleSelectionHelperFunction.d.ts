import { SelectionToolControllerInterface } from "../attributeControllerFolder/rectSelectionToolController";
export interface SelectionRectInterface extends HTMLDivElement {
    divLayerItemArray: any[];
    svgLayerItemArray: any[];
}
export declare function getPointWidthAndHeight(rect: HTMLDivElement): {
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare function checkPointInsideRect(point: {
    x: number;
    y: number;
}, rectData: {
    x: number;
    y: number;
    w: number;
    h: number;
}): boolean;
export declare function checkCornersInside(rect1Data: {
    x: number;
    y: number;
    w: number;
    h: number;
}, rect2Data: {
    x: number;
    y: number;
    w: number;
    h: number;
}): boolean[];
export declare function checkSideInsideRect(rect1Data: {
    x: number;
    y: number;
    w: number;
    h: number;
}, rect2Data: {
    x: number;
    y: number;
    w: number;
    h: number;
}): boolean;
export declare function addEventToSelectionRect(selectionRect: HTMLDivElement, rectSelectionToolController: SelectionToolControllerInterface): void;
