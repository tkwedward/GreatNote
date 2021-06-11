export interface ToolBoxInterface extends HTMLDivElement {
    itemArray: any[];
    targetPage: any;
    currentActiveButton: any;
    toolBoxItemStatus: ToolBoxItemStatusInterface;
    currentActiveEventFunction: (event: any) => void;
    currentActiveEventName: string;
    selectionHTMLObject?: HTMLDivElement;
    optionHTMLObject?: HTMLDivElement;
    checkToolBoxItemStatus(itemName: string): boolean;
    switchToolBoxItemStatus(itemName: string): void;
    activateToolboxItem(toolBoxItem: any): void;
    createToolBoxItem(name: string, toolBoxHtmlObject: HTMLDivElement): HTMLDivElement;
    createAddBookmarkButton(toolBoxHtmlObject: any): HTMLDivElement;
    createMouseRectangleSelectionToolItemButton(toolBoxHtmlObject: any): HTMLDivElement;
    registerSvg(svgLayer: any): void;
}
export interface ToolBoxItemInterface extends HTMLDivElement {
    status: boolean;
    _parent: any;
    eventFunction: any;
    eventName: string;
    activate(): void;
    deactivate(): void;
    resetButton(): void;
}
interface ToolBoxItemStatusInterface {
    currentActiveButton: string;
    polylineItemButton: {
        status: boolean;
        attributeController: string;
    };
    eraserItemButton: {
        status: boolean;
        attributeController: string;
    };
    selectionToolItemButton: {
        status: boolean;
        attributeController: string;
    };
    rectangleSelectionToolItemButton: {
        status: boolean;
        attributeController: string;
    };
    addCommentItemButton: {
        status: boolean;
        attributeController: string;
    };
    moveObjectInDivButton: {
        status: boolean;
        attributeController: string;
    };
    addBookmarkButton: {
        status: boolean;
        attributeController: string;
    };
    textToolItemButton: {
        status: boolean;
        attributeController: string;
    };
    bothLayerSelectionToolItemButton: {
        status: boolean;
        attributeController: string;
    };
}
export declare class ToolBoxClass implements ToolBoxInterface {
    itemArray: any[];
    targetPage: any;
    currentActiveButton: any;
    currentActiveEventFunction: (event: any) => void;
    currentActiveEventName: string;
    selectionHTMLObject?: HTMLDivElement;
    optionHTMLObject?: HTMLDivElement;
    toolBoxItemStatus: ToolBoxItemStatusInterface;
    checkToolBoxItemStatus(itemName: string): boolean;
    switchToolBoxItemStatus(itemName: string): void;
    createToolboxHtmlObject(): ToolBoxInterface;
    createToolBoxItem(name: string, toolBoxContainer: any, imagePath?: string): ToolBoxItemInterface;
    createNewPolyLineItemButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createSelectionToolItemButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createBothLayerSelectionToolItemButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createMouseRectangleSelectionToolItemButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createEraserItemButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createAddCommentButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createAddBookmarkButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createMoveObjectInDivButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    createTextToolItemButton(toolBoxHtmlObject: any): ToolBoxItemInterface;
    activateButtonFunction(toolBoxItem: any, itemName: string): void;
    registerSvg(svgLayer: any): void;
}
export declare function getAttributeController(toolBoxItemStatus: any, itemName: string): Element | null;
export declare function changeSvgEventPointer(type: string, pointerEventOption: string): void;
export {};
