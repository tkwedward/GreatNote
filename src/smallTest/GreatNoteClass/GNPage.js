import { superGNObject, createDummyData } from "./GreateNoteObjectHelperFunction";
//@auto-fold here
export function GNPage(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, contentEditable, _classNameList } = createData;
    let _object = document.createElement("div");
    _object.childrenList = {};
    _object.GNType = "GNPage";
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = [];
    _object._styleStructure = [];
    _object.groupData = [];
    // add classname
    _object._classNameList = _classNameList || [];
    _classNameList === null || _classNameList === void 0 ? void 0 : _classNameList.forEach(p => {
        _object.classList.add(p);
    });
    _object.loadFromData = (injectedData) => {
        _object.GNSpecialCreationMessage = injectedData.GNSpecialCreationMessage;
        _object.specialGNType = injectedData.specialGNType;
        _object.groupData = injectedData.data.groupData || [];
        if (injectedData._classNameList)
            injectedData._classNameList.forEach((p) => _object.classList.add(p));
        _object._identity = injectedData._identity;
        _object.setAttribute("accessPointer", injectedData._identity.accessPointer);
    };
    _object.extract = () => _object.createDataObject();
    _object.createDataObject = function () {
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
        dataObject["_identity"] = _object._identity;
        dataObject["_classNameList"] = Array.from(_object.classList).filter(p => p != "currentPage");
        // data structure
        dataObject["data"]["groupData"] = _object["groupData"];
        // stylesheet data
        return dataObject;
    };
    _object.getGroupData = function () {
        return _object.groupData;
    };
    _object.addGroupToPage = function (groupData) {
        _object.groupData.push(groupData);
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
        if (injectedData._classNameList && injectedData._classNameList.length > 0) {
            injectedData._classNameList.forEach((p) => _object.classList.add(p));
        }
        _object.identity = injectedData._identity;
        _object.setAttribute("accessPointer", _object.identity.accessPointer);
        _object.objectData = injectedData;
    }
    return _object;
}
