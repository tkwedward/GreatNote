System.register("mainPage", [], function (exports_1, context_1) {
    "use strict";
    var notebookContainerWrapper, notebookContainerNavBar, createNewNotebookButton;
    var __moduleName = context_1 && context_1.id;
    function createNotebookItem(notebookTitleName) {
        if (notebookTitleName === void 0) { notebookTitleName = "Notebook"; }
        var notebookDiv = document.createElement("div");
        notebookDiv.classList.add("notebookDiv");
        var notebookImage = document.createElement("div");
        notebookImage.classList.add("notebookImage");
        var notebookTitle = document.createElement("div");
        notebookTitle.classList.add("notebookTitle");
        notebookTitle.innerText = notebookTitleName;
        notebookDiv.append(notebookImage, notebookTitle);
        return notebookDiv;
    }
    exports_1("createNotebookItem", createNotebookItem);
    return {
        setters: [],
        execute: function () {
            notebookContainerWrapper = document.querySelector(".notebookContainerWrapper");
            notebookContainerNavBar = document.querySelector(".navBar");
            createNewNotebookButton = document.createElement("button");
            createNewNotebookButton.addEventListener("click", function (e) {
                var newNotebook = createNotebookItem();
                notebookContainerWrapper.append(newNotebook);
            });
            notebookContainerNavBar.append(createNewNotebookButton);
            console.log("1343");
        }
    };
});
