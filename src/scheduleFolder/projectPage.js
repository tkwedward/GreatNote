import * as ScheduleHelperFunction from "./scheduleHelperFunction";
let projectPageWrapper = document.querySelector(".projectPageWrapper");
projectPageWrapper.uniqueID = "projectPageWrapper";
let inputTest = document.createElement("input");
projectPageWrapper.append(inputTest);
inputTest.addEventListener("input", ScheduleHelperFunction.intervalUpdateFunction(2000, () => { console.log("svaeItem"); }));
export function addItemToProjectPage(categoryName, projectItemArray) {
    // let projectItemHtmlObject = document.createElement("div")
    //
    // let categoryField = document.createElement("div")
    // categoryField.innerHTML = categoryName
    //
    //
    // let addProjectItemButton = document.createElement("button")
    // addProjectItemButton.innerText = "add Project"
    // addProjectItemButton.addEventListener("click", e=>{
    //     let newProjectItem = new TaskDetailItem.ProjectItem({})
    //     let newProjectItemHtmlObject = newProjectItem.renderHTMLObject()
    //     projectItemHtmlObject.append(newProjectItemHtmlObject)
    // })
    //
    // projectItemHtmlObject.append(categoryField, addProjectItemButton)
    // projectItemArray.forEach(p=>{ })
    // projectPageWrapper.append(projectItemHtmlObject)
}
export function createProjectRow(projectDetailJsonFile) {
    let projectRow = document.createElement("div");
    projectRow.classList.add("projectRow");
    projectRow.uniqueID = (projectDetailJsonFile === null || projectDetailJsonFile === void 0 ? void 0 : projectDetailJsonFile.uniqueID) || ScheduleHelperFunction.createUniqueID();
    let projectName = document.createElement("div");
    projectName.innerText = (projectDetailJsonFile === null || projectDetailJsonFile === void 0 ? void 0 : projectDetailJsonFile.name) || "Untitled Project Name";
    projectName.contentEditable = "true";
    let block = false;
    let updateFunction = function (e) {
        projectRow.update();
        projectName.removeEventListener("keydown", updateFunction);
        setTimeout(function () {
            projectName.addEventListener("keydown", updateFunction);
            projectRow.update();
        }, 500);
    };
    projectName.addEventListener("keydown", updateFunction);
    let taskList = document.createElement("div");
    let inProgressDiv = document.createElement("div");
    inProgressDiv.classList.add("inProgressDiv");
    let inProgressTitle = document.createElement("div");
    inProgressTitle.innerText = "In Progress";
    inProgressDiv.append(inProgressTitle);
    let completedDiv = document.createElement("div");
    completedDiv.classList.add("completedDiv");
    taskList.append(inProgressDiv, completedDiv);
    let completedTitle = document.createElement("div");
    completedTitle.innerText = "Completed";
    completedDiv.append(completedTitle);
    let addTaskButton = document.createElement("button");
    addTaskButton.innerText = "addTask";
    addTaskButton.addEventListener("click", e => {
        let taskRow = createTaskRow(undefined, projectRow.uniqueID);
        inProgressDiv.append(taskRow);
    });
    projectRow.update = function () {
        let objectData = {
            data: {
                name: projectName.innerText
            },
            uniqueID: projectRow.uniqueID
        };
        ScheduleHelperFunction.updateObjectInDatabase({ objectData: objectData });
    };
    projectRow.append(projectName, addTaskButton, taskList);
    // create Item
    if (!projectDetailJsonFile) {
        ScheduleHelperFunction.createNewObjectInDatabase({
            newObjectData: {
                data: { name: projectName.innerText,
                },
                array: [],
                uniqueID: projectRow.uniqueID
            },
            metaData: {
                parentIdentifier: projectPageWrapper.uniqueID
            }
        });
    }
    if (projectDetailJsonFile && projectDetailJsonFile.array.length > 0) {
        projectDetailJsonFile.array.forEach(p => {
            let taskRow = createTaskRow(p, projectRow.uniqueID);
            projectRow.append(taskRow);
        });
    }
    return projectRow;
}
function createTaskRow(taskJsonFile, parentIdentifier) {
    let taskRow = document.createElement("div");
    taskRow.classList.add("taskRow");
    taskRow.uniqueID = (taskJsonFile === null || taskJsonFile === void 0 ? void 0 : taskJsonFile.uniqueID) || ScheduleHelperFunction.createUniqueID();
    let frontRow = document.createElement("div");
    frontRow.classList.add("frontRow");
    let hiddenRow = document.createElement("div");
    hiddenRow.classList.add("hiddenRow");
    let taskName = document.createElement("div");
    taskName.innerText = (taskJsonFile === null || taskJsonFile === void 0 ? void 0 : taskJsonFile.data.name) || "UntitledTask";
    taskName.contentEditable = "true";
    taskName.addEventListener("keydown", e => {
        console.log("shit");
        taskRow.update();
    });
    let taskStatus = ScheduleHelperFunction.createSelectObject(["in progress", "completed"]);
    taskStatus.classList.add("statusSelectField");
    taskStatus.value = (taskJsonFile === null || taskJsonFile === void 0 ? void 0 : taskJsonFile.data.status) || "in progress";
    taskStatus.addEventListener("change", e => {
        taskRow.update();
    });
    let addToTaskPageButton = document.createElement("button");
    addToTaskPageButton.classList.add("addToTaskPageButton");
    addToTaskPageButton.innerText = "add To taskPage";
    addToTaskPageButton.addEventListener("click", e => {
    });
    let deleteTaskPageButton = document.createElement("button");
    deleteTaskPageButton.classList.add("deleteTaskPageButton");
    deleteTaskPageButton.innerText = "delete item";
    deleteTaskPageButton.addEventListener("click", e => {
        let deleteDataMessage = {
            objectData: {
                uniqueID: taskRow.uniqueID
            },
            metaData: {
                parentIdentifier: parentIdentifier
            }
        };
        ScheduleHelperFunction.deleteObjectFromDatabase(deleteDataMessage);
    });
    let toggleHiddenRow = document.createElement("button");
    toggleHiddenRow.classList.add("toggleHiddenRow");
    toggleHiddenRow.innerText = "toggle hiddenRow";
    toggleHiddenRow.addEventListener("click", e => {
        console.log(hiddenRow.style.display);
        hiddenRow.style.display = hiddenRow.style.display != "block" ? "block" : "none";
    });
    let record = document.createElement("div");
    record.classList.add("record");
    record.contentEditable = "true";
    record.innerText = (taskJsonFile === null || taskJsonFile === void 0 ? void 0 : taskJsonFile.data.record) || "Please enter record.";
    record.contentEditable = "true";
    record.addEventListener("keydown", ScheduleHelperFunction.intervalUpdateFunction(() => { taskRow.update(); }));
    frontRow.append(taskName, taskStatus, addToTaskPageButton, deleteTaskPageButton, toggleHiddenRow);
    hiddenRow.append(record);
    taskRow.append(frontRow, hiddenRow);
    taskRow.update = function () {
        let objectData = {
            data: {
                name: taskName.innerText,
                status: taskStatus.value,
                record: record.innerHTML
            },
            uniqueID: taskRow.uniqueID
        };
        console.log(236236, record.innerHTML);
        ScheduleHelperFunction.updateObjectInDatabase({ objectData: objectData });
    };
    if (!taskJsonFile) {
        ScheduleHelperFunction.createNewObjectInDatabase({
            newObjectData: {
                data: {
                    name: taskName.innerText,
                    status: taskStatus.value,
                    record: record.innerHTML
                },
                uniqueID: taskRow.uniqueID
            },
            metaData: {
                parentIdentifier: parentIdentifier
            }
        });
    } // save the row
    return taskRow;
}
function renderProjectDetail(projectDetailJsonFile) {
    let projectDetailPage = document.querySelector(".projectDetailDivWrapper");
    let projectRow = createProjectRow(projectDetailJsonFile);
    projectDetailPage.append(projectRow);
}
// to initiate the page
// renderProjectDetail()
