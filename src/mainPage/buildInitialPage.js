import { createNotebookItem } from "./mainPageHelperFunction";
export function buildInitialPageFunction(data) {
    let askUserInputDiv = document.querySelector(".askUserInputDiv");
    let notebookContainerWrapper = document.querySelector(".notebookContainerWrapper");
    let notebookContainerNavBar = document.querySelector(".navBar");
    data.forEach((p) => {
        console.log(11111, p);
        let newNotebook = createNotebookItem(p.notebookID, p.notebookName);
        notebookContainerWrapper.append(newNotebook);
    });
}
