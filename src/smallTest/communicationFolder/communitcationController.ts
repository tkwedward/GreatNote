export interface CommunicatorControllerInterface extends HTMLDivElement {
    selfSocketId:string
    createRow(userId:string):void
    deleteRow(userId:string):void
    update(message:any):void
    classList: any
}

export function createCommunicationPanel(socketData:any){
  // socketData = {"yourSocketId", "socketArray"}
    let socketIdSet = new Set()
    let communicationPanel = <CommunicatorControllerInterface> document.createElement("div")
    communicationPanel.classList.add("communicationPanel")
    communicationPanel.selfSocketId =  socketData.yourSocketId

    communicationPanel.createRow = function(userId){
        if (!socketIdSet.has(userId)){
          let row = document.createElement("div")
          row.setAttribute("userId", userId)
          row.innerText = userId
          row.style.background = "pink"
          communicationPanel.appendChild(row)
          socketIdSet.add(userId)
        }
    }

    communicationPanel.deleteRow = function(userId){
        socketIdSet.delete(userId)
        let targetRow = <HTMLDivElement> communicationPanel.querySelector(`div[userId='${userId}']`)
        targetRow.remove()
    }

    communicationPanel.update = function(message){
        // message = action, targetSocketId
        if (message.action=="connect"){
            communicationPanel.createRow(message.targetSocketIds)
        }

        if (message.action == "disconnect"){
          communicationPanel.deleteRow(message.targetSocketIds)
        }
    }

    // intialize data
    if (socketData.socketArray){
      socketData.socketArray.forEach((p:any)=>{
          communicationPanel.createRow(p)
      })

      let panelContainer = <HTMLDivElement> document.querySelector(".panelContainer")
      panelContainer.insertBefore(communicationPanel, panelContainer.firstChild)

    }

}
