// import express from "express"
const express = require("express")
const path = require("path")
const port = 3000
const fs = require("fs")
const Automerge = require("automerge")
const app = express()
const talkNotes = require("./routes/talkNotes")
// const cryptoRouter = require("./routes/crypto")
const CoinGecko = require('coingecko-api');
import {AutomergeMainDoc, AutomergeMainDocInterface} from "./automergeHelperFunction"
// server.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.static(path.join(__dirname, './build')));
app.set("views", [path.join(__dirname, "./dist/templates")])

app.use("/talkNotes", talkNotes)
// app.use("/crpyto", cryptoRouter)

const server = require("http").Server(app);
const io = require("socket.io")(server)


const CoinGeckoClient = new CoinGecko();

app.get("/allCrpytoData", async (req, res)=>{
  let data = await CoinGeckoClient.coins.markets({
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 1000,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h"
  })

  res.json(data)
})

app.get("/crpyto", async (req, res)=>{
    res.render("crpyto.ejs")
})


app.get("/board", (req, res)=>{
  res.sendFile(__dirname + "/public/board.html")
})

let turnOnServerMode = true
let changeListArray = []
let changeListProcessing = false
let connectedNodeIdArray = []
// let connectedNodeIdArray = new Set()
// turnOnServerMode = false

// socketArray = []
let jsonFileLocation = path.join(__dirname, "./dist/data/automergeData.txt")
let jsonFileLocation2 = path.join(__dirname, "./dist/data/automergeDataJSON.txt")


let automergeMainDoc: AutomergeMainDocInterface = new AutomergeMainDoc(jsonFileLocation)

io.on("connection", socket=>{
  socket.on("message", data => {
    console.log(new Date(), data);
  })

  socket.on('joinRoom', function(item: {notebookID: string, nodeID: string}) {
    socket.join(item.notebookID);



    connectedNodeIdArray.push([item.nodeID, socket.id, item.notebookID])

    console.log("new user joined")
    console.log("The user list is ", connectedNodeIdArray)
  });

  socket.on("clientsAskForOverallNoteBookInfo", async ()=>{
    let overallNotebookInfo = await automergeMainDoc.mongoDB.getOverallNotebookData()

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
    changeList.forEach(p=>changeListArray.push(p))
  })

  async function processChangeList(){
      if (changeListArray.length>0){
          let item = changeListArray.shift()

          let notebookID = item.metaData.notebookID


          let mongoClient = await automergeMainDoc.mongoDB.connect()

          const database = await automergeMainDoc.mongoDB.client.db("GreatNote")
          let allNotebookDB = database.collection(notebookID)
          //
          // try {
          await automergeMainDoc.processChangeDataFromClients(allNotebookDB, item, socket.id)
          // } catch(err) {
          //     console.log(err)
          //     io.to(notebookID).emit("mongoDBError")
          // }
          //
          //
          //
          io.to(notebookID).emit("message", "finish saving")
          io.to(notebookID).emit("serverSendChangeFileToClient", item)

          processChangeList()
      } else {
          changeListProcessing = false
      }
  }

  let processChangeListIntervalFunction = setInterval(()=>{
    if (!changeListProcessing && changeListArray.length > 0){
      changeListProcessing = true
      processChangeList()
      return
    } else {
      // if changeListProcessing is true, that means we don't whant to do anythinig
      return
    }
  } , 500)

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
      const database =  automergeMainDoc.mongoDB.client.db("GreatNote")
      let allNotebookDB = database.collection(requestData.notebookID)
      let pageObject = await allNotebookDB.findOne({ "_identity.accessPointer": requestData.pageID })

      let pageInfo = await automergeMainDoc.mongoDB.recursiveGetChildNodeData(allNotebookDB, pageObject)
      socket.emit("receivePageDataFromServer", pageInfo)
  })

  socket.on("clientAskUserData", (roomId)=>{
      io.in(roomId).emit("serverSendUserData", connectedNodeIdArray)
  })

  socket.on("savePageChangeToDatabase", async (changeData: {notebookID: string, newPageOrderArray: string[]})=>{

      console.log("I am doing savePageChangeToDatabase")
      let mongoClient = await automergeMainDoc.mongoDB.connect()

      const database = await automergeMainDoc.mongoDB.client.db("GreatNote")
      let collection = database.collection(changeData.notebookID)


      automergeMainDoc.mongoDB.savePageChangeToDatabase(collection, changeData.newPageOrderArray)
  })


  socket.on("disconnect", ()=>{
      console.log("user disconnected");
      io.emit("message", "user disconnected")

      let connectedSocketId = Array.from(io.sockets.sockets.keys())

      console.log("Before delete", connectedNodeIdArray)
      connectedNodeIdArray = connectedNodeIdArray.filter(p=>connectedSocketId.indexOf(p[1]))
      console.log("After delete", connectedNodeIdArray)
  })// disconnect
}) // io.on(connection)

server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})
