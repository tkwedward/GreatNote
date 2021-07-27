import * as ScheduleHelperFunction from "../scheduleHelperFunction";
let dataStructure = {
    type: "taskDetail",
    uniqueID: "123456",
    name: "Read Chapter 3",
    description: "Read Chapter 3 and do the exercise.",
    status: "completed",
    date: "5/8/2021",
    reward: +10
};
export function createTaskDetailPage() {
    let taskPageWrapper = document.querySelector(".taskDetailDivWrapper");
    let nameFieldWrapper = document.createElement("div");
    nameFieldWrapper.classList.add("taskDetail_name");
    let name_label = document.createElement("div");
    name_label.innerText = "name: ";
    let name_input = document.createElement("div");
    name_input.innerText = dataStructure.name;
    nameFieldWrapper.append(name_label, name_input);
    let descriptionFieldWrapper = document.createElement("div");
    descriptionFieldWrapper.classList.add("taskDetail_description");
    let description_label = document.createElement("div");
    description_label.innerText = "description: ";
    let description_input = document.createElement("div");
    description_input.innerHTML = dataStructure.description;
    descriptionFieldWrapper.append(description_label, description_input);
    let statusFieldWrapper = document.createElement("div");
    let status_label = document.createElement("div");
    status_label.innerText = "status: ";
    let status_input = document.createElement("select");
    let optionArray = ["not completed", "completed"];
    optionArray.forEach(item => {
        let option = document.createElement("option");
        option.value = item;
        option.innerText = item;
        status_input.append(option);
    });
    status_input.value = dataStructure.status;
    statusFieldWrapper.append(status_label, status_input);
    let timeFieldWrapper = document.createElement("div");
    let time_label = document.createElement("div");
    time_label.innerText = "time: ";
    let time_input = document.createElement("div");
    time_input.innerText = dataStructure.date;
    timeFieldWrapper.append(time_label, time_input);
    taskPageWrapper.append(nameFieldWrapper, descriptionFieldWrapper, statusFieldWrapper, timeFieldWrapper);
}
export class ProjectItem {
    constructor(jsonObject) {
        this.taskArray = [];
        this.name = jsonObject.name || "Untitled Project";
        this.type = jsonObject.type || "ProjectType";
        this.uniqueID = jsonObject.uniqueID || ScheduleHelperFunction.createUniqueID();
        this.description = jsonObject.description || "Please add Description";
        this.status = jsonObject.status || "in progress";
        this.date = jsonObject.date || "";
        this.reward = jsonObject.reward || 0;
        this.taskArray = jsonObject.taskArray || [];
        this.hashString = ScheduleHelperFunction.sha256(JSON.stringify(jsonObject));
    }
    static createDummyHtmlObject() {
        let projectItemHtmlObject = document.createElement("div");
        projectItemHtmlObject.classList.add("projectItemHtmlObject");
        let nameField = document.createElement("div");
        let descriptionField = document.createElement("div");
        let statusSelectField = ScheduleHelperFunction.createSelectObject(["in progress", "finished"]);
        let taskListField = document.createElement("div");
        taskListField.classList.add("taskListField");
        let addTaskButton = document.createElement("button");
        addTaskButton.innerText = "addTask";
        let saveButton = document.createElement("button");
        saveButton.innerText = "save";
        projectItemHtmlObject.append(nameField, descriptionField, statusSelectField, addTaskButton, taskListField, saveButton);
        return [projectItemHtmlObject, nameField, descriptionField, statusSelectField, addTaskButton, taskListField, saveButton];
    }
    addItem(taskItem) {
        this.taskArray.push(taskItem);
    }
    renderHTMLObject() {
        let [projectItemHtmlObject, nameField, descriptionField, statusSelectField, addTaskButton, taskListField, saveButton] = ProjectItem.createDummyHtmlObject();
        nameField.innerText = this.name;
        descriptionField.innerText = this.description;
        statusSelectField.value = this.status;
        addTaskButton.addEventListener("click", e => {
            let dummyTaskJson = {
                name: "Untitled task",
                type: "targetItem",
                uniqueID: "777",
                description: "description description description",
                status: "in progress",
                date: "7/7/7777",
                reward: 10
            };
            let taskItem = new TaskItem(dummyTaskJson);
            let taskItemHtmlObject = taskItem.renderHTMLObject();
            taskListField.append(taskItemHtmlObject);
            this.taskArray.push(taskItem);
        });
        saveButton.addEventListener("click", e => {
            console.log(this.save());
        });
        return projectItemHtmlObject;
    }
    removeItem(taskItemUniqueID) {
        this.taskArray = this.taskArray.filter(p => p.uniqueID != taskItemUniqueID);
    }
    save() {
        let saveObject = {
            name: this.name,
            type: this.type,
            uniqueID: this.uniqueID,
            description: this.description,
            status: this.status,
            date: this.date,
            reward: this.reward,
            taskArray: this.taskArray.map(p => p.uniqueID)
        };
        let newHash = ScheduleHelperFunction.sha256(JSON.stringify(saveObject));
        if (newHash != this.hashString) {
            console.log("need to save the data to database");
            this.hashString = newHash;
            ScheduleHelperFunction.makeXMLHttpPostRequest("/schedule/api/update", saveObject);
        }
        else {
            console.log("no need to save the data again");
        }
        return saveObject;
    }
}
export class TaskItem {
    constructor(jsonObject) {
        this.name = jsonObject.name;
        this.type = jsonObject.type;
        this.uniqueID = jsonObject.uniqueID;
        this.description = jsonObject.description;
        this.status = jsonObject.status;
        this.date = jsonObject.date;
        this.reward = jsonObject.reward;
    }
    static createDummyHtmlObject() {
        let taskItemHtmlObject = document.createElement("div");
        taskItemHtmlObject.classList.add("taskItem");
        let nameField = document.createElement("div");
        let descriptionField = document.createElement("div");
        let statusSelectField = createSelectObject(["in progress", "finished"]);
        let saveButton = document.createElement("button");
        taskItemHtmlObject.append(nameField, descriptionField, statusSelectField, saveButton);
        return [taskItemHtmlObject, nameField, descriptionField, statusSelectField, saveButton];
    }
    save() {
        return {
            name: this.name,
            type: this.type,
            uniqueID: this.uniqueID,
            description: this.description,
            status: this.status,
            date: this.date,
            reward: this.reward,
        };
    }
    renderHTMLObject() {
        let [taskItemHtmlObject, nameField, descriptionField, statusSelectField, saveButton] = TaskItem.createDummyHtmlObject();
        nameField.innerText = this.name;
        descriptionField.innerText = this.description;
        statusSelectField.value = this.status;
        return taskItemHtmlObject;
    }
}
