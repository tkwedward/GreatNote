
import * as buildInitialPageHelperFunctions from "../buildInitialPageHelperFunctions"
import {GNObjectInterface, CreateGreatNoteObjectInterface}  from "../GreatNoteClass/GreatNoteObjectInterface"
import {socket} from "../socketFunction"
import {ToolBoxInterface} from "../ToolboxModel"
import { processCreationDataHelper } from "../databaseHelperFunction"
import {LayerControllerInterface} from "../layerControllerFolder/layerController"
import * as PageController from "../pageControllerFolder/pageController"
import * as Setting from "../settings"
import {communicationDataStructure, MainControllerInterface, mainArrayData, AddDatabaseFormatInterface, UpdateDataFormatInterface} from "../mainControllerFolder/mainControllerInterface"
import * as MainControllerHelperFunction from "../mainControllerFolder/mainControllerHelperFunction"
import {renderDataToHTML} from "./renderDataToHTML"

export class MainController implements MainControllerInterface{
  mainDocArray:any = {};
  mainDoc: any
  notebookID: string
  baseArrayID: string = "";
  previousDoc: any;
  GNDataStructureMapping:any
  applyMainDocTemplate:boolean = false
  pageCurrentStatus: any
  toolBox: any
  pageController: PageController.pageControllerInterface
  selectedObjectArray: any[] = []
  attributeControllerMapping: any
  layerController: any
  changeList: any[] = []
  uniqueNodeId:string

// *****************************
// *     A. Initialization     *
// *****************************
    //@auto-fold here
    constructor(){
        this.pageCurrentStatus = {
          "pendingObject": {// an array for collecting enough data before enough data is collected to create new objects
              "newPage": new Set(),
              "newPageArray": []
          },
          "fullPageSize": Setting.pageSizeInfo.fullPageSize,
          "overviewPageSize": Setting.pageSizeInfo.overviewPageSize
        }
        this.pageController = PageController.initializePageController(this)

        this.uniqueNodeId = "nodeNumber_" + `${Date.now().toString(36) + Math.random().toString(36).substr(2)}`
    }

// ******************************************
// *     B. Modify data in the database     *
// ******************************************
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    //@auto-fold here
    addData(parentAccessPointer: string, htmlObject:GNObjectInterface|any, accessPointer:string, insertPosition?:number|boolean, dataPointer?:string, specialCreationMessage?: string, ):AddDatabaseFormatInterface{
      // Step 1: register an accessPointer in the database
        //@auto-fold here
        let dataMessage:AddDatabaseFormatInterface = {
            htmlObjectData: htmlObject.extract(),
            metaData: {
                action: "create",
                insertPosition: insertPosition,
                parentAccessPointer: parentAccessPointer,
                accessPointer: accessPointer,
                dataPointer: dataPointer,
                notebookID: this.notebookID,
                uniqueNodeId: this.uniqueNodeId
            }
        }
        // socket.emit("databaseOperation", dataMessage)
        this.changeList.push(dataMessage)

        return dataMessage
    }// addData



    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    //@auto-fold here
    updateData(_object:any, dataPointerType:boolean = true){
        let htmlObjectData = _object.extract()
        let accessPointer:string = _object.getAccessPointer()
        let dataPointer:string = _object.getDataPointer()
    }

    //@auto-fold here
    /** to initiate the data so that you can store the data to the db*/
    // **** can be deleted later
    createDummyData(data = {}): any{
        MainControllerHelperFunction.createDummyData(data)
    }
    //@auto-fold here
    /** when ever the htmlObject is updated, we fetch newData from thfe HTMLObjectt, and then go to the database and update the relevant data*/
    saveHTMLObjectToDatabase(htmlObject:any){
        let newData = htmlObject.extract()
        let latestUpdateTime = htmlObject.getAttribute("latestUpdateTime")


        // console.log(96969696, newData)
        let updateMessage: UpdateDataFormatInterface= {
            htmlObjectData: newData,
            metaData:{
                action: "update",
                notebookID: this.notebookID,
                latestUpdateTime: latestUpdateTime,
                uniqueNodeId: this.uniqueNodeId
            }
        }
        this.changeList.push(updateMessage)
    }// saveHTMLObjectToDatabase

    tracePageFromElement(htmlObject: HTMLElement){
        if (htmlObject){
            let isPage = htmlObject.classList.contains("fullPage")
            if (isPage){
                return htmlObject
            } else {
                return this.tracePageFromElement(htmlObject.parentElement)
            }
        }
    }

