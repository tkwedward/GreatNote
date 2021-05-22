import * as Settings from "../settings"

export function clearUpEvent(svgBoard:SVGElement, eventName:string, eventFunction:(e:any)=>void){
   svgBoard.removeEventListener(eventName, eventFunction)
}

export function calculateDistance(x1:number, y1:number, x2:number, y2:number){
  return Math.sqrt((x1-x2)**2 + (y1-y2)**2)
}

export function mousePositionRatioAdjustment(length:number, ratio:number){
  return length * 1/ratio
}

export function locationLog(logText:string){
  let testInfo = <HTMLElement> document.querySelector(".testInfo")
  testInfo.innerHTML = logText
}



export function changeItemPosition(p:any, originalPointArray:[number, number][], deltaX:number, deltaY:number){
    if (!p || !originalPointArray) return

    let newPointArray = originalPointArray.map(([x, y], i)=>[x + deltaX, y + deltaY])
     p.soul.plot(newPointArray)
}

export function getOffSetXY(e:any): [number, number, boolean]{
  let [offsetX, offsetY, touchIsPen] = [0, 0, false]
  let rect = e.target.getBoundingClientRect();
  let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0]

    if (e.type=="touchstart" || e.type=="touchmove"){
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX - rect.left, ratio);
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY - rect.top, ratio);
        touchIsPen = e.targetTouches[0].radiusX < 10? true: false
    }
    if (e.type=="mousedown" || e.type=="mousemove"){
       offsetX = mousePositionRatioAdjustment(e.offsetX, ratio)
       offsetY = mousePositionRatioAdjustment(e.offsetY, ratio)
   }

   return [offsetX, offsetY, touchIsPen]
}

export function getPageXY(e:any): [number, number, boolean]{
  let [offsetX, offsetY, touchIsPen] = [0, 0, false]
  let rect = e.target.getBoundingClientRect();
  let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0]

    if (e.type=="touchstart" || e.type=="touchmove" ){
        offsetX = mousePositionRatioAdjustment(e.targetTouches[0].pageX, ratio)
        offsetY = mousePositionRatioAdjustment(e.targetTouches[0].pageY, ratio)
        touchIsPen = e.targetTouches[0].radiusX > 10? false: true
    }
    if (e.type=="mousedown" || e.type=="mousemove" ){
       offsetX = e.pageX
       offsetY = e.pageY
   }

   return [offsetX, offsetY, touchIsPen]
}

export function getScale(pageContentContainer:HTMLDivElement){
  let matrix = window.getComputedStyle(pageContentContainer).transform
  let matrixArray = matrix.replace("matrix(", "").split(",");
  let scaleX = parseFloat(matrixArray[0]); // convert from string to number
  return scaleX
}

export function getTouchOffset(e:any, touchPointIndex:number): [number, number]{

    let rect = e.target.getBoundingClientRect();
    let ratio = rect.width / Settings.pageSizeInfo.fullPageSize[0]

    let x = mousePositionRatioAdjustment(e.targetTouches[touchPointIndex].pageX - rect.left, ratio);
    let y = mousePositionRatioAdjustment(e.targetTouches[touchPointIndex].pageY - rect.top, ratio);
    return [x, y]
}
