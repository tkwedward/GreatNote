import { superGNObject, createDummyData } from "./GreateNoteObjectHelperFunction";
//@auto-fold here
export function GNInputField(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData } = createData;
    let _object = document.createElement("input");
    _object.GNType = "GNInputField";
    _object._name = name;
    _object._dataStructure = ["value"];
    _object._styleStructure = [];
    // functions
    _object.createDataObject = function () {
        var _a, _b;
        let dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = _object.GNType;
        dataObject["classList"] = Array.from(_object.classList);
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        (_a = _object === null || _object === void 0 ? void 0 : _object._dataStructure) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            dataObject["data"][p] = _object[p];
        });
        // stylesheet data
        (_b = _object === null || _object === void 0 ? void 0 : _object._styleStructure) === null || _b === void 0 ? void 0 : _b.forEach((p) => {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = () => _object.createDataObject();
    _object.loadFromData = (data) => _object.value = data.value;
    //@auto-fold here
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage);
    // if the object is assigned to the database, then this  addEventListener is to monitor the change
    // define what is the update action
    if (injectedData) {
        _object.identity = injectedData._identity;
        _object.setAttribute("accessPointer", _object.identity.accessPointer);
        _object.objectData = injectedData;
        if (injectedData._classNameList && injectedData._classNameList.length > 0) {
            _object.objectData._classNameList.forEach((p) => _object.classList.add(p));
        }
    }
    return _object;
} // GNInputField
