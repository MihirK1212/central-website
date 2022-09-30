import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem, Menu, MenuList, IconButton, Grid, Card } from '@material-ui/core'
import { makeStyles } from "@mui/styles";
import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { styles } from "../../../variable-css";

import SectionChild from "../SectionChild/SectionChild";
import SectionModal from "../Modal/SectionModal";

import { deleteSection } from "../../../redux/actions/contentVersion";
import { updateSection } from "../../../redux/actions/contentVersion";
import { addSectionChild } from "../../../redux/actions/contentVersion";

const useStyles = makeStyles(styles)

function Section({ currSectionId }) {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [editing , setEditing] = useState(false)

    let contentVersion = useSelector((state)=> state.contentVersion)

    let sections = contentVersion.sections
    let logoSrc = contentVersion.logoSrc

    let section = sections.find(section => section._id === currSectionId)
    let sectionDetails = section ? {sectionName : section.sectionName, sectionHeader : section.sectionHeader} : {}


    const [checked, setChecked] = useState(section?section.visible:false);

    const createSectionChildSequence = (section)=>{

        if(!section){
            return []
        }

        let sectionContent = section.sectionContent
        let sectionChildSequence = section.sectionChildSequence

        let sequence = sectionChildSequence.map((id) => {
            const sectionChild = sectionContent.find((sectionChild) => sectionChild._id == id)
            if(!sectionChild){return;}
            return sectionChild
        })
        return sequence
    }

    const [sectionChildBySeq,setSectionChildBySeq] = useState([...createSectionChildSequence(section)])

    const newSectionChild = { "sectionChildName": "", "sectionChildImage": logoSrc, "sectionChildShortDesc": "", "sectionChildDesc": "", "sectionChildLinks": [] ,"visible":true}

    useEffect(()=>{
        if(section)
        {
            setChecked(section.visible)
            setSectionChildBySeq([...createSectionChildSequence(section)])
        }

    },[contentVersion])

    const handleSaveSection = () => {
        section.visible = checked
        setEditing(false)
        let updatedSection = contentVersion.sections.find(section => section._id === currSectionId)
        dispatch(updateSection({
            sectionId : currSectionId,
            section : updatedSection}))
    }

    const handleDeleteSection = () => {
        dispatch(deleteSection({sectionId : currSectionId}))
    }

    const handleAddSectionChild = () => {
        dispatch(addSectionChild({
            sectionId : currSectionId,
            sectionChild : newSectionChild}));
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (

        currSectionId!=null && section ?
            <Card className={classes.section}>
                <Box display={'flex'} justifyContent={'space-between'} marginBottom={3}>

                    <h3 className="header">{section.sectionHeader}</h3>

                    {editing && <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Visible"/>}

                    {
                        editing?
                        <Button variant="contained" onClick={()=>{handleSaveSection()}}>SAVE</Button>:
                        <Button variant="contained" onClick={()=>{setEditing(true)}}>EDIT</Button>
                    }

                    <>
                        {
                            editing &&
                                <>
                                    <IconButton onClick={(event) => {
                                        setAnchorEl(event.currentTarget)
                                        setMenuOpen(true)
                                    }}>
                                        <MoreVert fontSize="small" />
                                    </IconButton>
                                    <Menu open={menuOpen} onClose={() => { setMenuOpen(false) }} anchorEl={anchorEl}>
                                    <MenuList>
                                        {
                                            editing?<MenuItem  onClick={handleAddSectionChild}>
                                            <ListItemIcon>
                                                <Add fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{`Add ${section.sectionName}`}</ListItemText>
                                        </MenuItem> : ""
                                        }

                                        <MenuItem onClick={handleDeleteSection}>
                                            <ListItemIcon >
                                                <Delete fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Delete</ListItemText>
                                        </MenuItem>

                                        <SectionModal
                                            currSectionId={currSectionId}
                                            sectionDetails={sectionDetails} triggerElement={
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <Edit fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>Update</ListItemText>
                                                </MenuItem>
                                            } />
                                    </MenuList>
                                </Menu>
                            </>
                        }

                    </>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    {sectionChildBySeq.map((sectionChild) =>
                        <Grid item key={sectionChild._id}>
                            <SectionChild
                                sectionId={currSectionId}
                                sectionName={section.sectionName}
                                sectionChild={{...sectionChild}}
                                sectionChildSequence={section.sectionChildSequence}
                                editing={editing}
                                key={sectionChild._id}
                                />
                        </Grid>)}
                </Grid>
            </Card> :
            <></>
    );
}

export default Section;
