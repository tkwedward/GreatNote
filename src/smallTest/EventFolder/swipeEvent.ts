import {calculateDistance, getScale, getTouchOffset} from "../ToolboxFolder/toolBoxHelperFunction"
import * as PageViewHelperFunction from "../pageViewHelperFunction"
import { MainControllerInterface } from "../mainControllerFolder/mainControllerInterface"
import { socket } from "../socketFunction"

export function swipeDetection(mainController: MainControllerInterface, pageContentContainer: any){

    pageContentContainer.addEventListener("touchstart", function(e: any){
        let [initialPointX, initialPointY, finalPointX, finalPointY] = [0, 0, 0, 0];
        let [initialPointX2, initialPointY2, finalPointX2, finalPointY2] = [0, 0, 0, 0];
        let touchIsFinger, touchIsFinger2
        let doubleFinger = false

        let deltaX:number, deltaX2:number

        if (e.type=="touchstart"){
            [initialPointX, initialPointY] =  getTouchOffset(e, 0)

            touchIsFinger = e.targetTouches[0].radiusX > 10? true: false

            if (e.targetTouches[1]){
                [initialPointX2, initialPointY2] =  getTouchOffset(e, 1)

                touchIsFinger2 = e.targetTouches[1].radiusX > 10? true: false
            }

            if (touchIsFinger && touchIsFinger2){
                doubleFinger = true
            }
        }

       let testInfo = <HTMLDivElement> document.querySelector(".testInfo")
       let initialPoint = {x1: initialPointX, y1: initialPointY, x2: initialPointX2, y2: initialPointY2}

       testInfo.style.width = "100%";
       if (!doubleFinger) return
       e.preventDefault()

       let fullPageArray = <any> document.querySelectorAll(".fullPage")
       let distance1:number, distance2:number, scale:number, deltaScale:number;
       let [previousFinalPointX, previousFinalPointY, previousFinalPointX2, previousFinalPointY2] = [initialPointX, initialPointY, initialPointX2, initialPointY2]
       let newFinalPointsDistance:number, previousFinalPointsDistance:number;
       let scaleDirection = 1


       let mouseMoveFunction = (e:any)=>{
           [finalPointX, finalPointY] = getTouchOffset(e, 0);
           [finalPointX2, finalPointY2] = getTouchOffset(e, 1);


           newFinalPointsDistance = calculateDistance(finalPointX, finalPointY, finalPointX2, finalPointY2)
           previousFinalPointsDistance = calculateDistance(previousFinalPointX, previousFinalPointY, previousFinalPointX2, previousFinalPointY2);

           [previousFinalPointX, previousFinalPointY] = getTouchOffset(e, 0);
           [previousFinalPointX2, previousFinalPointY2] = getTouchOffset(e, 1);

           distance1 = calculateDistance(initialPointX2, initialPointY2, finalPointX2, finalPointY2)
           distance2 = calculateDistance(initialPointX, initialPointY, finalPointX, finalPointY)
           scale = getScale(fullPageArray[0])
           deltaScale = (distance1 + distance2)/4000

           scaleDirection = newFinalPointsDistance - previousFinalPointsDistance > 0 ? +1 : -1

          testInfo.innerHTML = `distance_1 = ${distance1} <br>` + `distance_2 = ${distance2} <br>` + `totalDistance = ${distance1 + distance2}, scale = ${scale}, scale = ${scale + scaleDirection * deltaScale}, direction = ${scaleDirection}, finalX = ${finalPointX}, finalY = ${finalPointY}, finalX2 = ${finalPointX2}, finalY2 = ${finalPointY2}, width ${e.target.getBoundingClientRect().width}`





          let pageWidth = e.target.getBoundingClientRect().width


          pageContentContainer["style"].transform = `scale(${scale + scaleDirection * deltaScale})`

          let testMessage = `${JSON.stringify(scale)}`
          socket.emit("clientWantsToBroadcastMessage", testMessage)

          if (newFinalPointsDistance > 100){
            Array.from(fullPageArray).forEach((p:any)=>{
                if (pageWidth < 4000 && pageWidth > 600) {
                    p.style.transform = `scale(${scale + scaleDirection * deltaScale})`
                }

                if (pageWidth > 4000) p.style.transform = `scale(${(scale + scaleDirection * deltaScale) * 0.95})`
                if (pageWidth < 600) p.style.transform = `scale(${(scale + scaleDirection * deltaScale) * 1.25})`

            })
          } // newFinalPointsDistance > 100

          deltaX = finalPointX - initialPointX
          deltaX2 = finalPointX2 - initialPointX2
       }

       pageContentContainer.addEventListener("touchmove", mouseMoveFunction)

       // define the mouse move function
       let mouseUpFunction = (e:any)=>{
         // remove the mouse move even
         
          fingerTurnPage(mainController, pageContentContainer, mouseMoveFunction, mouseUpFunction, deltaX, deltaX2, doubleFinger)
       } // mouseUpFunction

       pageContentContainer.addEventListener("touchend", mouseUpFunction)
    })
}//swipeDetection//

function fingerPanPage(mainController: MainControllerInterface, pageContentContainer:any ,  mouseMoveFunction: (e:any)=>void, mouseUpFunction:(e:any)=>void, initialPoint:number, finalPoint:number, doubleFinger:boolean){

}


function fingerTurnPage(mainController: MainControllerInterface, pageContentContainer:any ,  mouseMoveFunction: (e:any)=>void, mouseUpFunction:(e:any)=>void, deltaX:number, deltaX2:number, doubleFinger:boolean){
  pageContentContainer.removeEventListener("touchmove", mouseMoveFunction)
  pageContentContainer.removeEventListener("touchend", mouseUpFunction)
  let addNewPageButton = <HTMLButtonElement> document.querySelector(".addNewPage")
  let currentPage = mainController.pageController.currentPage

  let pageMoveDirection = deltaX > 0 ? -1 : +1
  let targetPageNumber = currentPage.pageNumber + pageMoveDirection

  let turnPageBreakPoint = 300
  if (!doubleFinger) return
  if (Math.abs(deltaX) > turnPageBreakPoint || Math.abs(deltaX2) > turnPageBreakPoint ){  // if larager than the page Break Point
    if (pageMoveDirection > 0 ){
       if (currentPage.next.name=="endPage"){
         addNewPageButton.click()
         PageViewHelperFunction.shortNotice("newPage is added")
       } else { // not the end page
         mainController.pageController.goToPage(targetPageNumber)
         pageContentContainer.scrollTo(0, 0)
         // e.preventDefault()
       }
    } // if (pageMoveDirection > 0 ){

    if (pageMoveDirection < 0){
       if (currentPage.previous.name=="startPage"){
         console.log("create a new page")
       } else { // not the end page
         console.log("go to the previous page")
         mainController.pageController.goToPage(targetPageNumber)
         pageContentContainer.scrollTo(0, 0)
         // e.preventDefault()
       }
    } // if (pageMoveDirection < 0)
  } // if (Math.abs(deltaX) > turnPageBreakPoint){
}
