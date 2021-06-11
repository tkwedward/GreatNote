import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export declare function overallMouseDownFunction(e: any, mainController: MainControllerInterface, svgBoard: any, moveEventName: string, upEventName: string, selectionStatusObject: any): void;
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
