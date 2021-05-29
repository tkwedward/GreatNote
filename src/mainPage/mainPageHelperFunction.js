"use strict";
exports.__esModule = true;
exports.createUniqueID = exports.askUserInput = exports.createNotebookItem = exports.createNotebookController = exports.selectContainerFunction = void 0;
function selectContainerFunction(selectionDiv) {
    return function (e) {
        e.stopPropagation();
        if (selectionDiv.getAttribute("selected") == "true") {
            selectionDiv.setAttribute("selected", "false");
        }
        else {
            selectionDiv.setAttribute("selected", "true");
        }
    };
} // selectContainerFunction
exports.selectContainerFunction = selectContainerFunction;
function createNotebookController(askUserInputDiv, notebookContainerWrapper, socket) {
    var createNewNotebookButton = document.createElement("button");
    createNewNotebookButton.innerText = "New Notebook";
    createNewNotebookButton.addEventListener("click", function (e) {
        askUserInputDiv.style.display = "block";
        var questionField = askUserInputDiv.querySelector(".questionToAsk");
        questionField.innerText = "Please enter the name of the new notebook.";
        var confirmButton = askUserInputDiv.querySelector(".confirmButton");
        confirmButton.onclick = function () {
            var inputField = askUserInputDiv.querySelector(".inputField");
            var notebookName = inputField.value;
            var notebookID = createUniqueID();
            var newNotebook = createNotebookItem(notebookID, notebookName);
            notebookContainerWrapper.append(newNotebook);
            console.log(notebookName);
            askUserInputDiv.style.display = "none";
            socket.emit("createNewNotebook", { notebookID: notebookID, notebookName: notebookName });
        };
    });
    var deleteNotebookButton = document.createElement("button");
    deleteNotebookButton.innerText = "Delete Notebook";
    deleteNotebookButton.addEventListener("click", function (e) {
        var selectedObjectArray = Array.from(document.querySelectorAll(".selectionDiv[selected='true']"));
        selectedObjectArray.forEach(function (p) {
            p.notebookContainer.remove();
            var notebookID = p.getAttribute("notebookID");
            socket.emit("deleteNotebook", notebookID);
        });
        console.log(selectedObjectArray);
    });
    var deSelectNotebookButton = document.createElement("button");
    deSelectNotebookButton.innerText = "Deselect";
    deSelectNotebookButton.addEventListener("click", function (e) {
        var selectedObjectArray = Array.from(document.querySelectorAll(".selectionDiv[selected='true']"));
        selectedObjectArray.forEach(function (p) {
            p.setAttribute("selected", "false");
        });
        console.log(selectedObjectArray);
    });
    var editNotebookButton = document.createElement("button");
    editNotebookButton.innerText = "Edit Notebook";
    editNotebookButton.addEventListener("click", function (e) {
        var overlayArray = Array.from(notebookContainerWrapper.querySelectorAll(".notebookContainerOverlayWrapper"));
        overlayArray.forEach(function (p, i) {
            if (p.style.display == "none") {
                p.style.display = "block";
            }
            else {
                p.style.display = "none";
                if (i == 0)
                    deSelectNotebookButton.click();
            }
        });
    });
    return [createNewNotebookButton, deleteNotebookButton, deSelectNotebookButton, editNotebookButton];
}
exports.createNotebookController = createNotebookController;
function createNotebookItem(notebookID, notebookName) {
    if (notebookName === void 0) { notebookName = "Notebook"; }
    var notebookDiv = document.createElement("div");
    notebookDiv.classList.add("notebookDiv");
    notebookDiv.addEventListener("click", function (e) {
        location.href = "/talkNotes/notebook/" + notebookID;
    });
    var notebookImage = document.createElement("div");
    notebookImage.classList.add("notebookImage");
    var notebookTitle = document.createElement("div");
    notebookTitle.classList.add("notebookTitle");
    notebookTitle.innerText = notebookName;
    var notebookContainerOverlayWrapper = document.createElement("div");
    notebookContainerOverlayWrapper.classList.add("notebookContainerOverlayWrapper");
    var notebookContainerOverlay = document.createElement("div");
    notebookContainerOverlay.classList.add("notebookContainerOverlay");
    var selectionDiv = document.createElement("div");
    selectionDiv.notebookContainer = notebookDiv;
    selectionDiv.classList.add("selectionDiv");
    selectionDiv.setAttribute("selected", "false");
    selectionDiv.setAttribute("notebookID", notebookID);
    notebookContainerOverlayWrapper.append(notebookContainerOverlay, selectionDiv);
    notebookContainerOverlay.addEventListener("click", selectContainerFunction(selectionDiv));
    selectionDiv.addEventListener("click", selectContainerFunction(selectionDiv));
    notebookDiv.append(notebookImage, notebookTitle, notebookContainerOverlayWrapper);
    console.log(notebookID, notebookName);
    return notebookDiv;
} // createNotebookItem
exports.createNotebookItem = createNotebookItem;
function askUserInput() {
}
exports.askUserInput = askUserInput;
function createUniqueID() {
    var temporaryPointer = "" + (Date.now().toString(36) + Math.random().toString(36).substr(2));
    return temporaryPointer;
}
exports.createUniqueID = createUniqueID;
