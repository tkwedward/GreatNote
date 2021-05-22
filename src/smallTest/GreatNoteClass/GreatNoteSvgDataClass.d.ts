import { CreateGreatNoteObjectInterface, GNSvgContainerInterface, GNSvgCircleInterface, GNSvgRectInterface, GNSvgLineInterface, GNSvgPolyLineInterface, GNSvgImageInterface } from "./GreatNoteObjectInterface";
export declare function GNSvg(createData: CreateGreatNoteObjectInterface): GNSvgContainerInterface;
export declare function GNSvgCircle(createData: CreateGreatNoteObjectInterface): GNSvgCircleInterface;
export declare function GNSvgRect(name: string, arrayID: string, insertPosition?: number | boolean, dataPointer?: string | boolean, saveToDatabase?: boolean): GNSvgRectInterface;
export declare function GNSvgLine(name: string, arrayID: string, insertPosition?: number | boolean, dataPointer?: string | boolean, saveToDatabase?: boolean): GNSvgLineInterface;
export declare function GNSvgPolyLine(createData: CreateGreatNoteObjectInterface): GNSvgPolyLineInterface;
export declare function GNSvgImage(name: string, arrayID?: string, insertPosition?: number | boolean, dataPointer?: string | boolean, saveToDatabase?: boolean): GNSvgImageInterface;
