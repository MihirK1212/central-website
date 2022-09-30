import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import HomePage from "../../public/HomePage/HomePage";
import AdminProfilePage from "../AdminProfilePage/AdminProfilePage";
import AdminHomePage from "../AdminHomePage/AdminHomePage";
import SectionView from "../../public/SectionPage/SectionView";

import { setContentVersionAdmin } from "../../../redux/actions/contentVersion";

function Admin(){

    const [loading,setLoading] = useState(true);
    const [currentUserProfile , setCurrentUserProfile] = useState({})
    const [currentSections , setCurrentSections] = useState([])

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setContentVersionAdmin())
    },[dispatch])

    let contentVersion = useSelector((state) => state.contentVersion)

    const findSectionsAccToSequence = (sections,sectionSequence) => {
        let sequence = sectionSequence.map((id) => {
            const section = sections.find((section) => section._id == id)
            if(!section){return;}
            return section
        })
        return [...sequence]
    }

    useEffect(()=>{
        try {
            const userProfile = {
                ...contentVersion,
                socialMedia : {
                    ...contentVersion.socialMedia,
                    LinkedIn : contentVersion.socialMedia.LinkedIn
                }
            }
            setCurrentUserProfile(userProfile)

            let sectionsAccToSequence = findSectionsAccToSequence(contentVersion.sections,contentVersion.sectionSequence)
            setCurrentSections(sectionsAccToSequence)

            setLoading(false)
        } catch (error) {
            setLoading(true)
        }
    },[contentVersion])

    return(
        <>
        {
            !loading?
                <>
                    <Routes>
                        <Route path="/profile" element={<AdminProfilePage/>}/>
                        <Route path="/home" element={<AdminHomePage/>} />
                        <Route path="/preview" element={<HomePage userProfile={currentUserProfile} sections={currentSections} type="admin"/>}/>
                        {currentSections.map(section=><Route path={"/preview/section/" + section._id } element={<SectionView userProfile={currentUserProfile} sections={currentSections} id={section._id} type="admin"/>} key={section._id} />)}
                    </Routes>
                </> : ""
        }

        </>
    )
}

export default Admin;
