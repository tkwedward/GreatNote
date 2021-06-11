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
    showMainDocButton: HTMLButtonElement;
    showAnnotationButton: HTMLButtonElement;
    annotationPage: Element | null;
    scaleController: HTMLDivElement;
};
export declare function buildToolBoxHtmlObject(mainController: any): any;
export declare function buildPageController(mainController: MainControllerInterface, bookmarkSubPanelContent: HTMLDivElement, fullPageModeDiv: HTMLDivElement, overviewModeDiv: HTMLDivElement, pageContentContainer: HTMLDivElement): void;
export declare function buildInitialHTMLSkeleton(mainController: MainControllerInterface): void;
export declare function buildInitialPage(mainController: MainControllerInterface, saveToDatabase?: boolean): void;
export declare function getPageDataFromServer(mainController: MainControllerInterface, pageID: string): void;
export declare function attachEvents(mainController: MainControllerInterface, pageContentContainer: HTMLDivElement): void;
