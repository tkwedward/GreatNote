import {createNotebookItem} from "./mainPageHelperFunction"


export function buildInitialPageFunction(data:any){
  let askUserInputDiv = <HTMLDivElement> document.querySelector(".askUserInputDiv")
  let notebookContainerWrapper = <HTMLDivElement> document.querySelector(".notebookContainerWrapper")
  let notebookContainerNavBar = <HTMLDivElement> document.querySelector(".navBar")

  data.forEach((p:{notebookID: string, notebookName:string}) => {
    console.log(11111, p)
    let newNotebook = createNotebookItem(p.notebookID, p.notebookName)
    notebookContainerWrapper.append(newNotebook)
  })

}
