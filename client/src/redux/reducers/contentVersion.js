
const addSectionChildHelper = (section,newSectionChild)=>{
    return {...section,
                    sectionChildSequence:[...section.sectionChildSequence,newSectionChild._id],
                    sectionContent:[...section.sectionContent,newSectionChild] }
}

const changeSequenceHelper = (section,sectionChildId,type) => {

    let sectionChildIndex = section.sectionChildSequence.findIndex((index)=>(index.toString())===sectionChildId)

    if(type==='UP' && sectionChildIndex>0)
    {
        let temp = section.sectionChildSequence[sectionChildIndex]
        section.sectionChildSequence[sectionChildIndex] = section.sectionChildSequence[sectionChildIndex-1]
        section.sectionChildSequence[sectionChildIndex-1] = temp
    }
    else if(type==='DOWN' && sectionChildIndex<(section.sectionChildSequence.length+1))
    {
        let temp = section.sectionChildSequence[sectionChildIndex]
        section.sectionChildSequence[sectionChildIndex] = section.sectionChildSequence[sectionChildIndex+1]
        section.sectionChildSequence[sectionChildIndex+1] = temp
    }

    return  {...section}
}

const updateSectionChildHelper = (section,sectionChildId,updatedSectionChild)=>{
    console.log("updateSectionChildHelper",section,sectionChildId,updatedSectionChild)
    section.sectionContent = (section.sectionContent).map((sectionChild)=>sectionChild._id===sectionChildId?{...sectionChild,...updatedSectionChild}:sectionChild)
    return {...section}
}

const deleteSectionChildHelper = (section,sectionChildId)=>{
    section.sectionChildSequence = (section.sectionChildSequence).filter((sectionChildIdArr)=>(sectionChildIdArr!==sectionChildId))
    section.sectionContent = (section.sectionContent).filter((sectionChild)=>sectionChild._id!==sectionChildId)
    return {...section}
}

const reducer =  (contentVersion={},action) => {


    switch (action.type) {
        case "SET_CONTENT_VERSION":
            return action.payload

        case "UPDATE_CONTENT_VERSION":
            return {...contentVersion , ...action.payload}

        case "ADD_SECTION":
            return {...contentVersion ,
                        sectionSequence : [...contentVersion.sectionSequence , action.payload._id.toString()],
                        sections : [...contentVersion.sections, action.payload] }

        case "ADD_SECTION_CHILD":
            contentVersion.sections = (contentVersion.sections).map((section)=>section._id===action.payload.sectionId?addSectionChildHelper(section,action.payload.newSectionChild):section)
            return {... contentVersion}

        case "UPDATE_SECTION":
            contentVersion.sections = (contentVersion.sections).map((section)=>section._id===action.payload.sectionId?{...section,...action.payload.updatedSection}:section)
            return {... contentVersion}

        case "DELETE_SECTION":
            contentVersion.sectionSequence = contentVersion.sectionSequence.filter((sectionId)=>sectionId!==(action.payload.sectionId));
            (contentVersion.sections) = (contentVersion.sections).filter((section)=>section._id!==action.payload.sectionId);
            return {...contentVersion}

        case "CHANGE_SECTION_CHILD_SEQUENCE":
            contentVersion.sections = (contentVersion.sections).map((section)=>section._id===action.payload.sectionId?changeSequenceHelper(section,action.payload.sectionChildId,action.payload.type):section)
            return {... contentVersion}

        case "UPDATE_SECTION_CHILD":
            contentVersion.sections = (contentVersion.sections).map((section)=>section._id===action.payload.sectionId?updateSectionChildHelper(section,action.payload.sectionChildId,action.payload.updatedSectionChild):section)
            console.log("Updated child",contentVersion)
            return {... contentVersion}

        case "DELETE_SECTION_CHILD":
            contentVersion.sections = (contentVersion.sections).map((section)=>section._id===action.payload.sectionId?deleteSectionChildHelper(section,action.payload.sectionChildId):section)
            return {... contentVersion}


        default:
            return {...contentVersion}

    }
}

export default reducer
