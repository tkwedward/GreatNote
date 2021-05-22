import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass";
import * as ToolBoxHelperFunction from "./toolBoxHelperFunction";
export function detectCollision(svgBoard, eraser) {
    let objectsInTheLayer = svgBoard.querySelectorAll("polyline");
    let newPoint = svgBoard.createSVGPoint();
    objectsInTheLayer.forEach((object) => {
        let lineArray = object.soul.array().value;
        Array.from(lineArray).forEach((p) => {
            newPoint.x = p[0];
            newPoint.y = p[1];
            if (eraser.isPointInFill(newPoint)) {
                object.deleteFromDatabase();
                return;
            }
        });
        return;
    });
}
export function eraserMouseDownFunction(e, mainController, svgBoard, moveEventName, upEventName) {
    if (!mainController.toolBox.checkToolBoxItemStatus("eraserItemButton")) {
        return;
    }
    let [offsetX, offsetY, touchIsPen] = ToolBoxHelperFunction.getOffSetXY(e);
    console.log(44, 44, 44, touchIsPen);
    if (!touchIsPen)
        return;
    e.preventDefault();
    if (e.type == "mousedown" || touchIsPen) {
        let cx = offsetX + "px";
        let cy = offsetY + "px";
        let r = "20px";
        let eraser = GreatNoteSvgDataClass.GNSvgCircle({ name: "123", arrayID: "", insertPosition: false, dataPointer: false, saveToDatabase: false });
        eraser.style["cx"] = cx;
        eraser.style["cy"] = cy;
        eraser.style["r"] = r;
        // console.log(545454, e, eraser, moveEventName)
        let mouseMoveFunction = (e) => {
            // t1 = t2
            // t2 = e.timeStamp
            let [offsetX, offsetY, touchIsPen] = ToolBoxHelperFunction.getOffSetXY(e);
            let logTest = `offsetX = ${offsetX} <br>` + `offsetY = ${offsetY}`;
            ToolBoxHelperFunction.locationLog(logTest);
            eraser.style["cx"] = offsetX;
            eraser.style["cy"] = offsetY;
            detectCollision(svgBoard, eraser);
        };
        let mouseUpFunciton = (e) => {
            svgBoard.removeEventListener(moveEventName, mouseMoveFunction);
            svgBoard.removeEventListener(upEventName, mouseUpFunciton);
            eraser.remove();
        };
        svgBoard.addEventListener(moveEventName, mouseMoveFunction);
        svgBoard.addEventListener(upEventName, mouseUpFunciton);
        svgBoard.appendChild(eraser);
    } // if (e.type=="mousedown" || touchIsPen)
} // eraserMouseDownFunction
