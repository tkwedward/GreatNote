import {createNotebookItem, createUniqueID, createNotebookController} from "./mainPageHelperFunction"

import {socket} from "./mainPageSocket"


let askUserInputDiv = <HTMLDivElement> document.querySelector(".askUserInputDiv")
let notebookContainerWrapper = <HTMLDivElement> document.querySelector(".notebookContainerWrapper")
let notebookContainerNavBar = <HTMLDivElement> document.querySelector(".navBar")



let [createNewNotebookButton, deleteNotebookButton, deSelectNotebookButton, editNotebookButton] = createNotebookController(askUserInputDiv, notebookContainerWrapper, socket)

notebookContainerNavBar.append(createNewNotebookButton, editNotebookButton, deleteNotebookButton, deSelectNotebookButton)

socket.emit("message", "-------------I want to connect----------------")
socket.emit("clientsAskForOverallNoteBookInfo")
