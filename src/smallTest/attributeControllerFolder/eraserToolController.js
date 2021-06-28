import * as Settings from "../settings";
export function createEraserToolController() {
    let eraserToolControllerContainer = document.createElement("div");
    eraserToolControllerContainer.classList.add("eraserToolController");
    eraserToolControllerContainer.copyDataArray = [];
    let inputField = document.createElement("input");
    inputField.classList.add("eraserRadiusInput");
    inputField.type = "number";
    inputField.value = `${Settings.defaultEraserRadius}`;
    let upButton = document.createElement("button");
    upButton.innerText = "+";
    upButton.addEventListener("click", e => {
        inputField.value = `${+inputField.value + 1}`;
    });
    let downButton = document.createElement("button");
    downButton.innerText = "-";
    downButton.addEventListener("click", e => {
        inputField.value = `${+inputField.value - 1}`;
    });
    eraserToolControllerContainer.append(inputField, upButton, downButton);
    return eraserToolControllerContainer;
}
