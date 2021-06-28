export function getPointWidthAndHeight(rect) {
    let rectData = rect.getBoundingClientRect();
    let { x, y, width, height } = rectData;
    let w = width;
    let h = height;
    return { x, y, w, h };
} // checkSideInsideRect
export function checkPointInsideRect(point, rectData) {
    return point.x > rectData.x && point.x < rectData.x + rectData.w && point.y > rectData.y && point.y < rectData.y + rectData.h;
} // checkSideInsideRect
export function checkCornersInside(rect1Data, rect2Data) {
    let c1 = { x: rect1Data.x, y: rect1Data.y };
    let c2 = { x: rect1Data.x + rect1Data.w, y: rect1Data.y };
    let c3 = { x: rect1Data.x + rect1Data.w, y: rect1Data.y + rect1Data.h };
    let c4 = { x: rect1Data.x, y: rect1Data.y + rect1Data.h };
    return [checkPointInsideRect(c1, rect2Data), checkPointInsideRect(c2, rect2Data), checkPointInsideRect(c3, rect2Data), checkPointInsideRect(c4, rect2Data)];
} // checkSideInsideRect
export function checkSideInsideRect(rect1Data, rect2Data) {
    let x1_1 = rect1Data.x;
    let x1_2 = rect1Data.x + rect1Data.w;
    let y1_1 = rect1Data.y;
    let y1_2 = rect1Data.y + rect1Data.h;
    let x2_1 = rect2Data.x;
    let x2_2 = rect2Data.x + rect2Data.w;
    let y2_1 = rect2Data.y;
    let y2_2 = rect2Data.y + rect2Data.h;
    if (x1_1 < x2_1 && x1_2 > x2_2 && y1_1 > y2_1 && y1_2 < y2_2) {
        return true;
    }
    else {
        return false;
    }
} // checkSideInsideRect
export function addEventToSelectionRect(selectionRect, rectSelectionToolController) {
    selectionRect.addEventListener("mousedown", e => {
        e.stopPropagation();
        let [initialX, initialY, deltaX, deltaY] = [e.offsetX, e.offsetY, 0, 0];
        let selectionRectInitialPositionX = +selectionRect.style.left.replace("px", "");
        let selectionRectInitialPositionY = +selectionRect.style.top.replace("px", "");
        let divObjectInitialPosition = selectionRect.divLayerItemArray.map((p) => {
            let x = +p.style.left.replace("px", "");
            let y = +p.style.top.replace("px", "");
            return { x, y };
        });
        let svgObjectInitialPosition = selectionRect.svgLayerItemArray.map((p) => {
            return p.soul.array().value;
        });
        console.log(7070, selectionRect.svgLayerItemArray);
        let mouseMoveFunction = function (mouseeMoveEvent) {
            e.preventDefault();
            let [offsetX, offsetY] = [mouseeMoveEvent.offsetX, mouseeMoveEvent.offsetY];
            [deltaX, deltaY] = [offsetX - initialX, offsetY - initialY];
            selectionRect.style.left = selectionRectInitialPositionX + deltaX + "px";
            selectionRect.style.top = selectionRectInitialPositionY + deltaY + "px";
            let divCheckbox = rectSelectionToolController.querySelector("#divCheckBox");
            let svgCheckbox = rectSelectionToolController.querySelector("#svgCheckBox");
            if (divCheckbox.checked) {
                let divLayerItemArray = rectSelectionToolController.selectedItem.divLayerItemArray;
                for (let i = 0; i < divLayerItemArray.length; i++) {
                    let { x, y } = divObjectInitialPosition[i];
                    divLayerItemArray[i].style.left = x + deltaX + "px";
                    divLayerItemArray[i].style.top = y + deltaY + "px";
                }
            }
            if (svgCheckbox.checked) {
                let svgLayerItemArray = rectSelectionToolController.selectedItem.svgLayerItemArray;
                for (let i = 0; i < svgLayerItemArray.length; i++) {
                    let newPointPosition = svgObjectInitialPosition[i].map((p) => [p[0] + deltaX, p[1] + deltaY]);
                    svgLayerItemArray[i].soul.plot(newPointPosition);
                }
            }
        };
        let mouseUpFunction = function (mouseeUpEvent) {
            selectionRect.divLayerItemArray.forEach(p => p.saveHTMLObjectToDatabase());
            selectionRect.svgLayerItemArray.forEach(p => p.saveHTMLObjectToDatabase());
            e.preventDefault();
            selectionRect.removeEventListener("mousemove", mouseMoveFunction);
            selectionRect.removeEventListener("mouseup", mouseUpFunction);
            selectionRect.removeEventListener("mouseout", mouseUpFunction);
        };
        selectionRect.addEventListener("mousemove", mouseMoveFunction);
        selectionRect.addEventListener("mouseup", mouseUpFunction);
        selectionRect.addEventListener("mouseout", mouseUpFunction);
        rectSelectionToolController.selectedItem;
    });
}
