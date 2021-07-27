import { mainController } from "../index";
let iconName = {
    bothLayerSelectionTool: "/graphics/toolBox/bothLayerSelectionTool.png",
    rectangleSelectionTool: "/graphics/toolBox/rectangleSelection.png",
    penSelectionTool: "/graphics/toolBox/penSelection.png",
    eraserTool: "/graphics/toolBox/eraserTool.png",
    commentTool: "/graphics/toolBox/commentTool.png",
    movableTool: "/graphics/toolBox/movableTool.png",
    penTool: "/graphics/toolBox/penTool.png",
    textTool: "/graphics/toolBox/textTool.png",
    textBox: "/graphics/toolBox/textBox.png"
};
export class ToolBoxClass {
    constructor() {
        this.itemArray = []; // to mark the status of the button
        this.currentActiveEventFunction = (e) => { };
        this.currentActiveEventName = "";
        //  check the item status
        this.toolBoxItemStatus = {
            currentActiveButton: "",
            polylineItemButton: {
                status: false,
                attributeController: "polylineController"
            },
            eraserItemButton: {
                status: false,
                attributeController: "eraserToolController"
            },
            selectionToolItemButton: {
                status: false,
                attributeController: "penSelectionToolController"
            },
            rectangleSelectionToolItemButton: {
                status: false,
                attributeController: "rectangleSelectionToolController"
            },
            addCommentItemButton: {
                status: false,
                attributeController: "addCommentController"
            },
            moveObjectInDivButton: {
                status: false,
                attributeController: "moveObjectInDivController"
            },
            addBookmarkButton: {
                status: false,
                attributeController: "addBookmarkController"
            },
            textToolItemButton: {
                status: false,
                attributeController: "textToolController"
            },
            textBoxItemButton: {
                status: false,
                attributeController: "textBoxController"
            },
            bothLayerSelectionToolItemButton: {
                status: false,
                attributeController: "bothLayerSelectionToolController"
            }
        };
    }
    checkToolBoxItemStatus(itemName) {
        return this.toolBoxItemStatus[itemName]["status"];
    }
    switchToolBoxItemStatus(itemName) {
        // turn off the attributeController and status of the buttom thaat is active
        let currentActiveButton = this.toolBoxItemStatus.currentActiveButton;
        if (currentActiveButton) {
            // switch off the current status
            this.toolBoxItemStatus[currentActiveButton]["status"] = !this.toolBoxItemStatus[currentActiveButton]["status"];
            // console.log(949494, currentActiveButton)
            // turn off attributeControllerWant
            let attributeControllerWantToTurnedOff = getAttributeController(this.toolBoxItemStatus, currentActiveButton);
            if (attributeControllerWantToTurnedOff)
                attributeControllerWantToTurnedOff["style"].display = "none";
        }
        this.toolBoxItemStatus.currentActiveButton = itemName;
        this.toolBoxItemStatus[itemName]["status"] = !this.toolBoxItemStatus[itemName]["status"];
        // turn on attributeControllerWantToturn on
        let attributeControllerWantToTurnedOn = getAttributeController(this.toolBoxItemStatus, itemName);
        console.log(attributeControllerWantToTurnedOn);
        if (attributeControllerWantToTurnedOn)
            attributeControllerWantToTurnedOn["style"].display = "block";
    }
    createToolboxHtmlObject() {
        let self = this;
        let toolBoxContainer = document.createElement("div");
        toolBoxContainer.classList.add("toolBoxHtml");
        this.itemArray = [];
        let toolBoxSelectionHtmlObject = document.createElement("div");
        toolBoxSelectionHtmlObject.classList.add("toolBoxSelectionHtmlObject");
        let toolBoxOptionHtmlObject = document.createElement("div");
        toolBoxOptionHtmlObject.classList.add("toolBoxOption");
        toolBoxContainer.selectionHTMLObject = toolBoxSelectionHtmlObject;
        toolBoxContainer.optionHTMLObject = toolBoxOptionHtmlObject;
        toolBoxContainer.appendChild(toolBoxSelectionHtmlObject);
        return toolBoxContainer;
    }
    createToolBoxItem(name, toolBoxContainer, imagePath) {
        let toolBoxItem = document.createElement("div");
        // the html style part
        toolBoxItem.classList.add("toolBoxItem", name);
        if (imagePath) {
            let icon = document.createElement("img");
            icon.classList.add("toolBoxIcon");
            icon.src = imagePath;
            toolBoxItem.append(icon);
        }
        else {
            toolBoxItem.innerText = name[0];
        }
        let squreLength = "40px";
        toolBoxItem.style.width = squreLength;
        toolBoxItem.style.height = squreLength;
        // internaal variable part
        toolBoxItem.status = false;
        toolBoxItem.resetButton = function () {
            toolBoxItem.status = false;
        };
        toolBoxItem._parent = toolBoxContainer.selectionHTMLObject;
        this.itemArray.push(toolBoxItem);
        toolBoxItem.addEventListener(toolBoxItem.eventName, toolBoxItem.eventFunction);
        return toolBoxItem;
    }
    createNewPolyLineItemButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("PolyLine", toolBoxHtmlObject, iconName.penTool);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("polyline item button is activated");
            this.activateButtonFunction(toolBoxItem, "polylineItemButton");
        });
        toolBoxItem.activate = function () {
            changeSvgEventPointer("divLayer", "none");
        };
        toolBoxItem.deactivate = function () {
            changeSvgEventPointer("divLayer", "auto");
        };
        return toolBoxItem;
    }
    createSelectionToolItemButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("SelectionTool", toolBoxHtmlObject, iconName.penSelectionTool);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("Selection Tool item button is activated");
            this.activateButtonFunction(toolBoxItem, "selectionToolItemButton");
        });
        toolBoxItem.activate = function () {
            changeSvgEventPointer("divLayer", "none");
        };
        toolBoxItem.deactivate = function () {
            changeSvgEventPointer("divLayer", "auto");
        };
        return toolBoxItem;
    }
    createBothLayerSelectionToolItemButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("BothLayerSelectionTool", toolBoxHtmlObject, iconName.bothLayerSelectionTool);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("Selection Tool item button is activated");
            this.activateButtonFunction(toolBoxItem, "bothLayerSelectionToolItemButton");
        });
        return toolBoxItem;
    }
    createMouseRectangleSelectionToolItemButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("MouseRectangleSelectionTool", toolBoxHtmlObject, iconName["rectangleSelectionTool"]);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("Mouse Rectangle Selection Tool item button is activated");
            this.activateButtonFunction(toolBoxItem, "rectangleSelectionToolItemButton");
        });
        toolBoxItem.activate = function () {
            let pageOverlayArray = Array.from(document.querySelectorAll(".pageOverlay"));
            pageOverlayArray.forEach(p => {
                let parentElemnt = p.parentElement;
                parentElemnt.append(p);
                p.style.display = "block";
            });
            console.log(pageOverlayArray);
        };
        toolBoxItem.deactivate = function () {
            let pageOverlayArray = Array.from(document.querySelectorAll(".pageOverlay"));
            pageOverlayArray.forEach(p => {
                p.style.display = "none";
            });
        };
        return toolBoxItem;
    }
    createEraserItemButton(toolBoxHtmlObject) {
        // let self = this
        let toolBoxItem = this.createToolBoxItem("Eraser", toolBoxHtmlObject, iconName.eraserTool);
        toolBoxItem.addEventListener("click", e => {
            this.activateButtonFunction(toolBoxItem, "eraserItemButton");
        });
        toolBoxItem.activate = function () {
            changeSvgEventPointer("divLayer", "none");
        };
        toolBoxItem.deactivate = function () {
            changeSvgEventPointer("divLayer", "auto");
        };
        return toolBoxItem;
    }
    createAddCommentButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("AddComment", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", e => {
            this.activateButtonFunction(toolBoxItem, "addCommentItemButton");
        });
        return toolBoxItem;
    }
    createAddBookmarkButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("Bookmark", toolBoxHtmlObject, iconName.commentTool);
        toolBoxItem.addEventListener("click", e => {
            this.activateButtonFunction(toolBoxItem, "addBookmarkButton");
        });
        return toolBoxItem;
    }
    createMoveObjectInDivButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("MoveObjectInDiv", toolBoxHtmlObject, iconName.movableTool);
        toolBoxItem.addEventListener("click", e => {
            this.activateButtonFunction(toolBoxItem, "moveObjectInDivButton");
        });
        toolBoxItem.activate = function () {
            changeSvgEventPointer("svgLayer", "none");
        };
        toolBoxItem.deactivate = function () {
            changeSvgEventPointer("svgLayer", "auto");
        };
        return toolBoxItem;
    }
    createTextToolItemButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("textTool", toolBoxHtmlObject, iconName.textTool);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("Text Tool item button is activated");
            this.activateButtonFunction(toolBoxItem, "textToolItemButton");
        });
        toolBoxItem.activate = function () {
            changeSvgEventPointer("svgLayer", "none");
        };
        toolBoxItem.deactivate = function () {
            changeSvgEventPointer("svgLayer", "auto");
        };
        return toolBoxItem;
    }
    createTextBoxItemButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("textBox", toolBoxHtmlObject, iconName.textBox);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("Text Tool item button is activated");
            this.activateButtonFunction(toolBoxItem, "textBoxItemButton");
        });
        toolBoxItem.activate = function () {
            changeSvgEventPointer("svgLayer", "none");
        };
        toolBoxItem.deactivate = function () {
            changeSvgEventPointer("svgLayer", "auto");
        };
        return toolBoxItem;
    }
    activateButtonFunction(toolBoxItem, itemName) {
        // to deactivate the previous button and activate the new button
        if (this.currentActiveButton) {
            this.currentActiveButton.style.background = "gold";
            if (this.currentActiveButton.deactivate)
                this.currentActiveButton.deactivate();
        }
        this.switchToolBoxItemStatus(itemName);
        toolBoxItem.style.background = "red";
        this.currentActiveButton = toolBoxItem;
        if (this.currentActiveButton.activate)
            this.currentActiveButton.activate();
    }
    registerSvg(svgLayer) {
        let self = this;
        svgLayer.addEventListener("click", function () {
            console.log("The svg is register to the toolbox");
            console.log("======================");
            self.targetPage = svgLayer;
        });
    }
}
export function getAttributeController(toolBoxItemStatus, itemName) {
    let attributeControllerClassName = toolBoxItemStatus[itemName]["attributeController"];
    return document.querySelector(`.${attributeControllerClassName}`);
}
export function changeSvgEventPointer(type, pointerEventOption) {
    let currentLayerArray;
    if (type == "divLayer") {
        currentLayerArray = mainController.pageController.currentPage.fullPageHTMLObject.querySelectorAll(".divLayer");
    }
    if (type == "svgLayer") {
        currentLayerArray = mainController.pageController.currentPage.fullPageHTMLObject.querySelectorAll(".svgLayer");
    }
    Array.from(currentLayerArray).forEach((layer) => {
        layer.style.pointerEvents = pointerEventOption;
    });
}
