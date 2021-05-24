export function getParentPage(htmlObject) {
    if (htmlObject.classList.contains("fullPage")) {
        return htmlObject;
    }
    else {
        if (htmlObject.parentElement) {
            return getParentPage(htmlObject.parentElement);
        }
        else {
            return null;
        }
    }
}
export function renderDataToHTML(mainController, data, arrayHTMLObject) {
    let newHTMLObject;
    // cannot save any obeject to the data base here
    data["array"].forEach(p => {
        if (p.GNType == "GNComment") {
            newHTMLObject = mainController.createGNObjectThroughName("GNComment", { name: "", injectedData: p });
            arrayHTMLObject.appendChild(newHTMLObject);
            return;
        }
        if (p.GNType == "GNSvg") {
            // cannot save any obeject to the data base here because mainController will create an infinity loop and will append new obejct forever
            newHTMLObject = mainController.GNDataStructureMapping["GNSvg"]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, injectedData: p });
            newHTMLObject._identity = p._identity;
            let objectData = p;
            newHTMLObject.applyStyle(objectData.stylesheet);
            newHTMLObject.addEventListener("click", function () {
                mainController.toolBox.targetPage = newHTMLObject;
            });
        }
        if (p.GNType == "GNContainerDiv") {
            newHTMLObject = mainController.GNDataStructureMapping["GNContainerDiv"]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, injectedData: p, contentEditable: false });
            newHTMLObject._identity = p._identity;
            let objectData = p;
        }
        if (p.GNType == "GNSvgPolyLine") {
            newHTMLObject = mainController.GNDataStructureMapping["GNSvgPolyLine"]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false });
            newHTMLObject._identity = p._identity;
            //
            let newPolylineData = p;
            newHTMLObject.loadFromData(newPolylineData);
            let stylesheet = newPolylineData["stylesheet"];
            newHTMLObject.applyStyle({ "stroke": stylesheet["stroke"], "stroke-width": stylesheet["stroke-width"], "fill": stylesheet["fill"] });
        }
        if (p.GNType == "GNImageContainer") {
            newHTMLObject = mainController.GNDataStructureMapping["GNImageContainer"]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, imgsrc: p["data"]["src"] });
            newHTMLObject._identity = p._identity;
            newHTMLObject.loadFromData(p);
            newHTMLObject.setImageSize({ width: 500 });
            newHTMLObject.setMovable();
        }
        if (p.GNType == "GNBookmark") {
            newHTMLObject = mainController.GNDataStructureMapping["GNBookmark"]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, injectedData: p });
            newHTMLObject._identity = p._identity;
            newHTMLObject.loadFromData(p);
            newHTMLObject.setMovable();
        }
        if (p.GNType == "GNTextContainer" || p.GNType == "GNTextDiv") {
            newHTMLObject = mainController.GNDataStructureMapping["GNTextContainer"]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, injectedData: p });
            newHTMLObject._identity = p._identity;
            let annotationObject = {
                accessPointer: newHTMLObject.getAccessPointer(),
                annotationType: newHTMLObject.getAnnotationType()
            };
            let currentPageObject = mainController.pageController.currentPage;
            // console.log(9696969696, currentPageObject)
            currentPageObject.pageRelatedData.annotationArray.push(annotationObject);
            newHTMLObject.loadFromData(p);
            newHTMLObject.setMovable();
        }
        if (newHTMLObject) {
            newHTMLObject.objectData = p;
            arrayHTMLObject.appendChild(newHTMLObject);
            newHTMLObject.setAttribute("accessPointer", p._identity.accessPointer);
            mainController.renderDataToHTML(p, newHTMLObject);
        }
    });
} // 3. renderDataToHTML
