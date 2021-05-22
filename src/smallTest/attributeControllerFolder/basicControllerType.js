// @auto-fold heres
export function inputFieldAndDropdownListController(attributeName, unitOptions) {
    let controllerContainer = document.createElement("div");
    controllerContainer.style.display = "grid";
    controllerContainer.style.gridTemplateColumns = "1fr 3fr 1fr";
    controllerContainer.classList.add(attributeName + "Controller");
    let title = document.createElement("span");
    title.innerText = attributeName;
    title.style.textAlign = "center";
    let inputField = document.createElement("input");
    let dropdownList = document.createElement("select");
    unitOptions.forEach((unit) => {
        let option = document.createElement("option");
        option.value = unit;
        option.innerText = unit;
        dropdownList.appendChild(option);
    });
    dropdownList.addEventListener("change", (e) => controllerContainer.updateObject());
    inputField.addEventListener("input", (e) => controllerContainer.updateObject());
    // to update the value according to the controller values
    // @auto-fold her
    controllerContainer.updateObject = function () {
        if (controllerContainer.controllerTarget) {
            controllerContainer.controllerTarget.style[attributeName] = inputField.value + dropdownList.value;
        }
    };
    // to extract the input field and unit
    controllerContainer.extract = function () {
        return inputField.value + dropdownList.value;
    };
    // functions
    controllerContainer.setControllerTarget = function (object) {
        controllerContainer.controllerTarget = object;
    };
    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function () {
        controllerContainer.setControllerTarget(null);
    };
    controllerContainer.append(title, inputField, dropdownList);
    return controllerContainer;
} // inputFieldAndDropdownListController
// @auto-fold here
export function dropdownListController(attributeName, selectionList) {
    let controllerContainer = document.createElement("div");
    let title = attributeName;
    let dropdownList = document.createElement("select");
    selectionList.forEach(unit => {
        let option = document.createElement("option");
        option.value = unit;
        option.innerText = unit;
        dropdownList.appendChild(option);
    });
    dropdownList.addEventListener("change", (e) => controllerContainer.updateObject());
    controllerContainer.updateObject = function () {
        if (controllerContainer.controllerTarget) {
            controllerContainer.controllerTarget.style[attributeName] = dropdownList.value;
        }
    };
    // functions
    controllerContainer.setControllerTarget = function (object) {
        controllerContainer.controllerTarget = object;
    };
    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function () {
        controllerContainer.setControllerTarget(null);
    };
    controllerContainer.append(title, dropdownList);
    return controllerContainer;
} // dropdownListController
// @auto-fold here
export function choiceController(attribute, choiceList, prototype) {
    let controllerContainer = document.createElement("div");
    controllerContainer.classList.add("choiceController");
    controllerContainer.classList.add(attribute + "Controller");
    choiceList.forEach((choiceValue) => {
        let item = prototype.cloneNode(true);
        if (attribute == "fill") {
            item["style"]["background"] = choiceValue;
            item["style"]["opacity"] = "0.90";
        }
        else {
            // background, stroke can be the attribute in css
            item["style"][attribute] = choiceValue;
        }
        controllerContainer.appendChild(item);
        item.addEventListener("click", (e) => {
            let selectedColor = controllerContainer.querySelector("div .selectedColor");
            if (selectedColor)
                selectedColor.classList.remove("selectedColor");
            item.classList.add("selectedColor");
            // controllerContainer.updateObject(choiceValue)
        });
    });
    //
    controllerContainer.extract = function () {
        return controllerContainer.querySelector(".selectedColor")["style"]["background"];
    };
    /** to update the value according to the controller values */
    controllerContainer.updateObject = function (itemValue) {
        if (controllerContainer.controllerTarget) {
            controllerContainer.controllerTarget.style[attribute] = itemValue;
        }
    };
    // functions
    controllerContainer.setControllerTarget = function (object) {
        controllerContainer.controllerTarget = object;
    };
    /** to clear the controller's data when it is dismissed. */
    controllerContainer.clear = function () {
        controllerContainer.setControllerTarget(null);
    };
    return controllerContainer;
} // choiceController
