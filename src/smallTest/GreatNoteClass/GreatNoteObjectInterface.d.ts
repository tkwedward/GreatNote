import SVG from "svg.js";
export interface GNObjectInterface {
    controlledObject?: any;
    controllerEvent?: any;
    objectData?: any;
    GNType: string;
    GNSpecialCreationMessage: any;
    specialGNType?: string;
    _name: string;
    _classNameList: string[];
    _dataStructure?: string[];
    _styleStructure?: string[];
    stylesheet?: {};
    _identity?: {
        "accessPointer": string;
        "dataPointer": string;
        "linkArray": string[];
        parent: string;
        children: string[];
    };
    loadFromData?(data: any): void;
    extract?(): any;
    processUpdateData(data: any): void;
    createDataObject(): any;
    appendTo(_parent: HTMLElement): void;
    applyStyle(any: any): void;
    appendElements(...any: any): void;
    getDataPointer(): string;
    getAccessPointer(): string;
    setDataPointer(): string;
    setAccessPointer(): string;
    getDataFromDataBase(): any;
    editEvent(eventName: string): void;
    updateLinkObject(): void;
    getLinkArray(): any;
    reloadDataFromDatabase(): void;
    saveHTMLObjectToDatabase(): void;
    deleteFromDataBase(): void;
    initializeHTMLObjectFromData(objectData: any): void;
    generateGNObjectThroughGNType(_GNType: string, createDataObject: CreateGreatNoteObjectInterface): void;
    /** to save data from the database and extract data*/
    save(): void;
    load(data: any): void;
    processUpdateData(): void;
    addToDatabase(arrayID: string, insertPosition?: number | boolean, dataPointer?: string): void;
    deleteFromDatabase(): void;
}
export interface GNExtractDataInterface {
    GNType: string;
    data: any;
    stylesheet: any;
    _identity: {
        parent: string;
        children: string[];
        accessPointer: string;
        dataPointer: string;
        linkedArray: string[];
    };
}
export interface GNInputFieldInterface extends GNObjectInterface, HTMLInputElement {
    _parent?: any;
    _identity?: any;
}
export interface GNDropdownListInterface extends GNObjectInterface, HTMLSelectElement {
}
export interface CreateGreatNoteObjectInterface {
    name: string;
    specialCreationMessage?: string;
    arrayID?: string;
    insertPosition?: number | boolean;
    dataPointer?: string | boolean;
    saveToDatabase?: boolean;
    injectedData?: any;
    imgsrc?: string;
    contentEditable?: boolean;
    statusList?: string[];
    _classNameList?: string[];
}
export interface GNButtonInterface extends HTMLButtonElement, GNObjectInterface {
    _parent?: any;
    _identity: any;
    status: any;
    statusList: string[];
    addClickEvent(clickFunction: (e: any) => {}): void;
    clickEvent(e: any): void;
    event(e: any): void;
}
export interface GNContainerDivInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any;
    _identity?: any;
    childrenList?: {
        string: GNObjectInterface;
    } | {};
    applyStyle(data: any, saveToDatabase?: boolean): void;
    loadFromData(data: any): void;
    extract(): any;
    appendElements(...any: any): void;
    getAccessPointer(): string;
    linkTo(_object: any): void;
}
export interface GNPageInterface extends HTMLDivElement, GNObjectInterface {
    _parent?: any;
    _identity?: any;
    childrenList?: {
        string: GNObjectInterface;
    } | {};
    applyStyle(data: any, saveToDatabase?: boolean): void;
    loadFromData(data: any): void;
    extract(): any;
    appendElements(...any: any): void;
    getAccessPointer(): string;
    linkTo(_object: any): void;
}
export interface GNImageContainerInterface extends GNObjectInterface, HTMLDivElement {
    _name: string;
    imageWidthToHeightRatio: number;
    addCaption(): void;
    setImageSize(imageData: {
        width?: number;
        height?: number;
    }): void;
    setMovable(): void;
}
export interface GNImageDataStructure {
    name: string;
    src: string;
}
export interface superGNObjectInterface {
    /** To link to other objects */
    saveHTMLObjectToDatabase(): void;
    linkTo(_object: any): void;
}
export interface GNSvgContainerInterface extends SVG.LinkedHTMLElement, GNObjectInterface {
    _parent?: any;
    GNType: string;
    _name: string;
    _identity: any;
    _dataStructure?: string[];
    _styleStructure?: string[];
    svgController?: SVG.Doc;
    svgNode: SVG.LinkedHTMLElement;
    applyStyle(attrList: any): void;
    appendToContainer(parentDiv: any): void;
    createDataObject(): void;
    extract(): void;
}
export interface GNSvgObjectInterface {
    _parent?: any;
    GNType?: string;
    _name?: string;
    _dataStructure?: string[];
    _styleStructure?: string[];
    applyStyle(attrList: any): void;
    appendTo(parentSVGObject: any): void;
    appendToContainer(parentDiv: any): void;
    createDataObject(): void;
    extract(): any;
    loadFromData(data: any): void;
}
export interface GNSvgRectInterface extends GNSvgObjectInterface, SVG.Rect {
    applyStyle(attrList: GNSvgRectData): void;
}
export interface GNSvgRectData {
    x: number | string;
    y: number | string;
    width: number | string;
    height: number | string;
    fill: string;
}
export interface GNSvgCircleInterface extends GNSvgObjectInterface, SVG.LinkedHTMLElement {
    svgController: SVG.Doc;
    _parent?: any;
    GNType: string;
    _name: string;
    _dataStructure: string[];
    _styleStructure: string[];
    soul: any;
    applyStyle(attrList: GNSvgCircleData): void;
}
export interface GNSvgCircleData {
    r: number;
    cx?: number;
    cy?: number;
}
export interface GNSvgLineInterface extends GNSvgObjectInterface, SVG.Line {
    applyStyle(attrList: GNSvgLineData): void;
}
export interface GNSvgLineData {
    points?: [number, number, number, number];
    attribute?: {
        "stroke"?: string;
        "width"?: number;
    };
}
export interface GNSvgPolyLineInterface extends GNSvgObjectInterface, SVG.LinkedHTMLElement {
    _identity: {
        "accessPointer": string;
        "dataPointer": string;
        "linkArray": string[];
    };
    soul: any;
    saveHTMLObjectToDatabase(): void;
    applyStyle(attrList: GNSvgPolyLineData): void;
}
export interface GNSvgPolyLineData {
    points?: number[];
    attribute?: {
        "stroke"?: string;
        "width"?: number;
        "fill"?: string;
        "stroke-width"?: string;
    };
    stroke?: string;
    "stroke-width": string;
    fill: string;
}
export interface GNSvgImageInterface extends GNSvgObjectInterface, SVG.Image {
    applyStyle(attrList: GNSvgImageInterface): void;
    setImgSrc(src: string): void;
}
export interface GNSvgImageDataInterface {
    points?: number[];
    attribute?: {
        "stroke"?: string;
        "width"?: number;
        "fill"?: string;
    };
}
