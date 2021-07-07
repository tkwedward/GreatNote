import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
import * as PageController from "./pageController";
export declare function createColorPicker(): HTMLDivElement;
export declare function extractSmallViewData(): void;
export declare function createSmallViewPageController(mainController: MainControllerInterface): void;
export declare function addFunctionToSmallViewHTMLObject(pageController: PageController.pageControllerInterface, smallViewHTMLObject: any, smallViewContent: HTMLDivElement): void;
export interface SmallViewDataInterface {
    color: string;
    tagsArray: string[];
}
export declare function renderSmallView(fullPageHTMLObject: any, smallViewHTMLObject: HTMLDivElement, pageNumber: number): void;
