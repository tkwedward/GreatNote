import {MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"

export function getAllPageAnnotation(currentPage:any,  checkedArray?:any){
  let currentPageAnnotationData = currentPage.getCategorizedAnnotationArray()
  console.log(currentPage, currentPageAnnotationData)
  let filteredCurrentPageAnnotationData = {}

  if (checkedArray){
    checkedArray.forEach((p:any)=> {
      filteredCurrentPageAnnotationData[p] = currentPageAnnotationData[p]
    })
  } else {
      filteredCurrentPageAnnotationData = currentPageAnnotationData
  }

  let newItem = {
      pageNumber: currentPage.pageNumber,
      currentPageAnnotationData: filteredCurrentPageAnnotationData
  }

  let numberOfItem = 0
  Object.values(filteredCurrentPageAnnotationData).forEach((p:any) => {
      console.log(2323232, p)
      if (p) numberOfItem += p.length
  })

  if (numberOfItem > 0) {
      return newItem
  } else {
      return
  }
}


export function buildAnnotationPage(mainController: MainControllerInterface){
  let annotationPage = <HTMLDivElement> document.querySelector(".annotationPage")

  let checkBoxContainer = document.createElement("div")
  checkBoxContainer.classList.add("checkBoxContainer")

  let annotationPageContentWrapper = document.createElement("div")
  annotationPageContentWrapper.classList.add("annotationPageContentWrapper")

  let checkBoxChoiceArray = ["section", "question", "solution", "comment", "equation", "group"]

  checkBoxChoiceArray.forEach(p=>{
      let checkBoxChoice = document.createElement("div")
      let checkBox = document.createElement("input")
      checkBox.id = "checkBox_" + p
      checkBox.type = "checkbox"
      checkBox.value = p

      let checkBoxLabel = document.createElement("label")
      checkBoxLabel.setAttribute("for", "checkBox_" + p)
      checkBoxLabel.innerText = p
      checkBoxChoice.append(checkBox, checkBoxLabel)
      checkBoxContainer.append(checkBoxChoice)
  })

  let getCheckedValueButton = document.createElement("button")
  getCheckedValueButton.classList.add("getCheckedValueButton")
  getCheckedValueButton.innerText = "getCheckedValue"
  getCheckedValueButton.addEventListener("click", e=>{
      let checkedArray = Array.from(document.querySelectorAll(".checkBoxContainer input:checked")).map((p:any)=>p.value)
      console.log(626262, checkedArray)

      let currentPage = <any>  mainController.pageController.startPage.next

      let allPageAnnotationArray:any = []

      while (currentPage){
          if (!currentPage.getCategorizedAnnotationArray) break

          // pageNumber: , currentPageAnnotationData
          let currentPageAnnotationData = getAllPageAnnotation(currentPage, checkedArray)


          if (currentPageAnnotationData){
              allPageAnnotationArray.push(currentPageAnnotationData)
          }

          currentPage = currentPage.next
      }
      console.log(allPageAnnotationArray)
      renderAnnotationPage(allPageAnnotationArray, annotationPageContentWrapper)
  })



  annotationPage.append(checkBoxContainer, getCheckedValueButton, annotationPageContentWrapper)

  return [annotationPage, getCheckedValueButton]
}

export function renderAnnotationPage(currentPageAnnotationData: any, annotationPageContentWrapper: HTMLDivElement){
    annotationPageContentWrapper.innerHTML = ""
    currentPageAnnotationData.forEach((p:{ currentPageAnnotationData: any, pageNumber: number})=>{
        let pageWrapper = document.createElement("div")
        pageWrapper.style.margin = "10px 0"

        let title = document.createElement("div")
        title.innerText = `P. ${p.pageNumber}`
        pageWrapper.append(title)

        Object.entries(p.currentPageAnnotationData).forEach(([key, itemArray]: [string, any], _)=>{
            let keyContainer = document.createElement("div")
            keyContainer.innerText = key
            // question, solution or

            itemArray.forEach((item:{
              accessPointer: string,
              annotationType: string
            })=>{
                let masterObject = <HTMLDivElement> document.querySelector(`*[accessPointer='${item.accessPointer}']`)

                let annotationSummary = document.createElement("div")
                annotationSummary.innerText =  `${masterObject.querySelector("input")?.value}`

                let annotationContent = document.createElement("div")
                annotationContent.innerHTML =  `${masterObject.querySelector("div")?.innerHTML}`

                let separationLine = document.createElement("hr")

                console.log(key, item, masterObject)
                pageWrapper.append(annotationSummary, annotationContent, separationLine)

            })





        })

        annotationPageContentWrapper.append(pageWrapper)
    })

    console.log(currentPageAnnotationData)

}
