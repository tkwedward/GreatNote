import { GNImageContainer } from "./GreatNoteClass/GNImageContainer";
export function addPasteImageEvent(mainController) {
    document.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        console.log(JSON.stringify(items)); // might give you mime types
        let currentPage = mainController.pageController.currentPage.fullPageHTMLObject;
        let targetDiv = currentPage.querySelector(".divLayer");
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'processImageBase64Format', true);
                    xhr.onload = function () {
                        console.log("finish processing image");
                        console.log(this.responseText);
                        let responseImgSrc = JSON.parse(this.responseText).imgsrc.replace("talkNotes/", "");
                        let newImg = GNImageContainer({ "name": "", arrayID: targetDiv.getAccessPointer(), saveToDatabase: true, imgsrc: "../image/" + responseImgSrc + ".png" });
                        targetDiv.appendChild(newImg);
                        newImg.setImageSize({ width: 500 });
                        newImg.setMovable();
                        newImg.saveHTMLObjectToDatabase();
                        targetDiv.appendChild(newImg);
                    };
                    xhr.send(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    };
}
console.log("clipboard event");
export function mouseResizeFunction(item) {
    let eventName = "mousedown";
    let moveEventName = "mousemove";
    let attributeX = "left";
    let attributeY = "top";
    return function (e) {
        let startX = e["screenX"];
        let startY = e["screenY"];
        let objectInitialX = 0;
        let objectInitialY = 0;
        let initialLeftValue = parseInt(item.style[attributeX].replace("px", "")) || 0;
        let initialTopValue = parseInt(item.style[attributeY].replace("px", "")) || 0;
        let currentX;
        let currentY;
        let deltaX = 0;
        let deltaY = 0;
        let mousemoveFunction = (e) => {
            currentY = e.screenY;
            currentX = e.screenX;
            deltaX = currentX - startX;
            deltaY = currentY - startY;
            let newX = item.style[attributeX] = `${initialLeftValue + deltaX}px`;
            item.style[attributeY] = `${initialTopValue + deltaY}px`;
        };
        item.addEventListener("mousemove", mousemoveFunction, false);
        function endDragEvent(e) {
            Array.from(item.parentNode["children"]).forEach((p) => {
                p["style"]["pointerEvents"] = "inherit";
            });
            let endX = e["screenX"];
            let endY = e["screenY"];
            item.removeEventListener("mousemove", mousemoveFunction);
        }
        item.addEventListener("mouseup", (e) => {
            endDragEvent(e);
        }, false);
        item.addEventListener("mouseout", (e) => {
            endDragEvent(e);
        }, false);
    };
}
export function createMouseTrackingController(mouseInfoDiv, testFieldDiv) {
    console.log(mouseInfoDiv, testFieldDiv);
    let clientXYDiv = document.createElement("div");
    clientXYDiv.style.display = "grid";
    clientXYDiv.style.gridTemplateColumns = "1fr 2fr";
    let clientXYDivLabel = document.createElement("span");
    let clientXYDivData = document.createElement("span");
    clientXYDivLabel.innerText = "clientXY";
    clientXYDiv.appendChild(clientXYDivLabel);
    clientXYDiv.appendChild(clientXYDivData);
    let screenXYDiv = document.createElement("div");
    screenXYDiv.style.display = "grid";
    screenXYDiv.style.gridTemplateColumns = "1fr 2fr";
    let screenXYDivLabel = document.createElement("span");
    let screenXYDivData = document.createElement("span");
    screenXYDivLabel.innerText = "screenXY";
    screenXYDiv.appendChild(screenXYDivLabel);
    screenXYDiv.appendChild(screenXYDivData);
    let offsetXYDiv = document.createElement("div");
    offsetXYDiv.style.display = "grid";
    offsetXYDiv.style.gridTemplateColumns = "1fr 2fr";
    let offsetXYDivLabel = document.createElement("span");
    let offsetXYDivData = document.createElement("span");
    offsetXYDivLabel.innerText = "offsetXY";
    offsetXYDiv.appendChild(offsetXYDivLabel);
    offsetXYDiv.appendChild(offsetXYDivData);
    let pageXYDiv = document.createElement("div");
    pageXYDiv.style.display = "grid";
    pageXYDiv.style.gridTemplateColumns = "1fr 2fr";
    let pageXYDivLabel = document.createElement("span");
    let pageXYDivData = document.createElement("span");
    pageXYDivLabel.innerText = "pageXY";
    pageXYDiv.appendChild(pageXYDivLabel);
    pageXYDiv.appendChild(pageXYDivData);
    let deltaXYDiv = document.createElement("div");
    deltaXYDiv.style.display = "grid";
    deltaXYDiv.style.gridTemplateColumns = "1fr 2fr";
    let deltaXYDivLabel = document.createElement("span");
    let deltaXYDivData = document.createElement("span");
    deltaXYDivLabel.innerText = "deltaXY";
    deltaXYDiv.appendChild(deltaXYDivLabel);
    deltaXYDiv.appendChild(deltaXYDivData);
    let targetObjectXYDiv = document.createElement("div");
    targetObjectXYDiv.style.display = "grid";
    targetObjectXYDiv.style.gridTemplateColumns = "1fr 2fr";
    let targetObjectXYDivLabel = document.createElement("span");
    let targetObjectXYDivData = document.createElement("span");
    targetObjectXYDivLabel.innerText = "targetObjXY";
    targetObjectXYDiv.appendChild(targetObjectXYDivLabel);
    targetObjectXYDiv.appendChild(targetObjectXYDivData);
    mouseInfoDiv.append(clientXYDiv, screenXYDiv, offsetXYDiv, pageXYDiv, deltaXYDiv, targetObjectXYDiv);
    return [clientXYDivData, screenXYDivData, offsetXYDivData, pageXYDivData, deltaXYDivData, targetObjectXYDivData];
}
export function setTargetObject(parentDiv, targetObjectArray) {
    parentDiv.targetObjectArray = targetObjectArray;
}
export function getObjectOrigianlDataArray(p) {
    // to get data about the object's position and parent's dimension so that you can change the position and size of the object
    return {
        originalLeft: p.offsetLeft,
        originalTop: p.offsetTop,
        parentOriginalWidth: p.parentNode.offsetWidth,
        parentOriginalHeight: p.parentNode.offsetHeight
    };
}
export function triggerTargetObjectMovingFunction(p, i, deltaX, deltaY, targetObjectOriginalDataArray) {
    // p = targetObject
    // i = index
    let newTargetObjectLeft = targetObjectOriginalDataArray[i]["originalLeft"] + deltaX + "px";
    let newTargetObjectTop = targetObjectOriginalDataArray[i]["originalTop"] + deltaY + "px";
    p.style.left = newTargetObjectLeft;
    p.style.top = newTargetObjectTop;
    if (p.specialMovingEvent) {
        p.specialMovingEvent(deltaX, deltaY, targetObjectOriginalDataArray[i]["parentOriginalWidth"], targetObjectOriginalDataArray[i]["parentOriginalHeight"]);
    }
} // triggerTargetObjectMovingFunction
export function mousePositionTrackFunction(mouseInfoDiv, parentDiv) {
    let [clientXYDivData, screenXYDivData, offsetXYDivData, pageXYDivData, deltaXYDivData, targetObjectXYDivData] = createMouseTrackingController(mouseInfoDiv, parentDiv);
    let originalX, originalY;
    let currentX, currentY;
    let deltaX, deltaY;
    let targetObjectOriginalDataArray = [];
    parentDiv.addEventListener("mousedown", function (e) {
        parentDiv.childNodes.forEach((p) => {
            // p.style.pointerEvents = "none"
            if (p.classList.contains("selectedObject")) {
                // p.style.pointerEvents = "all"
            }
        });
        originalX = e.pageX;
        originalY = e.pageY;
        currentX = e.pageX;
        currentY = e.pageY;
        clientXYDivData.innerText = `(${e.clientX}, ${e.clientY})`;
        screenXYDivData.innerText = `(${e.screenX}, ${e.screenY})`;
        offsetXYDivData.innerText = `(${e.offsetX}, ${e.offsetY})`;
        pageXYDivData.innerText = `(${e.pageX}, ${e.pageY})`;
        deltaX = currentX - originalX;
        deltaY = currentY - originalY;
        deltaXYDivData.innerText = `(${deltaX}, ${deltaY})`;
        // original position
        targetObjectOriginalDataArray = Array.from(parentDiv.childNodes).map(p => getObjectOrigianlDataArray(p));
        let mousemoveFunction = function (e) {
            currentX = e.pageX;
            currentY = e.pageY;
            clientXYDivData.innerText = `(${e.clientX}, ${e.clientY})`;
            screenXYDivData.innerText = `(${e.screenX}, ${e.screenY})`;
            offsetXYDivData.innerText = `(${e.offsetX}, ${e.offsetY})`;
            pageXYDivData.innerText = `(${e.pageX}, ${e.pageY})`;
            deltaX = currentX - originalX;
            deltaY = currentY - originalY;
            parentDiv.childNodes.forEach((p, i) => {
                if (p.classList.contains("selectedObject")) {
                    triggerTargetObjectMovingFunction(p, i, deltaX, deltaY, targetObjectOriginalDataArray);
                }
            });
            deltaXYDivData.innerText = `(${deltaX}, ${deltaY})`;
        }; // mousemoveFunction
        parentDiv.addEventListener("mousemove", mousemoveFunction);
        let mouseupFunction = function (e) {
            parentDiv.removeEventListener("mousemove", mousemoveFunction);
            parentDiv.removeEventListener("mouseup", mouseupFunction);
            parentDiv.childNodes.forEach((p) => p.style.pointerEvents = "all");
        };
        parentDiv.addEventListener("mouseup", mouseupFunction);
        parentDiv.addEventListener("mouseup2", mouseupFunction);
    });
}
