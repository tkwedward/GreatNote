export interface GroupDataInterface {
    groupName: string,
    elementAccessPointeArray: string[],
    uniqueID: string,
    pageAccessPointer:  string
    rectInfo: {
      x: number, y: number, width: number, height: number
    }
}

export function createGroupControllerWrapper(groupViewer: any){
    let groupControllerWrapper = <any> document.createElement("div");
    groupControllerWrapper.classList.add("groupControllerWrapper")

    groupControllerWrapper.renderGroup = function(groupData:GroupDataInterface[]){
        groupData.forEach(p=>{
            let [groupRow, groupName, groupSwitch] = createGroupRow(p)
            groupViewer.append(groupRow)
        })
    }
    return groupControllerWrapper

} // createGroupControllerWrapper


export function createGroupRow(injectedData?: GroupDataInterface){
  let groupRow = <any> document.createElement("div")
  groupRow.classList.add("groupRow")
  groupRow.draggable = true

  let groupName = document.createElement("div")
  groupName.contentEditable = "true"

  groupName.innerText = "Group"
  groupName.classList.add("groupName")

  if (injectedData){
    groupRow.groupData = injectedData
    groupRow.setAttribute("groupID", injectedData.uniqueID)
    groupRow.setAttribute("pageAccessPointer", injectedData.pageAccessPointer)
    groupName.innerText = injectedData.groupName

  }

  let groupShow = document.createElement("div")
  let groupSwitch = document.createElement("span")

  groupShow.innerText = "show"
  groupShow.addEventListener("click", e=>{
      console.log(groupRow.groupData)
  })

  let groupControllerWrapper = <any> document.querySelector(".groupControllerWrapper")

  groupRow.addEventListener("dragstart", function(e:any){
      groupControllerWrapper.draggingRow = e.target
      console.log(21212121, groupControllerWrapper.draggingRow, e.target)
  })

  groupRow.append(groupName, groupShow, groupSwitch)

  return [groupRow, groupName, groupSwitch]

}// createGroupRow

export function createAddGroupButton(groupViewer:any){
  // create a button to act the sleected item to the group view
  // the data contains: groupName, elementAccessPointeArray, uniqueID, pageAccessPointer and rectInfo
  let addGroupButton = document.createElement("div")
  addGroupButton.classList.add("addGroupButton")
  addGroupButton.innerText = "addGroup"
  addGroupButton.addEventListener("click", e=>{
      let selectedObject: string[], selectionRect: any;

      [selectedObject, selectionRect]=  markObjectInsideSelectionArea()

      if (!selectionRect) return

      let [groupRow, groupName, groupSwitch] = createGroupRow()
      groupViewer.append(groupRow)

      let currentPage = <any> document.querySelector(".currentPage")

      let groupItem = {
          groupName: groupName.innerText,
          elementAccessPointeArray: selectedObject,
          uniqueID: `${Date.now()}`,
          pageAccessPointer:  currentPage.getAttribute("accessPointer"),
          rectInfo: {
            x: selectionRect.x.baseVal.value,
            y: selectionRect.y.baseVal.value,
            width: selectionRect.width.baseVal.value,
            height: selectionRect.height.baseVal.value
          }
      }

      groupRow.groupData = groupItem
      console.log(95959595, groupItem)

      selectionRect.remove()

      currentPage.addGroupToPage(groupItem)
      currentPage.saveHTMLObjectToDatabase()
  })
  return addGroupButton
} // createAddGroupButton

export function convertAccessPointerToHTMLObject(accessPointerArray:string[]){
  return accessPointerArray.map(p=> document.querySelector(`*[accessPointer='${p}']`))
}//convertAccessPointerToHTMLObject

export function markObjectInsideSelectionArea():any{
  let selectionRect = <any> document.querySelector(".selectionRect")

  if (!selectionRect) return
  let svgBoard = <any> selectionRect.parentElement

  let selectionObjectSet = new Set()
  let newPoint = svgBoard.createSVGPoint();

  svgBoard.childNodes.forEach((object:any)=>{
      // the object cannot  be the polyline
      if (object!=selectionRect && object.soul){
        let lineArray = object.soul.array().value
        Array.from(lineArray).forEach((p:any)=>{
            [newPoint.x, newPoint.y] = [p[0], p[1]]
            if (selectionRect.isPointInFill(newPoint)) selectionObjectSet.add(object.getAccessPointer())
            return
        }) // Array.from(lineArray)
        return
      } // if object!=polyline)
  })// svgBoard.childNodes.forEach
  return [<string[]> Array.from(selectionObjectSet), selectionRect]
}
