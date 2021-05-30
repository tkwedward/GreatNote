import {mainController} from "../index"
import {GNPage} from "./GreatNoteClass/GNPage"
import * as GreatNoteSvgDataClass from "./GreatNoteClass/GreatNoteSvgDataClass"
import {socket} from "./socketFunction"
import {highlightCurrentPageInOverviewMode} from "./pageControllerFolder/pageController"
// import {pageController, updatePageController, updatePageNumberInNewOrder, highlightCurrentPageInOverviewMode} from "./pageControllerFolder/pageController"


export function shortNotice(noticeText:string){
    let shortNoticeDiv = document.createElement("div")
    shortNoticeDiv.textContent = noticeText
    shortNoticeDiv.style.position = "fixed"
    shortNoticeDiv.style.width = "10%";
    shortNoticeDiv.style.left = "45%"
    shortNoticeDiv.style.top = "45%"
    shortNoticeDiv.style.background = "wheat"
    shortNoticeDiv.style.padding = "20px"
    shortNoticeDiv.style.zIndex = "10000"

    setTimeout(()=>{
      shortNoticeDiv.remove()
    }, 1500)


    document.body.appendChild(shortNoticeDiv)

}

export function subPanelTab(panelClassName: string){
    let tabWrapper = <any> document.createElement("div")
    tabWrapper.classList.add("tabWrapper", panelClassName + "TabWrapper")

    let tabBar = document.createElement("div")
    tabBar.classList.add("tabBar", panelClassName + "TabBar")

    let tabContent = document.createElement("div")
    tabContent.classList.add("tabContent", panelClassName + "TabContent")

    let subPanelSwitch = document.createElement("span")
    subPanelSwitch.classList.add("tabSwitch", panelClassName + "TabSwitch")
    subPanelSwitch.setAttribute("status", "open")

    subPanelSwitch.addEventListener("click", function(event){
        let newStatus = subPanelSwitch.getAttribute("status")=="open"?"close":"open"
        subPanelSwitch.setAttribute("status", newStatus)
    })

    tabBar.append(subPanelSwitch)
    tabWrapper.append(tabBar, tabContent)

    tabWrapper.addTabAndTabContent = function(_tab: HTMLDivElement, _tabContent: HTMLDivElement, showTabContent: boolean = true){
      _tab.setAttribute("status", "on")
      if (!showTabContent){
          _tab.setAttribute("status", "off")
          _tabContent.style.display = "none"
      }

      _tab.addEventListener("click", (e)=>{
          Array.from(tabBar.children)
               .forEach(p=>p.setAttribute("status", "off"))
          Array.from(tabContent.children)
               .forEach((p:any)=>p.style.display = "none")

          _tab.setAttribute("status", "off")
          _tabContent.style.display = "block"
      })

      tabBar.insertBefore(_tab,tabBar.firstChild)
      tabContent.append(_tabContent)
    }

    return [tabWrapper, tabBar, tabContent]
}


//@auto-fold here
export function createSubPanel(name:string){
    let subPanelNavbarTitle =  document.createElement(`div`)
    subPanelNavbarTitle.classList.add(`subPanelTitle`)
    subPanelNavbarTitle.innerHTML = `${name}`

    let subPanelContent = document.createElement(`div`)
    subPanelContent.classList.add("subPanelContent", `${name}SubPanel`)

    return [subPanelNavbarTitle, subPanelContent]
}



//@auto-fold here
export function createSubPanelItem(name:string){
    // to create subpanel and fill with subPanelItem
    let subPanelItem = <HTMLDivElement> document.createElement("div")
    subPanelItem.classList.add("subPanelItem", `${name}SubPanelItem`)
    subPanelItem.innerText = name[0]
    subPanelItem.addEventListener("click", function(){
        let  subPanelArrayParentNode = <HTMLDivElement> subPanelItem.parentNode
        let subPanelArray = subPanelArrayParentNode.querySelectorAll(".subPanelItem")
        Array.from(subPanelArray).forEach(p =>{
            p.setAttribute("status", "off")
        })
        subPanelItem.setAttribute("status", "on")
    })

    return subPanelItem
}

//@auto-fold here
export function functionButtonCreater(name:string, buttonFunction: ()=>void){
    let functionButton = document.createElement("div")
    functionButton.innerHTML = name
    functionButton.classList.add("functionButton")
    functionButton.addEventListener("click", buttonFunction)
    return functionButton
}



