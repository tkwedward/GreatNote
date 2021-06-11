interface DummnyDataInterface {
    data: any;
    array: any[];
    GNType: string;
    specialGNType: string;
    _identity: {
        dataPointer: string;
        accessPointer: string;
        linkArray: string[];
    };
    stylesheet: any;
    GNSpecialCreationMessage: string;
    _classNameList: string[];
}
export declare function createDummyData(): DummnyDataInterface;
export declare function superGNObject(_object: any, saveToDatabase?: boolean, arrayID?: string, insertPosition?: number | boolean, dataPointer?: string | boolean, specialCreationMessage?: string, injectedData?: any, attachEventListener?: boolean): void;
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export declare function attachEventListenerToLayer(mainController: MainControllerInterface, arrayID?: string, _object?: any, injectedData?: any): void;
export declare function setObjectMovable(_object: any): void;
export {};
