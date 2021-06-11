import { MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"

let overviewModeDiv = <HTMLDivElement> document.querySelector(".overviewModeDiv")

export function createColorPicker(){
    let colorPickerDiv = document.createElement("div")
    colorPickerDiv.classList.add("colorPickerDiv")

    let availableColors = ["#FFFFFF", "#C0C0C0", "#808080", "#000000", "#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"]

    availableColors.forEach((color:string)=>{
      let colorBlock = document.createElement("div")
      colorBlock.style.width = "20px"
      colorBlock.style.height = "20px"
      colorBlock.style.background = color
      colorBlock.style.display = "inline-block"
      colorPickerDiv.append(colorBlock)

      colorBlock.addEventListener("click", e=>{
          let selectedSmallViewArray: any[] = Array.from(document.querySelectorAll(".selectedSmallViewHTMLObject"))
          selectedSmallViewArray.forEach((p:any)=>{
            p.querySelector(".smallViewContent").style.background = color
          })

          selectedSmallViewArray.forEach(smallView=>{
              smallView.fullPageHTMLObject.saveHTMLObjectToDatabase()
          })

      })
    })

    return colorPickerDiv
}

export function extractSmallViewData(){

}

export function createSmallViewPageController(mainController: MainControllerInterface){
    let overViewmodePageController = <HTMLDivElement> document.querySelector(".overViewModePageController")

    let colorPicker = document.createElement("input")
    colorPicker.type = "color"
    let colorPickerDiv = createColorPicker()

    let setTagNameInput = document.createElement("input")
    setTagNameInput.classList.add("setTagNameInput")

    let setTagNameButton = document.createElement("button")
    setTagNameButton.classList.add("setTagName")
    setTagNameButton.innerText = "setTag"
    setTagNameButton.addEventListener("click", e=>{
        let selectedSmallViewArray = Array.from(document.querySelectorAll(".selectedSmallViewHTMLObject"))
        if (selectedSmallViewArray.length > 0){
            console.log(selectedSmallViewArray)
            selectedSmallViewArray.forEach((smallView: any)=>{
                console.log(212121, smallView)
                smallView.innerText += setTagNameInput.value
                smallView.tagsArray.add(setTagNameInput.value)

                smallView.fullPageHTMLObject.saveHTMLObjectToDatabase()

            })
        }
    }) // setTagNameButton click function

    let deleteButton = document.createElement("button")
    deleteButton.classList.add("smallViewDeleteButton")
    deleteButton.innerText = "deleteButton"
    deleteButton.addEventListener("click", e=>{
      let selectedSmallViewArray = document.querySelectorAll(".selectedSmallViewHTMLObject")
      Array.from(selectedSmallViewArray).forEach((p:any)=>{
          p.fullPageHTMLObject.deleteFromDatabase()
          p.remove()
      })
    }) // deleteButton click function


    // not finished
    let copyButton = document.createElement("button")
    copyButton.classList.add("smallViewCopyButton")
    copyButton.innerText = "copyButton"
    copyButton.addEventListener("click", e=>{
        let selectedSmallViewArray = Array.from(document.querySelectorAll(".selectedSmallViewHTMLObject"))
        console.log(selectedSmallViewArray)
        let pageAccessPointerArray = selectedSmallViewArray.map((p:any)=>p.fullPageHTMLObject.getAttribute("accessPointer"))
        console.log(pageAccessPointerArray)
        let lastItem = selectedSmallViewArray[selectedSmallViewArray.length - 1]
    }) // copyButton click function

    overViewmodePageController.append(copyButton, deleteButton, setTagNameButton, setTagNameInput)
    overViewmodePageController.append(colorPicker, colorPickerDiv)

}

import * as PageController from "./pageController"

export function addFunctionToSmallViewHTMLObject(pageController: PageController.pageControllerInterface , smallViewHTMLObject:any, smallViewContent: HTMLDivElement){
    smallViewHTMLObject.draggable = true
    smallViewHTMLObject.tagsArray = new Set()

    let clickCounter = 0
    smallViewHTMLObject.addEventListener("click", e=>{

      clickCounter += 1
      if (clickCounter==2){
        clickCounter = 0
        console.log("double clicked")
        let pageID = smallViewHTMLObject.fullPageHTMLObject.getAccessPointer()
        console.log(pageID)
        let pageNumber = pageController.getPageNumberFromPageID(pageID)
        pageController.goToPage(pageNumber)
        let switchViewModeButton = <HTMLButtonElement> document.querySelector(".switchViewModeButton")
        switchViewModeButton.click()
        return
      }
      setTimeout(()=>{
        clickCounter = 0
      }, 500)
      console.log(115115, e)

      if (e.metaKey) {
        console.log("controlkey pressed")
        smallViewHTMLObject.classList.toggle("selectedSmallViewHTMLObject")
      } else if (e.shiftKey){
          let allSelectedSmallView: any[]  = Array.from(overviewModeDiv.querySelectorAll(".selectedSmallViewHTMLObject"))
          let lastElement = allSelectedSmallView[allSelectedSmallView.length-1]

          if (smallViewHTMLObject.parentElement){
            let childList: Element[] =  Array.from(smallViewHTMLObject.parentElement.children)

            let lastElementIndex = childList.indexOf(lastElement)
            let selectedElementIndex = childList.indexOf(smallViewHTMLObject)
            if (lastElementIndex > selectedElementIndex) {
              for (let i = selectedElementIndex; i < lastElementIndex; i++){
                  if (!childList[i].classList.contains("selectedSmallViewHTMLObject")) childList[i].classList.add("selectedSmallViewHTMLObject")
              }
            } else {
              for (let i = lastElementIndex; i <= selectedElementIndex; i++){
                  if (!childList[i].classList.contains("selectedSmallViewHTMLObject")) childList[i].classList.add("selectedSmallViewHTMLObject")
              }
            }
          }// if (smallViewHTMLObject.parentElement

      } else {
        let selectedSmallViewHTMLObjectArray = overviewModeDiv.querySelectorAll(".selectedSmallViewHTMLObject")
        console.log(selectedSmallViewHTMLObjectArray)
        Array.from(selectedSmallViewHTMLObjectArray).forEach(p=>{
            p.classList.remove("selectedSmallViewHTMLObject")
        })
        smallViewHTMLObject.classList.add("selectedSmallViewHTMLObject")
      }
    })

    smallViewHTMLObject.addEventListener("dragstart", e=>{
        smallViewHTMLObject.classList.add("draggedItem")
    })

    smallViewHTMLObject.addEventListener("dragleave", function( e ) {
      e.preventDefault();
      // console.log("dragleave", e)
    }, false);

    smallViewHTMLObject.addEventListener("dragover", function( e ) {
      e.preventDefault();
    }, false);

    smallViewHTMLObject.addEventListener("drop", e=>{
      let draggedItem =  <HTMLDivElement> document.querySelector(".smallView.draggedItem")

      let rect = smallViewHTMLObject.getBoundingClientRect()

      let middleLine = rect.x +  rect.width/2

      console.log(draggedItem, smallViewHTMLObject)
      if (e.pageX > middleLine){


        overviewModeDiv.insertBefore(draggedItem, smallViewHTMLObject)
        overviewModeDiv.insertBefore(smallViewHTMLObject, draggedItem)
        console.log("insert to the right")

      }
      if (e.pageX < middleLine){
        console.log("insert to the left")
          overviewModeDiv.insertBefore( draggedItem, smallViewHTMLObject)
      }
      draggedItem.classList.toggle("draggedItem")

    }) // smallViewHTMLObject.addEventListener("drop0


    smallViewHTMLObject.extract = function(){
      return {
          color: smallViewContent.style.background,
          tagsArray: Array.from(smallViewHTMLObject.tagsArray)
      }
    } // smallViewHTMLObject.extract

    smallViewHTMLObject.loadFromData = function(injectedData:SmallViewDataInterface){
        smallViewContent.style.background = injectedData.color

        console.log(203203, injectedData)
        injectedData.tagsArray?.forEach((title: string)=>{
            smallViewHTMLObject.tagsArray.add("title")
            let tagDiv = document.createElement("div")
            tagDiv.innerText = title
            smallViewHTMLObject.append(tagDiv)
        })
    } // smallViewHTMLObject.loadFromData
}

export interface SmallViewDataInterface {
    color: string
    tagsArray: string[]
}
