import { superGNObject, setObjectMovable, createDummyData } from "../GreatNoteClass/GreateNoteObjectHelperFunction";
export function createBookmarkHTMLObject(_object) {
    // interior parts
    let bookmarkHeader = document.createElement("div");
    bookmarkHeader.classList.add("bookmarkHeader");
    let bookmarkTitle = document.createElement("div");
    bookmarkTitle.classList.add("bookmarkTitle");
    bookmarkTitle.contentEditable = "true";
    bookmarkTitle.draggable = false;
    let bookmarkType = document.createElement("select");
    let commentTypeOption = document.createElement("option");
    commentTypeOption.value = "comment";
    commentTypeOption.innerText = "comment";
    let quesitonTypeOption = document.createElement("option");
    quesitonTypeOption.value = "question";
    quesitonTypeOption.innerText = "question";
    bookmarkType.append(commentTypeOption, quesitonTypeOption);
    let tagsWrapper = document.createElement("div");
    tagsWrapper.classList.add("tagsWrapper");
    let tagsInput = document.createElement("input");
    tagsInput.classList.add("tagsInput");
    tagsWrapper.append(tagsInput);
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", function () {
        _object.deleteFromDatabase();
    });
    bookmarkHeader.append(bookmarkType, deleteButton);
    return [bookmarkHeader, bookmarkTitle, bookmarkType, tagsWrapper, tagsInput, deleteButton];
}
export function GNBookmark(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, _classNameList } = createData;
    let _object = document.createElement("div");
    _object.classList.add("GNBookmarkDiv");
    _object.GNType = "GNBookmark";
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = [""];
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"];
    _object.draggable = false;
    _object.style.position = "absolute";
    let [bookmarkHeader, bookmarkTitle, bookmarkType, tagsWrapper, tagsInput, deleteButton] = createBookmarkHTMLObject(_object);
    _object.append(bookmarkHeader, bookmarkTitle, tagsWrapper);
    // add classname
    _object._classNameList = _classNameList || [];
    _classNameList === null || _classNameList === void 0 ? void 0 : _classNameList.forEach(p => {
        _object.classList.add(p);
    });
    _object.applyStyle = function (styleData) {
        Object.entries(styleData).forEach(([key, value], _) => {
            _object.style[key] = value;
        });
    };
    _object.loadFromData = (injectedData) => {
        // className
        if (injectedData._classNameList && injectedData._classNameList.length > 0) {
            injectedData._classNameList.forEach((p) => _object.classList.add(p));
        }
        // data conent
        bookmarkTitle.innerHTML = injectedData.data.bookmarkTitle;
        bookmarkType.value = injectedData.data.bookmarkType;
        // style
        _object.applyStyle(injectedData.stylesheet);
        // identity
        _object._identity = injectedData._identity;
        _object.setAttribute("accessPointer", injectedData._identity.accessPointer);
    };
    _object.setMovable = function () {
        setObjectMovable(_object);
    };
    _object.extract = () => _object.createDataObject();
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
        let computedStyle = window.getComputedStyle(_object);
        (_a = _object === null || _object === void 0 ? void 0 : _object._styleStructure) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            dataObject["stylesheet"][p] = computedStyle[p];
        });
        dataObject["data"]["bookmarkTitle"] = bookmarkTitle.innerHTML;
        dataObject["data"]["bookmarkType"] = bookmarkType.value;
        console.log(130130, dataObject);
        // dataObject["data"]["tags"] =  bookmarkTitle.innerText
        return dataObject;
    };
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData);
    if (injectedData) {
        _object.loadFromData(injectedData);
        _object.objectData = injectedData;
    }
    return _object;
}
