import {communicationDataStructure, MainDocArrayEnum, MainControllerInterface, mainArrayData} from "./mainControllerInterface"

export function createDummyData(data:any){
    let _dummyData:communicationDataStructure = {
        "data": data,
        "array": [],
        "_identity": {"dataPointer": "", "accessPointer": "", "linkArray": []},
        "stylesheet": {},
        "GNType": ""
    }

    let htmlObject = document.createElement("div")
    htmlObject.style.width = "300px"
    htmlObject.style.height = "200px"
    return _dummyData
}
