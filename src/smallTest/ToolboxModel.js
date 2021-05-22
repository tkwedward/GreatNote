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
                attributeController: "eraserController"
            },
            selectionToolItemButton: {
                status: false,
                attributeController: "selectionTool"
            },
            addCommentItemButton: {
                status: false,
                attributeController: "addCommentController"
            },
            moveObjectInDivButton: {
                status: false,
                attributeController: "moveObjectInDivController"
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
            this.toolBoxItemStatus[currentActiveButton]["status"] = !this.toolBoxItemStatus[currentActiveButton]["status"];
            // turn off attributeControllerWant
            let attributeControllerWantToTurnedOff = getAttributeController(this.toolBoxItemStatus, currentActiveButton);
            if (attributeControllerWantToTurnedOff)
                attributeControllerWantToTurnedOff["style"].display = "none";
            console.log(858585858, attributeControllerWantToTurnedOff);
        }
        this.toolBoxItemStatus.currentActiveButton = itemName;
        this.toolBoxItemStatus[itemName]["status"] = !this.toolBoxItemStatus[itemName]["status"];
        // turn on attributeControllerWantToturn on
        let attributeControllerWantToTurnedOn = getAttributeController(this.toolBoxItemStatus, itemName);
        if (attributeControllerWantToTurnedOn)
            attributeControllerWantToTurnedOn["style"].display = "block";
        console.log(858585858, attributeControllerWantToTurnedOn);
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
    createToolBoxItem(name, toolBoxContainer) {
        let toolBoxItem = document.createElement("div");
        // the html style part
        toolBoxItem.classList.add("toolBoxItem", name);
        toolBoxItem.innerText = name[0];
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
        let toolBoxItem = this.createToolBoxItem("PolyLine", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("polyline item button is activated");
            this.activateButtonFunction(toolBoxItem, "polylineItemButton");
        });
        return toolBoxItem;
    }
    createSelectionToolItemButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("SelectionTool", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", (e) => {
            console.log("Selection Tool item button is activated");
            this.activateButtonFunction(toolBoxItem, "selectionToolItemButton");
        });
        return toolBoxItem;
    }
    createEraserItemButton(toolBoxHtmlObject) {
        // let self = this
        let toolBoxItem = this.createToolBoxItem("Eraser", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", e => {
            this.activateButtonFunction(toolBoxItem, "eraserItemButton");
        });
        return toolBoxItem;
    }
    createAddCommentButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("AddComment", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", e => {
            this.activateButtonFunction(toolBoxItem, "addCommentItemButton");
        });
        return toolBoxItem;
    }
    createMoveObjectInDivButton(toolBoxHtmlObject) {
        let toolBoxItem = this.createToolBoxItem("MoveObjectInDiv", toolBoxHtmlObject);
        toolBoxItem.addEventListener("click", e => {
            this.activateButtonFunction(toolBoxItem, "moveObjectInDivButton");
            console.log(this.toolBoxItemStatus);
        });
        return toolBoxItem;
    }
    activateButtonFunction(toolBoxItem, itemName) {
        this.itemArray.forEach(p => {
            p.style.background = "gold";
        });
        this.switchToolBoxItemStatus(itemName);
        toolBoxItem.style.background = "red";
        this.currentActiveButton = toolBoxItem;
    }
    registerSvg(svgLayer) {
        let self = this;
        console.log(226, "registerSvg, yoyoyo");
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
