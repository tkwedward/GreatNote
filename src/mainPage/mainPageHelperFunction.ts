
export function selectContainerFunction(selectionDiv: any){
    return (e: MouseEvent)=>{
        e.stopPropagation()
        if (selectionDiv.getAttribute("selected")=="true"){
          selectionDiv.setAttribute("selected", "false")
        } else {
          selectionDiv.setAttribute("selected", "true")
        }
    }
} // selectContainerFunction

export function createNotebookController(askUserInputDiv: HTMLDivElement, notebookContainerWrapper: HTMLDivElement, socket: any): [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement, HTMLButtonElement]{
  let createNewNotebookButton = document.createElement("button")
  createNewNotebookButton.innerText = "New Notebook"
  createNewNotebookButton.addEventListener("click", (e)=>{
      askUserInputDiv.style.display = "block"
      let questionField = <HTMLDivElement> askUserInputDiv.querySelector(".questionToAsk")
      questionField.innerText = "Please enter the name of the new notebook."

      let confirmButton = <HTMLButtonElement> askUserInputDiv.querySelector(".confirmButton")
      confirmButton.onclick = function(){
        let inputField = <HTMLInputElement> askUserInputDiv.querySelector(".inputField")
        let notebookName = inputField.value

        let notebookID = createUniqueID()

        let newNotebook = createNotebookItem(notebookID, notebookName)
        notebookContainerWrapper.append(newNotebook)
        console.log(notebookName)
        askUserInputDiv.style.display = "none"

        socket.emit("createNewNotebook", {notebookID, notebookName})
      }
  })

  let deleteNotebookButton = document.createElement("button")
  deleteNotebookButton.innerText = "Delete Notebook"
  deleteNotebookButton.addEventListener("click", (e)=>{
      let selectedObjectArray: any[] = Array.from(document.querySelectorAll(".selectionDiv[selected='true']"))
      selectedObjectArray.forEach(p => {
        p.notebookContainer.remove()
        let notebookID = p.getAttribute("notebookID")
        socket.emit("deleteNotebook", notebookID)
      })




      console.log(selectedObjectArray)
  })

  let deSelectNotebookButton = document.createElement("button")
  deSelectNotebookButton.innerText = "Deselect"
  deSelectNotebookButton.addEventListener("click", (e)=>{
      let selectedObjectArray: HTMLDivElement[] = Array.from(document.querySelectorAll(".selectionDiv[selected='true']"))
      selectedObjectArray.forEach(p=>{
        p.setAttribute("selected", "false")
      })
      console.log(selectedObjectArray)
  })

  let editNotebookButton = document.createElement("button")
  editNotebookButton.innerText = "Edit Notebook"
  editNotebookButton.addEventListener("click", (e)=>{
      let overlayArray: HTMLDivElement[] = Array.from(notebookContainerWrapper.querySelectorAll(".notebookContainerOverlayWrapper"))

      overlayArray.forEach((p, i)=>{


        if (p.style.display == "none"){
          p.style.display = "block"
        } else {
          p.style.display = "none"
          if(i==0) deSelectNotebookButton.click()
        }
      })
  })

  return [createNewNotebookButton, deleteNotebookButton, deSelectNotebookButton, editNotebookButton]
}


export function createNotebookItem(notebookID: string, notebookName = "Notebook"):HTMLDivElement{
    let notebookDiv = document.createElement("div")
    notebookDiv.classList.add("notebookDiv")

    notebookDiv.addEventListener("click", e=>{
        location.href = `/talkNotes/notebook/${notebookID}`
    })

    let notebookImage = document.createElement("div")
    notebookImage.classList.add("notebookImage")

    let notebookTitle = document.createElement("div")
    notebookTitle.classList.add("notebookTitle")
    notebookTitle.innerText = notebookName

    let notebookContainerOverlayWrapper = <HTMLDivElement> document.createElement("div")
    notebookContainerOverlayWrapper.classList.add("notebookContainerOverlayWrapper")

    let notebookContainerOverlay = <HTMLDivElement> document.createElement("div")
    notebookContainerOverlay.classList.add("notebookContainerOverlay")

    let selectionDiv = <any> document.createElement("div")
    selectionDiv.notebookContainer = notebookDiv
    selectionDiv.classList.add("selectionDiv")
    selectionDiv.setAttribute("selected", "false")
    selectionDiv.setAttribute("notebookID", notebookID)

    notebookContainerOverlayWrapper.append(notebookContainerOverlay, selectionDiv)

    notebookContainerOverlay.addEventListener("click", selectContainerFunction(selectionDiv))
    selectionDiv.addEventListener("click", selectContainerFunction(selectionDiv))


    notebookDiv.append(notebookImage, notebookTitle, notebookContainerOverlayWrapper)
    console.log(notebookID, notebookName)

    return notebookDiv
} // createNotebookItem

export function askUserInput(){

}


export function createUniqueID():string{
  let temporaryPointer =  `${Date.now().toString(36) + Math.random().toString(36).substr(2)}`

  return temporaryPointer
}
