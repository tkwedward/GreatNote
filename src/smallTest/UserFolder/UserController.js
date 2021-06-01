import * as pageViewHelperFunction from "../pageViewHelperFunction";
export function buildUserController(mainController) {
    // create subPanel
    let [pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent] = pageViewHelperFunction.createSubPanel("UserController");
    return { pageControllerSubPanelNavbarTitle, pageControllerSubPanelContent };
} // buildPageControllerButtonArray
