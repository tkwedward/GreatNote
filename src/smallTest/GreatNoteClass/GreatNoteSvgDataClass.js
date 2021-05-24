import SVG from "svg.js";
import { superGNObject } from "./GreateNoteObjectHelperFunction";
function createDummyData() {
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
        "stylesheet": {}
    };
}
//@auto-fold here
export function GNSvg(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, _classNameList } = createData;
    let svgDivContainer = document.createElement("div");
    svgDivContainer.id = "testSvgDiv";
    let svgController = SVG(svgDivContainer);
    let svgBoard = svgController.node;
    svgBoard.svgController = svgController;
    svgBoard.GNType = "GNSvg";
    svgBoard._name = name;
    svgBoard._dataStructure = [];
    svgBoard._styleStructure = ["width", "height", "background", "position", "left", "top"];
    svgBoard._classNameList = _classNameList || [];
    _classNameList === null || _classNameList === void 0 ? void 0 : _classNameList.forEach(p => {
        svgBoard.classList.add(p);
    });
    // // functions
    // svgObject.loadFromData = (data)=>{ svgObject.value = data }
    svgBoard.appendToContainer = function (parent) {
        parent.appendChild(svgDivContainer);
    };
    svgBoard.applyStyle = function (stylesheet) {
        Object.entries(stylesheet).forEach(([key, value], _) => {
            svgBoard["style"][key] = value;
        });
    };
    svgBoard.createDataObject = function () {
        var _a, _b;
        let dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgBoard.GNType;
        if (svgBoard._identity)
            dataObject["_identity"] = svgBoard._identity;
        dataObject["_classNameList"] = Array.from(svgBoard.classList);
        (_a = svgBoard === null || svgBoard === void 0 ? void 0 : svgBoard._dataStructure) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            dataObject["data"][p] = svgBoard[p];
        });
        // stylesheet data
        (_b = svgBoard === null || svgBoard === void 0 ? void 0 : svgBoard._styleStructure) === null || _b === void 0 ? void 0 : _b.forEach((p) => {
            dataObject["stylesheet"][p] = svgBoard["style"][p];
        });
        return dataObject;
    };
    svgBoard.loadFromData = function (data) {
        svgBoard.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
        svgBoard.specialGNType = data.specialGNType;
        if (data._classNameList)
            data._classNameList.forEach((p) => svgBoard.classList.add(p));
        svgBoard._identity = data._identity;
        svgBoard.setAttribute("accessPointer", data._identity.accessPointer);
        svgBoard.applyStyle(data.stylesheet);
    };
    //
    svgBoard.extract = () => svgBoard.createDataObject();
    // add extra funcitons to the object
    superGNObject(svgBoard, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData);
    if (injectedData) {
        svgBoard.identity = injectedData._identity;
        svgBoard.setAttribute("accessPointer", svgBoard.identity.accessPointer);
        svgBoard.objectData = injectedData;
        if (injectedData._classNameList && injectedData._classNameList.length > 0) {
            injectedData._classNameList.forEach((p) => svgBoard.classList.add(p));
        }
    }
    return svgBoard;
}
//@auto-fold here
export function GNSvgCircle(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase } = createData;
    let svgObjectSoul = new SVG.Circle();
    svgObjectSoul.radius(75);
    svgObjectSoul.fill("red");
    let svgObject = svgObjectSoul.node;
    svgObject.soul = svgObjectSoul;
    svgObject.GNType = "GNSvgCircle";
    svgObject._name = name;
    svgObject._dataStructure = ["cx", "cy", "r"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = (_GNData) => {
        svgObject.style["cx"] = parseInt(_GNData["data"]["cx"]) + 200;
        svgObject.style["cy"] = parseInt(_GNData["data"]["cy"]);
        svgObject.style["r"] = parseInt(_GNData["data"]["r"]);
    };
    svgObject.createDataObject = function () {
        let dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgObject.GNType;
        if (svgObject["_identity"])
            dataObject["_identity"] = svgObject["_identity"];
        dataObject["data"]["cx"] = svgObject.style["cx"];
        dataObject["data"]["cy"] = svgObject.style["cy"];
        dataObject["data"]["r"] = svgObject.style["r"];
        // stylesheet data
        svgObject._styleStructure.forEach((p) => {
            dataObject["stylesheet"][p] = svgObject["style"][p];
        });
        return dataObject;
    };
    svgObject.extract = () => svgObject.createDataObject();
    svgObject.applyStyle = function (attrList) {
        svgObjectSoul.attr(attrList);
    };
    svgObject.appendTo = function (parentSVGContainer) {
        //self.targetPage.svgNode.appendChild(eraser.node)
        parentSVGContainer.svgNode.appendChild(svgObject.node);
    };
    // add extra funcitons to the object
    superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer);
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
// ==============
//@auto-fold here
export function GNSvgRect(name, arrayID, insertPosition, dataPointer, saveToDatabase = true) {
    let svgObject = new SVG.Rect();
    svgObject.GNType = GNSvgRect.name;
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = (data) => { svgObject = data; };
    svgObject.extract = () => svgObject.createDataObject();
    svgObject.applyStyle = function (attrList) {
        Object.entries(attrList).forEach(([key, value], _) => {
            svgObject.node.style[key] = value;
        });
    };
    // add extra funcitons to the object
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
//@auto-fold here
export function GNSvgLine(name, arrayID, insertPosition, dataPointer, saveToDatabase = true) {
    let svgObject = new SVG.Line();
    svgObject.GNType = GNSvgLine.name;
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = (data) => { svgObject = data; };
    svgObject.extract = () => svgObject.createDataObject();
    svgObject.applyStyle = function (attrList) {
        svgObject.plot(attrList["points"]);
        svgObject.attr(attrList["attribute"]);
    };
    // add extra funcitons to the object
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
//@auto-fold here
export function GNSvgPolyLine(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData } = createData;
    let svgObjectSoul = SVG(document.createElement("polyline")).polyline([0, 0, 0, 0]);
    let svgObject = svgObjectSoul.node;
    svgObject.soul = svgObjectSoul;
    svgObject.GNType = GNSvgPolyLine.name;
    svgObject._name = name;
    svgObject._dataStructure = ["points"];
    svgObject._styleStructure = ["stroke", "stroke-width", "fill"];
    // functions
    svgObject.loadFromData = (injectedData) => {
        svgObject.soul.plot(injectedData["data"]["points"]);
        svgObject.applyStyle(injectedData["stylesheet"]);
    };
    svgObject.createDataObject = function () {
        let dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = svgObject.GNType;
        if (svgObject._identity)
            dataObject["_identity"] = svgObject._identity;
        dataObject["data"]["points"] = svgObject.soul.array().value.toString();
        // stylesheet data
        dataObject["stylesheet"]["stroke"] = svgObject["style"]["stroke"];
        dataObject["stylesheet"]["stroke-width"] = svgObject["style"]["stroke-width"];
        dataObject["stylesheet"]["fill"] = svgObject["style"]["fill"];
        return dataObject;
    };
    svgObject.extract = () => svgObject.createDataObject();
    svgObject.applyStyle = function (attrList) {
        svgObject._styleStructure.forEach((p) => {
            if (p == "fill") {
                svgObject["style"]["fill"] = attrList["fill"] || "none";
            }
            else {
                svgObject["style"][p] = attrList[p];
            }
        });
    };
    // to share same data function
    superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData);
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    // add extra funcitons to the object
    if (injectedData) {
        svgObject.loadFromData(injectedData);
        svgObject.applyStyle(injectedData.stylesheet, false); //
        if (svgObject._classNameList && svgObject._classNameList.length > 0) {
            svgObject._classNameList.forEach((p) => svgObject.classList.add(p));
        }
        svgObject.identity = injectedData._identity;
        svgObject.setAttribute("accessPointer", svgObject.identity.accessPointer);
        svgObject.objectData = injectedData;
    }
    return svgObject;
} //GNSvgPolyLine
//@auto-fold here
export function GNSvgImage(name, arrayID, insertPosition, dataPointer, saveToDatabase = true) {
    let svgObject = SVG(document.createElement("image")).image();
    svgObject.setImgSrc = function (src) {
        svgObject.load(src);
    };
    svgObject.GNType = "GNSvgImage";
    svgObject._name = name;
    svgObject._dataStructure = ["value"];
    svgObject._styleStructure = [];
    // functions
    svgObject.loadFromData = (data) => { svgObject = data; };
    svgObject.extract = () => svgObject.createDataObject();
    svgObject.applyStyle = function (attrList) {
        svgObject.attr(attrList["attribute"]);
    };
    // add extra funcitons to the object
    // superGNObject(svgObject, saveToDatabase, arrayID, insertPosition, dataPointer)
    SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase);
    return svgObject;
}
function SuperSVG(svgObject, arrayID, insertPosition, dataPointer, saveToDatabase) {
    svgObject.appendTo = function (parentSVGContainer) {
        svgObject.soul.addTo(parentSVGContainer.svgController);
    };
}
