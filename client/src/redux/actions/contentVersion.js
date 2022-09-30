import * as api from "../../api";

export const setContentVersionAdmin = () => async (dispatch) => {

    try{
        let contentVersion = (await api.getContentVersionAdmin()).data.contentVersion

        if(!contentVersion){dispatch({type:"ADMIN_LOGOUT"})}
        else{
            dispatch({type:"SET_CONTENT_VERSION",payload:contentVersion})
        }
    }
    catch (error) {
        console.log(error)
        dispatch({type:"ADMIN_LOGOUT"})
    }
}

export const setContentVersionPublic = (userEmailId) => async (dispatch) => {

    try{
        let contentVersion = (await api.getContentVersionPublic(userEmailId)).data.contentVersion
        console.log("in set public ",contentVersion)
        dispatch({type:"SET_CONTENT_VERSION",payload:contentVersion})
    }
    catch (error) {
        console.log(error)
    }
}


export const updateContentVersion = (updatedContentVersion) => async (dispatch) => {
    try{
        await api.updateContentVersion(updatedContentVersion)
        dispatch({type:"UPDATE_CONTENT_VERSION",payload:updatedContentVersion})
    }
    catch(error){
        console.log(error)
    }
}

export const addSection = (newSection) => async (dispatch) => {
    try{
        const generatedSection = (await api.addSection(newSection)).data.generatedSection
        dispatch({type:"ADD_SECTION",payload:generatedSection})
    }
    catch(error){
        console.log("addSectionError",error)
    }
}

export const updateSection = (updateSectionDetails) => async (dispatch) => {
    try {
      const sectionId = updateSectionDetails.sectionId
      const updatedSection = updateSectionDetails.section

      await api.updateSection(updateSectionDetails)
      dispatch({type:"UPDATE_SECTION",payload:{sectionId : sectionId , updatedSection:updatedSection}})

    } catch (error) {
        console.log(error)
    }
}

export const deleteSection = (deleteSectionDetails) => async (dispatch) => {
    try {
        await api.deleteSection(deleteSectionDetails.sectionId)
        dispatch({type:"DELETE_SECTION",payload:{sectionId:deleteSectionDetails.sectionId}})
    } catch (error) {
        console.log(error)
    }
}

export const addSectionChild = (newSectionChildDetails) => async (dispatch) => {
    try{
        const sectionId = newSectionChildDetails.sectionId

        const generatedSectionChild = (await api.addSectionChild(newSectionChildDetails)).data.generatedSectionChild
        dispatch({type:"ADD_SECTION_CHILD",payload:{sectionId : sectionId , newSectionChild : generatedSectionChild}})
    }
    catch(error){
        console.log(error)
    }
}

export const changeSectionChildSequence = (sectionId,sectionChildId,type) => async (dispatch) => {
    try {
        dispatch({type:"CHANGE_SECTION_CHILD_SEQUENCE",payload:{sectionId:sectionId,sectionChildId:sectionChildId,type:type}})
    } catch (error) {
        console.log(error)
    }
}

export const updateSectionChild = (sectionId,sectionChildId,updatedSectionChild) => async (dispatch) => {
    try{
        console.log("updateSectionChildAction",sectionId,sectionChildId,updatedSectionChild)
        dispatch({type:"UPDATE_SECTION_CHILD",payload:{sectionId:sectionId,sectionChildId:sectionChildId,updatedSectionChild:updatedSectionChild}})
    }
    catch(error){
        console.log(error)
    }
}

export const deleteSectionChild = (sectionId,sectionChildId) => async (dispatch) => {
    try{
        dispatch({type:"DELETE_SECTION_CHILD",payload:{sectionId:sectionId,sectionChildId:sectionChildId}})
    }
    catch(error){
        console.log(error)
    }
}

export const publishVersion = () => async () => {
    try{
        await api.publishVersion()
    }
    catch(error){
        console.log(error)
    }
}




