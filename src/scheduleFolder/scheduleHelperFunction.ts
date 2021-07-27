// const crypto = require('crypto');
import crypto from "crypto"
import {createDataMessageInerface, updateDataMessageInerface, getDataMessageInterface, deleteDataMessageInterface} from "./taskDetail/taskItemInterface"
import {addItemToProjectPage} from "./projectPage"

import * as CryptoJS from "crypto-js"

export function sha256(secret:string):string{
    let ciphertext = CryptoJS.SHA256(secret)
                             .toString(CryptoJS.enc.Hex)
    return ciphertext
}

export function createSelectObject(optionArray: string[]): HTMLSelectElement{
    let select = document.createElement("select")
    optionArray.forEach(p=>{
        let option = document.createElement("option")
        option.value = p
        option.innerText = p
        select.appendChild(option)
    })

    return select
}

export function makeXMLHttpRequest(path: string, data?: any){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
}


export function getInitialDataFromDatabase(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         renderRootArrayData(JSON.parse(xhttp.responseText))
      }
  };
  xhttp.open("GET", "/schedule/api/getInitialData", true);
  xhttp.send();
}


import * as ProjectPage from "./projectPage"
export function renderRootArrayData(jsonData: any){
    // console.log(jsonData.array)
    let projectDetailPage = <HTMLDivElement> document.querySelector(".projectDetailDivWrapper")

    jsonData.array.forEach((p:any)=>{
      console.log(616161, p)
      let projectRow = ProjectPage.createProjectRow(p)
      projectDetailPage.append(projectRow)


    })

    // let allCategories = jsonData.array.forEach((p:any)=>{
    //     addItemToProjectPage(p.name, p.projectArray)
    // })
    // jsonData.array.forEach(p=>console.log(p))
}

export function makeXMLHttpPostRequest(path: string, data: any){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:

        }
    };
    xhttp.open("post", path, true);
    xhttp.send(JSON.stringify(data));
}

export function createUniqueID():string{
  let temporaryPointer =  `${Date.now().toString(36) + Math.random().toString(36).substr(2)}`

  return temporaryPointer
}

export function intervalUpdateFunction( eventFunction: ()=>void, interval: number = 2000){
  let block = false
  let counter = 0

    return (e: any)=>{
      if (!block){
          eventFunction()
          console.log("saved using helper")
      } else {
          counter += 1
      }
      block = true
      setTimeout(()=>{
          block = false
          if (counter > 0){
              eventFunction()
              console.log("saved using helper")
              counter = 0
          }
      }, interval)
    }
}

export function deleteObjectFromDatabase(dataMessage: deleteDataMessageInterface){
    makeXMLHttpPostRequest("/schedule/api/deleteItem", dataMessage)
}

export function getItemFromDatabase(dataMessage: getDataMessageInterface){
    makeXMLHttpPostRequest("/schedule/api/getItem", dataMessage)
}

export function createNewObjectInDatabase(dataMessage: createDataMessageInerface){
    makeXMLHttpPostRequest("/schedule/api/create", dataMessage)
}

export function updateObjectInDatabase(dataMessage: updateDataMessageInerface){
    makeXMLHttpPostRequest("/schedule/api/update", dataMessage)
}
