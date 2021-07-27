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
  updateItem(databaseMessage: any): void

}


export class MongoBackEnd implements MongoBackEndInterface {
  mongoUrl: string
  client: any
  collection: any

    constructor(){
        this.mongoUrl = "mongodb://127.0.0.1:27017"
        this.client = null
        this.collection = null
        // this.connect()
    }

    async createNewNoteBook(notebookInfo: {notebookID: string, notebookName: string}){
        if (!this.client || !this.client.isConnected()) await this.connect()
        const database =  this.client.db(notebookDataBaseName)

        // this is a particular notebook
        let newNotebookDB = database.collection("scheduleDB")
    }

    async getItem(collection: Collection, databaseMessage: any){
      return await collection.findOne(databaseMessage.accessPinter)
    }


    async createItem(databaseMessage?: any){
      if (!this.client || !this.client.isConnected()) await this.connect()
      const database = this.client.db(notebookDataBaseName)
      let collection = database.collection("scheduleDB")

      let testData = {
          name: "Untitled",
          source: "google.com",
          description: "This is a description.",
          uniqueID: "12345",
          category: "Physics"
      }

      await collection.insertOne(testData) // insertOne
      // await collection.insertOne( databaseMessage.htmlObjectData) // insertOne

      // if (!databaseMessage.metaData.insertPosition){
      //     await collection.updateOne(
      //       {
      //         "uniqueID":  databaseMessage.metaData.parentAccessPointer
      //       }, // _identity.accessPointer
      //       {
      //         "$push": {"_identity.children": databaseMessage.metaData.accessPointer}
      //       } // push
      //     )// updateONes
      // } else {
      //     await collection.updateOne(
      //       {
      //         "_identity.accessPointer":  databaseMessage.metaData.parentAccessPointer
      //       }, // _identity.accessPointer
      //       {
      //         $push: {
      //           "_identity.children": {
      //             $each: [ databaseMessage.metaData.accessPointer],
      //             $position: databaseMessage.metaData.insertPosition
      //           }
      //         } // #push
      //       } // 2nd argumement
      //     )// updateONes
      // }
    } // createItem

    async updateItem(collection: Collection, databaseMessage: any){
      await collection.updateOne(
        {
          "_identity.accessPointer":  databaseMessage.htmlObjectData._identity.accessPointer
        },
        {
          "$set": {
              "_classNameList": databaseMessage.htmlObjectData._classNameList,
              "data": databaseMessage.htmlObjectData.data,
              "stylesheet": databaseMessage.htmlObjectData.stylesheet
          }
        }
      )// updateONes
    } // updateItem

    async deleteItem(collection, databaseMessage){
      await collection.deleteOne({
        "_identity.accessPointer":  databaseMessage.metaData.accessPointer
      })

      await collection.updateOne({
        "_identity.accessPointer": databaseMessage.metaData.parentAccessPointer},
        {"$pull": {"_identity.children": databaseMessage.metaData.accessPointer}}
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
