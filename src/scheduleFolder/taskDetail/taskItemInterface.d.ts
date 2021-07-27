export interface ProjectItemInterface {
    name: string;
    type: string;
    uniqueID: string;
    description: string;
    status: string;
    date: string;
    reward: number;
    hashString: string;
    taskArray: TaskItemInterface[];
    addItem(taskItem: TaskItemInterface): void;
    removeItem(taskItemUniqueID: string): void;
}
export interface TaskItemInterface {
    data: {
        name: string;
        type: string;
        record: string;
        description: string;
        status: string;
        date: string;
        reward: number;
    };
    uniqueID: string;
}
export interface getDataMessageInterface {
    uniqueIDArray: string[];
}
export interface createDataMessageInerface {
    newObjectData: any;
    metaData: {
        parentIdentifier: string;
    };
}
export interface deleteDataMessageInterface {
    objectData: any;
    metaData: {
        parentIdentifier: string;
    };
}
export interface updateDataMessageInerface {
    objectData: any;
}
