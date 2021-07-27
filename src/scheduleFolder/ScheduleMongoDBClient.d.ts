import { MongoClient, Collection } from "mongodb";
export interface MongoBackEndInterface {
    connect(): any;
    disconnect(): void;
    client: MongoClient;
    createNewNoteBook(notebookInfo: any): void;
    deleteNoteBook(notebookID: string): void;
    initializeFirstNotebook(notebookID: string): any;
    testConnection(): void;
    getOverallNotebookData(): any;
    recursiveGetChildNodeData(collection: Collection, nodeData: any, level?: number): any;
    savePageChangeToDatabase(connection: Collection, newPageOrderArray: string[]): any;
    getItem(collection: Collection, databaseMessage: any): void;
    createItem(collection: Collection, databaseMessage: any): void;
    updateItem(collection: Collection, databaseMessage: any): void;
}
export declare class MongoBackEnd implements MongoBackEndInterface {
    mongoUrl: string;
    client: any;
    collection: any;
    constructor();
    testConnection(): Promise<any>;
    createNewNoteBook(notebookInfo: {
        notebookID: string;
        notebookName: string;
    }): Promise<void>;
    getItem(collection: Collection, databaseMessage: any): Promise<any>;
    createItem(collection: Collection, databaseMessage: any): Promise<void>;
    updateItem(collection: Collection, databaseMessage: any): Promise<void>;
    deleteItem(collection: any, databaseMessage: any): Promise<void>;
    microUpdate(collection: any, databaseMessage: any): Promise<void>;
    createDatabaseMessage(action: string, htmlObjectData: any): {
        htmlObjectData: any;
        metaData: {
            action: string;
            insertPosition: null;
            parentAccessPointer: any;
            accessPointer: any;
            dataPointer: any;
        };
    };
    recursiveGetChildNodeData(collection: any, nodeData: any, level: any): Promise<any>;
    getChildNodeData(collection: any, nodeData: any): Promise<any>;
    savePageChangeToDatabase(collection: Collection, newPageOrderArray: string[]): Promise<void>;
    getInitializeNotebookData(collection: any): Promise<any>;
    connect(): Promise<void>;
    disconnect(): Promise<any>;
}
