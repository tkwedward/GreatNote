var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUniqueID, createNewObjectInDatabase } from "./scheduleHelperFunction";
let rootArrayUniqueID = "00000-00000";
let processingDivWrapper = document.querySelector(".processingDivWrapper");
let plannedDivWrapper = document.querySelector(".plannedDivWrapper");
let pendingDivWrapper = document.querySelector(".pendingDivWrapper");
let subArrayType = ["processing", "planned", "pending"];
export function createControlPanel() {
    let panel = document.createElement("div");
    panel.classList.add("controlPanel");
    let categoryNameInput = document.createElement("input");
    categoryNameInput.classList.add("categoryNameInput");
    let categorySelect = document.createElement("select");
    subArrayType.forEach(p => {
        let option = document.createElement("option");
        option.innerText = p;
        option.value = p;
        categorySelect.append(option);
    });
    let createNewCategoryButton = document.createElement("button");
    createNewCategoryButton.innerText = "create Category";
    createNewCategoryButton.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
        // this is to create item
        if (categoryNameInput.value == "") {
            console.log("please input a value");
            return;
        }
        let newObjectData = {
            type: "categorySubArray",
            name: categoryNameInput.value,
            uniqueID: createUniqueID(),
            pendingArray: [],
            projectArray: [],
            taskArray: []
        };
        let categoryBox = createCategoryBox(newObjectData);
        let databaseMessage = {
            metaData: {
                parentIdentifier: { uniqueID: rootArrayUniqueID }
            },
            newObjectData: newObjectData
        };
        yield createNewObjectInDatabase(databaseMessage);
    }));
    panel.append(categoryNameInput, categorySelect, createNewCategoryButton);
    return panel;
}
export function createContentInfoBox() {
    let contentBox = document.createElement("div");
    contentBox.classList.add("contentBox");
    // dataArray.forEach(data=>{
    //     let itemCard = createItemCard(data)
    //     contentBox.append(itemCard)
    // })
    return contentBox;
}
export function createCategoryBox(newObjectData) {
    let categoryBox = document.createElement("div");
    categoryBox.classList.add("categoryBox");
    let contentBox = createContentInfoBox();
    let title = document.createElement("div");
    title.innerText = newObjectData.name;
    title.classList.add("title");
    let addItemButton = document.createElement("button");
    addItemButton.innerText = "addItem";
    addItemButton.addEventListener("click", e => {
        let dummyData = {
            name: "Untitled",
            source: "",
            description: "",
            uniqueID: null,
            category: newObjectData.name
        };
        let itemCard = createItemCard(dummyData);
    });
    let deleteItemButton = document.createElement("button");
    deleteItemButton.innerText = "deleteItem";
    deleteItemButton.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
        categoryBox.remove();
        let databaseMessage = {
            parentIdentifier: { type: newObjectData.parentType },
            targetUniqueID: newObjectData.uniqueID
        };
        yield makeXMLHttpPostRequest("schedule/api/delete", databaseMessage);
    }));
    title.append(addItemButton, deleteItemButton);
    categoryBox.append(title, contentBox);
    pendingDivWrapper.append(categoryBox);
    return categoryBox;
}
export function createEditInfoBox(itemCard) {
    let editInfoBox = document.createElement("div");
    editInfoBox.classList.add("editInfoBox");
    let nameField = document.createElement("input");
    let sourceField = document.createElement("input");
    let descriptionField = document.createElement("textarea");
    let saveButton = document.createElement("button");
    saveButton.innerText = "save";
    saveButton.addEventListener("click", e => {
        console.log(itemCard.extract());
    });
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", e => {
        console.log(itemCard.remove());
    });
    editInfoBox.append(nameField, sourceField, descriptionField, saveButton, deleteButton);
    return [editInfoBox, nameField, sourceField, descriptionField];
}
export function createItemCard(data) {
    let itemCard = document.createElement("div");
    itemCard.classList.add("itemCard");
    itemCard.innerText = `${data.name}`;
    let [editInfoBox, nameField, sourceField, descriptionField] = createEditInfoBox(itemCard);
    nameField.value = data.name;
    sourceField.value = data.source;
    descriptionField.innerText = data.description;
    itemCard.append(editInfoBox);
    itemCard.uniqueID = data.id || createUniqueID();
    itemCard.setAttribute("uniqueID", itemCard.uniqueID);
    itemCard.extract = function () {
        return {
            name: nameField.value,
            source: sourceField.value,
            description: descriptionField.innerText,
            uniqueID: itemCard.uniqueID,
            category: data.category
        };
    };
    return itemCard;
}
