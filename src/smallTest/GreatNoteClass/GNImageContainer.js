import { superGNObject, createDummyData } from "./GreateNoteObjectHelperFunction";
//@auto-fold here
export function GNImageContainer(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, imgsrc, _classNameList } = createData;
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
    _object.loadFromData = (data) => {
        Object.entries(data.stylesheet).forEach(([key, value], _) => {
            _object.style[key] = value;
        });
    };
    _object.setMovable = function () {
        let eventName = "mousedown";
        let moveEventName = "mousemove";
        let attributeX = "left";
        let attributeY = "top";
        _object.style.position = "absolute";
        _object.addEventListener("mousedown", (e) => {
            let startX = e["screenX"];
            let startY = e["screenY"];
            let objectInitialX = 0;
            let objectInitialY = 0;
            let initialLeftValue = parseInt(_object.style[attributeX].replace("px", "")) || 0;
            let initialTopValue = parseInt(_object.style[attributeY].replace("px", "")) || 0;
            let currentX;
            let currentY;
            let deltaX = 0;
            let deltaY = 0;
            let mousemoveFunction = (e) => {
                currentY = e.screenY;
                currentX = e.screenX;
                deltaX = currentX - startX;
                deltaY = currentY - startY;
                let newX = _object.style[attributeX] = `${initialLeftValue + deltaX}px`;
                _object.style[attributeY] = `${initialTopValue + deltaY}px`;
            };
            _object.addEventListener("mousemove", mousemoveFunction, false);
            function endDragEvent(e) {
                var _a;
                Array.from((_a = _object === null || _object === void 0 ? void 0 : _object.parentNode) === null || _a === void 0 ? void 0 : _a.childNodes).forEach((p) => {
                    p["style"]["pointerEvents"] = "inherit";
                });
                let endX = e["screenX"];
                let endY = e["screenY"];
                _object.removeEventListener("mousemove", mousemoveFunction);
            }
            _object.addEventListener("mouseup", (e) => {
                endDragEvent(e);
                _object.saveHTMLObjectToDatabase();
            }, false);
            _object.addEventListener("mouseout", (e) => {
                endDragEvent(e);
            }, false);
        });
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
    _object.addEventListener("eventName", (e) => {
        // do something
    });
    return _object;
} // GNImage
