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
exports.AutomergeMainDoc = exports.MainDocArrayEnum = void 0;
var MongoDBClient_1 = require("./MongoDBClient");
var fs = require("fs");
var MainDocArrayEnum;
(function (MainDocArrayEnum) {
    MainDocArrayEnum["mainArray_pageFull"] = "mainArray_pageFull";
    MainDocArrayEnum["mainArray_pageOverview"] = "mainArray_pageOverview";
    MainDocArrayEnum["mainArray_bookmark"] = "mainArray_bookmark";
    MainDocArrayEnum["mainArray_panel"] = "mainArray_panel";
    MainDocArrayEnum["mainArray_pokemon"] = "mainArray_pokemon";
})(MainDocArrayEnum = exports.MainDocArrayEnum || (exports.MainDocArrayEnum = {}));
var initializeArray = { name: "root", array: [] };
function createDummyData() {
    return {
        htmlObjectData: {
            data: {},
            stylesheet: {},
            _classNameList: [],
            _identity: {
                accessPointer: "",
                dataPointer: "",
                linkArray: [],
                children: [],
                parentAccessPointer: ""
            }
        },
        metaData: {
            insertPosition: null,
            parentAccessPointer: "",
            accessPointer: "",
            dataPointer: ""
        }
    };
}
var AutomergeMainDoc = /** @class */ (function () {
    function AutomergeMainDoc(jsonFileLocation) {
        this.changeList = [];
        this.jsonFileLocation = jsonFileLocation;
        this.mongoDB = new MongoDBClient_1.MongoBackEnd();
    }
    AutomergeMainDoc.prototype.addItemToChangeList = function (item) {
        if (this.changeList.length > 50000)
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
    AutomergeMainDoc.prototype.testMongoDBConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("====== test connection ======");
                        _b = (_a = console).log;
                        _c = ["0000: testConection"];
                        return [4 /*yield*/, this.mongoDB.testConnection()];
                    case 1:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        console.log("====== test connection end ======");
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomergeMainDoc.prototype.initializeRootArray = function (notebookID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mongoDB.initializeFirstNotebook(notebookID)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result
                            // result.then(p=>{
                            //     return p
                            // })
                        ];
                }
            });
        });
    };
    AutomergeMainDoc.prototype.addData = function (saveDataMessage) {
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
        return { htmlObjectData: htmlObjectData, metaData: metaData };
    };
    AutomergeMainDoc.prototype.updateDataInDatabase = function (htmlObjectData) {
        var _a = htmlObjectData._identity, accessPointer = _a.accessPointer, dataPointer = _a.dataPointer;
    };
    AutomergeMainDoc.prototype.processUpdateDataHelper = function (updateData) {
        var oldAccessPointer = updateData.htmlObjectData._identity.accessPointer;
        var newAccessPointer = "";
        // this.updateDataInDatabase(updateData.htmlObjectData)
        // console.log(updateData)
        return updateData;
    };
    AutomergeMainDoc.prototype.processChangeDataFromClients = function (collection, data, socketID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.metaData.socketId = socketID;
                        if (!(data.metaData.action == "create")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mongoDB.createItem(collection, data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(data.metaData.action == "update")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.mongoDB.updateItem(collection, data)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(data.metaData.action == "delete")) return [3 /*break*/, 6];
                        // let deleteMessage = this.deleteFromDatabase(data)
                        // return deleteMessage
                        return [4 /*yield*/, this.mongoDB.deleteItem(collection, data)];
                    case 5:
                        // let deleteMessage = this.deleteFromDatabase(data)
                        // return deleteMessage
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(data.metaData.action == "microUpdate")) return [3 /*break*/, 8];
                        console.log("received microUpdateData");
                        return [4 /*yield*/, this.mongoDB.microUpdate(collection, data)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return AutomergeMainDoc;
}());
exports.AutomergeMainDoc = AutomergeMainDoc;
