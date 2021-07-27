import { GNTextBox } from "../GreatNoteClass/GNTextBox";
import * as ToolBoxHelperFunction from "./toolBoxHelperFunction";
export function textBoxMouseDownFunction(e, mainController, divLayer, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("textBoxItemButton"))
        return;
    if (e.target.classList.contains("svgLayer"))
        return;
    // if (divLayer.classList.contains("fullPage")) return
    console.log("This is textbox function");
    let offsetX, offstY, touchIsPen;
    [offsetX, offstY, touchIsPen] = ToolBoxHelperFunction.getOffSetXY(e);
    let textBox = GNTextBox({ name: "GNTextBox", arrayID: divLayer.getAccessPointer(), _classNameList: ["GNTextBox"], saveToDatabase: true });
    textBox.style.left = offsetX + "px";
    textBox.style.top = offstY + "px";
    textBox.innerHTML = "textBox textBox textBox";
    divLayer.append(textBox);
    textBox.saveHTMLObjectToDatabase();
}
