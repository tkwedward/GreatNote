import { MongoBackEnd, MongoBackEndInterface } from "./MongoDBClient"
import {Collection} from "mongodb"
const fs = require("fs")


export enum MainDocArrayEnum {
    mainArray_pageFull = "mainArray_pageFull",
    mainArray_pageOverview = "mainArray_pageOverview",
    mainArray_bookmark = "mainArray_bookmark",
    mainArray_panel = "mainArray_panel",
    mainArray_pokemon = "mainArray_pokemon"
}

let initializeArray = { name: "root", array:[]}

function createDummyData(){
    return {
        htmlObjectData: {
            data: {},
            stylesheet: {},
            _classNameList: [],
            _identity: {
                accessPointer: "",
                dataPointer: "",
                linkArray: [],
                children: [],
                parentAccessPointer: ""
            }
        },
        metaData: {
            insertPosition: null,
            parentAccessPointer: "",
            accessPointer: "",
            dataPointer: "",
        }
    }
}

export interface AutomergeMainDocInterface {
    jsonFileLocation:string
    baseArrayID: string
    changeList: any
    mongoDB: MongoBackEndInterface
    mainDoc: any

    addItemToChangeList(item:{temporaryPointer:string, arrayID: string})
    initializeRootArray(notebookID: string):void
    processChangeDataFromClients(collection: Collection, changeData: any, socket)
}


export class AutomergeMainDoc implements AutomergeMainDocInterface {
    jsonFileLocation: string
    baseArrayID: string
    changeList:any = []
    mongoDB: any
    mainDoc: any

    constructor(jsonFileLocation){
        this.jsonFileLocation = jsonFileLocation
        this.mongoDB = new MongoBackEnd()
    }

    addItemToChangeList(item: {temporaryPointer:string, arrayID: string}){
        if (this.changeList.length > 50000) this.changeList.pop()
        this.changeList.push(item)
    }

    getArrayIdFromChangeList(temporaryPointer:string): string | undefined{
        for(let i = this.changeList.length - 1; i >= 0; i--){
            // console.log(this.changeList[i])
            if (this.changeList[i].temporaryPointer == temporaryPointer){
              return  this.changeList[i].arrayID // the arrayID of the parent
            }
        }
    }

    async testMongoDBConnection(){
      console.log("====== test connection ======")
      console.log("0000: testConection", await this.mongoDB.testConnection())
      console.log("====== test connection end ======")
    }

    async initializeRootArray(notebookID: string){
        let result = await this.mongoDB.initializeFirstNotebook(notebookID)
        await this.mongoDB.disconnect()
        return result
        // result.then(p=>{
        //     return p
        // })
    }

    addData(saveDataMessage:any){
        let initializeMessage = {"action": "create", "objectID": ""}
        let {htmlObjectData, metaData} = saveDataMessage
        let addToChangeList = true

        let {insertPosition, dataPointer, specialCreationMessage, temporaryPointer, arrayID} = metaData

        if (arrayID=="" || arrayID.startsWith("temporaryPointer_")){
            // to replace thee temporaryPointer to true arrayID
            arrayID = this.getArrayIdFromChangeList(arrayID)
            metaData["arrayID"] = arrayID
        }

        // if (dataPointer?.startsWith("temporaryPointer_")){
        //   dataPointer = this.getArrayIdFromChangeList(dataPointer)
        // }

        // to convertt tthe data pointer
        // step 1, to regiestter a place
        return {htmlObjectData, metaData}
    }


    updateDataInDatabase(htmlObjectData:any){
        let {accessPointer, dataPointer} = htmlObjectData._identity
    }

    processUpdateDataHelper(updateData: any){

        let oldAccessPointer = <string> updateData.htmlObjectData._identity.accessPointer
        let newAccessPointer = ""

        // this.updateDataInDatabase(updateData.htmlObjectData)
        // console.log(updateData)

        return updateData
    }


    async processChangeDataFromClients(collection: Collection, data: any, socketID:string){
        data.metaData.socketId = socketID
        // console.log(153153, data)

        if (data.metaData.action=="create"){
            await this.mongoDB.createItem(collection, data).then(this.mongoDB.disconnect())

        } // create

        if (data.metaData.action=="update"){
            await this.mongoDB.updateItem(collection, data).then(this.mongoDB.disconnect())
        } // update

        if (data.metaData.action=="delete"){
            // let deleteMessage = this.deleteFromDatabase(data)
            // return deleteMessage
            await this.mongoDB.deleteItem(collection, data).then(this.mongoDB.disconnect())
        } // delete


        if (data.metaData.action=="microUpdate"){
          console.log("received microUpdateData")
          await this.mongoDB.microUpdate(collection, data).then(this.mongoDB.disconnect())
        }
    }
}
