// import cryptoData from "../dist/data/crpytoData.json"
import {createUniqueID, createNewObjectInDatabase, updateObjectInDatabase, getItemFromDatabase, getInitialDataFromDatabase} from "./scheduleFolder/scheduleHelperFunction"
import {createCategoryBox, createEditInfoBox, ItemCardInterface, createItemCard, createControlPanel} from "./scheduleFolder/scheduleCreateObject"
import * as TaskDetail from './scheduleFolder/taskDetail/taskDetailItem';
import * as ScheduleObject from "./scheduleFolder/taskDetail/taskDetailItem"
import * as ProjectPage from "./scheduleFolder/projectPage"
import {createDataMessageInerface, updateDataMessageInerface, getDataMessageInterface} from "./scheduleFolder/taskDetail/taskItemInterface"


let rootArrayUniqueID = "00000-00000"

let rootArray = getInitialDataFromDatabase()
// rootArray.then((item:string)=>{
//     console.log(JSON.parse(item))
// })


// let categories = [
//     "Physics", "Reading", "Crypto", "Computer Science", "Musics", "Accounting"
// ]


let dataArray = [
    {
      name: "Read Book",
      source: "www.google.com",
      description: "This is a text. This is a text.",
      category: "Physics"
    },
    {
      name: "Watch Video",
      source: "www.youtube.com",
      description: "This video is funny and worth to watch.",
      category: "Physics"
    }
]

// create control Pnanel
let controlPanelWrapper = <HTMLDivElement> document.querySelector(".controlPanelWrapper")
let controlPanel = createControlPanel()
controlPanelWrapper.append(controlPanel)


let projectPageWrapper = <HTMLDivElement> document.querySelector(".projectPageWrapper")

let createProjectItemButton = document.createElement("button")
createProjectItemButton.innerText = "createProject"



createProjectItemButton.addEventListener("click", e=>{
    let projectDetailPage = <HTMLDivElement> document.querySelector(".projectDetailDivWrapper")
    let projectRow = ProjectPage.createProjectRow()
    projectDetailPage.append(projectRow)
})

// original function
// createProjectItemButton.addEventListener("click", e=>{
//   let testProjectItemJsonObject = {
//       name: "Read Book",
//       type: "ProjectItem",
//       uniqueID: "1234567",
//       description: "This is a text. This is a text.",
//       status: "in progress",
//       date: "20/7/2021",
//       reward: 10
//   }
//
//   let testProjectItem = new ScheduleObject.ProjectItem(testProjectItemJsonObject)
//   let projectItemHtmlObject = testProjectItem.renderHTMLObject()
//   projectPageWrapper.append(projectItemHtmlObject)
//
//   let createDataMessage: createDataMessageInerface = {
//     newObjectData: testProjectItem.save(),
//     metaData: {parentIdentifier: {type: "projectArray"}}
//   }
//
//   createNewObjectInDatabase(createDataMessage)
// })
controlPanelWrapper.append(createProjectItemButton)

// let taskPage = TaskDetail.createTaskDetailPage()



// project page
