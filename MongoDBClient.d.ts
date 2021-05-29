import { MongoClient, Collection } from "mongodb";
export interface MongoBackEndInterface {
    connect(): any;
    disconnect(): void;
    initializeFirstNotebook(): any;
    processDatabaseMessage(collection: Collection, databaseMessage: any): any;
    testConnection(): void;
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
    createEmptyNotebook(collection: any): Promise<void>;
    initializeFirstNotebook(): Promise<any>;
    getItem(collection: Collection, databaseMessage: any): Promise<any>;
    createItem(collection: Collection, databaseMessage: any): Promise<void>;
    updateItem(collection: Collection, databaseMessage: any): Promise<void>;
    deleteItem(collection: any, databaseMessage: any): Promise<void>;
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
    getChildNodeData(collection: any, nodeData: any): Promise<any>;
    getInitializeNotebookData(collection: any): Promise<any>;
    connect(): Promise<MongoClient>;
    disconnect(): Promise<any>;
}
