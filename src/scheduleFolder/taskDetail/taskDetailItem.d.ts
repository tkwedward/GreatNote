import { ProjectItemInterface, TaskItemInterface } from "./taskItemInterface";
export declare function createTaskDetailPage(): void;
export declare class ProjectItem implements ProjectItemInterface {
    name: string;
    type: string;
    uniqueID: string;
    description: string;
    status: string;
    date: string;
    reward: number;
    taskArray: TaskItemInterface[];
    hashString: string;
    static createDummyHtmlObject(): [HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLSelectElement, HTMLButtonElement, HTMLDivElement, HTMLButtonElement];
    constructor(jsonObject: {
        name?: string;
        type?: string;
        uniqueID?: string;
        description?: string;
        status?: string;
        date?: string;
        reward?: number;
        taskArray?: TaskItemInterface[];
    });
    addItem(taskItem: TaskItemInterface): void;
    renderHTMLObject(): HTMLDivElement;
    removeItem(taskItemUniqueID: string): void;
    save(): {
        name: string;
        type: string;
        uniqueID: string;
        description: string;
        status: string;
        date: string;
        reward: number;
        taskArray: string[];
    };
}
export declare class TaskItem implements TaskItemInterface {
    name: string;
    type: string;
    uniqueID: string;
    description: string;
    status: string;
    date: string;
    reward: number;
    static createDummyHtmlObject(): [HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLSelectElement, HTMLButtonElement];
    constructor(jsonObject: {
        name: string;
        type: string;
        uniqueID: string;
        description: string;
        status: string;
        date: string;
        reward: number;
    });
    save(): {
        name: string;
        type: string;
        uniqueID: string;
        description: string;
        status: string;
        date: string;
        reward: number;
    };
    renderHTMLObject(): HTMLDivElement;
}
