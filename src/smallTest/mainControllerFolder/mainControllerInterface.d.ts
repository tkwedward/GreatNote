import * as PageController from "../pageControllerFolder/pageController";
import { ToolBoxInterface } from "../ToolboxModel";
import { LayerControllerInterface } from "../layerControllerFolder/layerController";
import { GNObjectInterface, CreateGreatNoteObjectInterface } from "../GreatNoteClass/GreatNoteObjectInterface";
export declare let mainArrayData: {
    mainArray_pageFull: {
        arrayID: string;
        arrayHTMLObject: string;
    };
    mainArray_pageOverview: {
        arrayID: string;
        arrayHTMLObject: string;
    };
    mainArray_bookmark: {
        arrayID: string;
        arrayHTMLObject: string;
    };
    mainArray_panel: {
        arrayID: string;
        arrayHTMLObject: string;
    };
    mainArray_pokemon: {
        arrayID: string;
        arrayHTMLObject: string;
    };
};
export interface communicationDataStructure {
    data: any;
    array: any[];
    _identity: {
        "dataPointer": string;
        "accessPointer": string;
        linkArray: string[];
    };
    stylesheet: any;
    GNType: string;
}
export interface MainControllerInterface {
    mainDoc: any;
    previousDoc: any;
    applyMainDocTemplate: boolean;
    mainDocArray: any;
    baseArrayID: string;
    notebookID: string;
    GNDataStructureMapping: any;
    attributeControllerMapping: any;
    pageCurrentStatus: any;
    pageController: PageController.pageControllerInterface;
    toolBox: ToolBoxInterface;
    layerController: LayerControllerInterface;
    selectedObjectArray: any[];
    changeList: any[];
    uniqueNodeId: string;
    /** Functions related to save and update data in the database */
    addData(arrayID: string, htmlObject: GNObjectInterface | HTMLElement, temporaryPointer: string, insertPosition?: number | boolean, dataPointer?: string, specialMessage?: string): [HTMLElement, string];
    updateData(_object: GNObjectInterface, dataPointerType: boolean): void;
    createDummyData(name: string, age: number, sex: string): any;
    createUniqueID(): string;
    saveHTMLObjectToDatabase(htmlObject: GNObjectInterface): void;
    deleteFromDataBase(htmlObject: GNObjectInterface): void;
    sendChangeToServer(): void;
    tracePageFromElement(htmlObject: HTMLElement): any;
    /** the arrayID is for attaching to the array*/
    getHTMLObjectById(objectID: string): any;
    getObjectById(objectID: string, doc?: any): any;
    getLinkArrayFromID(objectID: string): any;
    getHtmlObjectByID(objectID: string): void;
    createGNObjectThroughName(objectName: string, createData: CreateGreatNoteObjectInterface): void;
    /** internode functions*/
    /**
    input: array in the mainDoc
    function: To render the data stored in the mainDoc to HTML Elements.*/
    buildInitialHTMLSkeleton(): void;
    buildPageFromMainDoc(): void;
    renderDataToHTML(data: any, arrayHTMLObject: HTMLElement | GNObjectInterface): void;
    /** To save the mainDoc as text file*/
    saveMainDoc(sendRequest: boolean): void;
    /** To load string into the mainDoc */
    loadMainDoc(data: string): void;
    processChangeData(changeDataArray: Set<string>): void;
}
export interface HtmlObjectDataInterface {
    htmlObjectData: {
        array: any;
        specialCreationMessage: string;
        GNType: string;
        specialGNType: string;
        data: any;
        _classNameList: string[];
        stylesheet: any;
        _identity: {
            accessPointer: string;
            dataPointer: string;
            linkArray: string[];
        };
    };
}
export interface UpdateDataFormatInterface {
    htmlObjectData: HtmlObjectDataInterface;
    metaData: {
        action: string;
        notebookID: string;
        latestUpdateTime: string;
        uniqueNodeId: string;
    };
}
export interface AddDatabaseFormatInterface {
    htmlObjectData: HtmlObjectDataInterface;
    metaData: {
        action: string;
        insertPosition?: number | boolean;
        parentAccessPointer: string;
        accessPointer: string;
        dataPointer?: string;
        notebookID: string;
        uniqueNodeId: string;
    };
}
