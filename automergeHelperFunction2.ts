import { MongoBackEnd, MongoBackEndInterface } from "./MongoDBClient"
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

    addItemToChangeList(item:{temporaryPointer:string, arrayID: string})
}


export class AutomergeMainDoc implements AutomergeMainDocInterface {
    jsonFileLocation: string
    baseArrayID: "0000-00000"
    changeList:any = []
    mongoDB: MongoBackEndInterface

    constructor(jsonFileLocation){
        this.jsonFileLocation = jsonFileLocation
        this.mongoDB = new MongoBackEnd()

        // this.testMongoDBConnection()
        // initialize the root array
        this.initializeRootArray()
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

    async initializeRootArray(){
        return await this.mongoDB.initializeFirstNotebook()
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
        this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(initializeMessage), doc=>{
            // console.log("====================")
            // console.log(222333, "metaData", metaData, "arrayID", arrayID)
            // console.log(222333, this.changeList)
            //
            // console.log("====================")
            let arrayToBeAttachedTo =  Automerge.getObjectById(doc, arrayID)["array"]
            if (!insertPosition) insertPosition = arrayToBeAttachedTo.length
            arrayToBeAttachedTo.insertAt(insertPosition, {})
        })

        // // step 2 update the identityProperties of the object
        let arrayToBeAttachedTo = Automerge.getObjectById(this.mainDoc, arrayID)["array"]

        // console.log("======== step 2: get arrayToBeAttachedTo ============")
        // console.log(arrayToBeAttachedTo)

        let objectSymbolArray = Object.getOwnPropertySymbols(arrayToBeAttachedTo[<number>insertPosition])
        let accessPointer = arrayToBeAttachedTo[<number>insertPosition][objectSymbolArray[1]]

        this.addItemToChangeList({
            temporaryPointer: temporaryPointer,
            arrayID: accessPointer
        })
        // // create new object data

        // console.log("130130 , dataPointer before", dataPointer)
        if (dataPointer){
            let validDataPointer = Automerge.getObjectById(this.mainDoc, dataPointer)
            if (!validDataPointer){
              dataPointer = this.getArrayIdFromChangeList(dataPointer)
            }
            metaData["dataPointer"] = dataPointer

            htmlObjectData._identity.dataPointer = dataPointer
        } else {
            htmlObjectData._identity.dataPointer = accessPointer
        }

        htmlObjectData._identity.linkArray.push(accessPointer)

        // add data to changelist
        htmlObjectData._identity.accessPointer = accessPointer

        // Step 3: put real data into the database
        this.mainDoc = Automerge.change(this.mainDoc,  doc=>{
            // add the data to the object
            let objectInDatabase = Automerge.getObjectById(doc, accessPointer)
            Object.entries(htmlObjectData).forEach(([key, value], _)=>{
                objectInDatabase[key] = value
            })

            // update the masterobject if it is a link object
            if (dataPointer){
                let masterObject = this.getObjectById(dataPointer, doc)
                masterObject._identity.linkArray.push(accessPointer)
                // masterObjectHtmlElement?._identity.linkArray.push(accessPointer) // **** this line may be deleted because we do not need to access the linkArray of the master object
            }
        })

        return {htmlObjectData, metaData}
    }

    deleteFromDatabase(deleteMessage){
      let {parentAccessPointer, accessPointer} =
      deleteMessage.metaData

      this.mainDoc = Automerge.change(this.mainDoc, JSON.stringify(deleteMessage), doc=>{
        let parentObject = this.getObjectById(parentAccessPointer, doc)
        let targetObject = this.getObjectById(accessPointer, doc)

        let index =  parentObject["array"].indexOf(targetObject)
        if (index!=-1) parentObject["array"].deleteAt(index)
      })

      return deleteMessage
    }

    updateDataInDatabase(htmlObjectData:any){
        let {accessPointer, dataPointer} = htmlObjectData._identity

        this.mainDoc = Automerge.change(this.mainDoc,doc=>{
            let dataPointerObejct = Automerge.getObjectById(doc, dataPointer)
            let accessPointerObject = Automerge.getObjectById(doc, accessPointer)

            // update the data
            Object.entries(htmlObjectData.data).forEach(([key, value], _)=> dataPointerObejct["data"][key] = value)

            if (htmlObjectData._classNameList) dataPointerObejct["_classNameList"] = htmlObjectData._classNameList

            // update the stylesheet
            if (accessPointer!=dataPointer){
                // if it is a link object
                Object.entries(htmlObjectData.stylesheet).forEach(([key, value], _)=>{
                    accessPointerObject["stylesheet"][key] = value
                })
            } else {
                // if it is the main object
                Object.entries(htmlObjectData.stylesheet).forEach(([key, value], _)=>{
                    dataPointerObejct["stylesheet"][key] = value
                })
            }
        })
    }

    loadMainDoc(){
        let data = fs.readFileSync(this.jsonFileLocation)
        this.mainDoc = Automerge.load(data)

    }

    async saveMainDoc(sendRequest:boolean=false){
      let saveData = Automerge.save(this.mainDoc)
      await fs.writeFileSync(this.jsonFileLocation, saveData);
    } // saveMainDoc

    getObjectById(objectID:string, doc=this.mainDoc): any{
        return Automerge.getObjectById(doc, objectID)
    }


    processUpdateDataHelper(updateData: any){

        let oldAccessPointer = <string> updateData.htmlObjectData._identity.accessPointer
        let newAccessPointer = ""

        // to update the temporaryPointer to accessPointer
        if (oldAccessPointer.startsWith("temporaryPointer_")){
            newAccessPointer = this.getArrayIdFromChangeList(oldAccessPointer)
        } else {
            newAccessPointer = oldAccessPointer
        }
        let accessPointerDataObject = this.getObjectById(newAccessPointer)

        if (!accessPointerDataObject._identity){
          console.log(accessPointerDataObject, newAccessPointer)
        }
        // update the identity
        updateData.htmlObjectData._identity = accessPointerDataObject._identity

        // update the database
        this.updateDataInDatabase(updateData.htmlObjectData)

        return updateData
    }


    processDatabaseOperationData(data: any, socketID:string){
        data.metaData.socketId = socketID

        if (data.metaData.action=="create"){
            let changeDataToClient = this.addData(data)
            // console.log(changeDataToClient)
            return changeDataToClient
        } // create

        if (data.metaData.action=="update"){
            let updateData = this.processUpdateDataHelper(data)

            return data
        } // update

        if (data.metaData.action=="delete"){
            let deleteMessage = this.deleteFromDatabase(data)
            return deleteMessage
        } // delete
    }
}
