import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export declare function createColorPicker(): HTMLDivElement;
export declare function extractSmallViewData(): void;
export declare function createSmallViewPageController(mainController: MainControllerInterface): void;
import * as PageController from "./pageController";
export declare function addFunctionToSmallViewHTMLObject(pageController: PageController.pageControllerInterface, smallViewHTMLObject: any, smallViewContent: HTMLDivElement): void;
export interface SmallViewDataInterface {
    color: string;
    tagsArray: string[];
}
