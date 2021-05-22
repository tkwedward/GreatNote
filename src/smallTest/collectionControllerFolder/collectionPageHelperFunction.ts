import * as GreatNoteSvgDataClass from "../GreatNoteClass/GreatNoteSvgDataClass"

interface CollectionPageInterface extends HTMLDivElement{
  pageStatus: {
    height: number
  }
  svgLayer: any
  divLayer: any

  currentActiveCollectionRow: any
  injecetDataToCollectionPage(injectedData:any):void
  renderGroupDataToCollectionPage(groupData:any):void
}

interface CollectionPageInjectedDataInterface {
    pageAccessPointer: string
    uniqueID: string
}

export function attachExtraFunctionToCollectionPage(collectionPage:CollectionPageInterface , divLayer: any, svgLayer: any){

    collectionPage.renderGroupDataToCollectionPage= function (groupData:any){
        let selectionRectInfo = groupData.rectInfo

        let copiedPolyline = groupData["elementAccessPointeArray"].map((p:string)=>{
            let polyline = <any> document.querySelector(`polyline[accessPointer='${p}']`)

            let copiedPolyline = GreatNoteSvgDataClass.GNSvgPolyLine({
              name: polyline,
              injectedData: polyline.extract()
            })
            copiedPolyline.setAttribute("accessPointer", "copied_" + p)

            copiedPolyline.style.transform = `translate(${0 + "px"}, ${-selectionRectInfo.y + 50 + collectionPage.pageStatus.height + "px"})`

            return copiedPolyline
        })

        // to increase the offset of the height
        collectionPage.pageStatus.height += selectionRectInfo.height

        collectionPage.divLayer.style.height = collectionPage.pageStatus.height + 100 + "px"

        collectionPage.svgLayer.style.height = collectionPage.pageStatus.height + 100 + "px"

        copiedPolyline.forEach((p:any)=>collectionPage.svgLayer.append(p))
    } // renderGroupDataToCollectionPage

    // inject saved data to the page
    collectionPage.injecetDataToCollectionPage = function (injectedData:any){
        collectionPage.pageStatus.height = 0
        collectionPage.divLayer.innerHTML = ""
        Array.from(collectionPage.svgLayer.children).forEach((p:any)=>p.remove())
        console.log(545454, injectedData)
        injectedData.forEach((p:CollectionPageInjectedDataInterface)=>{
            let page = <any> document.querySelector(`div[accessPointer='${p.pageAccessPointer}'`)
            let groupData = page.groupData.filter((q:any)=>q.uniqueID==p.uniqueID.toString())[0]
            console.log(page.groupData, groupData)
            collectionPage.renderGroupDataToCollectionPage(groupData)

            console.log(page, groupData)
        })
    } // collectionPage
} // attachExtraFunctionToCollectionPage

export function attachEventsToCollectionPage(collectionPage: CollectionPageInterface, divLayer: HTMLDivElement, svgLayer: any){
    // dragging events to the collectionPage
    collectionPage.addEventListener("dragenter", e=>{
        e.preventDefault();
        console.log("dragenter", e)
    })

    collectionPage.addEventListener("dragleave", function( e ) {
      e.preventDefault();
      console.log("dragleave", e)
    }, false);

    collectionPage.addEventListener("dragover", function( e ) {
      e.preventDefault();
    }, false);

    collectionPage.addEventListener("drop", e=>{
        e.preventDefault();
        // to get the current row that is dragging
        let groupControllerWrapper = <any> document.querySelector(".groupControllerWrapper")
        let draggingRow = groupControllerWrapper.draggingRow

        console.log(draggingRow)

        let groupData = draggingRow.groupData
        console.log("drop element = ", draggingRow, groupData)

        let dataToCollectionPage = {
          uniqueID: groupData.uniqueID,
          pageAccessPointer: groupData.pageAccessPointer
        }

        let activeCollectionRow = collectionPage.currentActiveCollectionRow
        activeCollectionRow.collectionData.push(dataToCollectionPage)

        collectionPage.renderGroupDataToCollectionPage(groupData)
    })
}
