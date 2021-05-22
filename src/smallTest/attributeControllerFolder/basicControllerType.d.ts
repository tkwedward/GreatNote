import { ChoiceControllerInterface, ControllerInterface, DropdownListControllerInterface } from "./attributeControllerInterface";
export declare function inputFieldAndDropdownListController(attributeName: string, unitOptions: any): ControllerInterface;
export declare function dropdownListController(attributeName: string, selectionList: string[]): DropdownListControllerInterface;
export declare function choiceController(attribute: string, choiceList: any, prototype: HTMLElement): ChoiceControllerInterface;
