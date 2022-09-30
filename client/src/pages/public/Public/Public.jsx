import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import HomePage from "../HomePage/HomePage";
import SectionView from "../SectionPage/SectionView";
import Loader from "../../../components/Loader/Loader";

import { setContentVersionPublic } from "../../../redux/actions/contentVersion";


import urlMap from "./urlMap"

function Public() {

    const currentUserEmailId = urlMap[window.location.origin]

    const [loading,setLoading] = useState(true);
    const [publishedUserProfile , setPublishedUserProfile] = useState({})
    const [publishedSections , setPublishedSections] = useState([])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setContentVersionPublic(currentUserEmailId))
    }, [dispatch])


    let contentVersion = useSelector((state) => state.contentVersion)

    const findSectionsAccToSequence = (sections,sectionSequence) => {
        try{
            let sequence = sectionSequence.map((id) => {
                const section = sections.find((section) => section._id == id)
                if(!section){return;}
                return section
            })
            return [...sequence]
        }
        catch{
            return []
        }
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
            setPublishedUserProfile(userProfile)

            let sectionsAccToSequence = findSectionsAccToSequence(contentVersion.sections,contentVersion.sectionSequence)
            setPublishedSections(sectionsAccToSequence)

            setLoading(false)
        } catch (error) {
            setPublishedSections([])
            setLoading(true)
        }

    },[contentVersion])

    console.log(publishedSections,publishedUserProfile)

    return (
        <>
            {
                !loading?
                    <>
                        <Routes>
                            <Route path="/home" element={<HomePage userProfile={publishedUserProfile} sections={publishedSections} type="public"/>} />
                            {publishedSections.map(section => <Route path={"/home/section/" + section._id} element={<SectionView userProfile={publishedUserProfile} sections={publishedSections} id={section._id} type="public" />} key={section._id} />)}
                        </Routes>
                    </> : <Loader/>
            }

        </>


    )
}

export default Public;
