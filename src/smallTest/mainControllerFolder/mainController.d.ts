import { GNObjectInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface";
import * as PageController from "../pageControllerFolder/pageController";
import { communicationDataStructure, MainControllerInterface, AddDatabaseFormatInterface } from "../mainControllerFolder/mainControllerInterface";
export declare class MainController implements MainControllerInterface {
    mainDocArray: any;
    mainDoc: any;
    baseArrayID: string;
    previousDoc: any;
    GNDataStructureMapping: any;
    applyMainDocTemplate: boolean;
    pageCurrentStatus: any;
    toolBox: any;
    pageController: PageController.pageControllerInterface;
    selectedObjectArray: any[];
    attributeControllerMapping: any;
    layerController: any;
    changeList: any[];
    constructor();
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    addData(arrayID: string, htmlObject: GNObjectInterface | any, temporaryPointer: string, insertPosition?: number | boolean, dataPointer?: string, specialCreationMessage?: string): AddDatabaseFormatInterface;
    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    updateData(_object: any, dataPointerType?: boolean): void;
    /** to initiate the data so that you can store the data to the db*/
    createDummyData(data?: {}): any;
    /** when ever the htmlObject is updated, we fetch newData from thfe HTMLObjectt, and then go to the database and update the relevant data*/
    saveHTMLObjectToDatabase(htmlObject: any): void;
    deleteFromDataBase(htmlObject: any): void;
    sendChangeToServer(): void;
    getObjectDataById(objectID: string, doc?: any): any;
    getHTMLObjectTById(objectID: string): any;
    getLinkArrayFromID(objectID: string): any;
    getHtmlObjectByID(objectID: string): Element | null;
    buildInitialHTMLSkeleton(): void;
    buildPageFromMainDoc(): void;
    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database, not array, but the object includes array property */
    renderDataToHTML(data: communicationDataStructure, arrayHTMLObject?: any): void;
    createGNObjectThroughName(objectName: string, createData: CreateGreatNoteObjectInterface): any;
    loadMainDoc(data: any): void;
    processChangeData(changeData: any): void;
}
