import * as ClipboardEvent from "./clipboardEvents"
import * as CommunicatorController from "./communicationFolder/communitcationController"
import * as EventModel from "./EventModel"

// GMPnkects
import {GNContainerDiv} from "./GreatNoteClass/GreatNoteDataClass"
import {GNImageContainer} from "./GreatNoteClass/GNImageContainer"
import {GNInputField} from "./GreatNoteClass/GNInputField"
import {GNTextContainer} from "./GreatNoteClass/GNTextContainer"
import { GNBookmark } from "./bookmarkFolder/GNBookmark"
import { GNPage } from "./GreatNoteClass/GNPage"
import { GNBookmarkLinkedObject} from "./bookmarkFolder/GNBookmarkLinkedObject"
import * as GreatNoteSvgDataClass from "./GreatNoteClass/GreatNoteSvgDataClass"
import * as GroupController from "./groupControllerFolder/groupController"
import {getAllPageAnnotation, renderAnnotationPage,  buildAnnotationPage } from "./pageControllerFolder/annotationHelperFunctions"


import {socket} from "./socketFunction"
import * as GNCommentController from "./commentFolder/commentController"

import * as CommentSidebarController from "./commentFolder/commentSidebarController"

import * as LayerConroller from "./layerControllerFolder/layerController"
import {MainControllerInterface} from "./mainControllerFolder/mainControllerInterface"
import * as PageController from "./pageControllerFolder/pageController"
import * as pageViewHelperFunction from "./pageViewHelperFunction"
import * as InitializeAttributeControllerFunction from "./attributeControllerFolder/initializeAttributeControllers"
import * as CollectionController from "./collectionControllerFolder/collectionController"
import * as ColllectionControllerHelperFunctions from "./collectionControllerFolder/colllectionControllerHelperFunctions"
import * as SwipeEventController from "./EventFolder/swipeEvent"
import * as ToolBoxModel from "./ToolBoxModel"
import * as TestHelper from "./testFolder/testHelperFunction"
// import * as WindowController from "./EventFolder/specialWindowObject"
let openStatus = true


export function createGNDataStructureMapping(mainController:MainControllerInterface){
  mainController.GNDataStructureMapping = {
      GNInputField: GNInputField,
      GNContainerDiv: GNContainerDiv,
      GNImageContainer: GNImageContainer,
      GNBookmark: GNBookmark,
      GNPage: GNPage,
      GNTextContainer: GNTextContainer,

      // svg
      GNSvg: GreatNoteSvgDataClass.GNSvg,
      GNSvgCircle: GreatNoteSvgDataClass.GNSvgCircle,
      GNSvgPolyLine: GreatNoteSvgDataClass.GNSvgPolyLine,
      GNSvgRect: GreatNoteSvgDataClass.GNSvgRect,
      GNComment: GNCommentController.GNComment
  }
}

export function getImportantDivFromHTML(mainController: MainControllerInterface){
  let pageArrayID = mainController.mainDocArray["mainArray_page"]
// global htmlObjects
  let panelContainer = <HTMLDivElement> document.querySelector(".panelContainer")
  let pageContentContainer = document.querySelector(".pageContentContainer")
  panelContainer.style.zIndex = "100";

  let fullPageModeDiv = <HTMLDivElement> document.querySelector(".fullPageModeDiv")
  fullPageModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageFull"])

  let overviewModeDiv = <HTMLDivElement> document.querySelector(".overviewModeDiv")
  overviewModeDiv.setAttribute("accessPointer", mainController.mainDocArray["mainArray_pageOverview"])
  overviewModeDiv.setAttribute("status", "off")

  let [bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent] = pageViewHelperFunction.createSubPanel("bookmark")

  return {pageArrayID, panelContainer, pageContentContainer, fullPageModeDiv, overviewModeDiv, bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent}
}

