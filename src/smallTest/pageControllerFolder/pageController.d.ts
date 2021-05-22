import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export interface pageControllerInterface {
    startPage: any;
    endPage: any;
    currentPage: any;
    totalPageNumber: any;
    EventReceiver: HTMLElement;
    fullPageSize: [number, number];
    overviewPageSize: [number, number];
    selectedObject: any;
    pagNumberInput: HTMLInputElement;
    addPage(fullPageHTMLObject: HTMLDivElement, smallViewHTMLObject?: HTMLDivElement): void;
    deletePage(targetPage: any): void;
    getPage(pageNumber: number): any;
    goToPage(pageNumber: number): void;
    exchangePage(page1: any, page2: any): void;
    updatePageNumber(initialPage: any): void;
    printAllPage(): void;
    updateCurrentPage(previousCurrentPageHTMLObject: HTMLDivElement, newCurrentPageHTMLObject: HTMLDivElement): void;
    transvereList(actionFunction: any): void;
    getPageNumberFromPageID(accessPointer: string): number;
}
export declare function initializePageController(mainController: MainControllerInterface): pageControllerInterface;
export declare function pageControllerHTMLObject(pageController: any, subPanelContainer: HTMLDivElement): void;
export declare function highlightCurrentPageInOverviewMode(smallPageView: HTMLDivElement, currentPageNumber: number, currentStatus: any): void;
