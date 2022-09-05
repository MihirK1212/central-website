import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles"

import "../../../index.css";
import { styles } from "../../../variable-css";

import Navbar from "../../../components/admin/HomePageNavbar/Navbar"
import Section from "../../../components/admin/Section/Section";

import { addSection } from "../../../redux/actions/contentVersions";
import SectionTree from "../../../components/admin/SectionTree/SectionTree";

const useStyles = makeStyles(styles)

function AdminHomePage({ userProfile }) {
    const classes = useStyles()

    let contentVersions = useSelector((state) => state.contentVersions)
    let sections = (contentVersions.length > 0)? contentVersions[(contentVersions).length - 1].Sections : null;
    const sectionSequence= contentVersions[1].sectionSequence
    const [selectedSection, setSelectedSection]=useState((sections.length>0?(sections[0]):null))

    const currentUser = userProfile.userName
    const dispatch = useDispatch()
    function createSectionSequence(sections, sectionSequence) {
        let sequence = sectionSequence.map((id) => {
            const section = sections.find((section) => section.sectionID == id)
            if(!section){return;}
            return {'sectionID':(section.sectionID).toString(), 'sectionHeader':section.sectionHeader}
        })
        return sequence
    }
    const handledAdd = (sectionName, sectionHeader) => {
        const newSection = { "sectionName": sectionName, "sectionHeader": sectionHeader, "sectionContent": [],"visible" : true,"sectionChildSequence" : [] }
        dispatch(addSection(newSection))
    }
    const handleSelectionChange = (id) => {
        const section = sections.filter((section) => section.sectionID == id)
        setSelectedSection(section[0])
    }

    return (
        <>
        {
            sections &&
                <Grid container >
                    <Grid item xs={12}>
                        <Navbar handlingAdd={handledAdd} userName={currentUser} profilePic={userProfile.logo} />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12} className={classes.sectionHeadersContainer}>
                        <SectionTree
                            sectionSequence={createSectionSequence(sections, sectionSequence)}
                            selectedSection={selectedSection? selectedSection:  sections[0]}
                            onSelectionChange={handleSelectionChange} />
                    </Grid>

                    {
                        sections.length>0?
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <Section userName={currentUser} currSectionID={selectedSection? selectedSection.sectionID :  sections[0].sectionID} key={selectedSection? selectedSection.sectionID :  sections[0].sectionID} />
                        </Grid>:
                        <h1>No sections to show</h1>
                    }

                </Grid>
        }
        </>
    );
}

export default AdminHomePage;