export function buildPageControllerButtonArray(mainController:MainControllerInterface){
  // create subPanel
  let [pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent] = pageViewHelperFunction.createSubPanel("pageController")

  let testValuePanel = <HTMLDivElement> document.createElement("div")
  testValuePanel.classList.add("testValuePanel")
  pageControllerSubPanelContent.appendChild(testValuePanel)

  let editorControllerTemplate = <HTMLTemplateElement> document.querySelector("#editControllerTemplate")
  var editorController =  <any> editorControllerTemplate.content.cloneNode(true);
  // attribute controller
  let attributePanel =  editorController.querySelector(".attributePanel")
  InitializeAttributeControllerFunction.initializeMainControllerAttributeControllerMapping(mainController)
  Object.values(mainController.attributeControllerMapping).forEach(p=>{
      attributePanel.appendChild(<HTMLDivElement>p)
  })

  let copyButton = editorController.querySelector(".copyButton")
  let linkButton = editorController.querySelector(".linkButton")
  let deleteButton = editorController.querySelector(".deleteButton")

  copyButton.addEventListener("click", function(){
      let selectedObject = mainController.pageCurrentStatus.selectedObject
      let nameOfGNtype = selectedObject._type
      let selectedObjectData = selectedObject.extract()
      selectedObjectData["data"]["cx"] += 100

      let copiedObject =  mainController.createGNObjectThroughName(nameOfGNtype,
      {name: "", arrayID: "", insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: false})
      copiedObject.loadFromData(selectedObjectData)
      selectedObject.parentNode.appendChild(copiedObject)
  })

  linkButton.addEventListener("click", function(){
      let selectedObject = mainController.pageCurrentStatus.selectedObject
      let nameOfGNtype = selectedObject._type
      let selectedObjectData = selectedObject.extract()
      selectedObjectData["data"]["cx"] += 100

      let parentContainerObjectID = selectedObject.parentNode.getAccessPointer()


      let linkedObject = mainController.createGNObjectThroughName(nameOfGNtype, {name: "", arrayID: parentContainerObjectID, insertPosition: false, dataPointer: selectedObject.getAccessPointer(), saveToDatabase: true})
      linkedObject.loadFromData(selectedObjectData)

      selectedObject.parentNode.appendChild(linkedObject)
  })

  deleteButton.addEventListener("click", function(){
      let selectedObject = <any> document.querySelector(".selectedObject")

      selectedObject.deleteFromDatabase()
      // selectedObject?.remove()
  })

  let testFieldButton = document.createElement("button")
  testFieldButton.innerText = "testFieldButton"
  testFieldButton.addEventListener("click", function(){
      let testFieldDiv = <HTMLDivElement> document.querySelector(".testField")
      if (testFieldDiv.classList.contains("open")){
          testFieldDiv.classList.remove("open")
      } else {
          testFieldDiv.classList.add("open")
      }

  })

  let showMainDocButton = document.createElement("button")
  showMainDocButton.innerText = "mainDoc"
  showMainDocButton.addEventListener("click", function(){
      console.log(153, mainController.mainDoc["array"][0]["array"], mainController)
  })



  let showAnnotationButton = document.createElement("button")
  showAnnotationButton.innerText = "showAnnotation"
  showAnnotationButton.addEventListener("click", function(){
      let annotationPage = <HTMLDivElement> document.querySelector(".annotationPage")
      console.log(annotationPage.style.display)

      if (annotationPage.style.display=="block"){
          annotationPage.style.display = "none"
          return
      }
      // if the display is none or other
      annotationPage.style.display = "block"

      let annotationPageContentWrapper = <HTMLDivElement> annotationPage.querySelector(".annotationPageContentWrapper")
      let currentPage = <any>  mainController.pageController.startPage.next

      let allPageAnnotationArray = []
      while (currentPage){
          if (!currentPage.getCategorizedAnnotationArray) break

          let currentPageAnnotationData = getAllPageAnnotation(currentPage)

          if (currentPageAnnotationData){
              allPageAnnotationArray.push(currentPageAnnotationData)
          }

          currentPage = currentPage.next
      }
      console.log(177177, allPageAnnotationArray, annotationPageContentWrapper)

      if (annotationPageContentWrapper.innerHTML==""){
          renderAnnotationPage(allPageAnnotationArray, annotationPageContentWrapper)
      }
  })


  // ============ scale Controller ===========//
  function scaleChange(scale:number){
    let currentPage = mainController.pageController.startPage.next
    while (currentPage){
        if (!currentPage.fullPageHTMLObject) break
        currentPage.fullPageHTMLObject.style.transform = `scale(${scale})`
        currentPage = currentPage.next
    }
  }

  let scaleController = document.createElement("div")
  let scaleInput = document.createElement("input")
  scaleInput.value = "1"
  scaleInput.style.width = "50px";

  let scaleIncreaseButton = document.createElement("button")
  scaleIncreaseButton.innerText = "+"
  scaleIncreaseButton.classList.add("scaleIncreaseButton")
  scaleIncreaseButton.addEventListener("click", function(e){
    let newScale = +scaleInput.value + 0.1
    scaleInput.value = newScale.toFixed(2)
    scaleChange(newScale)
  })

  let scaleDecreaseButton = document.createElement("button")
  scaleDecreaseButton.innerText = "-"
  scaleDecreaseButton.classList.add("scaleDecreaseButton")
  scaleDecreaseButton.addEventListener("click", function(e){
    let newScale = +scaleInput.value - 0.1
    scaleInput.value = newScale.toFixed(2)
    scaleChange(newScale)
  })
  scaleController.append(scaleIncreaseButton, scaleInput, scaleDecreaseButton)


  // ===================  ==================//
  let objectIDGetter = document.createElement("input")
  let objectIDGetterSubmit = document.createElement("input")
  objectIDGetterSubmit.type = "submit"
  objectIDGetter.style.border = "3px solid gold"
  objectIDGetterSubmit.style.background = "gold"

  objectIDGetterSubmit.addEventListener("click", (e)=>{
      // console.log(mainController.getObjectById(objectIDGetter.value), document.querySelector(`*[accessPointer='${objectIDGetter.value}']`));

      window.selectedItem = document.querySelector(`*[accessPointer='${objectIDGetter.value}']`)
  })

  editorController.append(objectIDGetter, objectIDGetterSubmit, testFieldButton, showMainDocButton, showAnnotationButton)

  // toolBoxObject
  let toolBoxHtmlObject = buildToolBoxHtmlObject(mainController)

  pageControllerSubPanelContent.append(toolBoxHtmlObject, scaleController, editorController)

  let annotationPage = document.querySelector(".annotationPage")

  return {pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent, testFieldButton, copyButton, linkButton, deleteButton,  showMainDocButton, showAnnotationButton, annotationPage, scaleController}
}




