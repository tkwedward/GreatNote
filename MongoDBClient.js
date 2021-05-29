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
exports.MongoBackEnd = void 0;
var mongodb_1 = require("mongodb");
var notebookDataBaseName = "GreatNote";
var mainDocArrayName = [
    "mainArray_pageFull", "mainArray_pageOverview", "mainArray_bookmark", "mainArray_pokemon", "mainArray_panel"
];
var rootNode = {
    GNType: "None",
    data: {},
    stylesheet: {},
    _identity: {
        parentAccessPointer: "",
        children: [],
        accessPointer: "00000-00000",
        dataPointer: "00000-00000",
        linkedArray: ["00000-00000"]
    }
};
function createUniqueID() {
    var temporaryPointer = "" + (Date.now().toString(36) + Math.random().toString(36).substr(2));
    return temporaryPointer;
}
var MongoBackEnd = /** @class */ (function () {
    function MongoBackEnd() {
        this.mongoUrl = "mongodb://localhost:27017";
        this.client = null;
        this.collection = null;
    }
    MongoBackEnd.prototype.testConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongoClient, database, allNotebookDB, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        mongoClient = _a.sent();
                        database = mongoClient.db(notebookDataBaseName);
                        allNotebookDB = database.collection("allNotebookDB");
                        return [4 /*yield*/, allNotebookDB.findOne({})];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    MongoBackEnd.prototype.createNewNoteBook = function (notebookInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoClient, database, newNotebookDB, overallNoteBookInfoDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        mongoClient = _a.sent();
                        database = mongoClient.db(notebookDataBaseName);
                        newNotebookDB = database.collection(notebookInfo.notebookID);
                        return [4 /*yield*/, newNotebookDB.insertOne(notebookInfo)
                            // this is tthe overall
                        ];
                    case 2:
                        _a.sent();
                        overallNoteBookInfoDB = database.collection("overallNoteBookInfoDB");
                        return [4 /*yield*/, overallNoteBookInfoDB.insertOne(notebookInfo)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.disconnect()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoBackEnd.prototype.deleteNoteBook = function (notebookID) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoClient, database, newNotebookDB, overallNoteBookInfoDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        mongoClient = _a.sent();
                        database = mongoClient.db(notebookDataBaseName);
                        newNotebookDB = database.collection(notebookID);
                        return [4 /*yield*/, newNotebookDB.drop()
                            // this is tthe overall
                        ];
                    case 2:
                        _a.sent();
                        overallNoteBookInfoDB = database.collection("overallNoteBookInfoDB");
                        overallNoteBookInfoDB.deleteOne({ notebookID: notebookID });
                        return [4 /*yield*/, this.disconnect()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoBackEnd.prototype.getOverallNotebookData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongoClient, database, overallNoteBookInfoDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        mongoClient = _a.sent();
                        database = mongoClient.db(notebookDataBaseName);
                        overallNoteBookInfoDB = database.collection("overallNoteBookInfoDB");
                        return [4 /*yield*/, overallNoteBookInfoDB.find({}, {
                                projection: { notebookName: 1, notebookID: 1, _id: 0 }
                            }).toArray()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoBackEnd.prototype.createEmptyNotebook = function (collection) {
        return __awaiter(this, void 0, void 0, function () {
            var mainArrayNodes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.insertOne(rootNode)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mainDocArrayName.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                                var uniqueID, htmlObjectData, databaseMessage;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            uniqueID = createUniqueID();
                                            htmlObjectData = {
                                                GNType: p,
                                                data: {},
                                                array: [],
                                                stylesheet: {},
                                                _classNameList: [],
                                                _identity: {
                                                    parentAccessPointer: rootNode._identity.accessPointer,
                                                    children: [],
                                                    accessPointer: uniqueID, dataPointer: uniqueID,
                                                    linkArray: [uniqueID]
                                                }
                                            } // return object
                                            ;
                                            databaseMessage = this.createDatabaseMessage("create", htmlObjectData);
                                            console.log(90909090, databaseMessage);
                                            return [4 /*yield*/, this.createItem(collection, databaseMessage)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })]; // map
                    case 2:
                        mainArrayNodes = _a.sent() // map
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoBackEnd.prototype.initializeFirstNotebook = function (notebookID) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoClient, database, allNotebookDB, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(125125, notebookID);
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        mongoClient = _a.sent();
                        database = mongoClient.db(notebookDataBaseName);
                        allNotebookDB = database.collection(notebookID);
                        return [4 /*yield*/, allNotebookDB.countDocuments()
                            // await allNotebookDB.drop()
                        ];
                    case 2:
                        count = _a.sent();
                        if (!(count <= 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.createEmptyNotebook(allNotebookDB)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.getInitializeNotebookData(allNotebookDB)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }; // initializeFirstNotebook
    MongoBackEnd.prototype.getItem = function (collection, databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.findOne(databaseMessage.accessPinter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoBackEnd.prototype.createItem = function (collection, databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(129129, databaseMessage, databaseMessage.htmlObjectData);
                        return [4 /*yield*/, collection.insertOne(databaseMessage.htmlObjectData)]; // insertOne
                    case 1:
                        _a.sent(); // insertOne
                        if (!!databaseMessage.metaData.insertPosition) return [3 /*break*/, 3];
                        return [4 /*yield*/, collection.updateOne({
                                "_identity.accessPointer": databaseMessage.metaData.parentAccessPointer
                            }, // _identity.accessPointer
                            {
                                "$push": { "_identity.children": databaseMessage.metaData.accessPointer }
                            } // push
                            )]; // updateONes
                    case 2:
                        _a.sent(); // updateONes
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, collection.updateOne({
                            "_identity.accessPointer": databaseMessage.metaData.parentAccessPointer
                        }, // _identity.accessPointer
                        {
                            $push: {
                                "_identity.children": {
                                    $each: [databaseMessage.metaData.accessPointer],
                                    $position: databaseMessage.metaData.insertPosition
                                }
                            } // #push
                        } // 2nd argumement
                        )]; // updateONes
                    case 4:
                        _a.sent(); // updateONes
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }; // createItem
    MongoBackEnd.prototype.updateItem = function (collection, databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.updateOne({
                            "_identity.accessPointer": databaseMessage.htmlObjectData._identity.accessPointer
                        }, {
                            "$set": {
                                "_classNameList": databaseMessage.htmlObjectData._classNameList,
                                "data": databaseMessage.htmlObjectData.data,
                                "stylesheet": databaseMessage.htmlObjectData.stylesheet
                            }
                        })]; // updateONes
                    case 1:
                        _a.sent(); // updateONes
                        return [2 /*return*/];
                }
            });
        });
    }; // updateItem
    MongoBackEnd.prototype.deleteItem = function (collection, databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.remove({
                            "_identity.accessPointer": databaseMessage.metaData.accessPointer
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, collection.update({
                                "_identity.accessPointer": databaseMessage.metaData.parentAccessPointer
                            }, { "$pull": { "_identity.children": databaseMessage.metaData.accessPointer } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }; // deleteItem
    MongoBackEnd.prototype.createDatabaseMessage = function (action, htmlObjectData) {
        var parentAccessPointer = htmlObjectData._identity.parentAccessPointer;
        var accessPointer = htmlObjectData._identity.accessPointer;
        var dataPointer = htmlObjectData._identity.dataPointer;
        var databaseMessage = {
            htmlObjectData: htmlObjectData,
            metaData: {
                action: action,
                insertPosition: null,
                parentAccessPointer: parentAccessPointer,
                accessPointer: accessPointer,
                dataPointer: dataPointer
            }
        };
        return databaseMessage;
    };
    MongoBackEnd.prototype.recursiveGetChildNodeData = function (collection, nodeData, level) {
        return __awaiter(this, void 0, void 0, function () {
            var childNodeArray;
            var _this = this;
            return __generator(this, function (_a) {
                nodeData.array = [];
                if (nodeData._identity.children.length > 0 && level != 0) {
                    if (level)
                        level -= 1;
                    childNodeArray = nodeData._identity.children.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                        var childNodeData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, collection.findOne({ "_identity.accessPointer": p })];
                                case 1:
                                    childNodeData = _a.sent();
                                    return [4 /*yield*/, this.recursiveGetChildNodeData(collection, childNodeData, level)];
                                case 2: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.all(childNodeArray).then(function (p) {
                            nodeData.array = p;
                            return nodeData;
                        })];
                }
                else {
                    return [2 /*return*/, nodeData];
                } // nodeData._identity.children.length > 0
                return [2 /*return*/];
            });
        });
    };
    MongoBackEnd.prototype.getChildNodeData = function (collection, nodeData) {
        return __awaiter(this, void 0, void 0, function () {
            var childNodeArray;
            var _this = this;
            return __generator(this, function (_a) {
                nodeData.array = [];
                if (nodeData._identity.children.length > 0) {
                    childNodeArray = nodeData._identity.children.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                        var childNodeData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, collection.findOne({ "_identity.accessPointer": p })];
                                case 1:
                                    childNodeData = _a.sent();
                                    return [2 /*return*/, childNodeData];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.all(childNodeArray).then(function (p) {
                            nodeData.array = p;
                            return nodeData;
                        })];
                }
                return [2 /*return*/];
            });
        });
    }; // getChildNodeData
    MongoBackEnd.prototype.getInitializeNotebookData = function (collection) {
        return __awaiter(this, void 0, void 0, function () {
            var rootNode, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.findOne({ "_identity.accessPointer": "00000-00000" })];
                    case 1:
                        rootNode = _a.sent();
                        rootNode["array"] = [];
                        return [4 /*yield*/, this.recursiveGetChildNodeData(collection, rootNode, 3)];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        return [4 /*yield*/, rootNode];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // async getInitializeNotebookData(collection){
    //     let rootNode = await collection.findOne({ "_identity.accessPointer": "00000-00000" })
    //     rootNode["array"] = []
    //
    //     let childNodeArray =  rootNode._identity.children.map(async p=>{
    //         let mainArrayNode = await collection.findOne({"_identity.accessPointer": p})
    //
    //         mainArrayNode = await this.getChildNodeData(collection, mainArrayNode)
    //         // console.log(262262, mainArrayNode)
    //
    //         mainArrayNode.array.forEach(q=>{
    //           console.log(267267, q)
    //         })
    //
    //         return mainArrayNode
    //
    //     })
    //     // console.log(270270, childNodeArray)
    //
    //     rootNode = await this.getChildNodeData(collection, rootNode)
    //
    //
    //
    //     return await rootNode
    // }
    // async getInitializeNotebookData(collection){
    //     let initializeNotebookData = await collection.findOne({
    //       "_identity.accessPointer": "00000-00000"
    //     })
    //
    //     let childNodeArray =  nodeData._identity.children.map(async p=>{
    //         let childNodeData = await collection.findOne({"_identity.accessPointer": p})
    //
    //         return await this.getChildNodeData(collection, childNodeData)
    //     })
    //
    //     return Promise.all(childNodeArray).then(p=>{
    //         nodeData.array = p
    //         return nodeData
    //     })
    //
    //
    //     return await this.getChildNodeData(collection, initializeNotebookData)
    // }
    MongoBackEnd.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongoClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoClient = new mongodb_1.MongoClient(this.mongoUrl, {
                            // useUnifiedTopology: true,
                            useNewUrlParser: true
                        });
                        console.info("connection to MongoDB");
                        return [4 /*yield*/, mongoClient.connect()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoBackEnd.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.client)
                    return [2 /*return*/, this.client.close()];
                console.log("The mongoClient is closed.");
                return [2 /*return*/, false];
            });
        });
    };
    return MongoBackEnd;
}());
exports.MongoBackEnd = MongoBackEnd;
