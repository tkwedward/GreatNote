import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface";
export declare function getAllPageAnnotation(currentPage: any, checkedArray?: any): {
    pageNumber: any;
    currentPageAnnotationData: {};
} | undefined;
export declare function buildAnnotationPage(mainController: MainControllerInterface): (HTMLButtonElement | HTMLDivElement)[];
export declare function renderAnnotationPage(currentPageAnnotationData: any, annotationPageContentWrapper: HTMLDivElement): void;
