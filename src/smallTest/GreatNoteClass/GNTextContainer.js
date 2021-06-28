import { superGNObject, createDummyData, setObjectMovable } from "./GreateNoteObjectHelperFunction";
export function createSelectionObject(className, valueList) {
    let selectObject = document.createElement("select");
    selectObject.classList.add(className);
    valueList.forEach(p => {
        let option = document.createElement("option");
        option.value = p;
        option.innerText = p;
        option.draggable = false;
        selectObject.append(option);
    });
    return selectObject;
}
export function inputFunction(_object, item) {
    return function itemInputFunction(e) {
        setTimeout(function () {
            _object.saveHTMLObjectToDatabase();
            item.addEventListener("input", itemInputFunction);
        }, 3000);
        item.removeEventListener("input", itemInputFunction);
    };
}
export function createTextBox(_object, uniqueID) {
    let textBox = document.createElement("div");
    if (!uniqueID) {
        uniqueID = `${Date.now().toString(36) + Math.random().toString(36).substr(2)}`;
    }
    textBox.setAttribute("textBoxID", uniqueID);
    textBox.innerHTML = "TextContainerTextContainer";
    textBox.classList.add("textContainer");
    textBox.contentEditable = "true";
    textBox.draggable = false;
    textBox.addEventListener("input", inputFunction(_object, textBox));
    textBox.addEventListener("paste", (e) => {
        e.stopPropagation();
        var items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                // e.preventDefault()
                var blob = item.getAsFile();
                var reader = new FileReader();
                console.log(blob, item);
                reader.onload = function (event) {
                    console.log(event.target.result);
                    let targetImg = textBox.querySelector(`img[src='${event.target.result}']`);
                    targetImg.style.width = "98%";
                    targetImg.style.margin = "auto";
                    targetImg.style.display = "block";
                    targetImg.style.position = "relative";
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', '/talkNotes/processImageBase64Format', true);
                    xhr.onload = function () {
                        console.log("finish processing image");
                        let responseImgSrc = JSON.parse(this.responseText).imgsrc.replace("talkNotes/", "/");
                        console.log(responseImgSrc);
                        targetImg.src = window.location.origin
                            + "/image/" + responseImgSrc + ".png";
                    };
                    xhr.send(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    });
    return textBox;
}
export function createTextContainerHTMLObject() {
    let _object = document.createElement("div");
    _object.classList.add("GNTextContainer");
    _object.addEventListener("mousedown", e => {
        e.stopPropagation();
        console.log("from textContainer");
    });
    _object.style.width = "500px";
    _object.style.minHeight = "50px";
    _object.style.background = "lightblue";
    let title = document.createElement("input");
    title.addEventListener("input", inputFunction(_object, title));
    let addTextBoxButton = document.createElement("button");
    addTextBoxButton.innerText = "addTextBox";
    addTextBoxButton.addEventListener("click", e => {
        let _textContainer = createTextBox(_object);
        _object.append(_textContainer);
    });
    let textTypeSelection = createSelectionObject("textTypeSelect", ["normal", "comment", "question", "solution", "section", "equation"]);
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("textTypeDeleteButton");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", (e) => {
        _object.deleteFromDatabase();
    });
    textTypeSelection.addEventListener("change", (e) => {
        let pageNavigator = document.querySelector(".pageController");
        let pageController = pageNavigator.soul;
        let currentPage = document.querySelector(".currentPage");
        let pageObject = currentPage.soul;
        let annotationObject = pageObject.pageRelatedData.annotationArray.filter((p) => {
            return p.accessPointer == _object.getAccessPointer();
        })[0];
        annotationObject.annotationType = textTypeSelection.value;
    });
    _object.append(textTypeSelection, title, deleteButton, addTextBoxButton);
    setObjectMovable(_object);
    return [_object, title, textTypeSelection];
}
export function GNTextContainer(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, _classNameList } = createData;
    let [_object, title, textTypeSelection] = createTextContainerHTMLObject();
    if (!injectedData) {
        let textContainer = createTextBox(_object);
        _object.append(textContainer);
    }
    _object.childrenList = {};
    _object.GNType = "GNTextContainer";
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = ["innerHTML"];
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"];
    _object._classNameList = _classNameList || [];
    _classNameList === null || _classNameList === void 0 ? void 0 : _classNameList.forEach(p => _object.classList.add(p));
    _object.loadFromData = (injectedData, saveToDatabase = false) => {
        var _a;
        if (saveToDatabase)
            debugger;
        _object.GNSpecialCreationMessage = injectedData.GNSpecialCreationMessage;
        _object.specialGNType = injectedData.specialGNType;
        if (injectedData._classNameList)
            injectedData._classNameList.forEach((p) => _object.classList.add(p));
        _object._identity = injectedData._identity;
        _object.setAttribute("accessPointer", injectedData._identity.accessPointer);
        _object.applyStyle(injectedData.stylesheet, saveToDatabase);
        title.value = injectedData["data"]["title"];
        textTypeSelection.value = injectedData["data"]["textTypeSelection"];
        textTypeSelection;
        (_a = injectedData["data"]["textContainerArray"]) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            let textContainer = _object.querySelector(`div[textBoxID='${p.uniqueID}']`);
            if (!textContainer) {
                textContainer = createTextBox(_object, p.uniqueID);
                _object.append(textContainer);
            }
            textContainer.innerHTML = p.textContent;
        });
    };
    _object.extract = () => _object.createDataObject();
    _object.setMovable = () => setObjectMovable(_object);
    _object.createDataObject = function () {
        var _a;
        let dataObject;
        if (_object.objectData) {
            dataObject = _object.objectData;
        }
        else {
            dataObject = createDummyData();
        }
        dataObject["GNType"] = _object.GNType;
        dataObject["GNSpecialCreationMessage"] = _object.GNSpecialCreationMessage;
        dataObject["specialGNType"] = _object.specialGNType || "";
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        dataObject["_classNameList"] = Array.from(_object.classList);
        // data structure
        dataObject["data"]["title"] = title.value;
        dataObject["data"]["textTypeSelection"] = textTypeSelection.value;
        let textContainerArray = Array.from(_object.querySelectorAll(".textContainer"));
        dataObject["data"]["textContainerArray"] = textContainerArray.map((p) => ({
            uniqueID: p.getAttribute("textBoxID"),
            textContent: p.innerHTML
        }));
        // stylesheet data
        (_a = _object === null || _object === void 0 ? void 0 : _object._styleStructure) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            dataObject["stylesheet"][p] = _object.style[p];
        });
        // console.log(dataObject)
        return dataObject;
    };
    _object.getAnnotationType = function () {
        return textTypeSelection.value;
    };
    _object.applyStyle = function (styleObject, saveToDatabase = true) {
        Object.entries(styleObject).forEach(([key, value], _) => {
            _object["style"][key] = value;
        });
        // throw "unknown exception"
        if (saveToDatabase)
            _object.saveHTMLObjectToDatabase();
    };
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData);
    if (injectedData) {
        _object.loadFromData(injectedData);
        _object.applyStyle(injectedData.stylesheet, false); //
        if (injectedData._classNameList && injectedData._classNameList.length > 0) {
            injectedData._classNameList.forEach((p) => _object.classList.add(p));
        }
        _object._identity = injectedData._identity;
        _object.setAttribute("accessPointer", _object._identity.accessPointer);
        _object.objectData = injectedData;
    }
    return _object;
}
