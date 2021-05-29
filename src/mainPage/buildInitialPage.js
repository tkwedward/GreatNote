"use strict";
exports.__esModule = true;
exports.buildInitialPageFunction = void 0;
var mainPageHelperFunction_1 = require("./mainPageHelperFunction");
function buildInitialPageFunction(data) {
    var askUserInputDiv = document.querySelector(".askUserInputDiv");
    var notebookContainerWrapper = document.querySelector(".notebookContainerWrapper");
    var notebookContainerNavBar = document.querySelector(".navBar");
    data.forEach(function (p) {
        console.log(11111, p);
        var newNotebook = mainPageHelperFunction_1.createNotebookItem(p.notebookID, p.notebookName);
        notebookContainerWrapper.append(newNotebook);
    });
}
exports.buildInitialPageFunction = buildInitialPageFunction;
