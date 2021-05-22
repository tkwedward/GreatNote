import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export declare function switchStatus(item: any): string;
export interface LayerControllerInterface extends HTMLDivElement {
    renderCurrentPageLayer(): void;
    content: any;
}
export declare function createLayerController(mainController: MainControllerInterface): any;
export declare function showCurrentPageButtonFunction(mainController: MainControllerInterface, layerView: HTMLDivElement): void;
export declare function buildLayerContentFunction(mainController: MainControllerInterface, currentPageData: any, layerView: HTMLDivElement, layerLevel?: number): HTMLDivElement;
