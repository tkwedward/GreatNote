// import express from "express"
const express = require("express")
const path = require("path")
const port = 3000
const fs = require("fs")
const Automerge = require("automerge")
const app = express()
const talkNotes = require("./routes/talkNotes")
import {jsonify, AutomergeMainDoc, AutomergeMainDocInterface} from "./automergeHelperFunction"
// server.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, './build')));
app.set("views", [path.join(__dirname, "./dist/templates")])

app.use("/talkNotes", talkNotes)

const server = require("http").Server(app);
const io = require("socket.io")(server)

app.get("/board", (req, res)=>{
  res.sendFile(__dirname + "/public/board.html")
})

let turnOnServerMode = true
// turnOnServerMode = false

// socketArray = []
let jsonFileLocation = path.join(__dirname, "./dist/data/automergeData.txt")
let jsonFileLocation2 = path.join(__dirname, "./dist/data/automergeDataJSON.txt")


let automergeMainDoc = new AutomergeMainDoc(jsonFileLocation)

io.on("connection", socket=>{
    socket.broadcast.emit('socketConnectionUpdate', {
      action: "connect", targetSocketId: socket.id
    });

    socket.on("message", data => {
        console.log(new Date());
    })

    socket.on("clientWantsToBroadcastMessage", data=> socket.broadcast.emit("broadcastMessage", data))

    socket.on("clientAskServerForSocketData", data => {
      let socketData = {
          "yourSocketId": socket.id,
          "socketArray": Array.from( io.sockets.sockets.keys())
      }

      socket.emit("serverSendSocketIdArray", socketData)
    })

  socket.on("initialDataRequest", async ()=>{
      // automergeMainDoc.initializeRootArray().then(p=>{
      //
      // })
      let result = await automergeMainDoc.initializeRootArray()
      socket.emit("processInitialData", result)
  })


  socket.on("disconnect", ()=>{
    console.log("user disconnected");
    io.emit("message", "user disconnected")
    socket.broadcast.emit('socketConnectionUpdate', {
      action: "disconnect", targetSocketId: socket.id
    });
  })

  socket.on("clientSendChangesToServer",async  changeList=>{

      let mongoClient = await automergeMainDoc.mongoDB.connect()
      const database =  mongoClient.db("GreatNote")
      let allNotebookDB = database.collection("allNotebookDB")

      let changeListToClients = changeList.map(async changeData=> await automergeMainDoc.processChangeDataFromClients(allNotebookDB, changeData, socket.id))

      io.emit("message", "finish saving")
      io.emit("serverSendChangeFileToClient", changeList)
  })


  socket.on("resetNoteBook", saveData=>{
    console.log("resetNotebook")
     fs.writeFileSync(jsonFileLocation, saveData);
  })

  socket.on("saveNotebookUsingClientData",async data => {
    // console.log(data)
    Automerge.load(data)
      await fs.writeFileSync(jsonFileLocation, data);
  }) // saveMainDocToDisk
})

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
