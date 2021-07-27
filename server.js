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
// import express from "express"
var express = require("express");
var path = require("path");
var port = 3000;
var fs = require("fs");
var Automerge = require("automerge");
var app = express();
var talkNotes = require("./routes/talkNotes");
// const cryptoRouter = require("./routes/crypto")
var CoinGecko = require('coingecko-api');
var ScheduleMongoDBClient_1 = require("./ScheduleMongoDBClient");
var automergeHelperFunction_1 = require("./automergeHelperFunction");
// server.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, './build')));
app.set("views", [path.join(__dirname, "./dist/templates")]);
app.use("/talkNotes", talkNotes);
var server = require("http").Server(app);
var io = require("socket.io")(server);
var CoinGeckoClient = new CoinGecko();
app.get("/allCrpytoData", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CoinGeckoClient.coins.markets({
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: 1000,
                    page: 1,
                    sparkline: false,
                    price_change_percentage: "24h"
                })];
            case 1:
                data = _a.sent();
                res.json(data);
                return [2 /*return*/];
        }
    });
}); });
app.get("/crpyto", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render("crpyto.ejs");
        return [2 /*return*/];
    });
}); });
app.get("/schedule", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render("schedule.ejs");
        return [2 /*return*/];
    });
}); });
app.get("/board", function (req, res) {
    res.sendFile(__dirname + "/public/board.html");
});
var turnOnServerMode = true;
var changeListArray = [];
var changeListProcessing = false;
var connectedNodeIdArray = [];
// let connectedNodeIdArray = new Set()
// turnOnServerMode = false
// socketArray = []
var jsonFileLocation = path.join(__dirname, "./dist/data/automergeData.txt");
var jsonFileLocation2 = path.join(__dirname, "./dist/data/automergeDataJSON.txt");
var automergeMainDoc = new automergeHelperFunction_1.AutomergeMainDoc(jsonFileLocation);
io.on("connection", function (socket) {
    socket.on("message", function (data) {
        console.log(new Date(), data);
    });
    socket.on('joinRoom', function (item) {
        socket.join(item.notebookID);
        connectedNodeIdArray.push([item.nodeID, socket.id, item.notebookID]);
        console.log("new user joined");
        console.log("The user list is ", connectedNodeIdArray);
    });
    socket.on("clientsAskForOverallNoteBookInfo", function () { return __awaiter(void 0, void 0, void 0, function () {
        var overallNotebookInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, automergeMainDoc.mongoDB.getOverallNotebookData()];
                case 1:
                    overallNotebookInfo = _a.sent();
                    socket.emit("serverResponsesForOverallNoteBookInfo", overallNotebookInfo);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("clientWantsToBroadcastMessage", function (data) { return socket.broadcast.emit("broadcastMessage", data); });
    socket.on("clientAskServerForSocketData", function (data) {
        var socketData = {
            "yourSocketId": socket.id,
            "socketArray": Array.from(io.sockets.sockets.keys())
        };
        socket.emit("serverSendSocketIdArray", socketData);
    });
    socket.on("initialDataRequest", function (notebookID) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, automergeMainDoc.initializeRootArray(notebookID)];
                case 1:
                    result = _a.sent();
                    socket.emit("processInitialData", result);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("clientSendChangesToServer", function (changeList) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            changeList.forEach(function (p) { return changeListArray.push(p); });
            return [2 /*return*/];
        });
    }); });
    function processChangeList() {
        return __awaiter(this, void 0, void 0, function () {
            var item, notebookID, mongoClient, database, allNotebookDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(changeListArray.length > 0)) return [3 /*break*/, 4];
                        item = changeListArray.shift();
                        notebookID = item.metaData.notebookID;
                        return [4 /*yield*/, automergeMainDoc.mongoDB.connect()];
                    case 1:
                        mongoClient = _a.sent();
                        return [4 /*yield*/, automergeMainDoc.mongoDB.client.db("GreatNote")];
                    case 2:
                        database = _a.sent();
                        allNotebookDB = database.collection(notebookID);
                        //
                        // try {
                        return [4 /*yield*/, automergeMainDoc.processChangeDataFromClients(allNotebookDB, item, socket.id)
                            // } catch(err) {
                            //     console.log(err)
                            //     io.to(notebookID).emit("mongoDBError")
                            // }
                            //
                            //
                            //
                        ];
                    case 3:
                        //
                        // try {
                        _a.sent();
                        // } catch(err) {
                        //     console.log(err)
                        //     io.to(notebookID).emit("mongoDBError")
                        // }
                        //
                        //
                        //
                        io.to(notebookID).emit("message", "finish saving");
                        io.to(notebookID).emit("serverSendChangeFileToClient", item);
                        processChangeList();
                        return [3 /*break*/, 5];
                    case 4:
                        changeListProcessing = false;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var processChangeListIntervalFunction = setInterval(function () {
        if (!changeListProcessing && changeListArray.length > 0) {
            changeListProcessing = true;
            processChangeList();
            return;
        }
        else {
            // if changeListProcessing is true, that means we don't whant to do anythinig
            return;
        }
    }, 500);
    // operaation on notebook
    socket.on("createNewNotebook", function (notebookInfo) {
        console.log("=====================");
        console.log(636363, notebookInfo);
        console.log("=====================");
        automergeMainDoc.mongoDB.createNewNoteBook(notebookInfo);
        socket.emit("message", "create New Notebook");
    }); // createNewNotebook
    socket.on("deleteNotebook", function (notebookID) {
        automergeMainDoc.mongoDB.deleteNoteBook(notebookID);
        socket.emit("message", "create New Notebook");
    }); // createNewNotebook
    socket.on("getPageData", function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
        var mongoClient, database, allNotebookDB, pageObject, pageInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, automergeMainDoc.mongoDB.connect()];
                case 1:
                    mongoClient = _a.sent();
                    database = automergeMainDoc.mongoDB.client.db("GreatNote");
                    allNotebookDB = database.collection(requestData.notebookID);
                    return [4 /*yield*/, allNotebookDB.findOne({ "_identity.accessPointer": requestData.pageID })];
                case 2:
                    pageObject = _a.sent();
                    return [4 /*yield*/, automergeMainDoc.mongoDB.recursiveGetChildNodeData(allNotebookDB, pageObject)];
                case 3:
                    pageInfo = _a.sent();
                    socket.emit("receivePageDataFromServer", pageInfo);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("clientAskUserData", function (roomId) {
        io["in"](roomId).emit("serverSendUserData", connectedNodeIdArray);
    });
    socket.on("savePageChangeToDatabase", function (changeData) { return __awaiter(void 0, void 0, void 0, function () {
        var mongoClient, database, collection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("I am doing savePageChangeToDatabase");
                    return [4 /*yield*/, automergeMainDoc.mongoDB.connect()];
                case 1:
                    mongoClient = _a.sent();
                    return [4 /*yield*/, automergeMainDoc.mongoDB.client.db("GreatNote")];
                case 2:
                    database = _a.sent();
                    collection = database.collection(changeData.notebookID);
                    automergeMainDoc.mongoDB.savePageChangeToDatabase(collection, changeData.newPageOrderArray);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("disconnect", function () {
        console.log("user disconnected");
        io.emit("message", "user disconnected");
        var connectedSocketId = Array.from(io.sockets.sockets.keys());
        console.log("Before delete", connectedNodeIdArray);
        connectedNodeIdArray = connectedNodeIdArray.filter(function (p) { return connectedSocketId.indexOf(p[1]); });
        console.log("After delete", connectedNodeIdArray);
    }); // disconnect
}); // io.on(connection)
// about the schedule app
var scheduleMongoDB = new ScheduleMongoDBClient_1.ScheduleMongoDBClient();
app.get("/schedule/api/test", function (req, res) {
    res.status(200).json({ "status": "success" });
});
app.get("/schedule/api/getInitialData", function (req, res) {
    var _this = this;
    var body = '';
    req.on('data', function (chunk) {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, scheduleMongoDB.getInitialData()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
});
app.post("/schedule/api/getItem", function (req, res) {
    var _this = this;
    var body = '';
    req.on('data', function (chunk) {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
        var jsonData, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    jsonData = JSON.parse(body);
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, scheduleMongoDB.getItem(jsonData)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
});
app.post("/schedule/api/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        body = '';
        req.on('data', function (chunk) {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
            var jsonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonData = JSON.parse(body);
                        return [4 /*yield*/, scheduleMongoDB.createItem(jsonData)];
                    case 1:
                        _a.sent();
                        res.status(200).json({ "status": jsonData });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
app.post("/schedule/api/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        body = '';
        req.on('data', function (chunk) {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
            var jsonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonData = JSON.parse(body);
                        return [4 /*yield*/, scheduleMongoDB.updateItem(jsonData)];
                    case 1:
                        _a.sent();
                        res.status(200).json({ "status": "finish update" });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
app.post("/schedule/api/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        body = '';
        req.on('data', function (chunk) {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
            var jsonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonData = JSON.parse(body);
                        return [4 /*yield*/, scheduleMongoDB.deleteItem(jsonData)];
                    case 1:
                        _a.sent();
                        res.status(200).json({ "status": "finish update" });
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
server.listen(port, function () {
    console.log("Server is running on port " + port);
});
