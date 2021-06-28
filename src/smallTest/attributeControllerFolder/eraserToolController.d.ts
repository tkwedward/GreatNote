import { HTMLObjectControllerInterface } from "./attributeControllerInterface";
interface SelectionToolControllerInterface extends HTMLObjectControllerInterface {
    copyDataArray: any;
    selectionRectInfo: {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
    };
}
export declare function createEraserToolController(): SelectionToolControllerInterface;
export {};
