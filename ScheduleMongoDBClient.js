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
exports.ScheduleMongoDBClient = void 0;
var mongodb_1 = require("mongodb");
// import { MongoClient, ObjectId, Collection} from "mong"
var notebookDataBaseName = "Schedule";
var mainDocArrayName = [
    "mainArray_Pending", "mainArray_Planned", "mainArray_Processing"
];
var pendingSubArray = {
    type: "pendingSubArray",
    array: []
};
var plannedSubArary = {
    type: "plannedSubArary",
    array: []
};
var ScheduleMongoDBClient = /** @class */ (function () {
    function ScheduleMongoDBClient() {
        this.mongoUrl = "mongodb://127.0.0.1:27017";
        this.client = null;
        this.collection = null;
        this.initializeFirstNotebook();
    }
    ScheduleMongoDBClient.prototype.initializeFirstNotebook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection, rootArray, rootArrayExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.client || !this.client.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        database = this.client.db(notebookDataBaseName);
                        collection = database.collection("scheduleCollection");
                        rootArray = {
                            type: "mainArray",
                            uniqueID: "00000-00000",
                            array: []
                        };
                        return [4 /*yield*/, collection.findOne({ uniqueID: rootArray.uniqueID })];
                    case 3:
                        rootArrayExist = _a.sent();
                        if (!!rootArrayExist) return [3 /*break*/, 5];
                        return [4 /*yield*/, collection.insertOne(rootArray)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleMongoDBClient.prototype.createNewNoteBook = function (notebookInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var database, newNotebookDB, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.client || !this.client.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        database = this.client.db(notebookDataBaseName);
                        newNotebookDB = database.collection("scheduleCollection");
                        return [4 /*yield*/, newNotebookDB.countDocuments()];
                    case 3:
                        count = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScheduleMongoDBClient.prototype.transverseToLeaf = function (root) {
        return __awaiter(this, void 0, void 0, function () {
            var childNodeArray;
            var _this = this;
            return __generator(this, function (_a) {
                if (root && root.array) {
                    childNodeArray = root.array.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                        var childNodeData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getItem({ uniqueIDArray: [p] })];
                                case 1:
                                    childNodeData = _a.sent();
                                    return [4 /*yield*/, this.transverseToLeaf(childNodeData)];
                                case 2: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.all(childNodeArray).then(function (p) {
                            root.array = p;
                            return root;
                        })];
                }
                else {
                    return [2 /*return*/, root];
                }
                return [2 /*return*/];
            });
        });
    };
    ScheduleMongoDBClient.prototype.getInitialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.client || !this.client.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        database = this.client.db(notebookDataBaseName);
                        collection = database.collection("scheduleCollection");
                        return [4 /*yield*/, collection.findOne({ uniqueID: "00000-00000" })];
                    case 3:
                        item = _a.sent();
                        return [4 /*yield*/, this.transverseToLeaf(item)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ScheduleMongoDBClient.prototype.getInitialData2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection, item, targetObject;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.client || !this.client.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        database = this.client.db(notebookDataBaseName);
                        collection = database.collection("scheduleCollection");
                        return [4 /*yield*/, collection.findOne({ uniqueID: "00000-00000" })];
                    case 3:
                        item = _a.sent();
                        console.log(item);
                        targetObject = item.array.map(function (p) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getItem({ uniqueIDArray: [p] })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [2 /*return*/, Promise.all(targetObject)
                                .then(function (p) {
                                item.array = p;
                                return item;
                            })];
                }
            });
        });
    };
    ScheduleMongoDBClient.prototype.getItem = function (databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.client || !this.client.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        database = this.client.db(notebookDataBaseName);
                        collection = database.collection("scheduleCollection");
                        return [4 /*yield*/, collection.findOne({ uniqueID: databaseMessage.uniqueIDArray[0] })
                            // let item = await collection.findOne({uniqueID: "00000-00000"})
                        ];
                    case 3:
                        item = _a.sent();
                        // let item = await collection.findOne({uniqueID: "00000-00000"})
                        return [2 /*return*/, item
                            // return await collection.find({uniqueID:{$in:databaseMessage.uniqueIDArray}})
                        ];
                }
            });
        });
    };
    ScheduleMongoDBClient.prototype.createItem = function (databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.client || !this.client.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        database = this.client.db(notebookDataBaseName);
                        collection = database.collection("scheduleCollection");
                        return [4 /*yield*/, collection.insertOne(databaseMessage.newObjectData)]; // insertOne
                    case 3:
                        _a.sent(); // insertOne
                        return [4 /*yield*/, collection.updateOne({ uniqueID: databaseMessage.metaData.parentIdentifier }, {
                                $push: { array: databaseMessage.newObjectData.uniqueID }
                            } // 2nd argumement
                            )]; // updateONes
                    case 4:
                        _a.sent(); // updateONes
                        return [2 /*return*/];
                }
            });
        });
    }; // createItem
    ScheduleMongoDBClient.prototype.updateItem = function (databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.client || !this.client.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        database = this.client.db(notebookDataBaseName);
                        collection = database.collection("scheduleCollection");
                        return [4 /*yield*/, collection.updateOne({
                                uniqueID: databaseMessage.objectData.uniqueID
                            }, {
                                "$set": { "data": databaseMessage.objectData.data }
                            })]; // updateONes
                    case 3:
                        _a.sent(); // updateONes
                        return [2 /*return*/];
                }
            });
        });
    }; // updateItem
    ScheduleMongoDBClient.prototype.deleteItem = function (databaseMessage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.deleteOne({
                            "uniqueID": databaseMessage.objectData.uniqueID
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, collection.updateOne({
                                "_identity.accessPointer": databaseMessage.metaData.parentIdentifier
                            }, { "$pull": { "array": databaseMessage.objectData.uniqueID } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }; // deleteItem
    ScheduleMongoDBClient.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.client && this.client.isConnected())) return [3 /*break*/, 1];
                        console.log("reuse the connection.");
                        return [3 /*break*/, 3];
                    case 1:
                        this.client = new mongodb_1.MongoClient(this.mongoUrl, {
                            useUnifiedTopology: true,
                            useNewUrlParser: true,
                            keepAlive: true,
                            connectTimeoutMS: 300000,
                            socketTimeoutMS: 300000,
                            bufferMaxEntries: 0,
                            poolSize: 10
                        });
                        console.info("connection to MongoDB");
                        return [4 /*yield*/, this.client.connect()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleMongoDBClient.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.client)
                    return [2 /*return*/, this.client.close()];
                console.log("The mongoClient is closed.");
                return [2 /*return*/, false];
            });
        });
    };
    return ScheduleMongoDBClient;
}());
exports.ScheduleMongoDBClient = ScheduleMongoDBClient;
