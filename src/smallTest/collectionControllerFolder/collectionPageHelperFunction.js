import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass";
export function attachExtraFunctionToCollectionPage(collectionPage, divLayer, svgLayer) {
    collectionPage.renderGroupDataToCollectionPage = function (groupData) {
        let selectionRectInfo = groupData.rectInfo;
        let copiedPolyline = groupData["elementAccessPointeArray"].map((p) => {
            let polyline = document.querySelector(`polyline[accessPointer='${p}']`);
            let copiedPolyline = GreatNoteSvgDataClass.GNSvgPolyLine({
                name: polyline,
                injectedData: polyline.extract()
            });
            copiedPolyline.setAttribute("accessPointer", "copied_" + p);
            copiedPolyline.style.transform = `translate(${0 + "px"}, ${-selectionRectInfo.y + 50 + collectionPage.pageStatus.height + "px"})`;
            return copiedPolyline;
        });
        // to increase the offset of the height
        collectionPage.pageStatus.height += selectionRectInfo.height;
        collectionPage.divLayer.style.height = collectionPage.pageStatus.height + 100 + "px";
        collectionPage.svgLayer.style.height = collectionPage.pageStatus.height + 100 + "px";
        copiedPolyline.forEach((p) => collectionPage.svgLayer.append(p));
    }; // renderGroupDataToCollectionPage
    // inject saved data to the page
    collectionPage.injecetDataToCollectionPage = function (injectedData) {
        collectionPage.pageStatus.height = 0;
        collectionPage.divLayer.innerHTML = "";
        Array.from(collectionPage.svgLayer.children).forEach((p) => p.remove());
        // console.log(545454, injectedData)
        injectedData.forEach((p) => {
            let page = document.querySelector(`div[accessPointer='${p.pageAccessPointer}'`);
            let groupData = page.groupData.filter((q) => q.uniqueID == p.uniqueID.toString())[0];
            // console.log(page.groupData, groupData)
            collectionPage.renderGroupDataToCollectionPage(groupData);
        });
    }; // collectionPage
} // attachExtraFunctionToCollectionPage
export function attachEventsToCollectionPage(collectionPage, divLayer, svgLayer) {
    // dragging events to the collectionPage
    collectionPage.addEventListener("dragenter", e => {
        e.preventDefault();
        // console.log("dragenter", e)
    });
    collectionPage.addEventListener("dragleave", function (e) {
        e.preventDefault();
        // console.log("dragleave", e)
    }, false);
    collectionPage.addEventListener("dragover", function (e) {
        e.preventDefault();
    }, false);
    collectionPage.addEventListener("drop", e => {
        e.preventDefault();
        // to get the current row that is dragging
        let groupControllerWrapper = document.querySelector(".groupControllerWrapper");
        let draggingRow = groupControllerWrapper.draggingRow;
        console.log(draggingRow);
        let groupData = draggingRow.groupData;
        console.log("drop element = ", draggingRow, groupData);
        let dataToCollectionPage = {
            uniqueID: groupData.uniqueID,
            pageAccessPointer: groupData.pageAccessPointer
        };
        let activeCollectionRow = collectionPage.currentActiveCollectionRow;
        activeCollectionRow.collectionData.push(dataToCollectionPage);
        collectionPage.renderGroupDataToCollectionPage(groupData);
    });
}
