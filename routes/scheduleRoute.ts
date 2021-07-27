import {ScheduleMongoDBClient} from "../src/scheduleFolder/ScheduleMongoDBClient"
const express = require("express")
const ejs = require("ejs")
const path = require("path")
let router = express.Router();

router.use(express.static(path.join(__dirname, './dist')));
router.use(express.static(path.join(__dirname, './build')));

router.get("/api/test", (req, res) => {
  res.status(200).json({"status": "success"});
})

router.post("/api/create", (req, res) => {

  res.status(200).json({"status": "success"});
})



module.exports = router
