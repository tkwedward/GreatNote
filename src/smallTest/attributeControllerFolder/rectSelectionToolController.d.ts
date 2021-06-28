import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
import { HTMLObjectControllerInterface } from "./attributeControllerInterface";
export interface SelectionToolControllerInterface extends HTMLObjectControllerInterface {
    selectionRect: any;
    selectionRectInfo: any;
    selectedItem: {
        divLayerItemArray: any[];
        svgLayerItemArray: any[];
    };
    copiedData: {
        divLayerCopiedDataArray: any[];
        svgLayerCopiedDataArray: any[];
    };
    divLayer: any;
    svgLayer: any;
}
export declare function createCheckBoxContainer(): [HTMLDivElement, HTMLLabelElement, HTMLInputElement, HTMLLabelElement, HTMLInputElement];
export declare function createRectangleSelectionToolController(mainController: MainControllerInterface): SelectionToolControllerInterface;
