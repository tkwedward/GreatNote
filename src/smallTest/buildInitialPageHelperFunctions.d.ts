import { MainControllerInterface } from "./mainControllerFolder/mainControllerInterface";
export declare function createGNDataStructureMapping(mainController: MainControllerInterface): void;
export declare function getImportantDivFromHTML(mainController: MainControllerInterface): {
    pageArrayID: any;
    panelContainer: HTMLDivElement;
    pageContentContainer: Element | null;
    fullPageModeDiv: HTMLDivElement;
    overviewModeDiv: HTMLDivElement;
    bookmarkSubPanelNavbarTitle: HTMLDivElement;
    bookmarkSubPanelContent: HTMLDivElement;
};
export declare function buildPageControllerButtonArray(mainController: MainControllerInterface): {
    pageControllerSubPanelNavbarTitle: HTMLDivElement;
    pageControllerSubPanelContent: HTMLDivElement;
    testFieldButton: HTMLButtonElement;
    copyButton: any;
    linkButton: any;
    deleteButton: any;
    showMainDocButton: HTMLButtonElement;
    resetButton: HTMLButtonElement;
};
export declare function buildToolBoxHtmlObject(mainController: any): any;
export declare function buildPageController(mainController: any, bookmarkSubPanelContent: any, fullPageModeDiv: any, overviewModeDiv: any, pageContentContainer: any): void;
export declare function buildInitialHTMLSkeleton(mainController: MainControllerInterface): void;
export declare function buildInitialPage(mainController: MainControllerInterface, saveToDatabase?: boolean): void;
export declare function attachEvents(mainController: any, pageContentContainer: any): void;
