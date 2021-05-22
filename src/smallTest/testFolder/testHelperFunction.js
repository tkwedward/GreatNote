export function testFunction(mainController) {
    // let lastPage = mainController.pageController.getPage(-999)
    // let lastPageHTMLObject = lastPage.fullPageHTMLObject
    //
    // let svg = lastPageHTMLObject.querySelector("svg")
    // console.log(55555, svg)
    // let targetDiv = <GreatNoteDataClass.GNContainerDivInterface> document.querySelector(`div[accessPointer='7fd039f2-64b6-4aa3-aa08-6ec8e3f17763']`)
    //  let testFieldDiv = document.querySelector(".testField")
    //
    //  let imageFrame = document.createElement("div")
    //  imageFrame.classList.add("imageFrame")
    //  testFieldDiv.appendChild(imageFrame)
    //  // window.addSelectedObjectToWindow(imageFrame)
    //  imageFrame.addEventListener("click", (e)=> {
    //    console.log("imageFrame is clicked")
    //    mainController.selectedObjectArray = []
    //    imageFrame.classList.add("selectedObject")
    //    mainController.selectedObjectArray.push(imageFrame)
    //  }, true)
    //  // imageFrame.addEventListener("mousedown", ClipboardEvent.mouseResizeFunction(imageFrame))
    //
    //
    //  // resize
    //  let imageFrameCorner = document.createElement("span")
    //  imageFrameCorner.classList.add("imageFrameCorner", "topLeft")
    //
    //  let imageFrameCorner2 = document.createElement("span")
    //  imageFrameCorner2.classList.add("imageFrameCorner", "bottomRight")
    //
    //  // rotate
    //  let imageFrameCorner1 = document.createElement("span")
    //  imageFrameCorner1.classList.add("imageFrameCorner", "topRight")
    //
    //  let imageFrameCorner3 = document.createElement("span")
    //  imageFrameCorner3.classList.add("imageFrameCorner", "bottomLeft")
    //
    //  imageFrame.append(imageFrameCorner, imageFrameCorner1, imageFrameCorner2, imageFrameCorner3)
    //
    //  // targetDiv.appendChild(newImg)
    //
    //  let mouseInfoDiv = document.createElement("div")
    //  testFieldDiv.appendChild(mouseInfoDiv)
    //  mouseInfoDiv.style.width = "300px"
    //  mouseInfoDiv.style.height = "500px"
    //  mouseInfoDiv.style.position = "fixed"
    //  mouseInfoDiv.style.right = "5%"
    //  mouseInfoDiv.style.top = "10%"
    //  mouseInfoDiv.style.background = "lightblue"
    // ClipboardEvent.mousePositionTrackFunction(mouseInfoDiv, testFieldDiv)
    // mouseInfoDiv.classList.add("selectedObject")
    // testFieldDiv.targetObjectArray = [imageFrame, testObject, mouseInfoDiv]
    let testFieldDiv = document.querySelector(".testField");
    // testFieldDiv.style.disply = "block"
    // <template id="layerRowTemplate">
    //   <div class="layerRow">
    //         <span class="viewSwitch"></span>
    //         <span class="viewName"></span>
    //         <span class="expand"></span>
    //   </div>
    // </template>
    let layerRowTemplate = document.querySelector("#layerRowTemplate");
    var layerRow = layerRowTemplate === null || layerRowTemplate === void 0 ? void 0 : layerRowTemplate.content.cloneNode(true);
    testFieldDiv === null || testFieldDiv === void 0 ? void 0 : testFieldDiv.appendChild(layerRow);
    let scalableDiv = document.createElement("div");
    scalableDiv.classList.add("scalableDiv");
    testFieldDiv === null || testFieldDiv === void 0 ? void 0 : testFieldDiv.appendChild(scalableDiv);
    function updateElementPosition(object, deltaX, deltaY) {
    }
}
