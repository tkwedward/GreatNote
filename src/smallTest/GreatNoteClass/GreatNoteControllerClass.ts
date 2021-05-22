// import {GNObjectInterface, GNInputField, GNContainerDivInterface, GNDropdownListInterface, GNInputFieldInterface, GNButtonInterface} from "./GreatNoteDataClass"


//
// export interface GNControllerInterface extends  GNContainerDivInterface{
//     /** to get the controlledObject passed when click event happened and something is selected*/
//     getControlledObject(any)
//     receiveDataFromChild(data)
//     // "controllerItemList": GNControllerItemInterface[]
// }
//
// export function GNControllerItem(controllerObject: any,  eventType: string, controlledObject?: any):GNDropdownListInterface | GNInputFieldInterface | GNButtonInterface {
//     controllerObject.addEventListener(eventType, controllerObject.controllerEvent)
//     controllerObject.controlledObject = controlledObject
//
//     return controllerObject
// }
//
//
// export function GNController(_name:string, _parent?:any) : GNControllerInterface {
//     let _object = <GNControllerInterface> document.createElement("div");
//     _object.classList.add(_name)
//
//     // internal properties
//     _object._name = _name
//     _object._type = GNController.name
//     _object._styleList = {
//       "height": "150px",
//       "background": "silver",
//       "margin": "10px"
//     }
//
//     _object.appendElements = function(...childrenList){
//         childrenList.forEach(p=>{
//             p._parent = _object
//             _object.appendChild(p)
//         })
//
//     }
//
//     // functions
//     _object.update = (data) => {data}
//     _object.extract = () => 123
//     _object.receiveDataFromChild = function(data){
//       console.log(data)
//     }
//
//
//     // events
//     _object.addEventListener("eventName", (e)=>{
//         // do something
//
//     })
//
//     // do something before return
//     applyStyleHelperFunction(_object, _object._styleList)
//
//     return _object
// }
//
//
//
// export interface GNTextControllerInterface extends GNControllerInterface{
//     textSizeController?: any,
//     textBoldController?: any,
//     textItalicController?: any,
//     textColorController: any,
//     textHighlightController?:any
// }
//
// /** to creat Text controller*/
// export function GNTextController(_name:string, _parent?:any) : GNTextControllerInterface {
//   let _object = <GNTextControllerInterface> GNController(_name);
//
//   // internal properties
//   _object._name = _name
//   _object._type = GNTextController.name
//
//
//   // functions
//   _object.getControlledObject = function(target){
//     _object.controlledObject = target
//   }
//   _object.update = (data) => {data}
//   _object.extract = () => 123
//
//
//     /* part 2: controllers
//         textSizeController?: any,
//         textBoldController?: any,
//         textItalicController?: any,
//         textColorController: any,
//         textHighlightController?:any
//     */
//
//     // a)  create width controller
//     _object.textSizeController = GNInputField("textSizeController")
//     _object.textSizeController.placeholder = "fontSize..."
//     _object.textSizeController.controllerEvent = function(e){
//         if (_object.controlledObject){
//             _object.controlledObject.style.fontSize = textSizeControllerItem.value + "px"
//         } else {
//             console.log("please select an item")
//         }
//     }
//     let textSizeControllerItem = <GNInputFieldInterface> GNControllerItem(_object.textSizeController, "input")
//
//     // =========================================//
//     // a)  create text color  controller        //
//     // =========================================//
//     _object.textColorController = GNInputField("textColorController")
//     _object.textColorController.placeholder = "color..."
//     _object.textColorController.controllerEvent = function(e){
//         if (_object.controlledObject){
//             _object.controlledObject.style.color = textColorControllerItem.value
//         } else {
//             console.log("please select an item")
//         }
//     }
//     let textColorControllerItem = <GNInputFieldInterface> GNControllerItem(_object.textColorController, "input")
//
//
//
//   _object.appendElements(_object.textSizeController, _object.textColorController)
//   return _object
// }
//
//
// export interface GNImageControllerInterface extends GNControllerInterface{
//     imgWidthController: any,
//     imgHeightController: any,
//     imgTransparencyController: any,
//     imgRotationController?:any
// }
//
// /** to create GNImageController*/
// export function GNImageController(_name:string, _parent?:any) : GNImageControllerInterface {
//
//     let _object = <GNImageControllerInterface> GNController(_name);
//
//     // internal properties
//     _object._name = _name
//     _object._type = GNImageController.name
//
//     // functions
//     _object.getControlledObject = function(target){
//       _object.controlledObject = target
//     }
//     _object.update = (data) => {data}
//     _object.extract = () => 123
//
//
//     _object.addEventListener("eventName", (e)=>{
//         // do something
//     })
//
//
//     /* part 2: controllers
//         // a)  create width controller
//         // b)  create height controller
//         // c) create transparency controller
//         // d) creatte rotation controller
//     */
//
//     // a)  create width controller
//     _object.imgWidthController = GNInputField("imgWidthController")
//     _object.imgWidthController.controllerEvent = function(e){
//         if (_object.controlledObject){
//             _object.controlledObject.style.width = imgWidthInputControllerItem.value + "px"
//         } else {
//             console.log("please select an item")
//         }
//     }
//     let imgWidthInputControllerItem = <GNInputFieldInterface> GNControllerItem(_object.imgWidthController, "input")
//
//
//     // b)  create height controller
//
//
//     // c) create transparency controller
//
//     // d) creatte rotation controller
//
//
//     // add item to the controller
//     _object.appendElements(imgWidthInputControllerItem)
//
//     return _object
// }
//
//
//
// export interface GNTemplateInterface extends GNObjectInterface, HTMLImageElement {
//
// }
//
// export function GNTemplate(_name:string, _parent?:any) : GNObjectInterface {
//     let _object = <GNContainerDivInterface> document.createElement("div");
//
//     // internal properties
//     _object._name = _name
//     _object._type = GNTemplate.name
//
//     // functions
//     _object.update = (data) => {data}
//     _object.extract = () => 123
//
//     _object.addEventListener("eventName", (e)=>{
//         // do something
//
//     })
//
//     return _object
// }
