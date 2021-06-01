import { choiceController, dropdownListController, inputFieldAndDropdownListController } from "./basicControllerType";
import { universalControllerCreater, superController } from "./attributeControllerHelperFunction";
import * as ToolBoxHelperFunction from "../ToolboxFolder/toolBoxHelperFunction";
export function createPolylineController() {
    let polylineControllerContainer = document.createElement("div");
    polylineControllerContainer.classList.add("polylineController");
    polylineControllerContainer.targetHTMLType = "polyline";
    // color controller
    let colorTemplate = document.createElement("div");
    colorTemplate.style.display = "inline-block";
    colorTemplate.style["width"] = "30px";
    colorTemplate.style["height"] = "30px";
    colorTemplate.style["margin"] = "5px";
    let polylineStrokeColorController = choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorTemplate);
    polylineStrokeColorController.classList.add("polylineColorController");
    let polylineStrokeWidthController = universalControllerCreater("widthController", {
        attributeName: "width",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    });
    polylineStrokeWidthController.classList.add("polylineStrokeWidthController");
    polylineStrokeWidthController.querySelector("input").value = "2";
    polylineControllerContainer.controllerArray = [polylineStrokeColorController, polylineStrokeWidthController];
    polylineControllerContainer.append(...polylineControllerContainer.controllerArray);
    polylineControllerContainer.extract = function () {
        let strokeColor = polylineStrokeColorController.extract();
        let strokeWidth = polylineStrokeWidthController.extract();
        return [strokeColor, strokeWidth];
    };
    superController(polylineControllerContainer);
    return polylineControllerContainer;
}
export function createDivControllerContainer() {
    let divControllerContainer = document.createElement("div");
    divControllerContainer.classList.add("divController");
    divControllerContainer.targetHTMLType = "DIV";
    // color controller
    let colorSquare = document.createElement("div");
    colorSquare.style.display = "inline-block";
    colorSquare.style["width"] = "50px";
    colorSquare.style["height"] = "50px";
    colorSquare.style["margin"] = "10px";
    let backgroundColorController = choiceController("background", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare);
    // width Controller
    let widthController = universalControllerCreater("widthController", {
        attributeName: "width",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    });
    let heightController = universalControllerCreater("widthController", {
        attributeName: "height",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    });
    let positionController = universalControllerCreater("positionController", {
        attributeName: "position",
        selectionList: ["none", "relative", "absolute"],
        controllerType: dropdownListController
    });
    divControllerContainer.controllerArray = [widthController, heightController, positionController, backgroundColorController];
    divControllerContainer.append(...divControllerContainer.controllerArray);
    superController(divControllerContainer);
    return divControllerContainer;
}
export function createSvgCircleControllerContainer() {
    let svgCircleContainer = document.createElement("div");
    svgCircleContainer.classList.add("svgCircleContainer");
    svgCircleContainer.targetHTMLType = "circle";
    let radiusController = inputFieldAndDropdownListController("r", ["px", "vw", "%"]);
    let circleCenterXController = universalControllerCreater("cxController", {
        attributeName: "cx",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    });
    let circleCenterYController = universalControllerCreater("cyController", {
        attributeName: "cy",
        unitOptions: ["px", "vw", "%"],
        controllerType: inputFieldAndDropdownListController
    });
    let colorSquare = document.createElement("div");
    colorSquare.style.display = "inline-block";
    colorSquare.style["width"] = "50px";
    colorSquare.style["height"] = "50px";
    colorSquare.style["margin"] = "10px";
    let fillController = choiceController("fill", ["red", "blue", "green", "black", "yellow", "grey", "gold", "silver", "pink"], colorSquare);
    svgCircleContainer.controllerArray = [radiusController, circleCenterXController, circleCenterYController, fillController];
    svgCircleContainer.append(...svgCircleContainer.controllerArray);
    superController(svgCircleContainer);
    return svgCircleContainer;
} // createSvgCircleControllerContainer
export function createSelectionToolController(mainController) {
    let selectionToolControllerContainer = document.createElement("div");
    selectionToolControllerContainer.classList.add("penSelectionToolController");
    selectionToolControllerContainer.copyDataArray = [];
    let copyButton = document.createElement("button");
    copyButton.innerText = "copy";
    copyButton.addEventListener("click", function () {
        let selectionPolyline = document.querySelector(".selectionPolyline");
        selectionToolControllerContainer.copyDataArray = selectionPolyline === null || selectionPolyline === void 0 ? void 0 : selectionPolyline.selectedObjectArray.map((p) => p.extract());
        selectionToolControllerContainer.selectionRectInfo = createSelectionRectInformation(selectionPolyline);
        selectionPolyline.remove();
    });
    let cutButton = document.createElement("button");
    cutButton.innerText = "cut";
    cutButton.addEventListener("click", function () {
        selectionToolControllerContainer.copyDataArray = [];
        let selectionPolyline = document.querySelector(".selectionPolyline");
        selectionToolControllerContainer.copyDataArray = selectionPolyline === null || selectionPolyline === void 0 ? void 0 : selectionPolyline.selectedObjectArray.map((p) => {
            let polylineData = p.extract();
            p.deleteFromDatabase();
            return polylineData;
        });
        selectionToolControllerContainer.selectionRectInfo = createSelectionRectInformation(selectionPolyline);
        selectionPolyline.remove();
    });
    let pasteButton = document.createElement("button");
    pasteButton.innerText = "paste";
    pasteButton.addEventListener("click", function () {
        duplicateSvgData(mainController, selectionToolControllerContainer);
        selectionToolControllerContainer.copyDataArray = [];
    });
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", function () {
        let selectionPolyline = document.querySelector(".selectionPolyline");
        selectionPolyline.selectedObjectArray.forEach((p) => p.remove());
        selectionPolyline.remove();
    });
    selectionToolControllerContainer.append(copyButton, cutButton, pasteButton, deleteButton);
    return selectionToolControllerContainer;
}
function duplicateSvgData(mainController, selectionToolControllerContainer, removeOriginalData = false) {
    var _a;
    let currentPageSvgLayer = document.querySelector(".currentPage svg");
    let copiedItemArray = [];
    (_a = selectionToolControllerContainer.copyDataArray) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
        let newHTMLObject;
        if (p.GNType == "GNSvgPolyLine") {
            newHTMLObject = mainController.createGNObjectThroughName("GNSvgPolyLine", { name: "", arrayID: currentPageSvgLayer.getAccessPointer(), saveToDatabase: true, injectedData: p });
            copiedItemArray.push(newHTMLObject);
            currentPageSvgLayer.append(newHTMLObject);
        }
    });
    let selectionPolyline = document.querySelector(".selectionPolyline");
    let selectionRectInfo = selectionToolControllerContainer.selectionRectInfo;
    // currentPageSvgLayer.svgController.rect()
    createMovableSelectionRect(currentPageSvgLayer, selectionRectInfo, copiedItemArray);
    selectionPolyline === null || selectionPolyline === void 0 ? void 0 : selectionPolyline.remove();
    selectionToolControllerContainer.copyDataArray = [];
}
function createSelectionRectInformation(selectionPolyline) {
    let polylinePoints = selectionPolyline.soul.array().value;
    let firstPoint = polylinePoints[0];
    let rectInfo = { x0: firstPoint[0], y0: firstPoint[1], x1: firstPoint[1], y1: firstPoint[1] };
    polylinePoints.forEach((p) => {
        let x = p[0];
        let y = p[1];
        if (x < rectInfo.x0)
            rectInfo.x0 = x;
        if (y < rectInfo.y0)
            rectInfo.y0 = y;
        if (x > rectInfo.x1)
            rectInfo.x1 = x;
        if (y > rectInfo.y1)
            rectInfo.y1 = y;
    });
    rectInfo["x0"] -= 50;
    rectInfo["y0"] -= 50;
    rectInfo["x1"] += 50;
    rectInfo["y1"] += 50;
    let width = rectInfo["x1"] - rectInfo["x0"];
    let height = rectInfo["y1"] - rectInfo["y0"];
    return rectInfo;
}
function createMovableSelectionRect(currentPageSvgLayer, selectionRectInfo, copiedItemArray) {
    let width = selectionRectInfo["x1"] - selectionRectInfo["x0"];
    let height = selectionRectInfo["y1"] - selectionRectInfo["y0"];
    let selectionRect = currentPageSvgLayer.svgController.rect(width, height);
    selectionRect.x(selectionRectInfo["x0"]);
    selectionRect.y(selectionRectInfo["y0"]);
    selectionRect.attr({ "stroke": "blue", "stroke-width": "2px" });
    selectionRect.node.classList.add("selectionRectForCopyAndPaste");
    selectionRect.node.style.fillOpacity = 0;
    selectionRect.node.style.strokeDasharray = "5px";
    selectionRect.node.addEventListener("touchstart", (e) => {
        e.stopPropagation();
        e.preventDefault();
        // to get the initial points of the polyline
        let polylineIntialArray = copiedItemArray.map((p) => ({
            polylineObject: p,
            initialPoints: p.soul.array().value
        }));
        let [initialX, initialY, touchIsPen] = ToolBoxHelperFunction.getOffSetXY(e);
        let [currentX, currentY] = [0, 0];
        let [deltaX, deltaY] = [0, 0];
        let initialRectX = selectionRect.node.x.baseVal.value;
        let initialRectY = selectionRect.node.y.baseVal.value;
        let block = false;
        let touchmoveFunction = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (block)
                return;
            block = true;
            setTimeout(() => { block = false; }, 100);
            [currentX, currentY, touchIsPen] = ToolBoxHelperFunction.getOffSetXY(e);
            [deltaX, deltaY] = [currentX - initialX, currentY - initialY];
            polylineIntialArray.map((p) => {
                p.polylineObject.soul.plot(p.initialPoints.map((q) => [q[0] + deltaX, q[1] + deltaY]));
                p.polylineObject.saveHTMLObjectToDatabase();
            });
            selectionRect.x(initialRectX + deltaX);
            selectionRect.y(initialRectY + deltaY);
        };
        let touchendFunction = (e) => {
            e.stopPropagation();
            selectionRect.node.removeEventListener("touchmove", touchmoveFunction);
            selectionRect.node.removeEventListener("touchend", touchendFunction);
        };
        selectionRect.node.addEventListener("touchmove", touchmoveFunction);
        selectionRect.node.addEventListener("touchend", touchendFunction);
    });
}
function createSelectObjectAttributeController() {
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("selectObjectDeleteButton");
    deleteButton.addEventListener("click", e => {
        // document.querySelector("selectedObject")
    });
}