export function buildToolBoxHtmlObject(mainController){
  let toolBoxHtmlObject = mainController.toolBox.createToolboxHtmlObject()

  let eraserItemButton = mainController.toolBox.createEraserItemButton(toolBoxHtmlObject)
  let polylineItemButton = mainController.toolBox.createNewPolyLineItemButton(toolBoxHtmlObject)
  let selectionToolItemButton = mainController.toolBox.createSelectionToolItemButton(toolBoxHtmlObject)
  let mouseRectangleSelectionToolItemButton = mainController.toolBox.createMouseRectangleSelectionToolItemButton(toolBoxHtmlObject)
  let addCommentItemButton = mainController.toolBox.createAddCommentButton(toolBoxHtmlObject)
  let moveObjectInDivButton = mainController.toolBox.createMoveObjectInDivButton(toolBoxHtmlObject)
  let addBookmarkButton = mainController.toolBox.createAddBookmarkButton(toolBoxHtmlObject)
  let textToolButton = mainController.toolBox.createTextToolItemButton(toolBoxHtmlObject)


  toolBoxHtmlObject.append(eraserItemButton, polylineItemButton, selectionToolItemButton, mouseRectangleSelectionToolItemButton, addCommentItemButton, moveObjectInDivButton, addBookmarkButton, textToolButton)

  return toolBoxHtmlObject
}

