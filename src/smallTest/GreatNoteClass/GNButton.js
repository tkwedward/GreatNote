import { superGNObject, createDummyData } from "./GreateNoteObjectHelperFunction";
//@auto-fold here
export function GNButton(_name, statusList, arrayID, insertPosition, dataPointer, saveToDatabase) {
    let _object = document.createElement("button");
    _object._name = _name;
    _object.GNType = GNButton.name;
    _object.statusList = statusList;
    _object._dataStructure = ["innerText"];
    _object._styleStructure = [];
    _object.innerHTML = statusList[0];
    // functions
    _object.loadFromData = (data) => { _object.innerHTML = data; };
    _object.createDataObject = function () {
        let dataObject = createDummyData();
        // data structure
        dataObject["GNType"] = _object.GNType;
        dataObject["classList"] = Array.from(_object.classList);
        if (_object._identity)
            dataObject["_identity"] = _object._identity;
        _object._dataStructure.forEach((p) => {
            dataObject["data"][p] = _object[p];
        });
        // stylesheet data
        _object._styleStructure.forEach((p) => {
            dataObject["stylesheet"][p] = _object["style"][p];
        });
        return dataObject;
    };
    _object.extract = () => _object.createDataObject();
    _object.addClickEvent = function (clickFunction) {
        _object.addEventListener("click", (e) => {
            clickFunction(_object);
        });
    };
    // a user define array
    _object.addEventListener("click", () => {
        let currentIndex = _object.statusList.indexOf(_object.innerText);
        let nextIndex = (currentIndex + 1) % _object.statusList.length;
        _object.innerText = _object.statusList[nextIndex];
        _object.saveHTMLObjectToDatabase();
        _object.updateLinkObject();
    });
    // add extra funcitons to the object
    superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer);
    // _object.editEvent("input")
    return _object;
}
