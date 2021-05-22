export function createPopUpBox() {
    let popUpBox = document.createElement("div");
    popUpBox.classList.add("popUpBox");
    addItemToCreatePopUpBox(popUpBox, "delete", () => popUpBox.remove());
    addItemToCreatePopUpBox(popUpBox, "delete", () => popUpBox.remove());
    addItemToCreatePopUpBox(popUpBox, "delete", () => popUpBox.remove());
    addItemToCreatePopUpBox(popUpBox, "delete", () => popUpBox.remove());
    return popUpBox;
}
export function addItemToCreatePopUpBox(popUpBox, name, buttonFunction) {
    let button = document.createElement("div");
    button.classList.add("popUpBoxButton");
    button.textContent = name;
    button.addEventListener("click", function (e) {
        buttonFunction(e);
    });
    popUpBox.appendChild(button);
}
