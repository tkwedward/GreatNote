import { MongoClient, ObjectId, Collection} from "mongodb"
// import { MongoClient, ObjectId, Collection} from "mong"

const notebookDataBaseName = "Schedule"
let mainDocArrayName = [
  "mainArray_Pending", "mainArray_Planned", "mainArray_Processing"
]

interface ItemToBeAddedInterface {
    arrayAccessIDChain: string[],
    itemArray: any[]
}

export interface MongoBackEndInterface {
  connect():any
  disconnect():void
  client: MongoClient

  createNewNoteBook(notebookInfo: any): void
  deleteNoteBook(notebookID: string): void

  initializeFirstNotebook(notebookID: string):any
  testConnection():void
  getOverallNotebookData():any
  recursiveGetChildNodeData(collection:Collection, nodeData: any, level?: number)

  savePageChangeToDatabase(connection:Collection, newPageOrderArray: string[])


  getItem(databaseMessage: any): void
  createItem(databaseMessage?: any): void
  updateItem(databaseMessage?: any): void

}


let pendingSubArray = {
    type: "pendingSubArray",
    array: []
}



let plannedSubArary = {
    type: "plannedSubArary",
    array: []
}

export class ScheduleMongoDBClient implements MongoBackEndInterface {
  mongoUrl: string
  client: any
  collection: any

    constructor(){
        this.mongoUrl = "mongodb://127.0.0.1:27017"
        this.client = null
        this.collection = null
        this.initializeFirstNotebook()
    }

    async initializeFirstNotebook(){
        if (!this.client || !this.client.isConnected()) await this.connect()
        const database =  this.client.db(notebookDataBaseName)
        let collection = database.collection("scheduleCollection")

        let rootArray = {
            type: "mainArray",
            uniqueID: "00000-00000",
            array: []
        }

        let rootArrayExist = await collection.findOne({uniqueID: rootArray.uniqueID})
        if (!rootArrayExist){
            await collection.insertOne(rootArray)
        }
    }

    async createNewNoteBook(notebookInfo: {notebookID: string, notebookName: string}){
        if (!this.client || !this.client.isConnected()) await this.connect()
        const database =  this.client.db(notebookDataBaseName)

        // this is a particular notebook
        let newNotebookDB = database.collection("scheduleCollection")

        let count = await newNotebookDB.countDocuments()
    }

    async transverseToLeaf(root){
        if (root && root.array){

          let childNodeArray = root.array.map(async p=> {
              let childNodeData = await this.getItem({uniqueIDArray: [p]})

              return await this.transverseToLeaf(childNodeData)
          })

          return Promise.all(childNodeArray).then(p=>{
              root.array = p
              return root
          })
        } else {
          return root
        }
    }

    async getInitialData(){
      if (!this.client || !this.client.isConnected()) await this.connect()
      const database = this.client.db(notebookDataBaseName)
      let collection = database.collection("scheduleCollection")

      let item = await collection.findOne({uniqueID: "00000-00000"})

      return await this.transverseToLeaf(item)
    }

    async getInitialData2(){
      if (!this.client || !this.client.isConnected()) await this.connect()
      const database = this.client.db(notebookDataBaseName)
      let collection = database.collection("scheduleCollection")

      let item = await collection.findOne({uniqueID: "00000-00000"})
      console.log(item)
      let targetObject = item.array.map(async p=> await this.getItem({uniqueIDArray: [p]}))
      return Promise.all(targetObject)
             .then(p=>{
               item.array = p
               return item
             })
    }

    async getItem(databaseMessage: { uniqueIDArray: string[] }){
      if (!this.client || !this.client.isConnected()) await this.connect()
      const database = this.client.db(notebookDataBaseName)
      let collection = database.collection("scheduleCollection")

      let item = await collection.findOne({uniqueID: databaseMessage.uniqueIDArray[0]})
      // let item = await collection.findOne({uniqueID: "00000-00000"})

      return item
      // return await collection.find({uniqueID:{$in:databaseMessage.uniqueIDArray}})
    }

    async createItem(databaseMessage: any){
      if (!this.client || !this.client.isConnected()) await this.connect()
      const database = this.client.db(notebookDataBaseName)
      let collection = database.collection("scheduleCollection")

      await collection.insertOne(databaseMessage.newObjectData) // insertOne
      await collection.updateOne(
        {uniqueID: databaseMessage.metaData.parentIdentifier},
        {
          $push: { array: databaseMessage.newObjectData.uniqueID }
        } // 2nd argumement
      )// updateONes
    } // createItem

    async updateItem(databaseMessage: any){
      if (!this.client || !this.client.isConnected()) await this.connect()
      const database = this.client.db(notebookDataBaseName)
      let collection = database.collection("scheduleCollection")

      await collection.updateOne(
        {
          uniqueID:  databaseMessage.objectData.uniqueID
        },
        {
          "$set": {"data": databaseMessage.objectData.data}
        }
      )// updateONes
    } // updateItem

    async deleteItem(databaseMessage){
      await collection.deleteOne({
        "uniqueID":  databaseMessage.objectData.uniqueID
      })

      await collection.updateOne({
        "_identity.accessPointer": databaseMessage.metaData.parentIdentifier},
        {"$pull": {"array": databaseMessage.objectData.uniqueID}}
      )
    } // deleteItem


    async connect(){
        if (this.client && this.client.isConnected()){
          console.log("reuse the connection.")
        } else {
          this.client = new MongoClient(this.mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepAlive: true,
            connectTimeoutMS: 300000,
            socketTimeoutMS: 300000,
            bufferMaxEntries: 0,
            poolSize: 10
          })

          console.info("connection to MongoDB")
          await this.client.connect()
        }


    }


    async disconnect(){
        if (this.client) return this.client.close()
        console.log("The mongoClient is closed.")

        return false
    }


}
