import {MainControllerInterface} from "../mainControllerFolder/mainControllerInterface"
import * as pageViewHelperFunction from "../pageViewHelperFunction"

export function buildUserController(mainController:MainControllerInterface){
  // create subPanel
  let [pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent] = pageViewHelperFunction.createSubPanel("UserController")

  return { pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent  }
} // buildPageControllerButtonArray
