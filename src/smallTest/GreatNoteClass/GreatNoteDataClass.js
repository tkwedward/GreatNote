import { superGNObject, createDummyData } from "./GreateNoteObjectHelperFunction";
//@auto-fold here
export function GNContainerDiv(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, contentEditable, _classNameList } = createData;
    let _object = document.createElement("div");
    _object.childrenList = {};
    _object.GNType = "GNContainerDiv";
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = ["textContent"];
    _object._styleStructure = ["background", "width", "height", "position", "left", "top"];
    // add classname
    _object._classNameList = _classNameList || [];
    _classNameList === null || _classNameList === void 0 ? void 0 : _classNameList.forEach(p => {
        _object.classList.add(p);
    });
    _object.loadFromData = (data) => {
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
        _object.specialGNType = data.specialGNType;
        if (data._classNameList)
            data._classNameList.forEach((p) => _object.classList.add(p));
        _object._identity = data._identity;
        _object.setAttribute("accessPointer", data._identity.accessPointer);
        if (contentEditable) {
            _object["textContent"] = data["data"]["textContent"];
        }
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
        // data structure
        if (contentEditable) {
            dataObject["data"]["textContent"] = _object["textContent"];
        }
        // stylesheet data
        (_a = _object === null || _object === void 0 ? void 0 : _object._styleStructure) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            dataObject["stylesheet"][p] = _object.style[p];
        });
        return dataObject;
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
    // // add events
    // let eventStatus = {t0: 0, t1: 0, run: true}
    // _object.addEventListener("input", (e:any)=>{
    //     e.stopPropagation()
    //     eventStatus.t0 = eventStatus.t1
    //     eventStatus.t1 = e.timeStamp
    //
    //     if ( eventStatus.t1 - eventStatus.t0 > 100){
    //         // let target = e["target"]
    //         if (_object._identity.accessPointer!="") _object.saveHTMLObjectToDatabase()
    //         if (_object.processUpdateData) _object.processUpdateData()
    //     }
    // }, false)//addEventListener
    return _object;
}
