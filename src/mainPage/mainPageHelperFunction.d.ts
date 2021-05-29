export declare function selectContainerFunction(selectionDiv: any): (e: MouseEvent) => void;
export declare function createNotebookController(askUserInputDiv: HTMLDivElement, notebookContainerWrapper: HTMLDivElement, socket: any): [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement, HTMLButtonElement];
export declare function createNotebookItem(notebookID: string, notebookName?: string): HTMLDivElement;
export declare function askUserInput(): void;
export declare function createUniqueID(): string;
