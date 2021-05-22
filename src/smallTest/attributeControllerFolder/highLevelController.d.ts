import { HTMLObjectControllerInterface, PolylineControllerInterface } from "./attributeControllerInterface";
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export declare function createPolylineController(): PolylineControllerInterface;
export declare function createDivControllerContainer(): HTMLObjectControllerInterface;
export declare function createSvgCircleControllerContainer(): HTMLObjectControllerInterface;
interface SelectionToolControllerInterface extends HTMLObjectControllerInterface {
    copyDataArray: any;
}
export declare function createSelectionToolController(mainController: MainControllerInterface): SelectionToolControllerInterface;
export {};
