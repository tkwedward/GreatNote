import { superGNObject, createDummyData, setObjectMovable } from "./GreateNoteObjectHelperFunction";
//@auto-fold here
export function GNImageContainer(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, imgsrc, _classNameList, injectedData } = createData;
    let _object = document.createElement("div");
    _object.draggable = false;
    _object._name = name;
    _object.GNType = "GNImageContainer";
    _object._dataStructure = ["src"];
    _object._styleStructure = ["width", "height", "left", "top", "position"];
    _object._classNameList = _classNameList || [];
    if (_classNameList) {
        _classNameList.forEach(p => _object.classList.add(p));
    }
    let image = document.createElement("img");
    image.src = imgsrc || "";
    image.style.width = "100%";
    image.draggable = false;
    image.onload = function () {
        _object.imageWidthToHeightRatio = image.width / image.height;
    };
    _object.appendChild(image);
    _object.loadFromData = (injectedData) => {
        Object.entries(injectedData.stylesheet).forEach(([key, value], _) => {
            _object.style[key] = value;
        });
        image.src = "/" + injectedData.data.src;
    };
    _object.setMovable = function () {
        setObjectMovable(_object);
    };
    _object.createDataObject = function () {
        var _a;
        let dataObject = createDummyData();
        // identity
        dataObject["GNType"] = _object.GNType;
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        // data
        dataObject["data"]["src"] = imgsrc;
        // stylesheet data
        (_a = _object === null || _object === void 0 ? void 0 : _object._styleStructure) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = () => _object.createDataObject();
    // image special function
    _object.addCaption = () => {
        // do something
    };
    _object.setImageSize = function (sizeData) {
        let { width, height } = sizeData;
        if (!height)
            height = width * 1 / _object.imageWidthToHeightRatio;
        if (!width)
            width = height * _object.imageWidthToHeightRatio;
        _object.style.width = width + "px";
        _object.style.height = height + "px";
    };
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage);
    if (injectedData) {
        _object.identity = injectedData._identity;
        _object.setAttribute("accessPointer", _object.identity.accessPointer);
        _object.objectData = injectedData;
        if (injectedData._classNameList && injectedData._classNameList.length > 0) {
            _object.objectData._classNameList.forEach((p) => _object.classList.add(p));
        }
    }
    _object.addEventListener("eventName", (e) => {
        // do something
    });
    return _object;
} // GNImage
