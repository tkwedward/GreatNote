import { GNTextContainer } from "../GreatNoteClass/GNTextContainer";
import * as ToolBoxHelperFunction from "./toolBoxHelperFunction";
export function textToolMouseDownFunction(e, mainController, divLayer, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("textToolItemButton"))
        return;
    if (e.target.classList.contains("svgLayer"))
        return;
    if (divLayer.classList.contains("fullPage"))
        return;
    let offsetX, offstY, touchIsPen;
    [offsetX, offstY, touchIsPen] = ToolBoxHelperFunction.getOffSetXY(e);
    let textContainer = GNTextContainer({ name: "GNTextContainer", arrayID: divLayer.getAccessPointer(), _classNameList: ["GNTextContainer"], saveToDatabase: true });
    textContainer.style.left = offsetX + "px";
    textContainer.style.top = offstY + "px";
    let pageAccessPointer = divLayer.parentElement.getAttribute("accessPointer");
    let pageObject = mainController.pageController.getPageObjectFromAccessPointer(pageAccessPointer);
    let annotationObject = {
        accessPointer: textContainer.getAccessPointer(),
        annotationType: textContainer.getAnnotationType()
    };
    pageObject.pageRelatedData.annotationArray.push(annotationObject);
    divLayer.append(textContainer);
}
