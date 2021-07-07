import { MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"

export function test(){

}

export function createAllSectionRow(pageSectionData: any){
    let row = document.createElement("div");
    row.innerHTML = pageSectionData.name
    // row.innerHTML = pageSectionData.name

    return row
}

export function createSectionController(mainController: MainControllerInterface): HTMLDivElement{
    let controllerHTMLObject = document.createElement("div")
    controllerHTMLObject.classList.add("sectionControllerHTMLObject")

    let titleNameInput = document.createElement("input")
    let tagNameInput = document.createElement("input")
    let addRowButton = document.createElement("button")
    addRowButton.innerHTML = "addRowButton"
    addRowButton.addEventListener("click", e=>{
        let currentPageHTMLObject = mainController.pageController.currentPage.fullPageHTMLObject
        console.log(525252, currentPageHTMLObject.sectionDataArray)

        let sectionData = {
            name: titleNameInput.value,
            tag: tagNameInput.value
        }

        currentPageHTMLObject.sectionDataArray.push(sectionData)
        currentPageHTMLObject.saveHTMLObjectToDatabase()

        titleNameInput.value = ""
        tagNameInput.value = ""
    })

    let editRowButton = document.createElement("button")
    editRowButton.innerHTML = "editRowButton"

    let deleteRowButton =  document.createElement("button")
    deleteRowButton.innerHTML = "delete"
    deleteRowButton.addEventListener("click", e=>{
      console.log(deleteRowButton.pageSectionData)
    })

    let cancelEditButton = document.createElement("button")
    cancelEditButton.innerHTML = "cancel"

    // to show the sections of all pages
    let allSectionViewWrapper = document.createElement("div")
    allSectionViewWrapper.classList.add("allSectionViewWrapper")

    let allSectionView = document.createElement("div")
    allSectionView.classList.add("allSectionView")

    // add a new row o the secttion viewer, read the row datta and then 
    allSectionView.addNewRow = function(pageNumber: number, accessPointer: string, pageSectionData: any[]){
        if (pageSectionData && pageSectionData.length > 0){
          let pageSectionRowWrapper = document.createElement("div")
          allSectionView.append(pageSectionRowWrapper)
          let pageDiv = document.createElement("div")
          pageDiv.innerText = `p.${pageNumber}`
          pageDiv.addEventListener("click", e=>{
            let targetPageObject = mainController.pageController.getPageObjectFromAccessPointer(accessPointer)
            mainController.pageController.goToPage(targetPageObject.pageNumber)
          })
          pageSectionRowWrapper.append(pageDiv)
          pageSectionRowWrapper.style.marginBottom = "10px"

          pageSectionData.forEach((pageSectionData: {name: string, tag: string}) =>{
            let row = document.createElement("div");
            row.innerHTML = pageSectionData.name
            pageSectionRowWrapper.append(row)
            row.pageSectionData = pageSectionData

            // to highlight the selected row and enter edit mode
            row.addEventListener("click", e=>{
                let selectedRow = <HTMLDivElement> allSectionView.querySelector(".selectedRow")

                if (selectedRow == row) return
                selectedRow?.classList.remove("selectedRow")
                row.classList.add("selectedRow")

                titleNameInput.value = pageSectionData.name
                tagNameInput.value = pageSectionData.tag

                deleteRowButton.pageSectionData = {
                  accessPointer: accessPointer,
                  pageSectionData: pageSectionData
                }
            })
          })
        }
    }

    for (let i=0; i < 100; i++){
        allSectionView.addNewRow({name: "name", tag: "tag"})
    }

    allSectionViewWrapper.append(allSectionView)

    // section controller, to add title and tag to the info of the section
    // show the things in this page

    controllerHTMLObject.append(allSectionViewWrapper, titleNameInput, tagNameInput, addRowButton, editRowButton, deleteRowButton, cancelEditButton)

    return controllerHTMLObject

}
