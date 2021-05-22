export function renderDataToHTML(mainController, data, arrayHTMLObject) {
    let newHTMLObject;
    // cannot save any obeject to the data base here
    data["array"].forEach(p => {
        if (p.GNType == "GNComment") {
            // console.log(404, p.GNType)
            newHTMLObject = mainController.createGNObjectThroughName("GNComment", { name: "", injectedData: p });
            arrayHTMLObject.appendChild(newHTMLObject);
            return;
        }
        if (p.GNType == "GNSvg") {
            // cannot save any obeject to the data base here because mainController will create an infinity loop and will append new obejct forever
            newHTMLObject = mainController.GNDataStructureMapping[p.GNType]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false });
            newHTMLObject._identity = p._identity;
            let objectData = p;
            newHTMLObject.applyStyle(objectData.stylesheet);
            newHTMLObject.addEventListener("click", function () {
                mainController.toolBox.targetPage = newHTMLObject;
            });
        }
        if (p.GNType == "GNContainerDiv") {
            newHTMLObject = mainController.GNDataStructureMapping[p.GNType]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false, injectedData: p, contentEditable: false });
            newHTMLObject._identity = p._identity;
            let objectData = p;
        }
        if (p.GNType == "GNSvgPolyLine") {
            newHTMLObject = mainController.GNDataStructureMapping[p.GNType]({ name: "name", arrayID: arrayHTMLObject.getAccessPointer(), saveToDatabase: false });
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
        if (newHTMLObject) {
            newHTMLObject.objectDataa = p;
            arrayHTMLObject.appendChild(newHTMLObject);
            newHTMLObject.setAttribute("accessPointer", p._identity.accessPointer);
            mainController.renderDataToHTML(p, newHTMLObject);
        }
    });
} // 3. renderDataToHTML
