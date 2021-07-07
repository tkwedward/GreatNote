import {universalControllerCreater, superController} from "./attributeControllerHelperFunction"

export function createMoveObjectInDivController(){
  let controllerContainer = document.createElement("div")
  controllerContainer.classList.add("moveObjectInDivController")

  let imageContainerAttributeController =  createImageContainerAttributeController()

  controllerContainer.append(imageContainerAttributeController)

  superController(controllerContainer)

  return controllerContainer
}


export function createInputDiv(inputLabelName: string): [HTMLDivElement, HTMLInputElement]{
    let inputDiv = document.createElement("div")
    let inputLabel = document.createElement("label")
    inputLabel.innerText = inputLabelName + " (px): "
    let inputField = document.createElement("input")

    inputDiv.append(inputLabel, inputField)
    return [inputDiv, inputField]
}

export interface ImageContainerAttributeControllerInterface extends HTMLDivElement {
    targetImageContainer: any
    renderImage(): void
}

export function createImageContainerAttributeController():ImageContainerAttributeControllerInterface{
  let imageContainerAttributeController = <ImageContainerAttributeControllerInterface> document.createElement("div")
  imageContainerAttributeController.classList.add("imageContainerAttributeController")

  let [widthInputDiv, widthInput] = createInputDiv("width")
  let [heightInputDiv, heightInput] = createInputDiv("height")
  let [xPositionInputDiv, xPositionInput] = createInputDiv("xPosition")
  let [yPositionInputDiv, yPositionInput] = createInputDiv("yPosition")

  let smallImage = document.createElement("img")
  smallImage.classList.add("smallImage")
  // smallImage.src = imageContainerAttributeController.targetImageContainer.src
  // smallImage.style.width = "250px"


  widthInput.addEventListener("keyup", e=>{
      if (e.keyCode == 13) {
        console.log('Enter');
        let width = parseFloat(widthInput.value)
        let [newWidth, newHeight] = imageContainerAttributeController.targetImageContainer.setImageSize({width: width})
        console.log(newWidth, newHeight)
        widthInput.value = newWidth.toFixed(2)
        heightInput.value = newHeight.toFixed(2)
        imageContainerAttributeController.targetImageContainer.saveHTMLObjectToDatabase()

      }
  })
  heightInput.addEventListener("keyup", e=>{
      if (e.keyCode == 13) {
        console.log('Enter');
        let height = parseFloat(heightInput.value)
        let [newWidth, newHeight] = imageContainerAttributeController.targetImageContainer.setImageSize({height: height})
        widthInput.value = newWidth.toFixed(2)
        heightInput.value = newHeight.toFixed(2)
        imageContainerAttributeController.targetImageContainer.saveHTMLObjectToDatabase()
      }
  })

  let updateButton = document.createElement("button")
  updateButton.innerText = "update"
  updateButton.classList.add("imageAttributeControllerUpdateButton")
  updateButton.addEventListener("click", e=>{
      console.log(imageContainerAttributeController.targetImageContainer)
      console.log(widthInput.value, heightInput.value, xPositionInput.value, yPositionInput.value)
  })

  let deleteButton = document.createElement("button")
  deleteButton.innerText = "delete Image"
  deleteButton.classList.add("imageAttributeControllerDeleteButton")
  deleteButton.addEventListener("click", e=>{
      imageContainerAttributeController.targetImageContainer?.deleteFromDatabase()
  })

  let defaultSizeDropList = document.createElement("select")
  defaultSizeDropList.classList.add("defaultSizeDropList")
  let defaultSizeOpt500 = document.createElement("option")
  defaultSizeOpt500.value = "500"
  defaultSizeOpt500.innerText = "500"
  let defaultSizeOpt600 = document.createElement("option")
  defaultSizeOpt600.value = "600"
  defaultSizeOpt600.innerText = "600"
  defaultSizeDropList.append(defaultSizeOpt500, defaultSizeOpt600)

  imageContainerAttributeController.append(widthInputDiv, heightInputDiv, defaultSizeDropList, smallImage, updateButton, deleteButton)
  // imageContainerAttributeController.append(widthInputDiv, heightInputDiv, xPositionInputDiv, yPositionInputDiv, smallImage, updateButton, deleteButton)


  imageContainerAttributeController.renderImage = function (){
      let imgContainer = imageContainerAttributeController.targetImageContainer
      widthInput.value = imgContainer.style.width.replace("px", "")
      heightInput.value = imgContainer.style.width.replace("px", "")

      smallImage.src = imgContainer.querySelector("img").src
      // xPositionInput.value = imgContainer.style.left.replace("px", "")
      // yPositionInput.value = imgContainer.style.top.replace("px", "")
  }

  return imageContainerAttributeController
}
