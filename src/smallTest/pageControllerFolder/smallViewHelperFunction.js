let overviewModeDiv = document.querySelector(".overviewModeDiv");
export function addFunctionToSmallViewHTMLObject(smallViewHTMLObject) {
    console.log(smallViewHTMLObject);
    smallViewHTMLObject.draggable = true;
    smallViewHTMLObject.addEventListener("click", e => {
        let selectedSmallViewHTMLObject = overviewModeDiv.querySelector(".selectedSmallViewHTMLObject");
        if (selectedSmallViewHTMLObject)
            selectedSmallViewHTMLObject.classList.toggle("selectedSmallViewHTMLObject");
        smallViewHTMLObject.classList.toggle("selectedSmallViewHTMLObject");
    });
    smallViewHTMLObject.addEventListener("dragstart", e => {
        smallViewHTMLObject.classList.add("draggedItem");
    });
    smallViewHTMLObject.addEventListener("dragleave", function (e) {
        e.preventDefault();
        // console.log("dragleave", e)
    }, false);
    smallViewHTMLObject.addEventListener("dragover", function (e) {
        e.preventDefault();
    }, false);
    smallViewHTMLObject.addEventListener("drop", e => {
        let draggedItem = document.querySelector(".smallView.draggedItem");
        let rect = smallViewHTMLObject.getBoundingClientRect();
        let middleLine = rect.x + rect.width / 2;
        console.log(draggedItem, smallViewHTMLObject);
        if (e.pageX > middleLine) {
            overviewModeDiv.insertBefore(draggedItem, smallViewHTMLObject);
            overviewModeDiv.insertBefore(smallViewHTMLObject, draggedItem);
            console.log("insert to the right");
        }
        if (e.pageX < middleLine) {
            console.log("insert to the left");
            overviewModeDiv.insertBefore(draggedItem, smallViewHTMLObject);
        }
        draggedItem.classList.toggle("draggedItem");
    });
    // let block = false
    // smallViewHTMLObject.addEventListener("drag", e=>{
    //   if (block) return
    //   block = true
    //   setTimeout(()=>{block = false}, 1000)
    //   console.log("dragEvent", e)
    // })
}
