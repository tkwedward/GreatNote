import * as Settings from "../settings";
export function clearUpEvent(svgBoard, eventName, eventFunction) {
    svgBoard.removeEventListener(eventName, eventFunction);
}
export function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}
export function mousePositionRatioAdjustment(length, ratio) {
    return length * 1 / ratio;
}
export function locationLog(logText) {
    let testInfo = document.querySelector(".testInfo");
    testInfo.innerHTML = logText;
}
export function changeItemPosition(p, originalPointArray, deltaX, deltaY) {
    if (!p || !originalPointArray)
        return;
    let newPointArray = originalPointArray.map(([x, y], i) => [x + deltaX, y + deltaY]);
    p.soul.plot(newPointArray);
}
export function getOffSetXY(e) {
    let [offsetX, offsetY, touchIsPen] = [0, 0, false];
    let currentPage = document.querySelector(".currentPage");
    let rect = currentPage.getBoundingClientRect();
    let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0];
    if (e.type == "touchstart" || e.type == "touchmove") {
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
        touchIsPen = e.targetTouches[0].radiusX < 10 ? true : false;
    }
    if (e.type == "mousedown" || e.type == "mousemove") {
        offsetX = mousePositionRatioAdjustment(e.offsetX, ratio);
        offsetY = mousePositionRatioAdjustment(e.offsetY, ratio);
    }
    return [offsetX, offsetY, touchIsPen];
}
export function getPageXY(e) {
    let [offsetX, offsetY, touchIsPen] = [0, 0, false];
    let currentPage = document.querySelector(".currentPage");
    let rect = currentPage.getBoundingClientRect();
    // let rect = e.target.getBoundingClientRect();
    let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0];
    if (e.type == "touchstart" || e.type == "touchmove") {
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX, ratio);
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY, ratio);
        touchIsPen = e.targetTouches[0].radiusX > 10 ? false : true;
    }
    if (e.type == "mousedown" || e.type == "mousemove") {
        offsetX = e.pageX;
        offsetY = e.pageY;
    }
    return [offsetX, offsetY, touchIsPen];
}
export function getScale(pageContentContainer) {
    let matrix = window.getComputedStyle(pageContentContainer).transform;
    let matrixArray = matrix.replace("matrix(", "").split(",");
    let scaleX = parseFloat(matrixArray[0]); // convert from string to number
    return scaleX;
}
export function getTouchOffset(e, touchPointIndex) {
    let rect = e.target.getBoundingClientRect();
    let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0];
    let x = mousePositionRatioAdjustment(e.targetTouches[touchPointIndex].pageX - rect.left, ratio);
    let y = mousePositionRatioAdjustment(e.targetTouches[touchPointIndex].pageY - rect.top, ratio);
    return [x, y];
}
