import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"
import {HTMLObjectControllerInterface, PolylineControllerInterface} from "./attributeControllerInterface"
import * as Settings from "../settings"

interface SelectionToolControllerInterface extends HTMLObjectControllerInterface{
    copyDataArray: any
    selectionRectInfo: {x0: number, y0: number, x1: number, y1: number}
}

export function createEraserToolController():SelectionToolControllerInterface{
    let eraserToolControllerContainer = <SelectionToolControllerInterface> document.createElement("div")
    eraserToolControllerContainer.classList.add("eraserToolController")

    eraserToolControllerContainer.copyDataArray = []

    let inputField = document.createElement("input")
    inputField.classList.add("eraserRadiusInput")
    inputField.type = "number"
    inputField.value = `${Settings.defaultEraserRadius}`

    let upButton = document.createElement("button")
    upButton.innerText = "+"
    upButton.addEventListener("click", e=>{
        inputField.value = `${+inputField.value + 1}`
    })



    let downButton = document.createElement("button")
    downButton.innerText = "-"
    downButton.addEventListener("click", e=>{
        inputField.value = `${+inputField.value - 1}`
    })


    eraserToolControllerContainer.append(inputField, upButton, downButton)

    return eraserToolControllerContainer
}
