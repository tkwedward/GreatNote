export function addMovingEvent(htmlObject) {
    let attributeX, attributeY;
    // choice a suitable attribute name according to the htmlObject selected
    switch (htmlObject.tagName) {
        case "circle":
            attributeX = "cx";
            attributeY = "cy";
            break;
        case "rect":
            attributeX = "x";
            attributeY = "y";
            break;
        default:
            attributeX = "left";
            attributeY = "top";
            htmlObject.style.position = "relative";
    }
    htmlObject.addEventListener("mousedown", (e) => {
        // to stop any event not related to this element
        if (e.target !== e.currentTarget)
            return;
        // to allow mouse to move into other elements
        let htmlObjectParentNode = htmlObject.parentNode;
        Array.from(htmlObjectParentNode["children"]).forEach((p) => {
            if (p != htmlObject)
                p["style"]["pointerEvents"] = "none";
        });
        let startX = e["screenX"];
        let startY = e["screenY"];
        let objectInitialX = 0;
        let objectInitialY = 0;
        let initialLeftValue = parseInt(htmlObject.style[attributeX].replace("px", "")) || 0;
        let initialTopValue = parseInt(htmlObject.style[attributeY].replace("px", "")) || 0;
        let currentX;
        let currentY;
        let deltaX = 0;
        let deltaY = 0;
        let mousemoveFunction = (e) => {
            currentY = e.screenY;
            currentX = e.screenX;
            deltaX = currentX - startX;
            deltaY = currentY - startY;
            let newX = htmlObject.style[attributeX] = `${initialLeftValue + deltaX}px`;
            htmlObject.style[attributeY] = `${initialTopValue + deltaY}px`;
        };
        htmlObject.addEventListener("mousemove", mousemoveFunction, false);
        function endDragEvent(e) {
            let htmlObjectParentNode = htmlObject.parentNode;
            Array.from(htmlObjectParentNode["children"]).forEach((p) => {
                console.log(p);
                p["style"]["pointerEvents"] = "inherit";
            });
            let endX = e["screenX"];
            let endY = e["screenY"];
            htmlObject.removeEventListener("mousemove", mousemoveFunction);
            console.log(`end at = (${endX}, ${endY})`);
        }
        htmlObject.addEventListener("mouseup", (e) => {
            endDragEvent(e);
        }, false);
        htmlObject.addEventListener("mouseout", (e) => {
            endDragEvent(e);
        }, false); // mouseUp event to remove the drag event
    }, false); // mousedown event
} // } // addMovingEvent
