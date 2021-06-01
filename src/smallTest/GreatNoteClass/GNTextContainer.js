import { superGNObject, createDummyData, setObjectMovable } from "./GreateNoteObjectHelperFunction";
export function createSelectionObject(className, valueList) {
    let selectObject = document.createElement("select");
    selectObject.classList.add(className);
    // selectObject.draggable = false
    valueList.forEach(p => {
        let option = document.createElement("option");
        option.value = p;
        option.innerText = p;
        option.draggable = false;
        selectObject.append(option);
    });
    return selectObject;
}
export function createTextContainerHTMLObject() {
    let _object = document.createElement("div");
    _object.classList.add("GNTextContainer");
    _object.addEventListener("mousedown", e => {
        e.stopPropagation();
        console.log("from textContainer");
    });
    _object.style.width = "800px";
    _object.style.minHeight = "50px";
    _object.style.background = "lightblue";
    let title = document.createElement("input");
    let textContainer = document.createElement("div");
    textContainer.innerHTML = "TextContainerTextContainer";
    textContainer.contentEditable = "true";
    let inputFunction = function (item) {
        return function itemInputFunction(e) {
            setTimeout(function () {
                _object.saveHTMLObjectToDatabase();
                item.addEventListener("input", itemInputFunction);
            }, 3000);
            item.removeEventListener("input", itemInputFunction);
        };
    };
    textContainer.addEventListener("input", inputFunction(textContainer));
    title.addEventListener("input", inputFunction(title));
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
    _object.append(textTypeSelection, title, deleteButton, textContainer);
    setObjectMovable(_object);
    return [_object, textContainer, title, textTypeSelection];
}
export function GNTextContainer(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, _classNameList } = createData;
    let [_object, textContainer, title, textTypeSelection] = createTextContainerHTMLObject();
    _object.childrenList = {};
    _object.GNType = "GNTextContainer";
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = ["innerHTML"];
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"];
    _object._classNameList = _classNameList || [];
    _classNameList === null || _classNameList === void 0 ? void 0 : _classNameList.forEach(p => {
        _object.classList.add(p);
    });
    _object.loadFromData = (injectedData, saveToDatabase) => {
        _object.GNSpecialCreationMessage = injectedData.GNSpecialCreationMessage;
        _object.specialGNType = injectedData.specialGNType;
        if (injectedData._classNameList)
            injectedData._classNameList.forEach((p) => _object.classList.add(p));
        _object._identity = injectedData._identity;
        _object.setAttribute("accessPointer", injectedData._identity.accessPointer);
        _object.applyStyle(injectedData.stylesheet, saveToDatabase);
        title.value = injectedData["data"]["title"];
        textContainer.innerHTML = injectedData["data"]["textContainer"];
        textTypeSelection.value = injectedData["data"]["textTypeSelection"];
        textTypeSelection;
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
        dataObject["data"]["textContainer"] = textContainer.innerHTML;
        dataObject["data"]["title"] = title.value;
        dataObject["data"]["textTypeSelection"] = textTypeSelection.value;
        // stylesheet data
        (_a = _object === null || _object === void 0 ? void 0 : _object._styleStructure) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            dataObject["stylesheet"][p] = _object.style[p];
        });
        return dataObject;
    };
    _object.getAnnotationType = function () {
        return textTypeSelection.value;
    };
    _object.applyStyle = function (styleObject, saveToDatabase = true) {
        Object.entries(styleObject).forEach(([key, value], _) => {
            _object["style"][key] = value;
        });
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