    deleteFromDataBase(htmlObject:any){

        let accessPointer = htmlObject.getAccessPointer()
        let dataPointer = htmlObject.getDataPointer()

        let parentAccessPointer = htmlObject["parentNode"].getAttribute("accessPointer")

        // console.log(114, htmlObject._identity.linkArray)
        if (accessPointer == dataPointer){
            htmlObject._identity.linkArray.forEach((linkedObjectPointer: string, i:number)=>{
                if (i!=0){
                    // console.log(linkedObjectPointer)
                    let linkedObject = <any> document.querySelector(`*[accessPointer='${linkedObjectPointer}']`)
                    // console.log(htmlObject, linkedObject)
                    linkedObject?.deleteFromDatabase()
                }
            })
        }

        let deleteMessage = {
          htmlObject: {},
           metaData: {
              action: "delete",
              accessPointer: accessPointer,
              parentAccessPointer: parentAccessPointer,
              notebookID: this.notebookID,
              latestUpdateTime: `${new Date()}`,
              uniqueNodeId: this.uniqueNodeId
           }
        }
        htmlObject.remove()
        this.changeList.push(deleteMessage)
    } // deleteFromDataBase

    sendChangeToServer(){
      let changes = ""

      if (changes.length > 0){
        socket.emit("clientSendChangesToServer", {"changeData": changes})
      }

    }


// ******************************************
// *     C. Access data in the database     *
// ******************************************
    //@auto-fold here
    getObjectDataById(objectID:string, doc=this.mainDoc):any{
        let targetElement = <any> document.querySelector(`*[accessPointer='${objectID}']`)

        return targetElement.extract()
    }

    getHTMLObjectTById(objectID:string):any{
        let targetElement = <any> document.querySelector(`*[accessPointer='${objectID}']`)

        return targetElement
    }

    //@auto-fold here
    getLinkArrayFromID(objectID:string){
        return this.getObjectById(objectID)._identity.linkArray
    }

    //@auto-fold here
    getHtmlObjectByID(objectID:string){
        return document.querySelector(`*[accessPointer='${objectID}']`)
    }

// **********************************
// *     E. Build up the page       *
// **********************************
    buildInitialHTMLSkeleton(){
        buildInitialPageHelperFunctions.buildInitialHTMLSkeleton(this)
    } // buildInitialHTMLSkeleton


    buildPageFromMainDoc(){
        buildInitialPageHelperFunctions.buildInitialPage(this, false)
    } // 2. buildPageFromMainDoc

    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database, not array, but the object includes array property */
    renderDataToHTML(data:communicationDataStructure, arrayHTMLObject?:any){
        renderDataToHTML(this, data, arrayHTMLObject)
    }// 3. renderDataToHTML

    createGNObjectThroughName(objectName:string, createData: CreateGreatNoteObjectInterface){
        let {name, arrayID, insertPosition, dataPointer, saveToDatabase, injectedData} = createData

        // defined in buildInitialPage function
        return this.GNDataStructureMapping[objectName](createData)
    } // 4. createGNObjectThroughName

    //@auto-fold here
    loadMainDoc(data:any){
      this.mainDoc = data
      console.log(219219, data)
      let rootArray = data["array"]

      data["array"].map((p:any)=>{
          let arrayName = p["GNType"]
          let accessPointer = p["_identity"]["accessPointer"]
          this.mainDocArray[arrayName] = accessPointer
      })

      // console.log(201201, this.mainDocArray)
    }


    processChangeData(changeData: any){
          let {htmlObjectData, metaData} = changeData

          // console.log(215215, metaData.socketId , socket.id)

          console.log(254254, changeData)





          if (changeData.metaData.action=="create"){
              let item = document.querySelector(`*[accessPointe='${changeData.htmlObjectData._identity.accessPointer}']`)
              console.log(245245, item, changeData.htmlObjectData._identity.accessPointer)
              if (item) return

              processCreationDataHelper(this, changeData)
          }// create

          if (changeData.metaData.action=="update"){
              // console.log(213213, changeData)
              let _object = <any> document.querySelector(`*[accessPointer='${htmlObjectData._identity.accessPointer}']`)

              let pageHtmlObject = this.tracePageFromElement(_object)
              pageHtmlObject.setAttribute("latestUpdateTime", changeData.metaData.latestUpdateTime)

              htmlObjectData._identity.linkArray.forEach((p:string)=>{
                  // to chheck if the socket id are different and if the aaaccessPointer of the object is different from the looped aaccessPointer of the linkedObject
                  // console.log(changeData.metaData.socketId, socket.id, _object._identity.accessPointer, p)
                  if (changeData.metaData.socketId != socket.id || _object._identity.accessPointer != p) {
                      let linkedObject =  <any> this.getHtmlObjectByID(p)
                      // console.log(207207, changeData.metaData.socketId, socket.id, _object._identity.accessPointer, p, linkedObject)
                      // console.log(linkedObject, linkedObject.loadFromData)
                      // linkedObject.loadFromData(htmlObjectData, true)
                      linkedObject.loadFromData(htmlObjectData, false)
                  }

              })


          }  // update

          if (changeData.metaData.action=="delete"){
              let _object = <any> document.querySelector(`*[accessPointer='${changeData.metaData.accessPointer}']`)

              if (_object.GNType == "GNPage") {
                let leftButton = <HTMLButtonElement> document.querySelector(".leftButton")
                leftButton.click()
              }

              let pageHtmlObject = this.tracePageFromElement(_object)
              pageHtmlObject.setAttribute("latestUpdateTime", `${new Date()}`)

              _object?.remove()
          }
    }
}
