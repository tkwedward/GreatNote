export interface CommunicatorControllerInterface extends HTMLDivElement {
    selfSocketId: string;
    createRow(userId: string): void;
    deleteRow(userId: string): void;
    update(message: any): void;
    classList: any;
}
export declare function createCommunicationPanel(socketData: any): void;
