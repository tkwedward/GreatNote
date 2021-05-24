// import express from "express"
const express = require("express")
const path = require("path")
const port = 3000
const fs = require("fs")
const Automerge = require("automerge")
const app = express()
const talkNotes = require("./routes/talkNotes")
import {jsonify, AutomergeMainDoc} from "./automergeHelperFunction"
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


let automergeMainDoc
if (turnOnServerMode){
    automergeMainDoc = new AutomergeMainDoc(jsonFileLocation)

    let data = fs.readFileSync(jsonFileLocation)
    automergeMainDoc.mainDoc = Automerge.load(data)

    setInterval(async function(){
      let saveData = Automerge.save(automergeMainDoc.mainDoc)
      await fs.writeFileSync(jsonFileLocation, saveData);
    }, 10000)
}



io.on("connection", socket=>{
    socket.broadcast.emit('socketConnectionUpdate', {
      action: "connect", targetSocketId: socket.id
    });

    socket.on("message", data => {
        console.log(new Date());
    })

    socket.on("clientAskServerForSocketData", data => {
      let socketData = {
          "yourSocketId": socket.id,
          "socketArray": Array.from( io.sockets.sockets.keys())
      }

      socket.emit("serverSendSocketIdArray", socketData)
    })

  socket.on("initialDataRequest", ()=>{
      let jsonifiedMainDoc
      if (turnOnServerMode){
          jsonifiedMainDoc = jsonify(automergeMainDoc.mainDoc)

          fs.writeFileSync(jsonFileLocation2, JSON.stringify(jsonifiedMainDoc));
      } else {
          jsonifiedMainDoc = JSON.parse(fs.readFileSync(jsonFileLocation2))
      }
      //

      socket.emit("processInitialData", jsonifiedMainDoc)
  })


  socket.on("disconnect", ()=>{
    console.log("user disconnected");
    io.emit("message", "user disconnected")
    socket.broadcast.emit('socketConnectionUpdate', {
      action: "disconnect", targetSocketId: socket.id
    });
  })

  socket.on("clientSendChangesToServer",async  changeList=>{
      let changeListToClients = changeList.map(changeData=> automergeMainDoc.processDatabaseOperationData(changeData, socket.id))

      io.emit("message", "finish saving")
      io.emit("serverSendChangeFileToClient", changeListToClients)
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
