import {createUniqueID, createNewObjectInDatabase, updateObjectInDatabase} from "./scheduleHelperFunction"

let rootArrayUniqueID = "00000-00000"

let processingDivWrapper = <HTMLDivElement> document.querySelector(".processingDivWrapper")
let plannedDivWrapper = <HTMLDivElement> document.querySelector(".plannedDivWrapper")
let pendingDivWrapper = <HTMLDivElement> document.querySelector(".pendingDivWrapper")

export interface ItemCardInterface extends HTMLDivElement {
    uniqueID: string
    extract(): any
}


let subArrayType = ["processing", "planned","pending"]

export function createControlPanel(){
    let panel = document.createElement("div")
    panel.classList.add("controlPanel")

    let categoryNameInput = document.createElement("input")
    categoryNameInput.classList.add("categoryNameInput")

    let categorySelect = document.createElement("select")
    subArrayType.forEach(p=>{
        let option = document.createElement("option")
        option.innerText = p
        option.value = p
        categorySelect.append(option)
    })

    let createNewCategoryButton = document.createElement("button")
    createNewCategoryButton.innerText = "create Category"


    createNewCategoryButton.addEventListener("click", async e=>{
        // this is to create item

        if (categoryNameInput.value=="") {
            console.log("please input a value")
            return
        }

        let newObjectData =  {
            type: "categorySubArray",
            name: categoryNameInput.value,
            uniqueID: createUniqueID(),
            pendingArray: [],
            projectArray: [],
            taskArray: []
        }

        let categoryBox = createCategoryBox(newObjectData)

        let databaseMessage = {
            metaData: {
              parentIdentifier: { uniqueID: rootArrayUniqueID }
            },
            newObjectData: newObjectData
        }

        await createNewObjectInDatabase(databaseMessage)
    })

    panel.append(categoryNameInput, categorySelect, createNewCategoryButton)

    return panel
}


export function createContentInfoBox():HTMLDivElement{
    let contentBox = document.createElement("div")
    contentBox.classList.add("contentBox")

    // dataArray.forEach(data=>{
    //     let itemCard = createItemCard(data)
    //     contentBox.append(itemCard)
    // })
    return contentBox
}

export function createCategoryBox(newObjectData: any){
  let categoryBox = document.createElement("div")
  categoryBox.classList.add("categoryBox")

  let contentBox = createContentInfoBox()

  let title = document.createElement("div")
  title.innerText = newObjectData.name
  title.classList.add("title")

  let addItemButton = document.createElement("button")
  addItemButton.innerText = "addItem"
  addItemButton.addEventListener("click", e=>{
      let dummyData = {
          name: "Untitled",
          source: "",
          description: "",
          uniqueID: null,
          category: newObjectData.name
      }

      let itemCard = createItemCard(dummyData)
  })

  let deleteItemButton = document.createElement("button")
  deleteItemButton.innerText = "deleteItem"
  deleteItemButton.addEventListener("click", async e=>{
      categoryBox.remove()
      let databaseMessage = {
        parentIdentifier: {type: newObjectData.parentType},
        targetUniqueID: newObjectData.uniqueID
      }
      await makeXMLHttpPostRequest("schedule/api/delete", databaseMessage)
  })

  title.append(addItemButton, deleteItemButton)

  categoryBox.append(title, contentBox)
  pendingDivWrapper.append(categoryBox)

  return categoryBox
}

export function createEditInfoBox(itemCard: ItemCardInterface):[HTMLDivElement, HTMLInputElement, HTMLInputElement, HTMLTextAreaElement]{
    let editInfoBox = document.createElement("div")
    editInfoBox.classList.add("editInfoBox")

    let nameField = document.createElement("input")

    let sourceField = document.createElement("input")

    let descriptionField = document.createElement("textarea")

    let saveButton = document.createElement("button")
    saveButton.innerText = "save"
    saveButton.addEventListener("click", e=>{
        console.log(itemCard.extract())
    })

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "delete"
    deleteButton.addEventListener("click", e=>{
        console.log(itemCard.remove())
    })


    editInfoBox.append(nameField, sourceField, descriptionField, saveButton, deleteButton)

    return [editInfoBox, nameField, sourceField, descriptionField]
}


export function createItemCard( data: { name: string, source: string, description: string, category: string, id?: string}){
    let itemCard = <ItemCardInterface> document.createElement("div")
    itemCard.classList.add("itemCard")
    itemCard.innerText = `${data.name}`

    let [editInfoBox, nameField, sourceField, descriptionField] = createEditInfoBox(itemCard)
    nameField.value = data.name
    sourceField.value = data.source
    descriptionField.innerText = data.description
    itemCard.append(editInfoBox)
    itemCard.uniqueID = data.id || createUniqueID()
    itemCard.setAttribute("uniqueID", itemCard.uniqueID)

    itemCard.extract = function(){
        return {
          name: nameField.value,
          source: sourceField.value,
          description: descriptionField.innerText,
          uniqueID: itemCard.uniqueID,
          category: data.category
        }
    }

    return itemCard
}
