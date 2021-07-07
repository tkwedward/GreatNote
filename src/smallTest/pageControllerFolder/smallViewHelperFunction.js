let overviewModeDiv = document.querySelector(".overviewModeDiv");
export function createColorPicker() {
    let colorPickerDiv = document.createElement("div");
    colorPickerDiv.classList.add("colorPickerDiv");
    let availableColors = ["#FFFFFF", "#C0C0C0", "#808080", "#000000", "#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"];
    availableColors.forEach((color) => {
        let colorBlock = document.createElement("div");
        colorBlock.style.width = "20px";
        colorBlock.style.height = "20px";
        colorBlock.style.background = color;
        colorBlock.style.display = "inline-block";
        colorPickerDiv.append(colorBlock);
        colorBlock.addEventListener("click", e => {
            let selectedSmallViewArray = Array.from(document.querySelectorAll(".selectedSmallViewHTMLObject"));
            selectedSmallViewArray.forEach((p) => {
                p.querySelector(".smallViewContent").style.background = color;
            });
            selectedSmallViewArray.forEach(smallView => {
                smallView.fullPageHTMLObject.saveHTMLObjectToDatabase();
            });
        });
    });
    return colorPickerDiv;
}
export function extractSmallViewData() {
}
export function createSmallViewPageController(mainController) {
    let overViewmodePageController = document.querySelector(".overViewModePageController");
    let colorPicker = document.createElement("input");
    colorPicker.type = "color";
    let colorPickerDiv = createColorPicker();
    let setTagNameInput = document.createElement("input");
    setTagNameInput.classList.add("setTagNameInput");
    let setTagNameButton = document.createElement("button");
    setTagNameButton.classList.add("setTagName");
    setTagNameButton.innerText = "setTag";
    setTagNameButton.addEventListener("click", e => {
        let selectedSmallViewArray = Array.from(document.querySelectorAll(".selectedSmallViewHTMLObject"));
        if (selectedSmallViewArray.length > 0) {
            selectedSmallViewArray.forEach((smallView) => {
                smallView.innerText += setTagNameInput.value;
                smallView.tagsArray.add(setTagNameInput.value);
                smallView.fullPageHTMLObject.saveHTMLObjectToDatabase();
            });
        }
    }); // setTagNameButton click function
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("smallViewDeleteButton");
    deleteButton.innerText = "deleteButton";
    deleteButton.addEventListener("click", e => {
        let selectedSmallViewArray = document.querySelectorAll(".selectedSmallViewHTMLObject");
        Array.from(selectedSmallViewArray).forEach((p) => {
            p.fullPageHTMLObject.deleteFromDatabase();
            p.remove();
        });
    }); // deleteButton click function
    // not finished
    let copyButton = document.createElement("button");
    copyButton.classList.add("smallViewCopyButton");
    copyButton.innerText = "copyButton";
    copyButton.addEventListener("click", e => {
        let selectedSmallViewArray = Array.from(document.querySelectorAll(".selectedSmallViewHTMLObject"));
        let pageAccessPointerArray = selectedSmallViewArray.map((p) => p.fullPageHTMLObject.getAttribute("accessPointer"));
        let lastItem = selectedSmallViewArray[selectedSmallViewArray.length - 1];
    }); // copyButton click function
    overViewmodePageController.append(copyButton, deleteButton, setTagNameButton, setTagNameInput);
    overViewmodePageController.append(colorPicker, colorPickerDiv);
}
export function addFunctionToSmallViewHTMLObject(pageController, smallViewHTMLObject, smallViewContent) {
    smallViewHTMLObject.draggable = true;
    smallViewHTMLObject.tagsArray = new Set();
    let clickCounter = 0;
    smallViewHTMLObject.addEventListener("click", e => {
        clickCounter += 1;
        if (clickCounter == 2) {
            clickCounter = 0;
            let pageID = smallViewHTMLObject.fullPageHTMLObject.getAccessPointer();
            let pageNumber = pageController.getPageNumberFromPageID(pageID);
            pageController.goToPage(pageNumber);
            let switchViewModeButton = document.querySelector(".switchViewModeButton");
            switchViewModeButton.click();
            return;
        }
        setTimeout(() => {
            clickCounter = 0;
        }, 500);
        if (e.metaKey) {
            console.log("controlkey pressed");
            smallViewHTMLObject.classList.toggle("selectedSmallViewHTMLObject");
        }
        else if (e.shiftKey) {
            let allSelectedSmallView = Array.from(overviewModeDiv.querySelectorAll(".selectedSmallViewHTMLObject"));
            let lastElement = allSelectedSmallView[allSelectedSmallView.length - 1];
            if (smallViewHTMLObject.parentElement) {
                let childList = Array.from(smallViewHTMLObject.parentElement.children);
                let lastElementIndex = childList.indexOf(lastElement);
                let selectedElementIndex = childList.indexOf(smallViewHTMLObject);
                if (lastElementIndex > selectedElementIndex) {
                    for (let i = selectedElementIndex; i < lastElementIndex; i++) {
                        if (!childList[i].classList.contains("selectedSmallViewHTMLObject"))
                            childList[i].classList.add("selectedSmallViewHTMLObject");
                    }
                }
                else {
                    for (let i = lastElementIndex; i <= selectedElementIndex; i++) {
                        if (!childList[i].classList.contains("selectedSmallViewHTMLObject"))
                            childList[i].classList.add("selectedSmallViewHTMLObject");
                    }
                }
            } // if (smallViewHTMLObject.parentElement
        }
        else {
            let selectedSmallViewHTMLObjectArray = overviewModeDiv.querySelectorAll(".selectedSmallViewHTMLObject");
            Array.from(selectedSmallViewHTMLObjectArray).forEach(p => {
                p.classList.remove("selectedSmallViewHTMLObject");
            });
            smallViewHTMLObject.classList.add("selectedSmallViewHTMLObject");
        }
    });
    smallViewHTMLObject.addEventListener("dragstart", e => {
        smallViewHTMLObject.classList.add("draggedItem");
    });
    smallViewHTMLObject.addEventListener("dragleave", function (e) {
        e.preventDefault();
        // console.log("dragleave", e)
    }, false);
    smallViewHTMLObject.addEventListener("dragover", function (e) {
        e.preventDefault();
    }, false);
    smallViewHTMLObject.addEventListener("drop", e => {
        var _a, _b;
        let rect = smallViewHTMLObject.getBoundingClientRect();
        let middleLine = rect.x + rect.width / 2;
        let draggedItem = document.querySelector(".smallView.draggedItem");
        let allSelectedSmallView = document.querySelectorAll(".selectedSmallViewHTMLObject");
        let targetPgeObject = smallViewHTMLObject.fullPageHTMLObject.soul;
        let currentObject;
        let nextObject;
        // this is the node before the first selected item. It will be aassigned to a new value for the next disconnected item.
        let alphaNode = allSelectedSmallView[0].fullPageHTMLObject.soul.previous;
        let betaNode;
        for (let i = 0; i < allSelectedSmallView.length; i++) {
            currentObject = allSelectedSmallView[i].fullPageHTMLObject.soul;
            nextObject = (_a = allSelectedSmallView[i + 1]) === null || _a === void 0 ? void 0 : _a.fullPageHTMLObject.soul;
            if (!nextObject) {
                console.log("no nextObject. At the ned of the chain");
                alphaNode.next = currentObject.next;
                currentObject.next.prevous = alphaNode;
                currentObject.next = null;
                continue;
            } // if no nextObject, thaat means the item is at the end of the chain. connect the alphaNode with the next node of currentNode
            // skip if two are linked
            if (currentObject.next == nextObject) {
                // that means the  currentOBject and the nextObject are connected
                continue;
            }
            else {
                // that means the  currentOBject and the nextObject are disconnected. The nodeNeededToConnect will connect with the currentObject.next. ANd then node will become the next nodeNeededToConnect
                if (!alphaNode)
                    continue;
                betaNode = currentObject.next;
                alphaNode.next = betaNode;
                betaNode.previous = alphaNode;
                alphaNode = betaNode;
                currentObject.next = nextObject;
            }
        }
        if (e.pageX > middleLine) {
            console.log("insert to the right");
            for (let i = allSelectedSmallView.length - 1; i >= 0; i--) {
                alphaNode = smallViewHTMLObject.fullPageHTMLObject.soul.previous;
                betaNode = smallViewHTMLObject.fullPageHTMLObject.soul;
                if (i == allSelectedSmallView.length - 1) {
                    console.log("the end node of the lefts");
                    betaNode.previous = allSelectedSmallView[i].fullPageHTMLObject.soul;
                    allSelectedSmallView[i].fullPageHTMLObject.soul.next = betaNode;
                }
                if (i == 0) {
                    console.log("the end node of the right");
                    alphaNode.next = allSelectedSmallView[0].fullPageHTMLObject.soul;
                    allSelectedSmallView[0].fullPageHTMLObject.soul.previoous = alphaNode;
                }
                overviewModeDiv.insertBefore(allSelectedSmallView[i], smallViewHTMLObject);
                overviewModeDiv.insertBefore(smallViewHTMLObject, allSelectedSmallView[i]);
            }
        } //e.pageX > middleLine
        if (e.pageX < middleLine) {
            console.log("insert to the left");
            alphaNode = smallViewHTMLObject.fullPageHTMLObject.soul.previous;
            betaNode = smallViewHTMLObject.fullPageHTMLObject.soul;
            for (let i = 0; i < allSelectedSmallView.length; i++) {
                if (i == 0) {
                    console.log("the end node of the lefts");
                    alphaNode.next = allSelectedSmallView[0].fullPageHTMLObject.soul;
                    allSelectedSmallView[0].fullPageHTMLObject.soul.previoous = alphaNode;
                }
                if (i == allSelectedSmallView.length - 1) {
                    console.log("the end node of the lefts");
                    betaNode.previous = allSelectedSmallView[i].fullPageHTMLObject.soul;
                    allSelectedSmallView[i].fullPageHTMLObject.soul.next = betaNode;
                }
                overviewModeDiv.insertBefore(allSelectedSmallView[i], smallViewHTMLObject);
            } // for loop with allSelectedSmallView.length
        } // e.pageX < middleLine
        currentObject = pageController.startPage.next;
        let newPageOrderArray = [];
        while (currentObject) {
            let accessPointer = (_b = currentObject.fullPageHTMLObject) === null || _b === void 0 ? void 0 : _b.getAccessPointer();
            if (accessPointer)
                newPageOrderArray.push(accessPointer);
            currentObject = currentObject.next;
        }
        console.log(newPageOrderArray);
        pageController.savePageChangeToDatabase(newPageOrderArray);
        draggedItem.classList.toggle("draggedItem");
    }); // smallViewHTMLObject.addEventListener("drop0
    smallViewHTMLObject.extract = function () {
        return {
            color: smallViewContent.style.background,
            tagsArray: Array.from(smallViewHTMLObject.tagsArray)
        };
    }; // smallViewHTMLObject.extract
    smallViewHTMLObject.loadFromData = function (injectedData) {
        var _a;
        smallViewContent.style.background = injectedData.color;
        (_a = injectedData.tagsArray) === null || _a === void 0 ? void 0 : _a.forEach((title) => {
            smallViewHTMLObject.tagsArray.add("title");
            let tagDiv = document.createElement("div");
            tagDiv.innerText = title;
            smallViewHTMLObject.append(tagDiv);
        });
    }; // smallViewHTMLObject.loadFromData
}
import { pageSizeInfo } from "../settings";
export function renderSmallView(fullPageHTMLObject, smallViewHTMLObject, pageNumber) {
    let smallViewPictureWrapper = smallViewHTMLObject.querySelector(".smallViewContent");
    // let smallViewPictureWrapper = document.createElement("div")
    smallViewPictureWrapper.style.position = "relative";
    smallViewPictureWrapper.style.top = "0px";
    smallViewPictureWrapper.style.left = "0px";
    let _div = document.createElement("div");
    _div.innerHTML = fullPageHTMLObject.innerHTML;
    _div.style.position = "absolute";
    _div.style.width = pageSizeInfo.fullPageSize[0] + "px";
    _div.style.height = pageSizeInfo.fullPageSize[1] + "px";
    _div.style.transformOrigin = "left top";
    _div.style.transform = `scale(${pageSizeInfo.ratio})`;
    // _div.style.transform = "scale(0.125)"
    _div.style.top = "0px";
    _div.style.left = "0px";
    _div.style.background = "white";
    let allItem = Array.from(_div.querySelectorAll("*"));
    allItem.forEach(p => p.setAttribute("accessPointer", ""));
    // smallViewHTMLObject.insertBefore(smallViewPictureWrapper)
    let pageNumberDiv = document.createElement("div");
    pageNumberDiv.innerText = `${pageNumber}`;
    pageNumberDiv.style.position = "absolute";
    pageNumberDiv.style.top = "3px";
    pageNumberDiv.style.left = "3px";
    smallViewPictureWrapper.append(_div);
    smallViewHTMLObject.append(pageNumberDiv);
}
