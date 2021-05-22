import { dropdownListController, inputFieldAndDropdownListController } from "./basicControllerType";
// when the input htmlObject is click, then it will loop all the attribute controllers in the controller array. Check if the controller's type is consistent with the input htmlobject's tagname. If they are consistent, then the controllers will be shown, otherwise, they will be hide.
// clear the controllers target and then set their newtarget to be the new htmlObject
export function initializeContainerAndControllerEvent(htmlObject, controllerArray) {
    htmlObject.addEventListener("click", (e) => {
        controllerArray.forEach(p => p.responseToHtmlType(htmlObject));
        // e.stopPropagation()
        controllerArray.forEach(p => {
            p.clear();
            p.setControllerTarget(htmlObject);
        });
    }, false);
} // initializeContainerAndControllerEvent
export function superController(controllerContainer) {
    // to add some function and common properties to an controller object
    // controllerContainer.style.display = "none"
    //** if the controller's targetHTMLType is not equal to the input htmlObject's tagname, then will hide the controller, but if they are the same, then the
    controllerContainer.responseToHtmlType = function (htmlObject) {
        console.log(htmlObject.tagName, controllerContainer.targetHTMLType);
        if (htmlObject.tagName != controllerContainer.targetHTMLType) {
            console.log("none");
            controllerContainer.style.display = "none";
        }
        else {
            console.log("visible");
            controllerContainer.style.display = "block";
        }
    };
    //** ??? don't understand
    controllerContainer.attachTo = function (htmlObject) {
        initializeContainerAndControllerEvent(htmlObject, controllerContainer.controllerArray);
    };
} // superController
//** to create the type of controller according to the controller type
// e.g. for
export function universalControllerCreater(name, controllerOptions) {
    let controllerContainer = document.createElement("div");
    controllerContainer.classList.add(name);
    controllerContainer.style.width = "90%";
    controllerContainer.style.minHeight = "200px";
    controllerContainer.style.border = "2px black solid";
    controllerContainer.style.margin = "20px auto";
    let attributeName = controllerOptions["attributeName"];
    let unitOptions = controllerOptions["unitOptions"];
    let selectionList = controllerOptions["selectionList"];
    if (unitOptions)
        return inputFieldAndDropdownListController(attributeName, unitOptions);
    if (selectionList)
        return dropdownListController(attributeName, selectionList);
}
