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
var automergeHelperFunction_1 = require("./automergeHelperFunction");
// server.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, './build')));
app.set("views", [path.join(__dirname, "./dist/templates")]);
app.use("/talkNotes", talkNotes);
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.get("/board", function (req, res) {
    res.sendFile(__dirname + "/public/board.html");
});
var turnOnServerMode = false;
// socketArray = []
var jsonFileLocation = path.join(__dirname, "./dist/data/automergeData.txt");
var jsonFileLocation2 = path.join(__dirname, "./dist/data/automergeDataJSON.txt");
var automergeMainDoc;
if (turnOnServerMode) {
    automergeMainDoc = new automergeHelperFunction_1.AutomergeMainDoc(jsonFileLocation);
    var data = fs.readFileSync(jsonFileLocation);
    automergeMainDoc.mainDoc = Automerge.load(data);
    setInterval(function () {
        return __awaiter(this, void 0, void 0, function () {
            var saveData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saveData = Automerge.save(automergeMainDoc.mainDoc);
                        return [4 /*yield*/, fs.writeFileSync(jsonFileLocation, saveData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }, 10000);
}
io.on("connection", function (socket) {
    socket.broadcast.emit('socketConnectionUpdate', {
        action: "connect", targetSocketId: socket.id
    });
    socket.on("message", function (data) {
        console.log(new Date());
    });
    socket.on("clientAskServerForSocketData", function (data) {
        var socketData = {
            "yourSocketId": socket.id,
            "socketArray": Array.from(io.sockets.sockets.keys())
        };
        socket.emit("serverSendSocketIdArray", socketData);
    });
    socket.on("initialDataRequest", function () {
        var jsonifiedMainDoc;
        if (turnOnServerMode) {
            jsonifiedMainDoc = automergeHelperFunction_1.jsonify(automergeMainDoc.mainDoc);
        }
        else {
            jsonifiedMainDoc = JSON.parse(fs.readFileSync(jsonFileLocation2));
        }
        //
        // fs.writeFileSync(jsonFileLocation2, JSON.stringify(jsonifiedMainDoc));
        socket.emit("processInitialData", jsonifiedMainDoc);
    });
    socket.on("disconnect", function () {
        console.log("user disconnected");
        io.emit("message", "user disconnected");
        socket.broadcast.emit('socketConnectionUpdate', {
            action: "disconnect", targetSocketId: socket.id
        });
    });
    socket.on("clientSendChangesToServer", function (changeList) { return __awaiter(void 0, void 0, void 0, function () {
        var changeListToClients;
        return __generator(this, function (_a) {
            changeListToClients = changeList.map(function (changeData) { return automergeMainDoc.processDatabaseOperationData(changeData, socket.id); });
            io.emit("message", "finish saving");
            io.emit("serverSendChangeFileToClient", changeListToClients);
            return [2 /*return*/];
        });
    }); });
    socket.on("resetNoteBook", function (saveData) {
        console.log("resetNotebook");
        fs.writeFileSync(jsonFileLocation, saveData);
    });
    socket.on("saveNotebookUsingClientData", function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.log(data)
                    Automerge.load(data);
                    return [4 /*yield*/, fs.writeFileSync(jsonFileLocation, data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }); // saveMainDocToDisk
});
server.listen(port, function () {
    console.log("Server is running on port " + port);
});
