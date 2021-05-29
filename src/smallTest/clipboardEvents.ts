import {GNImageContainer}  from "./GreatNoteClass/GNImageContainer"
import { MainControllerInterface }  from "./mainControllerFolder/mainControllerInterface"

export function addPasteImageEvent(mainController: MainControllerInterface){
    document.onpaste = function (event:any) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;

        let currentPage = mainController.pageController.currentPage.fullPageHTMLObject
        let targetDiv = currentPage.querySelector(".divLayer")


        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    let xhr = new XMLHttpRequest()
                    xhr.open('POST', '/talkNotes/processImageBase64Format', true);
                    xhr.onload = function () {
                      console.log("finish processing image")
                       let responseImgSrc = JSON.parse(this.responseText).imgsrc.replace("talkNotes/", "/")

                       // console.log(24242424, responseImgSrc)
                       let newImg = GNImageContainer({"name": "", arrayID: targetDiv.getAccessPointer(), saveToDatabase:true, imgsrc: "../image/" + responseImgSrc +".png"})

                       targetDiv.appendChild(newImg)
                       newImg.setImageSize({width:500})
                       newImg.setMovable()
                       newImg.style["top"] = document.querySelector(".pageContentContainer")?.scrollTop + "px"
                       newImg.saveHTMLObjectToDatabase()
                       targetDiv.appendChild(newImg)
                    };
                    xhr.send(event.target.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    };

}

export function mouseResizeFunction(item:any){
    let eventName = "mousedown"
    let moveEventName = "mousemove"
    let attributeX = "left"
    let attributeY = "top"
    return function(e:any){
        let startX = e["screenX"]
        let startY = e["screenY"]
        let objectInitialX =  0
        let objectInitialY =  0
        let initialLeftValue = parseInt(item.style[attributeX].replace("px", "")) || 0
        let initialTopValue = parseInt(item.style[attributeY].replace("px", "")) || 0
        let currentX
        let currentY
        let deltaX = 0
        let deltaY = 0

        let mousemoveFunction = (e:any)=>{
            currentY = e.screenY
            currentX = e.screenX
            deltaX = currentX - startX
            deltaY = currentY - startY
            let newX =
            item.style[attributeX] = `${initialLeftValue + deltaX}px`
            item.style[attributeY] = `${initialTopValue + deltaY}px`
        }

        item.addEventListener("mousemove", mousemoveFunction, false)

        function endDragEvent(e:any){
          Array.from(item.parentNode["children"]).forEach((p:any)=>{
             p["style"]["pointerEvents"] = "inherit"
          })
          let endX = e["screenX"]
          let endY = e["screenY"]
          item.removeEventListener("mousemove", mousemoveFunction)
        }

        item.addEventListener("mouseup", (e:any)=>{
            endDragEvent(e)
        }, false)
        item.addEventListener("mouseout", (e:any)=>{
            endDragEvent(e)
        }, false)
    }
}


export function createMouseTrackingController(mouseInfoDiv: HTMLDivElement, testFieldDiv: HTMLDivElement){
    // testFieldDiv to reflect the data
    let clientXYDiv = document.createElement("div")
    clientXYDiv.style.display = "grid"
    clientXYDiv.style.gridTemplateColumns = "1fr 2fr"
    let clientXYDivLabel = document.createElement("span")
    let clientXYDivData = document.createElement("span")
    clientXYDivLabel.innerText = "clientXY"
    clientXYDiv.appendChild(clientXYDivLabel)
    clientXYDiv.appendChild(clientXYDivData)

    let screenXYDiv = document.createElement("div")
    screenXYDiv.style.display = "grid"
    screenXYDiv.style.gridTemplateColumns = "1fr 2fr"
    let screenXYDivLabel = document.createElement("span")
    let screenXYDivData = document.createElement("span")
    screenXYDivLabel.innerText = "screenXY"
    screenXYDiv.appendChild(screenXYDivLabel)
    screenXYDiv.appendChild(screenXYDivData)

    let offsetXYDiv = document.createElement("div")
    offsetXYDiv.style.display = "grid"
    offsetXYDiv.style.gridTemplateColumns = "1fr 2fr"
    let offsetXYDivLabel = document.createElement("span")
    let offsetXYDivData = document.createElement("span")
    offsetXYDivLabel.innerText = "offsetXY"
    offsetXYDiv.appendChild(offsetXYDivLabel)
    offsetXYDiv.appendChild(offsetXYDivData)

    let pageXYDiv = document.createElement("div")
    pageXYDiv.style.display = "grid"
    pageXYDiv.style.gridTemplateColumns = "1fr 2fr"
    let pageXYDivLabel = document.createElement("span")
    let pageXYDivData = document.createElement("span")
    pageXYDivLabel.innerText = "pageXY"
    pageXYDiv.appendChild(pageXYDivLabel)
    pageXYDiv.appendChild(pageXYDivData)

    let deltaXYDiv = document.createElement("div")
    deltaXYDiv.style.display = "grid"
    deltaXYDiv.style.gridTemplateColumns = "1fr 2fr"
    let deltaXYDivLabel = document.createElement("span")
    let deltaXYDivData = document.createElement("span")
    deltaXYDivLabel.innerText = "deltaXY"
    deltaXYDiv.appendChild(deltaXYDivLabel)
    deltaXYDiv.appendChild(deltaXYDivData)

    let targetObjectXYDiv = document.createElement("div")
    targetObjectXYDiv.style.display = "grid"
    targetObjectXYDiv.style.gridTemplateColumns = "1fr 2fr"
    let targetObjectXYDivLabel = document.createElement("span")
    let targetObjectXYDivData = document.createElement("span")
    targetObjectXYDivLabel.innerText = "targetObjXY"
    targetObjectXYDiv.appendChild(targetObjectXYDivLabel)
    targetObjectXYDiv.appendChild(targetObjectXYDivData)

    mouseInfoDiv.append(clientXYDiv, screenXYDiv, offsetXYDiv, pageXYDiv, deltaXYDiv, targetObjectXYDiv)

    return [clientXYDivData, screenXYDivData, offsetXYDivData, pageXYDivData, deltaXYDivData, targetObjectXYDivData]
}
//
// export function setTargetObject(parentDiv: any, targetObjectArray:any){
//     parentDiv.targetObjectArray = targetObjectArray
// }

export function getObjectOrigianlDataArray(p:any){
  // to get data about the object's position and parent's dimension so that you can change the position and size of the object
  return {
    originalLeft: p.offsetLeft,
    originalTop: p.offsetTop,
    parentOriginalWidth: p.parentNode.offsetWidth,
    parentOriginalHeight: p.parentNode.offsetHeight
  }
}

export function triggerTargetObjectMovingFunction(p: any, i:number, deltaX: number, deltaY: number, targetObjectOriginalDataArray: any){
  // p = targetObject
  // i = index
  let newTargetObjectLeft = targetObjectOriginalDataArray[i]["originalLeft"] + deltaX + "px"
  let newTargetObjectTop = targetObjectOriginalDataArray[i]["originalTop"] + deltaY + "px"
  p.style.left = newTargetObjectLeft
  p.style.top = newTargetObjectTop

  if (p.specialMovingEvent){
      p.specialMovingEvent(deltaX, deltaY, targetObjectOriginalDataArray[i]["parentOriginalWidth"], targetObjectOriginalDataArray[i]["parentOriginalHeight"])
  }
} // triggerTargetObjectMovingFunction
