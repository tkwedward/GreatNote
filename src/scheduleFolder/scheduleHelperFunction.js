import * as CryptoJS from "crypto-js";
export function sha256(secret) {
    let ciphertext = CryptoJS.SHA256(secret)
        .toString(CryptoJS.enc.Hex);
    return ciphertext;
}
export function createSelectObject(optionArray) {
    let select = document.createElement("select");
    optionArray.forEach(p => {
        let option = document.createElement("option");
        option.value = p;
        option.innerText = p;
        select.appendChild(option);
    });
    return select;
}
export function makeXMLHttpRequest(path, data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
}
export function getInitialDataFromDatabase() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            renderRootArrayData(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", "/schedule/api/getInitialData", true);
    xhttp.send();
}
import * as ProjectPage from "./projectPage";
export function renderRootArrayData(jsonData) {
    // console.log(jsonData.array)
    let projectDetailPage = document.querySelector(".projectDetailDivWrapper");
    jsonData.array.forEach((p) => {
        console.log(616161, p);
        let projectRow = ProjectPage.createProjectRow(p);
        projectDetailPage.append(projectRow);
    });
    // let allCategories = jsonData.array.forEach((p:any)=>{
    //     addItemToProjectPage(p.name, p.projectArray)
    // })
    // jsonData.array.forEach(p=>console.log(p))
}
export function makeXMLHttpPostRequest(path, data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
        }
    };
    xhttp.open("post", path, true);
    xhttp.send(JSON.stringify(data));
}
export function createUniqueID() {
    let temporaryPointer = `${Date.now().toString(36) + Math.random().toString(36).substr(2)}`;
    return temporaryPointer;
}
export function intervalUpdateFunction(eventFunction, interval = 2000) {
    let block = false;
    let counter = 0;
    return (e) => {
        if (!block) {
            eventFunction();
            console.log("saved using helper");
        }
        else {
            counter += 1;
        }
        block = true;
        setTimeout(() => {
            block = false;
            if (counter > 0) {
                eventFunction();
                console.log("saved using helper");
                counter = 0;
            }
        }, interval);
    };
}
export function deleteObjectFromDatabase(dataMessage) {
    makeXMLHttpPostRequest("/schedule/api/deleteItem", dataMessage);
}
export function getItemFromDatabase(dataMessage) {
    makeXMLHttpPostRequest("/schedule/api/getItem", dataMessage);
}
export function createNewObjectInDatabase(dataMessage) {
    makeXMLHttpPostRequest("/schedule/api/create", dataMessage);
}
export function updateObjectInDatabase(dataMessage) {
    makeXMLHttpPostRequest("/schedule/api/update", dataMessage);
}
