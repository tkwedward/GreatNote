import * as buildInitialPageHelperFunctions from "../buildInitialPageHelperFunctions";
import { socket } from "../socketFunction";
import { processCreationDataHelper } from "../databaseHelperFunction";
import * as PageController from "../pageControllerFolder/pageController";
import * as Setting from "../settings";
import * as MainControllerHelperFunction from "../mainControllerFolder/mainControllerHelperFunction";
import { renderDataToHTML } from "./renderDataToHTML";
export class MainController {
    // *****************************
    // *     A. Initialization     *
    // *****************************
    //@auto-fold here
    constructor() {
        this.mainDocArray = {};
        this.baseArrayID = "";
        this.applyMainDocTemplate = false;
        this.selectedObjectArray = [];
        this.changeList = [];
        this.pageCurrentStatus = {
            "pendingObject": {
                "newPage": new Set(),
                "newPageArray": []
            },
            "fullPageSize": Setting.pageSizeInfo.fullPageSize,
            "overviewPageSize": Setting.pageSizeInfo.overviewPageSize
        };
        this.pageController = PageController.initializePageController(this);
    }
    // ******************************************
    // *     B. Modify data in the database     *
    // ******************************************
    /** to append data to the database
    return: the HTMLObject related to, the accessID of the object in the database
    the last paraameter is used only for the first tiee to initialize the object, no need to worry about it when used later
    */
    //@auto-fold here
    addData(arrayID, htmlObject, temporaryPointer, insertPosition, dataPointer, specialCreationMessage) {
        // Step 1: register an accessPointer in the database
        //@auto-fold here
        let dataMessage = {
            htmlObjectData: htmlObject.extract(),
            metaData: {
                action: "create",
                insertPosition: insertPosition,
                dataPointer: dataPointer,
                specialCreationMessage: specialCreationMessage,
                arrayID: arrayID,
                temporaryPointer: temporaryPointer
            }
        };
        console.log();
        // socket.emit("databaseOperation", dataMessage)
        this.changeList.push(dataMessage);
        return dataMessage;
    } // addData
    /** A function to update the data store in the database. There are two types of update, the first is to update the data in the dataAccess Point. Another is to update self  identity and its style.
    The last parameter updateType has two kinds. The first one is called dataPointer type.
    The second type is called accessPointer typer.
    */
    //@auto-fold here
    updateData(_object, dataPointerType = true) {
        let htmlObjectData = _object.extract();
        let accessPointer = _object.getAccessPointer();
        let dataPointer = _object.getDataPointer();
    }
    //@auto-fold here
    /** to initiate the data so that you can store the data to the db*/
    // **** can be deleted later
    createDummyData(data = {}) {
        MainControllerHelperFunction.createDummyData(data);
    }
    //@auto-fold here
    /** when ever the htmlObject is updated, we fetch newData from thfe HTMLObjectt, and then go to the database and update the relevant data*/
    saveHTMLObjectToDatabase(htmlObject) {
        let newData = htmlObject.extract();
        let updateMessage = {
            htmlObjectData: newData,
            metaData: {
                action: "update"
            }
        };
        console.log(112112, updateMessage);
        this.changeList.push(updateMessage);
    } // saveHTMLObjectToDatabase
    deleteFromDataBase(htmlObject) {
        let accessPointer = htmlObject.getAccessPointer();
        let parentAccessPointer = htmlObject["parentNode"].getAttribute("accessPointer");
        let deleteMessage = {
            htmlObject: {},
            metaData: {
                action: "delete",
                accessPointer: accessPointer,
                parentAccessPointer: parentAccessPointer
            }
        };
        htmlObject.remove();
        this.changeList.push(deleteMessage);
    } // deleteFromDataBase
    sendChangeToServer() {
        let changes = "";
        if (changes.length > 0) {
            socket.emit("clientSendChangesToServer", { "changeData": changes });
        }
    }
    // ******************************************
    // *     C. Access data in the database     *
    // ******************************************
    //@auto-fold here
    getObjectDataById(objectID, doc = this.mainDoc) {
        let targetElement = document.querySelector(`*[accessPointer='${objectID}']`);
        return targetElement.extract();
    }
    getHTMLObjectTById(objectID) {
        let targetElement = document.querySelector(`*[accessPointer='${objectID}']`);
        return targetElement;
    }
    //@auto-fold here
    getLinkArrayFromID(objectID) {
        return this.getObjectById(objectID)._identity.linkArray;
    }
    //@auto-fold here
    getHtmlObjectByID(objectID) {
        return document.querySelector(`*[accessPointer='${objectID}']`);
    }
    // **********************************
    // *     E. Build up the page       *
    // **********************************
    buildInitialHTMLSkeleton() {
        buildInitialPageHelperFunctions.buildInitialHTMLSkeleton(this);
    } // buildInitialHTMLSkeleton
    buildPageFromMainDoc() {
        buildInitialPageHelperFunctions.buildInitialPage(this, false);
    } // 2. buildPageFromMainDoc
    /** To accept data from the mainDoc file and then recreate the whole page according to the data stored in the database, not array, but the object includes array property */
    renderDataToHTML(data, arrayHTMLObject) {
        renderDataToHTML(this, data, arrayHTMLObject);
    } // 3. renderDataToHTML
    createGNObjectThroughName(objectName, createData) {
        let { name, arrayID, insertPosition, dataPointer, saveToDatabase, injectedData } = createData;
        return this.GNDataStructureMapping[objectName](createData);
    } // 4. createGNObjectThroughName
    //@auto-fold here
    loadMainDoc(data) {
        this.mainDoc = data;
        let rootArray = data["array"];
        console.log(data);
        data["array"].map((p) => {
            let arrayName = p["data"]["name"];
            let accessPointer = p["_identity"]["accessPointer"];
            this.mainDocArray[arrayName] = accessPointer;
        });
    }
    processChangeData(changeData) {
        console.log(268268, changeData);
        let { htmlObjectData, metaData } = changeData;
        if (changeData.metaData.action == "modifyTemporaryPointer") {
            let temporaryPointer = metaData["temporaryPointer"];
            let targetObject = document.querySelector(`*[accessPointer=${temporaryPointer}]`);
            // set the accessPointer and updaate the identity
            targetObject === null || targetObject === void 0 ? void 0 : targetObject.setAttribute("accessPointer", htmlObjectData._identity.accessPointer);
            targetObject._identity = htmlObjectData._identity;
        } // create
        if (changeData.metaData.action == "create") {
            processCreationDataHelper(this, changeData);
        } // create
        if (changeData.metaData.action == "update") {
            let _object = document.querySelector(`*[accessPointer='${htmlObjectData._identity.accessPointer}']`);
            console.log(222, 222, _object, htmlObjectData._identity.accessPointer);
            if (_object) {
                _object.loadFromData(htmlObjectData);
            }
        } // update
        if (changeData.metaData.action == "delete") {
            let _object = document.querySelector(`*[accessPointer='${changeData.metaData.accessPointer}']`);
            _object === null || _object === void 0 ? void 0 : _object.remove();
        }
    }
}
