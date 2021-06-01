import { HTMLObjectControllerInterface, PolylineControllerInterface } from "./attributeControllerInterface";
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export declare function createPolylineController(): PolylineControllerInterface;
export declare function createDivControllerContainer(): HTMLObjectControllerInterface;
export declare function createSvgCircleControllerContainer(): HTMLObjectControllerInterface;
interface SelectionToolControllerInterface extends HTMLObjectControllerInterface {
    copyDataArray: any;
    selectionRectInfo: {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
    };
}
export declare function createSelectionToolController(mainController: MainControllerInterface): SelectionToolControllerInterface;
export {};
