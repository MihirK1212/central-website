import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles"
import "../../../index.css";
import { styles } from "../../../variable-css";
import { Grid } from "@material-ui/core";

import Navbar from "../../../components/admin/HomePageNavbar/Navbar"
import Section from "../../../components/admin/Section/Section";
import SectionTree from "../../../components/admin/SectionTree/SectionTree";

import { addSection } from "../../../redux/actions/contentVersion";
import { updateContentVersion } from '../../../redux/actions/contentVersion';


const useStyles = makeStyles(styles)

function AdminHomePage() {

    const classes = useStyles()
    const dispatch = useDispatch()

    let contentVersion = useSelector((state)=> state.contentVersion)

    let sections = contentVersion.sections
    let sectionSequence= contentVersion.sectionSequence

    const handleSectionAdd = (sectionName, sectionHeader) => {
        const newSection = { "sectionName": sectionName, "sectionHeader": sectionHeader}
        dispatch(addSection(newSection))
    }

    const [selectedSection, setSelectedSection] = useState((sections.length>0?(sections[0]):null))

    const handleSelectionChange = (id) => {
        const section = sections.filter((section) => section._id === id)
        setSelectedSection(section[0])
    }

    const createSectionSequence = (sections, sectionSequence) => {
        let sequence = sectionSequence.map((id) => {
            const section = sections.find((section) => section._id == id)
            if(!section){return;}
            return {'_id':(section._id).toString(), 'sectionHeader':section.sectionHeader}
        })
        return sequence
    }

    const [currentSectionSequence , setCurrSecSequence ] = useState([...createSectionSequence(sections , sectionSequence)])

    useEffect(()=>{
        setCurrSecSequence(createSectionSequence(sections , sectionSequence))
    },[contentVersion])

    function handleUp(index) {
        if (index == 0) {
            return
        }
        let newSeq = [...currentSectionSequence];
        let temp = newSeq[index];
        newSeq[index] = newSeq[index - 1];
        newSeq[index - 1] = temp;
        setCurrSecSequence(newSeq)
    }
    function handleDown(index) {
        if (index == currentSectionSequence.length - 1) {
            return
        }
        let newSeq = [...currentSectionSequence];
        let temp = newSeq[index];
        newSeq[index] = newSeq[index + 1];
        newSeq[index + 1] = temp;
        setCurrSecSequence(newSeq)
    }

    function handleSaveSectionSequence() {
        let save = true
        const sequence= currentSectionSequence.map((section)=>section?section._id:save=false)

        if(save){
            dispatch(updateContentVersion({sectionSequence : sequence}))
        }
    }

    return (
        <>
        {
            sections &&
                <Grid container >
                    <Grid item xs={12}>
                        <Navbar handleSectionAdd={handleSectionAdd} logoSrc={contentVersion.logoSrc} />
                    </Grid>

                    <Grid item lg={3} md={3} sm={12} xs={12} className={classes.sectionHeadersContainer}>
                        <SectionTree
                            currentSectionSequence = {currentSectionSequence}
                            selectedSection={selectedSection? selectedSection:  sections[0]}
                            handleUp = {handleUp}
                            handleDown = {handleDown}
                            onSelectionChange = {handleSelectionChange}
                            handleSaveSectionSequence = {handleSaveSectionSequence}/>
                    </Grid>

                    {
                        sections.length>0?
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <Section currSectionId={selectedSection? selectedSection._id :  sections[0]._id} key={selectedSection? selectedSection._id :  sections[0]._id} />
                        </Grid>:
                        <h1>No sections to show</h1>
                    }

                </Grid>
        }
        </>
    );
}

export default AdminHomePage;
