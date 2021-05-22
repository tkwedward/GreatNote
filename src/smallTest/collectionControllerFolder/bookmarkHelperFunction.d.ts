export interface BookmarkTreeInterface {
    root: any;
    buildBookmarkTree(bookmarkArray: any): void;
}
export declare function transverseLinkList(): void;
export declare class BookmarkTree implements BookmarkTreeInterface {
    root: any;
    constructor();
    reorderNode(node: any): void;
    addBookmarkItem(item: any): void;
    findNode(indexArray: number[], node?: any): any;
    buildBookmarkTree(bookmarkArray: any): void;
}
export declare function getLastIndexOfBookmark(indexString: string | number): number;
export declare function linkListNode(index: number): {
    next: any;
    previous: any;
    index: number;
};
export declare function buildBookmarkItem(data: any): {
    index: any;
    name: string;
    _identity: string;
    parent: null;
    head: {
        previous: null;
        next: null;
    };
    childrenArray: {
        head: any;
        tail: any;
    };
};
