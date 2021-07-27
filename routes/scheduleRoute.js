"use strict";
exports.__esModule = true;
var express = require("express");
var ejs = require("ejs");
var path = require("path");
var router = express.Router();
router.use(express.static(path.join(__dirname, './dist')));
router.use(express.static(path.join(__dirname, './build')));
router.get("/api/test", function (req, res) {
    res.status(200).json({ "status": "success" });
});
router.post("/api/create", function (req, res) {
    res.status(200).json({ "status": "success" });
});
module.exports = router;