export function buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer){

  // page controller
  // To create a page Controller to navigate previous and nex page
  PageController.pageControllerHTMLObject(mainController.pageController, bookmarkSubPanelContent)

  let createNewDivButton = pageViewHelperFunction.functionButtonCreater(
    "new Div", pageViewHelperFunction.createNewPageEvent(mainController.pageController, fullPageModeDiv, overviewModeDiv, pageContentContainer)
  )
  createNewDivButton.classList.add("addNewPage")

  let deletePageButton = document.createElement("button")
  deletePageButton.innerHTML = "delete page"
  deletePageButton.addEventListener("click", function(){
      let currentPageNumber = mainController.pageController.currentPage.pageNumber
      mainController.pageController.deletePage(currentPageNumber)
      mainController.pageController.currentPage.fullPageHTMLObject.deleteFromDatabase()
      mainController.pageController.goToPage(currentPageNumber-1)
      mainController.pageController.updatePageNumber(mainController.pageController.currentPage)
  })

  let switchViewModeButton = pageViewHelperFunction.createSwitchViewModeButton(fullPageModeDiv, overviewModeDiv)

  let saveButton = document.createElement("button")
  saveButton.innerHTML = "saveButton"
  saveButton.addEventListener("click", function(){
      let saveData = mainController.saveMainDoc(true)
      socket.emit("saveNotebookUsingClientData", saveData)

  })


  let layerControllerHTMLObject =  LayerConroller.createLayerController(mainController)

  bookmarkSubPanelContent.append( createNewDivButton,deletePageButton, switchViewModeButton, layerControllerHTMLObject, saveButton)
}



export function buildInitialHTMLSkeleton(mainController: MainControllerInterface){

      let currentStatus = mainController.pageCurrentStatus

      let annotationPage = buildAnnotationPage(mainController)


      let [topSubPanel, topSubPanelTabBar, topSubPanelTabContent] = pageViewHelperFunction.subPanelTab("topSubPanel")
      let {pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent, testFieldButton, copyButton, linkButton, deleteButton, showMainDocButton, showAnnotationButton} =  buildPageControllerButtonArray(mainController)


      topSubPanel.addTabAndTabContent(pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent)


      let [middleSubPanel, middleSubPanelTabBar, middleSubPanelTabContent] = pageViewHelperFunction.subPanelTab("middleSubPanel")
      let {pageArrayID, panelContainer, pageContentContainer, fullPageModeDiv, overviewModeDiv, bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent} = getImportantDivFromHTML(mainController)

      let [groupControllerNavbarTitle, groupControllerContent] = GroupController.GroupController(mainController)
      let [collectionControllerNavbarTitle, collectionControllerContent] = CollectionController.CollectionController(mainController)
      middleSubPanel.addTabAndTabContent(collectionControllerNavbarTitle, collectionControllerContent, false)
      middleSubPanel.addTabAndTabContent(groupControllerNavbarTitle, groupControllerContent, false)
      middleSubPanel.addTabAndTabContent(bookmarkSubPanelNavbarTitle, bookmarkSubPanelContent)




      //===================== bookmarkSubPanel ==================//

      buildPageController(mainController, bookmarkSubPanelContent, fullPageModeDiv, overviewModeDiv, pageContentContainer)

      let [bottomSubPanel, bottomSubPanelTabBar, bottomSubPanelTabContent] = pageViewHelperFunction.subPanelTab("bottomSubPanel")
      // commentSubPanel
      let [commentSubPanelNavbarTitle, commentSubPanelContent] = pageViewHelperFunction.createSubPanel("comment", true)
      commentSubPanelContent.setAttribute("accessPointer", mainController.mainDocArray["mainArray_bookmark"])
      bottomSubPanel.addTabAndTabContent(commentSubPanelNavbarTitle, commentSubPanelContent)

      //
      // let commentSidebar = CommentSidebarController.GNCommentSidebar()
      // commentSubPanelContent.append(commentSidebar)
      // add events: initalizeWindowObject, addPasteImageEvent, swipeDetection
      attachEvents(mainController, pageContentContainer)
      panelContainer.append(topSubPanel, middleSubPanel, bottomSubPanel)

      pageViewHelperFunction.shortNotice("inital Value")

      socket.emit("clientAskServerForSocketData")



      window.mainController = mainController

}// buildInitialHTMLSkeleton



