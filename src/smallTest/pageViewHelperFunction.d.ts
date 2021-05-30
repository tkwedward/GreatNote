export declare function shortNotice(noticeText: string): void;
export declare function subPanelTab(panelClassName: string): any[];
export declare function createSubPanel(name: string): HTMLDivElement[];
export declare function createSubPanelItem(name: string): HTMLDivElement;
export declare function functionButtonCreater(name: string, buttonFunction: () => void): HTMLDivElement;
export declare function createSwitchViewModeButton(fullPageModeDiv: HTMLDivElement, overviewModeDiv: HTMLDivElement): HTMLButtonElement;
export declare function createNewPage(pageController: any, fullPageModeDiv: HTMLDivElement, fullPageData?: any, saveToDatabase?: boolean, insertPosition?: boolean): HTMLDivElement;
export declare function insertNewPage(pageController: any, newFullPage: HTMLDivElement, fullPageModeDiv: HTMLDivElement): void;
export declare function createNewPageEvent(currentStatus: any, fullPageModeDiv: HTMLDivElement, pageDummyContent: any, htmlObject?: HTMLElement | HTMLDivElement): () => void;
