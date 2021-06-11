// import express from "express"
const express = require("express")
const path = require("path")
const port = 3000
const fs = require("fs")
const Automerge = require("automerge")
const app = express()
const talkNotes = require("./routes/talkNotes")
import {AutomergeMainDoc, AutomergeMainDocInterface} from "./automergeHelperFunction"
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


let automergeMainDoc: AutomergeMainDocInterface = new AutomergeMainDoc(jsonFileLocation)

  io.on("connection", socket=>{
    socket.on("message", data => {
    console.log(new Date(), data);
  })

  socket.on('joinRoom', function(room) {
    socket.join(room);
  });

  socket.on("clientsAskForOverallNoteBookInfo", async ()=>{
    let overallNotebookInfo = await automergeMainDoc.mongoDB.getOverallNotebookData()
    console.log(overallNotebookInfo)

    socket.emit("serverResponsesForOverallNoteBookInfo", overallNotebookInfo)
  })

  socket.on("clientWantsToBroadcastMessage", data=> socket.broadcast.emit("broadcastMessage", data))

  socket.on("clientAskServerForSocketData", data => {
    let socketData = {
      "yourSocketId": socket.id,
      "socketArray": Array.from( io.sockets.sockets.keys())
    }
    socket.emit("serverSendSocketIdArray", socketData)
  })

  socket.on("initialDataRequest", async (notebookID: string)=>{
    let result = await automergeMainDoc.initializeRootArray(notebookID)
    socket.emit("processInitialData", result)
  })

  socket.on("clientSendChangesToServer",async  changeList=>{
    let notebooID = changeList[0].metaData.notebookID
    let mongoClient
    try {
      mongoClient = await automergeMainDoc.mongoDB.connect()
    }
    catch {
        io.to(notebooID).emit("mongoDBError")
    }

    const database =  mongoClient.db("GreatNote")
    let allNotebookDB = database.collection(notebooID)
    try {
        let changeListToClients = changeList.map(async changeData=> await automergeMainDoc.processChangeDataFromClients(allNotebookDB, changeData, socket.id))
    } catch {
        io.to(notebooID).emit("mongoDBError")
    }


    io.to(notebooID).emit("message", "finish saving")
    io.to(notebooID).emit("serverSendChangeFileToClient", changeList)
  })

  // operaation on notebook
  socket.on("createNewNotebook", (notebookInfo: {notebookName: string, notebookID: string})=>{
    console.log("=====================")
    console.log(636363, notebookInfo)
    console.log("=====================")

    automergeMainDoc.mongoDB.createNewNoteBook(notebookInfo)
    socket.emit("message", "create New Notebook")
  }) // createNewNotebook

  socket.on("deleteNotebook", (notebookID: string)=>{

    automergeMainDoc.mongoDB.deleteNoteBook(notebookID)
    socket.emit("message", "create New Notebook")
  }) // createNewNotebook

  socket.on("getPageData", async (requestData: { notebookID:string, pageID:string})=>{
      let mongoClient = await automergeMainDoc.mongoDB.connect()
      const database =  mongoClient.db("GreatNote")
      let allNotebookDB = database.collection(requestData.notebookID)
      let pageObject = await allNotebookDB.findOne({ "_identity.accessPointer": requestData.pageID })

      let pageInfo = await automergeMainDoc.mongoDB.recursiveGetChildNodeData(allNotebookDB, pageObject)
      socket.emit("receivePageDataFromServer", pageInfo)
  })


  socket.on("disconnect", ()=>{
    console.log("user disconnected");
    io.emit("message", "user disconnected")
    socket.broadcast.emit('socketConnectionUpdate', {
      action: "disconnect", targetSocketId: socket.id
    });
  })// disconnect
}) // io.on(connection)

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
