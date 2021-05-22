import { superGNObject, createDummyData } from "./GreateNoteObjectHelperFunction";
//@auto-fold here
export function GNDropdownList(createData) {
    let { name, arrayID, insertPosition, dataPointer, saveToDatabase, specialCreationMessage, injectedData, statusList } = createData;
    let _object = document.createElement("select");
    statusList === null || statusList === void 0 ? void 0 : statusList.forEach(p => {
        let option = document.createElement("option");
        option.value = p;
        option.innerText = p;
        _object.appendChild(option);
    });
    _object._name = name;
    _object.GNType = "GNDropdownList";
    _object.GNSpecialCreationMessage = specialCreationMessage || "";
    _object._dataStructure = ["value"];
    _object._identity = { accessPointer: "", dataPointer: "", linkArray: [] };
    _object._styleStructure = [];
    _object.extract = () => _object.createDataObject();
    _object.createDataObject = function () {
        let dataObject = createDummyData();
        dataObject["GNType"] = _object.GNType;
        dataObject["GNSpecialCreationMessage"] = _object.GNSpecialCreationMessage || "";
        dataObject["specialGNType"] = _object.specialGNType || "";
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        dataObject["classList"] = Array.from(_object.classList);
        // data structure
        dataObject["data"]["value"] = _object["value"];
        // stylesheet data
        return dataObject;
    };
    _object.loadFromData = (data) => {
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
        _object.specialGNType = data.specialGNTyp;
        _object.setAttribute("accessPointer", data._identity.accessPointer);
        _object._identity = data._identity;
        if (data.classList)
            data.classList.forEach((p) => _object.classList.add(p));
        _object["value"] = data["data"]["value"];
    };
    _object.applyStyle = (styleObject, saveToDatabase = true) => { };
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, "input");
    _object.addEventListener("change", (e) => {
        var _a;
        e.stopPropagation();
        if (((_a = _object === null || _object === void 0 ? void 0 : _object._identity) === null || _a === void 0 ? void 0 : _a.accessPointer) != "")
            _object.saveHTMLObjectToDatabase();
        if (_object.processUpdateData)
            _object.processUpdateData();
    }, false); //addEventListener
    return _object;
}