export function buildInitialPage(mainController:MainControllerInterface, saveToDatabase=false){

    createGNDataStructureMapping(mainController)
    /*
      0: pageFullArray
      1: "mainArray_pageOverview"
      2: "mainArray_bookmark"
      3: "mainArray_panel"
      4: "mainArray_pokemon"
    */
    // the array of the elements to be rendered to the document body
    let pageController = mainController.pageController
    let pageFullArray = mainController.mainDoc["array"][0]["array"]
    let pageOverviewArray = mainController.mainDoc["array"][1]["array"]
    let bookmarkArray =  mainController.mainDoc["array"][2]["array"]
    let collectionArray =mainController.mainDoc["array"][3]["array"]


    let fullPageModeDiv = <HTMLDivElement> document.querySelector(".fullPageModeDiv")
    let overviewModeDiv = <HTMLDivElement> document.querySelector(".overviewModeDiv")
    let commentSubPanelContent = <HTMLDivElement> document.querySelector(".commentSubPanel")
    let groupControllerWrapper = <any> document.querySelector(".groupControllerWrapper")
    let collectionControllerWrapper = <any> document.querySelector(".collectionControllerWrapper")

    console.log(345345, pageFullArray, mainController.mainDoc)
    for (let i = 0; i< pageFullArray.length; i++){
        let [newPage, smallView] = pageViewHelperFunction.createNewPage(pageController, fullPageModeDiv, overviewModeDiv, pageFullArray[i], pageOverviewArray[i], saveToDatabase)

        pageViewHelperFunction.insertNewPage(pageController, newPage, smallView, fullPageModeDiv, overviewModeDiv)

        mainController.renderDataToHTML(pageFullArray[i], newPage)



        if (i == pageFullArray.length-1){
          newPage.classList.add("currentPage")

          let groupData = newPage.extract().data.groupData
          groupControllerWrapper.renderGroup(groupData)
        }
    }

    // collectionPage
    let groupData = [
      {
        pageAccessPointer: "71ffffb4-e34a-41a6-9168-0d1991b655d7",
        uniqueID: "1621568792409"
      },
      {
        pageAccessPointer: "71ffffb4-e34a-41a6-9168-0d1991b655d7",
        uniqueID: "1621568792409"
      },
      {
        pageAccessPointer: "71ffffb4-e34a-41a6-9168-0d1991b655d7",
        uniqueID: "1621568792409"
      }
    ]

    let collectionPage = ColllectionControllerHelperFunctions.createCollectionPage()
    collectionPage.injecetDataToCollectionPage(groupData)

     if (pageFullArray.length > 0) mainController.layerController.renderCurrentPageLayer()

     bookmarkArray.forEach((p:any)=>{
         let bookmarkLinkedObject = GNBookmarkLinkedObject({name: "bookmarkLinkedObject", injectedData: p})
         commentSubPanelContent.append(bookmarkLinkedObject)
     })

     // TestHelper.testFunction(mainController)

     // let updateEvent = setInterval(() =>{
     //   console.log("send changes to server")
     //   mainController.sendChangeToServer()
     // }, 4000)

}// buildInitialPage


export function attachEvents(mainController, pageContentContainer){
    // WindowController.initalizeWindowObject()

    // clipboard event
    ClipboardEvent.addPasteImageEvent(mainController)

    // to add swipe, panning events to the pageContentContainer
    SwipeEventController.swipeDetection(mainController, pageContentContainer)

}
