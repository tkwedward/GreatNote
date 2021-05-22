import { mainController } from "../../index";
import * as ToolBoxEvents from "../EventFolder/attachToolBoxEventsToLayers";
export function createDummyData() {
    return {
        "data": {},
        "array": [],
        "GNType": "",
        "specialGNType": "",
        "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [""] },
        "stylesheet": {},
        "GNSpecialCreationMessage": "",
        "_classNameList": []
    };
}
//@auto-fold here
export function superGNObject(_object, saveToDatabase, arrayID, insertPosition, dataPointer, specialCreationMessage, injectedData, attachEventListener = true) {
    _object = _object;
    _object._identity = {
        accessPointer: "", dataPointer: "", linkArray: []
    };
    console.log(4545423, injectedData);
    if (injectedData) {
        _object.identity = injectedData._identity;
        _object.setAttribute("accessPointer", _object.identity.accessPointer);
    }
    /** important function to extract data from individual elements*/
    // when the data is first created, add it to the database
    _object.addToDatabase = function (arrayID, insertPosition, dataPointer, specialCreationMessage) {
        let temporaryPointer = `temporaryPointer_${Date.now().toString(36) + Math.random().toString(36).substr(2)}`;
        _object._identity.accessPointer = temporaryPointer;
        _object.setAttribute("accessPointer", temporaryPointer);
        mainController.addData(arrayID, _object, temporaryPointer, insertPosition, dataPointer, specialCreationMessage);
    };
    _object.saveHTMLObjectToDatabase = function () {
        mainController.saveHTMLObjectToDatabase(_object);
    };
    /** to apply stylesheet to an element */
    _object.updateLinkObject = function () {
        let dataPointer = _object.getDataPointer();
        let accessPointer = _object.getAccessPointer();
        let masterObject = mainController.getObjectById(dataPointer);
        let linkArray = masterObject._identity.linkArray;
        let dataObject = _object.extract();
        linkArray.forEach((p) => {
            let targetHTML = document.querySelector(`*[accesspointer='${p}']`);
            if (p != accessPointer) {
                targetHTML === null || targetHTML === void 0 ? void 0 : targetHTML.loadFromData(dataObject);
            }
            else {
                // _object.saveHTMLObjectToDatabase()
            }
        });
    };
    _object.initializeHTMLObjectFromData = function (data) {
        console.log(data);
        _object.setAttribute("accessPointer", data._identity.accessPointer);
        _object._identity = data._identity;
        _object.GNType = data.GNType;
        _object.GNSpecialCreationMessage = data.GNSpecialCreationMessage;
    };
    _object.processUpdateData = function () {
        let objectData = _object.reloadDataFromDatabase();
        _object.updateLinkObject();
    };
    _object.reloadDataFromDatabase = function () {
        let dataPointer = _object.getDataPointer();
        let accessPointer = _object.getAccessPointer();
        let dataPointerObject = mainController.getObjectById(dataPointer);
        _object.loadFromData(dataPointerObject);
        //
        if (dataPointer != accessPointer) {
            let accessPointerObject = mainController.getObjectById(accessPointer);
            _object.applyStyle(accessPointerObject.stylesheet);
        }
        else {
            _object.applyStyle(dataPointerObject.stylesheet);
        }
        return dataPointerObject;
    };
    _object.appendTo = function (_parent) {
        _object._parent = _parent;
        _parent.appendChild(_object);
    };
    _object.generateGNObjectThroughGNType = function (_GNType, createDataObject) {
        return mainController.createGNObjectThroughName(_GNType, createDataObject);
    };
    // ========================================
    // =======   for database acces    ========
    // ========================================
    _object.getDataPointer = function () {
        return _object._identity.dataPointer;
    };
    _object.setDataPointer = function (dataPointer) {
        _object._identity.dataPointer = dataPointer;
    };
    _object.getAccessPointer = function () {
        return _object._identity.accessPointer;
    };
    _object.setAccessPointer = function (accessPointer) {
        _object._identity.accessPointer = accessPointer;
    };
    _object.getLinkArray = function () {
        let objectInDatabase = mainController.getObjectById(_object.getAccessPointer());
        return objectInDatabase._identity.linkArray;
    };
    // ========================================
    // =======   database operations   ========
    // ========================================
    _object.deleteFromDatabase = function () {
        // mainController
        mainController.deleteFromDataBase(_object);
    };
    _object.getDataFromDataBase = function () {
        return mainController.getObjectById(_object.getDataPointer());
    };
    if (attachEventListener) {
        attachEventListenerToLayer(mainController, arrayID, _object, injectedData);
    }
    if (saveToDatabase) {
        _object.addToDatabase(arrayID, insertPosition, dataPointer, specialCreationMessage);
        // _object.editEvent(editEvent)
    }
}
function attachEventListenerToLayer(mainController, arrayID, _object, injectedData) {
    if (_object.GNType == "GNSvg") {
        ToolBoxEvents.attachEventListenerToSvgBoard(mainController, _object);
    }
    if (injectedData === null || injectedData === void 0 ? void 0 : injectedData.GNSpecialCreationMessage) {
        ToolBoxEvents.attachEventListenerToDivLayer(mainController, _object);
    }
}
