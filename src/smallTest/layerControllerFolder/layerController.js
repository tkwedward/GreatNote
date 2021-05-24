import * as GreatNoteDataClass from "../GreatNoteClass/GreatNoteDataClass";
import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass";
import * as ToolBoxEvents from "../EventFolder/attachToolBoxEventsToLayers";
export function switchStatus(item) {
    let currentStatus = item.getAttribute("status");
    let newStatus = currentStatus == "on" ? "off" : "on";
    item.setAttribute("status", newStatus);
    return newStatus;
}
// ** make the layer controller panel so that you can add new div / new svg layer
export function createLayerController(mainController) {
    // layerController HTML part
    let layerControllerTemplate = document.querySelector("#layerControllerTemplate");
    let layerControllerHTMLObject = layerControllerTemplate["content"].cloneNode(true);
    let layerView = layerControllerHTMLObject.querySelector(".layerView");
    let addDivLayerButton = layerControllerHTMLObject.querySelector(".addDivLayerButton");
    addDivLayerButton.addEventListener("click", function (e) {
        layerControllerHTMLObject.addDivLayer(e);
    }, { detail: { "run": 12345 } });
    let addSvgLayerButton = layerControllerHTMLObject.querySelector(".addSvgLayerButton");
    addSvgLayerButton.addEventListener("click", function (e) {
        layerControllerHTMLObject.addSvgLayer(e);
    }); // addSvgLayerButton.addEventListener
    let showCurrentPageButton = layerControllerHTMLObject.querySelector(".showCurrentPageButton");
    showCurrentPageButton.addEventListener("click", function () {
        showCurrentPageButtonFunction(mainController, layerView);
    });
    //
    // layerControllerHTMLObject functions
    //
    layerControllerHTMLObject.renderCurrentPageLayer = function () {
        showCurrentPageButtonFunction(mainController, layerView);
    };
    layerControllerHTMLObject.addDivLayer = function (e) {
        let currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        let divLayer = GreatNoteDataClass.GNContainerDiv({ name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase: true, specialCreationMessage: "divLayer", _classNameList: ["divLayer"] });
        divLayer.applyStyle({ width: "100%", height: "100%", "position": "absolute", "left": "0px", "top": "0px" });
        mainController.saveHTMLObjectToDatabase(divLayer);
        ToolBoxEvents.attachEventListenerToDivLayer(mainController, divLayer);
        // divLayer.classList.add("divLayer")
        divLayer.appendTo(currentPage);
        layerControllerHTMLObject.renderCurrentPageLayer();
    };
    layerControllerHTMLObject.addSvgLayer = function (e) {
        let currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        let svgLayer = GreatNoteSvgDataClass.GNSvg({ name: "", arrayID: currentPage.getAccessPointer(), saveToDatabase: true, _classNameList: ["svgLayer"] });
        mainController.toolBox.registerSvg(svgLayer);
        svgLayer.applyStyle({ width: "100%", height: "100%", "background": "transparent", position: "absolute", left: "0px", top: "0px" });
        mainController.saveHTMLObjectToDatabase(svgLayer);
        svgLayer.classList.add("svgLayer");
        ToolBoxEvents.attachEventListenerToSvgBoard(mainController, svgLayer);
        svgLayer.appendTo(currentPage);
        layerControllerHTMLObject.renderCurrentPageLayer();
    };
    mainController.layerController = layerControllerHTMLObject;
    return layerControllerHTMLObject;
}
export function showCurrentPageButtonFunction(mainController, layerView) {
    var _a;
    layerView.innerHTML = "";
    let currentPageData = (_a = mainController.pageController.currentPage.fullPageHTMLObject) === null || _a === void 0 ? void 0 : _a.extract();
    let layerObject = buildLayerContentFunction(mainController, currentPageData, layerView);
    layerView.appendChild(layerObject);
}
//** aa funciton to build a list of items in a page so that tthey can be shown in the layer panel for switch on and off and lock the layer
export function buildLayerContentFunction(mainController, currentPageData, layerView, layerLevel = 0) {
    // first create an item object that conatin the information of the layerLeevel and pageAccessPointer
    // pageAccessPointer is used for finding the related HTML obejct show that you can manipulate them
    let layerRowTemplate = document.querySelector("#layerRowTemplate");
    let item = document.createElement("div");
    item.classList.add("layerLevel");
    let itemRow = layerRowTemplate.content.cloneNode(true)
        .querySelector(".layerRow");
    itemRow.setAttribute("layerLevel", layerLevel.toString());
    let itemViewSwitch = itemRow.querySelector(".viewSwitch");
    let itemRowName = itemRow.querySelector(".viewName");
    let itemExpandSwitch = itemRow.querySelector(".expandSwitch");
    item.appendChild(itemRow);
    item.setAttribute("layerLevel", layerLevel.toString());
    if (layerLevel == 0)
        itemRow.style.display = "none";
    if (layerLevel > 1)
        item.setAttribute("status", "off");
    for (let i = 0; i < layerLevel; i++) {
        itemRowName.innerText += "-";
    }
    itemRowName.innerText += currentPageData.GNType;
    addItemRowFunction(layerView, itemRow);
    // add click event to the item object to change the style of the related html objec tin that page
    item.setAttribute("pageAccessPointer", currentPageData._identity.accessPointer);
    // the event on the three buttons
    itemViewSwitch.addEventListener("click", function (e) {
        e.stopPropagation();
        let relatedHTMLObject = document.querySelector(`*[accessPointer='${currentPageData._identity.accessPointer}']`);
        mainController.toolBox.targetPage = relatedHTMLObject;
        // to test if the style is visible or not
        relatedHTMLObject.style.visibility = (relatedHTMLObject.style.visibility == "hidden") ? "inherit" : "hidden";
        switchStatus(itemViewSwitch);
    });
    itemExpandSwitch.addEventListener("click", function (e) {
        e.stopPropagation();
        let newStatus = switchStatus(itemExpandSwitch);
        let targetItem = Array.from(item.querySelectorAll(`.layerLevel[layerlevel='${layerLevel}']`));
        targetItem.forEach(p => p.setAttribute("status", newStatus));
    });
    itemRowName.addEventListener("click", function (e) {
        e.stopPropagation();
        let selectedRow = layerView.querySelector(".selectedRow");
        if (selectedRow)
            selectedRow.classList.remove("selectedRow");
        itemRow.classList.add("selectedRow");
    });
    // to
    layerLevel += 1;
    if (currentPageData.array.length > 0) {
        currentPageData.array.forEach((p) => {
            item.appendChild(buildLayerContentFunction(mainController, p, layerView, layerLevel));
        });
    }
    return item;
}
function addItemRowFunction(layerView, itemRow) {
    itemRow.addEventListener("click", function () {
        let selectedRow = layerView.querySelector(".selectedRow");
        if (selectedRow)
            selectedRow.classList.remove("selectedRow");
        itemRow.classList.add("selectedRow");
    });
}