export function createSwitchViewModeButton(fullPageModeDiv: HTMLDivElement, overviewModeDiv: HTMLDivElement){
    let switchViewModeButton = document.createElement("button")
    switchViewModeButton.classList.add("switchViewModeButton")
    switchViewModeButton.innerText = "pageMode"
    switchViewModeButton.setAttribute("mode", "pageMode")

    switchViewModeButton.addEventListener("click", function(e){
       let mode = (switchViewModeButton.getAttribute("mode") == "overviewMode") ? "pageMode": "overviewMode"
       switchViewModeButton.setAttribute("mode", mode)
       switchViewModeButton.innerText = mode

       if (mode=="overviewMode"){
          fullPageModeDiv.setAttribute("status", "off")
          overviewModeDiv.setAttribute("status", "on")

          // pageViewHelperFunction.renderOverviewMode()
       } else {
          fullPageModeDiv.setAttribute("status", "on")
          overviewModeDiv.setAttribute("status", "off")
          // pageViewHelperFunction.renderFullPageMode()
       }
    })
    return switchViewModeButton
}

export function createNewPage(pageController: any, fullPageModeDiv:HTMLDivElement, fullPageData?:any, saveToDatabase=true, insertPosition=false):HTMLDivElement{
    let newPage = GNPage({
      name: "fullPage", arrayID: mainController.mainDocArray["mainArray_pageFull"], insertPosition: insertPosition,
      dataPointer: false,
      saveToDatabase: saveToDatabase,
      specialCreationMessage: "createNewFullPageObject",
      contentEditable: false,
      _classNameList: ["fullPage"], injectedData: fullPageData
    })

    newPage.classList.add("divPage", "fullPage")
    newPage._dataStructure = []
    newPage._styleStructure = ["background", "width", "height"]
    // newPage.style.width = `${pageController.fullPageSize[0]}px`
    // newPage.style.height = `${pageController.fullPageSize[1]}px`

    // if saveToDatabase is false, then you do not need to save it
    if (saveToDatabase){
        newPage.saveHTMLObjectToDatabase()
    }

    if (fullPageData){
        newPage.initializeHTMLObjectFromData(fullPageData)
        newPage.objectData = fullPageData
    }

    return newPage
}

export function insertNewPage(pageController:any, newFullPage: HTMLDivElement, fullPageModeDiv: HTMLDivElement){
    pageController.addPage(newFullPage)

    // ==========================
    // appending new pages to the fullPageModeDiv and overviewModeDiv
    //==========================
    // newFullPage.setAttribute("pageNumber", newPageNumber)
    fullPageModeDiv.appendChild(newFullPage)

    // highlight and update the pageNumberInput
    let pageNumberInput = <HTMLInputElement> document.querySelector(".pageNumberInput")
    pageNumberInput.value = pageController.currentPage.pageNumber
    // highlightCurrentPageInOverviewMode(newSmallView, pageController)
}

//@auto-fold here
export function createNewPageEvent(currentStatus: any, fullPageModeDiv: HTMLDivElement, pageDummyContent:any , htmlObject?:HTMLElement|HTMLDivElement){
    // when click the new page button, a new page is created.
    let clickEventAction = function (){
          let insertPosition = currentStatus.currentPage.pageNumber
          let saveToDatabase = true
          let newPage = createNewPage(currentStatus, fullPageModeDiv, false, saveToDatabase, insertPosition)

          insertNewPage(currentStatus, newPage, fullPageModeDiv)

          let addDivLayereButton = <HTMLButtonElement> document.querySelector(".addDivLayerButton")
          let addSvgLayerButton = <HTMLButtonElement> document.querySelector(".addSvgLayerButton")
          addDivLayereButton.click()
          addSvgLayerButton.click()
    }

    return clickEventAction
}

function clickEventOfSmallPage(currentStatus:any, smallPage: HTMLDivElement){
    // click
    smallPage.addEventListener("click", function(){
        let clickedPageNumber = parseInt(<string> smallPage.getAttribute("pageNumber"))

        // the next page is the clicked page + 1
        currentStatus.newPageNumber = clickedPageNumber + 1
        highlightCurrentPageInOverviewMode(smallPage, clickedPageNumber, currentStatus)
    })
}


// extract and create data object do not directly save object to the database.
// What is saved to the database is controlled by the saveHTMLOBjectTODatabase function in the mainController file
