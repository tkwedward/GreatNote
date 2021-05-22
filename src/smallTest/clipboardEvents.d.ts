import { MainControllerInterface } from "./mainControllerFolder/mainControllerInterface";
export declare function addPasteImageEvent(mainController: MainControllerInterface): void;
export declare function mouseResizeFunction(item: any): (e: any) => void;
export declare function createMouseTrackingController(mouseInfoDiv: HTMLDivElement, testFieldDiv: HTMLDivElement): HTMLSpanElement[];
export declare function getObjectOrigianlDataArray(p: any): {
    originalLeft: any;
    originalTop: any;
    parentOriginalWidth: any;
    parentOriginalHeight: any;
};
export declare function triggerTargetObjectMovingFunction(p: any, i: number, deltaX: number, deltaY: number, targetObjectOriginalDataArray: any): void;
