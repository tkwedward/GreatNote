"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AutomergeMainDoc = exports.jsonify = exports.MainDocArrayEnum = void 0;
var Automerge = require("automerge");
var fs = require("fs");
var MainDocArrayEnum;
(function (MainDocArrayEnum) {
    MainDocArrayEnum["mainArray_pageFull"] = "mainArray_pageFull";
    MainDocArrayEnum["mainArray_pageOverview"] = "mainArray_pageOverview";
    MainDocArrayEnum["mainArray_bookmark"] = "mainArray_bookmark";
    MainDocArrayEnum["mainArray_panel"] = "mainArray_panel";
    MainDocArrayEnum["mainArray_pokemon"] = "mainArray_pokemon";
})(MainDocArrayEnum = exports.MainDocArrayEnum || (exports.MainDocArrayEnum = {}));
function jsonify(x) {
    if (Array.isArray(x)) {
        return x.map(function (p) { return jsonify(p); });
    }
    else if (typeof x === 'object') {
        var newX_1 = {};
        Object.entries(x).forEach(function (_a, _) {
            var key = _a[0], value = _a[1];
            newX_1[key] = jsonify(value);
        });
        return newX_1;
    }
    else {
        return x;
    }
}
exports.jsonify = jsonify;
var initializeArray = { name: "root", array: [] };
function createDummyData() {
    return {
        htmlObjectData: {
            array: [],
            _classNameList: [],
            _identity: {
                accessPointer: "",
                dataPointer: "",
                linkArray: []
            }
        },
        metaData: {
            insertPosition: null,
            dataPointer: "",
            specialCreationMessage: "",
            temporaryPointer: ""
        }
    };
}
var AutomergeMainDoc = /** @class */ (function () {
    function AutomergeMainDoc(jsonFileLocation) {
        this.mainDoc = Automerge.from(initializeArray);
        this.previousDoc = Automerge.from(initializeArray);
        this.mainDocArray = {};
        this.changeList = [];
        this.jsonFileLocation = jsonFileLocation;
        this.baseArrayID = Automerge.getObjectId(this.mainDoc);
        // initialize the root array
        this.initializeRootArray();
        for (var arrayName in MainDocArrayEnum) {
            var htmlObjectData = {
                "data": { "name": arrayName },
                "array": [],
                "_identity": { "dataPointer": "", "accessPointer": "", "linkArray": [] },
                "_classList": [],
                "styleSheet": {},
                "GNType": "",
                "specialGNType": ""
            };
            this.addData({
                htmlObjectData: htmlObjectData,
                metaData: {
                    insertPosition: false,
                    dataPointer: false,
                    specialCreationMessage: "",
                    temporaryPointer: "",
                    arrayID: this.baseArrayID
                }
            });
        }
        // this.addData(this.mainDocArray["mainArray_pageFull"], createDummyData())
    }
    AutomergeMainDoc.prototype.addItemToChangeList = function (item) {
        if (this.changeList.length > 10000)
            this.changeList.pop();
        this.changeList.push(item);
    };
    AutomergeMainDoc.prototype.getArrayIdFromChangeList = function (temporaryPointer) {
        for (var i = this.changeList.length - 1; i >= 0; i--) {
            // console.log(this.changeList[i])
            if (this.changeList[i].temporaryPointer == temporaryPointer) {
                return this.changeList[i].arrayID; // the arrayID of the parent
            }
        }
    };
    AutomergeMainDoc.prototype.initializeRootArray = function () {
        for (var arrayName in MainDocArrayEnum)
            this.mainDocArray[arrayName] = "";
    };
    AutomergeMainDoc.prototype.addData = function (saveDataMessage) {
        var _this = this;
        var initializeMessage = { "action": "create", "objectID": "" };
        var htmlObjectData = saveDataMessage.htmlObjectData, metaData = saveDataMessage.metaData;
        var addToChangeList = true;
        var insertPosition = metaData.insertPosition, dataPointer = metaData.dataPointer, specialCreationMessage = metaData.specialCreationMessage, temporaryPointer = metaData.temporaryPointer, arrayID = metaData.arrayID;
        if (arrayID == "" || arrayID.startsWith("temporaryPointer_")) {
            // to replace thee temporaryPointer to true arrayID
            arrayID = this.getArrayIdFromChangeList(arrayID);
            metaData["arrayID"] = arrayID;
        }
        // if (dataPointer?.startsWith("temporaryPointer_")){
        //   dataPointer = this.getArrayIdFromChangeList(dataPointer)
        // }
        // to convertt tthe data pointer
        // step 1, to regiestter a place
        this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(initializeMessage), function (doc) {
            // console.log("====================")
            // console.log(222333, "metaData", metaData, "arrayID", arrayID)
            // console.log(222333, this.changeList)
            //
            // console.log("====================")
            var arrayToBeAttachedTo = Automerge.getObjectById(doc, arrayID)["array"];
            if (!insertPosition)
                insertPosition = arrayToBeAttachedTo.length;
            arrayToBeAttachedTo.insertAt(insertPosition, {});
        });
        // // step 2 update the identityProperties of the object
        var arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"];
        // console.log("======== step 2: get arrayToBeAttachedTo ============")
        // console.log(arrayToBeAttachedTo)
        var objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[insertPosition]);
        var accessPointer = arrayToBeAttachedTo[insertPosition][objectSymbolArray[1]];
        this.addItemToChangeList({
            temporaryPointer: temporaryPointer,
            arrayID: accessPointer
        });
        // // create new object data
        // console.log("130130 , dataPointer before", dataPointer)
        if (dataPointer) {
            var validDataPointer = Automerge.getObjectById(this.mainDoc, dataPointer);
            if (!validDataPointer) {
                dataPointer = this.getArrayIdFromChangeList(dataPointer);
            }
            metaData["dataPointer"] = dataPointer;
            htmlObjectData._identity.dataPointer = dataPointer;
        }
        else {
            htmlObjectData._identity.dataPointer = accessPointer;
        }
        htmlObjectData._identity.linkArray.push(accessPointer);
        // add data to changelist
        htmlObjectData._identity.accessPointer = accessPointer;
        // Step 3: put real data into the database
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            // add the data to the object
            var objectInDatabase = Automerge.getObjectById(doc, accessPointer);
            Object.entries(htmlObjectData).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                objectInDatabase[key] = value;
            });
            // update the masterobject if it is a link object
            if (dataPointer) {
                var masterObject = _this.getObjectById(dataPointer, doc);
                masterObject._identity.linkArray.push(accessPointer);
                // masterObjectHtmlElement?._identity.linkArray.push(accessPointer) // **** this line may be deleted because we do not need to access the linkArray of the master object
            }
        });
        return { htmlObjectData: htmlObjectData, metaData: metaData };
    };
    AutomergeMainDoc.prototype.deleteFromDatabase = function (deleteMessage) {
        var _this = this;
        var _a = deleteMessage.metaData, parentAccessPointer = _a.parentAccessPointer, accessPointer = _a.accessPointer;
        this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(deleteMessage), function (doc) {
            var parentObject = _this.getObjectById(parentAccessPointer, doc);
            var targetObject = _this.getObjectById(accessPointer, doc);
            var index = parentObject["array"].indexOf(targetObject);
            if (index != -1)
                parentObject["array"].deleteAt(index);
        });
        return deleteMessage;
    };
    AutomergeMainDoc.prototype.updateDataInDatabase = function (htmlObjectData) {
        var _a = htmlObjectData._identity, accessPointer = _a.accessPointer, dataPointer = _a.dataPointer;
        this.mainDoc = Automerge.change(this.mainDoc, function (doc) {
            var dataPointerObejct = Automerge.getObjectById(doc, dataPointer);
            var accessPointerObject = Automerge.getObjectById(doc, accessPointer);
            // update the data
            Object.entries(htmlObjectData.data).forEach(function (_a, _) {
                var key = _a[0], value = _a[1];
                return dataPointerObejct["data"][key] = value;
            });
            if (htmlObjectData._classNameList)
                dataPointerObejct["_classNameList"] = htmlObjectData._classNameList;
            // update the stylesheet
            if (accessPointer != dataPointer) {
                // if it is a link object
                Object.entries(htmlObjectData.stylesheet).forEach(function (_a, _) {
                    var key = _a[0], value = _a[1];
                    accessPointerObject["stylesheet"][key] = value;
                });
            }
            else {
                // if it is the main object
                Object.entries(htmlObjectData.stylesheet).forEach(function (_a, _) {
                    var key = _a[0], value = _a[1];
                    dataPointerObejct["stylesheet"][key] = value;
                });
            }
        });
    };
    AutomergeMainDoc.prototype.loadMainDoc = function () {
        var data = fs.readFileSync(this.jsonFileLocation);
        this.mainDoc = Automerge.load(data);
    };
    AutomergeMainDoc.prototype.saveMainDoc = function (sendRequest) {
        if (sendRequest === void 0) { sendRequest = false; }
        return __awaiter(this, void 0, void 0, function () {
            var saveData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saveData = Automerge.save(this.mainDoc);
                        return [4 /*yield*/, fs.writeFileSync(this.jsonFileLocation, saveData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }; // saveMainDoc
    AutomergeMainDoc.prototype.getObjectById = function (objectID, doc) {
        if (doc === void 0) { doc = this.mainDoc; }
        return Automerge.getObjectById(doc, objectID);
    };
    AutomergeMainDoc.prototype.processUpdateDataHelper = function (updateData) {
        var oldAccessPointer = updateData.htmlObjectData._identity.accessPointer;
        var newAccessPointer = "";
        // to update the temporaryPointer to accessPointer
        if (oldAccessPointer.startsWith("temporaryPointer_")) {
            newAccessPointer = this.getArrayIdFromChangeList(oldAccessPointer);
        }
        else {
            newAccessPointer = oldAccessPointer;
        }
        var accessPointerDataObject = this.getObjectById(newAccessPointer);
        // update the identity
        updateData.htmlObjectData._identity = accessPointerDataObject._identity;
        // update the database
        this.updateDataInDatabase(updateData.htmlObjectData);
        return updateData;
    };
    AutomergeMainDoc.prototype.processDatabaseOperationData = function (data, socketID) {
        data.metaData.socketId = socketID;
        if (data.metaData.action == "create") {
            var changeDataToClient = this.addData(data);
            // console.log(changeDataToClient)
            return changeDataToClient;
        } // create
        if (data.metaData.action == "update") {
            var updateData = this.processUpdateDataHelper(data);
            return data;
        } // update
        if (data.metaData.action == "delete") {
            var deleteMessage = this.deleteFromDatabase(data);
            return deleteMessage;
        } // delete
    };
    return AutomergeMainDoc;
}());
exports.AutomergeMainDoc = AutomergeMainDoc;
