import { createNotebookController } from "./mainPageHelperFunction";
import { socket } from "./mainPageSocket";
let askUserInputDiv = document.querySelector(".askUserInputDiv");
let notebookContainerWrapper = document.querySelector(".notebookContainerWrapper");
let notebookContainerNavBar = document.querySelector(".navBar");
let [createNewNotebookButton, deleteNotebookButton, deSelectNotebookButton, editNotebookButton] = createNotebookController(askUserInputDiv, notebookContainerWrapper, socket);
notebookContainerNavBar.append(createNewNotebookButton, editNotebookButton, deleteNotebookButton, deSelectNotebookButton);
socket.emit("message", "-------------I want to connect----------------");
socket.emit("clientsAskForOverallNoteBookInfo");
