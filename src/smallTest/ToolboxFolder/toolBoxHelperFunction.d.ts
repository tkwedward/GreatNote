export declare function clearUpEvent(svgBoard: SVGElement, eventName: string, eventFunction: (e: any) => void): void;
export declare function calculateDistance(x1: number, y1: number, x2: number, y2: number): number;
export declare function mousePositionRatioAdjustment(length: number, ratio: number): number;
export declare function locationLog(logText: string): void;
export declare function changeItemPosition(p: any, originalPointArray: [number, number][], deltaX: number, deltaY: number): void;
export declare function getOffSetXY(e: any): [number, number, boolean];
export declare function getPageXY(e: any): [number, number, boolean];
export declare function getScale(pageContentContainer: HTMLDivElement): number;
export declare function getTouchOffset(e: any, touchPointIndex: number): [number, number];
